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

    @ManyToMany(mappedBy = "listRoles",  fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REFRESH
    , CascadeType.PERSIST, CascadeType.DETACH})
    private List<User> listUsers;
}
