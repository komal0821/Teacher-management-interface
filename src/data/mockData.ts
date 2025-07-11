import { TeacherProfile } from '@/types/teacher';

export const mockTeachers: TeacherProfile[] = [
  {
    id: '1',
    name: 'Alynia Allan',
    email: 'alyniaallan@example.com',
    phone: '+1234 567 8901',
    address: {
      street: '56 Oakwood Dr Sunrise Cir',
      city: 'Phoenix',
      state: 'Arizona',
      zipCode: '85001'
    },
    status: 'active',
    experience: 8,
    rating: 4.8,
    totalStudents: 156,
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    qualifications: [
      {
        id: '1',
        name: 'Mathematics Proficiency',
        type: 'private',
        rate: 45.00,
        currency: 'USD',
        description: 'Advanced mathematics tutoring for high school and college students'
      },
      {
        id: '2',
        name: 'Physics Core',
        type: 'private',
        rate: 50.00,
        currency: 'USD',
        description: 'Comprehensive physics education covering mechanics, thermodynamics, and electromagnetism'
      },
      {
        id: '3',
        name: 'Chemistry Basics',
        type: 'private',
        rate: 42.00,
        currency: 'USD',
        description: 'Fundamental chemistry concepts and laboratory techniques'
      },
      {
        id: '4',
        name: 'Science Group',
        type: 'group',
        rate: 25.00,
        currency: 'USD',
        description: 'Group sessions for general science topics'
      }
    ],
    schedule: [
      { id: '1', day: 'Monday', startTime: '09:00', endTime: '12:00', isAvailable: true, subject: 'Mathematics', type: 'private' },
      { id: '2', day: 'Monday', startTime: '14:00', endTime: '16:00', isAvailable: true, subject: 'Physics', type: 'group' },
      { id: '3', day: 'Tuesday', startTime: '10:00', endTime: '12:00', isAvailable: true, subject: 'Chemistry', type: 'private' },
      { id: '4', day: 'Wednesday', startTime: '09:00', endTime: '11:00', isAvailable: true, subject: 'Mathematics', type: 'private' },
      { id: '5', day: 'Wednesday', startTime: '15:00', endTime: '17:00', isAvailable: false, subject: 'Physics', type: 'group' },
      { id: '6', day: 'Thursday', startTime: '10:00', endTime: '12:00', isAvailable: true, subject: 'Chemistry', type: 'private' },
      { id: '7', day: 'Friday', startTime: '09:00', endTime: '11:00', isAvailable: true, subject: 'Mathematics', type: 'group' },
      { id: '8', day: 'Friday', startTime: '14:00', endTime: '16:00', isAvailable: true, subject: 'Physics', type: 'private' },
    ]
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1555 123 4567',
    address: {
      street: '123 Academic Lane',
      city: 'Boston',
      state: 'Massachusetts',
      zipCode: '02101'
    },
    status: 'active',
    experience: 12,
    rating: 4.9,
    totalStudents: 234,
    subjects: ['English Literature', 'Creative Writing', 'History'],
    qualifications: [
      {
        id: '5',
        name: 'English Literature Advanced',
        type: 'private',
        rate: 55.00,
        currency: 'USD',
        description: 'Advanced literature analysis and critical thinking for college-level students'
      },
      {
        id: '6',
        name: 'Creative Writing Workshop',
        type: 'group',
        rate: 35.00,
        currency: 'USD',
        description: 'Interactive creative writing sessions for aspiring writers'
      },
      {
        id: '7',
        name: 'History Fundamentals',
        type: 'private',
        rate: 48.00,
        currency: 'USD',
        description: 'Comprehensive world history and critical analysis'
      }
    ],
    schedule: [
      { id: '9', day: 'Monday', startTime: '10:00', endTime: '12:00', isAvailable: true, subject: 'English Literature', type: 'private' },
      { id: '10', day: 'Tuesday', startTime: '14:00', endTime: '16:00', isAvailable: true, subject: 'Creative Writing', type: 'group' },
      { id: '11', day: 'Wednesday', startTime: '09:00', endTime: '11:00', isAvailable: true, subject: 'History', type: 'private' },
      { id: '12', day: 'Thursday', startTime: '15:00', endTime: '17:00', isAvailable: true, subject: 'English Literature', type: 'group' },
      { id: '13', day: 'Friday', startTime: '10:00', endTime: '12:00', isAvailable: false, subject: 'Creative Writing', type: 'private' },
    ]
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1777 888 9999',
    address: {
      street: '789 Tech Boulevard',
      city: 'San Francisco',
      state: 'California',
      zipCode: '94105'
    },
    status: 'active',
    experience: 6,
    rating: 4.7,
    totalStudents: 89,
    subjects: ['Computer Science', 'Programming', 'Web Development'],
    qualifications: [
      {
        id: '8',
        name: 'Python Programming',
        type: 'private',
        rate: 60.00,
        currency: 'USD',
        description: 'Complete Python programming from basics to advanced concepts'
      },
      {
        id: '9',
        name: 'Web Development Bootcamp',
        type: 'group',
        rate: 40.00,
        currency: 'USD',
        description: 'Full-stack web development using modern frameworks'
      },
      {
        id: '10',
        name: 'Data Structures & Algorithms',
        type: 'private',
        rate: 65.00,
        currency: 'USD',
        description: 'Advanced computer science concepts for technical interviews'
      }
    ],
    schedule: [
      { id: '14', day: 'Monday', startTime: '13:00', endTime: '15:00', isAvailable: true, subject: 'Python Programming', type: 'private' },
      { id: '15', day: 'Tuesday', startTime: '09:00', endTime: '12:00', isAvailable: true, subject: 'Web Development', type: 'group' },
      { id: '16', day: 'Wednesday', startTime: '14:00', endTime: '16:00', isAvailable: true, subject: 'Data Structures', type: 'private' },
      { id: '17', day: 'Thursday', startTime: '10:00', endTime: '12:00', isAvailable: false, subject: 'Programming', type: 'group' },
      { id: '18', day: 'Friday', startTime: '13:00', endTime: '15:00', isAvailable: true, subject: 'Python Programming', type: 'private' },
      { id: '19', day: 'Saturday', startTime: '09:00', endTime: '11:00', isAvailable: true, subject: 'Web Development', type: 'group' },
    ]
  }
];

// Helper function to get teacher by ID
export const getTeacherById = (id: string): TeacherProfile | undefined => {
  return mockTeachers.find(teacher => teacher.id === id);
};

// Helper function to get all active teachers
export const getActiveTeachers = (): TeacherProfile[] => {
  return mockTeachers.filter(teacher => teacher.status === 'active');
};

// Default teacher for initial load
export const defaultTeacher = mockTeachers[0];
