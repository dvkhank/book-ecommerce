package khanh.book_ecommerce.controllers;

import khanh.book_ecommerce.configs.Endpoints;
import khanh.book_ecommerce.models.Order;
import khanh.book_ecommerce.models.OrderDetail;
import khanh.book_ecommerce.models.User;
import khanh.book_ecommerce.security.JwtResponse;
import khanh.book_ecommerce.security.LoginRequest;
import khanh.book_ecommerce.services.JwtService;
import khanh.book_ecommerce.services.OrderService;
import khanh.book_ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = Endpoints.FE_HOST)
public class UserController {

    private UserService userService;

    private AuthenticationManager authenticationManager;

    private JwtService jwtService;

    private OrderService orderService;

    @Autowired
    public UserController (UserService userService, AuthenticationManager authenticationManager,
                           JwtService jwtService, OrderService orderService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.orderService = orderService;
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


    @GetMapping
    @RequestMapping("/info")
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userService.loadUserByUsername(username);
        if (!jwtService.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);

    }

    @GetMapping
    @RequestMapping("/order-info")
    public ResponseEntity<?> getOrderInfo(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userService.loadUserByUsername(username);
        if (!jwtService.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }
        User user = userService.findByUsername(username);
        List<Order> orders = user.getListOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping
    @RequestMapping("/order-info/{id}")
    public ResponseEntity<?> getOrder(@RequestHeader("Authorization") String authHeader, @PathVariable long id) {
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        UserDetails userDetails = userService.loadUserByUsername(username);
        if (!jwtService.validateToken(token, userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }
        List<OrderDetail> orderDetails = orderService.findOrderDetailsByOrderId(id);
        return ResponseEntity.ok(orderDetails);
    }
}
