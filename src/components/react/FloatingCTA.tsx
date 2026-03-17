import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface FloatingCTAProps {
  href: string;
  text?: string;
  showAfterPx?: number;
  className?: string;
}

export default function FloatingCTA({
  href,
  text = '¡COMPRAR AHORA!',
  showAfterPx = 600,
  className,
}: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > showAfterPx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterPx]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: bottom bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={clsx(
              'fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden',
              className,
            )}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold text-lg py-3.5 rounded-xl transition-colors"
            >
              {text}
            </a>
          </motion.div>

          {/* Desktop: sidebar derecho */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="hidden md:block fixed right-5 top-1/2 -translate-y-1/2 z-50"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold py-4 px-5 rounded-2xl transition-all shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="text-sm whitespace-nowrap">{text}</span>
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
