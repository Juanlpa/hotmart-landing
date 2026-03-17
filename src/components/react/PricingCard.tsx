import { motion } from 'framer-motion';
import clsx from 'clsx';

interface PricingCardProps {
  originalPrice: number;
  currentPrice: number;
  currency?: string;
  installments?: { count: number; value: number };
  ctaText?: string;
  ctaHref: string;
  features?: string[];
  badge?: string;
  className?: string;
  onCtaClick?: () => void;
}

function formatPrice(value: number, currency: string): string {
  return new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'es', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PricingCard({
  originalPrice,
  currentPrice,
  currency = 'BRL',
  installments,
  ctaText = '¡COMPRAR AHORA!',
  ctaHref,
  features,
  badge = 'OFERTA ESPECIAL',
  className,
  onCtaClick,
}: PricingCardProps) {
  const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={clsx(
        'relative bg-white rounded-2xl shadow-2xl border-2 border-green-500 p-6 md:p-8 max-w-md mx-auto',
        className,
      )}
    >
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
            {badge}
          </span>
        </div>
      )}

      <div className="text-center mt-2">
        <p className="text-gray-500 text-sm mb-1">De</p>
        <p className="text-gray-400 line-through text-xl">
          {formatPrice(originalPrice, currency)}
        </p>

        <p className="text-green-600 text-sm font-semibold mt-2">
          {discount}% DE DESCUENTO
        </p>

        <p className="text-gray-500 text-sm mt-2">Por apenas</p>
        <p className="text-4xl md:text-5xl font-extrabold text-gray-900 my-2">
          {formatPrice(currentPrice, currency)}
        </p>

        {installments && (
          <p className="text-sm text-gray-500">
            o {installments.count}x de {formatPrice(installments.value, currency)}
          </p>
        )}
      </div>

      {features && features.length > 0 && (
        <ul className="mt-6 space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500 flex-shrink-0">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCtaClick}
        className="block mt-6 bg-green-500 hover:bg-green-600 text-white text-center text-lg md:text-xl font-bold py-4 rounded-xl transition-colors animate-pulse-cta"
      >
        {ctaText}
      </a>

      <p className="text-center text-xs text-gray-400 mt-3">
        <svg className="inline-block w-3.5 h-3.5 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        Compra segura · Pago procesado por Hotmart
      </p>
    </motion.div>
  );
}
