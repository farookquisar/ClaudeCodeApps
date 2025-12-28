import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const Pricing = () => {
  const { assets, updateAsset, currentUser } = useApp();
  const [selectedAsset, setSelectedAsset] = useState('');
  const [newValue, setNewValue] = useState('');
  const [valuationMethod, setValuationMethod] = useState('');
  const [notes, setNotes] = useState('');

  const valuationMethods = [
    'Market Value',
    'Book Value',
    'Replacement Cost',
    'Salvage Value',
    'Professional Appraisal',
    'Depreciation Calculation',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAsset || !newValue) return;

    const asset = assets.find(a => a.id === parseInt(selectedAsset));
    const oldValue = parseFloat(asset.currentValue || 0);
    const updatedValue = parseFloat(newValue);

    updateAsset(parseInt(selectedAsset), {
      currentValue: newValue,
      valuationHistory: [
        ...(asset.valuationHistory || []),
        {
          date: new Date().toISOString(),
          oldValue,
          newValue: updatedValue,
          method: valuationMethod,
          notes,
          by: currentUser.name,
        }
      ]
    });

    // Reset form
    setSelectedAsset('');
    setNewValue('');
    setValuationMethod('');
    setNotes('');
    alert('Asset value updated successfully!');
  };

  const handleAssetSelect = (assetId) => {
    const asset = assets.find(a => a.id === parseInt(assetId));
    setSelectedAsset(assetId);
    setNewValue(asset?.currentValue || '');
  };

  // Calculate depreciation
  const calculateDepreciation = (asset) => {
    const purchasePrice = parseFloat(asset.purchasePrice || 0);
    const currentValue = parseFloat(asset.currentValue || 0);
    if (purchasePrice === 0) return 0;
    return ((purchasePrice - currentValue) / purchasePrice * 100).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-900">Asset Pricing & Valuation</h1>
        <p className="text-dark-600 mt-1">Update and track asset values</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Valuation Form */}
        <div className="card">
          <h2 className="text-xl font-bold text-dark-900 mb-6 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
            Update Asset Value
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
                {assets.filter(a => a.status === 'active').map(asset => (
                  <option key={asset.id} value={asset.id}>
                    {asset.assetTag} - {asset.name} (${parseFloat(asset.currentValue || 0).toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">New Value *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="input-field pl-8"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="label">Valuation Method *</label>
              <select
                required
                value={valuationMethod}
                onChange={(e) => setValuationMethod(e.target.value)}
                className="input-field"
              >
                <option value="">Select method</option>
                {valuationMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-field"
                rows="3"
                placeholder="Reason for valuation update, market conditions, etc..."
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Update Value
            </button>
          </form>
        </div>

        {/* Valuation Summary */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-dark-900 mb-4">Portfolio Value</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white">
                <p className="text-sm font-medium opacity-90">Total Asset Value</p>
                <p className="text-4xl font-bold mt-2">
                  ${assets.reduce((sum, a) => sum + parseFloat(a.currentValue || 0), 0).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">Active Assets</p>
                  <p className="text-2xl font-bold text-green-900 mt-2">
                    ${assets.filter(a => a.status === 'active').reduce((sum, a) => sum + parseFloat(a.currentValue || 0), 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm font-medium text-purple-800">Total Assets</p>
                  <p className="text-2xl font-bold text-purple-900 mt-2">
                    {assets.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-dark-900 mb-4">Value by Category</h2>
            <div className="space-y-2">
              {['Electronics', 'Furniture', 'Vehicles', 'Equipment', 'Software', 'Other'].map(category => {
                const value = assets.filter(a => a.category === category).reduce((sum, a) => sum + parseFloat(a.currentValue || 0), 0);
                const count = assets.filter(a => a.category === category).length;
                if (count === 0) return null;
                return (
                  <div key={category} className="flex items-center justify-between p-3 bg-dark-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium text-dark-900">{category}</span>
                      <span className="text-xs text-dark-500 ml-2">({count})</span>
                    </div>
                    <span className="text-sm font-bold text-dark-900">${value.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Asset Valuation Table */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-900 mb-4">Asset Values & Depreciation</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-dark-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Asset</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Purchase Price</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Current Value</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Depreciation</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Purchase Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {assets.filter(a => a.status === 'active').map((asset) => {
                const depreciation = calculateDepreciation(asset);
                return (
                  <tr key={asset.id} className="border-b border-dark-100 hover:bg-dark-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-dark-900">{asset.name}</p>
                        <p className="text-xs text-dark-500">{asset.assetTag}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      ${parseFloat(asset.purchasePrice || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-dark-900">
                      ${parseFloat(asset.currentValue || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        {depreciation > 0 ? (
                          <>
                            <TrendingDown className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-600 font-medium">{depreciation}%</span>
                          </>
                        ) : depreciation < 0 ? (
                          <>
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600 font-medium">{Math.abs(depreciation)}%</span>
                          </>
                        ) : (
                          <span className="text-sm text-dark-500">0%</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {asset.purchaseDate ? format(new Date(asset.purchaseDate), 'MMM dd, yyyy') : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {asset.updatedAt ? format(new Date(asset.updatedAt), 'MMM dd, yyyy') :
                       asset.createdAt ? format(new Date(asset.createdAt), 'MMM dd, yyyy') : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {assets.filter(a => a.status === 'active').length === 0 && (
            <p className="text-center text-dark-500 py-12">No active assets to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
