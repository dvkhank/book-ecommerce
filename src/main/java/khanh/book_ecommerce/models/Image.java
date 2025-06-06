package khanh.book_ecommerce.models;

import lombok.Data;

@Data
public class Image {

    private int id;

    private String link;

    private Book book;
}
