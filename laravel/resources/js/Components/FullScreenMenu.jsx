import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

const menuCategories = [
  {
    title: 'Amulets',
    subcategories: ['Amuletos grandes', 'Amuletos artesanales', 'Colección especial']
  },
  {
    title: 'Jewelry',
    subcategories: ['Anillos', 'Collares', 'Pulseras', 'Pendientes']
  },
  {
    title: 'Collections',
    subcategories: ['Primavera 2024', 'Clásicos', 'Edición limitada']
  },
  {
    title: 'Workshops',
    subcategories: ['Básico', 'Avanzado', 'Masterclass']
  }
];

export function FullScreenMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const closeButtonRef = useRef(null);
  const tl = useRef(null);
  const hasMounted = useRef(false);

  // 1) Crear timeline con useLayoutEffect
  useLayoutEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const closeBtn = closeButtonRef.current;
    const items = menu?.querySelectorAll('.menu-category');
    if (!menu || !overlay || !content || !closeBtn || !items) return;

    tl.current = gsap.timeline({
      paused: true,
      onComplete: () => {
        document.body.style.overflow = 'hidden';
      },
      onReverseComplete: () => {
        gsap.set(menu, { display: 'none', visibility: 'hidden' });
        document.body.style.overflow = '';
      },
    });

    // NOTA: No forzamos display: flex/visible al inicio.
    // Dejamos "display: none" y "visibility: hidden" (vía inline style en <div>).
    tl.current.set(closeBtn, { opacity: 0, scale: 0.8 });
    tl.current.set(overlay, { opacity: 0 });
    tl.current.set(content, { y: 50, opacity: 0 });
    tl.current.set(items, { y: 30, opacity: 0 });

    tl.current
      .to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.inOut' }, 0)
      .to(content, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.1')
      .to(items, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' }, '-=0.3')
      .to(closeBtn, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out' }, '-=0.2');

    // Arrancamos "cerrado"
    tl.current.progress(0).pause();
    hasMounted.current = true;
  }, []);

  // 2) Cada vez que isOpen cambie
  useLayoutEffect(() => {
    if (!tl.current) return;
    if (!hasMounted.current) return;

    const menu = menuRef.current;
    if (isOpen) {
      // Mostramos el menú antes de reproducir
      gsap.set(menu, { display: 'flex', visibility: 'visible' });
      tl.current.play(0);
    } else {
      tl.current.reverse();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50"
      style={{ display: 'none', visibility: 'hidden' }} // Oculto inicial
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black bg-opacity-95 z-0"
        onClick={handleClose}
      />
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-20"
      >
        <X size={32} />
      </button>

      <div ref={contentRef} className="relative z-10 h-full overflow-y-auto overscroll-contain w-full">
       <div className="w-full h-full md:max-w-7xl md:mx-auto px-4 py-6 md:py-16 flex flex-col md:items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {menuCategories.map((category, index) => (
              <div key={index} className="menu-category">
                <h3 className="text-white text-2xl font-serif mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-4">
                  {category.subcategories.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors text-lg"
                        onClick={(e) => {
                          e.preventDefault();
                          handleClose();
                        }}
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}