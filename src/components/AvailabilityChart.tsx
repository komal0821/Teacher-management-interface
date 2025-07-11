'use client';

import { ScheduleSlot } from '@/types/teacher';

interface AvailabilityChartProps {
  schedule: ScheduleSlot[];
}

const timeSlots = [
  '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function AvailabilityChart({ schedule }: AvailabilityChartProps) {
  const getSlotForDayAndTime = (day: string, time: string) => {
    return schedule.find(slot => {
      const slotStart = parseInt(slot.startTime.split(':')[0]);
      const slotEnd = parseInt(slot.endTime.split(':')[0]);
      const currentTime = parseInt(time.split(':')[0]);
      
      return slot.day === day && currentTime >= slotStart && currentTime < slotEnd;
    });
  };

  const formatTime = (time: string) => {
    const [hours] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour} ${ampm}`;
  };

  const getAvailabilityStats = () => {
    const totalSlots = daysOfWeek.length * timeSlots.length;
    const availableSlots = schedule.filter(slot => slot.isAvailable).length;
    const privateSlots = schedule.filter(slot => slot.type === 'private' && slot.isAvailable).length;
    const groupSlots = schedule.filter(slot => slot.type === 'group' && slot.isAvailable).length;
    
    return {
      totalSlots,
      availableSlots,
      privateSlots,
      groupSlots,
      availabilityPercentage: Math.round((availableSlots / totalSlots) * 100)
    };
  };

  const stats = getAvailabilityStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Availability Overview
        </h2>
        <p className="text-gray-600">
          Visual representation of your weekly availability and teaching schedule.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{stats.availabilityPercentage}%</div>
          <div className="text-sm text-blue-100">Availability Rate</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{stats.availableSlots}</div>
          <div className="text-sm text-green-100">Available Slots</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{stats.privateSlots}</div>
          <div className="text-sm text-purple-100">Private Sessions</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="text-2xl font-bold">{stats.groupSlots}</div>
          <div className="text-sm text-orange-100">Group Sessions</div>
        </div>
      </div>

      {/* Availability Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Weekly Availability Chart</h3>
        
        <div className="min-w-[600px]">
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="text-sm font-medium text-gray-600 text-center py-2">Time</div>
            {daysOfWeek.map(day => (
              <div key={day} className="text-sm font-medium text-gray-600 text-center py-2">
                {day.slice(0, 3)}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map(time => (
            <div key={time} className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-sm text-gray-600 text-center py-3 font-medium">
                {formatTime(time)}
              </div>
              {daysOfWeek.map(day => {
                const slot = getSlotForDayAndTime(day, time);
                
                return (
                  <div
                    key={`${day}-${time}`}
                    className={`h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${
                      slot
                        ? slot.isAvailable
                          ? slot.type === 'private'
                            ? 'bg-blue-100 border-blue-300 hover:bg-blue-200'
                            : 'bg-green-100 border-green-300 hover:bg-green-200'
                          : 'bg-red-100 border-red-300'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    title={
                      slot
                        ? `${slot.subject || 'Session'} (${slot.type}) - ${
                            slot.isAvailable ? 'Available' : 'Unavailable'
                          }`
                        : 'No session scheduled'
                    }
                  >
                    {slot && (
                      <div className="h-full flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {slot.type === 'private' ? '👤' : '👥'}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Legend</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
              <span className="text-gray-600">👤 Private Session (Available)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
              <span className="text-gray-600">👥 Group Session (Available)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
              <span className="text-gray-600">❌ Unavailable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 border-2 border-gray-200 rounded"></div>
              <span className="text-gray-600">⚪ No Session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
