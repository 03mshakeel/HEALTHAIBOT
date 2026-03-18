import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up in seconds with your email or social accounts. Set up your health profile for personalized assistance.',
    image: '/step1-register.jpg',
  },
  {
    number: '02',
    title: 'Ask Your Health Questions',
    description: 'Chat with our AI bot about symptoms, medications, or general health concerns. Get instant, reliable answers.',
    image: '/step2-chat.jpg',
  },
  {
    number: '03',
    title: 'Find Nearby Healthcare',
    description: 'Locate the best doctors, clinics, or pharmacies in London. Book appointments and get directions instantly.',
    image: '/step3-map.jpg',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      const stepElements = stepsRef.current?.querySelectorAll('.step-item');
      stepElements?.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      const progressLine = stepsRef.current?.querySelector('.progress-line');
      if (progressLine) {
        gsap.fromTo(
          progressLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2937] mb-4">How It Works</h2>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Get started with HealthBot in three simple steps
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#e5e8ed] hidden md:block">
            <div className="progress-line absolute inset-x-0 top-0 bg-gradient-to-b from-[#1a6fc4] to-[#28b463] origin-top" style={{ height: '100%' }} />
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`step-item flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a6fc4] to-[#114b83] flex items-center justify-center text-white font-bold text-lg animate-pulse">
                      {step.number}
                    </div>
                    <div className="hidden md:block h-0.5 w-16 bg-gradient-to-r from-[#1a6fc4] to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1f2937] mb-3">{step.title}</h3>
                  <p className="text-[#6b7280] leading-relaxed max-w-md">{step.description}</p>
                </div>

                <div className="flex-1 relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    <img src={step.image} alt={step.title} className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a6fc4]/20 to-transparent" />
                  </div>
                  <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-[#1a6fc4]/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
