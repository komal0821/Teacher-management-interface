import { TeacherProfile, TeacherMeeting, TeacherLeave, TeacherAnalytics, SubjectStats } from '@/types/teacher';
import { Student, Course } from '@/types/common';

export const mockTeachers: TeacherProfile[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Oak Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701'
    },
    dateOfBirth: '1985-03-15',
    hireDate: '2020-08-15',
    department: 'Mathematics',
    position: 'Senior Teacher',
    salary: 65000,
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    qualifications: [
      {
        degree: 'Ph.D. in Mathematics',
        institution: 'Stanford University',
        year: 2010,
        type: 'doctorate'
      },
      {
        degree: 'M.S. in Applied Mathematics',
        institution: 'MIT',
        year: 2007,
        type: 'masters'
      }
    ],
    schedule: [
      {
        day: 'Monday',
        startTime: '09:00',
        endTime: '15:00',
        subject: 'Calculus',
        room: 'Room 101'
      },
      {
        day: 'Wednesday',
        startTime: '10:00',
        endTime: '14:00',
        subject: 'Algebra',
        room: 'Room 102'
      }
    ],
    subjects: ['Mathematics', 'Calculus', 'Algebra'],
    experience: 12,
    rating: 4.8,
    totalStudents: 85
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@school.edu',
    phone: '+1 (555) 234-5678',
    address: {
      street: '456 Pine Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62702'
    },
    dateOfBirth: '1978-11-22',
    hireDate: '2018-01-10',
    department: 'Physics',
    position: 'Department Head',
    salary: 75000,
    emergencyContact: {
      name: 'Lisa Chen',
      relationship: 'Wife',
      phone: '+1 (555) 876-5432'
    },
    qualifications: [
      {
        degree: 'Ph.D. in Theoretical Physics',
        institution: 'Harvard University',
        year: 2005,
        type: 'doctorate'
      }
    ],
    schedule: [
      {
        day: 'Tuesday',
        startTime: '08:00',
        endTime: '16:00',
        subject: 'Physics',
        room: 'Lab 201'
      }
    ],
    subjects: ['Physics', 'Quantum Mechanics', 'Thermodynamics'],
    experience: 15,
    rating: 4.9,
    totalStudents: 92
  },
  {
    id: '3',
    name: 'Ms. Emily Rodriguez',
    email: 'emily.rodriguez@school.edu',
    phone: '+1 (555) 345-6789',
    address: {
      street: '789 Maple Drive',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62703'
    },
    dateOfBirth: '1990-07-08',
    hireDate: '2022-09-01',
    department: 'English',
    position: 'Teacher',
    salary: 55000,
    emergencyContact: {
      name: 'Maria Rodriguez',
      relationship: 'Mother',
      phone: '+1 (555) 765-4321'
    },
    qualifications: [
      {
        degree: 'M.A. in English Literature',
        institution: 'University of Chicago',
        year: 2015,
        type: 'masters'
      },
      {
        degree: 'B.A. in English',
        institution: 'Northwestern University',
        year: 2012,
        type: 'bachelors'
      }
    ],
    schedule: [
      {
        day: 'Monday',
        startTime: '08:30',
        endTime: '15:30',
        subject: 'English Literature',
        room: 'Room 205'
      },
      {
        day: 'Thursday',
        startTime: '09:00',
        endTime: '14:00',
        subject: 'Creative Writing',
        room: 'Room 206'
      }
    ],
    subjects: ['English', 'Literature', 'Creative Writing'],
    experience: 8,
    rating: 4.6,
    totalStudents: 78
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    email: 'james.wilson@school.edu',
    phone: '+1 (555) 456-7890',
    address: {
      street: '321 Cedar Lane',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704'
    },
    dateOfBirth: '1982-12-03',
    hireDate: '2019-02-15',
    department: 'Chemistry',
    position: 'Senior Teacher',
    salary: 68000,
    emergencyContact: {
      name: 'Sarah Wilson',
      relationship: 'Sister',
      phone: '+1 (555) 654-3210'
    },
    qualifications: [
      {
        degree: 'Ph.D. in Organic Chemistry',
        institution: 'Caltech',
        year: 2008,
        type: 'doctorate'
      }
    ],
    schedule: [
      {
        day: 'Wednesday',
        startTime: '08:00',
        endTime: '16:00',
        subject: 'Chemistry',
        room: 'Lab 301'
      },
      {
        day: 'Friday',
        startTime: '10:00',
        endTime: '15:00',
        subject: 'Organic Chemistry',
        room: 'Lab 302'
      }
    ],
    subjects: ['Chemistry', 'Organic Chemistry', 'Biochemistry'],
    experience: 14,
    rating: 4.7,
    totalStudents: 89
  },
  {
    id: '5',
    name: 'Ms. Anna Thompson',
    email: 'anna.thompson@school.edu',
    phone: '+1 (555) 567-8901',
    address: {
      street: '654 Birch Street',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62705'
    },
    dateOfBirth: '1987-05-20',
    hireDate: '2021-08-20',
    department: 'Biology',
    position: 'Teacher',
    salary: 58000,
    emergencyContact: {
      name: 'Robert Thompson',
      relationship: 'Father',
      phone: '+1 (555) 543-2109'
    },
    qualifications: [
      {
        degree: 'M.S. in Biology',
        institution: 'University of Illinois',
        year: 2012,
        type: 'masters'
      },
      {
        degree: 'B.S. in Molecular Biology',
        institution: 'Purdue University',
        year: 2009,
        type: 'bachelors'
      }
    ],
    schedule: [
      {
        day: 'Tuesday',
        startTime: '09:00',
        endTime: '15:00',
        subject: 'Biology',
        room: 'Lab 401'
      },
      {
        day: 'Thursday',
        startTime: '08:30',
        endTime: '14:30',
        subject: 'Molecular Biology',
        room: 'Lab 402'
      }
    ],
    subjects: ['Biology', 'Molecular Biology', 'Genetics'],
    experience: 10,
    rating: 4.5,
    totalStudents: 73
  },
  {
    id: '6',
    name: 'Mr. David Kim',
    email: 'david.kim@school.edu',
    phone: '+1 (555) 678-9012',
    address: {
      street: '987 Elm Avenue',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62706'
    },
    dateOfBirth: '1984-09-14',
    hireDate: '2020-01-10',
    department: 'Computer Science',
    position: 'Senior Teacher',
    salary: 72000,
    emergencyContact: {
      name: 'Jennifer Kim',
      relationship: 'Wife',
      phone: '+1 (555) 432-1098'
    },
    qualifications: [
      {
        degree: 'M.S. in Computer Science',
        institution: 'Carnegie Mellon University',
        year: 2008,
        type: 'masters'
      },
      {
        degree: 'B.S. in Software Engineering',
        institution: 'UC Berkeley',
        year: 2006,
        type: 'bachelors'
      }
    ],
    schedule: [
      {
        day: 'Monday',
        startTime: '10:00',
        endTime: '16:00',
        subject: 'Programming',
        room: 'Computer Lab 1'
      },
      {
        day: 'Friday',
        startTime: '09:00',
        endTime: '15:00',
        subject: 'Data Structures',
        room: 'Computer Lab 2'
      }
    ],
    subjects: ['Computer Science', 'Programming', 'Data Structures', 'Algorithms'],
    experience: 13,
    rating: 4.8,
    totalStudents: 95
  },
  {
    id: '7',
    name: 'Dr. Lisa Martinez',
    email: 'lisa.martinez@school.edu',
    phone: '+1 (555) 789-0123',
    address: {
      street: '147 Willow Road',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62707'
    },
    dateOfBirth: '1981-04-12',
    hireDate: '2017-03-20',
    department: 'History',
    position: 'Department Head',
    salary: 70000,
    emergencyContact: {
      name: 'Carlos Martinez',
      relationship: 'Husband',
      phone: '+1 (555) 321-0987'
    },
    qualifications: [
      {
        degree: 'Ph.D. in American History',
        institution: 'Yale University',
        year: 2009,
        type: 'doctorate'
      }
    ],
    schedule: [
      {
        day: 'Monday',
        startTime: '11:00',
        endTime: '17:00',
        subject: 'American History',
        room: 'Room 301'
      },
      {
        day: 'Wednesday',
        startTime: '09:00',
        endTime: '15:00',
        subject: 'World History',
        room: 'Room 302'
      }
    ],
    subjects: ['History', 'American History', 'World History'],
    experience: 16,
    rating: 4.7,
    totalStudents: 82
  },
  {
    id: '8',
    name: 'Mr. Robert Taylor',
    email: 'robert.taylor@school.edu',
    phone: '+1 (555) 890-1234',
    address: {
      street: '258 Spruce Lane',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62708'
    },
    dateOfBirth: '1986-08-25',
    hireDate: '2021-01-15',
    department: 'Art',
    position: 'Teacher',
    salary: 52000,
    emergencyContact: {
      name: 'Michelle Taylor',
      relationship: 'Wife',
      phone: '+1 (555) 210-9876'
    },
    qualifications: [
      {
        degree: 'M.F.A. in Fine Arts',
        institution: 'Rhode Island School of Design',
        year: 2011,
        type: 'masters'
      },
      {
        degree: 'B.A. in Art',
        institution: 'Art Institute of Chicago',
        year: 2008,
        type: 'bachelors'
      }
    ],
    schedule: [
      {
        day: 'Tuesday',
        startTime: '10:00',
        endTime: '16:00',
        subject: 'Fine Arts',
        room: 'Art Studio 1'
      },
      {
        day: 'Thursday',
        startTime: '11:00',
        endTime: '17:00',
        subject: 'Digital Art',
        room: 'Art Studio 2'
      }
    ],
    subjects: ['Art', 'Fine Arts', 'Digital Art', 'Sculpture'],
    experience: 9,
    rating: 4.4,
    totalStudents: 65
  }
];

