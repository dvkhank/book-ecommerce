package khanh.book_ecommerce.controllers;

import khanh.book_ecommerce.models.Book;
import khanh.book_ecommerce.models.Image;
import khanh.book_ecommerce.repositories.BookRepository;
import khanh.book_ecommerce.repositories.ImageRepository;
import khanh.book_ecommerce.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageController {

    private final ImageRepository imageRepository;
    private ImageService imageService;
    private BookRepository bookRepository;

    @Autowired
    public ImageController(ImageService imageService, BookRepository  bookRepository, ImageRepository imageRepository) {
        this.imageService = imageService;
        this.bookRepository = bookRepository;
        this.imageRepository = imageRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("bookId") int bookId) {
        try {
            String imageUrl = imageService.getImageUrlAndSave(file);
            Book book = bookRepository.findById(bookId).get();
            Image image = new Image();
            image.setBook(book);
            image.setLink(imageUrl);
            imageRepository.saveAndFlush(image);
            return ResponseEntity.ok(imageUrl);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
