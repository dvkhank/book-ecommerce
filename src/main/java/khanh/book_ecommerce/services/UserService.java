package khanh.book_ecommerce.services;

import khanh.book_ecommerce.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    ResponseEntity<?> registerAccount(User user);
    ResponseEntity<?> activateEmail(String activeCode,String email);
}