export const mockTeacherMeetings: TeacherMeeting[] = [
  {
    id: '1',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    title: 'Quarterly Performance Review',
    type: 'performance',
    date: '2024-02-15',
    startTime: '14:00',
    endTime: '15:00',
    location: 'Conference Room A',
    attendees: ['HR Manager', 'Dr. Sarah Johnson'],
    agenda: 'Review of teaching performance and student feedback for Q1',
    status: 'scheduled',
    priority: 'high',
    createdBy: 'HR Manager',
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    teacherId: '2',
    teacherName: 'Prof. Michael Chen',
    title: 'Department Budget Discussion',
    type: 'senior',
    date: '2024-02-20',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Principal Office',
    attendees: ['Principal', 'Prof. Michael Chen'],
    agenda: 'Planning budget allocation for Physics department equipment',
    status: 'completed',
    priority: 'medium',
    createdBy: 'Principal',
    createdAt: '2024-01-25T09:00:00Z'
  },
  {
    id: '3',
    teacherId: '3',
    teacherName: 'Ms. Emily Rodriguez',
    title: 'New Teacher Orientation Follow-up',
    description: 'Check-in meeting for new teacher integration',
    date: '2024-02-25',
    time: '15:30',
    duration: 45,
    meetingWith: 'HR Manager',
    location: 'HR Office',
    status: 'scheduled',
    priority: 'medium',
    createdAt: '2024-02-01T11:00:00Z'
  },
  {
    id: '4',
    teacherId: '4',
    teacherName: 'Dr. James Wilson',
    title: 'Lab Safety Protocol Review',
    description: 'Annual review of chemistry lab safety procedures',
    date: '2024-03-01',
    time: '09:00',
    duration: 120,
    meetingWith: 'Safety Officer',
    location: 'Chemistry Lab',
    status: 'scheduled',
    priority: 'high',
    createdAt: '2024-02-10T08:00:00Z'
  },
  {
    id: '5',
    teacherId: '5',
    teacherName: 'Ms. Anna Thompson',
    title: 'Curriculum Development Meeting',
    description: 'Discussion on new biology curriculum standards',
    date: '2024-03-05',
    time: '13:00',
    duration: 75,
    meetingWith: 'Curriculum Coordinator',
    location: 'Conference Room B',
    status: 'scheduled',
    priority: 'medium',
    createdAt: '2024-02-15T14:00:00Z'
  },
  {
    id: '6',
    teacherId: '6',
    teacherName: 'Mr. David Kim',
    title: 'Technology Integration Workshop',
    description: 'Planning workshop for integrating new programming tools',
    date: '2024-03-10',
    time: '16:00',
    duration: 60,
    meetingWith: 'IT Director',
    location: 'Computer Lab',
    status: 'scheduled',
    priority: 'low',
    createdAt: '2024-02-20T12:00:00Z'
  }
];

