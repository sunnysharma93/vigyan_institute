package com.vigyaninstitute.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * UploadResponse - Data Transfer Object for upload operation results
 * Contains success status, message, and uploaded file data
 */
public class UploadResponse {

    private boolean success;
    private String message;
    private NoteFile data;

    // Default constructor
    public UploadResponse() {
    }

    // Parameterized constructor
    public UploadResponse(boolean success, String message, NoteFile data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    // Getters and Setters
    @JsonProperty("success")
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    @JsonProperty("message")
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @JsonProperty("data")
    public NoteFile getData() {
        return data;
    }

    public void setData(NoteFile data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "UploadResponse{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
