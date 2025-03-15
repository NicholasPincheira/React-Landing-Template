import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

// Importar imágenes locales
import slide1 from '../../assets/img/Home/Seccion-Exibicion/jc1.jpg';
import slide2 from '../../assets/img/Home/Seccion-Exibicion/c2.jpg';
import slide3 from '../../assets/img/Home/Seccion-Exibicion/j3.jpg';
import slide4 from '../../assets/img/Home/Seccion-Exibicion/p4.jpg';
import slide5 from '../../assets/img/Home/Seccion-Exibicion/p5.jpg';
import slide6 from '../../assets/img/Home/Seccion-Exibicion/j6.jpg';
import slide7 from '../../assets/img/Home/Seccion-Exibicion/j7.jpg';
import slide8 from '../../assets/img/Home/Seccion-Exibicion/j8.jpg';
import slide9 from '../../assets/img/Home/Seccion-Exibicion/new/aro.jpg';
import slide10 from '../../assets/img/Home/Seccion-Exibicion/new/gray.jpg';

const sliderImages = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8,slide9,slide10];

export function DynamicSlider() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      });

      // Animación del subrayado
      gsap.from(underlineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-[95vw] mx-auto">
        {/* Título con subrayado animado */}
        <div className="text-center mb-16 relative">
          <h2 ref={titleRef} className="text-6xl font-serif text-warm-gray-800 inline-block">
            Obra Artística
          </h2>
          <div
            ref={underlineRef}
            className="h-1 w-40 bg-gradient-to-r from-warm-gray-400 to-warm-gray-600 mt-4 mx-auto"
          ></div>
        </div>

        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={30}
          freeMode={true}
          loop={false}
          centeredSlides={false}
          watchOverflow={true}
          speed={800}
          className="dynamic-slider !overflow-visible"
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide
              key={index}
              className="!w-[280px] md:!w-[380px] transition-all duration-500"
            >
              <div className="w-full aspect-[3/4] overflow-hidden rounded-lg transform-gpu transition-transform duration-500 hover:scale-105">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
