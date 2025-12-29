// ==========================================
// ASSETVAULT PRO - MAIN APPLICATION
// ==========================================

// Data Storage
let assets = [];
let tasks = [];
let maintenance = [];
let warranties = [];
let contracts = [];
let audits = [];
let activities = [];

// Charts
let categoryChart = null;
let statusChart = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeNavigation();
    initializeTabs();
    initializeEventListeners();
    renderDashboard();
    renderAssets();
    renderTasks();
    renderMaintenance();
    renderWarranties();
    renderAudit();

    // Add sample data if empty
    if (assets.length === 0) {
        addSampleData();
    }
});

// ==========================================
// NAVIGATION
// ==========================================

function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    // Update active page
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById(`page-${page}`).classList.add('active');

    // Refresh data for the page
    switch(page) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'assets':
            renderAssets();
            break;
        case 'tasks':
            renderTasks();
            break;
        case 'maintenance':
            renderMaintenance();
            renderWarranties();
            break;
        case 'audit':
            renderAudit();
            break;
    }
}

// ==========================================
// TABS
// ==========================================

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Update active tab button
            btn.parentElement.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ==========================================
// DATA MANAGEMENT
// ==========================================

function loadData() {
    const savedAssets = localStorage.getItem('assetVault_assets');
    const savedTasks = localStorage.getItem('assetVault_tasks');
    const savedMaintenance = localStorage.getItem('assetVault_maintenance');
    const savedWarranties = localStorage.getItem('assetVault_warranties');
    const savedContracts = localStorage.getItem('assetVault_contracts');
    const savedAudits = localStorage.getItem('assetVault_audits');
    const savedActivities = localStorage.getItem('assetVault_activities');

    if (savedAssets) assets = JSON.parse(savedAssets);
    if (savedTasks) tasks = JSON.parse(savedTasks);
    if (savedMaintenance) maintenance = JSON.parse(savedMaintenance);
    if (savedWarranties) warranties = JSON.parse(savedWarranties);
    if (savedContracts) contracts = JSON.parse(savedContracts);
    if (savedAudits) audits = JSON.parse(savedAudits);
    if (savedActivities) activities = JSON.parse(savedActivities);
}

function saveData() {
    localStorage.setItem('assetVault_assets', JSON.stringify(assets));
    localStorage.setItem('assetVault_tasks', JSON.stringify(tasks));
    localStorage.setItem('assetVault_maintenance', JSON.stringify(maintenance));
    localStorage.setItem('assetVault_warranties', JSON.stringify(warranties));
    localStorage.setItem('assetVault_contracts', JSON.stringify(contracts));
    localStorage.setItem('assetVault_audits', JSON.stringify(audits));
    localStorage.setItem('assetVault_activities', JSON.stringify(activities));
}

function addActivity(text) {
    activities.unshift({
        id: Date.now(),
        text,
        timestamp: new Date().toISOString()
    });

    // Keep only last 20 activities
    if (activities.length > 20) {
        activities = activities.slice(0, 20);
    }

    saveData();
}

// ==========================================
// DASHBOARD
// ==========================================

