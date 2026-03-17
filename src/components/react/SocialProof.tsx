import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialProofProps {
  names?: string[];
  locations?: string[];
  productName?: string;
  intervalMs?: number;
}

const DEFAULT_NAMES = [
  'María G.', 'Carlos R.', 'Ana P.', 'José M.', 'Laura S.',
  'Pedro H.', 'Sofía T.', 'Diego L.', 'Camila V.', 'Andrés F.',
];

const DEFAULT_LOCATIONS = [
  'São Paulo', 'Buenos Aires', 'Ciudad de México', 'Lima', 'Bogotá',
  'Santiago', 'Madrid', 'Medellín', 'Monterrey', 'Quito',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMinutesAgo(): number {
  return Math.floor(Math.random() * 30) + 1;
}

export default function SocialProof({
  names = DEFAULT_NAMES,
  locations = DEFAULT_LOCATIONS,
  productName = 'el curso',
  intervalMs = 8000,
}: SocialProofProps) {
  const [notification, setNotification] = useState<{
    name: string;
    location: string;
    minutes: number;
  } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => {
      setNotification({
        name: randomItem(names),
        location: randomItem(locations),
        minutes: randomMinutesAgo(),
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const timeout = setTimeout(show, 3000);
    const interval = setInterval(show, intervalMs);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [names, locations, intervalMs]);

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-xs">
      <AnimatePresence>
        {visible && notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl border border-gray-200 p-3 flex items-center gap-3"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">
                {notification.name}
              </p>
              <p className="text-gray-500">
                compró {productName} hace {notification.minutes} min
              </p>
              <p className="text-xs text-gray-400">{notification.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
