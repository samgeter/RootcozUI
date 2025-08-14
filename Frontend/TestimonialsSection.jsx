import React, { useState, useEffect, useRef } from 'react';

// Testimonials data array
const testimonials = [
  {
    id: 1,
    photoPng: 'Frontend/assets/testimonials/testimonial 1.jpg',
    name: 'Sarah Chen',
    title: 'CEO, TechFlow',
    quote: 'RootCoz transformed our startup journey. The mentorship and resources provided were invaluable in scaling our business from idea to Series A.'
  },
  {
    id: 2,
    photoPng: 'Frontend/assets/testimonials/testimonial 14.jpg',
    name: 'Marcus Johnson',
    title: 'Founder, GreenTech Solutions',
    quote: 'The expert guidance helped us navigate complex market challenges. We went from prototype to profitable in just 18 months.'
  },
  {
    id: 3,
    photoPng: 'Frontend/assets/testimonials/testimonial 3.jpg',
    name: 'Elena Rodriguez',
    title: 'Co-founder, DataViz Pro',
    quote: 'RootCoz connected us with the right investors and mentors. Their network opened doors we never knew existed.'
  },
  {
    id: 4,
    photoPng: 'Frontend/assets/testimonials/testimonial 4.jpg',
    name: 'David Kim',
    title: 'CEO, FinanceAI',
    quote: 'The strategic insights from RootCoz mentors helped us pivot at the right time and capture a $50M market opportunity.'
  },
  {
    id: 5,
    photoPng: 'Frontend/assets/testimonials/testimonial 8.jpg',
    name: 'Amara Okafor',
    title: 'Founder, HealthTech Innovations',
    quote: 'From day one, RootCoz provided the framework and support system that every startup founder needs to succeed.'
  },
  {
    id: 6,
    photoPng: 'Frontend/assets/testimonials/testimonial 6.jpg',
    name: 'James Mitchell',
    title: 'Co-founder, EduPlatform',
    quote: 'The community and resources at RootCoz are unmatched. We scaled from 1K to 100K users with their strategic guidance.'
  },
  {
    id: 7,
    photoPng: 'Frontend/assets/testimonials/testimonial 7.jpg',
    name: 'Priya Sharma',
    title: 'CEO, AI Solutions',
    quote: 'RootCoz helped us refine our product-market fit and secure our first major enterprise clients. Game-changing experience.'
  },
  {
    id: 8,
    photoPng: 'Frontend/assets/testimonials/testimonial 5.jpg',
    name: 'Alex Thompson',
    title: 'Founder, CloudOps',
    quote: 'The technical mentorship and business strategy support from RootCoz accelerated our growth beyond expectations.'
  },
  {
    id: 9,
    photoPng: 'Frontend/assets/testimonials/testimonial 9.jpg',
    name: 'Lisa Wang',
    title: 'Co-founder, RetailTech',
    quote: 'RootCoz provided the perfect blend of hands-on guidance and strategic vision. Our revenue grew 300% in one year.'
  },
  {
    id: 10,
    photoPng: 'Frontend/assets/testimonials/testimonial 10.jpg',
    name: 'Omar Hassan',
    title: 'CEO, MobileTech',
    quote: 'The mentor network at RootCoz is incredible. Every conversation brought new insights and actionable strategies.'
  },
  {
    id: 11,
    photoPng: 'Frontend/assets/testimonials/testimonial 11.jpg',
    name: 'Rachel Green',
    title: 'Founder, SustainableTech',
    quote: 'RootCoz helped us navigate the complex world of impact investing and secure funding aligned with our mission.'
  },
  {
    id: 12,
    photoPng: 'Frontend/assets/testimonials/testimonial 12.jpg',
    name: 'Carlos Rivera',
    title: 'Co-founder, LogisticsPro',
    quote: 'The operational excellence frameworks from RootCoz transformed our startup into a scalable, efficient business.'
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Get cards per view based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  // Update cards per view on resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(testimonials.length / cardsPerView);

  // Get current page (0-indexed)
  const currentPage = Math.floor(currentIndex / cardsPerView);

  // Auto-rotation logic
  useEffect(() => {
    if (!isHovered && !prefersReducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + cardsPerView;
          return nextIndex >= testimonials.length ? 0 : nextIndex;
        });
      }, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, cardsPerView, prefersReducedMotion]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - cardsPerView;
      return newIndex < 0 ? testimonials.length - cardsPerView : newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + cardsPerView;
      return nextIndex >= testimonials.length ? 0 : nextIndex;
    });
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex * cardsPerView);
  };

  // Keyboard navigation
  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  // Get visible testimonials
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white"
      aria-label="Customer testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Loved & Trusted by Founders
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-live="polite"
          aria-label={`Testimonial ${currentPage + 1} of ${totalPages}`}
        >
          
          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className={`
                  bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 
                  border border-slate-100 relative
                  transition-all duration-500 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{
                  transitionDelay: prefersReducedMotion ? '0ms' : `${index * 100}ms`
                }}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-indigo-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-slate-700 text-lg leading-relaxed mb-6 mt-8">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.photoPng}
                    alt={`${testimonial.name}, ${testimonial.title}`}
                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-slate-100"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-500 text-sm">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8">
            
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              onKeyDown={(e) => handleKeyDown(e, goToPrevious)}
              className="
                p-3 rounded-full bg-white shadow-md border border-slate-200
                hover:shadow-lg hover:border-indigo-300 hover:bg-indigo-50
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              aria-label="Previous testimonials"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial pages">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => goToPage(pageIndex)}
                  onKeyDown={(e) => handleKeyDown(e, () => goToPage(pageIndex))}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    ${currentPage === pageIndex 
                      ? 'bg-indigo-500 w-8' 
                      : 'bg-slate-300 hover:bg-slate-400'
                    }
                  `}
                  role="tab"
                  aria-selected={currentPage === pageIndex}
                  aria-label={`Go to testimonial page ${pageIndex + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              onKeyDown={(e) => handleKeyDown(e, goToNext)}
              className="
                p-3 rounded-full bg-white shadow-md border border-slate-200
                hover:shadow-lg hover:border-indigo-300 hover:bg-indigo-50
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              aria-label="Next testimonials"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

          </div>
        </div>

        {/* CTA Block */}
        <div className="mt-20">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.1),_transparent_50%)]"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Join 45M+ users today
              </h3>
              <p className="text-slate-300 text-lg md:text-xl mb-8">
                Start for free — upgrade anytime.
              </p>
              
              <button className="
                inline-flex items-center gap-2 
                bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
                text-white font-semibold text-lg
                px-8 py-4 rounded-2xl
                shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900
                transition-all duration-200
                transform hover:scale-105 active:scale-95
              ">
                Sign up free
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
