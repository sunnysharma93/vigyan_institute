/**
 * Note System Type Definitions
 * Defines interfaces for file upload and note management
 */

export interface Note {
  id: string;
  fileName: string;
  originalName: string;
  fileType: 'PDF' | 'DOC' | 'DOCX';
  fileSize: number;
  fileSizeFormatted: string;
  uploadDate: string;
  downloadUrl: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
  };
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface NoteUploadProps {
  onUploadSuccess: (file: Note) => void;
  onUploadError: (error: string) => void;
  className?: string;
}

export interface NoteCardProps {
  note: Note;
  onDelete?: (noteId: string) => void;
  className?: string;
}
