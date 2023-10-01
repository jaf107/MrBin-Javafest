package com.mrbin.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FileUploaderResponse {
    private long timestamp;
    private String signature;
}
