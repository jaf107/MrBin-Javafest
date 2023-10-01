package com.mrbin.utils;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Avatar {
    @JsonProperty("publicId")
    private String publicId;
    @JsonProperty("url")
    private String url;
}
