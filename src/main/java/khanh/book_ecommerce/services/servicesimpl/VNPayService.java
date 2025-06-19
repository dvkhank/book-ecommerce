package khanh.book_ecommerce.services.servicesimpl;

import jakarta.servlet.http.HttpServletRequest;
import khanh.book_ecommerce.configs.Endpoints;
import khanh.book_ecommerce.models.Order;
import khanh.book_ecommerce.models.OrderDetail;
import khanh.book_ecommerce.models.PaymentRequest;
import khanh.book_ecommerce.repositories.*;
import khanh.book_ecommerce.services.Payment;
import khanh.book_ecommerce.utils.VNPayUtils;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VNPayService implements Payment {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShippingMethodRepository  shippingMethodRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private BookRepository    bookRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Value("${vnpay.hashSecret}")
    private String hasSecret;
    @Value("${vnpay.tmnCode}")
    private String tmnCode;
    @Override
    public ResponseEntity<?> createPayment(PaymentRequest request) {

        Order order = new Order();
        order.setShippingDate(new Date());
        order.setAddress(request.getAddress());
        order.setPaymentStatus(false);
        order.setUser(userRepository.findById(request.getUserId()).orElseThrow());
        order.setShippingMethod(shippingMethodRepository.findById(request.getShippingMethodId()).orElseThrow());
        order.setPaymentMethod(paymentMethodRepository.findById(request.getPaymentMethodId()).orElseThrow());

        List<OrderDetail> details = new ArrayList<>();
        double total = 0;

        for(OrderDetailRequest odr : request.getOrderDetails()) {
            OrderDetail detail = new OrderDetail();
            detail.setBook(bookRepository.findById(odr.getBookId()).orElseThrow());
            detail.setQuantity(odr.getQuantity());
            detail.setOrder(order);
            details.add(detail);
            total += odr.getPrice() * odr.getQuantity();
            detail.setPrice(odr.getPrice());
        }
        order.setTotalPrice(total);
        order.setOrderDetails(details);
        Order savedOrder = orderRepository.save(order);



        String vnp_TxnRef = String.valueOf(savedOrder.getId());
        String vnp_Amount = String.valueOf((long)(total * 100));

        String vnp_OrderInfo = "Thanh toan don hang " + vnp_TxnRef;
        String vnp_Locale = "vn";
        String vnp_BankCode = "VNBANK";
        String vnp_ReturnUrl = Endpoints.FE_HOST+"/payment/return";

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", tmnCode);
        vnp_Params.put("vnp_Amount", vnp_Amount);
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_Locale", vnp_Locale);
        vnp_Params.put("vnp_BankCode", vnp_BankCode);
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");  // từ request
        vnp_Params.put("vnp_CreateDate", dateFormat());
        vnp_Params.put("vnp_OrderType", "other");
        Calendar expire = Calendar.getInstance();
        expire.add(Calendar.MINUTE, 15);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String expireDate = formatter.format(expire.getTime());
        vnp_Params.put("vnp_ExpireDate", expireDate);
        String queryUrl = VNPayUtils.buildQueryUrl(vnp_Params, hasSecret);
        return ResponseEntity.ok(queryUrl);

    }



    @Override
    public String dateFormat() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(new Date());
    }

    @Override
    public String handleIPN(HttpServletRequest request) {
        Map<String, String> fields = new HashMap<>();
        for (Map.Entry<String, String[]> entry : request.getParameterMap().entrySet()) {
            String key = entry.getKey();
            String[] value = entry.getValue();
            if (value.length > 0) {
                fields.put(key, value[0]);
            }
        }

        // Lấy hash từ request và kiểm tra tính hợp lệ
        String vnp_SecureHash = fields.remove("vnp_SecureHash");
        fields.remove("vnp_SecureHashType"); // không cần để kiểm tra hash

        boolean isValid = VNPayUtils.validateSignature(fields, hasSecret, vnp_SecureHash);

        if (!isValid) {
            return "Invalid signature. Possible tampering!";
        }

        // Kiểm tra kết quả thanh toán
        String responseCode = fields.get("vnp_ResponseCode"); // "00" là thành công
        String txnRef = fields.get("vnp_TxnRef"); // chính là orderId đã gửi

        if ("00".equals(responseCode)) {
            try {
                long orderId = Long.parseLong(txnRef);
                Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new RuntimeException("Cannot find order with id: " + orderId));
                if (order != null) {
                    order.setPaymentStatus(true);
                    orderRepository.save(order);
                    return "Payment success. Order updated.";
                } else {
                    return "Order not found with ID: " + txnRef;
                }
            } catch (Exception e) {
                return "Error updating order: " + e.getMessage();
            }
        } else {
            return "Payment failed with code: " + responseCode;
        }
    }


}
