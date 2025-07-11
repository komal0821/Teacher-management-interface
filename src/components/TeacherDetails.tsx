'use client';

import { TeacherProfile } from '@/types/teacher';

interface TeacherDetailsProps {
  teacher: TeacherProfile;
}

export function TeacherDetails({ teacher }: TeacherDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Personal Information
        </h2>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-600 w-20">Name:</label>
            <div className="flex-1 p-3 bg-gray-50 rounded-lg border">
              {teacher.name}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-600 w-20">Email:</label>
            <div className="flex-1 p-3 bg-gray-50 rounded-lg border">
              {teacher.email}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-600 w-20">Phone:</label>
            <div className="flex-1 p-3 bg-gray-50 rounded-lg border">
              {teacher.phone}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <label className="text-sm font-medium text-gray-600 w-20 pt-3">Address:</label>
            <div className="flex-1 p-3 bg-gray-50 rounded-lg border">
              <div>{teacher.address.street}</div>
              <div>{teacher.address.city}, {teacher.address.state}</div>
              <div>{teacher.address.zipCode}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">💼</span>
          Professional Information
        </h2>
        
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">{teacher.experience}</div>
              <div className="text-sm text-blue-100">Years Experience</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
              <div className="text-2xl font-bold">{teacher.rating}</div>
              <div className="text-sm text-green-100">Rating</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="text-2xl font-bold">{teacher.totalStudents}</div>
            <div className="text-sm text-purple-100">Total Students Taught</div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Subjects</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Status</h3>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                teacher.status === 'active' ? 'bg-green-500' : 
                teacher.status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className={`text-sm font-medium capitalize ${
                teacher.status === 'active' ? 'text-green-700' : 
                teacher.status === 'inactive' ? 'text-red-700' : 'text-yellow-700'
              }`}>
                {teacher.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
