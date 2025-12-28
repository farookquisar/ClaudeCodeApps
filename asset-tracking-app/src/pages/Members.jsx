import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Plus, X, Mail, Shield, User } from 'lucide-react';

const Members = () => {
  const { members, setMembers, tasks, currentUser } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'member',
  });

  const roles = ['admin', 'member'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } : m));
    } else {
      const newMember = {
        ...formData,
        id: Date.now(),
      };
      setMembers([...members, newMember]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'member',
    });
    setEditingMember(null);
    setShowModal(false);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      email: member.email || '',
      role: member.role || 'member',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (id === currentUser.id) {
      alert('You cannot delete your own account!');
      return;
    }
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const getMemberTasks = (memberId) => {
    return tasks.filter(t => t.assignedTo === memberId);
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? 'badge-danger' : 'badge-info';
  };

  const getRoleIcon = (role) => {
    return role === 'admin' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Team Members</h1>
          <p className="text-dark-600 mt-1">Manage your team and roles</p>
        </div>
        {currentUser.role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Member</span>
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-600">Total Members</p>
              <p className="text-3xl font-bold text-dark-900 mt-2">{members.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-600">Admins</p>
              <p className="text-3xl font-bold text-dark-900 mt-2">
                {members.filter(m => m.role === 'admin').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-600">Active Tasks</p>
              <p className="text-3xl font-bold text-dark-900 mt-2">
                {tasks.filter(t => t.status !== 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => {
          const memberTasks = getMemberTasks(member.id);
          const pendingTasks = memberTasks.filter(t => t.status === 'pending').length;
          const inProgressTasks = memberTasks.filter(t => t.status === 'in_progress').length;
          const completedTasks = memberTasks.filter(t => t.status === 'completed').length;

          return (
            <div key={member.id} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-900">{member.name}</h3>
                    <div className="flex items-center space-x-1 text-xs text-dark-500">
                      <Mail className="w-3 h-3" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
                <span className={`badge ${getRoleColor(member.role)} flex items-center space-x-1`}>
                  {getRoleIcon(member.role)}
                  <span>{member.role}</span>
                </span>
              </div>

              <div className="border-t border-dark-200 pt-4">
                <p className="text-sm font-medium text-dark-700 mb-3">Task Summary</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-yellow-50 rounded-lg">
                    <p className="text-lg font-bold text-yellow-900">{pendingTasks}</p>
                    <p className="text-xs text-yellow-700">Pending</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-900">{inProgressTasks}</p>
                    <p className="text-xs text-blue-700">Active</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-900">{completedTasks}</p>
                    <p className="text-xs text-green-700">Done</p>
                  </div>
                </div>
              </div>

              {currentUser.role === 'admin' && (
                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-dark-200">
                  <button
                    onClick={() => handleEdit(member)}
                    className="btn-secondary flex-1 text-sm py-2"
                  >
                    Edit
                  </button>
                  {member.id !== currentUser.id && (
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="btn-danger flex-1 text-sm py-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="border-b border-dark-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h2>
              <button onClick={resetForm} className="text-dark-400 hover:text-dark-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div>
                <label className="label">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="e.g., john@example.com"
                />
              </div>

              <div>
                <label className="label">Role *</label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input-field"
                >
                  {roles.map(role => (
                    <option key={role} value={role} className="capitalize">{role}</option>
                  ))}
                </select>
                <p className="text-xs text-dark-500 mt-1">
                  Admins can assign tasks and manage all assets. Members can only view and update their assigned tasks.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-200">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
