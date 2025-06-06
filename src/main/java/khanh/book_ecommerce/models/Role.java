package khanh.book_ecommerce.models;

import lombok.Data;

import java.util.List;

@Data
public class Role {

    private int id;

    private String roleName;

    private List<User> listUsers;
}
