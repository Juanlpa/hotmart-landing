export interface Bonus {
  name: string;
  description: string;
  value?: string;
}

export interface Testimonial {
  name: string;
  avatar?: string;
  text: string;
  rating?: number;
  location?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface IncludedItem {
  name: string;
  description: string;
  value?: string;
  icon?: string;
}

export interface PainPoint {
  title: string;
  description: string;
  icon?: string;
}

export interface HotmartProduct {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  affiliateLink: string;
  originalPrice: number;
  currentPrice: number;
  currency: string;
  guaranteeDays: number;
  vslVideoUrl?: string;
  benefits: string[];
  bonuses: Bonus[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  includedItems?: IncludedItem[];
  painPoints?: PainPoint[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  tracking: {
    facebookPixelId?: string;
    googleAnalyticsId?: string;
    gtmId?: string;
    hotmartPixelId?: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  countdown?: {
    enabled: boolean;
    endDate?: string;
    evergreen?: boolean;
    hours?: number;
  };
  status?: 'active' | 'paused' | 'draft';
  launchDate?: string;
  notes?: string;
  externalLinks?: {
    hotmartDashboard?: string;
    facebookAdsManager?: string;
    googleAnalyticsDashboard?: string;
  };
}

export const products: Record<string, HotmartProduct> = {
  'te-vas-a-transformar': {
    slug: 'te-vas-a-transformar',
    name: 'Método TVT',
    headline: 'Pierde hasta <span class="text-[#833cf6]">5KG de sobrepeso</span> y elimina malos hábitos en 30 días o menos con el <span class="underline decoration-[#833cf6]">MÉTODO TVT</span>',
    subheadline: 'El programa paso a paso que ya ha transformado a miles de mujeres a nivel mundial.',
    description: 'Reto de transformación física de 30 días para mujeres — Método TVT',
    affiliateLink: 'https://go.hotmart.com/B104856016O?ap=c333',
    originalPrice: 444,
    currentPrice: 30,
    currency: 'USD',
    guaranteeDays: 7,
    benefits: [
      'Pierde hasta 5kg en 30 días',
      'Plan de alimentación personalizado',
      'Rutinas de entrenamiento guiadas',
      'Seguimiento diario de comidas',
      'Comunidad de apoyo exclusiva',
      'Acceso a plataforma digital completa',
    ],
    painPoints: [
      { title: 'Dietas que no funcionan', description: 'Has intentado dietas restrictivas que no puedes mantener más de una semana.', icon: 'ban' },
      { title: 'Ejercicio sin resultados', description: 'Haces ejercicio cardiovascular extenuante pero no ves cambios en la báscula.', icon: 'fatigue' },
      { title: 'Efecto rebote', description: 'Sufres de efecto rebote constantemente, recuperando el doble de lo perdido.', icon: 'cycle' },
      { title: 'Metabolismo estancado', description: 'Sientes que tu metabolismo está estancado por la edad o por hormonas.', icon: 'pause' },
    ],
    includedItems: [
      { name: 'Plan de Alimentación', description: 'Guía paso a paso para nutrirte sin pasar hambre, con actualizaciones cada 30 días.', value: '$67 USD', icon: 'food' },
      { name: 'Plan de Entrenamiento', description: 'Rutinas optimizadas para quema de grasa según tus necesidades.', value: '$67 USD', icon: 'muscle' },
      { name: 'Acceso Plataforma TVT', description: 'Comunidad exclusiva de apoyo y recursos digitales.', value: '$100 USD', icon: 'device' },
      { name: 'Chequeo Semanal', description: 'Seguimiento semanal personalizado de tus progresos.', value: '$25 USD', icon: 'check' },
      { name: 'Biblioteca de Ejercicios', description: 'Material educativo y biblioteca completa de ejercicios.', value: '$50 USD', icon: 'book' },
      { name: 'Revisión Diaria de Comidas', description: 'Feedback profesional sobre tu alimentación diaria.', value: '$25 USD', icon: 'search' },
      { name: 'Q&A en Vivo', description: 'Sesiones de preguntas y respuestas para aclarar todas tus dudas.', value: '$25 USD', icon: 'chat' },
      { name: 'Evaluación Inicial', description: 'Test de diagnóstico inicial de tu estado físico actual.', value: '$25 USD', icon: 'clipboard' },
      { name: 'Seguimiento y Feedback', description: 'Recordatorio diario y ajustes constantes a tu proceso.', value: '$10 USD', icon: 'trending' },
      { name: 'Rutina Guiada L-V', description: 'Calendario de entrenamiento guiado de lunes a viernes.', value: '$50 USD', icon: 'calendar' },
      { name: 'Reconocimiento TVT', description: 'Pertenecer a la élite de mujeres transformadas con sorpresas y recompensas.', value: 'INVALUABLE', icon: 'trophy' },
    ],
    bonuses: [],
    testimonials: [
      { name: 'María G.', text: 'Bajé 4.5kg en mi primer mes. Lo mejor es que no dejé de comer lo que me gusta.', rating: 5, location: 'Bogotá, Colombia' },
      { name: 'Lucía R.', text: 'Nunca pensé que 30 minutos de ejercicio dirigido fueran tan potentes. Increíble.', rating: 5, location: 'Ciudad de México' },
      { name: 'Claudia M.', text: 'Mi relación con la comida cambió. Ya no tengo ansiedad por los dulces.', rating: 5, location: 'Lima, Perú' },
    ],
    faqs: [
      { question: '¿Necesito equipo de gimnasio?', answer: 'No, el método está diseñado para que puedas entrenar desde la comodidad de tu casa con elementos básicos o solo tu peso corporal.' },
      { question: '¿Cuánto tiempo al día necesito?', answer: 'Solo necesitas entre 30 a 45 minutos al día para ver resultados consistentes con nuestro sistema optimizado.' },
      { question: '¿Puedo seguir el plan si soy vegetariana?', answer: '¡Claro! El plan de alimentación es flexible y te enseñamos a adaptar tus porciones según tu preferencia alimentaria.' },
      { question: '¿Es un pago único?', answer: 'Sí, pagas una vez y tienes acceso total al programa sin mensualidades ni cargos ocultos.' },
      { question: '¿Cuándo recibo acceso?', answer: 'De manera inmediata. Una vez confirmado el pago, recibirás un correo con tus credenciales de acceso a la plataforma.' },
    ],
    colors: { primary: '#833cf6', secondary: '#6b21a8', accent: '#22C55E', background: '#0a0a0a' },
    tracking: {
      facebookPixelId: '923323780292437',
      googleAnalyticsId: 'G-7JJLETEVKX',
      gtmId: 'GTM-KSW88Z8L',
      hotmartPixelId: '', // Completado en la plataforma de Hotmart
    },
    seo: {
      title: 'Método TVT — Pierde hasta 5kg en 30 días | Te Vas a Transformar',
      description: 'Programa de transformación de 30 días para mujeres. Plan de alimentación, entrenamiento guiado y seguimiento personalizado. 93% de descuento por tiempo limitado.',
      ogImage: '/images/te-vas-a-transformar/og.webp',
    },
    countdown: { enabled: true, evergreen: true, hours: 2 },
    status: 'active',
    notes: 'Primera landing del proyecto. Tracking configurado: FB Pixel, GA4, GTM.',
  },
};

export function getProduct(slug: string): HotmartProduct | undefined {
  return products[slug];
}

export function getAllProducts(): HotmartProduct[] {
  return Object.values(products);
}
