import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Wrench, Plus, X, Bell, Calendar } from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';

const Maintenance = () => {
  const { maintenanceRecords, addMaintenanceRecord, updateMaintenanceRecord, deleteMaintenanceRecord, assets } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    assetId: '',
    maintenanceType: '',
    description: '',
    performedBy: '',
    performedDate: '',
    nextMaintenanceDate: '',
    cost: '',
    status: 'scheduled',
  });

  const maintenanceTypes = [
    'Preventive Maintenance',
    'Corrective Maintenance',
    'Routine Inspection',
    'Cleaning',
    'Calibration',
    'Software Update',
    'Hardware Upgrade',
    'Other'
  ];

  const maintenanceStatuses = ['scheduled', 'in_progress', 'completed', 'overdue'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRecord) {
      updateMaintenanceRecord(editingRecord.id, formData);
    } else {
      addMaintenanceRecord(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      assetId: '',
      maintenanceType: '',
      description: '',
      performedBy: '',
      performedDate: '',
      nextMaintenanceDate: '',
      cost: '',
      status: 'scheduled',
    });
    setEditingRecord(null);
    setShowModal(false);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      assetId: record.assetId || '',
      maintenanceType: record.maintenanceType || '',
      description: record.description || '',
      performedBy: record.performedBy || '',
      performedDate: record.performedDate || '',
      nextMaintenanceDate: record.nextMaintenanceDate || '',
      cost: record.cost || '',
      status: record.status || 'scheduled',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this maintenance record?')) {
      deleteMaintenanceRecord(id);
    }
  };

  // Get upcoming maintenance (within 7 days)
  const upcomingMaintenance = maintenanceRecords.filter(record => {
    if (!record.nextMaintenanceDate || record.status === 'completed') return false;
    const nextDate = new Date(record.nextMaintenanceDate);
    const today = new Date();
    const weekFromNow = addDays(today, 7);
    return isAfter(nextDate, today) && isBefore(nextDate, weekFromNow);
  });

  // Get overdue maintenance
  const overdueMaintenance = maintenanceRecords.filter(record => {
    if (!record.nextMaintenanceDate || record.status === 'completed') return false;
    const nextDate = new Date(record.nextMaintenanceDate);
    const today = new Date();
    return isBefore(nextDate, today);
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'badge-success';
      case 'in_progress': return 'badge-info';
      case 'scheduled': return 'badge-warning';
      case 'overdue': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Maintenance Tracking</h1>
          <p className="text-dark-600 mt-1">Schedule and track asset maintenance</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Maintenance</span>
        </button>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Maintenance */}
        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-yellow-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming (7 days)
            </h2>
            <span className="badge bg-yellow-200 text-yellow-900">{upcomingMaintenance.length}</span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {upcomingMaintenance.map(record => {
              const asset = assets.find(a => a.id === record.assetId);
              return (
                <div key={record.id} className="p-3 bg-white rounded-lg border border-yellow-300">
                  <p className="font-medium text-dark-900 text-sm">{asset?.name || 'Unknown Asset'}</p>
                  <p className="text-xs text-dark-600 mt-1">{record.maintenanceType}</p>
                  <p className="text-xs text-yellow-700 font-medium mt-1">
                    Due: {format(new Date(record.nextMaintenanceDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              );
            })}
            {upcomingMaintenance.length === 0 && (
              <p className="text-center text-yellow-700 py-4 text-sm">No upcoming maintenance</p>
            )}
          </div>
        </div>

        {/* Overdue Maintenance */}
        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-red-900 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Overdue
            </h2>
            <span className="badge bg-red-200 text-red-900">{overdueMaintenance.length}</span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {overdueMaintenance.map(record => {
              const asset = assets.find(a => a.id === record.assetId);
              return (
                <div key={record.id} className="p-3 bg-white rounded-lg border border-red-300">
                  <p className="font-medium text-dark-900 text-sm">{asset?.name || 'Unknown Asset'}</p>
                  <p className="text-xs text-dark-600 mt-1">{record.maintenanceType}</p>
                  <p className="text-xs text-red-700 font-medium mt-1">
                    Overdue since: {format(new Date(record.nextMaintenanceDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              );
            })}
            {overdueMaintenance.length === 0 && (
              <p className="text-center text-red-700 py-4 text-sm">No overdue maintenance</p>
            )}
          </div>
        </div>
      </div>

      {/* Maintenance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {maintenanceStatuses.map(status => {
          const count = maintenanceRecords.filter(r => r.status === status).length;
          return (
            <div key={status} className="card">
              <p className="text-sm font-medium text-dark-600 capitalize">{status.replace('_', ' ')}</p>
              <p className="text-2xl font-bold text-dark-900 mt-2">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Maintenance Records Table */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-900 mb-4 flex items-center">
          <Wrench className="w-5 h-5 mr-2 text-primary-600" />
          Maintenance History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-dark-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Asset</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Description</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Performed Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Next Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Cost</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-dark-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRecords.map((record) => {
                const asset = assets.find(a => a.id === record.assetId);
                return (
                  <tr key={record.id} className="border-b border-dark-100 hover:bg-dark-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-dark-900">{asset?.name || 'Unknown'}</p>
                        <p className="text-xs text-dark-500">{asset?.assetTag}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">{record.maintenanceType}</td>
                    <td className="py-3 px-4 text-sm text-dark-600">{record.description}</td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {record.performedDate ? format(new Date(record.performedDate), 'MMM dd, yyyy') : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {record.nextMaintenanceDate ? format(new Date(record.nextMaintenanceDate), 'MMM dd, yyyy') : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {record.cost ? `$${parseFloat(record.cost).toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-xs px-2 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-xs px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {maintenanceRecords.length === 0 && (
            <p className="text-center text-dark-500 py-12">No maintenance records yet</p>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-dark-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingRecord ? 'Edit Maintenance' : 'Add Maintenance Record'}
              </h2>
              <button onClick={resetForm} className="text-dark-400 hover:text-dark-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Asset *</label>
                <select
                  required
                  value={formData.assetId}
                  onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select asset</option>
                  {assets.filter(a => a.status === 'active').map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.assetTag} - {asset.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Maintenance Type *</label>
                  <select
                    required
                    value={formData.maintenanceType}
                    onChange={(e) => setFormData({ ...formData, maintenanceType: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select type</option>
                    {maintenanceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Status *</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="input-field"
                  >
                    {maintenanceStatuses.map(status => (
                      <option key={status} value={status} className="capitalize">
                        {status.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Maintenance details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Performed By</label>
                  <input
                    type="text"
                    value={formData.performedBy}
                    onChange={(e) => setFormData({ ...formData, performedBy: e.target.value })}
                    className="input-field"
                    placeholder="Technician name"
                  />
                </div>

                <div>
                  <label className="label">Cost</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Performed Date</label>
                  <input
                    type="date"
                    value={formData.performedDate}
                    onChange={(e) => setFormData({ ...formData, performedDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Next Maintenance Date</label>
                  <input
                    type="date"
                    value={formData.nextMaintenanceDate}
                    onChange={(e) => setFormData({ ...formData, nextMaintenanceDate: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-200">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingRecord ? 'Update Record' : 'Add Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
