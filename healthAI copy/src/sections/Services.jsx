import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, MapPin, Siren, Activity, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({ icon: Icon, title, description, cta, onClick, delay, color }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, rotateY: -90 },
        {
          opacity: 1,
          rotateY: 0,
          duration: 0.7,
          delay,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [delay]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-400 group-hover:scale-110 group-hover:rotate-6`} style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-8 h-8" style={{ color }} />
      </div>

      <h3 className="text-xl font-bold text-[#1f2937] mb-3">{title}</h3>
      <p className="text-[#6b7280] mb-6 leading-relaxed">{description}</p>

      <button className="flex items-center gap-2 text-[#1a6fc4] font-semibold group/btn" onClick={(e) => { e.stopPropagation(); onClick(); }}>
        {cta}
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
      </button>
    </div>
  );
}

export default function Services({ onChatClick, onFindClick, onHealthCheckClick }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.word') || [],
        { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: MessageSquare,
      title: 'AI Health Chatbot',
      description: 'Get instant answers to your health questions from our AI-powered chatbot, available 24/7.',
      cta: 'Chat Now',
      onClick: onChatClick,
      color: '#1a6fc4',
    },
    {
      icon: Activity,
      title: 'Health Check',
      description: 'Use our CNN-based disease risk prediction tool to assess symptoms and get recommendations.',
      cta: 'Check Now',
      onClick: onHealthCheckClick,
      color: '#28b463',
    },
    {
      icon: MapPin,
      title: 'Find Healthcare',
      description: 'Locate doctors, clinics, hospitals, and pharmacies near you with real-time availability.',
      cta: 'Search Locations',
      onClick: onFindClick,
      color: '#f39c12',
    },
    {
      icon: Siren,
      title: 'Emergency Assistance',
      description: 'Quick access to emergency services and first aid guidance when every second counts.',
      cta: 'Learn More',
      onClick: onFindClick,
      color: '#e74c3c',
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-gradient-to-b from-[#f5f7fa] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1f2937] mb-4">
            {'Our Services'.split(' ').map((word, i) => (
              <span key={i} className="word inline-block mr-2">{word}</span>
            ))}
          </h2>
          <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
            Comprehensive healthcare solutions powered by artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: '1000px' }}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} delay={0.6 + index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
