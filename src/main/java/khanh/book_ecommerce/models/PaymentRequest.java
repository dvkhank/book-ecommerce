package khanh.book_ecommerce.models;

import khanh.book_ecommerce.repositories.OrderDetailRequest;
import lombok.Data;

import java.util.List;

@Data
public class PaymentRequest {
    private String address;
    private int userId;
    private int shippingMethodId;
    private int paymentMethodId;

    private List<OrderDetailRequest> orderDetails;
}
