import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInstituteInfo, useCourses, useReviews } from '../context/InstituteContext';
import SEO from '../components/SEO';

const Landing: React.FC = () => {
  const instituteInfo = useInstituteInfo();
  const courses = useCourses();
  const { reviews } = useReviews();
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enrollment form submitted:', formData);
    alert('Thank you for your enrollment request! We will contact you within 24 hours.');
  };

  return (
    <>
      <SEO
        title="Vigyan Institute Palla Faridabad | #1 Coaching Institute | 95% Success Rate"
        description="Join Palla Faridabad's premier coaching institute. 5000+ successful students, expert faculty, small batches. JEE, NEET & Board exam preparation. Limited seats available!"
        keywords="best coaching institute Palla Faridabad, JEE coaching Faridabad, NEET preparation Palla, science coaching, board exam coaching, Vigyan Institute"
        canonical="https://www.vigyaninstitutepalla.com/landing"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="mr-2">🏆</span>
                  #1 Coaching Institute in Palla Faridabad
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Transform Your Child's
                  <span className="text-yellow-400 block">Future with Excellence</span>
                </h1>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Join 5000+ successful students who cracked JEE, NEET & Board exams with our proven teaching methodology and expert guidance.
                </p>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {'★'.repeat(5)}
                    </div>
                    <span className="font-semibold">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">👥</span>
                    <span className="font-semibold">5000+ Students</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🎯</span>
                    <span className="font-semibold">95% Success Rate</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-xl">
                    🚀 Enroll Now - Limited Seats
                  </button>
                  <a
                    href={`tel:${instituteInfo.contact.phone.admissions}`}
                    className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    📞 Call: +91 98765 43210
                  </a>
                </div>
                
                <p className="mt-4 text-yellow-400 font-semibold animate-pulse">
                  ⚡ Only 15 seats left for upcoming batch!
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎓</div>
                    <h3 className="text-2xl font-bold mb-2">Start Your Journey</h3>
                    <p className="text-blue-100 mb-6">Join the best coaching institute in Palla Faridabad</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-yellow-400">5000+</div>
                        <div className="text-xs">Students</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-yellow-400">95%</div>
                        <div className="text-xs">Success Rate</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-yellow-400">15+</div>
                        <div className="text-xs">Years Experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Achievements Section */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our <span className="text-blue-600">Achievements</span> Speak Volumes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Results that make us the most trusted coaching institute in Palla Faridabad
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">5000+</div>
                <div className="text-gray-600 font-semibold">Students Taught</div>
                <div className="text-sm text-gray-500 mt-2">Successfully mentored</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-gray-600 font-semibold">Success Rate</div>
                <div className="text-sm text-gray-500 mt-2">Consistent results</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🏫</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">25+</div>
                <div className="text-gray-600 font-semibold">Expert Faculty</div>
                <div className="text-sm text-gray-500 mt-2">Highly qualified</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⭐</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="text-gray-600 font-semibold">Google Rating</div>
                <div className="text-sm text-gray-500 mt-2">Based on 200+ reviews</div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Details Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Choose Your <span className="text-blue-600">Success Path</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive courses designed for maximum results with expert faculty
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses.map((course, index) => (
                <div key={course.id} className="relative group">
                  {index === 0 && (
                    <div className="absolute -top-4 -right-4 z-10">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                        🔥 Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-blue-500 group-hover:-translate-y-2">
                    <div className="p-8">
                      <div className="text-4xl mb-4">
                        {course.name.includes('JEE') && '🚀'}
                        {course.name.includes('NEET') && '⚕️'}
                        {course.name.includes('Foundation') && '🎯'}
                        {course.name.includes('Board') && '📚'}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{course.name}</h3>
                      <p className="text-gray-600 mb-6 text-sm">{course.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Expert Faculty</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Small Batch Size</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Regular Tests</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Doubt Sessions</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-3xl font-bold text-blue-600">{course.price}</div>
                          <div className="text-sm text-gray-500">{course.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">EMI Available</div>
                          <div className="text-sm font-semibold text-green-600">₹{Math.round(parseInt(course.price.replace(/[^\d]/g, '')) / 12)}/month</div>
                        </div>
                      </div>
                      
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Parent Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What <span className="text-blue-600">Parents</span> Say About Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from parents whose children achieved their dreams with Vigyan Institute
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.slice(0, 6).map((review) => (
                <div key={review.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.author}</h4>
                      <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(review.rating)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="mr-2">🎓</span>
                      <span>Parent of {review.author}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{review.date}</span>
                    <div className="flex items-center text-green-600 font-semibold">
                      <span className="mr-1">✓</span>
                      <span>Verified Parent</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enroll Now Form Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Secure Your Child's <span className="text-yellow-400">Future Today</span>
                </h2>
                <p className="text-xl text-blue-100">
                  Limited seats available! Fill the form to reserve your spot
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Student Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition-colors"
                        placeholder="Enter student name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">Parent Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition-colors"
                        placeholder="Enter parent name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition-colors"
                        placeholder="Enter phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition-colors"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Interested Course *</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition-colors"
                    >
                      <option value="" className="text-gray-900">Select a course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id} className="text-gray-900">
                          {course.name} - {course.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:bg-white/30 transition-colors"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-yellow-400 text-gray-900 px-12 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                      🚀 Enroll Now - Save 20%
                    </button>
                    <p className="mt-4 text-yellow-400 text-sm">
                      ⚡ Only 15 seats left for upcoming batch!
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Visit Our <span className="text-blue-600">Campus</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Come and experience the best coaching environment in Palla Faridabad
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Address</h4>
                      <p className="text-gray-600">
                        {instituteInfo.address.mainCampus.street}<br />
                        {instituteInfo.address.mainCampus.area}, {instituteInfo.address.mainCampus.city}<br />
                        {instituteInfo.address.mainCampus.state} - {instituteInfo.address.mainCampus.pincode}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{instituteInfo.address.mainCampus.landmark}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Phone Numbers</h4>
                      <p className="text-gray-600">
                        Main: {instituteInfo.contact.phone.mainCampus}<br />
                        Admissions: {instituteInfo.contact.phone.admissions}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                      <p className="text-gray-600">{instituteInfo.contact.email.info}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">🗺️</span>
                  <p className="text-gray-600 mt-4">Interactive Map</p>
                  <p className="text-sm text-gray-500 mt-2">Click "Get Directions" to view on Google Maps</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(instituteInfo.address.mainCampus.street + ', ' + instituteInfo.address.mainCampus.area + ', ' + instituteInfo.address.mainCampus.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Don't Wait - <span className="text-white">Seats Are Filling Fast!</span>
            </h2>
            <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
              Join 5000+ successful students who chose Vigyan Institute for their bright future
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gray-900 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-xl">
                🚀 Enroll Now - Save 20%
              </button>
              <a
                href={`tel:${instituteInfo.contact.phone.admissions}`}
                className="bg-white text-gray-900 px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                📞 Call: +91 98765 43210
              </a>
            </div>
            <p className="mt-6 text-gray-800 font-semibold">
              ⚡ Only 15 seats left for upcoming batch!
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
