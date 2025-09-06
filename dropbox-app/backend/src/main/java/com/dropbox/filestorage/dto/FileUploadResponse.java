package com.dropbox.filestorage.dto;

import java.time.LocalDateTime;

public class FileUploadResponse {
    public Long id;
    public String originalFilename;
    public String fileType;
    public Long fileSize;
    public LocalDateTime uploadTime;
    public String message;
    
    public FileUploadResponse() {}
    
    public FileUploadResponse(Long id, String originalFilename, String fileType, Long fileSize, LocalDateTime uploadTime, String message) {
        this.id = id;
        this.originalFilename = originalFilename;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.uploadTime = uploadTime;
        this.message = message;
    }
}