function renderDashboard() {
    // Update stats
    document.getElementById('stat-total-assets').textContent = assets.length;
    document.getElementById('stat-active-assets').textContent =
        assets.filter(a => a.status === 'active').length;
    document.getElementById('stat-pending-tasks').textContent =
        tasks.filter(t => t.status !== 'finished').length;

    const totalValue = assets.reduce((sum, a) => sum + parseFloat(a.value || 0), 0);
    document.getElementById('stat-total-value').textContent =
        `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    // Render charts
    renderCategoryChart();
    renderStatusChart();

    // Render recent activities
    renderRecentActivities();
}

function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    // Count assets by category
    const categories = {};
    assets.forEach(asset => {
        categories[asset.category] = (categories[asset.category] || 0) + 1;
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    if (categoryChart) {
        categoryChart.destroy();
    }

    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map(l => getCategoryIcon(l) + ' ' + l.charAt(0).toUpperCase() + l.slice(1)),
            datasets: [{
                data: data,
                backgroundColor: [
                    '#A855F7',
                    '#22C55E',
                    '#F97316',
                    '#3B82F6',
                    '#EAB308'
                ],
                borderColor: '#000000',
                borderWidth: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Space Grotesk',
                            weight: 'bold',
                            size: 14
                        },
                        padding: 15
                    }
                }
            }
        }
    });
}

function renderStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;

    // Count assets by status
    const statuses = {};
    assets.forEach(asset => {
        statuses[asset.status] = (statuses[asset.status] || 0) + 1;
    });

    const labels = Object.keys(statuses);
    const data = Object.values(statuses);

    if (statusChart) {
        statusChart.destroy();
    }

    statusChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.map(l => l.charAt(0).toUpperCase() + l.slice(1).replace('-', ' ')),
            datasets: [{
                label: 'Assets',
                data: data,
                backgroundColor: [
                    '#22C55E',
                    '#3B82F6',
                    '#F97316',
                    '#EF4444'
                ],
                borderColor: '#000000',
                borderWidth: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'Space Grotesk',
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Space Grotesk',
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

function renderRecentActivities() {
    const container = document.getElementById('recent-activity');
    if (!container) return;

    if (activities.length === 0) {
        container.innerHTML = '<p style="color: #666;">No recent activities</p>';
        return;
    }

    container.innerHTML = activities.slice(0, 10).map(activity => `
        <div class="activity-item">
            <div>
                <strong>${activity.text}</strong>
            </div>
            <div class="activity-time">${formatDate(activity.timestamp)}</div>
        </div>
    `).join('');
}

// ==========================================
// ASSETS
// ==========================================

function renderAssets() {
    const tbody = document.getElementById('assets-table-body');
    if (!tbody) return;

    const searchTerm = document.getElementById('asset-search')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('category-filter')?.value || '';
    const statusFilter = document.getElementById('status-filter')?.value || '';

    let filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchTerm) ||
                             asset.assetId.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || asset.category === categoryFilter;
        const matchesStatus = !statusFilter || asset.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    if (filteredAssets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #666;">No assets found</td></tr>';
        return;
    }

    tbody.innerHTML = filteredAssets.map(asset => `
        <tr>
            <td><strong>${asset.assetId}</strong></td>
            <td>${asset.name}</td>
            <td>${getCategoryIcon(asset.category)} ${asset.category}</td>
            <td><span class="status-badge status-${asset.status}">${getStatusIcon(asset.status)} ${asset.status.toUpperCase()}</span></td>
            <td>${asset.location}</td>
            <td><strong>$${parseFloat(asset.value).toLocaleString()}</strong></td>
            <td>
                <button class="action-btn" onclick="editAsset('${asset.id}')">✏️ Edit</button>
                <button class="action-btn" onclick="deleteAsset('${asset.id}')">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function showAddAssetModal() {
    document.getElementById('modal-add-asset').classList.add('active');
}

function initializeEventListeners() {
    // Add Asset Form
    const addAssetForm = document.getElementById('add-asset-form');
    if (addAssetForm) {
        addAssetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const asset = {
                id: Date.now().toString(),
                name: formData.get('name'),
                assetId: formData.get('assetId'),
                category: formData.get('category'),
                status: formData.get('status'),
                location: formData.get('location'),
                purchaseDate: formData.get('purchaseDate'),
                value: formData.get('value'),
                assignedTo: formData.get('assignedTo') || 'Unassigned'
            };

            assets.push(asset);
            saveData();
            addActivity(`Added new asset: ${asset.name}`);

            closeModal('modal-add-asset');
            e.target.reset();
            renderAssets();
            renderDashboard();
        });
    }

    // Create Task Form
    const createTaskForm = document.getElementById('create-task-form');
    if (createTaskForm) {
        createTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const task = {
                id: Date.now().toString(),
                title: formData.get('title'),
                type: formData.get('type'),
                assignedTo: formData.get('assignedTo'),
                assetId: formData.get('assetId'),
                dueDate: formData.get('dueDate'),
                description: formData.get('description'),
                status: 'started',
                createdAt: new Date().toISOString()
            };

            tasks.push(task);
            saveData();
            addActivity(`Created task: ${task.title}`);

            closeModal('modal-create-task');
            e.target.reset();
            renderTasks();
            renderDashboard();
        });
    }

    // Add Maintenance Form
    const addMaintenanceForm = document.getElementById('add-maintenance-form');
    if (addMaintenanceForm) {
        addMaintenanceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const item = {
                id: Date.now().toString(),
                assetId: formData.get('assetId'),
                type: formData.get('type'),
                priority: formData.get('priority'),
                scheduledDate: formData.get('scheduledDate'),
                cost: formData.get('cost') || '0',
                status: 'scheduled'
            };

            maintenance.push(item);
            saveData();
            addActivity(`Scheduled maintenance: ${item.type}`);

            closeModal('modal-add-maintenance');
            e.target.reset();
            renderMaintenance();
        });
    }

    // Add Warranty Form
    const addWarrantyForm = document.getElementById('add-warranty-form');
    if (addWarrantyForm) {
        addWarrantyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const warranty = {
                id: Date.now().toString(),
                assetId: formData.get('assetId'),
                provider: formData.get('provider'),
                startDate: formData.get('startDate'),
                endDate: formData.get('endDate')
            };

            warranties.push(warranty);
            saveData();
            addActivity(`Added warranty for asset`);

            closeModal('modal-add-warranty');
            e.target.reset();
            renderWarranties();
        });
    }

    // Asset Search and Filters
    const assetSearch = document.getElementById('asset-search');
    const categoryFilter = document.getElementById('category-filter');
    const statusFilter = document.getElementById('status-filter');

    if (assetSearch) assetSearch.addEventListener('input', renderAssets);
    if (categoryFilter) categoryFilter.addEventListener('change', renderAssets);
    if (statusFilter) statusFilter.addEventListener('change', renderAssets);

    // CSV File Input
    const csvFileInput = document.getElementById('csv-file-input');
    if (csvFileInput) {
        csvFileInput.addEventListener('change', handleCSVUpload);
    }
}

