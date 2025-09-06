package com.dropbox.filestorage.controller;

import com.dropbox.filestorage.dto.FileListResponse;
import com.dropbox.filestorage.dto.FileUploadResponse;
import com.dropbox.filestorage.entity.FileMetadata;
import com.dropbox.filestorage.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    @Autowired
    private FileStorageService fileService;

    @PostMapping("/upload")
    public FileUploadResponse uploadFile(@RequestParam("file") MultipartFile file) {
        return fileService.uploadFile(file);
    }

    @GetMapping("/list")
    public List<FileListResponse> getAllFiles() {
        return fileService.getAllFiles();
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) {
        FileMetadata metadata = fileService.getFileInfo(fileId);
        Resource resource = fileService.downloadFile(fileId);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + metadata.getOriginalFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/view/{fileId}")
    public ResponseEntity<Resource> viewFile(@PathVariable Long fileId) {
        FileMetadata metadata = fileService.getFileInfo(fileId);
        Resource resource = fileService.downloadFile(fileId);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + metadata.getOriginalFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/metadata/{fileId}")
    public FileListResponse getFileMetadata(@PathVariable Long fileId) {
        FileMetadata metadata = fileService.getFileInfo(fileId);
        return new FileListResponse(metadata.getId(), metadata.getOriginalFilename(), 
            metadata.getFileType(), metadata.getFileSize(), metadata.getUploadTime());
    }
}
