'use client';

import { ScheduleSlot } from '@/types/teacher';

interface ScheduleSectionProps {
  schedule: ScheduleSlot[];
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ScheduleSection({ schedule }: ScheduleSectionProps) {
  const getScheduleForDay = (day: string) => {
    return schedule.filter(slot => slot.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const ScheduleSlotCard = ({ slot }: { slot: ScheduleSlot }) => (
    <div className={`p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md ${
      slot.isAvailable 
        ? slot.type === 'private' 
          ? 'bg-blue-50 border-blue-400 hover:bg-blue-100' 
          : 'bg-green-50 border-green-400 hover:bg-green-100'
        : 'bg-gray-50 border-gray-400 opacity-60'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${
            slot.isAvailable 
              ? slot.type === 'private' ? 'bg-blue-400' : 'bg-green-400'
              : 'bg-gray-400'
          }`}></span>
          <span className="font-medium text-gray-800">
            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          slot.type === 'private' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {slot.type === 'private' ? '👤' : '👥'} {slot.type}
        </span>
      </div>
      
      {slot.subject && (
        <div className="text-sm text-gray-600 mb-1">
          📚 {slot.subject}
        </div>
      )}
      
      <div className={`text-xs font-medium ${
        slot.isAvailable ? 'text-green-600' : 'text-red-600'
      }`}>
        {slot.isAvailable ? '✅ Available' : '❌ Unavailable'}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📅</span>
          Weekly Schedule
        </h2>
        <p className="text-gray-600">
          Manage your teaching schedule and availability throughout the week.
        </p>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {daysOfWeek.map((day) => {
          const daySchedule = getScheduleForDay(day);
          const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day;
          
          return (
            <div key={day} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`p-4 ${
                isToday 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-gray-50 text-gray-800'
              }`}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {isToday && <span className="text-yellow-300">⭐</span>}
                  {day}
                  {isToday && <span className="text-sm font-normal opacity-80">(Today)</span>}
                </h3>
                <div className="text-sm opacity-80 mt-1">
                  {daySchedule.length} session{daySchedule.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {daySchedule.length > 0 ? (
                  daySchedule.map((slot) => (
                    <ScheduleSlotCard key={slot.id} slot={slot} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-3xl mb-2">🗓️</div>
                    <p className="text-sm">No sessions scheduled</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{schedule.length}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {schedule.filter(s => s.isAvailable).length}
            </div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {schedule.filter(s => s.type === 'private').length}
            </div>
            <div className="text-sm text-gray-600">Private Sessions</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {schedule.filter(s => s.type === 'group').length}
            </div>
            <div className="text-sm text-gray-600">Group Sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
