package khanh.book_ecommerce.services.servicesimpl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
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

    @Autowired
    public ImageServiceImpl(Cloudinary cloudinary, ImageRepository imageRepository) {
        this.cloudinary = cloudinary;
        this.imageRepository = imageRepository;
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
}
