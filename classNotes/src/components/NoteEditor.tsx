import React, { useState, useCallback, useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { X, Save, Maximize2, Minimize2 } from 'lucide-react';
import { ClassNote } from '../types';

interface NoteEditorProps {
  note: ClassNote | null;
  onSave: (note: Partial<ClassNote>) => void;
  onClose: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onClose }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState(note?.category || '');
  const [date, setDate] = useState(note?.date || new Date().toISOString().split('T')[0]);
  const [speaker, setSpeaker] = useState(note?.speaker || '');
  const [location, setLocation] = useState(note?.location || '');
  const [isZenMode, setIsZenMode] = useState(false);

  const editorOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: 'Start writing your class notes in markdown...',
    autofocus: true,
    status: false,
    toolbar: [
      'bold', 'italic', 'heading', '|',
      'quote', 'unordered-list', 'ordered-list', '|',
      'link', 'image', '|',
      'preview', 'side-by-side', 'fullscreen', '|',
      'guide'
    ]
  }), []);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for your note');
      return;
    }

    const noteData: Partial<ClassNote> = {
      title: title.trim(),
      content,
      category: category.trim(),
      date,
      speaker: speaker.trim(),
      location: location.trim()
    };

    if (note) {
      noteData.id = note.id;
    }

    onSave(noteData);
    onClose();
  };

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <div className={`bg-white rounded-lg shadow-lg ${isZenMode ? 'zen-mode p-8' : 'p-6'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {note ? 'Edit Note' : 'New Class Note'}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsZenMode(!isZenMode)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title={isZenMode ? 'Exit Zen Mode' : 'Enter Zen Mode'}
          >
            {isZenMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save size={18} />
            Save
          </button>
          {!isZenMode && (
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Note Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Mathematics, Science, History"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speaker/Teacher
          </label>
          <input
            type="text"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            placeholder="e.g., Professor Smith"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Room 101, Online, Main Hall"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Markdown Editor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content (Markdown)
        </label>
        <SimpleMDE
          value={content}
          onChange={handleContentChange}
          options={editorOptions}
        />
      </div>

      {isZenMode && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setIsZenMode(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Exit Zen Mode
          </button>
        </div>
      )}
    </div>
  );
};
