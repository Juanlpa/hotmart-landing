import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
}

function getEmbedUrl(url: string, autoplay: boolean): string {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?${autoplay ? 'autoplay=1&' : ''}`;
  }

  return url;
}

export default function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  title = 'Video de presentación',
  autoplay = false,
  className,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoplay);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={clsx('relative w-full max-w-3xl mx-auto', className)}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        {!playing && thumbnailUrl ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        ) : (
          <iframe
            src={getEmbedUrl(videoUrl, playing)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    </motion.div>
  );
}