function deleteAsset(id) {
    if (confirm('Are you sure you want to delete this asset?')) {
        const asset = assets.find(a => a.id === id);
        assets = assets.filter(a => a.id !== id);
        saveData();
        addActivity(`Deleted asset: ${asset.name}`);
        renderAssets();
        renderDashboard();
    }
}

function editAsset(id) {
    const asset = assets.find(a => a.id === id);
    if (!asset) return;

    // For simplicity, we'll use prompt (in production, use a proper modal)
    const newValue = prompt('Enter new value for asset:', asset.value);
    if (newValue !== null) {
        asset.value = newValue;
        saveData();
        addActivity(`Updated asset value: ${asset.name}`);
        renderAssets();
        renderDashboard();
    }
}

function clearFilters() {
    document.getElementById('asset-search').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('status-filter').value = '';
    renderAssets();
}

// Bulk Entry
function showBulkEntryModal() {
    document.getElementById('modal-bulk-entry').classList.add('active');
    const container = document.getElementById('bulk-entry-table');
    container.innerHTML = '';

    // Add 5 initial rows
    for (let i = 0; i < 5; i++) {
        addBulkRow();
    }
}

function addBulkRow() {
    const container = document.getElementById('bulk-entry-table');
    const row = document.createElement('div');
    row.className = 'bulk-row';
    row.innerHTML = `
        <input type="text" placeholder="Asset Name" data-field="name">
        <input type="text" placeholder="Asset ID" data-field="assetId">
        <select data-field="category">
            <option value="computers">💻 Computers</option>
            <option value="furniture">🪑 Furniture</option>
            <option value="vehicles">🚗 Vehicles</option>
            <option value="equipment">⚙️ Equipment</option>
            <option value="software">💿 Software</option>
        </select>
        <select data-field="status">
            <option value="active">✅ Active</option>
            <option value="in-use">🔵 In Use</option>
            <option value="maintenance">🔧 Maintenance</option>
        </select>
        <input type="text" placeholder="Location" data-field="location">
        <input type="number" placeholder="Value" data-field="value">
        <button class="action-btn" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(row);
}

function saveBulkAssets() {
    const rows = document.querySelectorAll('.bulk-row');
    let count = 0;

    rows.forEach(row => {
        const name = row.querySelector('[data-field="name"]').value;
        const assetId = row.querySelector('[data-field="assetId"]').value;

        if (name && assetId) {
            const asset = {
                id: Date.now().toString() + '-' + count,
                name,
                assetId,
                category: row.querySelector('[data-field="category"]').value,
                status: row.querySelector('[data-field="status"]').value,
                location: row.querySelector('[data-field="location"]').value,
                value: row.querySelector('[data-field="value"]').value || '0',
                purchaseDate: new Date().toISOString().split('T')[0],
                assignedTo: 'Unassigned'
            };

            assets.push(asset);
            count++;
        }
    });

    if (count > 0) {
        saveData();
        addActivity(`Bulk added ${count} assets`);
        closeModal('modal-bulk-entry');
        renderAssets();
        renderDashboard();
    } else {
        alert('Please fill in at least one asset with name and ID');
    }
}

// CSV Import
function showImportCSVModal() {
    document.getElementById('modal-import-csv').classList.add('active');
    document.getElementById('csv-preview').style.display = 'none';
    document.getElementById('import-csv-btn').disabled = true;
}

let csvData = null;

function handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        parseCSV(text);
    };
    reader.readAsText(file);
}

function parseCSV(text) {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    csvData = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;

        const values = lines[i].split(',').map(v => v.trim());
        const asset = {
            id: Date.now().toString() + '-' + i,
            name: values[0] || '',
            assetId: values[1] || '',
            category: values[2] || 'equipment',
            status: values[3] || 'active',
            location: values[4] || '',
            value: values[5] || '0',
            purchaseDate: new Date().toISOString().split('T')[0],
            assignedTo: 'Unassigned'
        };

        if (asset.name && asset.assetId) {
            csvData.push(asset);
        }
    }

    // Show preview
    const preview = document.getElementById('csv-preview');
    const content = document.getElementById('csv-preview-content');
    preview.style.display = 'block';
    content.innerHTML = `<p><strong>${csvData.length} assets ready to import</strong></p>`;

    document.getElementById('import-csv-btn').disabled = false;
}

function importCSV() {
    if (csvData && csvData.length > 0) {
        assets.push(...csvData);
        saveData();
        addActivity(`Imported ${csvData.length} assets from CSV`);

        closeModal('modal-import-csv');
        csvData = null;
        renderAssets();
        renderDashboard();
    }
}

// ==========================================
// TASKS
// ==========================================

function renderTasks() {
    const statuses = ['started', 'reached', 'working', 'finished'];

    statuses.forEach(status => {
        const container = document.getElementById(`tasks-${status}`);
        const countEl = document.getElementById(`count-${status}`);

        if (!container) return;

        const statusTasks = tasks.filter(t => t.status === status);
        countEl.textContent = statusTasks.length;

        if (statusTasks.length === 0) {
            container.innerHTML = '<p style="padding: 1rem; color: #666; text-align: center;">No tasks</p>';
            return;
        }

        container.innerHTML = statusTasks.map(task => {
            const asset = assets.find(a => a.id === task.assetId);
            return `
                <div class="task-card" onclick="updateTaskStatus('${task.id}')">
                    <h4>${task.title}</h4>
                    <p>${task.description || 'No description'}</p>
                    <div class="task-meta">
                        <span class="task-tag">${getTaskTypeIcon(task.type)} ${task.type}</span>
                        ${asset ? `<span style="font-size: 0.85rem;">Asset: ${asset.name}</span>` : ''}
                    </div>
                    <div style="margin-top: 0.5rem; font-size: 0.85rem; color: #666;">
                        👤 ${task.assignedTo} | 📅 ${formatDate(task.dueDate)}
                    </div>
                </div>
            `;
        }).join('');
    });

    // Populate asset select for task creation
    const taskAssetSelect = document.getElementById('task-asset-select');
    if (taskAssetSelect && assets.length > 0) {
        taskAssetSelect.innerHTML = '<option value="">Select an asset...</option>' +
            assets.map(a => `<option value="${a.id}">${a.name} (${a.assetId})</option>`).join('');
    }
}

function showCreateTaskModal() {
    document.getElementById('modal-create-task').classList.add('active');
}

function updateTaskStatus(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const statuses = ['started', 'reached', 'working', 'finished'];
    const currentIndex = statuses.indexOf(task.status);

    if (currentIndex < statuses.length - 1) {
        task.status = statuses[currentIndex + 1];
        saveData();
        addActivity(`Updated task status: ${task.title} → ${task.status}`);
        renderTasks();
        renderDashboard();
    }
}

// ==========================================
// MAINTENANCE & WARRANTIES
// ==========================================

function renderMaintenance() {
    const tbody = document.getElementById('maintenance-table-body');
    if (!tbody) return;

    // Populate asset select
    const maintenanceAssetSelect = document.getElementById('maintenance-asset-select');
    if (maintenanceAssetSelect && assets.length > 0) {
        maintenanceAssetSelect.innerHTML = '<option value="">Select an asset...</option>' +
            assets.map(a => `<option value="${a.id}">${a.name} (${a.assetId})</option>`).join('');
    }

    if (maintenance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: #666;">No maintenance scheduled</td></tr>';
        return;
    }

    tbody.innerHTML = maintenance.map(item => {
        const asset = assets.find(a => a.id === item.assetId);
        return `
            <tr>
                <td>${asset ? asset.name : 'Unknown'}</td>
                <td>${item.type}</td>
                <td><span class="priority-${item.priority}">${getPriorityIcon(item.priority)} ${item.priority.toUpperCase()}</span></td>
                <td>${formatDate(item.scheduledDate)}</td>
                <td><span class="status-badge status-${item.status}">${item.status.toUpperCase()}</span></td>
                <td>$${parseFloat(item.cost).toLocaleString()}</td>
                <td>
                    <button class="action-btn" onclick="completeMaintenance('${item.id}')">✅ Complete</button>
                    <button class="action-btn" onclick="deleteMaintenance('${item.id}')">🗑️</button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderWarranties() {
    const tbody = document.getElementById('warranties-table-body');
    if (!tbody) return;

    // Populate asset select
    const warrantyAssetSelect = document.getElementById('warranty-asset-select');
    if (warrantyAssetSelect && assets.length > 0) {
        warrantyAssetSelect.innerHTML = '<option value="">Select an asset...</option>' +
            assets.map(a => `<option value="${a.id}">${a.name} (${a.assetId})</option>`).join('');
    }

    if (warranties.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #666;">No warranties registered</td></tr>';
        return;
    }

    tbody.innerHTML = warranties.map(warranty => {
        const asset = assets.find(a => a.id === warranty.assetId);
        const isActive = new Date(warranty.endDate) > new Date();
        return `
            <tr>
                <td>${asset ? asset.name : 'Unknown'}</td>
                <td>${warranty.provider}</td>
                <td>${formatDate(warranty.startDate)}</td>
                <td>${formatDate(warranty.endDate)}</td>
                <td><span class="status-badge ${isActive ? 'status-active' : 'status-disposed'}">${isActive ? 'ACTIVE' : 'EXPIRED'}</span></td>
                <td>
                    <button class="action-btn" onclick="deleteWarranty('${warranty.id}')">🗑️</button>
                </td>
            </tr>
        `;
    }).join('');
}

function showAddMaintenanceModal() {
    document.getElementById('modal-add-maintenance').classList.add('active');
}

function showAddWarrantyModal() {
    document.getElementById('modal-add-warranty').classList.add('active');
}

function completeMaintenance(id) {
    const item = maintenance.find(m => m.id === id);
    if (item) {
        item.status = 'completed';
        saveData();
        addActivity(`Completed maintenance: ${item.type}`);
        renderMaintenance();
    }
}

function deleteMaintenance(id) {
    if (confirm('Delete this maintenance record?')) {
        maintenance = maintenance.filter(m => m.id !== id);
        saveData();
        addActivity('Deleted maintenance record');
        renderMaintenance();
    }
}

function deleteWarranty(id) {
    if (confirm('Delete this warranty?')) {
        warranties = warranties.filter(w => w.id !== id);
        saveData();
        addActivity('Deleted warranty');
        renderWarranties();
    }
}

// ==========================================
// AUDIT
// ==========================================

function renderAudit() {
    const tbody = document.getElementById('audit-history-body');
    if (!tbody) return;

    // Update findings
    const currentAudit = audits.find(a => a.status === 'in-progress');
    if (currentAudit) {
        document.getElementById('audit-progress-card').style.display = 'block';
        const progress = (currentAudit.checkedCount / assets.length) * 100;
        document.getElementById('audit-progress-fill').style.width = progress + '%';
        document.getElementById('audit-progress-text').textContent = `${Math.round(progress)}% Complete`;

        document.getElementById('missing-count').textContent = currentAudit.missing || 0;
        document.getElementById('discrepancy-count').textContent = currentAudit.discrepancies || 0;
        document.getElementById('unlisted-count').textContent = currentAudit.unlisted || 0;
        document.getElementById('matched-count').textContent = currentAudit.matched || 0;
    } else {
        document.getElementById('audit-progress-card').style.display = 'none';
        document.getElementById('missing-count').textContent = 0;
        document.getElementById('discrepancy-count').textContent = 0;
        document.getElementById('unlisted-count').textContent = 0;
        document.getElementById('matched-count').textContent = 0;
    }

    // Render audit history
    if (audits.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #666;">No audits performed yet</td></tr>';
        return;
    }

    tbody.innerHTML = audits.filter(a => a.status === 'completed').map(audit => `
        <tr>
            <td><strong>AUD-${audit.id}</strong></td>
            <td>${formatDate(audit.date)}</td>
            <td>${audit.auditor}</td>
            <td>${audit.assetsChecked}</td>
            <td>
                <span style="margin-right: 0.5rem;">❌ ${audit.missing}</span>
                <span style="margin-right: 0.5rem;">⚠️ ${audit.discrepancies}</span>
                <span style="margin-right: 0.5rem;">✅ ${audit.matched}</span>
            </td>
            <td>
                <button class="action-btn" onclick="viewAuditReport('${audit.id}')">📄 View</button>
            </td>
        </tr>
    `).join('');
}

function startNewAudit() {
    const auditorName = prompt('Enter auditor name:');
    if (!auditorName) return;

    const audit = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        auditor: auditorName,
        status: 'in-progress',
        assetsChecked: assets.length,
        checkedCount: 0,
        missing: 0,
        discrepancies: 0,
        unlisted: 0,
        matched: 0
    };

    audits.push(audit);
    saveData();
    addActivity(`Started new audit by ${auditorName}`);

    // Simulate audit progress
    simulateAudit(audit);
}

