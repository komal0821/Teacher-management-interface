'use client';

import { useData } from '@/contexts/DataContext';

export function Dashboard() {
  const { teachers, meetings, leaves, analytics } = useData();

  const StatCard = ({ title, value, icon, color, change }: {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    change?: string;
  }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mb-2">{value}</p>
          {change && (
            <p className="text-sm text-green-600 font-medium">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} flex-shrink-0 ml-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );

  // Calculate stats
  const totalTeachers = teachers.length;
  const totalMeetings = meetings.length;
  const totalLeaves = leaves.length;
  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;

  const recentActivities = [
    {
      id: '1',
      type: 'meeting',
      message: 'New meeting scheduled with Dr. Sarah Johnson',
      user: 'HR Manager',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'leave',
      message: 'Leave request approved for Prof. Michael Chen',
      user: 'Principal',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '3',
      type: 'teacher',
      message: 'New teacher profile created for Ms. Emily Rodriguez',
      user: 'Admin',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard Overview</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">Welcome to the Teacher Management System</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <StatCard
            title="Total Teachers"
            value={totalTeachers}
            icon="👨‍🏫"
            color="bg-slate-800"
            change="+2 this month"
          />
          <StatCard
            title="Total Meetings"
            value={totalMeetings}
            icon="📅"
            color="bg-slate-800"
            change="+5 this week"
          />
          <StatCard
            title="Leave Requests"
            value={totalLeaves}
            icon="📋"
            color="bg-[#B43F3F]"
            change={`${pendingLeaves} pending`}
          />
          <StatCard
            title="Active Sessions"
            value="24"
            icon="⚡"
            color="bg-slate-800"
            change="Live now"
          />
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {activity.type === 'meeting' ? '📅' :
                     activity.type === 'leave' ? '📋' :
                     activity.type === 'teacher' ? '👨‍🏫' : '📊'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 font-medium">{activity.message}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                      <span>By: {activity.user}</span>
                      <span>{new Date(activity.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
