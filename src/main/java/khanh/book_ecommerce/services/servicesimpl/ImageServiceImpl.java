package khanh.book_ecommerce.services.servicesimpl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import khanh.book_ecommerce.models.Book;
import khanh.book_ecommerce.models.Image;
import khanh.book_ecommerce.repositories.BookRepository;
import khanh.book_ecommerce.repositories.ImageRepository;
import khanh.book_ecommerce.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageServiceImpl implements ImageService {

    private Cloudinary cloudinary;

    private ImageRepository imageRepository;

    private BookRepository bookRepository;

    @Autowired
    public ImageServiceImpl(Cloudinary cloudinary, ImageRepository imageRepository,  BookRepository bookRepository) {
        this.cloudinary = cloudinary;
        this.imageRepository = imageRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public String  getImageUrlAndSave(MultipartFile file){
        try {
            Map r = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return r.get("secure_url").toString();
        } catch (IOException e) {
            return e.toString();
        }
    }

    //facade pattern
    @Override
    public void saveImage(MultipartFile[] file,  int bookId) {
        try {
            Book book = bookRepository.findById(bookId).get();

            for (MultipartFile file1 : file) {

                String imageUrl = getImageUrlAndSave(file1);
                Image image = new Image();
                image.setBook(book);
                image.setLink(imageUrl);
                imageRepository.saveAndFlush(image);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
