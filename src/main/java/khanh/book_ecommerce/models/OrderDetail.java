package khanh.book_ecommerce.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "order_details")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private double price;

    private int quantity;

    @ManyToOne ( cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH} )
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne ( cascade = {CascadeType.PERSIST, CascadeType.MERGE,
    CascadeType.DETACH, CascadeType.REFRESH} )
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
}
