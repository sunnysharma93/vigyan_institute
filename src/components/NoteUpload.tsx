/**
 * NoteUpload component - File upload with drag & drop support
 * Features file validation, progress tracking, and error handling
 */

import React, { useState, useCallback } from 'react';
import { NoteUploadProps, UploadProgress } from '../types/note';
import { validateFileType, validateFileSize, formatFileSize } from '../services/noteService';

const NoteUpload: React.FC<NoteUploadProps> = ({ 
  onUploadSuccess, 
  onUploadError, 
  className = '' 
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (files: FileList | null): void => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    if (!validateFileType(file)) {
      onUploadError?.('Invalid file type. Only PDF, DOC, and DOCX files are allowed.');
      return;
    }

    // Validate file size (10MB limit)
    if (!validateFileSize(file)) {
      onUploadError?.('File size too large. Maximum allowed size is 10MB.');
      return;
    }

    setSelectedFile(file);
  };

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleFileSelect(e.target.files);
  };

  // Handle upload
  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress({ loaded: 0, total: selectedFile.size, percentage: 0 });

    try {
      // Import uploadNote dynamically to avoid circular dependency
      const noteService = await import('../services/noteService');
      
      const response = await noteService.uploadNote(selectedFile, (progress: any) => {
        setUploadProgress(progress);
      });

      if (response.success && response.data) {
        const newNote = {
          id: Date.now().toString(), // Temporary ID, should come from backend
          fileName: response.data.fileName,
          originalName: selectedFile.name,
          fileType: response.data.fileName.split('.').pop()?.toUpperCase() as 'PDF' | 'DOC' | 'DOCX',
          fileSize: response.data.fileSize,
          fileSizeFormatted: formatFileSize(response.data.fileSize),
          uploadDate: new Date().toISOString(),
          downloadUrl: response.data.fileUrl
        };

        onUploadSuccess?.(newNote);
        setSelectedFile(null);
        setUploadProgress({ loaded: 0, total: 0, percentage: 0 });
      } else {
        onUploadError?.(response.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      onUploadError?.(error.response?.data?.message || error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  // Reset selected file
  const handleReset = (): void => {
    setSelectedFile(null);
    setUploadProgress({ loaded: 0, total: 0, percentage: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get file type icon
  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'docx':
        return '📄';
      default:
        return '📄';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Study Material</h2>
      
      {/* Drag & Drop Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          
          {isDragging ? (
            <p className="text-blue-600 font-medium mb-2">Drop your file here</p>
          ) : (
            <p className="text-gray-600 font-medium mb-2">
              Drag & drop your file here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 underline"
              >
                browse
              </button>
            </p>
          )}
          
          <p className="text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX (Max size: 10MB)
          </p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Selected File Info */}
      {selectedFile && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{getFileIcon(selectedFile.name)}</span>
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Remove file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Uploading...</span>
            <span className="text-sm text-gray-600">{uploadProgress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress.percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">
              {formatFileSize(uploadProgress.loaded)} uploaded
            </span>
            <span className="text-xs text-gray-500">
              {formatFileSize(uploadProgress.total)} total
            </span>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !isUploading && (
        <button
          onClick={handleUpload}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Upload File
        </button>
      )}
    </div>
  );
};

export default NoteUpload;
