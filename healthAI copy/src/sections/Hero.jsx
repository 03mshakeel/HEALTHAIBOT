import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Shield, Clock, Award, Activity } from 'lucide-react';

export default function Hero({ onChat, onFindHealthcare, onHealthCheck }) {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.6 }, 0.3)
        .fromTo(
          headlineRef.current?.querySelectorAll('.word') || [],
          { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.1 },
          0.5
        )
        .fromTo(subheadlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 1)
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
          1.2
        )
        .fromTo(
          trustRef.current?.children || [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          1.5
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = ['Your', 'Health', 'Companion,', 'Available', '24/7'];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.jpg" alt="Healthcare background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc]/95 via-[#f8fafc]/70 to-transparent" />
      </div>

      <div className="absolute right-10 top-1/4 hidden lg:block">
        <div className="animate-float">
          <div className="w-16 h-16 bg-white/80 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center text-[#e74c3c]">
            <svg className="w-8 h-8 animate-heartbeat" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
        <div className="max-w-2xl">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a6fc4]/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#28b463] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#1a6fc4]"> Healthcare for London</span>
          </div>

          <h1 ref={headlineRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1f2937] mb-6">
            {headlineWords.map((word, index) => (
              <span key={index} className="word inline-block mr-3">{word}</span>
            ))}
          </h1>

          <p ref={subheadlineRef} className="text-lg text-[#4b5563] mb-8 leading-relaxed">
            Connect with AI-driven medical assistance, find nearby healthcare providers, 
            and get instant answers to your health questions—all in one place.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-10">
            <button onClick={onChat} className="btn-primary flex items-center gap-2 animate-pulse-glow">
              Start Chatting
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={onHealthCheck} className="btn-secondary flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Health Check
            </button>
            <button onClick={onFindHealthcare} className="btn-secondary">
              Find Healthcare
            </button>
          </div>

          <div ref={trustRef} className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
              <Clock className="w-5 h-5 text-[#f39c12]" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
