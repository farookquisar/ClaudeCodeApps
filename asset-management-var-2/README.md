# 📦 AssetVault Pro - Complete Asset Lifecycle Management System

A stunning, modern web application for managing assets throughout their entire lifecycle - from acquisition to disposal. Built with a beautiful **neobrutalist design** that's bold, colorful, and highly functional.

![Version](https://img.shields.io/badge/version-1.0.0-purple?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

## ✨ Features

### 📦 Asset Register
- **Single Asset Entry**: Add individual assets with complete details
- **Bulk Entry**: Add multiple assets at once with inline editing
- **CSV Import**: Import hundreds of assets from spreadsheets
- **Smart Filtering**: Search and filter by category, status, location
- **Transfer Management**: Move assets between locations and users
- **Disposal Tracking**: Securely retire and dispose of assets
- **Dynamic Pricing**: Update asset valuations individually or in bulk

### 📋 Task Management
Complete task lifecycle with 4 status levels:
- ⏳ **Started**: Task initiated
- 🚗 **Reached**: Team member arrived on-site
- ⚙️ **Work Started**: Active work in progress
- ✅ **Work Finished**: Task completed

**Features:**
- Admin task assignment to team members
- Real-time progress tracking
- Task types: Transfer, Assignment, Disposal, Pricing, Maintenance
- Visual progress indicators
- Due date tracking

### 🔧 Maintenance & Warranties
- **Maintenance Scheduling**: Plan and track all maintenance activities
- **Automated Reminders**: Never miss critical maintenance
- **Priority System**: High, Medium, Low priority classification
- **Warranty Management**: Track all warranties with expiration alerts
- **Contract Management**: Manage service contracts and licenses
- **Cost Tracking**: Monitor maintenance expenses

### 🔍 Asset Audit
- **Complete Audit Workflow**: Systematic asset verification
- **Real-time Progress**: Track audit completion percentage
- **Finding Categories**:
  - ❌ Missing Assets
  - ⚠️ Discrepancies
  - ℹ️ Unlisted Assets
  - ✅ Matched Records
- **Audit History**: Complete audit trail
- **Report Generation**: Export detailed audit reports

### 📊 Analytics & Reports
- **Smart Dashboard**: Key metrics at a glance
- **Visual Charts**:
  - Asset distribution by category
  - Status overview
  - Lifecycle trends
- **Pre-built Reports**:
  - Asset Valuation Report
  - Maintenance Summary
  - Depreciation Analysis
  - Utilization Report
  - Compliance & Audit
  - Warranty & Contracts

## 🎨 Design Philosophy

### Neobrutalist Aesthetic
AssetVault Pro embraces the bold **neobrutalist design** trend:

- **Thick Black Borders**: Every element has strong, 4px borders
- **Bold Colors**: Vibrant color palette with high contrast
- **Hard Shadows**: Solid, offset shadows (no blur)
- **Geometric Shapes**: Clean, rectangular components
- **Flat Design**: No gradients (except text effects)
- **Typography**: Bold, sans-serif fonts (Space Grotesk & Inter)
- **Playful Yet Professional**: Fun aesthetics meet serious functionality

## 🚀 Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process required.

### Quick Start

1. **Explore Sample Data**: The app loads with sample assets, tasks, and maintenance records
2. **Add Your First Asset**: Click "Add Asset" in the Assets page
3. **Create a Task**: Go to Tasks and click "Create Task"
4. **Start an Audit**: Navigate to Audit and click "Start New Audit"

## 📁 File Structure

```
asset-management-var-2/
├── index.html          # Main HTML structure
├── styles.css          # Neobrutalist styling
├── app.js              # Application logic and data management
└── README.md           # Documentation
```

## 💾 Data Storage

AssetVault Pro uses **localStorage** for data persistence:
- All data is stored locally in your browser
- No server required
- Data persists across sessions
- Export/import functionality for backup

## 🎯 Use Cases

### For Small Businesses
- Track office equipment and furniture
- Manage company vehicles
- Monitor software licenses
- Schedule maintenance

### For IT Departments
- Computer and peripheral inventory
- Software license management
- Hardware lifecycle tracking
- Warranty and support contract tracking

### For Facilities Management
- Building equipment tracking
- Maintenance scheduling
- Asset audits and compliance
- Vendor management

### For Schools/Universities
- Educational equipment management
- Classroom asset tracking
- Lab equipment maintenance
- IT asset lifecycle

## 🔧 Technical Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js 4.4.0
- **Storage**: localStorage API
- **Fonts**: Google Fonts (Space Grotesk, Inter)
- **Icons**: Unicode Emoji

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-purple: #A855F7;
    --color-green: #22C55E;
    --color-orange: #F97316;
    --color-blue: #3B82F6;
    /* Add more colors */
}
```

### Features

The modular design makes it easy to:
- Add new asset categories
- Create custom task types
- Add new report types
- Extend the data model

## 📊 Sample Data

The application includes sample data to help you get started:
- 5 sample assets (computer, furniture, vehicle, equipment, software)
- 2 sample tasks
- 2 maintenance records
- 2 warranties

You can clear this data anytime from the browser console:
```javascript
localStorage.clear();
location.reload();
```

## 🔐 Security Notes

- All data is stored locally in your browser
- No data is transmitted to external servers
- Recommended for internal/intranet use
- For production deployment, consider adding:
  - User authentication
  - Backend database
  - Data encryption
  - Backup mechanisms

## 📈 Future Enhancements

Potential features for future versions:
- [ ] Multi-user authentication
- [ ] Cloud backup and sync
- [ ] Mobile app version
- [ ] QR code asset labeling
- [ ] Email notifications
- [ ] Advanced reporting with PDF export
- [ ] Integration with accounting software
- [ ] Asset depreciation calculator
- [ ] Network asset discovery (SNMP, WMI)

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👏 Credits

- Design inspiration: Neobrutalism design trend
- Charts: Chart.js library
- Fonts: Google Fonts (Space Grotesk, Inter)

## 📧 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ using Neobrutalist Design Principles**

Made for asset managers, IT departments, facilities teams, and anyone who needs to track their valuable assets with style!
