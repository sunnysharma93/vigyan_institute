/**
 * Lazy-loaded routes configuration
 * Implements code splitting for optimal performance
 */

import { lazy } from 'react';
import { createLazyComponent } from '../components/LazyLoad';

// Lazy load page components
const Home = createLazyComponent(() => import('../pages/Home'), {
  preload: true, // Preload home page for better UX
});

const About = createLazyComponent(() => import('../pages/About'));
const Courses = createLazyComponent(() => import('../pages/Courses'));
const Faculty = createLazyComponent(() => import('../pages/Faculty'));
const Admission = createLazyComponent(() => import('../pages/Admission'));
const Contact = createLazyComponent(() => import('../pages/Contact'));
const ContactUs = createLazyComponent(() => import('../pages/ContactUs'));
const Notes = createLazyComponent(() => import('../pages/Notes'));
const Landing = createLazyComponent(() => import('../pages/Landing'));

// Lazy load additional components
const NotFound = createLazyComponent(() => import('../pages/NotFound'));

export {
  Home,
  About,
  Courses,
  Faculty,
  Admission,
  Contact,
  ContactUs,
  Notes,
  Landing,
  NotFound,
};

// Route configuration
export const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    preload: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/courses',
    component: Courses,
    exact: true,
  },
  {
    path: '/faculty',
    component: Faculty,
    exact: true,
  },
  {
    path: '/admission',
    component: Admission,
    exact: true,
  },
  {
    path: '/contact',
    component: Contact,
    exact: true,
  },
  {
    path: '/contact-us',
    component: ContactUs,
    exact: true,
  },
  {
    path: '/notes',
    component: Notes,
    exact: true,
  },
  {
    path: '/landing',
    component: Landing,
    exact: true,
  },
  {
    path: '*',
    component: NotFound,
    exact: false,
  },
];

// Preload function for critical routes
export const preloadCriticalRoutes = () => {
  // Preload routes that are likely to be visited next
  const criticalRoutes = ['About', 'Courses', 'Contact'];
  
  criticalRoutes.forEach(routeName => {
    const route = routes.find(r => r.component.name === routeName);
    if (route && !route.preload) {
      // Dynamically import the component for preloading
      import(`../pages/${routeName}`).catch(error => {
        console.warn(`Failed to preload ${routeName}:`, error);
      });
    }
  });
};

export default routes;
