# Class Notes App

A beautiful and simple markdown-based class notes application with powerful search and organization features.

## Features

- **Quick Note Creation**: Create a class note and start writing immediately
- **Markdown Editor**: Full-featured markdown editor with preview and toolbar
- **Smart Organization**: Organize notes by:
  - Category (e.g., Mathematics, Science, History)
  - Date
  - Speaker/Teacher
  - Location
- **Powerful Search**: Find notes quickly using:
  - Text search across title and content
  - Filter by category, speaker, location
  - Date range filtering
- **Zen Mode**: Distraction-free writing with maximized view
- **Easy Management**: View, edit, and delete notes with intuitive UI
- **Local Storage**: All notes saved locally in your browser

## Getting Started

### Prerequisites

- Node.js 16+ installed on your system
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd classNotes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Usage Guide

### Creating a New Note

1. Click the "New Note" button in the top right
2. Fill in the note details:
   - **Title** (required): Give your note a descriptive title
   - **Date**: When the class took place
   - **Category**: Subject or topic area
   - **Speaker/Teacher**: Who delivered the class
   - **Location**: Where the class took place
3. Write your notes in markdown format
4. Click "Save" to store your note

### Editing Notes

- Click the edit icon (pencil) on any note card
- Make your changes
- Click "Save" to update

### Searching Notes

1. Use the main search bar to search across all note content
2. Click "Filters" to access advanced search options:
   - Filter by specific category
   - Filter by speaker
   - Filter by location
   - Set date range (from/to)
3. Click "Clear" (X button) to reset all filters

### Zen Mode

While editing a note, click the maximize icon to enter Zen Mode for distraction-free writing. Click the minimize icon to exit.

### Markdown Support

The editor supports full markdown syntax including:
- Headers (`#`, `##`, `###`)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- Links and images
- Code blocks
- Quotes
- And more!

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **SimpleMDE** - Markdown editor
- **Lucide React** - Icons
- **Local Storage** - Data persistence

## Project Structure

```
classNotes/
├── src/
│   ├── components/
│   │   ├── NoteEditor.tsx      # Markdown editor with zen mode
│   │   ├── NoteList.tsx        # Grid view of notes
│   │   ├── NoteCard.tsx        # Individual note card
│   │   └── SearchBar.tsx       # Search and filter component
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── utils/
│   │   └── storage.ts          # Local storage utilities
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Data Storage

All notes are stored in your browser's local storage. This means:
- Notes persist between sessions
- Data is stored locally on your device
- No server or account required
- Notes are private to your browser

**Note**: Clearing your browser data will delete all notes. Consider exporting important notes regularly.

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License - Feel free to use and modify as needed.

## Support

For issues or questions, please open an issue on the GitHub repository.
