package khanh.book_ecommerce.services;

import khanh.book_ecommerce.models.OrderDetail;

import java.util.List;

public interface OrderService {
    public List<OrderDetail> findOrderDetailsByOrderId(long orderId);
}
