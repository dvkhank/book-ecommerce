package khanh.book_ecommerce.repositories;

import khanh.book_ecommerce.models.Order;
import khanh.book_ecommerce.models.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
