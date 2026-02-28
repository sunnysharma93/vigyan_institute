import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: "Physics Coaching",
      icon: "⚛️",
      description: "Comprehensive physics coaching for Class 9-12, JEE, and NEET with practical demonstrations and problem-solving techniques.",
      duration: "6 months",
      level: "Intermediate to Advanced",
      price: "₹4,999/month"
    },
    {
      id: 2,
      title: "Mathematics Coaching",
      icon: "🔢",
      description: "Expert mathematics coaching covering algebra, calculus, geometry, and advanced topics for competitive exams.",
      duration: "6 months",
      level: "Beginner to Advanced",
      price: "₹4,499/month"
    },
    {
      id: 3,
      title: "Chemistry Coaching",
      icon: "🧪",
      description: "In-depth chemistry coaching including organic, inorganic, and physical chemistry with lab sessions.",
      duration: "6 months",
      level: "Intermediate to Advanced",
      price: "₹4,799/month"
    },
    {
      id: 4,
      title: "Biology Coaching",
      icon: "🧬",
      description: "Complete biology coaching for NEET and board exams with detailed diagrams and practical knowledge.",
      duration: "6 months",
      level: "Intermediate to Advanced",
      price: "₹4,699/month"
    },
    {
      id: 5,
      title: "Computer Science",
      icon: "💻",
      description: "Programming and computer science coaching covering Python, Java, data structures, and algorithms.",
      duration: "4 months",
      level: "Beginner to Advanced",
      price: "₹5,499/month"
    },
    {
      id: 6,
      title: "English Communication",
      icon: "📖",
      description: "English language coaching focusing on grammar, vocabulary, writing skills, and communication.",
      duration: "3 months",
      level: "Beginner to Intermediate",
      price: "₹3,999/month"
    },
    {
      id: 7,
      title: "JEE Preparation",
      icon: "🎯",
      description: "Intensive JEE Main and Advanced coaching with mock tests, problem-solving strategies, and time management.",
      duration: "12 months",
      level: "Advanced",
      price: "₹7,999/month"
    },
    {
      id: 8,
      title: "NEET Preparation",
      icon: "🏥",
      description: "Comprehensive NEET coaching covering Physics, Chemistry, and Biology with regular assessments.",
      duration: "12 months",
      level: "Advanced",
      price: "₹7,499/month"
    },
    {
      id: 9,
      title: "Foundation Course",
      icon: "🏗️",
      description: "Foundation course for Class 9-10 students building strong fundamentals for future competitive exams.",
      duration: "8 months",
      level: "Beginner",
      price: "₹3,499/month"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our Coaching Services
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto">
              Comprehensive coaching programs for Science, Math, and Competitive Exams
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Course Categories */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Popular Coaching Courses
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of coaching programs designed to help you excel in academics and competitive exams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-4 sm:p-6">
                  {/* Course Header */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xl sm:text-2xl">{course.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{course.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{course.level}</p>
                    </div>
                  </div>
                  
                  {/* Course Description */}
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                  
                  {/* Course Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-700">{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">Level:</span>
                      <span className="font-medium text-gray-700">{course.level}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-bold text-blue-600">{course.price}</span>
                    </div>
                  </div>
                  
                  {/* Enroll Button */}
                  <Link 
                    to="/contact"
                    className="block w-full bg-blue-600 text-white text-center py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
              Why Choose Our Coaching Services?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">👨‍🏫</span>
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Expert Faculty</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Experienced teachers with proven track records</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">📚</span>
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Study Materials</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Comprehensive notes and practice materials</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Regular Tests</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Weekly assessments and mock exams</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">🏆</span>
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Proven Results</h3>
                <p className="text-gray-600 text-xs sm:text-sm">95% success rate in competitive exams</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Get in touch with our counselors to find the perfect course for your needs and goals
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-sm sm:text-base"
          >
            Contact Counselor
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Services;
