'use client';

import { useState } from 'react';
import { TeacherProfile } from '@/types/teacher';

interface ExactLayoutProps {
  teachers: TeacherProfile[];
}

export function ExactLayout({ teachers }: ExactLayoutProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile>(teachers[0]);

  const handleTeacherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teacherId = event.target.value;
    const teacher = teachers.find(t => t.id === teacherId);
    if (teacher) {
      setSelectedTeacher(teacher);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Left Sidebar */}
      <div className="w-48 bg-slate-700 text-white flex flex-col">
        {/* Logo Area */}
        <div className="p-3 bg-slate-800 border-b border-slate-600">
          <div className="text-sm font-medium">TMS System</div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 py-2">
          <div className="space-y-1 text-sm">
            <div className="px-3 py-2 text-slate-300 hover:bg-slate-600 cursor-pointer">📊 Dashboard</div>
            <div className="px-3 py-2 bg-slate-600 text-white border-r-2 border-blue-400">👨‍🏫 Teachers</div>
            <div className="px-3 py-2 text-slate-300 hover:bg-slate-600 cursor-pointer">👥 Students</div>
            <div className="px-3 py-2 text-slate-300 hover:bg-slate-600 cursor-pointer">📚 Courses</div>
            <div className="px-3 py-2 text-slate-300 hover:bg-slate-600 cursor-pointer">📅 Schedule</div>
            <div className="px-3 py-2 text-slate-300 hover:bg-slate-600 cursor-pointer">💰 Payments</div>
            <div className="px-3 py-2 text-slate-300 hover:bg-slate-600 cursor-pointer">📊 Reports</div>
            <div className="px-3 py-2 text-slate-300 hover:bg-slate-600 cursor-pointer">⚙️ Settings</div>
            <div className="px-3 py-2 text-slate-300 hover:bg-slate-600 cursor-pointer">❓ Help</div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-600">
          <div className="text-xs text-slate-400">Admin Panel</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-red-500 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Teachers / {selectedTeacher.name}</span>
            <select
              value={selectedTeacher.id}
              onChange={handleTeacherChange}
              className="bg-red-600 text-white px-2 py-1 rounded text-sm border-none"
            >
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id} className="bg-white text-black">
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Save</button>
            <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Cancel</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Left Panel - Forms */}
          <div className="w-1/2 bg-white p-4 overflow-auto">
            {/* Details Section */}
            <div className="mb-6">
              <div className="bg-gray-200 px-3 py-2 border-b flex items-center justify-between">
                <span className="font-medium text-gray-800">Details</span>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-gray-800">✏️</button>
                  <button className="text-gray-600 hover:text-gray-800">➖</button>
                </div>
              </div>
              <div className="bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={selectedTeacher.name}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Birth Date</label>
                      <input
                        type="text"
                        value=""
                        placeholder="Not specified"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                      <div className="flex gap-2">
                        <span className="text-xs text-gray-600 py-1 w-12">Work</span>
                        <input
                          type="email"
                          value={selectedTeacher.email}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                      <div className="flex gap-2">
                        <span className="text-xs text-gray-600 py-1 w-12">Home</span>
                        <input
                          type="tel"
                          value={selectedTeacher.phone}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Addresses</label>
                      <div className="flex gap-2">
                        <span className="text-xs text-gray-600 py-1 w-12">Home</span>
                        <textarea
                          value={`${selectedTeacher.address.street}\n${selectedTeacher.address.city}, ${selectedTeacher.address.state}\n${selectedTeacher.address.zipCode}`}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm bg-white h-16 resize-none"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Private Qualifications */}
            <div className="mb-6">
              <div className="bg-gray-200 px-3 py-2 border-b flex items-center justify-between">
                <span className="font-medium text-gray-800">Private Qualifications</span>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-gray-800">➕</button>
                  <button className="text-gray-600 hover:text-gray-800">➖</button>
                </div>
              </div>
              <div className="bg-gray-50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Name</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Rate ($/hr)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeacher.qualifications
                      .filter(q => q.type === 'private')
                      .map((qual, index) => (
                        <tr key={qual.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-1 px-3">
                            <input
                              type="text"
                              value={qual.name}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              readOnly
                            />
                          </td>
                          <td className="py-1 px-3">
                            <input
                              type="text"
                              value={`$${qual.rate.toFixed(2)}`}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Group Qualifications */}
            <div className="mb-6">
              <div className="bg-gray-200 px-3 py-2 border-b flex items-center justify-between">
                <span className="font-medium text-gray-800">Group Qualifications</span>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-gray-800">➕</button>
                  <button className="text-gray-600 hover:text-gray-800">➖</button>
                </div>
              </div>
              <div className="bg-gray-50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Name</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Rate ($/hr)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeacher.qualifications
                      .filter(q => q.type === 'group')
                      .map((qual, index) => (
                        <tr key={qual.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-1 px-3">
                            <input
                              type="text"
                              value={qual.name}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              readOnly
                            />
                          </td>
                          <td className="py-1 px-3">
                            <input
                              type="text"
                              value={`$${qual.rate.toFixed(2)}`}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Panel - Availability Chart */}
          <div className="w-1/2 bg-white border-l border-gray-300">
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
      </div>
    </div>
  );
}
