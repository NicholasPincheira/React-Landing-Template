import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { FullScreenMenu } from './FullScreenMenu';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(true);
  const [activePage, setActivePage] = useState('inicio');
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);

  // Para recordar la posición de scroll antes de fijar el body
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsHeroActive(rect.bottom > 0 && rect.top < window.innerHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear el scroll sin perder la posición
  useEffect(() => {
    if (isMenuOpen) {
      scrollPosRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosRef.current);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={clsx(
        'navbar fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300',
        isMenuOpen ? 'mobile-menu-open' : isScrolled ? 'navbar-scrolled' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a 
            href="/"
            className={clsx(
              "text-2xl font-serif relative z-50 transition-colors duration-300",
              isHeroActive && !isMenuOpen ? "text-white" : "text-black"
            )}
          >
            Natalia Piderit
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['inicio', 'nosotros', 'galería', 'contacto'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={clsx(
                  "nav-link capitalize transition-all duration-300 relative",
                  isHeroActive && !isMenuOpen ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600",
                  activePage === item && "active"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(item);
                }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setIsFullScreenMenuOpen(true)}
              className={clsx(
                "nav-link capitalize transition-all duration-300 relative px-4 py-2 border-2",
                isHeroActive && !isMenuOpen 
                  ? "text-white hover:text-gray-300 border-white hover:bg-white hover:bg-opacity-10" 
                  : "text-black hover:text-gray-600 border-black hover:bg-black hover:bg-opacity-5"
              )}
            >
              Menu
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={clsx(
              "md:hidden relative z-50 transition-colors duration-300",
              isHeroActive && !isMenuOpen ? "text-white" : "text-black"
            )}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Renderizamos el MobileMenu en un portal */}
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activePage={activePage}
        setActivePage={setActivePage}
        setIsFullScreenMenuOpen={setIsFullScreenMenuOpen}
      />

      <FullScreenMenu 
        isOpen={isFullScreenMenuOpen}
        onClose={() => setIsFullScreenMenuOpen(false)}
      />
    </>
  );
}
