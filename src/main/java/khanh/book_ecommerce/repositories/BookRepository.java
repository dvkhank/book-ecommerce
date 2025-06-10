package khanh.book_ecommerce.repositories;

import khanh.book_ecommerce.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource(path = "books")
public interface BookRepository extends JpaRepository<Book, Integer> {
    Page<Book> findByNameContaining(@RequestParam String name, Pageable pageable);

    @Query("SELECT b FROM Book b JOIN b.listBookGenres bg WHERE bg.genre.id = :genreId")
    Page<Book> findByGenreId(@Param("genreId") int genreId, Pageable pageable);
//
    @Query("SELECT b FROM Book b JOIN b.listBookGenres bg WHERE bg.genre.id = :genreId AND b.name LIKE CONCAT('%', :name, '%')")
    Page<Book> findByNameContainingAndGenreId(@Param("name") String name, @Param("genreId") int genreId, Pageable pageable);

    Page<Book> findByNameContainingIgnoreCaseAndListBookGenres_Genre_Id(String name, int genreId, Pageable pageable);
}
