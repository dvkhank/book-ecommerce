package khanh.book_ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "genres")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String genreName;

    @OneToMany(mappedBy = "genre",cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE,
    CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<BookGenre> listBookGenres;
}
