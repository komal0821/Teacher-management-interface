'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ManageTeachers } from './ManageTeachers';
import { DashboardReports } from './DashboardReports';
import { TeacherMeetings } from './TeacherMeetings';
import { TeacherLeaves } from './TeacherLeaves';

import { Courses } from './Courses';
import { Settings } from './Settings';
import { useData } from '@/contexts/DataContext';

export function MainLayout() {
  const [activeView, setActiveView] = useState('dashboard');
  const { teachers, meetings, leaves, analytics, subjectStats } = useData();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardReports />;
      case 'manage-teachers':
        return <ManageTeachers />;
      case 'teacher-meetings':
        return <TeacherMeetings />;
      case 'teacher-leaves':
        return <TeacherLeaves />;
      case 'courses':
        return <Courses />;
      case 'schedule':
        return (
          <div className="p-6 bg-white min-h-screen">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Schedule Management</h1>
            <p className="text-slate-600">Schedule management feature coming soon...</p>
          </div>
        );
      case 'payments':
        return (
          <div className="p-6 bg-white min-h-screen">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Payment Management</h1>
            <p className="text-slate-600">Payment management feature coming soon...</p>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return <DashboardReports />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem={activeView} onItemClick={setActiveView} />
      <div className="flex-1 overflow-auto">
        <div className="lg:hidden h-16"></div> {/* Spacer for mobile menu button */}
        <div className="w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
