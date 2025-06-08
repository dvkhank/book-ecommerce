package khanh.book_ecommerce.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String getImageUrlAndSave(MultipartFile file);
    public void saveImage(MultipartFile[] file,  int bookId) throws IOException;
}
