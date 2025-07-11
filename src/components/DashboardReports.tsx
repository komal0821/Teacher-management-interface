'use client';

import { useState } from 'react';
import { TeacherAnalytics, SubjectStats } from '@/types/teacher';
import { useData } from '@/contexts/DataContext';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Star,
  TrendingUp,
  Calendar,
  Award,
  Target
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  change: string;
}

function StatCard({ title, value, icon: Icon, color, change }: StatCardProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{value}</p>
          <p className="text-xs sm:text-sm text-green-600 font-medium">{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${color} flex-shrink-0 ml-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export function DashboardReports() {
  const { teachers, analytics: teacherAnalytics, subjectStats } = useData();
  const [selectedView, setSelectedView] = useState<'overview' | 'analytics'>('overview');

  // Calculate totals
  const totalTeachers = teacherAnalytics.length;
  const totalClasses = teacherAnalytics.reduce((sum, teacher) => sum + teacher.totalClasses, 0);
  const totalEarnings = teacherAnalytics.reduce((sum, teacher) => sum + teacher.monthlyEarnings, 0);
  const averageRating = teacherAnalytics.reduce((sum, teacher) => sum + teacher.averageRating, 0) / teacherAnalytics.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard & Reports</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">Overview of teaching activities and performance metrics</p>
            </div>
            <div className="flex gap-1 bg-slate-200 p-1 rounded-lg w-fit">
              <button
                onClick={() => setSelectedView('overview')}
                className={`px-3 py-2 text-sm rounded-md font-medium transition-colors ${
                  selectedView === 'overview'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedView('analytics')}
                className={`px-3 py-2 text-sm rounded-md font-medium transition-colors ${
                  selectedView === 'analytics'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Teachers"
            value={totalTeachers.toString()}
            icon={Users}
            color="bg-slate-800"
            change="+2 this month"
          />
          <StatCard
            title="Average Rating"
            value={averageRating.toFixed(1)}
            icon={Star}
            color="bg-slate-800"
            change="+0.2 this month"
          />
          <StatCard
            title="Total Classes"
            value={totalClasses.toString()}
            icon={BookOpen}
            color="bg-slate-800"
            change="+28 this month"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${totalEarnings.toLocaleString()}`}
            icon={DollarSign}
            color="bg-[#B43F3F]"
            change="+12% this month"
          />
        </div>

        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Teacher Performance */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Teacher Performance</h3>
              <div className="space-y-3">
                {teacherAnalytics.slice(0, 5).map((teacher) => (
                  <div key={teacher.teacherId} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {teacher.teacherName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-800 truncate">{teacher.teacherName}</p>
                        <p className="text-sm text-slate-600">{teacher.totalStudents} students</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-slate-800">{teacher.averageRating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Statistics */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Subject Statistics</h3>
              <div className="space-y-3">
                {subjectStats.slice(0, 6).map((subject, index) => {
                  const maxStudents = Math.max(...subjectStats.map(s => s.totalStudents));
                  const percentage = (subject.totalStudents / maxStudents) * 100;
                  return (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-800 text-sm">{subject.subject}</span>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span>{subject.totalStudents} students</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>{subject.averageRating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-[#B43F3F] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'analytics' && (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{totalClasses}</div>
                <div className="text-slate-600 text-sm">Total Classes</div>
                <div className="text-sm text-green-600 mt-1">📚 Active Learning</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{averageRating.toFixed(1)}</div>
                <div className="text-slate-600 text-sm">Average Rating</div>
                <div className="text-sm text-purple-600 mt-1">⭐ Excellent</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">${totalEarnings.toLocaleString()}</div>
                <div className="text-slate-600 text-sm">Monthly Revenue</div>
                <div className="text-sm text-green-600 mt-1">💰 Growing</div>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{totalTeachers}</div>
                <div className="text-slate-600 text-sm">Active Teachers</div>
                <div className="text-sm text-blue-600 mt-1">👨‍🏫 Professional</div>
              </div>
            </div>

            {/* Detailed Teacher Analytics */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">Detailed Teacher Analytics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Teacher</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Students</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Classes</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {teacherAnalytics.map((teacher) => (
                      <tr key={teacher.teacherId} className="hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                              {teacher.teacherName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-800 truncate">{teacher.teacherName}</div>
                              <div className="text-sm text-slate-500 truncate">{teacher.subjects.join(', ')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-medium text-slate-800">{teacher.totalStudents}</td>
                        <td className="px-4 py-4 text-center font-medium text-slate-800">{teacher.totalClasses}</td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium text-slate-800">{teacher.averageRating}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-medium text-slate-800">${teacher.monthlyEarnings.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
