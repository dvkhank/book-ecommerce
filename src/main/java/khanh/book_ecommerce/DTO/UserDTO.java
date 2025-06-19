package khanh.book_ecommerce.DTO;

import khanh.book_ecommerce.models.User;
import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String username;
    private String fullName;



    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUserName();
        this.fullName = user.getFirstName() + " " + user.getLastName();
    }
}
