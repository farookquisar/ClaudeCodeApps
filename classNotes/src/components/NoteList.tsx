import React from 'react';
import { ClassNote } from '../types';
import { NoteCard } from './NoteCard';
import { BookOpen } from 'lucide-react';

interface NoteListProps {
  notes: ClassNote[];
  onEdit: (note: ClassNote) => void;
  onDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <BookOpen size={64} className="mb-4 text-gray-300" />
        <h3 className="text-xl font-semibold mb-2">No notes found</h3>
        <p className="text-sm">Create your first class note to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
