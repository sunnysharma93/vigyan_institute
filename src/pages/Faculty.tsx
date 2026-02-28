import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useInstituteInfo, useFaculty } from '../context/InstituteContext';

const Faculty: React.FC = () => {
  const instituteInfo = useInstituteInfo();
  const faculty = useFaculty();

  return (
    <>
      <Helmet>
        <title>Faculty - Vigyan Institute | Palla, Faridabad</title>
        <meta name="description" content="Meet our experienced faculty members at Vigyan Institute. Expert teachers for JEE, NEET, and board exam preparation." />
        <meta name="keywords" content="faculty, teachers, JEE faculty, NEET faculty, Palla Faridabad" />
        <link rel="canonical" href="/faculty" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Faculty
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from the best minds in education. Our faculty members are experts in their subjects with years of experience in competitive exam preparation.
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {faculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-lg text-blue-600 font-semibold mb-2">
                        {member.subject}
                      </p>
                      <p className="text-gray-600 mb-2">
                        {member.qualification}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        {member.experience} of experience
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Specialization:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialization.map((spec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Available for doubt sessions</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        View Profile →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Our Faculty Section */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Why Our Faculty Makes the Difference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Our faculty members are subject matter experts with deep understanding of competitive exam patterns.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Attention</h3>
                <p className="text-gray-600">
                  Small batch sizes ensure every student gets personalized attention and doubt clearing support.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Result Oriented</h3>
                <p className="text-gray-600">
                  Proven track record of producing top rankers in JEE, NEET, and board examinations.
                </p>
              </div>
            </div>
          </div>

          {/* Join Faculty Section */}
          <div className="mt-16 bg-blue-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Faculty Team
              </h2>
              <p className="text-xl mb-8">
                We are always looking for passionate educators who can inspire and guide students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${instituteInfo.contact.email.info}`}
                  className="bg-white text-blue-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Send Your Resume
                </a>
                <a
                  href="/contact"
                  className="border-2 border-white text-white py-3 px-8 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
                >
                  Contact HR
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculty;
