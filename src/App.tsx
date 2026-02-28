import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { InstituteProvider } from './context/InstituteContext';
import { ThemeProvider } from './components/theme-provider';
import { ToastProvider } from './components/Toast';
import ErrorBoundaryEnhanced from './components/ErrorBoundaryEnhanced';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from './components/Toast';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import Admission from './pages/Admission';
import Contact from './pages/Contact';
import Landing from './pages/Landing';
import Notes from './pages/Notes';
import ContactUs from './pages/ContactUs';

import './App.css';

function App() {
  return (
    <ErrorBoundaryEnhanced>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light" storageKey="vigyan-theme">
          <ToastProvider>
            <InstituteProvider>
              <Router>
                <div className="min-h-screen flex flex-col bg-background text-foreground">
                  <Header />
                  <main className="flex-grow">
                    <ErrorBoundary>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/faculty" element={<Faculty />} />
                        <Route path="/admission" element={<Admission />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/notes" element={<Notes />} />
                      </Routes>
                    </ErrorBoundary>
                  </main>
                  <Footer />
                </div>
                <ToastContainer />
              </Router>
            </InstituteProvider>
          </ToastProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundaryEnhanced>
  );
}

export default App;
