# 🎨 Code Compare - Beautiful Diff Viewer

A modern, elegant, and user-friendly code comparison tool powered by Monaco Editor (the same editor that powers VSCode).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue.svg)

## ✨ Features

### 🎯 Core Features
- **Monaco Diff Editor**: Professional-grade code comparison using VSCode's editor
- **Side-by-Side & Inline Views**: Toggle between different diff visualization modes
- **Multi-Language Support**: Syntax highlighting for JavaScript, TypeScript, Python, HTML, CSS, JSON, Markdown, and more
- **Dark/Light Theme**: Beautiful theme toggle with system preference detection
- **Sample Code**: Pre-loaded examples for quick testing
- **Quick Actions**: Swap, clear, and load sample code with one click

### 🎨 Design Features
- **Glassmorphism UI**: Modern glass-card effects with backdrop blur
- **Animated Backgrounds**: Smooth floating gradient orbs
- **Responsive Design**: Mobile-first approach that works on all devices
- **Smooth Animations**: Carefully crafted transitions and hover effects
- **Custom Scrollbars**: Themed scrollbars that match the design
- **Futuristic Look**: Modern gradient accents and clean typography

### 🔧 Technical Features
- **Zero Build Setup**: Single HTML file with CDN dependencies
- **Easy Theme Customization**: CSS variables for colors, shadows, and borders
- **Local Storage**: Remembers your theme preference
- **Copy to Clipboard**: Quick copy functionality for both code sections
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Quick Start

### Option 1: Download and Run
1. Download the `index.html` file
2. Open it in any modern web browser
3. Start comparing code!

### Option 2: Serve Locally
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📖 How to Use

### Basic Usage
1. **Select Language**: Choose your programming language from the dropdown
2. **Enter Code**: Paste your original code in the left panel and modified code in the right panel
3. **View Differences**: The diff viewer automatically highlights changes
4. **Toggle View**: Switch between inline and side-by-side views

### Quick Actions
- **🔄 Swap**: Exchange the original and modified code
- **🗑️ Clear**: Remove all code from both panels
- **✨ Sample**: Load a sample code comparison for the selected language
- **📋 Copy**: Copy code to clipboard

### View Modes
- **Inline**: Shows changes in a single column (better for mobile)
- **Side by Side**: Shows original and modified code side-by-side (better for desktop)

### Theme Toggle
- Click the **🌙 Dark / ☀️ Light** button to switch themes
- Theme preference is saved automatically

## 🎨 Customization

### Changing Colors
Edit the CSS variables in the `:root` section:

```css
:root {
    /* Primary Colors */
    --color-primary: 139, 92, 246;  /* Purple */
    --color-secondary: 59, 130, 246; /* Blue */
    --color-accent: 236, 72, 153;    /* Pink */
    --color-success: 34, 197, 94;    /* Green */
    --color-warning: 251, 146, 60;   /* Orange */
}
```

### Changing Border Radius
```css
:root {
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
}
```

### Changing Shadows
```css
:root {
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

## 🛠️ Technologies Used

- **React 18**: UI framework
- **Monaco Editor**: Code editor and diff viewer
- **TailwindCSS**: Utility-first CSS framework
- **Babel Standalone**: JSX transformation in the browser
- **Google Fonts**: Inter (UI) and Fira Code (monospace)

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

## 🌟 Key Design Principles

### 1. **Minimalist & Elegant**
Clean interface with focus on the content, not distractions.

### 2. **Mobile-First**
Designed for mobile devices first, then enhanced for larger screens.

### 3. **Accessible**
WCAG compliant with proper contrast ratios and keyboard navigation.

### 4. **Fast & Lightweight**
Optimized performance with efficient rendering and minimal dependencies.

### 5. **Easy to Customize**
CSS variables and well-organized code make customization simple.

## 🔄 Sample Code Presets

Includes sample comparisons for:
- **JavaScript**: Function refactoring (for loop → reduce)
- **Python**: Fibonacci optimization (memoization)
- **HTML**: Modern HTML5 structure

## 📝 Monaco Editor Options

The diff editor is configured with:
- Line numbers
- Syntax highlighting
- Word wrap
- Whitespace rendering
- Minimap (on desktop)
- Automatic layout
- Smooth scrolling

## 🎓 Learning Features

Great for teaching:
- Code optimization techniques
- Refactoring patterns
- Best practices evolution
- Version control concepts
- Code review skills

## 🤝 Contributing

This is a single-file application, making it easy to:
1. Fork and customize
2. Add new sample code
3. Add more languages
4. Enhance the UI
5. Add new features

## 📄 License

MIT License - Feel free to use this for personal or commercial projects!

## 🙏 Credits

- **Monaco Editor**: Microsoft (VSCode team)
- **React**: Meta (Facebook)
- **TailwindCSS**: Tailwind Labs
- **Fonts**: Google Fonts

## 💡 Tips

### For Best Experience
- Use on a modern browser
- Enable JavaScript
- Use larger screens for side-by-side view
- Try the dark theme for reduced eye strain
- Load samples to see the diff viewer in action

### Performance Tips
- The minimap is disabled on mobile for better performance
- Automatic layout ensures the editor fits the container
- Efficient re-rendering with React hooks

## 🐛 Troubleshooting

**Monaco Editor not loading?**
- Check your internet connection (CDN dependencies)
- Clear browser cache
- Try a different browser

**Diff not showing?**
- Make sure both code panels have content
- Check if you selected the correct language
- Try loading a sample to verify functionality

**Theme not persisting?**
- Check if localStorage is enabled in your browser
- Clear site data and try again

## 🚀 Future Enhancements

Possible additions:
- Export diff as image/PDF
- Share diff via URL
- More language support
- Diff statistics
- File upload support
- Line-by-line commenting
- Multiple theme presets
- Keyboard shortcuts panel

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review the code comments

---

**Made with ❤️ for developers who love beautiful tools**

Enjoy comparing your code with style! 🎉
