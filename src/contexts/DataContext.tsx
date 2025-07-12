'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TeacherProfile, TeacherMeeting, TeacherLeave, TeacherAnalytics, SubjectStats } from '@/types/teacher';
import { Course } from '@/types/common';
import { 
  mockTeachers, 
  mockTeacherMeetings, 
  mockTeacherLeaves, 
  mockTeacherAnalytics, 
  mockSubjectStats,
  mockCourses
} from '@/data/allMockData';

interface DataContextType {
  // Data
  teachers: TeacherProfile[];
  meetings: TeacherMeeting[];
  leaves: TeacherLeave[];
  analytics: TeacherAnalytics[];
  subjectStats: SubjectStats[];
  courses: Course[];
  
  // Teacher actions
  addTeacher: (teacher: Omit<TeacherProfile, 'id'>) => void;
  updateTeacher: (id: string, teacherData: Partial<Omit<TeacherProfile, 'id'>>) => void;
  deleteTeacher: (id: string) => void;
  
  // Meeting actions
  addMeeting: (meeting: Omit<TeacherMeeting, 'id'>) => void;
  updateMeeting: (meeting: TeacherMeeting) => void;
  deleteMeeting: (id: string) => void;
  
  // Leave actions
  addLeave: (leave: Omit<TeacherLeave, 'id'>) => void;
  updateLeave: (leave: TeacherLeave) => void;
  deleteLeave: (id: string) => void;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;
  
