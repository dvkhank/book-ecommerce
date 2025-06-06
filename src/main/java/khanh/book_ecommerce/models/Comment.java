package khanh.book_ecommerce.models;

import lombok.Data;

import java.util.Date;

@Data
public class Comment {

    private long id;

    private String content;

    private int rating;

    private Date createdAt;

    private Book book;

    private User user;
}
