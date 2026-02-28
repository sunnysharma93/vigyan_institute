import React from 'react';
import ContactForm from '../components/ContactForm';
import { useInstitute } from '../context/InstituteContext';

const Contact: React.FC = () => {
  const { instituteInfo, getFullAddress, getPhoneNumber, getEmail, getOfficeHours } = useInstitute();

  const handleFormSuccess = () => {
    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormError = (error: string) => {
    console.error('Contact form error:', error);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Get in touch with us for admissions, inquiries, or any questions about our coaching programs
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h3 className="font-semibold mb-1">Main Campus</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {getFullAddress('main')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📍</span>
                  <div>
                    <h3 className="font-semibold mb-1">Branch Office</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {getFullAddress('branch')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">
                      {getPhoneNumber('main')} (Main Campus)<br />
                      {getPhoneNumber('branch')} (Branch Office)<br />
                      {getPhoneNumber('admissions')} (Admissions)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-2xl mr-4">✉️</span>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">
                      {getEmail('info')}<br />
                      {getEmail('admissions')}<br />
                      {getEmail('support')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="text-2xl mr-4">🕐</span>
                  <div>
                    <h3 className="font-semibold mb-1">Office Hours</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {getOfficeHours()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  📄 Download Brochure
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  📝 Online Admission Form
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  💰 Fee Structure
                </a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                  📅 Schedule a Visit
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form Component */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <ContactForm onSuccess={handleFormSuccess} onError={handleFormError} />
          </div>
        </div>

        {/* Google Maps Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Us on Map</h2>
            <p className="text-gray-600">Visit our campus in {instituteInfo.location}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.123456789!2d77.123456789!3d28.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA3JzI0LjAiTiA3N8KwMDcnMjUuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title={`${instituteInfo.name} Location Map`}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚗</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">By Car</h3>
            <p className="text-gray-600 text-sm">
              Located on Delhi-Mathura Road with ample parking space available
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚌</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">By Bus</h3>
            <p className="text-gray-600 text-sm">
              Bus stop within 5 minutes walking distance from both campuses
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚇</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">By Metro</h3>
            <p className="text-gray-600 text-sm">
              Nearest metro station is 10 minutes away by auto-rickshaw
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