export const mockTeacherLeaves: TeacherLeave[] = [
  {
    id: '1',
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    type: 'sick',
    startDate: '2024-02-12',
    endDate: '2024-02-14',
    days: 3,
    reason: 'Flu symptoms and recovery',
    status: 'approved',
    appliedDate: '2024-02-10'
  },
  {
    id: '2',
    teacherId: '2',
    teacherName: 'Prof. Michael Chen',
    type: 'vacation',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    days: 8,
    reason: 'Family vacation to Europe',
    status: 'pending',
    appliedDate: '2024-02-01'
  },
  {
    id: '3',
    teacherId: '3',
    teacherName: 'Ms. Emily Rodriguez',
    type: 'personal',
    startDate: '2024-02-28',
    endDate: '2024-03-01',
    days: 2,
    reason: 'Personal family matter',
    status: 'pending',
    appliedDate: '2024-02-20'
  },
  {
    id: '4',
    teacherId: '4',
    teacherName: 'Dr. James Wilson',
    type: 'training',
    startDate: '2024-04-10',
    endDate: '2024-04-12',
    days: 3,
    reason: 'International Chemistry Conference',
    status: 'pending',
    appliedDate: '2024-01-15'
  },
  {
    id: '5',
    teacherId: '5',
    teacherName: 'Ms. Anna Thompson',
    type: 'sick',
    startDate: '2024-02-05',
    endDate: '2024-02-05',
    days: 1,
    reason: 'Medical appointment',
    status: 'rejected',
    appliedDate: '2024-02-03'
  },
  {
    id: '6',
    teacherId: '6',
    teacherName: 'Mr. David Lee',
    type: 'emergency',
    startDate: '2024-02-25',
    endDate: '2024-02-26',
    days: 2,
    reason: 'Family emergency',
    status: 'pending',
    appliedDate: '2024-02-24'
  },
  {
    id: '7',
    teacherId: '7',
    teacherName: 'Ms. Lisa Park',
    type: 'maternity',
    startDate: '2024-05-01',
    endDate: '2024-08-01',
    days: 92,
    reason: 'Maternity leave for newborn',
    status: 'pending',
    appliedDate: '2024-02-15'
  },
  {
    id: '8',
    teacherId: 'current-user',
    teacherName: 'Current User',
    type: 'vacation',
    startDate: '2024-03-10',
    endDate: '2024-03-12',
    days: 3,
    reason: 'Weekend getaway',
    status: 'approved',
    appliedDate: '2024-02-20'
  },
  {
    id: '2',
    teacherId: '2',
    teacherName: 'Prof. Michael Chen',
    leaveType: 'vacation',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    reason: 'Family vacation to Europe',
    status: 'pending',
    appliedDate: '2024-02-01',
    substituteTeacher: 'Dr. Alan Brown'
  },
  {
    id: '3',
    teacherId: '3',
    teacherName: 'Ms. Emily Rodriguez',
    leaveType: 'personal',
    startDate: '2024-02-28',
    endDate: '2024-03-01',
    reason: 'Personal family matter',
    status: 'approved',
    appliedDate: '2024-02-20',
    approvedBy: 'Principal',
    approvedDate: '2024-02-21T10:30:00Z',
    substituteTeacher: 'Mr. Tom Wilson'
  },
  {
    id: '4',
    teacherId: '4',
    teacherName: 'Dr. James Wilson',
    leaveType: 'conference',
    startDate: '2024-04-10',
    endDate: '2024-04-12',
    reason: 'International Chemistry Conference',
    status: 'approved',
    appliedDate: '2024-01-15',
    approvedBy: 'Principal',
    approvedDate: '2024-01-16T14:00:00Z',
    substituteTeacher: 'Dr. Lisa Park'
  },
  {
    id: '5',
    teacherId: '5',
    teacherName: 'Ms. Anna Thompson',
    leaveType: 'sick',
    startDate: '2024-02-05',
    endDate: '2024-02-05',
    reason: 'Medical appointment',
    status: 'rejected',
    appliedDate: '2024-02-04',
    approvedBy: 'HR Manager',
    approvedDate: '2024-02-04T16:00:00Z'
  }
];

