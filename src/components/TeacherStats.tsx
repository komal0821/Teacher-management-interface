'use client';

import { TeacherProfile } from '@/types/teacher';

interface TeacherStatsProps {
  teachers: TeacherProfile[];
}

export function TeacherStats({ teachers }: TeacherStatsProps) {
  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    inactive: teachers.filter(t => t.status === 'inactive').length,
    pending: teachers.filter(t => t.status === 'pending').length,
    totalStudents: teachers.reduce((sum, t) => sum + t.totalStudents, 0),
    averageRating: Math.round((teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length) * 10) / 10,
    totalQualifications: teachers.reduce((sum, t) => sum + t.qualifications.length, 0),
    averageExperience: Math.round(teachers.reduce((sum, t) => sum + t.experience, 0) / teachers.length),
  };

  const subjects = [...new Set(teachers.flatMap(t => t.subjects))];
  const topSubjects = subjects.slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Teachers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Teachers</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">👨‍🏫</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {stats.active} Active
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {stats.inactive} Inactive
          </span>
          <span className="flex items-center gap-1 text-yellow-600">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            {stats.pending} Pending
          </span>
        </div>
      </div>

      {/* Total Students */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Avg: {Math.round(stats.totalStudents / stats.total)} students per teacher
          </p>
        </div>
      </div>

      {/* Average Rating */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Rating</p>
            <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${
                  star <= stats.averageRating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Qualifications */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Qualifications</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalQualifications}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Avg: {Math.round(stats.totalQualifications / stats.total)} per teacher
          </p>
        </div>
      </div>

      {/* Subjects Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📚</span>
            Subject Areas ({subjects.length} total)
          </h3>
          <div className="text-sm text-gray-500">
            Avg Experience: {stats.averageExperience} years
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {topSubjects.map((subject, index) => (
            <span
              key={subject}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                index % 4 === 0 ? 'bg-blue-100 text-blue-800' :
                index % 4 === 1 ? 'bg-green-100 text-green-800' :
                index % 4 === 2 ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}
            >
              {subject}
            </span>
          ))}
          {subjects.length > 5 && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
              +{subjects.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
