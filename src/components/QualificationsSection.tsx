'use client';

import { Qualification } from '@/types/teacher';

interface QualificationsSectionProps {
  qualifications: Qualification[];
}

export function QualificationsSection({ qualifications }: QualificationsSectionProps) {
  const privateQualifications = qualifications.filter(q => q.type === 'private');
  const groupQualifications = qualifications.filter(q => q.type === 'group');

  const QualificationCard = ({ qualification }: { qualification: Qualification }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {qualification.name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              qualification.type === 'private' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {qualification.type === 'private' ? '👤 Private' : '👥 Group'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">
            ${qualification.rate.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">per hour</div>
        </div>
      </div>
      
      {qualification.description && (
        <p className="text-gray-600 text-sm leading-relaxed">
          {qualification.description}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Private Qualifications */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Private Qualifications</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {privateQualifications.map((qualification) => (
            <QualificationCard key={qualification.id} qualification={qualification} />
          ))}
        </div>
        
        {privateQualifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📚</div>
            <p>No private qualifications added yet</p>
          </div>
        )}
      </div>

      {/* Group Qualifications */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600">👥</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Group Qualifications</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupQualifications.map((qualification) => (
            <QualificationCard key={qualification.id} qualification={qualification} />
          ))}
        </div>
        
        {groupQualifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">👥</div>
            <p>No group qualifications added yet</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Qualification Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{privateQualifications.length}</div>
            <div className="text-sm text-gray-600">Private Sessions</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{groupQualifications.length}</div>
            <div className="text-sm text-gray-600">Group Sessions</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${(qualifications.reduce((sum, q) => sum + q.rate, 0) / qualifications.length).toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Avg. Rate/Hour</div>
          </div>
        </div>
      </div>
    </div>
  );
}
