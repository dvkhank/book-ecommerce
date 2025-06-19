package khanh.book_ecommerce.repositories;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    private String address;
    private long userId;
    private long shippingMethodId;
    private long paymentMethodId;
    private List<OrderDetailRequest> orderDetails;


}