function simulateAudit(audit) {
    let checked = 0;
    const total = assets.length;

    const interval = setInterval(() => {
        checked++;
        audit.checkedCount = checked;

        // Randomly assign findings
        const rand = Math.random();
        if (rand > 0.9) {
            audit.missing++;
        } else if (rand > 0.85) {
            audit.discrepancies++;
        } else if (rand > 0.8) {
            audit.unlisted++;
        } else {
            audit.matched++;
        }

        saveData();
        renderAudit();

        if (checked >= total) {
            clearInterval(interval);
            audit.status = 'completed';
            saveData();
            addActivity(`Completed audit: ${audit.matched} matched, ${audit.missing} missing`);
            renderAudit();
        }
    }, 100);
}

function viewAuditReport(id) {
    const audit = audits.find(a => a.id === id);
    if (!audit) return;

    alert(`Audit Report\n\nAuditor: ${audit.auditor}\nDate: ${formatDate(audit.date)}\n\nFindings:\n- Matched: ${audit.matched}\n- Missing: ${audit.missing}\n- Discrepancies: ${audit.discrepancies}\n- Unlisted: ${audit.unlisted}`);
}

// ==========================================
// REPORTS
// ==========================================

function generateReport(type) {
    let reportContent = '';

    switch(type) {
        case 'valuation':
            const totalValue = assets.reduce((sum, a) => sum + parseFloat(a.value), 0);
            reportContent = `Asset Valuation Report\n\nTotal Assets: ${assets.length}\nTotal Value: $${totalValue.toLocaleString()}\n\nBreakdown by Category:\n`;

            const byCategory = {};
            assets.forEach(a => {
                if (!byCategory[a.category]) {
                    byCategory[a.category] = { count: 0, value: 0 };
                }
                byCategory[a.category].count++;
                byCategory[a.category].value += parseFloat(a.value);
            });

            Object.keys(byCategory).forEach(cat => {
                reportContent += `\n${cat}: ${byCategory[cat].count} assets, $${byCategory[cat].value.toLocaleString()}`;
            });
            break;

        case 'maintenance':
            reportContent = `Maintenance Summary\n\nTotal Maintenance Items: ${maintenance.length}\n\nBy Priority:\n`;
            const byPriority = { high: 0, medium: 0, low: 0 };
            maintenance.forEach(m => byPriority[m.priority]++);
            reportContent += `\nHigh: ${byPriority.high}\nMedium: ${byPriority.medium}\nLow: ${byPriority.low}`;
            break;

        case 'depreciation':
            reportContent = 'Depreciation Analysis\n\nThis report would show asset depreciation over time based on purchase dates and current values.';
            break;

        case 'utilization':
            const inUse = assets.filter(a => a.status === 'in-use').length;
            const utilizationRate = ((inUse / assets.length) * 100).toFixed(1);
            reportContent = `Asset Utilization Report\n\nTotal Assets: ${assets.length}\nIn Use: ${inUse}\nUtilization Rate: ${utilizationRate}%`;
            break;

        case 'compliance':
            reportContent = `Compliance & Audit Report\n\nTotal Audits: ${audits.length}\nLatest Audit: ${audits.length > 0 ? formatDate(audits[audits.length - 1].date) : 'None'}`;
            break;

        case 'warranty':
            const activeWarranties = warranties.filter(w => new Date(w.endDate) > new Date()).length;
            reportContent = `Warranty & Contracts Report\n\nTotal Warranties: ${warranties.length}\nActive: ${activeWarranties}\nExpired: ${warranties.length - activeWarranties}`;
            break;
    }

    alert(reportContent);
    addActivity(`Generated ${type} report`);
}

