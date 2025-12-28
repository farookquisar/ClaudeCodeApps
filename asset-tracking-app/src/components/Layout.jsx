import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ArrowRightLeft,
  Trash2,
  DollarSign,
  CheckSquare,
  Wrench,
  FileText,
  Users,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Asset Register', href: '/assets', icon: Package },
    { name: 'Transfer', href: '/transfer', icon: ArrowRightLeft },
    { name: 'Disposal', href: '/disposal', icon: Trash2 },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Maintenance', href: '/maintenance', icon: Wrench },
    { name: 'Contracts & Warranty', href: '/contracts', icon: FileText },
    { name: 'Team Members', href: '/members', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-primary-50 to-dark-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-dark-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-dark-900">AssetTrack</h1>
                <p className="text-xs text-dark-500">Pro Management</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-dark-500 hover:text-dark-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-dark-600 hover:bg-dark-100 hover:text-dark-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-dark-200">
            <div className="flex items-center space-x-3 p-3 bg-dark-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark-900 truncate">{currentUser.name}</p>
                <p className="text-xs text-dark-500 capitalize">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white shadow-md sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-dark-600 hover:text-dark-900 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-dark-900">{currentUser.name}</p>
                <p className="text-xs text-dark-500">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
