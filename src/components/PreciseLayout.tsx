'use client';

import { useState } from 'react';
import { TeacherProfile } from '@/types/teacher';
import { Dashboard } from './Dashboard';
import { Students } from './Students';
import { Courses } from './Courses';
import { mockTeachers } from '@/data/allMockData';

interface PreciseLayoutProps {
  teachers: TeacherProfile[];
}

export function PreciseLayout({ teachers }: PreciseLayoutProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile>(teachers[0]);
  const [editedTeacher, setEditedTeacher] = useState<TeacherProfile>(teachers[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('teachers');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    email: true,
    privateQualifications: true,
    phone: true,
    address: true,
    groupQualifications: true
  });

  const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teacherId = event.target.value;
    const teacher = teachers.find(t => t.id === teacherId);
    if (teacher) {
      setSelectedTeacher(teacher);
      setEditedTeacher(teacher);
    }
  };

  const handleSave = () => {
    setSelectedTeacher(editedTeacher);
    setIsEditing(false);
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse';
    notification.textContent = 'Teacher information saved successfully!';
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const handleCancel = () => {
    setEditedTeacher(selectedTeacher);
    setIsEditing(false);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // const addQualification = (type: 'private' | 'group') => {
  //   const newQual: Qualification = {
  //     id: Date.now().toString(),
  //     name: `New ${type} qualification`,
  //     type,
  //     rate: 0,
  //     currency: 'USD',
  //     description: 'New qualification description'
  //   };
  //   setEditedTeacher(prev => ({
  //     ...prev,
  //     qualifications: [...prev.qualifications, newQual]
  //   }));
  // };

  // const removeQualification = (id: string) => {
  //   setEditedTeacher(prev => ({
  //     ...prev,
  //     qualifications: prev.qualifications.filter(q => q.id !== id)
  //   }));
  // };

  // const updateQualification = (id: string, field: keyof Qualification, value: string | number) => {
  //   setEditedTeacher(prev => ({
  //     ...prev,
  //     qualifications: prev.qualifications.map(q => 
  //       q.id === id ? { ...q, [field]: value } : q
  //     )
  //   }));
  // };

  const navigationItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', color: 'hover:bg-blue-600' },
    { id: 'teachers', icon: '👨‍🏫', label: 'Teachers', color: 'hover:bg-green-600' },
    { id: 'students', icon: '👥', label: 'Students', color: 'hover:bg-purple-600' },
    { id: 'courses', icon: '📚', label: 'Courses', color: 'hover:bg-orange-600' },
    { id: 'schedule', icon: '📅', label: 'Schedule', color: 'hover:bg-indigo-600' },
    { id: 'payments', icon: '💰', label: 'Payments', color: 'hover:bg-yellow-600' },
    { id: 'reports', icon: '📊', label: 'Reports', color: 'hover:bg-red-600' },
    { id: 'settings', icon: '⚙️', label: 'Settings', color: 'hover:bg-gray-600' },
    { id: 'help', icon: '❓', label: 'Help', color: 'hover:bg-teal-600' }
  ];

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="flex h-screen bg-gray-300">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Left Sidebar - Classic Windows Style */}
      <div className={`${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-56 xl:w-64 bg-gray-200 border-r-2 border-gray-400 flex flex-col transition-transform duration-200 ease-in-out shadow-inner`}>
        {/* Logo Area - Classic Application Header */}
        <div className="bg-gradient-to-r from-[#B43F3F] to-[#A03636] border-b-2 border-gray-500 p-3">
          <div className="text-center">
            <div className="text-lg font-bold text-white">🏫 TMS Pro</div>
            <div className="text-xs text-red-100 mt-1">v2.1.0</div>
          </div>
        </div>
        {/* Navigation - Classic Menu */}
        <div className="flex-1 py-2">
          <div className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'teachers', label: 'Teachers', icon: '👨‍🏫' },
              { id: 'students', label: 'Students', icon: '👥' },
              { id: 'courses', label: 'Courses', icon: '📚' },
              { id: 'schedule', label: 'Schedule', icon: '📅' },
              { id: 'payments', label: 'Payments', icon: '💰' },
              { id: 'reports', label: 'Reports', icon: '📊' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
              { id: 'help', label: 'Help', icon: '❓' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full text-left px-3 py-2 mx-1 flex items-center gap-3 text-sm font-medium transition-all duration-150 border ${
                  activeSection === item.id 
                    ? 'bg-[#B43F3F] text-white border-[#A03636] shadow-inner' 
                    : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900 border-gray-300 bg-gray-50'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* User Info Section */}
        <div className="p-4 border-t border-slate-600 bg-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">👤</span>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Admin User</div>
              <div className="text-xs text-slate-400">System Administrator</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            🔄 Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Main Content - Classic Windows Application */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Header - Application Title Bar */}
        <div className="bg-gradient-to-b from-gray-300 to-gray-400 border-b-2 border-gray-500 px-4 lg:px-6 py-2 flex items-center justify-between shadow-inner">
          {/* Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-500 border border-gray-600"></div>
            <div className="text-sm font-bold text-gray-800">Teacher Management System</div>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-gray-200 p-2 rounded-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-6 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base lg:text-lg font-bold text-gray-800">👨‍🏫 Teachers</span>
              <span className="text-gray-500 hidden sm:inline">|</span>
              <span className="text-base lg:text-lg font-semibold text-[#B43F3F] truncate max-w-[150px] sm:max-w-none">{editedTeacher.name}</span>
              {isEditing && (
                <span className="bg-[#B43F3F] text-white px-2 py-1 rounded text-xs font-medium hidden sm:inline">
                  ✏️ EDITING
                </span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
              <select
                value={selectedTeacher.id}
                onChange={handleTeacherChange}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm border-none shadow-md transition-all duration-200 cursor-pointer w-full sm:w-auto"
              >
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id} className="bg-white text-black">
                    {teacher.name} - {teacher.subjects.slice(0, 2).join(', ')}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedTeacher.status === 'active' 
                    ? 'bg-green-400 text-green-900' 
                    : 'bg-gray-400 text-gray-900'
                }`}>
                  {selectedTeacher.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                </span>
                <span className="text-red-200 hidden sm:inline">|</span>
                <span>⭐ {selectedTeacher.rating}/5</span>
                <span className="text-red-200 hidden sm:inline">|</span>
                <span>👥 {selectedTeacher.totalStudents}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-3 lg:mt-0">
            <button 
              onClick={handleSave}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 lg:px-4 py-1 border border-gray-400 text-xs lg:text-sm font-medium transition-all duration-150 flex items-center justify-center gap-1 lg:gap-2 shadow-sm hover:shadow"
            >
              <span>💾</span>
              <span className="hidden sm:inline">Save</span>
            </button>
            <button 
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 lg:px-4 py-1 border border-gray-400 text-xs lg:text-sm font-medium transition-all duration-150 flex items-center justify-center gap-1 lg:gap-2 shadow-sm hover:shadow"
            >
              <span>❌</span>
              <span className="hidden sm:inline">Cancel</span>
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 lg:px-4 py-1 border text-xs lg:text-sm font-medium transition-all duration-150 flex items-center justify-center gap-1 lg:gap-2 shadow-sm hover:shadow ${
                isEditing 
                  ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 border-gray-400' 
                  : 'bg-[#B43F3F] hover:bg-[#A03636] text-white border-[#B43F3F]'
              }`}
            >
              <span>{isEditing ? '👁️' : '✏️'}</span>
              <span className="hidden sm:inline">{isEditing ? 'View' : 'Edit'}</span>
            </button>
          </div>
        </div>

        {/* Content Area - Classic Window Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {activeSection === 'dashboard' && <Dashboard />}
          {activeSection === 'students' && <Students />}
          {activeSection === 'courses' && <Courses />}
          {activeSection === 'schedule' && (
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                📅 Schedule Management
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
                <p className="text-gray-600">Schedule management features are under development.</p>
              </div>
            </div>
          )}
          {activeSection === 'payments' && (
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                💰 Payments Management
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
                <p className="text-gray-600">Payment management features are under development.</p>
              </div>
            </div>
          )}
          {activeSection === 'reports' && (
            <div className="p-6 bg-gradient-to-br from-red-50 to-pink-100 min-h-screen">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                📊 Reports & Analytics
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
                <p className="text-gray-600">Reports and analytics features are under development.</p>
              </div>
            </div>
          )}
          {activeSection === 'settings' && (
            <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-100 min-h-screen">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                ⚙️ System Settings
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
                <p className="text-gray-600">System settings are under development.</p>
              </div>
            </div>
          )}
          {activeSection === 'help' && (
            <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-100 min-h-screen">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                ❓ Help & Support
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
                <p className="text-gray-600">Help and support features are under development.</p>
              </div>
            </div>
          )}
          {activeSection === 'teachers' && (
            <div className="flex-1 bg-gray-50 p-4 lg:p-6 overflow-auto">
          {/* Row 1: Details Section (Left) and Email (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
            {/* Left: Details */}
            <div className="bg-white border-2 border-gray-300 shadow-sm">
              <div 
                className="bg-gradient-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400 px-4 py-2 flex items-center justify-between cursor-pointer hover:from-gray-300 hover:to-gray-400 transition-all duration-150"
                onClick={() => toggleSection('details')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📝</span>
                  <span className="font-bold text-gray-800">Personal Details</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }}
                    className="text-white hover:text-yellow-300 p-1 rounded transition-colors duration-200"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleSection('details'); }}
                    className="text-white hover:text-blue-200 p-1 rounded transition-colors duration-200"
                    title={expandedSections.details ? 'Collapse' : 'Expand'}
                  >
                    {expandedSections.details ? '➖' : '➕'}
                  </button>
                </div>
              </div>
              {expandedSections.details && (
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        👤 Full Name
                      </label>
                      <input
                        type="text"
                        value={editedTeacher.name}
                        onChange={(e) => setEditedTeacher(prev => ({ ...prev, name: e.target.value }))}
                        className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-200 ${
                          isEditing 
                            ? 'border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        🎂 Birth Date
                      </label>
                      <input
                        type="date"
                        value=""
                        className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-200 ${
                          isEditing 
                            ? 'border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                        readOnly={!isEditing}
                        placeholder="Not specified"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        🎯 Experience
                      </label>
                      <input
                        type="number"
                        value={editedTeacher.experience}
                        onChange={(e) => setEditedTeacher(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                        className={`w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-200 ${
                          isEditing 
                            ? 'border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                        readOnly={!isEditing}
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Years of teaching experience</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Email */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div 
                className="bg-slate-700 text-white px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-all duration-200"
                onClick={() => toggleSection('email')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📧</span>
                  <span className="font-semibold">Email Contact</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSection('email'); }}
                  className="text-white hover:text-green-200 p-1 rounded transition-colors duration-200"
                  title={expandedSections.email ? 'Collapse' : 'Expand'}
                >
                  {expandedSections.email ? '➖' : '➕'}
                </button>
              </div>
              {expandedSections.email && (
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      🏢 Work Email
                    </label>
                    <div className="flex gap-3">
                      <span className="text-sm text-gray-600 py-3 min-w-[50px] font-medium">Work</span>
                      <input
                        type="email"
                        value={editedTeacher.email}
                        onChange={(e) => setEditedTeacher(prev => ({ ...prev, email: e.target.value }))}
                        className={`flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-200 ${
                          isEditing 
                            ? 'border-green-300 bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Primary email for official communication</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Private Qualifications (Left) and Phone/Address (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-6">
            {/* Left: Private Qualifications */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-200 px-3 py-2 border-b border-gray-300 flex items-center justify-between">
                <span className="font-medium text-gray-800">Private Qualifications</span>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-gray-800 w-6 h-6 flex items-center justify-center">➕</button>
                  <button className="text-gray-600 hover:text-gray-800 w-6 h-6 flex items-center justify-center">➖</button>
                </div>
              </div>
              <div className="bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="text-left py-2 px-3 font-medium text-gray-700 border-r border-gray-300">Name</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Rate ($/hr)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedTeacher.qualifications
                      .filter(q => q.type === 'private')
                      .map((qual, index) => (
                        <tr key={qual.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-2 px-3 border-r border-gray-200">
                            <input
                              type="text"
                              value={qual.name}
                              onChange={(e) => {
                                const updatedQuals = editedTeacher.qualifications.map(q => 
                                  q.id === qual.id ? { ...q, name: e.target.value } : q
                                );
                                setEditedTeacher(prev => ({ ...prev, qualifications: updatedQuals }));
                              }}
                              className={`w-full px-2 py-1 text-sm bg-transparent border-none focus:outline-none ${
                                isEditing ? 'bg-white border border-gray-300 rounded' : ''
                              }`}
                              readOnly={!isEditing}
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={`$${qual.rate.toFixed(2)}`}
                              onChange={(e) => {
                                const rate = parseFloat(e.target.value.replace('$', '')) || 0;
                                const updatedQuals = editedTeacher.qualifications.map(q => 
                                  q.id === qual.id ? { ...q, rate } : q
                                );
                                setEditedTeacher(prev => ({ ...prev, qualifications: updatedQuals }));
                              }}
                              className={`w-full px-2 py-1 text-sm bg-transparent border-none focus:outline-none ${
                                isEditing ? 'bg-white border border-gray-300 rounded' : ''
                              }`}
                              readOnly={!isEditing}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Phone and Address */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-200 px-3 py-2 border-b border-gray-300">
                  <span className="font-medium text-gray-800">Phone</span>
                </div>
                <div className="bg-gray-50 p-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Phone</label>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 min-w-[40px]">Home</span>
                      <input
                        type="tel"
                        value={editedTeacher.phone}
                        onChange={(e) => setEditedTeacher(prev => ({ ...prev, phone: e.target.value }))}
                        className={`flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          isEditing ? 'bg-white' : 'bg-gray-100'
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-200 px-3 py-2 border-b border-gray-300">
                  <span className="font-medium text-gray-800">Addresses</span>
                </div>
                <div className="bg-gray-50 p-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Addresses</label>
                    <div className="flex gap-3">
                      <span className="text-sm text-gray-600 min-w-[40px] pt-2">Home</span>
                      <textarea
                        value={`${editedTeacher.address.street}\n${editedTeacher.address.city}, ${editedTeacher.address.state}\n${editedTeacher.address.zipCode}`}
                        onChange={(e) => {
                          const lines = e.target.value.split('\n');
                          const street = lines[0] || '';
                          const cityState = lines[1] || '';
                          const zipCode = lines[2] || '';
                          const [city, state] = cityState.split(', ');
                          setEditedTeacher(prev => ({
                            ...prev,
                            address: {
                              street,
                              city: city || '',
                              state: state || '',
                              zipCode
                            }
                          }));
                        }}
                        className={`flex-1 px-3 py-2 text-sm border border-gray-300 rounded h-20 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          isEditing ? 'bg-white' : 'bg-gray-100'
                        }`}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Group Qualifications (Full Width) */}
          <div className="mb-6 bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-200 px-3 py-2 border-b border-gray-300 flex items-center justify-between">
              <span className="font-medium text-gray-800">Group Qualifications</span>
              <div className="flex gap-2">
                <button className="text-gray-600 hover:text-gray-800 w-6 h-6 flex items-center justify-center">➕</button>
                <button className="text-gray-600 hover:text-gray-800 w-6 h-6 flex items-center justify-center">➖</button>
              </div>
            </div>
            <div className="bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="text-left py-2 px-3 font-medium text-gray-700 border-r border-gray-300">Name</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Rate ($/hr)</th>
                  </tr>
                </thead>
                <tbody>
                  {editedTeacher.qualifications
                    .filter(q => q.type === 'group')
                    .map((qual, index) => (
                      <tr key={qual.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 border-r border-gray-200">
                          <input
                            type="text"
                            value={qual.name}
                            onChange={(e) => {
                              const updatedQuals = editedTeacher.qualifications.map(q => 
                                q.id === qual.id ? { ...q, name: e.target.value } : q
                              );
                              setEditedTeacher(prev => ({ ...prev, qualifications: updatedQuals }));
                            }}
                            className={`w-full px-2 py-1 text-sm bg-transparent border-none focus:outline-none ${
                              isEditing ? 'bg-white border border-gray-300 rounded' : ''
                            }`}
                            readOnly={!isEditing}
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={`$${qual.rate.toFixed(2)}`}
                            onChange={(e) => {
                              const rate = parseFloat(e.target.value.replace('$', '')) || 0;
                              const updatedQuals = editedTeacher.qualifications.map(q => 
                                q.id === qual.id ? { ...q, rate } : q
                              );
                              setEditedTeacher(prev => ({ ...prev, qualifications: updatedQuals }));
                            }}
                            className={`w-full px-2 py-1 text-sm bg-transparent border-none focus:outline-none ${
                              isEditing ? 'bg-white border border-gray-300 rounded' : ''
                            }`}
                            readOnly={!isEditing}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Row 4: Availability Chart (Full Width) */}
          <div>
            {/* Tab Navigation */}
            <div className="border-b border-gray-300">
              <div className="flex text-xs">
                <div className="px-3 py-2 bg-gray-100 border-r border-gray-300 border-b-2 border-blue-500 text-blue-600">
                  Availability
                </div>
                <div className="px-3 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-50">
                  Unavailabilities
                </div>
                <div className="px-3 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-50">
                  Students
                </div>
                <div className="px-3 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-50">
                  Schedule
                </div>
                <div className="px-3 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-50">
                  Invoiced Lessons
                </div>
                <div className="px-3 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-50">
                  Uninvoiced Lessons
                </div>
                <div className="px-3 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-50">
                  Time-Year-Plan
                </div>
                <div className="px-3 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-50">
                  Comments
                </div>
                <div className="px-3 py-2 text-gray-600 hover:bg-gray-50">
                  History
                </div>
              </div>
            </div>

            {/* Chart Header */}
            <div className="bg-gray-100 border-b border-gray-300">
              <div className="grid grid-cols-8 text-xs font-medium text-gray-700">
                <div className="px-2 py-2 text-center border-r border-gray-300">All day</div>
                <div className="px-2 py-2 text-center border-r border-gray-300">Monday</div>
                <div className="px-2 py-2 text-center border-r border-gray-300">Tuesday</div>
                <div className="px-2 py-2 text-center border-r border-gray-300">Wednesday</div>
                <div className="px-2 py-2 text-center border-r border-gray-300">Thursday</div>
                <div className="px-2 py-2 text-center border-r border-gray-300">Friday</div>
                <div className="px-2 py-2 text-center border-r border-gray-300">Saturday</div>
                <div className="px-2 py-2 text-center">Sunday</div>
              </div>
            </div>

            {/* Time Grid */}
            <div className="overflow-auto" style={{ maxHeight: '400px' }}>
              {[
                '7:30am', '8am', '8:30am', '9am', '9:30am', '10am', '10:30am', '11am', '11:30am',
                '12pm', '12:30pm', '1pm', '1:30pm', '2pm', '2:30pm', '3pm', '3:30pm', '4pm', '4:30pm', '5pm'
              ].map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 border-b border-gray-200">
                  <div className="px-2 py-1 text-xs text-gray-600 bg-gray-50 border-r border-gray-200 text-center">
                    {time}
                  </div>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                    // Check if there's a scheduled session for this time slot
                    const hasSession = selectedTeacher.schedule.some(slot => {
                      const slotStart = parseInt(slot.startTime.split(':')[0]);
                      const slotEnd = parseInt(slot.endTime.split(':')[0]);
                      const currentHour = Math.floor(7.5 + (timeIndex * 0.5));
                      return slot.day === day && currentHour >= slotStart && currentHour < slotEnd;
                    });
                    
                    const session = selectedTeacher.schedule.find(slot => {
                      const slotStart = parseInt(slot.startTime.split(':')[0]);
                      const slotEnd = parseInt(slot.endTime.split(':')[0]);
                      const currentHour = Math.floor(7.5 + (timeIndex * 0.5));
                      return slot.day === day && currentHour >= slotStart && currentHour < slotEnd;
                    });

                    return (
                      <div
                        key={`${day}-${time}`}
                        className={`h-6 border-r border-gray-200 ${
                          hasSession
                            ? session?.isAvailable
                              ? 'bg-green-300'
                              : 'bg-gray-400'
                            : 'bg-gray-100'
                        }`}
                        title={hasSession ? `${session?.subject} - ${session?.isAvailable ? 'Available' : 'Unavailable'}` : 'No session'}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
