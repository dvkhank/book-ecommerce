package khanh.book_ecommerce.repositories;

import khanh.book_ecommerce.models.ShippingMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingMethodRepository extends JpaRepository<ShippingMethod, Integer> {
}
