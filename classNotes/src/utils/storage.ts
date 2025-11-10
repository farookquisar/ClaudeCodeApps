import { ClassNote } from '../types';

const STORAGE_KEY = 'class-notes-app-data';

export const storage = {
  getNotes: (): ClassNote[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from storage:', error);
      return [];
    }
  },

  saveNotes: (notes: ClassNote[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },

  addNote: (note: ClassNote): void => {
    const notes = storage.getNotes();
    notes.push(note);
    storage.saveNotes(notes);
  },

  updateNote: (id: string, updates: Partial<ClassNote>): void => {
    const notes = storage.getNotes();
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...updates, updatedAt: Date.now() };
      storage.saveNotes(notes);
    }
  },

  deleteNote: (id: string): void => {
    const notes = storage.getNotes();
    const filtered = notes.filter(note => note.id !== id);
    storage.saveNotes(filtered);
  },

  getUniqueCategories: (): string[] => {
    const notes = storage.getNotes();
    const categories = notes.map(note => note.category).filter(Boolean);
    return Array.from(new Set(categories)).sort();
  },

  getUniqueSpeakers: (): string[] => {
    const notes = storage.getNotes();
    const speakers = notes.map(note => note.speaker).filter(Boolean);
    return Array.from(new Set(speakers)).sort();
  },

  getUniqueLocations: (): string[] => {
    const notes = storage.getNotes();
    const locations = notes.map(note => note.location).filter(Boolean);
    return Array.from(new Set(locations)).sort();
  }
};
