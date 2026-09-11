import { useState, useRef, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, type Variants } from 'framer-motion';

// ─── Icons ──────────────────────────────────────────────────────────────────

const ChevronDown: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const PoolIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
  </svg>
);

const SpaIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c0 0-8-4-8-10a8 8 0 0 1 16 0c0 6-8 10-8 10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
  </svg>
);

const DiningIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v7a5 5 0 0 0 10 0V3" />
    <line x1="8" y1="3" x2="8" y2="21" />
    <line x1="19" y1="3" x2="19" y2="21" />
  </svg>
);

const BeachIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 9c0-3 2.5-5 5-5s5 2 5 5c0 2-5 9-5 9S7 11 7 9z" />
  </svg>
);

const GolfIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7">
    <line x1="12" y1="3" x2="12" y2="17" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l5 3.5-5 3.5" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 21c1-2 4-3 6-3s5 1 6 3" />
  </svg>
);

const BellIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// ─── Data ───────────────────────────────────────────────────────────────────

interface RoomCard {
  name: string;
  image: string;
  alt: string;
  price: string;
  description: string;
  path: string;
}

const rooms: RoomCard[] = [
  {
    name: 'Deluxe Garden Room',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
    alt: 'Deluxe Garden Room with warm neutral palette and linen upholstery',
    price: 'From $450/night',
    description:
      'Elegantly appointed rooms with private balcony overlooking the tropical gardens, fine Italian linens and marble en-suite bathrooms.',
    path: '/rooms',
  },
  {
    name: 'Premium Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85',
    alt: 'Premium Suite living area with panoramic ocean view and bespoke furnishings',
    price: 'From $850/night',
    description:
      'Expansive living quarters with a private terrace, bespoke furnishings curated by Italian artisans and dedicated butler service.',
    path: '/rooms',
  },
  {
    name: 'Penthouse Suite',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=900&q=85',
    alt: 'Penthouse suite with floor-to-ceiling windows and sweeping ocean horizon',
    price: 'From $2,400/night',
    description:
      'Crowning our tower with dual-level living, a private infinity hot tub and sweeping 360° coastal panoramas.',
    path: '/rooms',
  },
  {
    name: 'Royal Beach Villa',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=85',
    alt: 'Royal Beach Villa with private pool and direct sand access',
    price: 'From $3,200/night',
    description:
      'A secluded sanctuary with private beach access, dedicated villa host and curated experiences for the most discerning guests.',
    path: '/rooms',
  },
];

interface Amenity {
  icon: React.FC;
  title: string;
  description: string;
}

const amenities: Amenity[] = [
  { icon: PoolIcon, title: 'Infinity Pool', description: 'Horizon-edge pool melting into the sea' },
  { icon: SpaIcon, title: 'Meridian Spa', description: '20,000 sq ft of holistic wellness' },
  { icon: DiningIcon, title: 'Michelin Dining', description: 'Two-star culinary artistry in every dish' },
  { icon: BeachIcon, title: 'Private Beach', description: 'An exclusive 500m stretch of white sand' },
  { icon: GolfIcon, title: 'Championship Golf', description: '18-hole course with oceanfront holes' },
  { icon: BellIcon, title: '24-Hour Concierge', description: 'Les Clefs d’Or butlers at your service' },
];

interface DiningExperience {
  name: string;
  cuisine: string;
  hours: string;
  description: string;
  image: string;
  alt: string;
}

const diningVenues: DiningExperience[] = [
  {
    name: 'The Meridian Restaurant',
    cuisine: 'Contemporary French',
    hours: '6:00 PM – 11:00 PM',
    description:
      'A two-Michelin-star journey through modern French gastronomy, crafted by Executive Chef Antoine Dubois and paired with a 4,000-bottle cellar.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85',
    alt: 'Fine dining table elegantly set with crystal and candlelight',
  },
  {
    name: 'Azure Poolside Bar',
    cuisine: 'Artisan Cocktails & Light Bites',
    hours: '11:00 AM – Midnight',
    description:
      'Handcrafted cocktails and Mediterranean-inspired small plates as the sun melts into the horizon.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=85',
    alt: 'Sun-drenched poolside bar with turquoise water in the foreground',
  },
  {
    name: 'The Lounge',
    cuisine: 'Afternoon Tea & Pâtisserie',
    hours: '2:00 PM – Midnight',
    description:
      'An elegant ritual of fine teas, freshly baked scones and exquisite pâtisserie in a refined drawing-room setting.',
    image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=900&q=85',
    alt: 'Elegant lounge with afternoon tea service and tiered pastry stand',
  },
];

