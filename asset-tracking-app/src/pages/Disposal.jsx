import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

const Disposal = () => {
  const { assets, disposeAsset, currentUser } = useApp();
  const [selectedAsset, setSelectedAsset] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const activeAssets = assets.filter(a => a.status === 'active');
  const disposedAssets = assets.filter(a => a.status === 'disposed');

  const disposalReasons = [
    'End of Life',
    'Damaged Beyond Repair',
    'Lost/Stolen',
    'Obsolete',
    'Sold',
    'Donated',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAsset || !reason) return;

    if (window.confirm('Are you sure you want to dispose this asset? This action marks the asset as disposed.')) {
      disposeAsset(
        parseInt(selectedAsset),
        reason,
        currentUser.name,
        notes
      );

      // Reset form
      setSelectedAsset('');
      setReason('');
      setNotes('');
      alert('Asset disposed successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-900">Asset Disposal</h1>
        <p className="text-dark-600 mt-1">Record asset disposal and decommissioning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disposal Form */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-dark-900">Dispose Asset</h2>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">Warning</p>
              <p className="text-sm text-yellow-700 mt-1">
                Disposing an asset will mark it as disposed. The asset will no longer appear in active listings.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Select Asset *</label>
              <select
                required
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                className="input-field"
              >
                <option value="">Choose an asset to dispose</option>
                {activeAssets.map(asset => (
                  <option key={asset.id} value={asset.id}>
                    {asset.assetTag} - {asset.name} ({asset.location})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Disposal Reason *</label>
              <select
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="input-field"
              >
                <option value="">Select reason</option>
                {disposalReasons.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-field"
                rows="4"
                placeholder="Additional details about the disposal (e.g., disposal method, recipient, sale price)..."
              />
            </div>

            <button type="submit" className="btn-danger w-full">
              Dispose Asset
            </button>
          </form>
        </div>

        {/* Summary Card */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-dark-900 mb-4">Disposal Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800">Active Assets</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{activeAssets.length}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800">Disposed Assets</p>
                <p className="text-3xl font-bold text-red-900 mt-2">{disposedAssets.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-dark-900 mb-4">Disposal Breakdown</h2>
            <div className="space-y-2">
              {disposalReasons.map(reason => {
                const count = disposedAssets.filter(a => a.disposalInfo?.reason === reason).length;
                if (count === 0) return null;
                return (
                  <div key={reason} className="flex items-center justify-between p-3 bg-dark-50 rounded-lg">
                    <span className="text-sm text-dark-700">{reason}</span>
                    <span className="text-sm font-bold text-dark-900">{count}</span>
                  </div>
                );
              })}
              {disposedAssets.length === 0 && (
                <p className="text-center text-dark-500 py-4">No disposal data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Disposed Assets List */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-900 mb-4">Disposed Assets History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-dark-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Asset</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Last Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Reason</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Disposal Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">By</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {disposedAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-dark-100 hover:bg-dark-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-dark-900">{asset.name}</p>
                      <p className="text-xs text-dark-500">{asset.assetTag}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-dark-600">{asset.category}</td>
                  <td className="py-3 px-4 text-sm text-dark-600">{asset.location}</td>
                  <td className="py-3 px-4">
                    <span className="badge badge-danger">{asset.disposalInfo?.reason}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-dark-600">
                    {asset.disposalInfo?.date && format(new Date(asset.disposalInfo.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="py-3 px-4 text-sm text-dark-600">{asset.disposalInfo?.by}</td>
                  <td className="py-3 px-4 text-sm text-dark-600">
                    {asset.disposalInfo?.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {disposedAssets.length === 0 && (
            <p className="text-center text-dark-500 py-12">No disposed assets yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Disposal;
