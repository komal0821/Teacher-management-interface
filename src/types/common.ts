// Common types for the TMS system

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  subjects: string[];
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
  gpa: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  parentContact: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: string;
  maxStudents: number;
  enrolledStudents: number;
  schedule: {
    days: string[];
    time: string;
    duration: number;
  };
  fee: number;
  status: 'active' | 'inactive' | 'completed';
}

export interface ScheduleEvent {
  id: string;
  title: string;
  type: 'class' | 'meeting' | 'exam' | 'event';
  date: string;
  startTime: string;
  endTime: string;
  instructor: string;
  course?: string;
  students?: string[];
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  description?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  type: 'tuition' | 'registration' | 'materials' | 'exam';
  status: 'pending' | 'paid' | 'overdue' | 'refunded';
  dueDate: string;
  paidDate?: string;
  method?: 'cash' | 'card' | 'bank_transfer' | 'online';
  description: string;
  invoiceNumber: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'academic' | 'financial' | 'attendance' | 'performance';
  generatedDate: string;
  period: string;
  data: any;
  summary: string;
  charts?: {
    type: 'bar' | 'line' | 'pie' | 'doughnut';
    data: any;
  }[];
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalRevenue: number;
  activeClasses: number;
  pendingPayments: number;
  recentActivities: {
    id: string;
    type: string;
    message: string;
    timestamp: string;
    user: string;
  }[];
}
