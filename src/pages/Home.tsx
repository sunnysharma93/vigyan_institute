import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useInstitute, useCourses, useReviews } from '../context/InstituteContext';

const Home: React.FC = () => {
  const { instituteInfo } = useInstitute();
  const courses = useCourses();
  const { reviews } = useReviews();

  return (
    <>
      <Helmet>
        <title>{instituteInfo.name} - {instituteInfo.tagline}</title>
        <meta name="description" content={instituteInfo.description} />
        <meta property="og:title" content={`${instituteInfo.name} - ${instituteInfo.tagline}`} />
        <meta property="og:description" content={instituteInfo.description} />
        <meta property="og:url" content="https://www.vigyaninstitute.edu/" />
        <meta property="twitter:title" content={`${instituteInfo.name} - ${instituteInfo.tagline}`} />
        <meta property="twitter:description" content={instituteInfo.description} />
        <link rel="canonical" href="https://www.vigyaninstitute.edu/" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto py-16 sm:py-20">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
                Shaping Future with Quality Education
              </h1>
              
              {/* Institute Name */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-600 mb-6">
                {instituteInfo.name}
              </div>
              
              {/* Address */}
              <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
                <span className="mr-2 mb-2 sm:mb-0">📍</span>
                <p className="text-center sm:text-left">
                  {instituteInfo.address.mainCampus.street}, {instituteInfo.address.mainCampus.area}, {instituteInfo.address.mainCampus.city} - {instituteInfo.address.mainCampus.pincode}
                </p>
              </div>
              
              {/* Google Reviews */}
              <div className="flex flex-col sm:flex-row items-center justify-center mb-8 sm:mb-12">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                  <div className="flex text-yellow-400 mr-2">
                    {'★'.repeat(5)}{'☆'.repeat(0)}
                  </div>
                  <span className="font-semibold text-gray-800 mr-1">{instituteInfo.googleReviews.rating}</span>
                  <span className="text-gray-600 text-sm">({instituteInfo.googleReviews.totalReviews} Google reviews)</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                {instituteInfo.description}
              </p>
              
              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/admission"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Enroll Now
                </Link>
                <a
                  href={`tel:${instituteInfo.contact.phone.admissions}`}
                  className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Overview Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
              Our Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                      <span className="text-sm text-gray-500">{course.duration}</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {course.subjects.slice(0, 2).map((subject, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {subject}
                          </span>
                        ))}
                        {course.subjects.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{course.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link 
                      to="/courses"
                      className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl sm:text-3xl">👨‍�</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Experienced Faculty</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Learn from highly qualified teachers with years of experience in competitive exam preparation
                </p>
              </div>
              <div className="text-center group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl sm:text-3xl">�</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Small Batch Size</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Personalized attention with small batch sizes ensuring better learning and doubt clearing
                </p>
              </div>
              <div className="text-center group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-purple-200 transition-colors">
                  <span className="text-2xl sm:text-3xl">📝</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Regular Tests</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Weekly tests and mock exams to track progress and improve exam performance
                </p>
              </div>
              <div className="text-center group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-orange-200 transition-colors">
                  <span className="text-2xl sm:text-3xl">🎯</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Personal Attention</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Individual focus on each student with regular parent-teacher meetings
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student Testimonials Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
              Student Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold text-lg">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.author}</h4>
                      <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{review.comment}"</p>
                  <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Map Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
              Visit Our Campus
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Main Campus - Palla</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">
                        {instituteInfo.address.mainCampus.street}, {instituteInfo.address.mainCampus.area}<br />
                        {instituteInfo.address.mainCampus.city}, {instituteInfo.address.mainCampus.state} - {instituteInfo.address.mainCampus.pincode}
                      </p>
                      <p className="text-gray-500 text-sm">{instituteInfo.address.mainCampus.landmark}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3">📞</span>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">{instituteInfo.contact.phone.mainCampus}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3">📧</span>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">{instituteInfo.contact.email.info}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3">🕐</span>
                    <div>
                      <p className="font-semibold text-gray-900">Office Hours</p>
                      <p className="text-gray-600 text-sm">{instituteInfo.contact.officeHours.weekdays}</p>
                      <p className="text-gray-600 text-sm">{instituteInfo.contact.officeHours.saturday}</p>
                      <p className="text-gray-600 text-sm">{instituteInfo.contact.officeHours.sunday}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(instituteInfo.address.mainCampus.street + ', ' + instituteInfo.address.mainCampus.area + ', ' + instituteInfo.address.mainCampus.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 sm:h-80 lg:h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl sm:text-5xl">🗺️</span>
                    <p className="text-gray-600 mt-4">Interactive Map</p>
                    <p className="text-sm text-gray-500 mt-2">Click "Get Directions" to view on Google Maps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 sm:p-12 lg:p-16 rounded-lg shadow-lg">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center">
                Our Achievements
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{instituteInfo.statistics.studentsTaught}</div>
                  <p className="text-blue-100 text-sm sm:text-base">Students Taught</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{instituteInfo.statistics.successRate}</div>
                  <p className="text-blue-100 text-sm sm:text-base">Success Rate</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{instituteInfo.statistics.programs}</div>
                  <p className="text-blue-100 text-sm sm:text-base">Programs</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{instituteInfo.statistics.facultyMembers}</div>
                  <p className="text-blue-100 text-sm sm:text-base">Faculty Members</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
