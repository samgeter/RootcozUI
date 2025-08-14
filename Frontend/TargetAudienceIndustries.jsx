import React, { useState, useEffect } from 'react';

// Replace /assets/target/portrait-*.jpg with real images
// Animation rotates 7 industries every 10s (respects reduced motion)

const industries = [
  "Agriculture","Finance","Retail","Education","Healthcare","Technology",
  "Manufacturing","Logistics","Real Estate","Hospitality","Marketing",
  "Entertainment","Legal","Consulting","Insurance","Construction","Transportation",
  "E-commerce","Telecommunications","Media","Automotive","Energy","Food & Beverage",
  "Fashion","Sports","Travel","Gaming","Non-profit","Aerospace","Pharmaceuticals",
  "Biotech","Mining"
];

// Industry Pills Component with Animation
const IndustryPills = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Get 7 industries for current set
  const getCurrentIndustries = () => {
    const startIndex = (currentSet * 7) % industries.length;
    const currentIndustries = [];
    
    for (let i = 0; i < 7; i++) {
      currentIndustries.push(industries[(startIndex + i) % industries.length]);
    }
    
    return currentIndustries;
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentSet(prev => (prev + 1) % Math.ceil(industries.length / 7));
        setIsVisible(true);
      }, 250);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const currentIndustries = getCurrentIndustries();

  return (
    <div className="relative w-full max-w-[360px] md:w-[400px] md:h-[400px] aspect-square ml-60 bg-[radial-gradient(circle,_rgba(209,213,219,0.34)_1px,_transparent_1px)] [background-size:16px_16px]">
      {/* Circle Glow Background */}
      <div className="absolute inset-0 grid place-items-center md:place-items-center">
        <div className="
          w-[320px] h-[320px] md:w-[460px] md:h-[460px] rounded-full
          bg-[radial-gradient(closest-side,_rgba(67,97,238,0.28),_rgba(67,97,238,0.12),_transparent_70%)]
          blur-2xl
        "></div>
      </div>

      {/* Individually Positioned Tags */}
      <div className="absolute inset-0">
        
        {/* Tag 1: Top Center */}
        <div className="absolute left-1/2 top-[14%] -translate-x-1/2">
          <span className={`
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            text-white font-medium leading-none
            bg-[#4F63FF] shadow-lg shadow-[#4F63FF]/25
            hover:shadow-[#4F63FF]/40 transition
            md:px-6 md:py-3 px-4 py-2 text-sm md:text-base
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            {currentIndustries[0]}
          </span>
        </div>

        {/* Tag 2: Upper Left */}
        <div className="absolute left-[22%] top-[29%] -translate-x-1/2">
          <span className={`
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            text-white font-medium leading-none
            bg-[#4F63FF] shadow-lg shadow-[#4F63FF]/25
            hover:shadow-[#4F63FF]/40 transition
            md:px-6 md:py-3 px-4 py-2 text-sm md:text-base
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            transitionDelay: prefersReducedMotion ? '0ms' : '50ms'
          }}>
            {currentIndustries[1]}
          </span>
        </div>

        {/* Tag 3: Upper Right */}
        <div className="absolute right-[25%] top-[29%] translate-x-1/2">
          <span className={`
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            text-white font-medium leading-none
            bg-[#4F63FF] shadow-lg shadow-[#4F63FF]/25
            hover:shadow-[#4F63FF]/40 transition
            md:px-6 md:py-3 px-4 py-2 text-sm md:text-base
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            transitionDelay: prefersReducedMotion ? '0ms' : '100ms'
          }}>
            {currentIndustries[2]}
          </span>
        </div>

        {/* Tag 4: Center */}
        <div className="absolute left-1/2 top-[50.5%] -translate-x-1/2 -translate-y-1/2">
          <span className={`
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            text-white font-medium leading-none
            bg-[#4F63FF] shadow-lg shadow-[#4F63FF]/25
            hover:shadow-[#4F63FF]/40 transition
            md:px-6 md:py-3 px-4 py-2 text-sm md:text-base
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            transitionDelay: prefersReducedMotion ? '0ms' : '150ms'
          }}>
            {currentIndustries[3]}
          </span>
        </div>

        {/* Tag 5: Lower Left */}
        <div className="absolute left-[21%] bottom-[28%] -translate-x-1/2">
          <span className={`
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            text-white font-medium leading-none
            bg-[#4F63FF] shadow-lg shadow-[#4F63FF]/25
            hover:shadow-[#4F63FF]/40 transition
            md:px-6 md:py-3 px-4 py-2 text-sm md:text-base
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            transitionDelay: prefersReducedMotion ? '0ms' : '200ms'
          }}>
            {currentIndustries[4]}
          </span>
        </div>

        {/* Tag 6: Lower Right */}
        <div className="absolute right-[25%] bottom-[28%] translate-x-1/2">
          <span className={`
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            text-white font-medium leading-none
            bg-[#4F63FF] shadow-lg shadow-[#4F63FF]/25
            hover:shadow-[#4F63FF]/40 transition
            md:px-6 md:py-3 px-4 py-2 text-sm md:text-base
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            transitionDelay: prefersReducedMotion ? '0ms' : '250ms'
          }}>
            {currentIndustries[5]}
          </span>
        </div>

        {/* Tag 7: Bottom Center */}
        <div className="absolute left-1/2 bottom-[12%] -translate-x-1/2">
          <span className={`
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            text-white font-medium leading-none
            bg-[#4F63FF] shadow-lg shadow-[#4F63FF]/25
            hover:shadow-[#4F63FF]/40 transition
            md:px-6 md:py-3 px-4 py-2 text-sm md:text-base
            transition-all duration-300 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            transitionDelay: prefersReducedMotion ? '0ms' : '300ms'
          }}>
            {currentIndustries[6]}
          </span>
        </div>

      </div>
    </div>
  );
};

// Target Audience Section
const TargetAudienceSection = () => {
  const portraits = [
    {
      src: 'Frontend/assets/target/builder1.png',
      alt: 'African entrepreneur working on laptop',
      bgColor: '#050038',
      width: '175px',
      height: '340px'
    },
    {
      src: 'Frontend/assets/target/builder2.png',
      alt: 'African founder in business meeting',
      bgColor: '#F4B400',
      width: '176px',
      height: '422px'
    },
    {
      src: 'Frontend/assets/target/builder3.png',
      alt: 'African startup team collaborating',
      bgColor: '#9C0E4E',
      width: '175px',
      height: '340px'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-2">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-lg">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Built for African Founders
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our AI is trained with local market data, cultural nuances,
              and regional trends — ensuring solutions are relevant,
              practical, and high-impact.
            </p>
          </div>

          {/* Portrait Cards */}
          <div className="flex justify-center md:justify-end">
            <div className="relative flex items-end justify-center gap-2" style={{ width: '550px', height: '422px' }}>
              {portraits.map((portrait, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 flex items-center justify-center"
                  style={{
                    backgroundColor: portrait.bgColor,
                    width: portrait.width,
                    height: portrait.height,
                    ...(index === 1 ? { alignSelf: 'stretch' } : { alignSelf: 'center' })
                  }}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden p-3">
                    <img
                      src={portrait.src}
                      alt={portrait.alt}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Industries Section
const IndustriesSection = () => {
  return (
    <section className="bg-white py-5 md:py-2 bg-[radial-gradient(circle,_rgba(209,213,219,0.34)_1px,_transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Industry Pills Cluster */}
          <div className="flex justify-center md:justify-start">
            <IndustryPills />
          </div>

          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Industry Agnostic
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From fintech to agriculture, our AI adapts to any sector,
              delivering insights and strategies tailored to your specific
              industry needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Component
const TargetAudienceIndustries = () => {
  return (
    <div>
      <TargetAudienceSection />
      <IndustriesSection />
    </div>
  );
};

export default TargetAudienceIndustries;
