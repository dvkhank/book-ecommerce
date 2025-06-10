package khanh.book_ecommerce.repositories;

import khanh.book_ecommerce.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "genres")
public interface GenreRepository extends JpaRepository<Genre, Integer> {
}
