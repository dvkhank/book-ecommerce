package khanh.book_ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 256)
    private String name;

    @Column(length = 256)
    private String author;

    @Column(columnDefinition = "text")
    private String description;

    private int quantity;

    @Column(name = "original_price")
    private double originalPrice;

    @Column(name = "discounted_price")
    private double discountedPrice;

    @Column(length = 20)
    private String isbn;

    private double rating;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST,CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH})
    @JsonIgnore
    private List<BookGenre> listBookGenres;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = {
            CascadeType.ALL})
    @JsonIgnore
    private List<Image> listImages;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JsonIgnore
    private List<Comment> listComments;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JsonIgnore
    private List<OrderDetail> listOrderDetails;

}
