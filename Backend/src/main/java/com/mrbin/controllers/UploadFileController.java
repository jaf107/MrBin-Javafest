package com.mrbin.controllers;

import com.mrbin.payload.request.UpdateImageUrlRequest;
import com.mrbin.payload.response.FileUploaderResponse;
import com.mrbin.payload.response.MessageResponse;
import com.mrbin.service.UploaderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/file")
public class UploadFileController {

    @Autowired
    private UploaderService uploaderService;

    @GetMapping("/upload-signature")
    public ResponseEntity<FileUploaderResponse> sendFileUploadPermission() {
        FileUploaderResponse response =  uploaderService.getUploadSignature();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/update-url")
    public ResponseEntity updateImgUrl(@RequestBody UpdateImageUrlRequest updateImageUrlRequest) {
        int status = 500;
        if (updateImageUrlRequest.getCollection().equalsIgnoreCase("user")) {
            status = uploaderService.updateUserImage(updateImageUrlRequest.getQueryParam(), updateImageUrlRequest.getImageUrl(), updateImageUrlRequest.getPublicId());

            if(status == 200)       return ResponseEntity.status(status).body(new MessageResponse("Successfully updated user avatar !!"));
            else if (status == 404) return ResponseEntity.status(status).body(new MessageResponse("User not found !!"));
            else                    return ResponseEntity.status(status).body(new MessageResponse("Error while updating user avatar !!"));
        }
        else if (updateImageUrlRequest.getCollection().equals("product")) {
            status = uploaderService.updateProductImage(updateImageUrlRequest.getQueryParam(), updateImageUrlRequest.getImageList());

            if(status == 200)       return ResponseEntity.status(status).body(new MessageResponse("Successfully updated product image !!"));
            else if (status == 404) return ResponseEntity.status(status).body(new MessageResponse("Product not found !!"));
            else                    return ResponseEntity.status(status).body(new MessageResponse("Error while updating product image !!"));
        }
        return ResponseEntity.status(status).body(new MessageResponse("Internal server Error !!"));
    }
}
