import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection({ onGetStarted }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bgImage = sectionRef.current?.querySelector('.bg-image');
      
      if (bgImage) {
        gsap.fromTo(
          bgImage,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        contentRef.current?.querySelectorAll('.animate-item') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (bgImage) {
        gsap.to(bgImage, {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/cta-bg.jpg" alt="CTA background" className="bg-image w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a6fc4]/90 to-[#114b83]/80" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-item inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-medium text-white">Join 50,000+ Londoners</span>
        </div>

        <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Take Control of Your Health?
        </h2>

        <p className="animate-item text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of Londoners who trust HealthBot for their healthcare needs. 
          Get started in seconds and experience the future of healthcare.
        </p>

        <div className="animate-item flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={onGetStarted} className="bg-white text-[#1a6fc4] px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg animate-pulse-glow">
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
        </div>

        <p className="animate-item text-sm text-white/60">
          No credit card required
        </p>
      </div>
    </section>
  );
}
