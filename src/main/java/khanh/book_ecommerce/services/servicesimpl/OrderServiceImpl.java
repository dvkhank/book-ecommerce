package khanh.book_ecommerce.services.servicesimpl;

import khanh.book_ecommerce.models.OrderDetail;
import khanh.book_ecommerce.repositories.OrderRepository;
import khanh.book_ecommerce.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<OrderDetail> findOrderDetailsByOrderId(int orderId) {
        return orderRepository.findByOrderId(orderId);
    }

}
