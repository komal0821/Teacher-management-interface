'use client';

import { useState } from 'react';
import { TeacherMeeting } from '@/types/teacher';
import { useData } from '@/contexts/DataContext';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export function TeacherMeetings() {
  const { meetings, addMeeting, updateMeeting, deleteMeeting } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Filter meetings
  const filteredMeetings = meetings.filter(meeting => {
    const statusMatch = filterStatus === 'all' || meeting.status === filterStatus;
    const typeMatch = filterType === 'all' || meeting.meetingWith.toLowerCase().includes(filterType.toLowerCase());
    return statusMatch && typeMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'scheduled':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Teacher Meetings</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">Schedule and manage meetings with teachers</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-[#B43F3F] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-[#A03636] transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Schedule Meeting
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
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] text-sm"
            >
              <option value="all">All Types</option>
              <option value="hr">HR Manager</option>
              <option value="principal">Principal</option>
              <option value="coordinator">Coordinator</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Meetings List */}
        <div className="space-y-4">
          {filteredMeetings.map((meeting) => (
            <div key={meeting.id} className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Meeting Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {meeting.teacherName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">{meeting.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">{meeting.teacherName}</p>
                      <p className="text-sm text-slate-600 line-clamp-2">{meeting.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                      {meeting.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(meeting.priority)}`}>
                      {meeting.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Meeting Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{new Date(meeting.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{meeting.time} ({meeting.duration}min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{meeting.meetingWith}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{meeting.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4 pt-4 border-t border-slate-200">
                <button className="px-3 py-2 text-sm text-slate-600 hover:text-[#B43F3F] hover:bg-slate-100 rounded transition-colors text-center">
                  Edit Meeting
                </button>
                <button className="px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors text-center">
                  Cancel Meeting
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMeetings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No meetings found</h3>
            <p className="text-slate-600 mb-4">
              {filterStatus !== 'all' || filterType !== 'all' 
                ? 'Try adjusting your filters.' 
                : 'Get started by scheduling your first meeting.'}
            </p>
            {filterStatus === 'all' && filterType === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-[#B43F3F] text-white px-6 py-2 rounded-lg hover:bg-[#A03636] transition-colors font-medium"
              >
                Schedule Meeting
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Meeting Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Schedule New Meeting</h2>
            <p className="text-slate-600 mb-4">Meeting form would be implemented here...</p>
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
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
