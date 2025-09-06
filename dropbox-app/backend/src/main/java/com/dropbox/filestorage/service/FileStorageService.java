package com.dropbox.filestorage.service;

import com.dropbox.filestorage.dto.FileListResponse;
import com.dropbox.filestorage.dto.FileUploadResponse;
import com.dropbox.filestorage.entity.FileMetadata;
import com.dropbox.filestorage.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {
    
    @Autowired
    private FileMetadataRepository fileRepository;
    
    private final Path uploadPath = Paths.get("uploads");
    private final List<String> allowedTypes = Arrays.asList("text/plain", "image/jpeg", "image/png", "image/jpg", "application/json");
    
    public FileStorageService() {
        try {
            Files.createDirectories(uploadPath);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory");
        }
    }
    
    public FileUploadResponse uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }
        
        if (!allowedTypes.contains(file.getContentType())) {
            throw new RuntimeException("File type not allowed");
        }
        
        try {
            String originalName = file.getOriginalFilename();
            String storedName = UUID.randomUUID().toString() + getExtension(originalName);
            Path filePath = uploadPath.resolve(storedName);
            
            Files.copy(file.getInputStream(), filePath);
            
            FileMetadata metadata = new FileMetadata(originalName, storedName, file.getContentType(), file.getSize(), filePath.toString());
            metadata = fileRepository.save(metadata);
            
            return new FileUploadResponse(metadata.getId(), metadata.getOriginalFilename(), 
                metadata.getFileType(), metadata.getFileSize(), metadata.getUploadTime(), "File uploaded successfully");
        } catch (IOException e) {
            throw new RuntimeException("Could not save file");
        }
    }
    
    public List<FileListResponse> getAllFiles() {
        return fileRepository.findAllByOrderByUploadTimeDesc().stream()
            .map(file -> new FileListResponse(file.getId(), file.getOriginalFilename(), 
                file.getFileType(), file.getFileSize(), file.getUploadTime()))
            .toList();
    }
    
    public Resource downloadFile(Long fileId) {
        try {
            FileMetadata metadata = fileRepository.findById(fileId).orElseThrow(() -> new RuntimeException("File not found"));
            Path filePath = Paths.get(metadata.getFilePath());
            return new UrlResource(filePath.toUri());
        } catch (Exception e) {
            throw new RuntimeException("Could not load file");
        }
    }
    
    public FileMetadata getFileInfo(Long fileId) {
        return fileRepository.findById(fileId).orElseThrow(() -> new RuntimeException("File not found"));
    }
    
    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf("."));
    }
}
