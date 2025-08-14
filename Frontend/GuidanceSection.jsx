import React, { useState, useEffect, useMemo } from 'react';

// Loads mentor images from /assets/mentors (Vite glob or fallback list).
// Displays 5 at a time; rotates every 10s through the full set.
// Respects prefers-reduced-motion and preloads the next window.

// Fallback mentor images list
const fallbackMentorImages = [
  '/assets/mentors/mentor-1.jpg',
  '/assets/mentors/mentor-2.jpg',
  '/assets/mentors/mentor-3.jpg',
  '/assets/mentors/mentor-4.jpg',
  '/assets/mentors/mentor-5.jpg',
  '/assets/mentors/mentor-6.jpg',
  '/assets/mentors/mentor-7.jpg',
  '/assets/mentors/mentor-8.jpg',
];

// Mentor Orbit Component
const MentorOrbit = ({ images = fallbackMentorImages, rotationMs = 10000 }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Venture builders data with names
  const ventureBuilders = [
    { image: 'Frontend/assets/mentor/isidore.png', name: 'isidore' },
    { image: 'Frontend/assets/mentor/david.png', name: 'david' },
    { image: 'Frontend/assets/mentor/kalkidan.png', name: 'kalkidan' },
    { image: 'Frontend/assets/mentor/dennis.png', name: 'dennis' },
    { image: 'Frontend/assets/mentor/jean.png', name: 'jean' },
  ];

  // Shuffle builders once on mount
  const shuffledBuilders = useMemo(() => {
    const shuffled = [...ventureBuilders];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Get current window of 5 builders
  const getCurrentBuilders = () => {
    const currentBuilders = [];
    for (let i = 0; i < 5; i++) {
      const builderIndex = (startIndex + i) % shuffledBuilders.length;
      currentBuilders.push(shuffledBuilders[builderIndex]);
    }
    return currentBuilders;
  };

  // Extract first name from full name
  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  // Preload next window of images
  const preloadNextImages = () => {
    const nextStartIndex = (startIndex + 5) % shuffledBuilders.length;
    for (let i = 0; i < 5; i++) {
      const builderIndex = (nextStartIndex + i) % shuffledBuilders.length;
      const img = new Image();
      img.src = shuffledBuilders[builderIndex].image;
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setStartIndex(prev => (prev + 5) % shuffledBuilders.length);
        setIsVisible(true);
      }, 250);
    }, rotationMs);

    // Preload next images
    preloadNextImages();

    return () => clearInterval(interval);
  }, [startIndex, shuffledBuilders.length, rotationMs, prefersReducedMotion]);

  const currentBuilders = getCurrentBuilders();

  // Radial positions for 5 avatars evenly spaced around a circle (72 degrees apart)
  const avatarPositions = [
    { 
      className: "top-[6.5%] left-1/2 -translate-x-1/2", 
      delay: 0
    }, // Top (0°)
    { 
      className: "top-[28%] right-[8%]", 
      delay: 40
    }, // Top-right (72°)
    { 
      className: "bottom-[11%] right-[21%]", 
      delay: 80
    }, // Bottom-right (144°)
    { 
      className: "bottom-[13%] left-[18%]", 
      delay: 120
    }, // Bottom-left (216°)
    { 
      className: "top-[28%] left-[8%]", 
      delay: 160
    } // Top-left (288°)
  ];

  return (
    <div className="relative aspect-square w-full max-w-lg mx-auto">
      {/* Concentric Rings */}
      {/* <div className="absolute inset-0 border border-white/30 rounded-full"></div> */}
      <div className="absolute inset-8 border border-white/30 rounded-full"></div>
      <div className="absolute inset-16 border border-white/25 rounded-full"></div>
      <div className="absolute inset-24 border border-white/20 rounded-full"></div>
      <div className="absolute inset-32 border border-white/15 rounded-full"></div>
      <div className="absolute inset-40 border border-white/10 rounded-full"></div>
      <div className="absolute inset-48 border border-white/10 rounded-full"></div>

      {/* Central Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 w-16 h-16 md:w-20 md:h-20 rounded-full shadow-[0_0_0_8px_rgba(99,102,241,.15)] z-10"></div>

      {/* Mentor Avatars */}
      {currentBuilders.map((builder, index) => (
        <div
          key={`${startIndex}-${index}`}
          className={`
            absolute z-20
            transition-all duration-250 ease-out
            ${avatarPositions[index].className}
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
          style={{
            transitionDelay: prefersReducedMotion ? '0ms' : `${avatarPositions[index].delay}ms`
          }}
        >
          {/* Avatar Circle */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36">
            <div className={`w-full h-full rounded-full ring-2 ring-indigo-400/70 shadow-xl overflow-hidden relative ${
              builder.name.toLowerCase().includes('kalkidan') ? 'bg-white' : 'bg-slate-900'
            }`}>
              <img
                src={builder.image}
                alt={`${builder.name} — Venture Builder`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Name Label Inside Image */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full shadow-lg max-w-[calc(100%-8px)] truncate">
                {getFirstName(builder.name)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Guidance Section Component
const GuidanceSection = ({ images, rotationMs = 10000 }) => {
  return (
    <section 
      className="bg-slate-950 text-slate-50"
      aria-labelledby="guidance-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-lg">
            <h2 
              id="guidance-heading"
              className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6"
            >
              Expert Guidance & Support
            </h2>
            <p className="text-slate-300 max-w-md mt-4 text-lg leading-relaxed mb-8">
              Connect with expert mentors who can guide you through
              your startup journey
            </p>
            <a
              href="#learn-more"
              className="inline-flex items-center text-slate-50 hover:text-indigo-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-md px-1 py-1"
            >
              Learn more
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right Column - Mentor Orbit */}
          <div className="flex justify-center lg:justify-end">
            <MentorOrbit images={images} rotationMs={rotationMs} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;
