package khanh.book_ecommerce.controllers;

import jakarta.servlet.http.HttpServletRequest;
import khanh.book_ecommerce.models.PaymentRequest;
import khanh.book_ecommerce.services.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private Payment paymentService;

    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest request) {
        return paymentService.createPayment(request);
    }

    @GetMapping("/ipn")
    public String handleIPN(HttpServletRequest request) {
        return paymentService.handleIPN(request);
    }
}
