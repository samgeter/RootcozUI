import React, { useState, useRef, useEffect } from 'react';
import { faqData } from './faqData.js';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Selected FAQs for landing page (4 specific questions)
  const landingFAQs = [
    faqData.find(faq => faq.question === "What kind of support can I expect?"),
    faqData.find(faq => faq.question === "Is there a free trial?"),
    faqData.find(faq => faq.question === "Can I use RootCoz without a technical background?"),
    faqData.find(faq => faq.question === "Can I change plans anytime?")
  ].filter(Boolean); // Remove any undefined items

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

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion(index);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-50"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-gray-50 border-t border-b border-slate-200 overflow-hidden">
            {landingFAQs.map((faq, index) => (
              <div key={index} className="border-b border-slate-200 last:border-b-0">
                
                {/* Question Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="
                    w-full px-6 md:px-8 py-6 text-left
                    hover:bg-slate-50 focus:bg-slate-50
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset
                    transition-colors duration-200
                  "
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 pr-4">
                      {faq.question}
                    </h3>
                    
                    {/* Toggle Icon */}
                    <div className={`
                      flex-shrink-0 w-6 h-6 flex items-center justify-center
                      text-indigo-500 transition-transform duration-200
                      ${openIndex === index ? 'rotate-45' : 'rotate-0'}
                    `}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Answer Panel */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`
                    overflow-hidden transition-all duration-300 ease-out
                    ${openIndex === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                    }
                  `}
                >
                  <div className="px-6 md:px-8 pb-6">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* More FAQs Button */}
          <div className="text-center mt-12">
            <a
              href="/faqs"
              className="
                inline-flex items-center gap-2
                bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
                text-white font-semibold text-lg
                px-8 py-4 rounded-2xl
                shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                transition-all duration-200
                transform hover:scale-105 active:scale-95
              "
            >
              More FAQs
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
