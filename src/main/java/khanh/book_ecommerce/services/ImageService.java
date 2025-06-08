package khanh.book_ecommerce.services;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String getImageUrlAndSave(MultipartFile file);
}
