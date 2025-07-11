'use client';

import { useState } from 'react';
import { TeacherProfile, Qualification } from '@/types/teacher';

interface ClassicTeacherFormProps {
  teacher: TeacherProfile;
  onSave?: (teacher: TeacherProfile) => void;
  onCancel?: () => void;
}

export function ClassicTeacherForm({ teacher, onSave, onCancel }: ClassicTeacherFormProps) {
  const [editedTeacher, setEditedTeacher] = useState<TeacherProfile>(teacher);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    privateQualifications: true,
    groupQualifications: true
  });

  const handleSave = () => {
    onSave?.(editedTeacher);
    setIsEditing(false);
    alert('Teacher information saved successfully!');
  };

  const handleCancel = () => {
    setEditedTeacher(teacher);
    setIsEditing(false);
    onCancel?.();
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addQualification = (type: 'private' | 'group') => {
    const newQual: Qualification = {
      id: Date.now().toString(),
      name: `New ${type} qualification`,
      type,
      rate: 0,
      currency: 'USD',
      description: 'New qualification description'
    };
    setEditedTeacher(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, newQual]
    }));
  };

  const removeQualification = (id: string) => {
    setEditedTeacher(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q.id !== id)
    }));
  };

  const updateQualification = (id: string, field: keyof Qualification, value: string | number) => {
    setEditedTeacher(prev => ({
      ...prev,
      qualifications: prev.qualifications.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    }));
  };
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-red-500 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-medium">Teachers / {editedTeacher.name}</h1>
          {isEditing && <span className="text-sm bg-red-600 px-2 py-1 rounded">Editing</span>}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm font-medium transition-colors"
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm font-medium transition-colors"
          >
            {isEditing ? 'View' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Details Section */}
        <div className="bg-gray-50 rounded-lg">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b cursor-pointer" onClick={() => toggleSection('details')}>
            <h2 className="font-medium text-gray-800 flex items-center justify-between">
              Details
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }}
                  className="text-gray-600 hover:text-gray-800 p-1"
                  title="Edit"
                >
                  ✏️
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSection('details'); }}
                  className="text-gray-600 hover:text-gray-800 p-1"
                  title={expandedSections.details ? 'Collapse' : 'Expand'}
                >
                  {expandedSections.details ? '➖' : '➕'}
                </button>
              </div>
            </h2>
          </div>
          {expandedSections.details && (
            <div className="p-4 grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editedTeacher.name}
                    onChange={(e) => setEditedTeacher(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                  <input
                    type="date"
                    value=""
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                    readOnly={!isEditing}
                    placeholder="Not specified"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600 py-2 min-w-[50px]">Work</span>
                    <input
                      type="email"
                      value={editedTeacher.email}
                      onChange={(e) => setEditedTeacher(prev => ({ ...prev, email: e.target.value }))}
                      className={`flex-1 px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600 py-2 min-w-[50px]">Home</span>
                    <input
                      type="tel"
                      value={editedTeacher.phone}
                      onChange={(e) => setEditedTeacher(prev => ({ ...prev, phone: e.target.value }))}
                      className={`flex-1 px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Addresses</label>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600 py-2 min-w-[50px]">Home</span>
                    <textarea
                      value={`${editedTeacher.address.street}\n${editedTeacher.address.city}, ${editedTeacher.address.state}\n${editedTeacher.address.zipCode}`}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n');
                        const street = lines[0] || '';
                        const cityState = lines[1] || '';
                        const [city, state] = cityState.split(', ');
                        const zipCode = lines[2] || '';
                        setEditedTeacher(prev => ({
                          ...prev,
                          address: { street, city: city || '', state: state || '', zipCode }
                        }));
                      }}
                      className={`flex-1 px-3 py-2 border border-gray-300 rounded-md h-20 resize-none ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Private Qualifications Section */}
        <div className="bg-gray-50 rounded-lg">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b cursor-pointer" onClick={() => toggleSection('privateQualifications')}>
            <h2 className="font-medium text-gray-800 flex items-center justify-between">
              Private Qualifications
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); addQualification('private'); }}
                  className="text-gray-600 hover:text-gray-800 p-1"
                  title="Add Private Qualification"
                >
                  ➕
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSection('privateQualifications'); }}
                  className="text-gray-600 hover:text-gray-800 p-1"
                  title={expandedSections.privateQualifications ? 'Collapse' : 'Expand'}
                >
                  {expandedSections.privateQualifications ? '➖' : '➕'}
                </button>
              </div>
            </h2>
          </div>
          {expandedSections.privateQualifications && (
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm font-medium text-gray-700">Name</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">Rate ($/hr)</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700 w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {editedTeacher.qualifications
                    .filter(q => q.type === 'private')
                    .map((qual, index) => (
                      <tr key={qual.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={qual.name}
                            onChange={(e) => updateQualification(qual.id, 'name', e.target.value)}
                            className={`w-full px-2 py-1 border border-gray-300 rounded text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            readOnly={!isEditing}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={qual.rate}
                            onChange={(e) => updateQualification(qual.id, 'rate', parseFloat(e.target.value) || 0)}
                            className={`w-full px-2 py-1 border border-gray-300 rounded text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            readOnly={!isEditing}
                            step="0.01"
                            min="0"
                          />
                        </td>
                        <td className="py-2 px-2">
                          {isEditing && (
                            <button
                              onClick={() => removeQualification(qual.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Remove"
                            >
                              ❌
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  {editedTeacher.qualifications.filter(q => q.type === 'private').length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500 text-sm">
                        No private qualifications. Click + to add one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Group Qualifications Section */}
        <div className="bg-gray-50 rounded-lg">
          <div className="bg-gray-200 px-4 py-2 rounded-t-lg border-b cursor-pointer" onClick={() => toggleSection('groupQualifications')}>
            <h2 className="font-medium text-gray-800 flex items-center justify-between">
              Group Qualifications
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); addQualification('group'); }}
                  className="text-gray-600 hover:text-gray-800 p-1"
                  title="Add Group Qualification"
                >
                  ➕
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSection('groupQualifications'); }}
                  className="text-gray-600 hover:text-gray-800 p-1"
                  title={expandedSections.groupQualifications ? 'Collapse' : 'Expand'}
                >
                  {expandedSections.groupQualifications ? '➖' : '➕'}
                </button>
              </div>
            </h2>
          </div>
          {expandedSections.groupQualifications && (
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-sm font-medium text-gray-700">Name</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700">Rate ($/hr)</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-700 w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {editedTeacher.qualifications
                    .filter(q => q.type === 'group')
                    .map((qual, index) => (
                      <tr key={qual.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={qual.name}
                            onChange={(e) => updateQualification(qual.id, 'name', e.target.value)}
                            className={`w-full px-2 py-1 border border-gray-300 rounded text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            readOnly={!isEditing}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={qual.rate}
                            onChange={(e) => updateQualification(qual.id, 'rate', parseFloat(e.target.value) || 0)}
                            className={`w-full px-2 py-1 border border-gray-300 rounded text-sm ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                            readOnly={!isEditing}
                            step="0.01"
                            min="0"
                          />
                        </td>
                        <td className="py-2 px-2">
                          {isEditing && (
                            <button
                              onClick={() => removeQualification(qual.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Remove"
                            >
                              ❌
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  {editedTeacher.qualifications.filter(q => q.type === 'group').length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500 text-sm">
                        No group qualifications. Click + to add one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
