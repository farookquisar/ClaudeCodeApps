import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { format } from 'date-fns';

const AssetRegister = () => {
  const { assets, addAsset, updateAsset, deleteAsset } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    assetTag: '',
    category: '',
    description: '',
    purchaseDate: '',
    purchasePrice: '',
    currentValue: '',
    location: '',
    assignedTo: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
  });

  const categories = ['Electronics', 'Furniture', 'Vehicles', 'Equipment', 'Software', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAsset) {
      updateAsset(editingAsset.id, formData);
    } else {
      addAsset(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      assetTag: '',
      category: '',
      description: '',
      purchaseDate: '',
      purchasePrice: '',
      currentValue: '',
      location: '',
      assignedTo: '',
      serialNumber: '',
      manufacturer: '',
      model: '',
    });
    setEditingAsset(null);
    setShowModal(false);
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name || '',
      assetTag: asset.assetTag || '',
      category: asset.category || '',
      description: asset.description || '',
      purchaseDate: asset.purchaseDate || '',
      purchasePrice: asset.purchasePrice || '',
      currentValue: asset.currentValue || '',
      location: asset.location || '',
      assignedTo: asset.assignedTo || '',
      serialNumber: asset.serialNumber || '',
      manufacturer: asset.manufacturer || '',
      model: asset.model || '',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      deleteAsset(id);
    }
  };

  const filteredAssets = assets.filter(asset =>
    asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assetTag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Asset Register</h1>
          <p className="text-dark-600 mt-1">Manage your organization's assets</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search assets by name, tag, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Assets Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-dark-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Asset Tag</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-dark-700">Value</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-dark-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-dark-100 hover:bg-dark-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-primary-600">{asset.assetTag}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-dark-900">{asset.name}</p>
                      <p className="text-xs text-dark-500">{asset.manufacturer} {asset.model}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-dark-600">{asset.category}</td>
                  <td className="py-3 px-4 text-sm text-dark-600">{asset.location}</td>
                  <td className="py-3 px-4">
                    <span className={`badge ${asset.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium text-dark-900">
                    ${parseFloat(asset.currentValue || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(asset)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(asset.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAssets.length === 0 && (
            <p className="text-center text-dark-500 py-12">
              {searchTerm ? 'No assets found matching your search' : 'No assets registered yet. Click "Add Asset" to get started.'}
            </p>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-dark-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingAsset ? 'Edit Asset' : 'Add New Asset'}
              </h2>
              <button onClick={resetForm} className="text-dark-400 hover:text-dark-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Asset Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Dell Laptop"
                  />
                </div>

                <div>
                  <label className="label">Asset Tag *</label>
                  <input
                    type="text"
                    required
                    value={formData.assetTag}
                    onChange={(e) => setFormData({ ...formData, assetTag: e.target.value })}
                    className="input-field"
                    placeholder="e.g., AST-001"
                  />
                </div>

                <div>
                  <label className="label">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Office 101"
                  />
                </div>

                <div>
                  <label className="label">Manufacturer</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Dell"
                  />
                </div>

                <div>
                  <label className="label">Model</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="input-field"
                    placeholder="e.g., XPS 15"
                  />
                </div>

                <div>
                  <label className="label">Serial Number</label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="input-field"
                    placeholder="e.g., SN123456"
                  />
                </div>

                <div>
                  <label className="label">Assigned To</label>
                  <input
                    type="text"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="input-field"
                    placeholder="e.g., John Doe"
                  />
                </div>

                <div>
                  <label className="label">Purchase Date</label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Purchase Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="label">Current Value *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.currentValue}
                    onChange={(e) => setFormData({ ...formData, currentValue: e.target.value })}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Additional details about the asset..."
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-200">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingAsset ? 'Update Asset' : 'Add Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetRegister;
