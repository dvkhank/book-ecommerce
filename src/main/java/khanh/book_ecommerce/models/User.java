package khanh.book_ecommerce.models;

import lombok.Data;

import java.util.List;

@Data
public class User {

    private int id;

    private String firstName;

    private String lastName;

    private String userName;

    private String password;

    private String email;

    private String address;

    private boolean sex;

    private List<Role> listRoles;

    private List<Order> listOrders;

    private List<Comment> listComments;

}