export const mockTeacherAnalytics: TeacherAnalytics[] = [
  {
    teacherId: '1',
    teacherName: 'Dr. Sarah Johnson',
    subjects: ['Mathematics', 'Calculus', 'Algebra'],
    totalStudents: 85,
    totalClasses: 120,
    averageRating: 4.8,
    completedHours: 180,
    upcomingClasses: 25,
    monthlyEarnings: 5400
  },
  {
    teacherId: '2',
    teacherName: 'Prof. Michael Chen',
    subjects: ['Physics', 'Quantum Mechanics', 'Thermodynamics'],
    totalStudents: 92,
    totalClasses: 135,
    averageRating: 4.9,
    completedHours: 195,
    upcomingClasses: 28,
    monthlyEarnings: 6250
  },
  {
    teacherId: '3',
    teacherName: 'Ms. Emily Rodriguez',
    subjects: ['English', 'Literature', 'Creative Writing'],
    totalStudents: 78,
    totalClasses: 110,
    averageRating: 4.6,
    completedHours: 165,
    upcomingClasses: 22,
    monthlyEarnings: 4580
  },
  {
    teacherId: '4',
    teacherName: 'Dr. James Wilson',
    subjects: ['Chemistry', 'Organic Chemistry', 'Biochemistry'],
    totalStudents: 89,
    totalClasses: 125,
    averageRating: 4.7,
    completedHours: 175,
    upcomingClasses: 26,
    monthlyEarnings: 5670
  },
  {
    teacherId: '5',
    teacherName: 'Ms. Anna Thompson',
    subjects: ['Biology', 'Molecular Biology', 'Genetics'],
    totalStudents: 73,
    totalClasses: 105,
    averageRating: 4.5,
    completedHours: 158,
    upcomingClasses: 20,
    monthlyEarnings: 4830
  },
  {
    teacherId: '6',
    teacherName: 'Mr. David Kim',
    subjects: ['Computer Science', 'Programming', 'Data Structures', 'Algorithms'],
    totalStudents: 95,
    totalClasses: 140,
    averageRating: 4.8,
    completedHours: 200,
    upcomingClasses: 30,
    monthlyEarnings: 6000
  },
  {
    teacherId: '7',
    teacherName: 'Dr. Lisa Martinez',
    subjects: ['History', 'American History', 'World History'],
    totalStudents: 82,
    totalClasses: 115,
    averageRating: 4.7,
    completedHours: 172,
    upcomingClasses: 24,
    monthlyEarnings: 5830
  },
  {
    teacherId: '8',
    teacherName: 'Mr. Robert Taylor',
    subjects: ['Art', 'Fine Arts', 'Digital Art', 'Sculpture'],
    totalStudents: 65,
    totalClasses: 95,
    averageRating: 4.4,
    completedHours: 142,
    upcomingClasses: 18,
    monthlyEarnings: 4330
  }
];

