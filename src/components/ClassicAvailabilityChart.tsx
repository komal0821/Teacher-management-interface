'use client';

import { ScheduleSlot } from '@/types/teacher';

interface ClassicAvailabilityChartProps {
  schedule: ScheduleSlot[];
}

const timeSlots = [
  '7:30am', '8am', '8:30am', '9am', '9:30am', '10am', '10:30am', '11am', '11:30am',
  '12pm', '12:30pm', '1pm', '1:30pm', '2pm', '2:30pm', '3pm', '3:30pm', '4pm', '4:30pm', '5pm'
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const tabs = [
  'Availability', 'Unavailabilities', 'Students', 'Schedule', 'Invoiced Lessons', 
  'Uninvoiced Lessons', 'Time-Year-Plan', 'Comments', 'History'
];

export function ClassicAvailabilityChart({ schedule }: ClassicAvailabilityChartProps) {
  const getSlotForDayAndTime = (day: string, timeIndex: number) => {
    // Convert time index to hour for matching with schedule
    const hour = Math.floor(7.5 + (timeIndex * 0.5));
    return schedule.find(slot => {
      const slotStart = parseInt(slot.startTime.split(':')[0]);
      const slotEnd = parseInt(slot.endTime.split(':')[0]);
      return slot.day === day && hour >= slotStart && hour < slotEnd;
    });
  };

  return (
    <div className="bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-300">
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm border-r border-gray-300 ${
                index === 0 
                  ? 'bg-gray-100 border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Header */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="grid grid-cols-7 gap-1 text-sm font-medium text-gray-700">
          <div className="text-center py-2">All day</div>
          {daysOfWeek.map(day => (
            <div key={day} className="text-center py-2">{day}</div>
          ))}
        </div>
      </div>

      {/* Time Grid */}
      <div className="overflow-auto" style={{ maxHeight: '500px' }}>
        {timeSlots.map((time, timeIndex) => (
          <div key={time} className="grid grid-cols-7 gap-1 border-b border-gray-200">
            {/* Time Label */}
            <div className="text-xs text-gray-600 text-center py-3 bg-gray-50 border-r border-gray-200">
              {time}
            </div>
            
            {/* Day Columns */}
            {daysOfWeek.map(day => {
              const slot = getSlotForDayAndTime(day, timeIndex);
              const isAvailable = slot?.isAvailable;
              const isScheduled = !!slot;
              
              return (
                <div
                  key={`${day}-${time}`}
                  className={`h-8 border-r border-gray-200 ${
                    isScheduled
                      ? isAvailable
                        ? 'bg-green-300 hover:bg-green-400'
                        : 'bg-gray-400 hover:bg-gray-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } cursor-pointer transition-colors`}
                  title={
                    isScheduled
                      ? `${slot.subject} (${slot.type}) - ${isAvailable ? 'Available' : 'Unavailable'}`
                      : 'No session scheduled'
                  }
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 border border-gray-400"></div>
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 border border-gray-400"></div>
            <span className="text-gray-700">Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-400"></div>
            <span className="text-gray-700">No Schedule</span>
          </div>
        </div>
      </div>
    </div>
  );
}
