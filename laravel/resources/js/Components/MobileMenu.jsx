import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import clsx from 'clsx';

export function MobileMenu({ isMenuOpen, setIsMenuOpen, activePage, setActivePage, setIsFullScreenMenuOpen }) {
  return createPortal(
    <div 
      className={clsx(
        "mobile-menu-overlay fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-500 z-[9999]",
        isMenuOpen ? "opacity-100 flex" : "opacity-0 pointer-events-none"
      )}
      style={{ willChange: "opacity" }}
    >
      {/* Botón de cierre dentro del overlay */}
      <button
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-4 right-4 z-50 text-black hover:text-gray-600 transition-colors"
      >
        <X size={24} />
      </button>
      
      <div 
        className={clsx(
          "mobile-menu-content bg-white shadow-lg max-w-md mx-auto flex flex-col items-center justify-center w-full h-full transition-transform duration-500",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
        style={{ willChange: "transform" }}
      >
        {['inicio', 'nosotros', 'galería', 'contacto'].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className={clsx(
              "menu-item block text-2xl font-serif text-black hover:text-gray-600 capitalize mb-4",
              activePage === item && "active"
            )}
            onClick={() => {
              setActivePage(item);
              setIsMenuOpen(false);
            }}
          >
            {item}
          </a>
        ))}
        <button
          onClick={() => {
            setIsMenuOpen(false);
            setIsFullScreenMenuOpen(true);
          }}
          className="menu-item block text-2xl font-serif text-black hover:text-gray-600 capitalize mt-4 px-6 py-2 border-2 border-black hover:bg-black hover:bg-opacity-5"
        >
          Menu
        </button>
      </div>
    </div>,
    document.body
  );
}
