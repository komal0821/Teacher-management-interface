'use client';

import { useState } from 'react';
import { TeacherProfile } from '@/types/teacher';

interface TeacherSelectorProps {
  teachers: TeacherProfile[];
  selectedTeacher: TeacherProfile;
  onTeacherSelect: (teacher: TeacherProfile) => void;
}

export function TeacherSelector({ teachers, selectedTeacher, onTeacherSelect }: TeacherSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '✅';
      case 'inactive':
        return '❌';
      case 'pending':
        return '⏳';
      default:
        return '❓';
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {selectedTeacher.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-medium text-gray-900">{selectedTeacher.name}</div>
              <div className="text-sm text-gray-500">
                {selectedTeacher.subjects.slice(0, 2).join(', ')}
                {selectedTeacher.subjects.length > 2 && ` +${selectedTeacher.subjects.length - 2} more`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTeacher.status)}`}>
              {getStatusIcon(selectedTeacher.status)} {selectedTeacher.status}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">
              Select Teacher ({teachers.length} total)
            </div>
            {teachers.map((teacher) => (
              <button
                key={teacher.id}
                onClick={() => {
                  onTeacherSelect(teacher);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 ${
                  selectedTeacher.id === teacher.id ? 'bg-blue-50 border border-blue-200' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-medium text-gray-900 truncate">{teacher.name}</div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                        {getStatusIcon(teacher.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {teacher.subjects.slice(0, 2).join(', ')}
                      {teacher.subjects.length > 2 && ` +${teacher.subjects.length - 2}`}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                      <span>⭐ {teacher.rating}</span>
                      <span>👥 {teacher.totalStudents} students</span>
                      <span>🎯 {teacher.experience}y exp</span>
                    </div>
                  </div>
                  {selectedTeacher.id === teacher.id && (
                    <div className="text-blue-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
