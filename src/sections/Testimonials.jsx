import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.animate-item') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        carouselRef.current?.querySelectorAll('.testimonial-card') || [],
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">


        </div>

        <div ref={carouselRef} className="relative">
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Quote className="w-10 h-10 text-[#1a6fc4]/20 mb-4 group-hover:text-[#1a6fc4]/40 transition-colors" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-[#4b5563] mb-6 leading-relaxed text-sm">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-[#1f2937]">{testimonial.name}</div>
                    <div className="text-sm text-[#6b7280]">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <Quote className="w-10 h-10 text-[#1a6fc4]/20 mb-4" />
                      
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>

                      <p className="text-[#4b5563] mb-6 leading-relaxed text-sm">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center gap-3">
                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-[#1f2937]">{testimonial.name}</div>
                          <div className="text-sm text-[#6b7280]">{testimonial.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1a6fc4] hover:bg-[#1a6fc4] hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1a6fc4] hover:bg-[#1a6fc4] hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-6 bg-[#1a6fc4]' : 'bg-[#e5e8ed]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
