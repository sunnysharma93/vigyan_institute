/**
 * Note Service - API service for note upload and management
 * Handles all backend communication for notes functionality
 */

import axios, { AxiosProgressEvent } from 'axios';
import { Note, UploadResponse, UploadProgress } from '../types/note';

// API base URL - configure for your backend
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

/**
 * Upload a file to the server
 * @param file - File to upload
 * @param onProgress - Progress callback function
 * @returns Promise<UploadResponse>
 */
export const uploadNote = async (
  file: File,
  onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post<UploadResponse>('/notes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage,
          });
        }
      },
    });

    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

/**
 * Get list of all uploaded notes
 * @returns Promise<NoteFile[]>
 */
export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await apiClient.get<Note[]>('/notes');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

/**
 * Delete a note by ID
 * @param noteId - ID of the note to delete
 * @returns Promise<void>
 */
export const deleteNote = async (noteId: string): Promise<void> => {
  try {
    await apiClient.delete(`/notes/${noteId}`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

/**
 * Get file URL for download
 * @param fileName - Name of the file
 * @returns string - Full URL to the file
 */
export const getFileUrl = (fileName: string): string => {
  return `${API_BASE_URL}/notes/download/${fileName}`;
};

/**
 * Format file size in human readable format
 * @param bytes - Size in bytes
 * @returns string - Formatted size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file type from file name or MIME type
 * @param fileName - Name of the file
 * @param mimeType - MIME type of the file
 * @returns 'PDF' | 'DOC' | 'DOCX' | 'OTHER'
 */
export const getFileType = (fileName: string, mimeType?: string): 'PDF' | 'DOC' | 'DOCX' | 'OTHER' => {
  const extension = fileName.split('.').pop()?.toUpperCase();
  
  if (extension === 'PDF') return 'PDF';
  if (extension === 'DOC') return 'DOC';
  if (extension === 'DOCX') return 'DOCX';
  
  // Check MIME type as fallback
  if (mimeType) {
    if (mimeType === 'application/pdf') return 'PDF';
    if (mimeType.includes('msword') || mimeType === 'application/msword') return 'DOC';
    if (mimeType.includes('openxmlformats-officedocument.wordprocessingml.document')) return 'DOCX';
  }
  
  return 'OTHER';
};

/**
 * Validate file type
 * @param file - File to validate
 * @returns boolean - True if file type is allowed
 */
export const validateFileType = (file: File): boolean => {
  const allowedTypes = ['PDF', 'DOC', 'DOCX'];
  const fileType = getFileType(file.name, file.type);
  return allowedTypes.includes(fileType);
};

/**
 * Validate file size (max 10MB)
 * @param file - File to validate
 * @param maxSize - Maximum allowed size in bytes (default: 10MB)
 * @returns boolean - True if file size is within limit
 */
export const validateFileSize = (file: File, maxSize: number = 10 * 1024 * 1024): boolean => {
  return file.size <= maxSize;
};
