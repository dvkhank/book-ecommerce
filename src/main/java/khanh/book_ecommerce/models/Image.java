package khanh.book_ecommerce.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Transient
    private MultipartFile file;

    @Column(length = 2048)
    private String link;

    @ManyToOne ( cascade = {CascadeType.PERSIST, CascadeType.MERGE,
    CascadeType.DETACH, CascadeType.REFRESH} )
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
}
