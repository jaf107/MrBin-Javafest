package com.mrbin.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.mrbin.utils.Avatar;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UpdateImageUrlRequest {
    @JsonProperty("collection")
    private String collection;

    @JsonProperty("query-param")
    private String queryParam;

    @JsonProperty("public-id")
    private String publicId;

    @JsonProperty("image-url")
    private String imageUrl;

    @JsonProperty("image-list")
    private List<Avatar> imageList;

    public UpdateImageUrlRequest(String collection, String publicId, String imageUrl) {
        this.collection = collection;
        this.publicId = publicId;
        this.imageUrl = imageUrl;
    }

    public UpdateImageUrlRequest(String collection, List<Avatar> imageList) {
        this.collection = collection;
        this.imageList = imageList;
    }
}
