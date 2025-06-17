package khanh.book_ecommerce.controllers;

import khanh.book_ecommerce.configs.Endpoints;
import khanh.book_ecommerce.models.User;
import khanh.book_ecommerce.repositories.UserRepository;
import khanh.book_ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = Endpoints.FE_HOST)
public class UserController {

    private UserService userService;

    @Autowired
    public UserController (UserService userService) {
        this.userService = userService;
    }


    @RequestMapping("/register")
    @PostMapping
    public ResponseEntity<?> registerUser(@Validated @RequestBody User user) {
        return userService.registerAccount(user);
    }

    @RequestMapping("/active")
    @GetMapping
    public ResponseEntity<?> activeUser(@RequestParam String email, @RequestParam String activeCode ) {
        return userService.activateEmail(activeCode, email);
    }

}
