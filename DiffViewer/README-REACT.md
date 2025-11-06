# 🎨 Code Compare - React + TypeScript + TailwindCSS

A modern, elegant, and professional code comparison tool built with React, TypeScript, and TailwindCSS, powered by Monaco Editor (the same editor that powers VSCode).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5-blue.svg)

## ✨ Features

### 🎯 Core Features
- **Monaco Diff Editor**: Professional-grade code comparison using VSCode's editor
- **Side-by-Side & Inline Views**: Toggle between different diff visualization modes
- **Multi-Language Support**: Syntax highlighting for 14+ languages
- **Dark/Light Theme**: Beautiful theme toggle with system preference detection
- **Sample Code**: Pre-loaded examples for quick testing
- **Quick Actions**: Swap, clear, and load sample code with one click
- **Copy to Clipboard**: One-click copy functionality for both code sections

### 🎨 Design Features
- **Glassmorphism UI**: Modern glass-card effects with backdrop blur
- **Animated Backgrounds**: Smooth floating gradient orbs
- **Responsive Design**: Mobile-first approach that works on all devices
- **Smooth Animations**: Carefully crafted transitions and hover effects
- **Custom Scrollbars**: Themed scrollbars that match the design
- **Futuristic Look**: Modern gradient accents and clean typography

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable React components
- **Custom Hooks**: Reusable logic for theme and clipboard management
- **Path Aliases**: Clean imports with `@/` prefix
- **Vite**: Lightning-fast build tool and dev server
- **Easy Theme Customization**: TailwindCSS configuration for colors
- **Local Storage**: Remembers your theme preference

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or npm 9+
- Modern web browser

### Installation

