package com.vigyaninstitute.controller;

import com.vigyaninstitute.dto.UploadResponse;
import com.vigyaninstitute.dto.NoteFile;
import com.vigyaninstitute.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * NoteController - REST API controller for note upload and management
 * Handles file uploads, downloads, and note listing operations
 */
@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
public class NoteController {

    @Autowired
    private NoteService noteService;

    /**
     * Upload a file to the server
     * @param file - MultipartFile to upload
     * @param request - HttpServletRequest for getting server info
     * @return UploadResponse with file details
     */
    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request) {
        
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new UploadResponse(false, "Please select a file to upload", null));
            }

            // Validate file type
            String contentType = file.getContentType();
            if (!isAllowedFileType(contentType, file.getOriginalFilename())) {
                return ResponseEntity.badRequest()
                        .body(new UploadResponse(false, "Invalid file type. Only PDF, DOC, and DOCX files are allowed.", null));
            }

            // Validate file size (10MB max)
            if (file.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity.badRequest()
                        .body(new UploadResponse(false, "File size too large. Maximum allowed size is 10MB.", null));
            }

            // Upload file
            NoteFile uploadedFile = noteService.uploadFile(file, request);
            
            UploadResponse response = new UploadResponse(
                true, 
                "File uploaded successfully", 
                uploadedFile
            );

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new UploadResponse(false, "Failed to upload file: " + e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new UploadResponse(false, "An error occurred during file upload", null));
        }
    }

    /**
     * Get list of all uploaded files
     * @return List of NoteFile objects
     */
    @GetMapping
    public ResponseEntity<List<NoteFile>> getAllNotes() {
        try {
            List<NoteFile> notes = noteService.getAllFiles();
            return ResponseEntity.ok(notes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Download a specific file
     * @param fileName - Name of the file to download
     * @return Resource file for download
     */
    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Resource resource = noteService.loadFileAsResource(fileName);
            
            if (resource == null || !resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Determine content type
            String contentType = Files.probeContentType(resource.getFile().toPath());
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Delete a specific file
     * @param fileName - Name of the file to delete
     * @return ResponseEntity with success/error message
     */
    @DeleteMapping("/{fileName:.+}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        try {
            boolean deleted = noteService.deleteFile(fileName);
            
            if (deleted) {
                return ResponseEntity.ok("File deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to delete file: " + e.getMessage());
        }
    }

    /**
     * Check if file type is allowed
     * @param contentType - MIME type of the file
     * @param fileName - Name of the file
     * @return true if file type is allowed
     */
    private boolean isAllowedFileType(String contentType, String fileName) {
        if (contentType == null) return false;

        // Check MIME type
        String normalizedContentType = contentType.toLowerCase();
        if (normalizedContentType.equals("application/pdf") ||
            normalizedContentType.equals("application/msword") ||
            normalizedContentType.contains("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            return true;
        }

        // Check file extension as fallback
        if (fileName != null) {
            String extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
            return extension.equals("pdf") || extension.equals("doc") || extension.equals("docx");
        }

        return false;
    }
}
