package com.dropbox.filestorage.dto;

import java.time.LocalDateTime;

public class FileListResponse {
    public Long id;
    public String originalFilename;
    public String fileType;
    public Long fileSize;
    public LocalDateTime uploadTime;
    
    public FileListResponse() {}
    
    public FileListResponse(Long id, String originalFilename, String fileType, Long fileSize, LocalDateTime uploadTime) {
        this.id = id;
        this.originalFilename = originalFilename;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.uploadTime = uploadTime;
    }
}
