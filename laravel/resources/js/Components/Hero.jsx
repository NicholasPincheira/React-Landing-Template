import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Importar imágenes
import slider1 from "../../assets/img/Home/Slider-Principal/slider-1.jpg";
import slider2 from "../../assets/img/Home/Slider-Principal/slider-2.jpg";

export function Hero() {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [text, setText] = useState('"Joyas que hablan de ti"');
  const bgRef1 = useRef(null);
  const bgRef2 = useRef(null);

  useEffect(() => {
    // Animación inicial del texto
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // ScrollTrigger para cambiar el texto al hacer scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "50% top",
      scrub: true,
      onEnter: () => gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setText('"Diseños únicos y atemporales"');
          gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
        }
      }),
      onLeaveBack: () => gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setText('"Joyas que hablan de ti"');
          gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
        }
      }),
    });

    // Timeline para el efecto fade de los fondos
    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: 2 });
    tl.to(bgRef1.current, { opacity: 0, duration: 2 })
      .to(bgRef2.current, { opacity: 1, duration: 2 }, "-=2")
      .to(bgRef2.current, { opacity: 0, duration: 2, delay: 4 })
      .to(bgRef1.current, { opacity: 1, duration: 2 }, "-=2");

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-section relative h-screen overflow-hidden">
      {/* Imágenes con fade GSAP */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div ref={bgRef1} className="absolute inset-0 bg-cover bg-center HeroSliderBackground-1 transition-opacity" style={{ backgroundImage: `url(${slider1})` }} />
        <div ref={bgRef2} className="absolute inset-0 bg-cover bg-center HeroSliderBackground-2 transition-opacity opacity-0" style={{ backgroundImage: `url(${slider2})` }} />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Contenido del Hero (Textos y Flecha) */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 ref={textRef} className="text-5xl md:text-7xl font-serif text-white max-w-4xl mx-auto px-4 italic">
          {text}
        </h1>

        {/* Flechita de Scroll */}
        <div className="absolute bottom-10 flex flex-col items-center">
          <ChevronDown className="text-white w-6 h-6 scroll-arrow opacity-80" />
        </div>
      </div>
    </div>
  );
}