interface Testimonial {
  quote: string;
  name: string;
  suite: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'An absolutely transcendent experience from the moment we stepped through the doors. Every detail was immaculately considered — the scent of fresh lilies in the lobby, the impossibly soft linens, the seamless anticipation of our every need.',
    name: 'James & Victoria Harrington',
    suite: 'Royal Villa',
    date: 'March 2026',
  },
  {
    quote:
      'The Grand Meridian redefines luxury in the most effortless, understated way. The Penthouse views at sunrise are something I shall carry with me always. The staff possess an extraordinary gift for warmth that never once felt performative.',
    name: 'Sophia Laurent',
    suite: 'Penthouse Suite',
    date: 'January 2026',
  },
  {
    quote:
      'From the moment we arrived, we understood this was no ordinary stay. The culinary team conjured dishes that bordered on the spiritual. The spa left us entirely renewed. Memories we will treasure for the rest of our lives.',
    name: 'Robert Chen',
    suite: 'Premium Suite',
    date: 'April 2026',
  },
];

// ─── Variants ───────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('2');
  const [roomType, setRoomType] = useState('');
  const [bookingMsg, setBookingMsg] = useState('');

  const overviewRef = useRef<HTMLElement>(null);
  const roomsRef = useRef<HTMLElement>(null);
  const amenitiesRef = useRef<HTMLElement>(null);
  const diningRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLElement>(null);

  const overviewInView = useInView(overviewRef, { once: true, margin: '-80px' });
  const roomsInView = useInView(roomsRef, { once: true, margin: '-80px' });
  const amenitiesInView = useInView(amenitiesRef, { once: true, margin: '-80px' });
  const diningInView = useInView(diningRef, { once: true, margin: '-80px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-80px' });
  const bookInView = useInView(bookRef, { once: true, margin: '-80px' });

  const handleBookSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !roomType) {
      setBookingMsg('Please complete your dates and select an accommodation to continue.');
      return;
    }
    setBookingMsg('Searching availability — please continue to the reservation page.');
  };

  return (
    <main
      id="main-content"
      style={{
        fontFamily: 'var(--font-body)',
        background: 'var(--color-primary-900)',
        color: 'var(--color-ivory-200)',
      }}
    >
      {/* ═══ HERO ═══ */}
      <section
        className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
        aria-label="Welcome to The Grand Meridian"
      >
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85"
          alt="The Grand Meridian resort exterior at twilight, illuminated with golden lights"
          width="1920"
          height="1280"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,25,47,0.7) 0%, rgba(10,25,47,0.45) 50%, rgba(10,25,47,0.85) 100%)',
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="inline-block w-10 h-px bg-accent-400" />
            <span className="text-accent-400 text-xs">◆</span>
            <span className="inline-block w-10 h-px bg-accent-400" />
          </motion.div>

          <motion.p variants={fadeUp} className="eyebrow mb-5">
            Welcome To The Grand Meridian
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-fluid-7xl text-ivory-200 leading-[1.02] mb-6 text-balance"
          >
            A world where <span className="accent-italic">time slows</span> and refinement endures
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="accent-italic text-champagne-200 text-fluid-lg mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Five-star coastal sanctuary · North Malé Atoll · Est. 1974
          </motion.p>

          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="w-20 h-px bg-accent-400 mx-auto mb-9"
          />

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-300 active:bg-accent-500 transition-all duration-300 shadow-sm hover:shadow-gold-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Reserve Your Stay
            </Link>
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center border border-accent-400 text-accent-400 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-400/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Explore Suites
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="mt-12 flex flex-col items-center gap-2"
          >
            <span className="text-champagne-200 text-[10px] tracking-[0.3em] uppercase">
              Scroll to Discover
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-accent-400"
            >
              <ChevronDown />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ OVERVIEW ═══ */}
      <section
        ref={overviewRef}
        className="py-28 px-6"
        style={{ background: 'var(--color-primary-900)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={overviewInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="order-2 lg:order-1">
              <div className="relative inline-block w-full">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000&q=85"
                  alt="The Grand Meridian lobby with marble floors and a cascading chandelier"
                  width="1000"
                  height="667"
                  loading="lazy"
                  className="w-full h-[520px] object-cover rounded-md"
                  style={{ transform: 'rotate(-1.5deg)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 border border-accent-400/30 rounded-md pointer-events-none"
                  style={{ transform: 'rotate(-1.5deg)' }}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="order-1 lg:order-2">
              <p className="eyebrow mb-4">A World Apart</p>
              <h2 className="font-display text-fluid-4xl text-ivory-200 leading-tight mb-6 text-balance">
                Half a century devoted to the art of hospitality
              </h2>
              <div aria-hidden="true" className="w-12 h-px bg-accent-400 mb-6" />
              <p className="text-ivory-300/85 text-base leading-relaxed mb-5">
                For over half a century, The Grand Meridian has stood as the definitive address
                for those who seek not merely accommodation, but a transformative encounter with
                beauty, refinement and the art of living well. Nestled where emerald hills descend
                to an impossibly blue sea, our estate was conceived as a refuge from the ordinary.
              </p>
              <p className="accent-italic text-champagne-200 text-fluid-base leading-relaxed mb-8">
                True luxury is the freedom to surrender entirely to the present moment.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-accent-400/20">
                {[
                  { value: '50', label: 'Years of Excellence' },
                  { value: '200', label: 'Suites & Villas' },
                  { value: '5★', label: 'Five-Star Rated' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-3xl text-accent-400 mb-2">{stat.value}</p>
                    <p className="text-ivory-400 text-xs tracking-[0.15em] uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/rooms"
                className="mt-8 inline-flex items-center gap-2 text-accent-400 text-sm uppercase tracking-[0.2em] font-medium hover:gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm px-1"
              >
                Discover Suites <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ ROOMS ═══ */}
      <section
        ref={roomsRef}
        className="py-28 px-6"
        style={{ background: 'var(--color-primary-800)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={roomsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-4">Accommodations</p>
            <h2 className="font-display text-fluid-5xl text-ivory-200 leading-tight text-balance">
              Rooms &amp; Suites
            </h2>
            <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mt-6" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={roomsInView ? 'visible' : 'hidden'}
            variants={cardStagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {rooms.map((room) => (
              <motion.article
                key={room.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-primary-900/60 border border-accent-400/15 rounded-lg overflow-hidden hover:border-accent-400/40 hover:shadow-gold-sm transition-all duration-500"
              >
                <Link to={room.path} className="block">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.alt}
                      width="900"
                      height="600"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-ivory-200 mb-2 leading-tight text-balance">
                      {room.name}
                    </h3>
                    <p className="text-ivory-300/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      {room.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-accent-400/15">
                      <span className="font-display text-accent-400 text-sm">{room.price}</span>
                      <span
                        aria-hidden="true"
                        className="text-accent-400 text-xs uppercase tracking-[0.2em] group-hover:gap-3 transition-all"
                      >
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ AMENITIES ═══ */}
      <section
        ref={amenitiesRef}
        className="py-28 px-6"
        style={{ background: 'var(--color-primary-900)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={amenitiesInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-4">Resort Amenities</p>
            <h2 className="font-display text-fluid-5xl text-ivory-200 leading-tight text-balance">
              Everything you desire
            </h2>
            <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mt-6" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={amenitiesInView ? 'visible' : 'hidden'}
            variants={cardStagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {amenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={amenity.title}
                  variants={fadeUp}
                  whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.6)' }}
                  className="text-center p-6 border border-accent-400/15 rounded-lg bg-primary-800/30 transition-all duration-500"
                >
                  <div
                    aria-hidden="true"
                    className="w-14 h-14 rounded-full bg-accent-400/10 border border-accent-400/35 flex items-center justify-center mx-auto mb-4 text-accent-400"
                  >
                    <Icon />
                  </div>
                  <h3 className="font-display text-accent-400 text-base mb-2">{amenity.title}</h3>
                  <p className="text-ivory-300/75 text-xs leading-relaxed">{amenity.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ EXPERIENCES BANNER ═══ */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        aria-label="Unforgettable experiences"
      >
        <img
          src="https://images.unsplash.com/photo-1549294413-26f195200c16?w=1920&q=85"
          alt="Aerial view of a private clifftop dinner setup at sunset"
          width="1920"
          height="1280"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'rgba(10,25,47,0.72)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl px-6 py-16"
        >
          <p className="eyebrow mb-5">Curated Encounters</p>
          <h2 className="font-display text-fluid-6xl text-ivory-200 leading-[1.05] mb-6 text-balance">
            Moments that last forever
          </h2>
          <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mb-6" />
          <p className="accent-italic text-champagne-200 text-fluid-base leading-relaxed mb-9">
            Beyond the sumptuous rooms and impeccable service lies a world of curated experiences
            — sunrise yoga over still water, private yacht excursions, truffle-hunting mornings,
            and starlit dinners on the clifftop terrace.
          </p>
          <Link
            to="/experiences"
            className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-300 transition-all duration-300 shadow-sm hover:shadow-gold-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            Discover Experiences
          </Link>
        </motion.div>
      </section>

      {/* ═══ DINING ═══ */}
      <section
        ref={diningRef}
        className="py-28 px-6"
        style={{ background: 'var(--color-primary-900)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={diningInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-4">Culinary Excellence</p>
            <h2 className="font-display text-fluid-5xl text-ivory-200 leading-tight text-balance">
              Dining at The Grand Meridian
            </h2>
            <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mt-6" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={diningInView ? 'visible' : 'hidden'}
            variants={cardStagger}
            className="grid md:grid-cols-3 gap-7"
          >
            {diningVenues.map((venue) => (
              <motion.article
                key={venue.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-primary-800/50 border border-accent-400/15 rounded-lg overflow-hidden hover:border-accent-400/40 hover:shadow-gold-sm transition-all duration-500"
              >
                <Link to="/dining" className="block">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.alt}
                      width="900"
                      height="600"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-accent-400 mb-2 leading-tight text-balance">
                      {venue.name}
                    </h3>
                    <p className="text-champagne-200 text-xs uppercase tracking-[0.18em] mb-1">
                      {venue.cuisine}
                    </p>
                    <p className="text-ivory-400 text-xs mb-4">Hours · {venue.hours}</p>
                    <p className="text-ivory-300/85 text-sm leading-relaxed">{venue.description}</p>
                    <span
                      aria-hidden="true"
                      className="mt-5 inline-flex items-center gap-2 text-accent-400 text-xs uppercase tracking-[0.2em] font-medium"
                    >
                      Reserve <span>→</span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section
        ref={testimonialsRef}
        className="py-28 px-6"
        style={{ background: 'var(--color-primary-800)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-4">Guest Stories</p>
            <h2 className="font-display text-fluid-5xl text-ivory-200 leading-tight text-balance">
              What our guests say
            </h2>
            <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mt-6" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            variants={cardStagger}
            className="grid md:grid-cols-3 gap-7"
          >
            {testimonials.map((t) => (
              <motion.figure
                key={t.name}
                variants={fadeUp}
                className="bg-primary-900/70 border border-accent-400/15 rounded-lg p-7"
              >
                <div aria-hidden="true" className="text-accent-400 tracking-[0.3em] text-sm mb-5">
                  ★★★★★
                </div>
                <blockquote className="accent-italic text-champagne-200 leading-relaxed text-base mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-accent-400/15 pt-4">
                  <p className="text-ivory-200 text-sm font-medium">{t.name}</p>
                  <p className="text-accent-400 text-xs uppercase tracking-[0.18em] mt-1">
                    {t.suite} · {t.date}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ BOOKING CTA ═══ */}
      <section
        ref={bookRef}
        className="py-28 px-6 border-t border-accent-400/15"
        style={{ background: 'var(--color-primary-900)' }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={bookInView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <div aria-hidden="true" className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-block w-10 h-px bg-accent-400" />
              <span className="text-accent-400 text-xs">◆</span>
              <span className="inline-block w-10 h-px bg-accent-400" />
            </div>
            <p className="eyebrow mb-5">Reserve Your Escape</p>
            <h2 className="font-display text-fluid-5xl text-ivory-200 leading-tight mb-10 text-balance">
              Begin your journey
            </h2>

            <form
              onSubmit={handleBookSubmit}
              noValidate
              aria-describedby="booking-feedback"
              className="bg-primary-800/70 border border-accent-400/25 rounded-lg p-7 sm:p-10 text-left"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                <div>
                  <label htmlFor="checkin" className="eyebrow block mb-2">
                    Check-In
                  </label>
                  <input
                    id="checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-primary-900/80 border border-accent-400/25 text-ivory-200 p-3 text-sm rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  />
                </div>
                <div>
                  <label htmlFor="checkout" className="eyebrow block mb-2">
                    Check-Out
                  </label>
                  <input
                    id="checkout"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-primary-900/80 border border-accent-400/25 text-ivory-200 p-3 text-sm rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  />
                </div>
                <div>
                  <label htmlFor="adults" className="eyebrow block mb-2">
                    Guests
                  </label>
                  <select
                    id="adults"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="w-full bg-primary-900/80 border border-accent-400/25 text-ivory-200 p-3 text-sm rounded-md outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-400"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="roomtype" className="eyebrow block mb-2">
                    Suite Type
                  </label>
                  <select
                    id="roomtype"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-primary-900/80 border border-accent-400/25 text-ivory-200 p-3 text-sm rounded-md outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-400"
                  >
                    <option value="">Any Accommodation</option>
                    <option value="deluxe">Deluxe Room</option>
                    <option value="premium">Premium Suite</option>
                    <option value="penthouse">Penthouse Suite</option>
                    <option value="royal">Royal Villa</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-8 py-3.5 rounded-md hover:bg-accent-300 transition-all duration-300 shadow-sm hover:shadow-gold-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
              >
                Check Availability
              </button>

              <p
                id="booking-feedback"
                role="status"
                aria-live="polite"
                className="mt-4 text-xs text-champagne-200"
              >
                {bookingMsg ||
                  'Best Rate Guarantee · Free cancellation within 48 hours · Complimentary concierge'}
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}