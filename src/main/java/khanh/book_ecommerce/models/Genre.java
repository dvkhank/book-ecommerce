package khanh.book_ecommerce.models;

import lombok.Data;

import java.util.List;

@Data
public class Genre {

    private int id;

    private String genreName;

    private List<Book> listBooks;
}
