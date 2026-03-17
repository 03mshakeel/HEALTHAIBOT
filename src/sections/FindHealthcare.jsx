import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Building2, Siren, Pill, ArrowRight, MapPin, Star } from 'lucide-react';
import { healthcareStats } from '../data/healthcareData';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: Stethoscope,
    title: 'Doctors & Specialists',
    description: 'Find GPs, specialists, and consultants',
    color: '#1a6fc4',
    count: healthcareStats.doctors,
  },
  {
    icon: Building2,
    title: 'Clinics & Medical Centers',
    description: 'Locate walk-in clinics and health centers',
    color: '#28b463',
    count: healthcareStats.clinics,
  },
  {
    icon: Siren,
    title: 'Hospitals & Emergency',
    description: 'Find A&E departments and hospitals',
    color: '#e74c3c',
    count: healthcareStats.hospitals,
  },
  {
    icon: Pill,
    title: 'Pharmacies',
    description: 'Locate 24/7 pharmacies near you',
    color: '#f39c12',
    count: healthcareStats.pharmacies,
  },
];

export default function FindHealthcare({ onSearchNow }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef(null);
  const mapRef = useRef(null);

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

      const cards = cardsRef.current?.querySelectorAll('.category-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.fromTo(
        mapRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.to(mapRef.current, {
        y: -20,
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

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div ref={contentRef}>
              <h2 className="animate-item text-3xl sm:text-4xl font-bold text-[#1f2937] mb-4">
                Find Healthcare Near You
              </h2>
              <p className="animate-item text-lg text-[#6b7280] mb-8 leading-relaxed">
                Search for doctors, clinics, hospitals, and pharmacies across London. 
                Filter by specialty, rating, and availability.
              </p>
            </div>

            <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4 mb-8">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="category-card p-5 rounded-xl border-2 border-[#e5e8ed] hover:border-[#1a6fc4] transition-all duration-300 cursor-pointer group bg-white hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <category.icon className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1f2937] mb-1 group-hover:text-[#1a6fc4] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-[#6b7280] mb-2">{category.description}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                          {category.count.toLocaleString()}+
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onSearchNow} className="btn-primary flex items-center gap-2">
              Search Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div ref={mapRef} className="relative">
            <div className="bg-[#f5f7fa] rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-white p-4 border-b border-[#e5e8ed]">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
                    <input
                      type="text"
                      placeholder="Search healthcare locations..."
                      className="w-full pl-10 pr-4 py-2 bg-[#f5f7fa] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a6fc4]"
                      readOnly
                    />
                  </div>
                  <button className="px-4 py-2 bg-[#1a6fc4] text-white rounded-lg text-sm font-medium hover:bg-[#114b83] transition-colors">
                    Search
                  </button>
                </div>
              </div>

              <div className="relative h-[400px] bg-gradient-to-br from-[#e8f4fc] to-[#d4e9f7]">
                <img src="/step3-map.jpg" alt="London healthcare map" className="w-full h-full object-cover" />

                <div className="absolute bottom-4 left-4 right-4 flex gap-3 overflow-x-auto pb-2">
                  {[
                    { name: "St Thomas Hospital", type: "Hospital", rating: 4.8, reviews: 234, color: '#e74c3c' },
                    { name: "CityDoc Clinic", type: "Clinic", rating: 4.6, reviews: 128, color: '#28b463' },
                    { name: "Boots Pharmacy", type: "Pharmacy", rating: 4.5, reviews: 89, color: '#f39c12' },
                  ].map((location, index) => (
                    <div key={index} className="flex-shrink-0 bg-white rounded-xl p-3 shadow-lg min-w-[180px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${location.color}15` }}>
                          <MapPin className="w-4 h-4" style={{ color: location.color }} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[#1f2937]">{location.name}</div>
                          <div className="text-xs text-[#6b7280]">{location.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{location.rating}</span>
                        <span className="text-xs text-[#6b7280]">({location.reviews})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl bg-[#1a6fc4]/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
