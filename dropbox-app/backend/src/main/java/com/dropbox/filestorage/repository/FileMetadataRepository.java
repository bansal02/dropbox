package com.dropbox.filestorage.repository;

import com.dropbox.filestorage.entity.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {
    List<FileMetadata> findAllByOrderByUploadTimeDesc();
}
