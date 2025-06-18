package khanh.book_ecommerce.controllers;

import khanh.book_ecommerce.configs.Endpoints;
import khanh.book_ecommerce.models.User;
import khanh.book_ecommerce.security.JwtResponse;
import khanh.book_ecommerce.security.LoginRequest;
import khanh.book_ecommerce.services.JwtService;
import khanh.book_ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = Endpoints.FE_HOST)
public class UserController {

    private UserService userService;

    private AuthenticationManager authenticationManager;

    private JwtService jwtService;

    @Autowired
    public UserController (UserService userService, AuthenticationManager authenticationManager,
                           JwtService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
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

    @PostMapping
    @RequestMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            if(authentication.isAuthenticated()) {
                final String jwt = jwtService.generateToken(loginRequest.getUsername());
                return ResponseEntity.ok(new JwtResponse(jwt));
            }
        }
        catch (AuthenticationException e) {
                return ResponseEntity.badRequest().body( "Invalid username or password" );
        }
        return ResponseEntity.badRequest().body( "Cannot login" );
        }


}
