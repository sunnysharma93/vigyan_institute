/**
 * Notes module type definitions
 * Defines interfaces for notes and file types
 */

export interface Note {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  fileType: 'PDF' | 'DOC' | 'DOCX';
  subject: string;
  grade: string;
  uploadDate: string;
  downloadCount: number;
  tags: string[];
}

export interface NoteCardProps {
  note: Note;
  onDownload?: (note: Note) => void;
  className?: string;
}

export interface NotesPageProps {
  className?: string;
}