export const mockSubjectStats: SubjectStats[] = [
  {
    subject: 'Mathematics',
    teacherCount: 1,
    teachers: ['Dr. Sarah Johnson'],
    totalStudents: 85,
    averageRating: 4.8
  },
  {
    subject: 'Physics',
    teacherCount: 1,
    teachers: ['Prof. Michael Chen'],
    totalStudents: 92,
    averageRating: 4.9
  },
  {
    subject: 'English',
    teacherCount: 1,
    teachers: ['Ms. Emily Rodriguez'],
    totalStudents: 78,
    averageRating: 4.6
  },
  {
    subject: 'Chemistry',
    teacherCount: 1,
    teachers: ['Dr. James Wilson'],
    totalStudents: 89,
    averageRating: 4.7
  },
  {
    subject: 'Biology',
    teacherCount: 1,
    teachers: ['Ms. Anna Thompson'],
    totalStudents: 73,
    averageRating: 4.5
  },
  {
    subject: 'Computer Science',
    teacherCount: 1,
    teachers: ['Mr. David Kim'],
    totalStudents: 95,
    averageRating: 4.8
  },
  {
    subject: 'History',
    teacherCount: 1,
    teachers: ['Dr. Lisa Martinez'],
    totalStudents: 82,
    averageRating: 4.7
  },
  {
    subject: 'Art',
    teacherCount: 1,
    teachers: ['Mr. Robert Taylor'],
    totalStudents: 65,
    averageRating: 4.4
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Advanced Calculus',
    code: 'MATH-401',
    description: 'Advanced mathematical concepts including differential and integral calculus',
    credits: 4,
    duration: '16 weeks',
    level: 'Advanced',
    prerequisites: ['Basic Calculus', 'Algebra II'],
    instructor: 'Dr. Sarah Johnson',
    schedule: 'Mon, Wed, Fri 9:00-10:30 AM',
    capacity: 30,
    enrolled: 28,
    status: 'active'
  },
  {
    id: '2',
    name: 'Quantum Physics',
    code: 'PHYS-501',
    description: 'Introduction to quantum mechanics and modern physics principles',
    credits: 4,
    duration: '16 weeks',
    level: 'Advanced',
    prerequisites: ['Classical Physics', 'Calculus'],
    instructor: 'Prof. Michael Chen',
    schedule: 'Tue, Thu 2:00-4:00 PM',
    capacity: 25,
    enrolled: 23,
    status: 'active'
  },
  {
    id: '3',
    name: 'Creative Writing Workshop',
    code: 'ENG-301',
    description: 'Hands-on workshop for developing creative writing skills',
    credits: 3,
    duration: '12 weeks',
    level: 'Intermediate',
    prerequisites: ['English Composition'],
    instructor: 'Ms. Emily Rodriguez',
    schedule: 'Mon, Wed 1:00-2:30 PM',
    capacity: 20,
    enrolled: 18,
    status: 'active'
  },
  {
    id: '4',
    name: 'Organic Chemistry Lab',
    code: 'CHEM-401L',
    description: 'Laboratory component for organic chemistry with hands-on experiments',
    credits: 2,
    duration: '16 weeks',
    level: 'Advanced',
    prerequisites: ['General Chemistry', 'Organic Chemistry Theory'],
    instructor: 'Dr. James Wilson',
    schedule: 'Wed 2:00-5:00 PM',
    capacity: 16,
    enrolled: 15,
    status: 'active'
  },
  {
    id: '5',
    name: 'Molecular Biology',
    code: 'BIO-401',
    description: 'Study of biological processes at the molecular level',
    credits: 4,
    duration: '16 weeks',
    level: 'Advanced',
    prerequisites: ['General Biology', 'Chemistry'],
    instructor: 'Ms. Anna Thompson',
    schedule: 'Tue, Thu 10:00-12:00 PM',
    capacity: 24,
    enrolled: 22,
    status: 'active'
  },
  {
    id: '6',
    name: 'Data Structures & Algorithms',
    code: 'CS-301',
    description: 'Fundamental data structures and algorithmic problem solving',
    credits: 4,
    duration: '16 weeks',
    level: 'Intermediate',
    prerequisites: ['Programming Fundamentals', 'Discrete Mathematics'],
    instructor: 'Mr. David Kim',
    schedule: 'Mon, Wed, Fri 11:00-12:00 PM',
    capacity: 35,
    enrolled: 32,
    status: 'active'
  },
  {
    id: '7',
    name: 'American History Survey',
    code: 'HIST-201',
    description: 'Comprehensive survey of American history from colonial times to present',
    credits: 3,
    duration: '16 weeks',
    level: 'Intermediate',
    prerequisites: ['World History'],
    instructor: 'Dr. Lisa Martinez',
    schedule: 'Tue, Thu 9:00-10:30 AM',
    capacity: 40,
    enrolled: 35,
    status: 'active'
  },
  {
    id: '8',
    name: 'Digital Art & Design',
    code: 'ART-301',
    description: 'Introduction to digital art creation using modern software tools',
    credits: 3,
    duration: '12 weeks',
    level: 'Intermediate',
    prerequisites: ['Basic Art Fundamentals'],
    instructor: 'Mr. Robert Taylor',
    schedule: 'Mon, Wed 3:00-5:00 PM',
    capacity: 18,
    enrolled: 16,
    status: 'active'
  }
];

export const mockStudents: Student[] = [];
