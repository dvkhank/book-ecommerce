package khanh.book_ecommerce.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Columns;

@Data
@Entity
@Table(name = "users_roles", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "role_id"}))
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "role_id")
    private Role role;


}
