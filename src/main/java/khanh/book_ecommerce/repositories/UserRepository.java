package khanh.book_ecommerce.repositories;

import khanh.book_ecommerce.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "users")
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUserName(String username);

    User findByUserName(String username);

    boolean existsByEmail(String email);

    User findByEmail(String email);
}
