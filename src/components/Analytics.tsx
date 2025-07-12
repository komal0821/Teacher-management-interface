'use client';

import { useData } from '@/contexts/DataContext';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function Analytics() {
  const { teachers, courses, meetings, leaves } = useData();

  // Calculate key metrics
  const totalTeachers = teachers.length;
  const activeCourses = courses.filter(c => c.status === 'active').length;
  const totalStudents = courses.reduce((sum, c) => sum + c.enrolledStudents, 0);
  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled').length;
  const completedMeetings = meetings.filter(m => m.status === 'completed').length;

  // Enhanced Chart Data
  const courseStatusData = [
    { name: 'Active', value: courses.filter(c => c.status === 'active').length, color: '#B43F3F' },
    { name: 'Inactive', value: courses.filter(c => c.status === 'inactive').length, color: '#1e293b' },
    { name: 'Completed', value: courses.filter(c => c.status === 'completed').length, color: '#64748b' }
  ];

  // Teacher Status Distribution
  const teacherStatusData = [
    { name: 'Active', value: teachers.filter(t => t.status === 'active').length, color: '#B43F3F' },
    { name: 'On Leave', value: leaves.filter(l => l.status === 'approved').length, color: '#f59e0b' },
    { name: 'Available', value: teachers.filter(t => t.status === 'active').length - leaves.filter(l => l.status === 'approved').length, color: '#10b981' }
  ];

  // Course Enrollment Data
  const enrollmentData = courses.slice(0, 6).map(course => ({
    name: course.code,
    enrolled: course.enrolledStudents,
    capacity: course.maxStudents,
    percentage: Math.round((course.enrolledStudents / course.maxStudents) * 100)
  }));

  // Meeting Status Data
  const meetingStatusData = [
    { name: 'Scheduled', value: meetings.filter(m => m.status === 'scheduled').length, color: '#3b82f6' },
    { name: 'Completed', value: meetings.filter(m => m.status === 'completed').length, color: '#10b981' },
    { name: 'Cancelled', value: meetings.filter(m => m.status === 'cancelled').length, color: '#ef4444' }
  ];

  // Leave Type Distribution
  const leaveTypeData = [
    { name: 'Sick', value: leaves.filter(l => l.type === 'sick').length, color: '#ef4444' },
    { name: 'Vacation', value: leaves.filter(l => l.type === 'vacation').length, color: '#3b82f6' },
    { name: 'Personal', value: leaves.filter(l => l.type === 'personal').length, color: '#8b5cf6' },
    { name: 'Emergency', value: leaves.filter(l => l.type === 'emergency').length, color: '#f59e0b' },
    { name: 'Training', value: leaves.filter(l => l.type === 'training').length, color: '#10b981' }
  ].filter(item => item.value > 0);

  // Key metrics cards
  const metrics = [
    {
      title: 'Total Teachers',
      value: totalTeachers,
      icon: Users,
      color: 'bg-slate-50',
      iconColor: 'text-slate-600',
      trend: '+2 this month'
    },
    {
      title: 'Active Courses',
      value: activeCourses,
      icon: BookOpen,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      trend: '+3 this month'
    },
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Award,
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      trend: '+15 this month'
    },
    {
      title: 'Pending Leaves',
      value: pendingLeaves,
      icon: Clock,
      color: 'bg-orange-50',
      iconColor: 'text-orange-600',
      trend: pendingLeaves > 0 ? 'Needs attention' : 'All clear'
    }
  ];

  const quickStats = [
    {
      label: 'Upcoming Meetings',
      value: upcomingMeetings,
      icon: Calendar,
      color: 'text-[#B43F3F]'
    },
    {
      label: 'Completed Meetings',
      value: completedMeetings,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      label: 'Course Completion Rate',
      value: `${Math.round((courses.filter(c => c.status === 'completed').length / courses.length) * 100)}%`,
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      label: 'Average Enrollment',
      value: Math.round(totalStudents / activeCourses) || 0,
      icon: Users,
      color: 'text-slate-600'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-800">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Dashboard & Reports</h1>
              <p className="text-slate-600 mt-1">Overview of your teaching management system</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live Data</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className={`${metric.color} border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{metric.trend}</p>
                </div>
              </div>
              <h3 className="text-sm font-medium text-slate-600">{metric.title}</h3>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {/* Course Status Chart */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Course Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                  >
                    {courseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="mt-4 space-y-2">
              {courseStatusData.map((entry, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-slate-700">
                    {entry.name}: <span className="font-semibold">{entry.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Availability Chart */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Teacher Availability</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={teacherStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                  >
                    {teacherStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="mt-4 space-y-2">
              {teacherStatusData.map((entry, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-slate-700">
                    {entry.name}: <span className="font-semibold">{entry.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Types Chart */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Leave Types</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaveTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                  >
                    {leaveTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom Legend */}
            <div className="mt-4 space-y-2">
              {leaveTypeData.map((entry, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-slate-700">
                    {entry.name}: <span className="font-semibold">{entry.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Enrollment Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Course Enrollment</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    stroke="#64748b"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#64748b"
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
                            <p className="font-medium text-slate-800">{label}</p>
                            <p className="text-sm text-slate-600">
                              Enrolled: {payload[0]?.value} / {payload[1]?.value}
                            </p>
                            <p className="text-sm text-slate-600">
                              Capacity: {Math.round((Number(payload[0]?.value) / Number(payload[1]?.value)) * 100)}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="enrolled" fill="#B43F3F" name="Enrolled" />
                  <Bar dataKey="capacity" fill="#e2e8f0" name="Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Quick Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className={`p-3 rounded-lg bg-white`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="mt-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">System Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-[#B43F3F] rounded-full mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800">Teachers</h4>
                <p className="text-sm text-slate-600 mt-1">
                  {teachers.filter(t => t.status === 'active').length} active teachers managing courses
                </p>
              </div>
              
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-slate-800 rounded-full mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800">Courses</h4>
                <p className="text-sm text-slate-600 mt-1">
                  {activeCourses} active courses with {totalStudents} enrolled students
                </p>
              </div>
              
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800">Performance</h4>
                <p className="text-sm text-slate-600 mt-1">
                  System running smoothly with {pendingLeaves} pending requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
