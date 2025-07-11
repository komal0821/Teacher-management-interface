'use client';

import { useState } from 'react';
import { TeacherLeave } from '@/types/teacher';
import { useData } from '@/contexts/DataContext';
import { 
  Plus, 
  Calendar, 
  Clock, 
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Check,
  X,
  Edit,
  Trash2
} from 'lucide-react';

export function TeacherLeaves() {
  const { leaves, addLeave, updateLeave, deleteLeave, approveLeave, rejectLeave } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Filter leaves
  const filteredLeaves = leaves.filter(leave => {
    const statusMatch = filterStatus === 'all' || leave.status === filterStatus;
    const typeMatch = filterType === 'all' || leave.leaveType === filterType;
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
      default:
        return 'bg-slate-100 text-slate-800';
    }
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeColor(leave.leaveType)}`}>
                        {leave.leaveType}
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

              {leave.substituteTeacher && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Substitute:</span> {leave.substituteTeacher}
                  </p>
                </div>
              )}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Request New Leave</h2>
            <p className="text-slate-600 mb-4">Leave request form would be implemented here...</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-2 bg-[#B43F3F] text-white rounded-lg hover:bg-[#A03636] transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
