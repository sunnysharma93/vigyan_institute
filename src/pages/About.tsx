import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useInstitute } from '../context/InstituteContext';

const About: React.FC = () => {
  const { instituteInfo } = useInstitute();

  return (
    <>
      <Helmet>
        <title>About Us - {instituteInfo.name}</title>
        <meta name="description" content={`Learn about ${instituteInfo.name}, a premier coaching center in ${instituteInfo.location}. Our mission is to provide exceptional education with expert faculty and modern facilities since ${instituteInfo.founded}.`} />
        <meta property="og:title" content={`About Us - ${instituteInfo.name}`} />
        <meta property="og:description" content={`Learn about ${instituteInfo.name}, a premier coaching center in ${instituteInfo.location}. Our mission is to provide exceptional education with expert faculty and modern facilities since ${instituteInfo.founded}.`} />
        <meta property="og:url" content="https://www.vigyaninstitute.edu/about" />
        <meta property="twitter:title" content={`About Us - ${instituteInfo.name}`} />
        <meta property="twitter:description" content={`Learn about ${instituteInfo.name}, a premier coaching center in ${instituteInfo.location}. Our mission is to provide exceptional education with expert faculty and modern facilities since ${instituteInfo.founded}.`} />
        <link rel="canonical" href="https://www.vigyaninstitute.edu/about" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About {instituteInfo.name}
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                {instituteInfo.tagline}
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Institute Overview */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Who We Are
              </h2>
              <div className="text-center mb-8">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {instituteInfo.name} is a leading coaching center located in the heart of 
                  <span className="font-semibold text-blue-600"> {instituteInfo.location}</span>. 
                  We specialize in providing quality education and comprehensive coaching 
                  for students aspiring to excel in science and technology fields.
                </p>
              </div>
              
              {/* Address Details */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  Our Location
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium text-gray-800 mb-2">Main Campus</p>
                    <p className="text-gray-600">
                      {instituteInfo.address.mainCampus.street}<br />
                      {instituteInfo.address.mainCampus.area}<br />
                      {instituteInfo.address.mainCampus.city} - {instituteInfo.address.mainCampus.pincode}<br />
                      {instituteInfo.address.mainCampus.landmark}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-2">Branch Office</p>
                    <p className="text-gray-600">
                      {instituteInfo.address.branchOffice.street}<br />
                      {instituteInfo.address.branchOffice.area}<br />
                      {instituteInfo.address.branchOffice.city} - {instituteInfo.address.branchOffice.pincode}<br />
                      {instituteInfo.address.branchOffice.landmark}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* History Section */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Our History
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{instituteInfo.founded} - Foundation</h3>
                  <p className="text-gray-600">
                    Started with a small team of 5 faculty members and 50 students, 
                    focusing on science coaching for local students.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2015 - Expansion</h3>
                  <p className="text-gray-600">
                    Expanded to multiple branches across Faridabad and introduced 
                    competitive exam preparation programs.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2020 - Excellence</h3>
                  <p className="text-gray-600">
                    Recognized as the best coaching institute in Haryana with 
                    over 5000 successful students.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional coaching that fosters scientific thinking, 
                  innovation, and personal growth among our students. We aim to bridge 
                  the gap between academic knowledge and practical application, 
                  preparing students for competitive exams and future careers.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👁️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading coaching institution in Haryana recognized 
                  for excellence in science education and competitive exam preparation. 
                  We strive to create a learning environment that nurtures talent 
                  and builds confident, capable professionals.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Our Leadership Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center group">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👨‍🏫</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Dr. Rajesh Kumar</h3>
                <p className="text-blue-600 font-medium mb-3">Founder & Director</p>
                <p className="text-gray-600 text-sm">
                  PhD in Physics with 20+ years of teaching experience. 
                  Specialized in JEE and NEET coaching.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center group">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👩‍🏫</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Dr. Priya Sharma</h3>
                <p className="text-blue-600 font-medium mb-3">Academic Head</p>
                <p className="text-gray-600 text-sm">
                  M.Tech from IIT Delhi with 15+ years of experience in 
                  curriculum development and faculty training.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center group">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Amit Verma</h3>
                <p className="text-blue-600 font-medium mb-3">Operations Manager</p>
                <p className="text-gray-600 text-sm">
                  MBA with 10+ years of experience in educational institute 
                  management and student services.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Our Core Values
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="font-semibold mb-2">Academic Excellence</h3>
                  <p className="text-gray-600 text-sm">Highest standards of teaching and learning</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-600 text-sm">Creative teaching methods and approaches</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-semibold mb-2">Integrity</h3>
                  <p className="text-gray-600 text-sm">Ethical practices and transparency</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="font-semibold mb-2">Collaboration</h3>
                  <p className="text-gray-600 text-sm">Team-based learning environment</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Student Focus</h3>
                  <p className="text-gray-600 text-sm">Student success as our priority</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="font-semibold mb-2">Growth</h3>
                  <p className="text-gray-600 text-sm">Continuous improvement and development</p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-8 text-center">Our Achievements</h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">{instituteInfo.statistics.studentsTaught}</div>
                  <p className="text-blue-100">Students Taught</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{instituteInfo.statistics.successRate}</div>
                  <p className="text-blue-100">Success Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{instituteInfo.statistics.programs}</div>
                  <p className="text-blue-100">Programs</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{instituteInfo.statistics.facultyMembers}</div>
                  <p className="text-blue-100">Faculty Members</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
