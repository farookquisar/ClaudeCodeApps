# AssetTrack Pro - Asset Tracking & Management System

A modern, feature-rich web application for comprehensive asset tracking and management.

## Features

### Core Functionality
- **Asset Register** - Complete CRUD operations for asset management
- **Asset Transfer** - Track asset movements between locations
- **Asset Disposal** - Record and manage asset disposal with detailed tracking
- **Asset Pricing** - Track valuations, depreciation, and pricing history
- **Task Management** - Admin can assign tasks to team members for various asset activities
- **Maintenance Tracking** - Schedule and track maintenance with automated reminders
- **Contracts & Warranties** - Manage service agreements, warranties, and contracts
- **Team Management** - User roles (Admin/Member) with task assignment capabilities

### Key Highlights
- **Modern UI** - Clean, trendy interface with gradient accents
- **Dashboard** - Comprehensive overview with key metrics and alerts
- **Real-time Notifications** - Upcoming maintenance and expiring contracts alerts
- **Role-based Access** - Admin and Member roles with appropriate permissions
- **Data Persistence** - LocalStorage for seamless data retention
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI framework
- **Vite** - Fast build tool
- **React Router** - Navigation
- **Tailwind CSS** - Modern styling
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation

## Getting Started

### Installation

```bash
# Navigate to the project directory
cd asset-tracking-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Default Login
The app starts with a default admin user:
- **Name:** Admin User
- **Email:** admin@example.com
- **Role:** Admin

## Usage Guide

### Dashboard
View key metrics, upcoming maintenance, expiring contracts, and recent assets.

### Asset Register
1. Click "Add Asset" to register new assets
2. Fill in asset details (name, tag, category, location, etc.)
3. Edit or delete assets as needed
4. Search and filter assets easily

### Transfer Assets
1. Select an asset from the dropdown
2. Enter the destination location
3. Add optional notes
4. View transfer history

### Dispose Assets
1. Select an asset to dispose
2. Choose disposal reason
3. Add notes about the disposal
4. View disposal statistics and history

### Pricing & Valuation
1. Select an asset to update value
2. Enter new valuation
3. Choose valuation method
4. Track depreciation automatically

### Task Management (Admin Only)
1. Click "Assign Task" to create new tasks
2. Select activity type (Transfer, Disposal, etc.)
3. Assign to team members
4. Set priority and due dates
5. Track progress with Kanban board

### Maintenance Tracking
1. Add maintenance records for assets
2. Set next maintenance dates
3. Get alerts for upcoming maintenance
4. Track maintenance history and costs

### Contracts & Warranties
1. Register contracts and warranties
2. Link to specific assets
3. Track expiration dates
4. Get renewal reminders

### Team Members (Admin Only)
1. Add team members with email and role
2. Assign Admin or Member roles
3. View task summaries per member
4. Edit or remove members

## Features Overview

### For Admins
- Full access to all features
- Assign tasks to team members
- Manage team members
- Complete asset lifecycle management

### For Members
- View assigned tasks
- Update task status
- View asset information
- Limited editing capabilities

## Data Storage

All data is stored in browser LocalStorage, making it perfect for:
- Single-user deployments
- Development and testing
- Offline-first applications

To upgrade to a backend:
1. Replace LocalStorage calls in `AppContext.jsx`
2. Connect to your API (REST, GraphQL, etc.)
3. Add authentication layer

## Color Scheme

The app uses a modern gradient-based color palette:
- **Primary:** Blue (#0ea5e9)
- **Success:** Green
- **Warning:** Yellow/Orange
- **Danger:** Red
- **Dark:** Slate gray tones

## Project Structure

```
asset-tracking-app/
├── public/
├── src/
│   ├── components/
│   │   └── Layout.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── AssetRegister.jsx
│   │   ├── Transfer.jsx
│   │   ├── Disposal.jsx
│   │   ├── Pricing.jsx
│   │   ├── Tasks.jsx
│   │   ├── Maintenance.jsx
│   │   ├── Contracts.jsx
│   │   └── Members.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a demonstration project. Feel free to fork and customize for your needs!

## License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ using React and Tailwind CSS
