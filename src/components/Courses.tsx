'use client';

import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Course } from '@/types/common';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  BookOpen,
  Users,
  Clock,
  DollarSign,
  GraduationCap,
  User
} from 'lucide-react';

export function Courses() {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    
    return matchesSearch && matchesLevel && matchesCategory && matchesStatus;
  });

  // Get unique categories
  const categories = [...new Set(courses.map(course => course.category))];

  const [showEditForm, setShowEditForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    code: '',
    description: '',
    credits: 3,
    duration: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    category: '',
    instructor: '',
    maxStudents: 30,
    enrolledStudents: 0,
    schedule: {
      days: [] as string[],
      time: '',
      duration: 60
    },
    fee: 0,
    status: 'active' as 'active' | 'inactive' | 'completed'
  });

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setEditFormData({
      name: course.name,
      code: course.code,
      description: course.description,
      credits: course.credits,
      duration: course.duration,
      level: course.level,
      category: course.category,
      instructor: course.instructor,
      maxStudents: course.maxStudents,
      enrolledStudents: course.enrolledStudents,
      schedule: course.schedule,
      fee: course.fee,
      status: course.status
    });
    setShowEditForm(true);
  };

  const handleUpdateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      const updatedCourse = { ...editFormData, id: editingCourse.id };
      console.log('Updating course:', updatedCourse);
      updateCourse(updatedCourse);
      setShowEditForm(false);
      setEditingCourse(null);
      console.log('Course updated successfully');
    }
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingCourse(null);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-slate-100 text-slate-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
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
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Course Management</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">Manage courses, enrollments, and instructors</p>
            </div>
            <button className="bg-[#B43F3F] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-[#A03636] transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search courses by name, code, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-sm sm:text-base text-slate-900 bg-white"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] text-sm text-slate-900 bg-white"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] text-sm text-slate-900 bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] text-sm text-slate-900 bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Course Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{course.name}</h3>
                  <p className="text-sm text-slate-600 font-medium">{course.code}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Course Description */}
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{course.description}</p>

              {/* Course Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BookOpen className="w-4 h-4" />
                  <span>Category: {course.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>Students: {course.enrolledStudents}/{course.maxStudents}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Fee: ${course.fee}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <GraduationCap className="w-4 h-4" />
                  <span>Credits: {course.credits}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {course.duration}</span>
                </div>
              </div>

              {/* Enrollment Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Enrollment Progress</span>
                  <span>{Math.round((course.enrolledStudents / course.maxStudents) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-[#B43F3F] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 px-3 py-2 text-sm text-[#B43F3F] border border-[#B43F3F] rounded-lg hover:bg-[#B43F3F] hover:text-white transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleEditCourse(course)}
                  className="px-3 py-2 text-sm text-slate-600 hover:text-[#B43F3F] hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit Course"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete the course "${course.name}"?`)) {
                      deleteCourse(course.id);
                    }
                  }}
                  className="px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No courses found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || filterLevel !== 'all' || filterCategory !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search terms or filters.'
                : 'Get started by adding your first course.'}
            </p>
            <button className="bg-[#B43F3F] text-white px-6 py-2 rounded-lg hover:bg-[#A03636] transition-colors font-medium">
              Add Course
            </button>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-slate-800 to-[#B43F3F] text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>
                  <p className="text-slate-200 text-lg">{selectedCourse.code}</p>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="text-white hover:text-slate-200 text-xl p-2"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Course Overview */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Course Overview</h3>
                <p className="text-slate-600">{selectedCourse.description}</p>
              </div>

              {/* Course Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Credits</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800">{selectedCourse.credits}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Duration</span>
                  </div>
                  <p className="text-lg font-bold text-green-800">{selectedCourse.duration}</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-800">Course Fee</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">${selectedCourse.fee}</p>
                </div>
              </div>

              {/* Instructor & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Instructor</h4>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#B43F3F] rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedCourse.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-slate-800">{selectedCourse.instructor}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Category & Level</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-600" />
                      <span className="text-slate-600">{selectedCourse.category}</span>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(selectedCourse.level)}`}>
                      {selectedCourse.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enrollment Information */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Enrollment Information</h4>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Students Enrolled</span>
                    <span className="font-semibold text-slate-800">{selectedCourse.enrolledStudents} / {selectedCourse.maxStudents}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-[#B43F3F] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(selectedCourse.enrolledStudents / selectedCourse.maxStudents) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    {Math.round((selectedCourse.enrolledStudents / selectedCourse.maxStudents) * 100)}% capacity filled
                  </p>
                </div>
              </div>

              {/* Schedule Information */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Schedule</h4>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-slate-600">Days:</span>
                      <p className="text-slate-800">{selectedCourse.schedule.days.join(', ') || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-600">Time:</span>
                      <p className="text-slate-800">{selectedCourse.schedule.time || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-600">Duration per session:</span>
                      <p className="text-slate-800">{selectedCourse.schedule.duration} minutes</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-600">Status:</span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCourse.status)}`}>
                        {selectedCourse.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button className="flex-1 px-4 py-2 bg-[#B43F3F] text-white rounded-lg hover:bg-[#A03636] transition-colors font-medium">
                  Edit Course
                </button>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditForm && editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-slate-800 to-[#B43F3F] text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit Course</h2>
                <button 
                  onClick={handleCancelEdit}
                  className="text-white hover:text-slate-200 text-xl p-2"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateCourse} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    value={editFormData.code}
                    onChange={(e) => setEditFormData({...editFormData, code: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Credits *
                  </label>
                  <input
                    type="number"
                    value={editFormData.credits}
                    onChange={(e) => setEditFormData({...editFormData, credits: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    min="1"
                    max="10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={editFormData.duration}
                    onChange={(e) => setEditFormData({...editFormData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    placeholder="e.g., 12 weeks"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Fee ($) *
                  </label>
                  <input
                    type="number"
                    value={editFormData.fee}
                    onChange={(e) => setEditFormData({...editFormData, fee: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Level *
                  </label>
                  <select
                    value={editFormData.level}
                    onChange={(e) => setEditFormData({...editFormData, level: e.target.value as any})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status *
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Instructor *
                  </label>
                  <input
                    type="text"
                    value={editFormData.instructor}
                    onChange={(e) => setEditFormData({...editFormData, instructor: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Max Students *
                  </label>
                  <input
                    type="number"
                    value={editFormData.maxStudents}
                    onChange={(e) => setEditFormData({...editFormData, maxStudents: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Enrolled Students
                  </label>
                  <input
                    type="number"
                    value={editFormData.enrolledStudents}
                    onChange={(e) => setEditFormData({...editFormData, enrolledStudents: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43F3F] focus:border-transparent text-slate-900 bg-white"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#B43F3F] text-white rounded-lg hover:bg-[#A03636] transition-colors font-medium"
                >
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
