import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckSquare, Plus, X, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, members, assets, currentUser } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activityType: '',
    assetId: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
  });

  const activityTypes = ['Transfer', 'Disposal', 'Pricing', 'Maintenance', 'Inspection', 'Other'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  const statuses = ['pending', 'in_progress', 'completed'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      activityType: '',
      assetId: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: '',
    });
    setEditingTask(null);
    setShowModal(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title || '',
      description: task.description || '',
      activityType: task.activityType || '',
      assetId: task.assetId || '',
      assignedTo: task.assignedTo || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || '',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'badge-danger';
      case 'high': return 'badge-warning';
      case 'medium': return 'badge-info';
      case 'low': return 'badge-success';
      default: return 'badge-info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const tasksByStatus = {
    pending: tasks.filter(t => t.status === 'pending'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    completed: tasks.filter(t => t.status === 'completed'),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Task Management</h1>
          <p className="text-dark-600 mt-1">Assign and track asset activities</p>
        </div>
        {currentUser.role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Assign Task</span>
          </button>
        )}
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Pending</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">{tasksByStatus.pending.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-700" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">In Progress</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{tasksByStatus.in_progress.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Completed</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{tasksByStatus.completed.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map(status => (
          <div key={status} className="card bg-dark-50">
            <h3 className="text-lg font-bold text-dark-900 mb-4 flex items-center space-x-2 capitalize">
              {getStatusIcon(status)}
              <span>{status.replace('_', ' ')}</span>
              <span className="ml-auto badge badge-info">{tasksByStatus[status].length}</span>
            </h3>

            <div className="space-y-3">
              {tasksByStatus[status].map(task => {
                const asset = assets.find(a => a.id === task.assetId);
                const assignee = members.find(m => m.id === task.assignedTo);

                return (
                  <div key={task.id} className="bg-white p-4 rounded-lg border border-dark-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-dark-900 flex-1">{task.title}</h4>
                      <span className={`badge ${getPriorityColor(task.priority)} ml-2`}>
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-sm text-dark-600 mb-3">{task.description}</p>

                    {asset && (
                      <div className="text-xs text-dark-500 mb-2">
                        Asset: {asset.name} ({asset.assetTag})
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-dark-500 mb-3">
                      <span>Assigned to: {assignee?.name || 'Unassigned'}</span>
                      {task.dueDate && (
                        <span>Due: {format(new Date(task.dueDate), 'MMM dd')}</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {status !== 'pending' && (
                        <button
                          onClick={() => handleStatusChange(task.id, statuses[statuses.indexOf(status) - 1])}
                          className="text-xs px-2 py-1 bg-dark-200 hover:bg-dark-300 rounded"
                        >
                          ← Move
                        </button>
                      )}
                      {status !== 'completed' && (
                        <button
                          onClick={() => handleStatusChange(task.id, statuses[statuses.indexOf(status) + 1])}
                          className="text-xs px-2 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded"
                        >
                          Move →
                        </button>
                      )}
                      {currentUser.role === 'admin' && (
                        <>
                          <button
                            onClick={() => handleEdit(task)}
                            className="text-xs px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded ml-auto"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="text-xs px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {tasksByStatus[status].length === 0 && (
                <p className="text-center text-dark-400 py-8 text-sm">No tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-dark-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark-900">
                {editingTask ? 'Edit Task' : 'Assign New Task'}
              </h2>
              <button onClick={resetForm} className="text-dark-400 hover:text-dark-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Task Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Transfer laptop to new office"
                />
              </div>

              <div>
                <label className="label">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Detailed task description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Activity Type *</label>
                  <select
                    required
                    value={formData.activityType}
                    onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select type</option>
                    {activityTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Priority *</label>
                  <select
                    required
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="input-field"
                  >
                    {priorities.map(p => (
                      <option key={p} value={p} className="capitalize">{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Assign To *</label>
                  <select
                    required
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select member</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="input-field"
                  />
                </div>
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

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-dark-200">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingTask ? 'Update Task' : 'Assign Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
