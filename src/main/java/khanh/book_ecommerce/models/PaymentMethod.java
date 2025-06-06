package khanh.book_ecommerce.models;

import lombok.Data;

import java.util.List;

@Data
public class PaymentMethod {

    private int id;

    private String name;

    private double fee;

    private List<Order> listOrders;

}
