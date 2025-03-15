import { useEffect, useRef } from 'react';
import { Gem, Palette, Sparkles, Brush } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import workshop1 from '../../assets/img/Home/Seccion-Talleres/t1.jpg';
import workshop2 from '../../assets/img/Home/Seccion-Talleres/t2.jpg';
import workshop3 from '../../assets/img/Home/Seccion-Talleres/t3.jpg';
import workshop4 from '../../assets/img/Home/Seccion-Talleres/t4.jpg';

gsap.registerPlugin(ScrollTrigger);

const workshops = [
  {
    title: 'Arte en Metales',
    description: 'Explora la fusión entre arte y joyería.',
    icon: Gem,
    color: 'from-purple-500 to-pink-500',
    image: workshop4
  },
  {
    title: 'Diseño Creativo',
    description: 'Desarrolla tu estilo único en el diseño de joyas.',
    icon: Palette,
    color: 'from-blue-500 to-teal-500',
    image: workshop3
  },
  {
    title: 'Técnicas de costura',
    description: 'Domina técnicas para construir tu arte con tejidos.',
    icon: Brush,
    color: 'from-amber-500 to-orange-500',
    image: workshop2
  },
  {
    title: 'Procesos Quimicos',
    description: 'Explora creaciones con resina exposica, reacciones para crear tu obra.',
    icon: Sparkles,
    color: 'from-emerald-500 to-lime-500',
    image: workshop1
  }
];

export function Workshops() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title decoration animation
      const path = titleRef.current.querySelector('path');
      const length = path.getTotalLength();
      
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={titleRef} className="relative mb-16 text-center">
          <h2 className="text-6xl font-serif text-warm-gray-800 inline-block">
            Talleres
          </h2>
          <svg
            className="absolute left-1/2 -bottom-4 transform -translate-x-1/2"
            width="200"
            height="20"
            viewBox="0 0 200 20"
          >
            <path
              d="M0,10 C50,0 150,0 200,10"
              fill="none"
              stroke="#D1A77D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workshops.map((workshop, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className={`absolute inset-0 bg-gradient-to-br ${workshop.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="p-8">
                <div className="relative z-10 mb-6 text-center transform transition-transform duration-300 group-hover:-translate-y-2">
                  <workshop.icon className="w-12 h-12 mx-auto text-warm-gray-800" />
                </div>
                
                <div className="relative z-10 text-center transform transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-2xl font-serif text-warm-gray-800 mb-4">
                    {workshop.title}
                  </h3>
                  <p className="text-warm-gray-600">
                    {workshop.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}