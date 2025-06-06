package khanh.book_ecommerce.models;

import lombok.Data;

import java.util.List;

@Data
public class Book {

    private int id;

    private String name;

    private String author;

    private double price;

    private int quantity;

    private double originalPrice;

    private double discountedPrice;

    private int ISBN;

    private double rating;

    private List<Genre> listGenres;

    private List<Image> listImages;

    private List<Comment> listComments;

    private List<OrderDetail> listOrderDetails;

}
