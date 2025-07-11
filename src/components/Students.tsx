'use client';

import { useState } from 'react';
import { Student } from '@/types/common';
import { useData } from '@/contexts/DataContext';
import { Plus, Search, Edit, Trash2, GraduationCap, Users, BookOpen, TrendingUp } from 'lucide-react';

export function Students() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StudentCard = ({ student }: { student: Student }) => (
    <div 
      className="bg-white border-2 border-gray-300 shadow-sm p-4 hover:shadow transition-all duration-150 cursor-pointer"
      onClick={() => setSelectedStudent(student)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-red-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {student.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
            <p className="text-gray-600 text-sm">{student.grade}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          student.status === 'active' ? 'bg-green-100 text-green-800' :
          student.status === 'inactive' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {student.status === 'active' ? '🟢 Active' :
           student.status === 'inactive' ? '🔴 Inactive' :
           '🎓 Graduated'}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📧</span>
          <span>{student.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📱</span>
          <span>{student.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>⭐</span>
          <span>GPA: {student.gpa}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">📚 Subjects:</p>
        <div className="flex flex-wrap gap-2">
          {student.subjects.map((subject, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        📅 Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
      </div>
    </div>
  );

  const StudentModal = ({ student, onClose }: { student: Student; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-slate-700 to-red-800 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
                {student.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-blue-100">{student.grade}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ❌
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              📞 Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-800">{student.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-gray-800">{student.phone}</p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              🎓 Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Grade</p>
                <p className="text-gray-800">{student.grade}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">GPA</p>
                <p className="text-gray-800">{student.gpa}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Status</p>
                <p className="text-gray-800 capitalize">{student.status}</p>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              📚 Enrolled Subjects
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.subjects.map((subject, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-medium">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              🏠 Address
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">
                {student.address.street}<br/>
                {student.address.city}, {student.address.state} {student.address.zipCode}
              </p>
            </div>
          </div>

          {/* Parent Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              👨‍👩‍👧‍👦 Parent Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Name</p>
                <p className="text-gray-800">{student.parentContact.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-gray-800">{student.parentContact.phone}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-800">{student.parentContact.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 bg-gray-100 min-h-screen">
      {/* Header - Classic Title */}
      <div className="bg-white border-2 border-gray-300 shadow-sm p-4 mb-6">
        <div className="border-b-2 border-gray-200 pb-3 mb-3">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-3">
            👥 STUDENTS MANAGEMENT
          </h1>
        </div>
        <p className="text-sm text-gray-600">Student Information Management System</p>
      </div>

      {/* Search and Stats */}
      <div className="bg-white border-2 border-gray-300 shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students by name, email, or grade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{students.length}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {students.filter((s: any) => s.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {(students.reduce((sum: any, s: any) => sum + s.gpa, 0) / students.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Avg GPA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filteredStudents.map((student: any) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
}
