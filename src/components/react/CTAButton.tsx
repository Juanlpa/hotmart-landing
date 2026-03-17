import { motion } from 'framer-motion';
import clsx from 'clsx';
import { fireTrackingEvent } from '../../config/tracking';

interface CTAButtonProps {
  href: string;
  text?: string;
  subtext?: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg' | 'xl';
  pulse?: boolean;
  glow?: boolean;
  productSlug?: string;
  className?: string;
}

export default function CTAButton({
  href,
  text = '¡QUIERO ACCEDER AHORA!',
  subtext,
  variant = 'primary',
  size = 'lg',
  pulse = true,
  glow = true,
  productSlug,
  className,
}: CTAButtonProps) {
  const handleClick = () => {
    fireTrackingEvent({
      event: 'InitiateCheckout',
      productSlug,
      contentName: text,
    });
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={clsx(
        'inline-block text-center font-bold rounded-xl transition-all cursor-pointer no-underline',
        {
          'bg-green-500 hover:bg-green-600 text-white': variant === 'primary',
          'bg-yellow-400 hover:bg-yellow-500 text-gray-900': variant === 'secondary',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg md:text-xl': size === 'lg',
          'px-10 py-5 text-xl md:text-2xl': size === 'xl',
        },
        pulse && 'animate-pulse-cta',
        glow && 'animate-glow',
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="block">{text}</span>
      {subtext && (
        <span className="block text-xs md:text-sm font-normal opacity-80 mt-1">
          {subtext}
        </span>
      )}
    </motion.a>
  );
}
