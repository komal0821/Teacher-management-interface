'use client';

import { useState } from 'react';
import { Student } from '@/types/common';
import { useData } from '@/contexts/DataContext';
import { Plus, Search, Edit, Trash2, GraduationCap, Users, BookOpen, TrendingUp, PieChart } from 'lucide-react';

export function StudentsEnhanced() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedView, setSelectedView] = useState<'grid' | 'analytics'>('grid');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Analytics data
  const gradeDistribution = students.reduce((acc, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusDistribution = students.reduce((acc, student) => {
    acc[student.status] = (acc[student.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const subjectDistribution = students.reduce((acc, student) => {
    student.subjects.forEach(subject => {
      acc[subject] = (acc[subject] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const averageGPA = students.reduce((sum, student) => sum + student.gpa, 0) / students.length;

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    addStudent(newStudent);
    setShowAddForm(false);
  };

  const handleEditStudent = (updatedStudent: Student) => {
    updateStudent(updatedStudent);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      deleteStudent(studentId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'graduated': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Student Management</h1>
            <p className="text-slate-600">Manage student records and view analytics</p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-1 bg-slate-200 p-1 rounded-lg">
              <button
                onClick={() => setSelectedView('grid')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedView === 'grid'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Students
              </button>
              <button
                onClick={() => setSelectedView('analytics')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedView === 'analytics'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <PieChart className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-[#B43F3F] text-white px-6 py-2 rounded-lg hover:bg-[#A03636] transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {selectedView === 'grid' && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search students by name, email, grade, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent"
            />
            <Search className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
          </div>
        )}
      </div>

      {selectedView === 'grid' ? (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Students</p>
                  <p className="text-2xl font-bold text-slate-800">{students.length}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-slate-400" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Students</p>
                  <p className="text-2xl font-bold text-green-600">{statusDistribution.active || 0}</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Average GPA</p>
                  <p className={`text-2xl font-bold ${getGPAColor(averageGPA)}`}>
                    {averageGPA.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Subjects Taught</p>
                  <p className="text-2xl font-bold text-slate-800">{Object.keys(subjectDistribution).length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Student Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{student.name}</h3>
                      <p className="text-sm text-slate-600">{student.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </div>

                {/* Student Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Grade</p>
                      <p className="font-medium text-slate-800">{student.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">GPA</p>
                      <p className={`font-medium ${getGPAColor(student.gpa)}`}>{student.gpa}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Subjects</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.subjects.slice(0, 3).map((subject, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          {subject}
                        </span>
                      ))}
                      {student.subjects.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          +{student.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Parent Contact</p>
                    <p className="font-medium text-slate-800 text-sm">{student.parentContact.name}</p>
                    <p className="text-slate-600 text-xs">{student.parentContact.phone}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="flex-1 bg-slate-800 text-white py-2 px-3 rounded hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="flex-1 bg-[#B43F3F] text-white py-2 px-3 rounded hover:bg-[#A03636] transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No students found</h3>
              <p className="text-slate-600">
                {searchTerm ? 'Try adjusting your search criteria' : 'Add your first student to get started'}
              </p>
            </div>
          )}
        </>
      ) : (
        /* Analytics View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grade Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Grade Distribution</h3>
            <SimplePieChart data={gradeDistribution} />
          </div>

          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Student Status</h3>
            <SimplePieChart data={statusDistribution} />
          </div>

          {/* Subject Popularity */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Subject Popularity</h3>
            <div className="space-y-3">
              {Object.entries(subjectDistribution)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .map(([subject, count]) => {
                  const percentage = (count / students.length) * 100;
                  return (
                    <div key={subject} className="flex items-center gap-3">
                      <div className="w-32 text-sm font-medium text-slate-800">{subject}</div>
                      <div className="flex-1 bg-slate-200 rounded-full h-3">
                        <div
                          className="bg-[#B43F3F] h-3 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-sm text-slate-600 text-right">{count} students</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Student Modal */}
      {(showAddForm || editingStudent) && (
        <StudentFormModal
          student={editingStudent}
          onSave={editingStudent ? handleEditStudent : handleAddStudent}
          onCancel={() => {
            setShowAddForm(false);
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
}

// Simple Pie Chart Component
function SimplePieChart({ data }: { data: Record<string, number> }) {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  const colors = ['#1e293b', '#B43F3F', '#64748b', '#94a3b8', '#cbd5e1'];
  
  let cumulativePercentage = 0;
  
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {Object.entries(data).map(([key, value], index) => {
            const percentage = (value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -cumulativePercentage;
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={key}
                cx="50"
                cy="50"
                r="15.915"
                fill="transparent"
                stroke={colors[index % colors.length]}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{total}</div>
            <div className="text-sm text-slate-600">Total</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {Object.entries(data).map(([key, value], index) => (
          <div key={key} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span className="text-sm font-medium text-slate-800 capitalize">{key}</span>
            <span className="text-sm text-slate-600">({value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Student Form Modal Component
interface StudentFormModalProps {
  student?: Student | null;
  onSave: (student: any) => void;
  onCancel: () => void;
}

function StudentFormModal({ student, onSave, onCancel }: StudentFormModalProps) {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    grade: student?.grade || '',
    subjects: student?.subjects?.join(', ') || '',
    gpa: student?.gpa || 3.0,
    status: student?.status || 'active',
    address: {
      street: student?.address?.street || '',
      city: student?.address?.city || '',
      state: student?.address?.state || '',
      zipCode: student?.address?.zipCode || '',
    },
    parentContact: {
      name: student?.parentContact?.name || '',
      phone: student?.parentContact?.phone || '',
      email: student?.parentContact?.email || '',
    },
    enrollmentDate: student?.enrollmentDate || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = {
      ...formData,
      subjects: formData.subjects.split(',').map(s => s.trim()).filter(s => s),
      ...(student && { id: student.id }),
    };
    onSave(studentData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          {student ? 'Edit Student' : 'Add New Student'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Grade</label>
              <input
                type="text"
                required
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g., 10th Grade"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subjects (comma-separated)</label>
            <input
              type="text"
              required
              value={formData.subjects}
              onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
              placeholder="Mathematics, Physics, Chemistry"
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GPA</label>
              <input
                type="number"
                min="0"
                max="4"
                step="0.1"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Enrollment Date</label>
              <input
                type="date"
                value={formData.enrollmentDate}
                onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-slate-800 mb-3">Parent Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Parent Name</label>
                <input
                  type="text"
                  required
                  value={formData.parentContact.name}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    parentContact: { ...formData.parentContact, name: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Parent Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.parentContact.phone}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    parentContact: { ...formData.parentContact, phone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Parent Email</label>
                <input
                  type="email"
                  required
                  value={formData.parentContact.email}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    parentContact: { ...formData.parentContact, email: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B43F3F]"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#B43F3F] text-white py-2 px-4 rounded hover:bg-[#A03636] transition-colors font-medium"
            >
              {student ? 'Update Student' : 'Add Student'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-slate-300 text-slate-700 py-2 px-4 rounded hover:bg-slate-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
