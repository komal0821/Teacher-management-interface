export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  profileImage?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Qualification {
  id: string;
  name: string;
  type: 'private' | 'group';
  rate: number;
  currency: string;
  description?: string;
}

export interface ScheduleSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  subject?: string;
  type: 'private' | 'group';
}

export interface TeacherProfile extends Teacher {
  qualifications: Qualification[];
  schedule: ScheduleSlot[];
  subjects: string[];
  experience: number;
  rating: number;
  totalStudents: number;
}

export type TabType = 'details' | 'qualifications' | 'schedule' | 'availability';

// Meeting Management
export interface TeacherMeeting {
  id: string;
  teacherId: string;
  teacherName: string;
  title: string;
  type: 'hr' | 'senior' | 'performance' | 'training' | 'disciplinary';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  attendees: string[];
  agenda: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: string;
}

// Leave Management
export interface TeacherLeave {
  id: string;
  teacherId: string;
  teacherName: string;
  type: 'sick' | 'vacation' | 'personal' | 'emergency' | 'maternity' | 'paternity' | 'training';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
  documents?: string[];
}

// Dashboard Analytics
export interface TeacherAnalytics {
  teacherId: string;
  teacherName: string;
  subjects: string[];
  totalStudents: number;
  totalClasses: number;
  averageRating: number;
  completedHours: number;
  upcomingClasses: number;
  monthlyEarnings: number;
}

export interface SubjectStats {
  subject: string;
  teacherCount: number;
  teachers: string[];
  totalStudents: number;
  averageRating: number;
}
