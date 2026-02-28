import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useInstituteInfo } from '../context/InstituteContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: Record<string, any>[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  schema = [],
  breadcrumbs = [],
  faq = []
}) => {
  const instituteInfo = useInstituteInfo();

  // Default values
  const defaultTitle = 'Vigyan Institute Palla Faridabad - Best Coaching Institute for JEE, NEET & Board Exams';
  const defaultDescription = 'Premier coaching institute in Palla, Faridabad. Expert faculty for JEE, NEET, and board exam preparation. Small batch sizes, personalized attention, and proven results.';
  const defaultKeywords = 'coaching institute in Palla Faridabad, best tuition center in Faridabad, science coaching in Palla, JEE coaching Faridabad, NEET preparation Palla, board exam coaching, Vigyan Institute';
  
  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalCanonical = canonical || 'https://www.vigyaninstitutepalla.com';
  const finalOgImage = ogImage || 'https://www.vigyaninstitutepalla.com/og-image.jpg';

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": instituteInfo.name,
    "description": finalDescription,
    "url": finalCanonical,
    "telephone": instituteInfo.contact.phone.mainCampus,
    "email": instituteInfo.contact.email.info,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": instituteInfo.address.mainCampus.street,
      "addressLocality": instituteInfo.address.mainCampus.area,
      "addressRegion": instituteInfo.address.mainCampus.state,
      "postalCode": instituteInfo.address.mainCampus.pincode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.4089",
      "longitude": "77.3178"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-14:00"
    ],
    "priceRange": "$$",
    "sameAs": [
      instituteInfo.socialMedia.facebook,
      instituteInfo.socialMedia.instagram,
      instituteInfo.socialMedia.twitter,
      instituteInfo.socialMedia.youtube
    ].filter(Boolean),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": instituteInfo.googleReviews.rating.toString(),
      "reviewCount": instituteInfo.googleReviews.totalReviews.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Educational Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "JEE Main + Advanced Coaching",
            "description": "Comprehensive JEE preparation with experienced faculty"
          },
          "price": "85000",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "NEET Medical Coaching",
            "description": "Complete NEET preparation with focus on Biology"
          },
          "price": "75000",
          "priceCurrency": "INR"
        }
      ]
    }
  };

  // EducationalOrganization Schema
  const educationalOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": instituteInfo.name,
    "description": finalDescription,
    "url": finalCanonical,
    "telephone": instituteInfo.contact.phone.mainCampus,
    "email": instituteInfo.contact.email.info,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": instituteInfo.address.mainCampus.street,
      "addressLocality": instituteInfo.address.mainCampus.area,
      "addressRegion": instituteInfo.address.mainCampus.state,
      "postalCode": instituteInfo.address.mainCampus.pincode,
      "addressCountry": "IN"
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Coaching Institute Certification"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "35000",
      "highPrice": "85000",
      "offerCount": "4"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Palla, Faridabad, Haryana"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  // FAQ Schema
  const faqSchema = faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Combine all schemas
  const allSchemas = [
    localBusinessSchema,
    educationalOrganizationSchema,
    breadcrumbSchema,
    faqSchema,
    ...schema
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={instituteInfo.name} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Palla, Faridabad" />
      <meta name="geo.position" content="28.4089;77.3178" />
      <meta name="ICBM" content="28.4089, 77.3178" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${instituteInfo.name} - Best Coaching Institute in Palla Faridabad`} />
      <meta property="og:site_name" content={instituteInfo.name} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={`${instituteInfo.name} - Best Coaching Institute in Palla Faridabad`} />
      <meta name="twitter:site" content="@vigyaninstitute" />
      <meta name="twitter:creator" content="@vigyaninstitute" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      {allSchemas.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
