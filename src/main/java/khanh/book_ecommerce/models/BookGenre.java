package khanh.book_ecommerce.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "books_genres", uniqueConstraints = @UniqueConstraint(columnNames = {"book_id", "genre_id"}))
public class BookGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "genre_id")
    private Genre genre;

}
