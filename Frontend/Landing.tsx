import React, { useState } from 'react';

// Header Component
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = ['Product', 'Solutions', 'Resources', 'Pricing', 'FAQs'];

  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-900">
              RootCoz
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#login"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            >
              Login
            </a>
            <a
              href="#signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                >
                  {link}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <a
                  href="#login"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                >
                  Login
                </a>
                <a
                  href="#signup"
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-base font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// Hero Component
const Hero: React.FC = () => {
  return (
    <section className="bg-gray-50 bg-gradient-to-br from-white to-gray-100 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              AI-Powered Venture Building Platform for African Founders
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Validate ideas, design strong value propositions, test market fit, and launch MVPs faster.
            </p>
            <div>
              <a
                href="#get-started"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="mt-12 lg:mt-0 max-w-lg mx-auto lg:max-w-none">
            <div className="relative aspect-video bg-gray-200 rounded-xl shadow-2xl overflow-hidden group cursor-pointer">
              {/* Replace /assets/hero-video-placeholder.jpg with actual video poster or <video> */}
              <img
                src="/assets/hero-video-placeholder.jpg"
                alt="RootCoz platform demo video"
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                <button
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 shadow-lg transform group-hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Play video"
                >
                  <svg className="h-12 w-12 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Partners Component
const Partners: React.FC = () => {
  const partnerLogos = [
    {
      src: '/assets/partners/microsoft-for-startups.png',
      alt: 'Microsoft for Startups'
    },
    {
      src: '/assets/partners/zero-one.png',
      alt: 'Zero One'
    },
    {
      src: '/assets/partners/ossie-technologies.png',
      alt: 'Ossie Technologies'
    },
    {
      src: '/assets/partners/microsoft-for-startups-2.png',
      alt: 'Microsoft for Startups Partner'
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Caption */}
        <div className="text-center mb-12">
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Trusted by early-stage founders, investors, and growth teams across Africa.
          </p>
        </div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partnerLogos.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              {/* Replace /assets/partners/*.png with real logos */}
              <img
                src={partner.src}
                alt={partner.alt}
                className="max-h-12 w-auto object-contain filter brightness-0 hover:brightness-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Landing Component
const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Partners />
      </main>
    </div>
  );
};

export default Landing;
