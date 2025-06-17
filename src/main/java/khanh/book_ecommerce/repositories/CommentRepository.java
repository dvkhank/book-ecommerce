package khanh.book_ecommerce.repositories;

import khanh.book_ecommerce.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "comments")
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
