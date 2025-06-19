package khanh.book_ecommerce.repositories;

import lombok.Data;

@Data
public class OrderDetailRequest {
        private int bookId;
        private int quantity;
        private double price;
}
