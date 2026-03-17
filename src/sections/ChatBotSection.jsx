import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, MessageCircle, Pill, HeartPulse, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ChatBotSection({ onTryItNow }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const mockupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.animate-item') || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        mockupRef.current,
        { opacity: 0, rotateY: 30, x: 100 },
        {
          opacity: 1,
          rotateY: 0,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mockupRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.to(mockupRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: HeartPulse, text: 'Symptom assessment and guidance' },
    { icon: Pill, text: 'Medication information and reminders' },
    { icon: MessageCircle, text: 'General health and wellness tips' },
    { icon: AlertCircle, text: 'Emergency first aid instructions' },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#1a6fc4] to-[#114b83] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <h2 className="animate-item text-3xl sm:text-4xl font-bold text-white mb-6">
              Ask Anything About Your Health
            </h2>
            <p className="animate-item text-lg text-white/80 mb-8 leading-relaxed">
              Our AI-powered chatbot provides instant answers to your health questions, 
              symptom checks, and medication guidance—anytime, anywhere.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="animate-item flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <feature.icon className="w-5 h-5 text-white/80" />
                  <span className="text-white/90">{feature.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onTryItNow}
              className="animate-item bg-white text-[#1a6fc4] px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Try It Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div ref={mockupRef} className="relative" style={{ perspective: '1000px' }}>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto animate-float">
              <div className="bg-gradient-to-r from-[#1a6fc4] to-[#114b83] p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">HealthBot AI</div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/70 text-sm">Online</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4 bg-[#f5f7fa] min-h-[300px]">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#1a6fc4] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-[#1f2937]">
                      Hello! I'm HealthBot, your AI health assistant. How can I help you today?
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <div className="bg-[#1a6fc4] rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-white">
                      I've been having headaches lately. What could be causing them?
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#1a6fc4] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-[#1f2937]">
                      Headaches can have various causes including stress, dehydration, 
                      eye strain, or lack of sleep. If they persist or are severe, 
                      please consult a doctor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#1a6fc4] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#1a6fc4] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-2 h-2 bg-[#1a6fc4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 bg-[#1a6fc4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-[#e5e8ed]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-[#f5f7fa] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                    readOnly
                  />
                  <button className="w-10 h-10 bg-[#1a6fc4] rounded-full flex items-center justify-center text-white hover:bg-[#114b83] transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute -inset-4 bg-white/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
