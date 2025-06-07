package khanh.book_ecommerce.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table (name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "role_name")
    private String roleName;

    @OneToMany(mappedBy = "role", cascade = {CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH,
            CascadeType.MERGE},fetch = FetchType.LAZY)
    private List<UserRole> listUserRoles;
}
