'use client';

import { useState } from 'react';
import { mockCourses } from '@/data/allMockData';
import { Course } from '@/types/common';

export function Courses() {
  const [courses] = useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredCourses = courses.filter(course =>
    filterLevel === 'all' || course.level === filterLevel
  );

  const CourseCard = ({ course }: { course: Course }) => (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => setSelectedCourse(course)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{course.name}</h3>
          <p className="text-gray-600 text-sm font-medium">{course.code}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          course.level === 'beginner' ? 'bg-green-100 text-green-800' :
          course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {course.level === 'beginner' ? '🟢 Beginner' :
           course.level === 'intermediate' ? '🟡 Intermediate' :
           '🔴 Advanced'}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs font-medium text-blue-700">Credits</p>
          <p className="text-lg font-bold text-blue-800">{course.credits}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-xs font-medium text-green-700">Duration</p>
          <p className="text-sm font-bold text-green-800">{course.duration}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>👨‍🏫</span>
          <span>{course.instructor}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📚</span>
          <span>{course.category}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>👥</span>
          <span>{course.enrolledStudents}/{course.maxStudents} students</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="text-lg font-bold text-green-600">${course.fee}</span>
        </div>
        <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2 ml-4">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const CourseModal = ({ course, onClose }: { course: Course; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-slate-700 to-red-800 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{course.name}</h2>
              <p className="text-purple-100 text-lg">{course.code}</p>
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
          {/* Course Overview */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              📋 Course Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Course Details */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              📊 Course Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">{course.credits}</p>
                <p className="text-sm font-medium text-blue-700">Credits</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-green-600">{course.duration}</p>
                <p className="text-sm font-medium text-green-700">Duration</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-purple-600 capitalize">{course.level}</p>
                <p className="text-sm font-medium text-purple-700">Level</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-600">${course.fee}</p>
                <p className="text-sm font-medium text-orange-700">Course Fee</p>
              </div>
            </div>
          </div>

          {/* Instructor & Category */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              👨‍🏫 Instructor & Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Instructor</p>
                <p className="text-lg font-bold text-gray-800">{course.instructor}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Category</p>
                <p className="text-lg font-bold text-gray-800">{course.category}</p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              📅 Schedule
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Days</p>
                  <p className="text-gray-800">{course.schedule.days.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Time</p>
                  <p className="text-gray-800">{course.schedule.time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Duration</p>
                  <p className="text-gray-800">{course.schedule.duration} minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              👥 Enrollment Status
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Enrolled Students</span>
                <span className="font-bold text-gray-800">{course.enrolledStudents}/{course.maxStudents}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {course.maxStudents - course.enrolledStudents} spots remaining
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-red-800 text-white py-3 px-6 rounded-lg hover:bg-red-900 transition-all duration-200 font-medium">
              📝 Enroll Student
            </button>
            <button className="flex-1 bg-slate-700 text-white py-3 px-6 rounded-lg hover:bg-slate-800 transition-all duration-200 font-medium">
              ✏️ Edit Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2 lg:gap-3">
          📚 Courses Management
        </h1>
        <p className="text-sm sm:text-base text-gray-600">Manage and view all course information</p>
      </div>

      {/* Filters and Stats */}
      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex gap-4">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{courses.length}</p>
              <p className="text-sm text-gray-600">Total Courses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {courses.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {courses.reduce((sum, c) => sum + c.enrolledStudents, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Enrolled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
}
