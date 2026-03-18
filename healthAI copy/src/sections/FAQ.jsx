import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Is HealthBot free to use?',
    answer: 'Yes, HealthBot is completely free for all users. We believe everyone deserves access to healthcare information. Our mission is to make healthcare accessible to all Londoners without any cost barriers.',
  },
  {
    question: 'How accurate is the AI chatbot?',
    answer: 'Our AI is trained on verified medical data and achieves 98% accuracy. However, it\'s important to note that HealthBot is not a replacement for professional medical advice. Always consult a healthcare professional for serious concerns.',
  },
  {
    question: 'Can I book appointments through the app?',
    answer: 'Yes, you can book appointments directly with healthcare providers who have partnered with us. We\'re continuously expanding our network of partner clinics and hospitals across London.',
  },
  {
    question: 'Is my health data secure?',
    answer: 'Absolutely. We use end-to-end encryption and are fully GDPR compliant. Your data is never shared without consent, and we follow strict data protection protocols to ensure your privacy.',
  },
  {
    question: 'Which areas of London are covered?',
    answer: 'We cover all London boroughs with comprehensive listings of healthcare providers across the city. From Camden to Croydon, Westminster to Waltham Forest, you\'ll find healthcare options near you.',
  },
  {
    question: 'Can I use HealthBot for emergencies?',
    answer: 'HealthBot can help you find the nearest A&E departments and emergency services. However, for life-threatening emergencies, always call 999 immediately. Our emergency feature is designed to help you find care quickly, not replace emergency services.',
  },
];

export default function FAQ() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const faqRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

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

      const faqItems = faqRef.current?.querySelectorAll('.faq-item');
      faqItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="animate-item text-3xl sm:text-4xl font-bold text-[#1f2937] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="animate-item text-lg text-[#6b7280]">
            Find answers to common questions about HealthBot
          </p>
        </div>

        <div ref={faqRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-[#1a6fc4] bg-[#1a6fc4]/5' : 'border-[#e5e8ed] hover:border-[#1a6fc4]/50 hover:bg-[#1a6fc4]/5'
              }`}
            >
              <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-[#1f2937] pr-4">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openIndex === index ? 'bg-[#1a6fc4] text-white rotate-180' : 'bg-[#f5f7fa] text-[#1a6fc4]'
                }`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-400 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-5 pb-5">
                  <div className="h-px bg-[#e5e8ed] mb-4" />
                  <p className="text-[#4b5563] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
