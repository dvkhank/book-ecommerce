package khanh.book_ecommerce.models;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Order {

    private long id;

    private Date shippingDate;

    private String address;

    private boolean paymentStatus;

    private double totalPrice;

    private User user;

    private ShippingMethod shippingMethod;

    private PaymentMethod paymentMethod;

    private List<OrderDetail> orderDetails;


}
