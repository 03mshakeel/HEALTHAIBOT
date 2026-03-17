import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Target, Clock, Building2 } from 'lucide-react';
import { healthcareStats } from '../data/healthcareData';

gsap.registerPlugin(ScrollTrigger);

function StatItem({ icon: Icon, value, label, suffix, delay }) {
  const itemRef = useRef(null);
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      ScrollTrigger.create({
        trigger: itemRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: numericValue,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                setCount(Math.floor(this.targets()[0].val));
              },
            }
          );
        },
        once: true,
      });
    }, itemRef);

    return () => ctx.revert();
  }, [numericValue, delay]);

  const displayValue = value.toString().includes('+') ? `${count.toLocaleString()}+` : 
                      value.toString().includes('%') ? `${count}%` : 
                      value.toString().includes('/') ? `${count}/7` : 
                      `${count.toLocaleString()}${suffix}`;

  return (
    <div ref={itemRef} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 card-3d">
      <div className="w-14 h-14 bg-gradient-to-br from-[#1a6fc4]/10 to-[#1a6fc4]/20 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[#1a6fc4]" />
      </div>
      <div className="text-4xl font-bold text-[#1f2937] mb-2" style={{ textShadow: '0 0 20px rgba(26, 111, 196, 0.3)' }}>
        {displayValue}
      </div>
      <div className="text-sm text-[#6b7280]">{label}</div>
    </div>
  );
}

export default function Statistics() {
  const sectionRef = useRef(null);

  const stats = [
    { icon: Users, value: healthcareStats.total, label: 'Healthcare Providers', suffix: '+' },
    { icon: Target, value: '98', label: 'Accuracy Rate', suffix: '%' },
    { icon: Clock, value: '24', label: 'AI Support', suffix: '/7' },
    { icon: Building2, value: '32', label: 'London Boroughs', suffix: '' },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
