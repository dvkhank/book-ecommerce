package khanh.book_ecommerce.repositories;

import khanh.book_ecommerce.models.BookGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookGenreRepository extends JpaRepository<BookGenre, Integer> {
}