// ==========================================
// MODALS
// ==========================================

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function getCategoryIcon(category) {
    const icons = {
        computers: '💻',
        furniture: '🪑',
        vehicles: '🚗',
        equipment: '⚙️',
        software: '💿'
    };
    return icons[category] || '📦';
}

function getStatusIcon(status) {
    const icons = {
        active: '✅',
        'in-use': '🔵',
        maintenance: '🔧',
        disposed: '❌'
    };
    return icons[status] || '⚪';
}

function getTaskTypeIcon(type) {
    const icons = {
        transfer: '🔄',
        assignment: '👤',
        disposal: '🗑️',
        pricing: '💰',
        maintenance: '🔧'
    };
    return icons[type] || '📋';
}

function getPriorityIcon(priority) {
    const icons = {
        high: '🔴',
        medium: '🟡',
        low: '🟢'
    };
    return icons[priority] || '⚪';
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ==========================================
// SAMPLE DATA
// ==========================================

function addSampleData() {
    assets = [
        {
            id: '1',
            name: 'Dell Latitude 5520',
            assetId: 'COMP-001',
            category: 'computers',
            status: 'active',
            location: 'Office A - Desk 12',
            value: '1200',
            purchaseDate: '2023-01-15',
            assignedTo: 'John Smith'
        },
        {
            id: '2',
            name: 'Herman Miller Aeron Chair',
            assetId: 'FURN-001',
            category: 'furniture',
            status: 'in-use',
            location: 'Office A - Desk 12',
            value: '850',
            purchaseDate: '2022-11-20',
            assignedTo: 'John Smith'
        },
        {
            id: '3',
            name: 'Toyota Camry 2022',
            assetId: 'VEH-001',
            category: 'vehicles',
            status: 'active',
            location: 'Parking Lot B',
            value: '28000',
            purchaseDate: '2022-03-10',
            assignedTo: 'Fleet Manager'
        },
        {
            id: '4',
            name: 'HP LaserJet Pro',
            assetId: 'EQUIP-001',
            category: 'equipment',
            status: 'maintenance',
            location: 'Print Room',
            value: '450',
            purchaseDate: '2021-08-05',
            assignedTo: 'IT Department'
        },
        {
            id: '5',
            name: 'Microsoft Office 365',
            assetId: 'SOFT-001',
            category: 'software',
            status: 'active',
            location: 'Cloud',
            value: '150',
            purchaseDate: '2023-06-01',
            assignedTo: 'Company-wide'
        }
    ];

    tasks = [
        {
            id: 't1',
            title: 'Transfer Dell Laptop to Office B',
            type: 'transfer',
            assignedTo: 'Mike Johnson',
            assetId: '1',
            dueDate: '2024-01-15',
            description: 'Move laptop from Office A to Office B',
            status: 'started',
            createdAt: new Date().toISOString()
        },
        {
            id: 't2',
            title: 'Printer Maintenance',
            type: 'maintenance',
            assignedTo: 'Sarah Williams',
            assetId: '4',
            dueDate: '2024-01-10',
            description: 'Replace toner and clean printer',
            status: 'reached',
            createdAt: new Date().toISOString()
        }
    ];

    maintenance = [
        {
            id: 'm1',
            assetId: '3',
            type: 'Oil Change',
            priority: 'high',
            scheduledDate: '2024-01-20',
            cost: '75',
            status: 'scheduled'
        },
        {
            id: 'm2',
            assetId: '4',
            type: 'Routine Inspection',
            priority: 'medium',
            scheduledDate: '2024-01-12',
            cost: '50',
            status: 'scheduled'
        }
    ];

    warranties = [
        {
            id: 'w1',
            assetId: '1',
            provider: 'Dell Premium Support',
            startDate: '2023-01-15',
            endDate: '2026-01-15'
        },
        {
            id: 'w2',
            assetId: '3',
            provider: 'Toyota Extended Warranty',
            startDate: '2022-03-10',
            endDate: '2027-03-10'
        }
    ];

    activities = [
        {
            id: Date.now() - 1000,
            text: 'System initialized with sample data',
            timestamp: new Date().toISOString()
        }
    ];

    saveData();
}
