/* ============================================
   ASSETVAULT PRO - JAVASCRIPT
   Complete Asset Management System
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    currentPage: 'dashboard',
    currentMaintenanceTab: 'maintenance',
    currentAddAssetTab: 'single',
    assets: [],
    tasks: [],
    maintenanceItems: [],
    warranties: [],
    contracts: [],
    auditData: {}
};

// ============================================
// NAVIGATION
// ============================================
function showPage(pageName) {
    // Update state
    AppState.currentPage = pageName;

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add click handlers to nav links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-page');
            showPage(pageName);
        });
    });
});

// ============================================
// MODAL MANAGEMENT
// ============================================
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modal-overlay');

    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// ============================================
// ASSET MANAGEMENT
// ============================================
function showAddAssetModal() {
    showModal('modal-add-asset');
}

function showTransferModal() {
    showModal('modal-transfer');
}

function showImportModal() {
    showAddAssetModal();
    switchAddAssetTab('csv');
}

function showDiscoveryModal() {
    showAddAssetModal();
    switchAddAssetTab('discovery');
}

function showDisposalModal() {
    showToast('Disposal modal will be implemented');
}

function viewAsset(button) {
    const row = button.closest('tr');
    const assetId = row.querySelector('.asset-id').textContent;
    showToast(`Viewing asset: ${assetId}`);
}

function editAsset(button) {
    const row = button.closest('tr');
    const assetId = row.querySelector('.asset-id').textContent;
    showToast(`Editing asset: ${assetId}`);
}

function transferAsset(button) {
    const row = button.closest('tr');
    const assetId = row.querySelector('.asset-id').textContent;
    showTransferModal();
}

function clearFilters() {
    document.getElementById('asset-search').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('location-filter').value = '';
    showToast('Filters cleared');
}

// ============================================
// ADD ASSET TABS
// ============================================
function switchAddAssetTab(tabName) {
    AppState.currentAddAssetTab = tabName;

    // Hide all tabs
    document.querySelectorAll('.add-asset-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    const targetTab = document.getElementById(`add-${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Update tab buttons
    document.querySelectorAll('.tabs-modal .tab').forEach((tab, index) => {
        tab.classList.remove('active');
    });

    // Map tab names to indices
    const tabMap = { 'single': 0, 'bulk': 1, 'csv': 2, 'discovery': 3 };
    const tabButtons = document.querySelectorAll('.tabs-modal .tab');
    if (tabButtons[tabMap[tabName]]) {
        tabButtons[tabMap[tabName]].classList.add('active');
    }
}

// Bulk entry functions
function addBulkRow() {
    const tbody = document.getElementById('bulk-entry-rows');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" class="input input-sm" placeholder="Asset name"></td>
        <td><input type="text" class="input input-sm" placeholder="Category"></td>
        <td><input type="text" class="input input-sm" placeholder="Location"></td>
        <td><input type="number" class="input input-sm" placeholder="$"></td>
        <td><button class="btn-icon" onclick="removeBulkRow(this)">🗑️</button></td>
    `;
    tbody.appendChild(newRow);
}

function removeBulkRow(button) {
    const row = button.closest('tr');
    row.remove();
}

// ============================================
// TASK MANAGEMENT
// ============================================
function showCreateTaskModal() {
    showToast('Create task modal will be implemented');
}

function viewTask(button) {
    showToast('Viewing task details');
}

function updateTaskStatus(button) {
    const taskCard = button.closest('.task-card');
    const taskTitle = taskCard.querySelector('.task-title').textContent;
    showToast(`Updating status for: ${taskTitle}`);
}

// ============================================
// MAINTENANCE & WARRANTIES
// ============================================
function showMaintenanceModal() {
    showToast('Schedule maintenance modal will be implemented');
}

function showAddWarrantyModal() {
    showToast('Add warranty modal will be implemented');
}

function switchMaintenanceTab(tabName) {
    AppState.currentMaintenanceTab = tabName;

    // Hide all tab contents
    document.querySelectorAll('#page-maintenance .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Update tab buttons
    document.querySelectorAll('#page-maintenance .tab').forEach((tab, index) => {
        tab.classList.remove('active');
    });

    // Map tab names to indices
    const tabMap = { 'maintenance': 0, 'warranties': 1, 'contracts': 2 };
    const tabButtons = document.querySelectorAll('#page-maintenance .tab');
    if (tabButtons[tabMap[tabName]]) {
        tabButtons[tabMap[tabName]].classList.add('active');
    }
}

// ============================================
// AUDIT
// ============================================
function startNewAudit() {
    showToast('Starting new audit...');
    // Simulate audit start
    setTimeout(() => {
        showToast('Audit created successfully!');
    }, 1000);
}

function exportAuditReport() {
    showToast('Exporting audit report...');
    // Simulate export
    setTimeout(() => {
        showToast('Report exported successfully!');
    }, 1000);
}

// ============================================
// ANALYTICS
// ============================================
function generateReport(reportType) {
    showToast(`Generating ${reportType} report...`);
    setTimeout(() => {
        showToast('Report generated successfully!');
    }, 1500);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, duration);
    }
}

// ============================================
// DATA SIMULATION
// ============================================
function initializeApp() {
    // Simulate loading data
    console.log('AssetVault Pro Initialized');

    // Add real-time clock to demonstrate interactivity
    updateDashboardStats();

    // Set up periodic updates (every 30 seconds)
    setInterval(updateDashboardStats, 30000);
}

function updateDashboardStats() {
    // Simulate dynamic stat updates
    const stats = {
        totalAssets: Math.floor(1200 + Math.random() * 100),
        activeAssets: Math.floor(1050 + Math.random() * 50),
        maintenanceDue: Math.floor(20 + Math.random() * 10),
        warrantyExpiring: Math.floor(10 + Math.random() * 5)
    };

    // Update DOM if elements exist
    const totalAssetsEl = document.getElementById('total-assets');
    const activeAssetsEl = document.getElementById('active-assets');
    const maintenanceDueEl = document.getElementById('maintenance-due');
    const warrantyExpiringEl = document.getElementById('warranty-expiring');

    if (totalAssetsEl) totalAssetsEl.textContent = stats.totalAssets.toLocaleString();
    if (activeAssetsEl) activeAssetsEl.textContent = stats.activeAssets.toLocaleString();
    if (maintenanceDueEl) maintenanceDueEl.textContent = stats.maintenanceDue;
    if (warrantyExpiringEl) warrantyExpiringEl.textContent = stats.warrantyExpiring;
}

// ============================================
// SEARCH & FILTER
// ============================================
function setupFilters() {
    const assetSearch = document.getElementById('asset-search');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');
    const locationFilter = document.getElementById('location-filter');

    if (assetSearch) {
        assetSearch.addEventListener('input', filterAssets);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAssets);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterAssets);
    }

    if (locationFilter) {
        locationFilter.addEventListener('change', filterAssets);
    }
}

function filterAssets() {
    const searchTerm = document.getElementById('asset-search')?.value.toLowerCase() || '';
    const category = document.getElementById('category-filter')?.value || '';
    const status = document.getElementById('status-filter')?.value || '';
    const location = document.getElementById('location-filter')?.value || '';

    const rows = document.querySelectorAll('#assets-table-body tr');

    rows.forEach(row => {
        const assetName = row.querySelector('.asset-name-cell')?.textContent.toLowerCase() || '';
        const assetCategory = row.querySelector('.category-badge')?.textContent.toLowerCase() || '';
        const assetStatus = row.querySelector('.status-badge')?.textContent.toLowerCase() || '';
        const assetLocation = row.cells[4]?.textContent.toLowerCase() || '';

        const matchesSearch = assetName.includes(searchTerm);
        const matchesCategory = !category || assetCategory.includes(category.toLowerCase());
        const matchesStatus = !status || assetStatus.includes(status.toLowerCase());
        const matchesLocation = !location || assetLocation.includes(location.toLowerCase());

        if (matchesSearch && matchesCategory && matchesStatus && matchesLocation) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// ============================================
// BULK ACTIONS
// ============================================
function setupBulkActions() {
    const checkboxes = document.querySelectorAll('.asset-table input[type="checkbox"]');
    const bulkActionsBar = document.getElementById('bulk-actions');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('.asset-table tbody input[type="checkbox"]:checked').length;

            if (bulkActionsBar) {
                if (checkedCount > 0) {
                    bulkActionsBar.style.display = 'flex';
                    bulkActionsBar.querySelector('.bulk-count').textContent = `${checkedCount} asset${checkedCount > 1 ? 's' : ''} selected`;
                } else {
                    bulkActionsBar.style.display = 'none';
                }
            }
        });
    });

    // Select all checkbox
    const selectAllCheckbox = document.querySelector('.asset-table thead input[type="checkbox"]');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
            const bodyCheckboxes = document.querySelectorAll('.asset-table tbody input[type="checkbox"]');
            bodyCheckboxes.forEach(cb => {
                cb.checked = e.target.checked;
            });

            // Trigger change event to update bulk actions bar
            if (bodyCheckboxes.length > 0) {
                bodyCheckboxes[0].dispatchEvent(new Event('change'));
            }
        });
    }
}

// ============================================
// ANIMATIONS & INTERACTIONS
// ============================================
function addHoverEffects() {
    // Add subtle animations to cards
    const cards = document.querySelectorAll('.action-card, .task-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ============================================
// CSV FILE UPLOAD
// ============================================
function setupFileUpload() {
    const fileInput = document.getElementById('csv-file-input');
    const uploadArea = document.getElementById('csv-upload-area');

    if (fileInput && uploadArea) {
        // Click to upload
        uploadArea.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
                fileInput.click();
            }
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.background = 'var(--color-gray-200)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.background = 'var(--color-gray-100)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.background = 'var(--color-gray-100)';

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }
}

function handleFileUpload(file) {
    const allowedTypes = ['.csv', '.xlsx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

    if (allowedTypes.includes(fileExtension)) {
        showToast(`Uploading ${file.name}...`);

        // Simulate upload
        setTimeout(() => {
            showToast(`${file.name} uploaded successfully! Processing ${Math.floor(Math.random() * 50 + 10)} assets...`);

            setTimeout(() => {
                showToast('Assets imported successfully!');
                closeModal();
            }, 2000);
        }, 1500);
    } else {
        showToast('Please upload a CSV or XLSX file');
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('asset-search');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Ctrl/Cmd + N to add new asset
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            if (AppState.currentPage === 'assets') {
                showAddAssetModal();
            }
        }

        // Number keys to navigate (1-6)
        if (!e.ctrlKey && !e.metaKey && e.key >= '1' && e.key <= '6') {
            const pages = ['dashboard', 'assets', 'tasks', 'maintenance', 'audit', 'analytics'];
            const pageIndex = parseInt(e.key) - 1;
            if (pages[pageIndex]) {
                showPage(pages[pageIndex]);
            }
        }
    });
}

// ============================================
// RESPONSIVE MENU
// ============================================
function setupResponsiveMenu() {
    // Mobile menu toggle for smaller screens
    const navLinks = document.querySelector('.nav-links');

    if (window.innerWidth <= 768 && navLinks) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'btn-icon mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'block';

        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.insertBefore(mobileMenuBtn, navActions.firstChild);
        }

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem';
            navLinks.style.borderTop = '4px solid black';
        });
    }
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AssetVault Pro - Initializing...');

    initializeApp();
    setupFilters();
    setupBulkActions();
    addHoverEffects();
    setupFileUpload();
    setupKeyboardShortcuts();
    setupResponsiveMenu();

    console.log('✅ AssetVault Pro - Ready!');

    // Show welcome message
    setTimeout(() => {
        showToast('Welcome to AssetVault Pro! 🎉', 4000);
    }, 500);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

function generateAssetId(category) {
    const prefix = category.substring(0, 3).toUpperCase();
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${year}-${random}`;
}

// ============================================
// EXPORT FUNCTIONS
// ============================================
window.AssetVault = {
    showPage,
    showModal,
    closeModal,
    showAddAssetModal,
    showTransferModal,
    showMaintenanceModal,
    showToast,
    filterAssets,
    updateDashboardStats
};

console.log('AssetVault Pro loaded successfully! 🎨');
