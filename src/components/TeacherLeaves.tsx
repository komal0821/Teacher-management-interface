'use client';

import { useState } from 'react';
import { TeacherLeave } from '@/types/teacher';
import { useData } from '@/contexts/DataContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  FileText,
  MoreVertical,
  Check,
  X,
  CheckCircle
} from 'lucide-react';

export function TeacherLeaves() {
  const { leaves, addLeave, updateLeave, deleteLeave, approveLeave, rejectLeave } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'my-requests' | 'approvals'>('my-requests');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    type: 'sick' as 'sick' | 'vacation' | 'personal' | 'emergency' | 'maternity' | 'paternity' | 'training',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Filter leaves based on active tab
  const myLeaves = leaves.filter(leave => leave.teacherId === 'current-user');
  const pendingApprovals = leaves.filter(leave => leave.teacherId !== 'current-user' && leave.status === 'pending');
  
  const currentLeaves = activeTab === 'my-requests' ? myLeaves : pendingApprovals;
  
  const filteredLeaves = currentLeaves.filter(leave => {
    const statusMatch = filterStatus === 'all' || leave.status === filterStatus;
    const typeMatch = filterType === 'all' || leave.type === filterType;
    return statusMatch && typeMatch;
  });

  // Calculate statistics
  const totalLeaves = leaves.length;
  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
  const approvedLeaves = leaves.filter(l => l.status === 'approved').length;
  const totalDays = leaves.filter(l => l.status === 'approved').reduce((sum, l) => {
    const start = new Date(l.startDate);
    const end = new Date(l.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return sum + diffDays;
  }, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'vacation':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-purple-100 text-purple-800';
      case 'emergency':
        return 'bg-orange-100 text-orange-800';
      case 'maternity':
      case 'paternity':
        return 'bg-pink-100 text-pink-800';
      case 'training':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const leaveData = {
      teacherId: 'current-user', // This would come from auth context
      teacherName: 'Current User', // This would come from auth context
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: calculateDays(formData.startDate, formData.endDate),
      reason: formData.reason,
      status: 'pending' as const,
      appliedDate: new Date().toISOString().split('T')[0]
    };

    addLeave(leaveData);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    handleCancel();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setFormData({
      type: 'sick',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleApprove = (id: string) => {
    approveLeave(id);
    setActiveDropdown(null);
  };

  const handleReject = (id: string) => {
    rejectLeave(id);
    setActiveDropdown(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this leave request?')) {
      deleteLeave(id);
      setActiveDropdown(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Teacher Leaves</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">Manage leave requests and approvals</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-[#B43F3F] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-[#A03636] transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Request Leave
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
            <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 shadow-sm">
              <div className="text-center">
                <p className="text-xs lg:text-sm text-slate-600 mb-1">Total Requests</p>
                <p className="text-lg lg:text-2xl font-bold text-slate-800">{totalLeaves}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 shadow-sm">
              <div className="text-center">
                <p className="text-xs lg:text-sm text-slate-600 mb-1">Pending</p>
                <p className="text-lg lg:text-2xl font-bold text-yellow-600">{pendingLeaves}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 shadow-sm">
              <div className="text-center">
                <p className="text-xs lg:text-sm text-slate-600 mb-1">Approved</p>
                <p className="text-lg lg:text-2xl font-bold text-green-600">{approvedLeaves}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3 lg:p-4 shadow-sm">
              <div className="text-center">
                <p className="text-xs lg:text-sm text-slate-600 mb-1">Total Days</p>
                <p className="text-lg lg:text-2xl font-bold text-slate-800">{totalDays}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg mb-4">
            <button
              onClick={() => setActiveTab('my-requests')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'my-requests'
                  ? 'bg-white text-[#B43F3F] shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              My Leave Requests
            </button>
            <button
              onClick={() => setActiveTab('approvals')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'approvals'
                  ? 'bg-white text-[#B43F3F] shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Pending Approvals ({pendingApprovals.length})
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] text-sm"
            >
              <option value="all">All Types</option>
              <option value="sick">Sick Leave</option>
              <option value="vacation">Vacation</option>
              <option value="personal">Personal</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Leave request sent successfully!</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Leaves List */}
        <div className="space-y-4">
          {filteredLeaves.map((leave) => (
            <div key={leave.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              {/* Leave Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {leave.teacherName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1 truncate">{leave.teacherName}</h3>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">{leave.reason}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(leave.status)}`}>
                        {leave.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(leave.type)}`}>
                        {leave.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Actions Dropdown */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === leave.id ? null : leave.id)}
                    className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {activeDropdown === leave.id && (
                    <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                      {leave.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(leave.id)}
                            className="w-full px-3 py-2 text-left text-sm text-green-700 hover:bg-green-50 flex items-center gap-2 rounded-t-lg"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(leave.id)}
                            className="w-full px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(leave.id)}
                        className="w-full px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Leave Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Applied: {new Date(leave.appliedDate).toLocaleDateString()}</span>
                </div>
                {leave.approvedBy && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">By: {leave.approvedBy}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Applied:</span> {new Date(leave.appliedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLeaves.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No leave requests found</h3>
            <p className="text-slate-600 mb-4">
              {filterStatus !== 'all' || filterType !== 'all' 
                ? 'Try adjusting your filters.' 
                : 'Get started by creating your first leave request.'}
            </p>
            {filterStatus === 'all' && filterType === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-[#B43F3F] text-white px-6 py-2 rounded-lg hover:bg-[#A03636] transition-colors font-medium"
              >
                Request Leave
              </button>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Add Leave Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Request New Leave</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Leave Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Leave Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                  required
                >
                  <option value="sick">Sick Leave</option>
                  <option value="vacation">Vacation</option>
                  <option value="personal">Personal Leave</option>
                  <option value="emergency">Emergency Leave</option>
                  <option value="maternity">Maternity Leave</option>
                  <option value="paternity">Paternity Leave</option>
                  <option value="training">Training Leave</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Reason *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                  placeholder="Please provide a reason for your leave request..."
                  rows={4}
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#B43F3F] text-white rounded-lg hover:bg-[#A03636] transition-colors font-medium"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