1. **Clone or navigate to the repository**
```bash
cd DiffViewer
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
DiffViewer/
├── src/
│   ├── components/          # React components
│   │   ├── AnimatedBackground.tsx
│   │   ├── CodeInput.tsx
│   │   ├── Controls.tsx
│   │   ├── DiffViewer.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useClipboard.ts
│   │   └── useTheme.ts
│   ├── styles/             # CSS styles
│   │   └── index.css
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── samples.ts
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # Vite type definitions
├── public/                 # Static assets
│   └── vite.svg
├── index-react.html        # HTML entry point
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
└── .eslintrc.cjs          # ESLint configuration
```

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color shades
        500: '#a855f7',
        600: '#9333ea',
        // ...
      },
      secondary: {
        // Your secondary color shades
        500: '#3b82f6',
        // ...
      },
    },
  },
},
```

### Adding New Languages

1. Add the language to the `Language` type in `src/types/index.ts`
2. Add sample code in `src/utils/samples.ts`
3. Add option in `src/components/Controls.tsx`

### Modifying Monaco Editor Options

Edit `src/components/DiffViewer.tsx` and modify the `options` prop:

```tsx
options={{
  renderSideBySide: isSideBySide,
  fontSize: 16, // Change font size
  minimap: { enabled: true }, // Always show minimap
  // Add more options...
}}
```

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript 5** | Type safety and developer experience |
| **Vite 5** | Build tool and dev server |
| **TailwindCSS 3** | Utility-first CSS framework |
| **@monaco-editor/react** | Code editor and diff viewer |
| **PostCSS** | CSS processing |
| **ESLint** | Code linting |

## 📖 Component Documentation

### `<Header>`
Main header with title and theme toggle button.

**Props:**
- `theme`: Current theme ('light' | 'dark')
- `onToggleTheme`: Function to toggle theme

### `<Controls>`
Control panel for language selection, view mode, and quick actions.

**Props:**
- `language`: Current programming language
- `viewType`: Current view type ('inline' | 'side-by-side')
- `onLanguageChange`: Language change handler
- `onViewTypeChange`: View type change handler
- `onSwap`: Swap code handler
- `onClear`: Clear code handler
- `onLoadSample`: Load sample code handler

### `<CodeInput>`
Text area for code input with copy functionality.

**Props:**
- `title`: Input title
- `value`: Current code value
- `onChange`: Change handler
- `placeholder`: Placeholder text
- `icon`: Icon emoji

### `<DiffViewer>`
Monaco Diff Editor wrapper component.

**Props:**
- `originalCode`: Original code string
- `modifiedCode`: Modified code string
- `language`: Programming language
- `theme`: Editor theme
- `viewType`: Diff view type

### `<Footer>`
Footer with credits and information.

### `<AnimatedBackground>`
Animated background with floating gradient orbs.

## 🎯 Custom Hooks

### `useTheme()`
Manages theme state and persistence.

**Returns:**
- `theme`: Current theme
- `toggleTheme`: Function to toggle theme

### `useClipboard()`
Manages clipboard operations.

**Returns:**
- `copyToClipboard`: Async function to copy text
- `copied`: Boolean indicating if text was recently copied

## 🎓 Type Definitions

All TypeScript types are defined in `src/types/index.ts`:

- `Theme`: 'light' | 'dark'
- `ViewType`: 'inline' | 'side-by-side'
- `Language`: Supported programming languages
- `CodeSample`: { old: string; new: string }
- `SampleData`: Record of code samples
- `MonacoEditorOptions`: Monaco editor configuration

## 🌟 Key Design Principles

### 1. **Component-Based Architecture**
Each UI element is a reusable, self-contained component.

### 2. **Type Safety**
Full TypeScript coverage with strict mode enabled.

### 3. **Performance**
- Optimized re-renders with proper state management
- Lazy loading of Monaco Editor
- Automatic layout adjustment

### 4. **Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Proper contrast ratios

### 5. **Developer Experience**
- Path aliases for clean imports
- ESLint for code quality
- Hot module replacement
- Fast build times with Vite

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Use Cases

Perfect for:
- Code reviews
- Comparing file versions
- Teaching programming concepts
- Debugging code changes
- Documentation examples
- Git diff visualization
- Learning version control
- Code refactoring analysis

## 🔄 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Monaco Editor not loading?
- Check your internet connection (Monaco loads from CDN initially)
- Clear browser cache
- Check browser console for errors

### Build failing?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### Port 3000 already in use?
Edit `vite.config.ts` and change the port:
```ts
server: {
  port: 3001, // Change port
}
```

## 🚀 Deployment

### Vercel
```bash
npm run build
# Deploy dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist folder to gh-pages branch
```

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add TypeScript types
5. Test thoroughly
6. Submit a pull request

## 📄 License

MIT License - Feel free to use this for personal or commercial projects!

## 🙏 Credits

- **Monaco Editor**: Microsoft (VSCode team)
- **React**: Meta (Facebook)
- **TailwindCSS**: Tailwind Labs
- **Vite**: Evan You and team
- **TypeScript**: Microsoft

## 💡 Tips for Development

### Hot Module Replacement
Changes to components will instantly reflect without page reload.

### TypeScript Strict Mode
The project uses strict TypeScript settings. This catches bugs early!

### Path Aliases
Use `@/` prefix for imports:
```tsx
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components';
```

### Component Patterns
Follow the existing component patterns for consistency:
- Props interface at the top
- Destructure props in function parameters
- Use TypeScript for all props and state
- Export components as named exports

### State Management
Currently using React hooks. For larger apps, consider:
- Context API for global state
- Zustand for simple state management
- Redux for complex state needs

## 🎨 Design System

### Colors
- **Primary**: Purple (#a855f7)
- **Secondary**: Blue (#3b82f6)
- **Accent**: Pink/Magenta (#d946ef)
- **Success**: Green (#22c55e)

### Typography
- **UI Font**: Inter
- **Code Font**: Fira Code

### Spacing
- Uses Tailwind's default spacing scale
- Consistent padding/margin across components

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

**Made with ❤️ for developers who love beautiful tools**

Enjoy comparing your code with style! 🎉
