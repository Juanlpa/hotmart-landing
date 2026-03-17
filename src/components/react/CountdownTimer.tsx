import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface CountdownTimerProps {
  endDate?: string;
  evergreen?: boolean;
  hours?: number;
  title?: string;
  expiredMessage?: string;
  storageKey?: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getEvergreenEnd(hours: number, key: string): Date {
  if (typeof window === 'undefined') return new Date();

  const stored = localStorage.getItem(key);
  if (stored) {
    const end = new Date(stored);
    if (end > new Date()) return end;
  }

  const end = new Date(Date.now() + hours * 60 * 60 * 1000);
  localStorage.setItem(key, end.toISOString());
  return end;
}

function calculateTimeLeft(endDate: Date): TimeLeft | null {
  const diff = endDate.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-gray-900 text-white text-2xl md:text-4xl font-bold rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[3rem] md:min-w-[4rem] text-center tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm text-gray-500 mt-1 uppercase">{label}</span>
    </div>
  );
}

export default function CountdownTimer({
  endDate,
  evergreen = false,
  hours = 24,
  title = '¡Esta oferta expira en:',
  expiredMessage = '¡La oferta ha expirado!',
  storageKey,
  className,
}: CountdownTimerProps) {
  const key = storageKey || 'hotmart_countdown_end';
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = evergreen
      ? getEvergreenEnd(hours, key)
      : endDate
        ? new Date(endDate)
        : new Date(Date.now() + hours * 60 * 60 * 1000);

    setTimeLeft(calculateTimeLeft(target));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, evergreen, hours, key]);

  if (!mounted) return null;

  return (
    <div className={clsx('text-center py-8', className)}>
      <p className="text-lg md:text-xl font-semibold mb-4">{title}</p>

      {timeLeft ? (
        <div className="flex justify-center gap-3 md:gap-4">
          {timeLeft.days > 0 && <TimeUnit value={timeLeft.days} label="Días" />}
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>
      ) : (
        <p className="text-red-600 font-bold text-lg">{expiredMessage}</p>
      )}
    </div>
  );
}
