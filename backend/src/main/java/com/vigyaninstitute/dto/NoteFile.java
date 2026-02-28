package com.vigyaninstitute.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * NoteFile - Data Transfer Object for file information
 * Represents a file uploaded to the system
 */
public class NoteFile {

    private String id;
    private String fileName;
    private String originalName;
    private String fileType;
    private Long fileSize;
    private Long uploadDate;
    private String downloadUrl;

    // Default constructor
    public NoteFile() {
    }

    // Parameterized constructor
    public NoteFile(String id, String fileName, String originalName, String fileType, 
                   Long fileSize, Long uploadDate, String downloadUrl) {
        this.id = id;
        this.fileName = fileName;
        this.originalName = originalName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.uploadDate = uploadDate;
        this.downloadUrl = downloadUrl;
    }

    // Getters and Setters
    @JsonProperty("id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @JsonProperty("fileName")
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @JsonProperty("originalName")
    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    @JsonProperty("fileType")
    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    @JsonProperty("fileSize")
    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    @JsonProperty("uploadDate")
    public Long getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Long uploadDate) {
        this.uploadDate = uploadDate;
    }

    @JsonProperty("downloadUrl")
    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }

    @Override
    public String toString() {
        return "NoteFile{" +
                "id='" + id + '\'' +
                ", fileName='" + fileName + '\'' +
                ", originalName='" + originalName + '\'' +
                ", fileType='" + fileType + '\'' +
                ", fileSize=" + fileSize +
                ", uploadDate=" + uploadDate +
                ", downloadUrl='" + downloadUrl + '\'' +
                '}';
    }
}
