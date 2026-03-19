import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fireTrackingEvent } from '../../config/tracking';

interface ExitIntentModalProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaHref: string;
  discount?: string;
  productSlug?: string;
}

export default function ExitIntentModal({
  headline = '¡Espera! No te vayas todavía...',
  subtext = 'Tenemos una oferta especial exclusiva para ti.',
  ctaText = '¡SÍ, QUIERO ESTA OFERTA!',
  ctaHref,
  discount,
  productSlug,
}: ExitIntentModalProps) {
  const [show, setShow] = useState(false);
  const storageKey = `exit_modal_shown_${productSlug || 'default'}`;

  useEffect(() => {
    // Only on desktop — mobile doesn't have reliable exit intent
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const alreadyShown = sessionStorage.getItem(storageKey);
    if (alreadyShown) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem(storageKey, 'true');
        document.removeEventListener('mouseleave', handler);
        fireTrackingEvent({ event: 'Lead', productSlug, contentName: 'exit_intent_modal' });
      }
    };

    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, [storageKey]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Cerrar"
            >
              ×
            </button>

            {discount && (
              <span className="inline-block bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                {discount} DE DESCUENTO
              </span>
            )}

            <h3 className="text-2xl md:text-3xl font-bold mb-3">{headline}</h3>
            <p className="text-gray-600 mb-6">{subtext}</p>

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fireTrackingEvent({ event: 'InitiateCheckout', productSlug, contentName: ctaText })}
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors animate-pulse-cta"
            >
              {ctaText}
            </a>

            <p className="text-xs text-gray-400 mt-4">
              No gracias,{' '}
              <button
                onClick={() => setShow(false)}
                className="underline hover:text-gray-600"
              >
                prefiero pagar el precio completo
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
