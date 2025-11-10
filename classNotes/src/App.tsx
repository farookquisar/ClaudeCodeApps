import React, { useState, useEffect, useMemo } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { ClassNote, SearchFilters } from './types';
import { storage } from './utils/storage';
import { NoteEditor } from './components/NoteEditor';
import { NoteList } from './components/NoteList';
import { SearchBar } from './components/SearchBar';

function App() {
  const [notes, setNotes] = useState<ClassNote[]>([]);
  const [currentNote, setCurrentNote] = useState<ClassNote | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    speaker: '',
    location: '',
    dateFrom: '',
    dateTo: ''
  });

  // Load notes from storage
  useEffect(() => {
    const loadedNotes = storage.getNotes();
    setNotes(loadedNotes);
  }, []);

  // Get unique values for filters
  const categories = useMemo(() => storage.getUniqueCategories(), [notes]);
  const speakers = useMemo(() => storage.getUniqueSpeakers(), [notes]);
  const locations = useMemo(() => storage.getUniqueLocations(), [notes]);

  // Filter notes based on search criteria
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      // Text search
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const searchableText = [
          note.title,
          note.content,
          note.category,
          note.speaker,
          note.location
        ].join(' ').toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Category filter
      if (filters.category && note.category !== filters.category) {
        return false;
      }

      // Speaker filter
      if (filters.speaker && note.speaker !== filters.speaker) {
        return false;
      }

      // Location filter
      if (filters.location && note.location !== filters.location) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && note.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && note.date > filters.dateTo) {
        return false;
      }

      return true;
    }).sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, filters]);

  const handleSaveNote = (noteData: Partial<ClassNote>) => {
    if (noteData.id) {
      // Update existing note
      storage.updateNote(noteData.id, noteData);
    } else {
      // Create new note
      const newNote: ClassNote = {
        id: Date.now().toString(),
        title: noteData.title || '',
        content: noteData.content || '',
        category: noteData.category || '',
        date: noteData.date || new Date().toISOString().split('T')[0],
        speaker: noteData.speaker || '',
        location: noteData.location || '',
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      storage.addNote(newNote);
    }

    // Reload notes
    setNotes(storage.getNotes());
    setIsEditing(false);
    setCurrentNote(null);
  };

  const handleEditNote = (note: ClassNote) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleDeleteNote = (id: string) => {
    storage.deleteNote(id);
    setNotes(storage.getNotes());
  };

  const handleNewNote = () => {
    setCurrentNote(null);
    setIsEditing(true);
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
    setCurrentNote(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Class Notes</h1>
                <p className="text-sm text-gray-500">
                  {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                </p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={handleNewNote}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus size={20} />
                New Note
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEditing ? (
          <NoteEditor
            note={currentNote}
            onSave={handleSaveNote}
            onClose={handleCloseEditor}
          />
        ) : (
          <>
            <SearchBar
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              speakers={speakers}
              locations={locations}
            />
            <NoteList
              notes={filteredNotes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
