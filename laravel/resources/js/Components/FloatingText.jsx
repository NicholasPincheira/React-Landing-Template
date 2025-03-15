import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FloatingText({ 
  entryDuration = 2.5, 
  breathingDuration = 2 
}) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    // Kill previous timeline if it exists
    if (timeline.current) {
      timeline.current.kill();
    }

    const ctx = gsap.context(() => {
      // Create new timeline
      timeline.current = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" }
      });

      // Initial state
      gsap.set(text, {
        scale: 0.3,
        opacity: 0,
        rotation: -15,
        y: 300,
        x: -200,
      });

      // Build animation sequence
      timeline.current
        .to(text, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          y: 0,
          x: 0,
          duration: entryDuration,
          ease: "power2.out",
        })
        .to(text, {
          y: '+=20',
          duration: breathingDuration,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        }, "+=0.2");

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => timeline.current?.play(0),
        onLeave: () => timeline.current?.pause(),
        onEnterBack: () => timeline.current?.play(),
        onLeaveBack: () => timeline.current?.pause(),
      });
    });

    return () => {
      ctx.revert();
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, [entryDuration, breathingDuration]);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-white TextSection overflow-hidden relative min-h-[60vh] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div
          ref={textRef}
          className="text-center md:text-left transform"
        >
          <h2 className="text-4xl md:text-7xl font-serif text-warm-gray-800 mb-4 md:mb-8 leading-tight">
            The Art of Crafting
            <br className="hidden md:block" />
            Timeless Elegance
          </h2>
          <p className="text-lg md:text-2xl text-warm-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Each piece tells a story, every design reflects an emotion.
            Discover the art of contemporary jewelry.
          </p>
        </div>
      </div>
    </section>
  );
}
