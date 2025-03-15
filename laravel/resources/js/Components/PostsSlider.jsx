import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import gsap from 'gsap';
import 'swiper/css';

// Importar imágenes locales
import slide1 from '../../assets/img/Home/Seccion-Posts/Mujer.jpg';
import slide2 from '../../assets/img/Home/Seccion-Posts/creatividad.jpg';
import slide3 from '../../assets/img/Home/Seccion-Posts/embarrilado.jpg';
import slide4 from '../../assets/img/Home/Seccion-Posts/4.jpg';

const posts = [
  {
    image: slide1,
    title: 'Gran Inauguracion',
    description: 'Encuentro Mujeres Escenciales - 6 marzo 2025'
  },
  {
    image: slide2,
    title: 'Creando con Creatividad',
    description: 'Las mejores inspiraciones para reflejar el arte'
  },
  {
    image: slide3,
    title: 'Uso de los Embarrilados',
    description: 'Las mejores creaciones realizadas con embarrilados de natalia'
  },
  {
    image: slide4,
    title: 'Texturas que Cobran Vida',
    description: 'La fusión perfecta entre crochet y cristales para una joyería artesanal única.'
  }  

];

export function PostsSlider() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título (aparece desde abajo)
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animación del subrayado (expande desde el centro hacia los lados)
      gsap.from(underlineRef.current, {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-6xl font-serif text-warm-gray-800 mb-4">
            Posts Recientes
          </h2>
          <div
            ref={underlineRef}
            className="h-1 w-40 bg-gradient-to-r from-warm-gray-400 to-warm-gray-600 mx-auto"
          ></div>
        </div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            }
          }}
          className="posts-slider"
          style={{ overflowX: "clip", overflowY: "visible" }}
        >
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02] flex flex-col h-[480px]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-serif text-warm-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-warm-gray-600">
                    {post.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
