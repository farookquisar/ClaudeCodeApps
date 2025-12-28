import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Plus, X, AlertTriangle } from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';

const Contracts = () => {
  const { contracts, addContract, updateContract, deleteContract, assets } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    assetId: '',
    vendor: '',
    contractNumber: '',
    startDate: '',
    endDate: '',
    value: '',
    renewalTerms: '',
    description: '',
    status: 'active',
  });

  const contractTypes = ['Warranty', 'Service Agreement', 'Lease', 'Maintenance Contract', 'Insurance', 'License', 'Other'];
  const contractStatuses = ['active', 'expired', 'pending', 'cancelled'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContract) {
      updateContract(editingContract.id, formData);
    } else {
      addContract(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: '',
      assetId: '',
      vendor: '',
      contractNumber: '',
      startDate: '',
      endDate: '',
      value: '',
      renewalTerms: '',
      description: '',
      status: 'active',
    });
    setEditingContract(null);
    setShowModal(false);
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setFormData({
      title: contract.title || '',
      type: contract.type || '',
      assetId: contract.assetId || '',
      vendor: contract.vendor || '',
      contractNumber: contract.contractNumber || '',
      startDate: contract.startDate || '',
      endDate: contract.endDate || '',
      value: contract.value || '',
      renewalTerms: contract.renewalTerms || '',
      description: contract.description || '',
      status: contract.status || 'active',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      deleteContract(id);
    }
  };

  // Get expiring contracts (within 30 days)
  const expiringContracts = contracts.filter(contract => {
    if (!contract.endDate || contract.status !== 'active') return false;
    const endDate = new Date(contract.endDate);
    const today = new Date();
    const monthFromNow = addDays(today, 30);
    return isAfter(endDate, today) && isBefore(endDate, monthFromNow);
  });

  // Get expired contracts
  const expiredContracts = contracts.filter(contract => {
    if (!contract.endDate) return false;
    const endDate = new Date(contract.endDate);
    const today = new Date();
    return isBefore(endDate, today) && contract.status === 'active';
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'expired': return 'badge-danger';
      case 'pending': return 'badge-warning';
      case 'cancelled': return 'badge-info';
      default: return 'badge-info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Contracts & Warranties</h1>
          <p className="text-dark-600 mt-1">Manage service agreements, warranties, and contracts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Contract</span>
        </button>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expiring Soon */}
        <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-orange-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Expiring Soon (30 days)
            </h2>
            <span className="badge bg-orange-200 text-orange-900">{expiringContracts.length}</span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {expiringContracts.map(contract => {
              const asset = assets.find(a => a.id === contract.assetId);
              return (
                <div key={contract.id} className="p-3 bg-white rounded-lg border border-orange-300">
                  <p className="font-medium text-dark-900 text-sm">{contract.title}</p>
                  <p className="text-xs text-dark-600 mt-1">{contract.type} - {contract.vendor}</p>
                  {asset && <p className="text-xs text-dark-500">Asset: {asset.name}</p>}
                  <p className="text-xs text-orange-700 font-medium mt-1">
                    Expires: {format(new Date(contract.endDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              );
            })}
            {expiringContracts.length === 0 && (
              <p className="text-center text-orange-700 py-4 text-sm">No contracts expiring soon</p>
            )}
          </div>
        </div>

        {/* Expired */}
        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-red-900 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Expired Contracts
            </h2>
            <span className="badge bg-red-200 text-red-900">{expiredContracts.length}</span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {expiredContracts.map(contract => {
              const asset = assets.find(a => a.id === contract.assetId);
              return (
                <div key={contract.id} className="p-3 bg-white rounded-lg border border-red-300">
                  <p className="font-medium text-dark-900 text-sm">{contract.title}</p>
                  <p className="text-xs text-dark-600 mt-1">{contract.type} - {contract.vendor}</p>
                  {asset && <p className="text-xs text-dark-500">Asset: {asset.name}</p>}
                  <p className="text-xs text-red-700 font-medium mt-1">
                    Expired: {format(new Date(contract.endDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              );
            })}
            {expiredContracts.length === 0 && (
              <p className="text-center text-red-700 py-4 text-sm">No expired contracts</p>
            )}
          </div>
        </div>
      </div>

      {/* Contract Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card">
          <p className="text-sm font-medium text-dark-600">Total Contracts</p>
          <p className="text-2xl font-bold text-dark-900 mt-2">{contracts.length}</p>
        </div>
        {contractStatuses.map(status => {
          const count = contracts.filter(c => c.status === status).length;
          return (
            <div key={status} className="card">
              <p className="text-sm font-medium text-dark-600 capitalize">{status}</p>
              <p className="text-2xl font-bold text-dark-900 mt-2">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Contracts Table */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-primary-600" />
          All Contracts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-dark-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Vendor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Asset</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Start Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">End Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Value</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-dark-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => {
                const asset = assets.find(a => a.id === contract.assetId);
                return (
                  <tr key={contract.id} className="border-b border-dark-100 hover:bg-dark-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-dark-900">{contract.title}</p>
                        <p className="text-xs text-dark-500">{contract.contractNumber}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">{contract.type}</td>
                    <td className="py-3 px-4 text-sm text-dark-600">{contract.vendor}</td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {asset ? `${asset.name} (${asset.assetTag})` : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {contract.startDate ? format(new Date(contract.startDate), 'MMM dd, yyyy') : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {contract.endDate ? format(new Date(contract.endDate), 'MMM dd, yyyy') : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {contract.value ? `$${parseFloat(contract.value).toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(contract)}
                          className="text-xs px-2 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(contract.id)}
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
          {contracts.length === 0 && (
            <p className="text-center text-dark-500 py-12">No contracts registered yet</p>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-dark-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingContract ? 'Edit Contract' : 'Add New Contract'}
              </h2>
              <button onClick={resetForm} className="text-dark-400 hover:text-dark-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="label">Contract Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Annual Maintenance Agreement"
                  />
                </div>

                <div>
                  <label className="label">Contract Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select type</option>
                    {contractTypes.map(type => (
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
                    {contractStatuses.map(status => (
                      <option key={status} value={status} className="capitalize">{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Vendor *</label>
                  <input
                    type="text"
                    required
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Dell Inc."
                  />
                </div>

                <div>
                  <label className="label">Contract Number</label>
                  <input
                    type="text"
                    value={formData.contractNumber}
                    onChange={(e) => setFormData({ ...formData, contractNumber: e.target.value })}
                    className="input-field"
                    placeholder="e.g., CNT-2025-001"
                  />
                </div>

                <div>
                  <label className="label">Related Asset (Optional)</label>
                  <select
                    value={formData.assetId}
                    onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
                    className="input-field"
                  >
                    <option value="">No asset selected</option>
                    {assets.filter(a => a.status === 'active').map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.assetTag} - {asset.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Contract Value</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="label">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Renewal Terms</label>
                  <input
                    type="text"
                    value={formData.renewalTerms}
                    onChange={(e) => setFormData({ ...formData, renewalTerms: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Auto-renewal, 30 days notice required"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field"
                    rows="3"
                    placeholder="Additional contract details..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-200">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingContract ? 'Update Contract' : 'Add Contract'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
