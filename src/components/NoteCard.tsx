/**
 * NoteCard component - Reusable card for uploaded notes
 * Features file type badges, download, and delete functionality
 */

import React from 'react';
import { NoteCardProps } from '../types/note';
import { getFileUrl, formatFileSize } from '../services/noteService';

const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  onDelete, 
  className = '' 
}) => {
  const handleDownload = (): void => {
    // Create download link
    const link = document.createElement('a');
    link.href = getFileUrl(note.fileName);
    link.download = note.originalName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (): void => {
    // Open file in new tab for viewing
    const link = document.createElement('a');
    link.href = getFileUrl(note.fileName);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (): void => {
    if (onDelete && window.confirm(`Are you sure you want to delete "${note.originalName}"?`)) {
      onDelete(note.id);
    }
  };

  // Get file type icon and color
  const getFileTypeInfo = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return {
          icon: '📄',
          bgColor: 'bg-red-100',
          textColor: 'text-red-600',
          borderColor: 'border-red-200'
        };
      case 'DOC':
        return {
          icon: '📝',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        };
      case 'DOCX':
        return {
          icon: '📄',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        };
      default:
        return {
          icon: '📄',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200'
        };
    }
  };

  const fileType = getFileTypeInfo(note.fileType);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${className}`}
    >
      {/* Card Header */}
      <div className="p-6">
        {/* File Type Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${fileType.bgColor} ${fileType.textColor} ${fileType.borderColor} border`}>
            <span className="mr-1">{fileType.icon}</span>
            {note.fileType}
          </span>
          <span className="text-xs text-gray-500">
            {formatFileSize(note.fileSize)}
          </span>
        </div>

        {/* File Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2" title={note.originalName}>
          {note.originalName}
        </h3>

        {/* Upload Date */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(note.uploadDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleView}
            className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download
          </button>
          {onDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors duration-200 flex items-center justify-center"
              title="Delete note"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
