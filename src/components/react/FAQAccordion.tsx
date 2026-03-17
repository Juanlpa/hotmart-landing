import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQ } from '../../config/products';
import clsx from 'clsx';

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

function FAQItem({
  question,
  answer,
  isOpen,
  toggle,
  dark,
}: FAQ & { isOpen: boolean; toggle: () => void; dark: boolean }) {
  return (
    <div className={clsx(
      'border-b',
      dark ? 'border-white/10' : 'border-gray-200',
    )}>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
      >
        <span className={clsx(
          'text-base md:text-lg font-semibold pr-4 transition-colors',
          dark
            ? 'text-white group-hover:text-gray-300'
            : 'text-gray-900 group-hover:text-gray-700',
        )}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={clsx('flex-shrink-0', dark ? 'text-gray-500' : 'text-gray-400')}
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className={clsx(
              'pb-5 text-sm md:text-base leading-relaxed',
              dark ? 'text-gray-400' : 'text-gray-600',
            )}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({
  faqs,
  title = 'Preguntas Frecuentes',
  theme = 'light',
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dark = theme === 'dark';

  return (
    <section className={clsx(
      'py-16 md:py-24 px-4',
      dark ? 'bg-transparent' : 'bg-gray-50',
      className,
    )}>
      <div className="max-w-3xl mx-auto">
        <h2 className={clsx(
          'text-2xl md:text-4xl font-bold text-center mb-12 uppercase tracking-tight',
          dark ? 'text-white' : 'text-gray-900',
        )}>
          {title}
        </h2>
        <div className={clsx(
          dark && 'glass-card rounded-2xl p-6 md:p-8',
        )}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
              dark={dark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
