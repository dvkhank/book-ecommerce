package khanh.book_ecommerce.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name", length = 50)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "user_name", length = 50)
    private String userName;

    @Column(length = 512)
    private String password;

    @Column(length = 50)
    private String email;

    private String address;

    private boolean sex;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH,
            CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<UserRole> listUserRoles;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE,
    CascadeType.DETACH, CascadeType.REFRESH})
    private List<Order> listOrders;

    @OneToMany (mappedBy = "user",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> listComments;

}
