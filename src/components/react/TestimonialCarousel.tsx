import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Testimonial } from '../../config/products';
import clsx from 'clsx';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  title?: string;
  className?: string;
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-yellow-400">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialCarousel({
  testimonials,
  title = 'Lo que dicen nuestros alumnos',
  className,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  if (!testimonials.length) return null;

  return (
    <section className={clsx('py-16 md:py-24 px-4 bg-white', className)}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">{title}</h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center"
            >
              {testimonials[current].rating && (
                <Stars count={testimonials[current].rating} />
              )}
              <p className="text-gray-700 text-base md:text-lg italic mt-4 mb-6">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                {testimonials[current].avatar && (
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonials[current].name}
                  </p>
                  {testimonials[current].location && (
                    <p className="text-sm text-gray-500">
                      {testimonials[current].location}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                aria-label="Anterior"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={clsx(
                      'w-2.5 h-2.5 rounded-full transition-colors',
                      i === current ? 'bg-gray-800' : 'bg-gray-300',
                    )}
                    aria-label={`Testimonio ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                aria-label="Siguiente"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
