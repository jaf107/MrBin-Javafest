package com.mrbin.service;

import com.cloudinary.Cloudinary;
import com.mrbin.models.Product;
import com.mrbin.models.User;
import com.mrbin.payload.response.FileUploaderResponse;
import com.mrbin.repository.ProductRepository;
import com.mrbin.repository.UserRepository;
import com.mrbin.utils.Avatar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UploaderService {

    @Value("${Mr.Bin.Cloudinary.Api.Secrate}")
    private String cloudinaryApiSecrete;

    @Value("${Mr.Bin.Cloudinary.Api.Key}")
    private String cloudinaryApiKey;

    @Value("${Mr.Bin.Cloudinary.Api.CloudName}")
    private String cloudinaryCloudName;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public FileUploaderResponse getUploadSignature() {
        Cloudinary cloudinary = new Cloudinary(Map.of(
                "cloud_name", cloudinaryCloudName,
                "api_key", cloudinaryApiKey,
                "api_secret", cloudinaryApiSecrete
        ));

        long expirationInSeconds = 5; // Replace with the expiration time (in seconds)
        long timestamp = System.currentTimeMillis() / 1000 + expirationInSeconds;

        Map<String, Object> params = new HashMap<>();
        params.put("timestamp", String.valueOf(timestamp));

        String cloudSign = cloudinary.apiSignRequest(params, cloudinaryApiSecrete);

        return new FileUploaderResponse(timestamp, cloudSign);
    }

    public int updateUserImage(String username, String imagePublicId, String imageUrl) {
        Optional<User> userQuery = userRepository.findByUsername(username);

        if(userQuery.isPresent()) {
            User user = userQuery.get();
            user.setAvatar(new Avatar(imagePublicId, imageUrl));
            userRepository.save(user);

            return 200;
        }

        return 404;
    }

    public int updateProductImage(String productId, List<Avatar> images) {
        Optional<Product> productQuery = productRepository.findById(productId);

        if(productQuery.isPresent()) {
            Product product = productQuery.get();
            product.setImages(images);
            productRepository.save(product);

            return 200;
        }

        return 404;
    }
}
