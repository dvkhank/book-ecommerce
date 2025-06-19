package khanh.book_ecommerce.security;

import khanh.book_ecommerce.DTO.UserDTO;
import lombok.Data;

@Data
public class LoginResponse {
    private final String jwt;
    private final UserDTO user;



}
