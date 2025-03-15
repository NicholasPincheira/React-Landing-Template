import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import image1 from "../../assets/img/Home/Seccion-1/artesania.jpeg";
import image2 from "../../assets/img/Home/Seccion-1/gray.jpg";
import image3 from "../../assets/img/Home/Seccion-1/joyeria.jpeg";

const galleryItems = [
  {
    image: image1,
    title: "Artesanía en Plata",
    description: "Cada pieza es única, creada con dedicación y atención al detalle.",
    align: "right",
  },
  {
    image: image2,
    title: "Diseños Contemporáneos",
    description: "Fusionamos la tradición con tendencias modernas.",
    align: "left",
  },
  {
    image: image3,
    title: "Colecciones Exclusivas",
    description: "Piezas que reflejan tu personalidad única.",
    align: "right",
  },
];

export function Gallery() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      // Animación del subrayado
      gsap.from(underlineRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      document.querySelectorAll(".gallery-item").forEach((item) => {
        const imageWrapper = item.querySelector(".image-wrapper");
        const content = item.querySelector(".content-wrapper");
        const liquidOverlay = imageWrapper.querySelector(".liquid-overlay");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from([imageWrapper, content], {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        }).fromTo(
          liquidOverlay,
          { x: "-100%" },
          {
            x: "100%",
            duration: 1.5,
            ease: "power2.inOut",
          },
          0
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden mb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título con subrayado animado */}
        <div className="text-center relative mb-16">
          <h2 ref={titleRef} className="text-6xl font-serif text-warm-gray-800 inline-block">
            Creaciones Únicas
          </h2>
          <div
            ref={underlineRef}
            className="h-1 w-40 bg-gradient-to-r from-warm-gray-400 to-warm-gray-600 mt-4 mx-auto"
          ></div>
        </div>

        <div className="space-y-32">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`gallery-item flex flex-col md:flex-row items-center gap-12 ${
                item.align === "left" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Contenedor de la imagen */}
              <div className="w-full md:w-1/2 relative overflow-hidden image-wrapper">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[300px] md:h-[600px] object-cover rounded-lg"
                  />
                  <div className="liquid-overlay absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-x-full" />

                  {/* Contenido dentro de la imagen en MOBILE */}
                  <div className="block md:hidden absolute inset-x-0 bottom-1/3 bg-white/70 p-4 text-center shadow-lg">
                    <h3 className="text-2xl font-serif text-warm-gray-800">{item.title}</h3>
                    <p className="text-sm text-warm-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>

              {/* Contenido normal en DESKTOP */}
              <div className="hidden md:block w-full md:w-1/2 text-center md:text-left content-wrapper">
                <h3 className="text-4xl font-serif text-warm-gray-800 mb-6">{item.title}</h3>
                <p className="text-lg text-warm-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
