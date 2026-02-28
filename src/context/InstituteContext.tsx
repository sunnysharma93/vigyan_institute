import React, { createContext, useContext, ReactNode } from 'react';

// TypeScript interfaces for institute data
interface Address {
  mainCampus: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
  };
  branchOffice: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
  };
}

interface ContactInfo {
  phone: {
    mainCampus: string;
    branchOffice: string;
    admissions: string;
  };
  email: {
    info: string;
    admissions: string;
    support: string;
  };
  officeHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  level: string;
  subjects: string[];
  batchTimings: string[];
  features: string[];
}

interface Faculty {
  id: number;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  image: string;
  specialization: string[];
}

interface InstituteInfo {
  name: string;
  tagline: string;
  description: string;
  founded: number;
  location: string;
  address: Address;
  contact: ContactInfo;
  googleReviews: {
    rating: number;
    totalReviews: number;
    url: string;
  };
  reviews: Review[];
  courses: Course[];
  faculty: Faculty[];
  statistics: {
    studentsTaught: string;
    successRate: string;
    programs: string;
    facultyMembers: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

// Context interface
interface InstituteContextType {
  instituteInfo: InstituteInfo;
  getFullAddress: (type: 'main' | 'branch') => string;
  getPhoneNumber: (type: 'main' | 'branch' | 'admissions') => string;
  getEmail: (type: 'info' | 'admissions' | 'support') => string;
  getOfficeHours: () => string;
  getAverageRating: () => number;
  getTotalReviews: () => number;
}

// Create context
const InstituteContext = createContext<InstituteContextType | undefined>(undefined);

// Institute data
const instituteData: InstituteInfo = {
  name: 'Vigyan Institute',
  tagline: 'Shaping Future with Quality Education - Palla, Faridabad',
  description: 'Premier coaching institute providing quality education for JEE, NEET, and board exams. We are committed to shaping the future of our students with experienced faculty, personalized attention, and comprehensive study programs.',
  founded: 2010,
  location: 'Palla, Faridabad',
  address: {
    mainCampus: {
      street: 'Near Palla Chowk',
      area: 'Palla',
      city: 'Faridabad',
      state: 'Haryana',
      pincode: '121004',
      landmark: 'Opposite Palla Government School'
    },
    branchOffice: {
      street: 'Sector 15',
      area: 'Faridabad',
      city: 'Faridabad',
      state: 'Haryana',
      pincode: '121007',
      landmark: 'Near Delhi-Mathura Road'
    }
  },
  contact: {
    phone: {
      mainCampus: '+91 12345 67890',
      branchOffice: '+91 09876 54321',
      admissions: '+91 11223 44556'
    },
    email: {
      info: 'info@vigyaninstitute.edu',
      admissions: 'admissions@vigyaninstitute.edu',
      support: 'support@vigyaninstitute.edu'
    },
    officeHours: {
      weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
      saturday: 'Saturday: 9:00 AM - 2:00 PM',
      sunday: 'Sunday: Closed'
    }
  },
  googleReviews: {
    rating: 5.0,
    totalReviews: 5,
    url: 'https://www.google.com/search?q=vigyan+institute+faridabad'
  },
  reviews: [
    {
      id: 1,
      author: 'Rahul Kumar',
      rating: 5,
      comment: 'Excellent faculty and great learning environment! The personalized attention helped me crack JEE Advanced.',
      date: '2024-01-15'
    },
    {
      id: 2,
      author: 'Priya Sharma',
      rating: 5,
      comment: 'Best institute for NEET preparation in Palla. The regular tests and doubt sessions are very helpful.',
      date: '2024-01-10'
    },
    {
      id: 3,
      author: 'Amit Patel',
      rating: 5,
      comment: 'Small batch sizes ensure personal attention. Teachers are always available for doubt clearing.',
      date: '2024-01-05'
    },
    {
      id: 4,
      author: 'Neha Gupta',
      rating: 5,
      comment: 'Comprehensive study material and regular mock tests prepared me well for board exams.',
      date: '2023-12-28'
    },
    {
      id: 5,
      author: 'Vikram Singh',
      rating: 5,
      comment: 'Outstanding results in JEE and NEET. The faculty really cares about student success.',
      date: '2023-12-20'
    }
  ],
  courses: [
    {
      id: 1,
      name: 'JEE Main + Advanced',
      description: 'Comprehensive preparation for JEE Main and Advanced exams with experienced faculty.',
      duration: '1 Year',
      price: '₹85,000',
      level: 'Class 11-12',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      batchTimings: ['Morning 6:00-8:00', 'Evening 4:00-6:00', 'Weekend 9:00-1:00'],
      features: ['Daily Classes', 'Weekly Tests', 'Doubt Sessions', 'Study Material', 'Mock Tests']
    },
    {
      id: 2,
      name: 'NEET Medical',
      description: 'Complete NEET preparation with focus on Biology, Physics, and Chemistry.',
      duration: '1 Year',
      price: '₹75,000',
      level: 'Class 11-12',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      batchTimings: ['Morning 7:00-9:00', 'Evening 5:00-7:00', 'Weekend 10:00-2:00'],
      features: ['Daily Classes', 'Weekly Tests', 'Biology Focus', 'Study Material', 'Mock Tests']
    },
    {
      id: 3,
      name: 'Foundation Course (Class 9-10)',
      description: 'Strong foundation building for competitive exams from early stages.',
      duration: '1 Year',
      price: '₹45,000',
      level: 'Class 9-10',
      subjects: ['Science', 'Mathematics', 'English'],
      batchTimings: ['Evening 4:00-6:00', 'Weekend 8:00-12:00'],
      features: ['Concept Building', 'Regular Tests', 'Study Material', 'Parent Meetings']
    },
    {
      id: 4,
      name: 'Board Exam Preparation',
      description: 'Focused preparation for CBSE Board exams with subject specialists.',
      duration: '6 Months',
      price: '₹35,000',
      level: 'Class 10-12',
      subjects: ['All Subjects'],
      batchTimings: ['Flexible Timing Available'],
      features: ['Subject Specialists', 'Paper Practice', 'Time Management', 'Revision Sessions']
    }
  ],
  faculty: [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      subject: 'Physics',
      qualification: 'Ph.D. in Physics',
      experience: '15+ years',
      image: '/faculty/physics-teacher.jpg',
      specialization: ['JEE Physics', 'NEET Physics', 'Mechanics']
    },
    {
      id: 2,
      name: 'Prof. Anita Sharma',
      subject: 'Chemistry',
      qualification: 'M.Sc. Chemistry',
      experience: '12+ years',
      image: '/faculty/chemistry-teacher.jpg',
      specialization: ['Organic Chemistry', 'NEET Chemistry', 'JEE Chemistry']
    },
    {
      id: 3,
      name: 'Dr. Vikram Singh',
      subject: 'Mathematics',
      qualification: 'M.Tech, Ph.D. Mathematics',
      experience: '18+ years',
      image: '/faculty/maths-teacher.jpg',
      specialization: ['JEE Mathematics', 'Calculus', 'Algebra']
    },
    {
      id: 4,
      name: 'Dr. Pooja Gupta',
      subject: 'Biology',
      qualification: 'M.D. Biology',
      experience: '10+ years',
      image: '/faculty/biology-teacher.jpg',
      specialization: ['NEET Biology', 'Human Anatomy', 'Botany']
    }
  ],
  statistics: {
    studentsTaught: '5000+',
    successRate: '95%',
    programs: '25+',
    facultyMembers: '50+'
  },
  socialMedia: {
    facebook: 'https://facebook.com/vigyaninstitute',
    instagram: 'https://instagram.com/vigyaninstitute',
    twitter: 'https://twitter.com/vigyaninstitute',
    linkedin: 'https://linkedin.com/company/vigyaninstitute',
    youtube: 'https://youtube.com/@vigyaninstitute'
  }
};

// Provider component
interface InstituteProviderProps {
  children: ReactNode;
}

export const InstituteProvider: React.FC<InstituteProviderProps> = ({ children }) => {
  // Helper functions
  const getFullAddress = (type: 'main' | 'branch'): string => {
    const address = type === 'main' ? instituteData.address.mainCampus : instituteData.address.branchOffice;
    return `${instituteData.name}\n${address.street}, ${address.area}\n${address.city}, ${address.state} - ${address.pincode}\n${address.landmark}`;
  };

  const getPhoneNumber = (type: 'main' | 'branch' | 'admissions'): string => {
    switch (type) {
      case 'main':
        return instituteData.contact.phone.mainCampus;
      case 'branch':
        return instituteData.contact.phone.branchOffice;
      case 'admissions':
        return instituteData.contact.phone.admissions;
      default:
        return instituteData.contact.phone.mainCampus;
    }
  };

  const getEmail = (type: 'info' | 'admissions' | 'support'): string => {
    switch (type) {
      case 'info':
        return instituteData.contact.email.info;
      case 'admissions':
        return instituteData.contact.email.admissions;
      case 'support':
        return instituteData.contact.email.support;
      default:
        return instituteData.contact.email.info;
    }
  };

  const getOfficeHours = (): string => {
    return `${instituteData.contact.officeHours.weekdays}\n${instituteData.contact.officeHours.saturday}\n${instituteData.contact.officeHours.sunday}`;
  };

  const getAverageRating = (): number => {
    const totalRating = instituteData.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / instituteData.reviews.length;
  };

  const getTotalReviews = (): number => {
    return instituteData.reviews.length;
  };

  const contextValue: InstituteContextType = {
    instituteInfo: instituteData,
    getFullAddress,
    getPhoneNumber,
    getEmail,
    getOfficeHours,
    getAverageRating,
    getTotalReviews
  };

  return (
    <InstituteContext.Provider value={contextValue}>
      {children}
    </InstituteContext.Provider>
  );
};

// Hook for using the context
export const useInstitute = (): InstituteContextType => {
  const context = useContext(InstituteContext);
  if (context === undefined) {
    throw new Error('useInstitute must be used within an InstituteProvider');
  }
  return context;
};

// Custom hooks for specific data
export const useInstituteInfo = (): InstituteInfo => {
  const { instituteInfo } = useInstitute();
  return instituteInfo;
};

export const useContactInfo = () => {
  const { getPhoneNumber, getEmail, getOfficeHours } = useInstitute();
  return { getPhoneNumber, getEmail, getOfficeHours };
};

export const useAddress = () => {
  const { getFullAddress } = useInstitute();
  return { getFullAddress };
};

export const useReviews = () => {
  const { instituteInfo, getAverageRating, getTotalReviews } = useInstitute();
  return {
    reviews: instituteInfo.reviews,
    googleReviews: instituteInfo.googleReviews,
    averageRating: getAverageRating(),
    totalReviews: getTotalReviews()
  };
};

export const useStatistics = () => {
  const { instituteInfo } = useInstitute();
  return instituteInfo.statistics;
};

export const useCourses = () => {
  const { instituteInfo } = useInstitute();
  return instituteInfo.courses;
};

export const useFaculty = () => {
  const { instituteInfo } = useInstitute();
  return instituteInfo.faculty;
};

export default InstituteContext;
