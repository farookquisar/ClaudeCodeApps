import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRightLeft, Search } from 'lucide-react';
import { format } from 'date-fns';

const Transfer = () => {
  const { assets, transferAsset, currentUser } = useApp();
  const [selectedAsset, setSelectedAsset] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const activeAssets = assets.filter(a => a.status === 'active');
  const filteredAssets = activeAssets.filter(asset =>
    asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assetTag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssetSelect = (assetId) => {
    const asset = assets.find(a => a.id === parseInt(assetId));
    setSelectedAsset(assetId);
    setFromLocation(asset?.location || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAsset || !toLocation) return;

    transferAsset(
      parseInt(selectedAsset),
      fromLocation,
      toLocation,
      currentUser.name,
      notes
    );

    // Reset form
    setSelectedAsset('');
    setFromLocation('');
    setToLocation('');
    setNotes('');
    alert('Asset transferred successfully!');
  };

  // Get transfer history
  const transferHistory = assets
    .filter(asset => asset.lastTransfer)
    .sort((a, b) => new Date(b.lastTransfer.date) - new Date(a.lastTransfer.date));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-900">Asset Transfer</h1>
        <p className="text-dark-600 mt-1">Transfer assets between locations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transfer Form */}
        <div className="card">
          <h2 className="text-xl font-bold text-dark-900 mb-6 flex items-center">
            <ArrowRightLeft className="w-5 h-5 mr-2 text-primary-600" />
            New Transfer
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Select Asset *</label>
              <select
                required
                value={selectedAsset}
                onChange={(e) => handleAssetSelect(e.target.value)}
                className="input-field"
              >
                <option value="">Choose an asset</option>
                {activeAssets.map(asset => (
                  <option key={asset.id} value={asset.id}>
                    {asset.assetTag} - {asset.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">From Location</label>
              <input
                type="text"
                value={fromLocation}
                readOnly
                className="input-field bg-dark-100"
                placeholder="Current location will appear here"
              />
            </div>

            <div>
              <label className="label">To Location *</label>
              <input
                type="text"
                required
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="input-field"
                placeholder="e.g., Office 202, Warehouse A"
              />
            </div>

            <div>
              <label className="label">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-field"
                rows="3"
                placeholder="Additional transfer information..."
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Transfer Asset
            </button>
          </form>
        </div>

        {/* Asset Search & Preview */}
        <div className="card">
          <h2 className="text-xl font-bold text-dark-900 mb-4">Search Assets</h2>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                onClick={() => handleAssetSelect(asset.id.toString())}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAsset === asset.id.toString()
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-dark-200 hover:border-primary-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-dark-900">{asset.name}</p>
                    <p className="text-sm text-dark-600">{asset.assetTag}</p>
                    <p className="text-sm text-dark-500 mt-1">
                      Current: {asset.location}
                    </p>
                  </div>
                  <span className="badge badge-success">{asset.status}</span>
                </div>
              </div>
            ))}
            {filteredAssets.length === 0 && (
              <p className="text-center text-dark-500 py-8">No active assets found</p>
            )}
          </div>
        </div>
      </div>

      {/* Transfer History */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-900 mb-4">Transfer History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-dark-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Asset</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">From</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">To</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">By</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {transferHistory.map((asset) => (
                <tr key={asset.id} className="border-b border-dark-100 hover:bg-dark-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-dark-900">{asset.name}</p>
                      <p className="text-xs text-dark-500">{asset.assetTag}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-dark-600">{asset.lastTransfer.from}</td>
                  <td className="py-3 px-4 text-sm text-dark-600">{asset.lastTransfer.to}</td>
                  <td className="py-3 px-4 text-sm text-dark-600">
                    {format(new Date(asset.lastTransfer.date), 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td className="py-3 px-4 text-sm text-dark-600">{asset.lastTransfer.by}</td>
                  <td className="py-3 px-4 text-sm text-dark-600">
                    {asset.lastTransfer.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transferHistory.length === 0 && (
            <p className="text-center text-dark-500 py-12">No transfer history available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
