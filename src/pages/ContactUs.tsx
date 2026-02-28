/**
 * ContactUs page - Professional contact page with map and multiple contact methods
 * Features address, phone, email, embedded Google Maps, and WhatsApp integration
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Card } from '../components/ui';
import { createTelLink, createMailtoLink, formatPhoneNumber } from '../utils';
import { CONTACT_INFO, BUSINESS_HOURS } from '../constants';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with EmailJS or your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappLink = `https://wa.me/${CONTACT_INFO.phone.whatsapp.replace(/\D/g, '')}?text=Hi%20Vigyan%20Institute!%20I%20would%20like%20to%20know%20more%20about%20your%20courses.`;

  return (
    <>
      <Helmet>
        <title>Contact Us - Vigyan Institute Palla Faridabad</title>
        <meta name="description" content="Contact Vigyan Institute in Palla, Faridabad. Visit our campus, call us, or send a message. Get directions, phone numbers, email addresses, and WhatsApp support." />
        <meta name="keywords" content="contact Vigyan Institute, Palla Faridabad contact, coaching institute contact, phone number, address, email, WhatsApp" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                We're here to help you achieve your academic goals. Reach out to us for any queries about our courses, admissions, or general information.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Address Card */}
            <Card variant="elevated" interactive="hover" className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Visit Our Campus</h3>
              <address className="text-gray-600 not-italic">
                <p className="mb-2">{CONTACT_INFO.address.mainCampus.street}</p>
                <p className="mb-2">{CONTACT_INFO.address.mainCampus.area}, {CONTACT_INFO.address.mainCampus.city}</p>
                <p>{CONTACT_INFO.address.mainCampus.state} - {CONTACT_INFO.address.mainCampus.pincode}</p>
                <p className="mt-2 text-sm text-gray-500">Landmark: {CONTACT_INFO.address.mainCampus.landmark}</p>
              </address>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Weekdays:</span> {BUSINESS_HOURS.weekdays}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Saturday:</span> {BUSINESS_HOURS.saturday}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Sunday:</span> {BUSINESS_HOURS.sunday}
                </p>
              </div>
            </Card>

            {/* Phone Card */}
            <Card variant="elevated" interactive="hover" className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Call Us</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Main Number</p>
                  <a 
                    href={createTelLink(CONTACT_INFO.phone.main)}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {formatPhoneNumber(CONTACT_INFO.phone.main)}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Support</p>
                  <a 
                    href={createTelLink(CONTACT_INFO.phone.support)}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {formatPhoneNumber(CONTACT_INFO.phone.support)}
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  href={whatsappLink}
                  target="_blank"
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat on WhatsApp
                </Button>
              </div>
            </Card>

            {/* Email Card */}
            <Card variant="elevated" interactive="hover" className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Us</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">General Information</p>
                  <a 
                    href={createMailtoLink(CONTACT_INFO.email.info)}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {CONTACT_INFO.email.info}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Admissions</p>
                  <a 
                    href={createMailtoLink(CONTACT_INFO.email.admission)}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {CONTACT_INFO.email.admission}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Support</p>
                  <a 
                    href={createMailtoLink(CONTACT_INFO.email.support)}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {CONTACT_INFO.email.support}
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Map and Contact Form Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Google Map */}
            <Card variant="elevated" className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Find Us on Map</h2>
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <iframe
                    title="Vigyan Institute Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123456789!2d77.3178!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzMyLjAiTiA3N8KwMTknMDYuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href="https://maps.google.com/?q=Vigyan+Institute+Palla+Faridabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Get Directions
                  </a>
                  <Button
                    href={whatsappLink}
                    target="_blank"
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Navigate with WhatsApp
                  </Button>
                </div>
              </div>
            </Card>

            {/* Contact Form */}
            <Card variant="elevated" className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-700">Thank you for your message! We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-700">Something went wrong. Please try again later.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="course-enquiry">Course Enquiry</option>
                      <option value="admission">Admission Information</option>
                      <option value="fee-structure">Fee Structure</option>
                      <option value="general">General Information</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us more about your query..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </Card>
          </div>

          {/* Social Media Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-6">Follow Us on Social Media</h3>
            <div className="flex justify-center space-x-4">
              {Object.entries(CONTACT_INFO.socialMedia).map(([platform, url]) => (
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow duration-300"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <span className="text-xl">
                      {platform === 'facebook' && '📘'}
                      {platform === 'instagram' && '📷'}
                      {platform === 'youtube' && '📺'}
                      {platform === 'linkedin' && '💼'}
                      {platform === 'twitter' && '🐦'}
                    </span>
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
