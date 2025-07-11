'use client';

import { useState } from 'react';
import { TeacherProfile as TeacherProfileType } from '@/types/teacher';
import { TeacherProfile } from '@/components/TeacherProfile';
import { TeacherSelector } from '@/components/TeacherSelector';

interface AdminDashboardProps {
  teachers: TeacherProfileType[];
}

export function AdminDashboard({ teachers }: AdminDashboardProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfileType>(teachers[0]);

  const handleTeacherSelect = (teacher: TeacherProfileType) => {
    setSelectedTeacher(teacher);
  };

  const getOverallStats = () => {
    const totalTeachers = teachers.length;
    const activeTeachers = teachers.filter(t => t.status === 'active').length;
    const totalStudents = teachers.reduce((sum, t) => sum + t.totalStudents, 0);
    const averageRating = teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length;
    
    return {
      totalTeachers,
      activeTeachers,
      totalStudents,
      averageRating: Math.round(averageRating * 10) / 10
    };
  };

  const stats = getOverallStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-3xl">👨‍💼</span>
                Teacher Management System
              </h1>
              <p className="text-gray-600 mt-1">Admin Dashboard - Manage all teachers and their profiles</p>
            </div>
            
            {/* Overall Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 text-white text-center">
                <div className="text-lg font-bold">{stats.totalTeachers}</div>
                <div className="text-xs text-blue-100">Total Teachers</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 text-white text-center">
                <div className="text-lg font-bold">{stats.activeTeachers}</div>
                <div className="text-xs text-green-100">Active</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-3 text-white text-center">
                <div className="text-lg font-bold">{stats.totalStudents}</div>
                <div className="text-xs text-purple-100">Total Students</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-3 text-white text-center">
                <div className="text-lg font-bold">{stats.averageRating}</div>
                <div className="text-xs text-orange-100">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Teacher Selection */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Select Teacher to View
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Choose a teacher from the dropdown to view their detailed profile
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Active</span>
                <span className="w-3 h-3 bg-red-500 rounded-full ml-3"></span>
                <span>Inactive</span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full ml-3"></span>
                <span>Pending</span>
              </div>
            </div>
            
            <div className="max-w-md">
              <TeacherSelector
                teachers={teachers}
                selectedTeacher={selectedTeacher}
                onTeacherSelect={handleTeacherSelect}
              />
            </div>
          </div>
        </div>

        {/* Selected Teacher Profile */}
        <div className="animate-fade-in">
          <TeacherProfile teacher={selectedTeacher} />
        </div>
      </div>
    </div>
  );
}
