'use client';

import { useState } from 'react';
import { TeacherProfile as TeacherProfileType, TabType } from '@/types/teacher';
import { TeacherDetails } from '@/components/TeacherDetails';
import { QualificationsSection } from '@/components/QualificationsSection';
import { ScheduleSection } from '@/components/ScheduleSection';
import { AvailabilityChart } from '@/components/AvailabilityChart';

interface TeacherProfileProps {
  teacher: TeacherProfileType;
}

const tabs = [
  { id: 'details' as TabType, label: 'Details', icon: '👤' },
  { id: 'qualifications' as TabType, label: 'Qualifications', icon: '🎓' },
  { id: 'schedule' as TabType, label: 'Schedule', icon: '📅' },
  { id: 'availability' as TabType, label: 'Availability', icon: '📊' },
];

export function TeacherProfile({ teacher }: TeacherProfileProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <TeacherDetails teacher={teacher} />;
      case 'qualifications':
        return <QualificationsSection qualifications={teacher.qualifications} />;
      case 'schedule':
        return <ScheduleSection schedule={teacher.schedule} />;
      case 'availability':
        return <AvailabilityChart schedule={teacher.schedule} />;
      default:
        return <TeacherDetails teacher={teacher} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 shadow-lg">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                  teacher.status === 'active' ? 'bg-green-500' : 
                  teacher.status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
              </div>
              
              <div className="flex-1 text-white">
                <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
                <p className="text-blue-100 mb-4">{teacher.email}</p>
                
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-200">⭐</span>
                    <span>{teacher.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-200">👥</span>
                    <span>{teacher.totalStudents} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-200">🎯</span>
                    <span>{teacher.experience} Years Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
