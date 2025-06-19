package khanh.book_ecommerce.services;

import jakarta.servlet.http.HttpServletRequest;
import khanh.book_ecommerce.models.PaymentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.text.SimpleDateFormat;

public interface Payment {
     ResponseEntity<?> createPayment(@RequestBody PaymentRequest request);
     String dateFormat();
     String handleIPN(HttpServletRequest request);
    }
