import React from 'react';
import { Edit2, Trash2, Calendar, User, MapPin, Tag } from 'lucide-react';
import { ClassNote } from '../types';
import ReactMarkdown from 'react-markdown';

interface NoteCardProps {
  note: ClassNote;
  onEdit: (note: ClassNote) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPreview = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/[#*`>\-\[\]]/g, '').trim();
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">
          {note.title}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit note"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this note?')) {
                onDelete(note.id);
              }
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
        {note.date && (
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(note.date)}</span>
          </div>
        )}
        {note.category && (
          <div className="flex items-center gap-1">
            <Tag size={14} />
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {note.category}
            </span>
          </div>
        )}
        {note.speaker && (
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{note.speaker}</span>
          </div>
        )}
        {note.location && (
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{note.location}</span>
          </div>
        )}
      </div>

      {/* Content Preview */}
      {note.content && (
        <div className="text-sm text-gray-600 line-clamp-3">
          {getPreview(note.content)}
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
        Updated {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};