  // Course actions
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  
  // Utility functions
  refreshAnalytics: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper functions for localStorage with better SSR support
function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore localStorage errors in static export
    console.warn('localStorage not available');
  }
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [teachers, setTeachers] = useState<TeacherProfile[]>(mockTeachers);
  const [meetings, setMeetings] = useState<TeacherMeeting[]>(mockTeacherMeetings);
  const [leaves, setLeaves] = useState<TeacherLeave[]>(mockTeacherLeaves);
  const [analytics, setAnalytics] = useState<TeacherAnalytics[]>(mockTeacherAnalytics);
  const [subjectStats, setSubjectStats] = useState<SubjectStats[]>(mockSubjectStats);
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  // Initialize data after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // For static export, always use mock data initially
    if (typeof window !== 'undefined') {
      setTeachers(getStoredData('tms_teachers', mockTeachers));
      setMeetings(getStoredData('tms_meetings', mockTeacherMeetings));
      setLeaves(getStoredData('tms_leaves', mockTeacherLeaves));
      setAnalytics(getStoredData('tms_analytics', mockTeacherAnalytics));
      setSubjectStats(getStoredData('tms_subjectStats', mockSubjectStats));
      setCourses(getStoredData('tms_courses', mockCourses));
    }
  }, []);

  // Save to localStorage whenever data changes (only after mount)
  useEffect(() => {
    if (mounted) {
      setStoredData('tms_teachers', teachers);
    }
  }, [teachers, mounted]);

  useEffect(() => {
    if (mounted) {
      setStoredData('tms_meetings', meetings);
    }
  }, [meetings, mounted]);

  useEffect(() => {
    if (mounted) {
      setStoredData('tms_leaves', leaves);
    }
  }, [leaves, mounted]);

  useEffect(() => {
    if (mounted) {
      setStoredData('tms_analytics', analytics);
    }
  }, [analytics, mounted]);

  useEffect(() => {
    if (mounted) {
      setStoredData('tms_subjectStats', subjectStats);
    }
  }, [subjectStats, mounted]);

  useEffect(() => {
    if (mounted) {
      setStoredData('tms_courses', courses);
    }
  }, [courses, mounted]);

  // Generate unique ID
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  // Teacher actions
  const addTeacher = (teacherData: Omit<TeacherProfile, 'id'>) => {
    const newTeacher: TeacherProfile = {
      ...teacherData,
      id: generateId(),
    };
    setTeachers(prev => [...prev, newTeacher]);
    refreshAnalytics();
  };

  const updateTeacher = (id: string, teacherData: Partial<Omit<TeacherProfile, 'id'>>) => {
    setTeachers(prev => prev.map(t => 
      t.id === id ? { ...t, ...teacherData } : t
    ));
    refreshAnalytics();
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
    // Also remove related meetings and leaves
    setMeetings(prev => prev.filter(m => m.teacherId !== id));
    setLeaves(prev => prev.filter(l => l.teacherId !== id));
    refreshAnalytics();
  };

  // Meeting actions
  const addMeeting = (meetingData: Omit<TeacherMeeting, 'id'>) => {
    const newMeeting: TeacherMeeting = {
      ...meetingData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setMeetings(prev => [...prev, newMeeting]);
  };

  const updateMeeting = (updatedMeeting: TeacherMeeting) => {
    setMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
  };

  const deleteMeeting = (id: string) => {
    setMeetings(prev => prev.filter(m => m.id !== id));
  };

  // Leave actions
  const addLeave = (leaveData: Omit<TeacherLeave, 'id'>) => {
    const newLeave: TeacherLeave = {
      ...leaveData,
      id: generateId(),
      appliedDate: leaveData.appliedDate || new Date().toISOString().split('T')[0],
    };
    setLeaves(prev => [...prev, newLeave]);
  };

  const updateLeave = (updatedLeave: TeacherLeave) => {
    setLeaves(prev => prev.map(l => l.id === updatedLeave.id ? updatedLeave : l));
  };

  const deleteLeave = (id: string) => {
    setLeaves(prev => prev.filter(l => l.id !== id));
  };

  const approveLeave = (id: string) => {
    setLeaves(prev => prev.map(l => 
      l.id === id 
        ? { ...l, status: 'approved', approvedBy: 'HR Manager', approvedDate: new Date().toISOString() }
        : l
    ));
  };

  const rejectLeave = (id: string) => {
    setLeaves(prev => prev.map(l => 
      l.id === id 
        ? { ...l, status: 'rejected', approvedBy: 'HR Manager', approvedDate: new Date().toISOString() }
        : l
    ));
  };

  // Course actions
  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: generateId(),
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Refresh analytics based on current data
  const refreshAnalytics = () => {
    const updatedAnalytics = teachers.map(teacher => {
      return {
        teacherId: teacher.id,
        teacherName: teacher.name,
        subjects: teacher.subjects,
        totalStudents: Math.floor(Math.random() * 50) + 20, // Mock data
        totalClasses: Math.floor(Math.random() * 150) + 50, // Mock data
        averageRating: teacher.rating,
        completedHours: Math.floor(Math.random() * 200) + 100, // Mock data
        upcomingClasses: Math.floor(Math.random() * 30) + 10, // Mock data
        monthlyEarnings: Math.floor(Math.random() * 3000) + 3000, // Mock data
      };
    });
    setAnalytics(updatedAnalytics);

    // Update subject stats
    const subjectMap = new Map<string, { teachers: string[], ratings: number[] }>();
    
    teachers.forEach(teacher => {
      teacher.subjects.forEach(subject => {
        if (!subjectMap.has(subject)) {
          subjectMap.set(subject, { teachers: [], ratings: [] });
        }
        const subjectData = subjectMap.get(subject)!;
        subjectData.teachers.push(teacher.name);
        subjectData.ratings.push(teacher.rating);
      });
    });

    const updatedSubjectStats = Array.from(subjectMap.entries()).map(([subject, data]) => ({
      subject,
      teacherCount: data.teachers.length,
      teachers: data.teachers,
      totalStudents: Math.floor(Math.random() * 100) + 50, // Mock data
      averageRating: data.ratings.reduce((sum, rating) => sum + rating, 0) / data.ratings.length,
    }));

    setSubjectStats(updatedSubjectStats);
  };

  // Refresh analytics when teachers change
  useEffect(() => {
    refreshAnalytics();
  }, [teachers.length]);

  const value: DataContextType = {
    teachers,
    meetings,
    leaves,
    analytics,
    subjectStats,
    courses,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    addLeave,
    updateLeave,
    deleteLeave,
    approveLeave,
    rejectLeave,
    addCourse,
    updateCourse,
    deleteCourse,
    refreshAnalytics,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
