import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

// Importar imágenes locales
import amulet1 from '../../assets/img/Home/Seccion-Amuletos/Amuleto-1.png';
import amulet2 from '../../assets/img/Home/Seccion-Amuletos/Amuleto-2.png';
import amulet3 from '../../assets/img/Home/Seccion-Amuletos/Amuleto-3.png';
import amulet4 from '../../assets/img/Home/Seccion-Amuletos/Amuleto-4.png';
import amulet5 from '../../assets/img/Home/Seccion-Amuletos/Amuleto-5.png';

// Lista de imágenes
const amulets = [amulet1, amulet2, amulet3, amulet4, amulet5];

export function AmuletExhibition() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nueva animación del subrayado desde la derecha
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: 'right' },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación de los amuletos
      gsap.from('.amulet-item', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden AmuletSection bg-[#fdfaf3] mb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título con subrayado recto y animado desde la derecha */}
        <div ref={titleRef} className="text-center relative amuletTitleContainer">
          <h2 className="text-6xl font-serif text-warm-gray-800 inline-block">
            Amuletos Pictóricos
          </h2>
          <div
            ref={underlineRef}
            className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-36 h-1 bg-gradient-to-r from-warm-gray-400 to-warm-gray-600 origin-right"
          />
        </div>

        {/* Vista Desktop */}
        <div className="hidden md:flex justify-center items-center gap-8 mb-16">
          {amulets.map((amulet, index) => (
            <div key={index} className="amulet-item w-48 h-48 relative group cursor-pointer">
              <div className="absolute inset-0 rounded-full overflow-hidden transform transition-transform duration-500 group-hover:scale-105">
                <img src={amulet} alt={`Amulet ${index + 1}`} className="w-full h-full object-cover AmuletItemPng" />
              </div>
            </div>
          ))}
        </div>

        {/* Vista Mobile */}
        <div className="md:hidden mobileAmuletSlider">
          <Swiper modules={[FreeMode]} slidesPerView={2.5} spaceBetween={20} freeMode={true} className="amulet-slider">
            {amulets.map((amulet, index) => (
              <SwiperSlide key={index}>
                <div className="amulet-item w-32 h-32 relative">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img src={amulet} alt={`Amulet ${index + 1}`} className="w-full h-full object-cover AmuletItemPng" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
