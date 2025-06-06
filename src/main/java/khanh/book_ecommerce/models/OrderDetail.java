package khanh.book_ecommerce.models;

import lombok.Data;

@Data
public class OrderDetail {

    private long id;

    private double price;

    private int quantity;

    private Book book;

    private Order order;
}
