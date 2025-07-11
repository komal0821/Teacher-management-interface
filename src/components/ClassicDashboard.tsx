'use client';

import { useState } from 'react';
import { TeacherProfile } from '@/types/teacher';
import { Sidebar } from '@/components/Sidebar';
import { ClassicTeacherForm } from '@/components/ClassicTeacherForm';
import { ClassicAvailabilityChart } from '@/components/ClassicAvailabilityChart';

interface ClassicDashboardProps {
  teachers: TeacherProfile[];
}

export function ClassicDashboard({ teachers }: ClassicDashboardProps) {
  const [teacherList, setTeacherList] = useState<TeacherProfile[]>(teachers);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile>(teachers[0]);
  const [activeSection, setActiveSection] = useState('teachers');

  const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teacherId = event.target.value;
    const teacher = teacherList.find(t => t.id === teacherId);
    if (teacher) {
      setSelectedTeacher(teacher);
    }
  };

  const handleSaveTeacher = (updatedTeacher: TeacherProfile) => {
    setTeacherList(prev => 
      prev.map(t => t.id === updatedTeacher.id ? updatedTeacher : t)
    );
    setSelectedTeacher(updatedTeacher);
  };

  const handleCancelEdit = () => {
    // Reset to original teacher data
    const originalTeacher = teacherList.find(t => t.id === selectedTeacher.id);
    if (originalTeacher) {
      setSelectedTeacher(originalTeacher);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeItem={activeSection} onItemClick={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-medium text-gray-800">Teacher Management</h1>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Select Teacher:</label>
                <select
                  value={selectedTeacher.id}
                  onChange={handleTeacherChange}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white"
                >
                  {teacherList.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.subjects.join(', ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                selectedTeacher.status === 'active' ? 'bg-green-100 text-green-800' :
                selectedTeacher.status === 'inactive' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedTeacher.status.toUpperCase()}
              </span>
              <span className="text-sm text-gray-600">
                Rating: {selectedTeacher.rating}/5.0 | Students: {selectedTeacher.totalStudents}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 h-full">
            {/* Left Panel - Teacher Form */}
            <div className="overflow-auto border-r border-gray-200">
              <ClassicTeacherForm 
                teacher={selectedTeacher} 
                onSave={handleSaveTeacher}
                onCancel={handleCancelEdit}
              />
            </div>
            
            {/* Right Panel - Availability Chart */}
            <div className="overflow-auto">
              <ClassicAvailabilityChart schedule={selectedTeacher.schedule} />
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 text-white px-6 py-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>Ready</span>
              <span>|</span>
              <span>Teacher: {selectedTeacher.name}</span>
              <span>|</span>
              <span>Experience: {selectedTeacher.experience} years</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Total Teachers: {teacherList.length}</span>
              <span>|</span>
              <span>Active: {teacherList.filter(t => t.status === 'active').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
