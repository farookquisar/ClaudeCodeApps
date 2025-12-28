import { useApp } from '../context/AppContext';
import {
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Wrench,
  FileText
} from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';

const Dashboard = () => {
  const { assets, tasks, maintenanceRecords, contracts } = useApp();

  // Calculate statistics
  const totalAssets = assets.length;
  const activeAssets = assets.filter(a => a.status === 'active').length;
  const disposedAssets = assets.filter(a => a.status === 'disposed').length;
  const totalValue = assets.reduce((sum, asset) => sum + (parseFloat(asset.currentValue) || 0), 0);

  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  // Upcoming maintenance (within 7 days)
  const upcomingMaintenance = maintenanceRecords.filter(record => {
    if (!record.nextMaintenanceDate) return false;
    const nextDate = new Date(record.nextMaintenanceDate);
    const today = new Date();
    const weekFromNow = addDays(today, 7);
    return isAfter(nextDate, today) && isBefore(nextDate, weekFromNow);
  });

  // Expiring contracts (within 30 days)
  const expiringContracts = contracts.filter(contract => {
    if (!contract.endDate) return false;
    const endDate = new Date(contract.endDate);
    const today = new Date();
    const monthFromNow = addDays(today, 30);
    return isAfter(endDate, today) && isBefore(endDate, monthFromNow);
  });

  const stats = [
    {
      name: 'Total Assets',
      value: totalAssets,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      name: 'Active Assets',
      value: activeAssets,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      name: 'Total Value',
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      name: 'Pending Tasks',
      value: pendingTasks,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-900">Dashboard</h1>
        <p className="text-dark-600 mt-1">Welcome back! Here's your asset overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-dark-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-dark-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Maintenance */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-dark-900 flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-primary-600" />
              Upcoming Maintenance
            </h2>
            <span className="badge badge-warning">{upcomingMaintenance.length}</span>
          </div>
          <div className="space-y-3">
            {upcomingMaintenance.length === 0 ? (
              <p className="text-dark-500 text-center py-4">No upcoming maintenance scheduled</p>
            ) : (
              upcomingMaintenance.slice(0, 5).map((record) => {
                const asset = assets.find(a => a.id === record.assetId);
                return (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <p className="font-medium text-dark-900">{asset?.name || 'Unknown Asset'}</p>
                      <p className="text-sm text-dark-600">{record.maintenanceType}</p>
                    </div>
                    <span className="text-sm font-medium text-yellow-700">
                      {format(new Date(record.nextMaintenanceDate), 'MMM dd')}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Expiring Contracts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-dark-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary-600" />
              Expiring Contracts
            </h2>
            <span className="badge badge-danger">{expiringContracts.length}</span>
          </div>
          <div className="space-y-3">
            {expiringContracts.length === 0 ? (
              <p className="text-dark-500 text-center py-4">No contracts expiring soon</p>
            ) : (
              expiringContracts.slice(0, 5).map((contract) => (
                <div key={contract.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-dark-900">{contract.title}</p>
                    <p className="text-sm text-dark-600 capitalize">{contract.type}</p>
                  </div>
                  <span className="text-sm font-medium text-red-700">
                    {format(new Date(contract.endDate), 'MMM dd, yyyy')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Tasks Overview */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
          Task Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800">Pending</span>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-900 mt-2">{pendingTasks}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">In Progress</span>
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{inProgressTasks}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">Completed</span>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">{completedTasks}</p>
          </div>
        </div>
      </div>

      {/* Recent Assets */}
      <div className="card">
        <h2 className="text-xl font-bold text-dark-900 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-primary-600" />
          Recent Assets
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-dark-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {assets.slice(0, 5).map((asset) => (
                <tr key={asset.id} className="border-b border-dark-100 hover:bg-dark-50">
                  <td className="py-3 px-4 text-sm text-dark-900">{asset.name}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
          {assets.length === 0 && (
            <p className="text-center text-dark-500 py-8">No assets registered yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
