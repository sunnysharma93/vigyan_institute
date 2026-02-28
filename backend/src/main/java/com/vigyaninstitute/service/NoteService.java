package com.vigyaninstitute.service;

import com.vigyaninstitute.dto.NoteFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * NoteService - Service layer for file operations
 * Handles file storage, retrieval, and management
 */
@Service
public class NoteService {

    // Upload directory path from application.properties
    @Value("${app.upload.dir}")
    private String uploadDir;

    // Server URL for generating download links
    @Value("${app.server.url}")
    private String serverUrl;

    /**
     * Upload file to the server
     * @param file - MultipartFile to upload
     * @param request - HttpServletRequest for server info
     * @return NoteFile with uploaded file details
     * @throws IOException if file operation fails
     */
    public NoteFile uploadFile(MultipartFile file, HttpServletRequest request) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename to avoid conflicts
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
        
        // Save file to server
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Get server URL from request or use configured URL
        String serverUrl = this.serverUrl;
        if (serverUrl == null || serverUrl.isEmpty()) {
            serverUrl = request.getScheme() + "://" + request.getServerName() + 
                        ":" + request.getServerPort() + request.getContextPath();
        }

        // Create file URL
        String fileUrl = serverUrl + "/api/notes/download/" + uniqueFilename;

        // Create and return NoteFile object
        NoteFile noteFile = new NoteFile();
        noteFile.setId(UUID.randomUUID().toString());
        noteFile.setFileName(uniqueFilename);
        noteFile.setOriginalName(originalFilename);
        noteFile.setFileType(getFileType(originalFilename));
        noteFile.setFileSize(file.getSize());
        noteFile.setUploadDate(System.currentTimeMillis());
        noteFile.setDownloadUrl(fileUrl);

        return noteFile;
    }

    /**
     * Get list of all uploaded files
     * @return List of NoteFile objects
     */
    public List<NoteFile> getAllFiles() {
        List<NoteFile> files = new ArrayList<>();
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            return files;
        }

        try {
            Files.list(uploadPath)
                    .filter(path -> Files.isRegularFile(path))
                    .forEach(path -> {
                        try {
                            NoteFile file = createNoteFileFromPath(path);
                            files.add(file);
                        } catch (Exception e) {
                            System.err.println("Error processing file: " + path + " - " + e.getMessage());
                        }
                    });
        } catch (IOException e) {
            System.err.println("Error reading upload directory: " + e.getMessage());
        }

        return files;
    }

    /**
     * Load file as resource for download
     * @param fileName - Name of the file to load
     * @return Resource object for the file
     */
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                return null;
            }
        } catch (MalformedURLException e) {
            return null;
        }
    }

    /**
     * Delete a file from the server
     * @param fileName - Name of the file to delete
     * @return true if deletion was successful
     */
    public boolean deleteFile(String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            return Files.deleteIfExists(filePath);
        } catch (IOException e) {
            System.err.println("Error deleting file: " + e.getMessage());
            return false;
        }
    }

    /**
     * Get file type from filename
     * @param fileName - Name of the file
     * @return File type as string (PDF, DOC, DOCX)
     */
    private String getFileType(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toUpperCase();
        switch (extension) {
            case "PDF":
                return "PDF";
            case "DOC":
                return "DOC";
            case "DOCX":
                return "DOCX";
            default:
                return "OTHER";
        }
    }

    /**
     * Create NoteFile object from file path
     * @param path - Path to the file
     * @return NoteFile object
     */
    private NoteFile createNoteFileFromPath(Path path) throws IOException {
        NoteFile file = new NoteFile();
        file.setId(UUID.randomUUID().toString());
        file.setFileName(path.getFileName().toString());
        file.setOriginalName(path.getFileName().toString());
        file.setFileType(getFileType(path.getFileName().toString()));
        file.setFileSize(Files.size(path));
        file.setUploadDate(Files.getLastModifiedTime(path).toMillis());
        file.setDownloadUrl(serverUrl + "/api/notes/download/" + path.getFileName().toString());
        return file;
    }
}
