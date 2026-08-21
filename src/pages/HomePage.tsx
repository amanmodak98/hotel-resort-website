import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const PoolIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" style={{ width: 28, height: 28 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <circle cx="12" cy="4" r="0.5" fill="currentColor" />
  </svg>
);

const SpaIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c0 0-8-4-8-10a8 8 0 0 1 16 0c0 6-8 10-8 10z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
  </svg>
);

const DiningIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v7a5 5 0 0 0 10 0V3" />
    <line x1="8" y1="3" x2="8" y2="21" />
    <line x1="19" y1="3" x2="19" y2="21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 3c0 0 3 2 3 6" />
  </svg>
);

const BeachIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 9c0-3 2.5-5 5-5s5 2 5 5c0 2-5 9-5 9S7 11 7 9z" />
  </svg>
);

const GolfIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
    <line x1="12" y1="3" x2="12" y2="17" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l5 3.5-5 3.5" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 21c1-2 4-3 6-3s5 1 6 3" />
  </svg>
);

const BellIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ChevronDownIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 24, height: 24 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

interface RoomCard {
  name: string;
  image: string;
  price: string;
  description: string;
}

const rooms: RoomCard[] = [
  {
    name: 'Deluxe Room',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    price: 'From $450/night',
    description: 'Elegantly appointed rooms with panoramic city or garden views, premium linens, and marble en-suite bathrooms.',
  },
  {
    name: 'Premium Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    price: 'From $850/night',
    description: 'Expansive living quarters featuring private terraces, bespoke furnishings, and dedicated butler service.',
  },
  {
    name: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80',
    price: 'From $1,800/night',
    description: 'Crowning our tower with dual-level living, a private plunge pool, and sweeping 360° coastal panoramas.',
  },
  {
    name: 'Royal Villa',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    price: 'From $3,200/night',
    description: 'A secluded sanctuary with private beach access, dedicated villa host, and curated experiences for the most discerning guests.',
  },
];

interface AmenityTile {
  icon: React.FC;
  title: string;
  description: string;
}

const amenities: AmenityTile[] = [
  { icon: PoolIcon,   title: 'Infinity Pool',    description: 'Horizon-edge pool overlooking the azure sea' },
  { icon: SpaIcon,    title: 'Spa & Wellness',   description: 'Award-winning treatments and holistic therapies' },
  { icon: DiningIcon, title: 'Michelin Dining',  description: 'Three star culinary artistry in every dish' },
  { icon: BeachIcon,  title: 'Private Beach',    description: 'Exclusive stretch of pristine white sand' },
  { icon: GolfIcon,   title: 'Golf Course',      description: '18-hole championship course with ocean views' },
  { icon: BellIcon,   title: 'Concierge',        description: '24/7 personalised concierge and butler service' },
];

interface DiningCard {
  name: string;
  cuisine: string;
  hours: string;
  description: string;
  image: string;
}

const diningOptions: DiningCard[] = [
  {
    name: 'The Meridian Restaurant',
    cuisine: 'Contemporary Fine Dining',
    hours: '6PM – 11PM',
    description: 'A Michelin-starred journey through modern cuisine crafted from the finest seasonal ingredients, paired with an exceptional wine cellar.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  },
  {
    name: 'Azure Poolside Bar',
    cuisine: 'Artisan Cocktails & Light Bites',
    hours: '11AM – Midnight',
    description: 'Sip handcrafted cocktails and graze on Mediterranean-inspired small plates as the sun melts into the sea.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
  },
  {
    name: 'The Lounge',
    cuisine: 'Afternoon Tea & Pâtisserie',
    hours: '2PM – 8PM',
    description: 'An elegant ritual of fine teas, freshly baked scones, and exquisite pâtisserie in a refined drawing-room setting.',
    image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&q=80',
  },
];

interface Review {
  quote: string;
  name: string;
  suite: string;
  date: string;
}

const reviews: Review[] = [
  {
    quote: 'An absolutely transcendent experience from the moment we stepped through the doors. Every detail was immaculately considered — the scent of fresh lilies in the lobby, the impossibly soft linens, the seamless anticipation of our every need. The Grand Meridian is not merely a hotel; it is a state of mind.',
    name: 'James & Victoria Harrington',
    suite: 'Royal Villa',
    date: 'March 2026',
  },
  {
    quote: 'The Grand Meridian redefines luxury in the most effortless, understated way. The Penthouse views at sunrise are something I shall carry with me always. The staff possess an extraordinary gift for warmth that never once felt performative. I return as often as life permits.',
    name: 'Sophia Laurent',
    suite: 'Penthouse Suite',
    date: 'January 2026',
  },
  {
    quote: 'From the moment we arrived, we understood this was no ordinary stay. The culinary team conjured dishes that bordered on the spiritual. The spa left us entirely renewed. My wife and I celebrated our anniversary here and left with memories we will treasure for the rest of our lives.',
    name: 'Robert Chen',
    suite: 'Premium Suite',
    date: 'April 2026',
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ─── Shared style helpers ─────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  color: '#c8a96e',
  letterSpacing: '0.3em',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  marginBottom: '1rem',
  fontFamily: "'Lato', sans-serif",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontFamily: "'Libre Baskerville', serif",
  color: '#faf7f0',
  fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
};

// ─── HomePage ─────────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  const [checkIn, setCheckIn]   = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [adults, setAdults]     = useState<string>('2');
  const [roomType, setRoomType] = useState<string>('');

  const overviewRef   = useRef<HTMLElement>(null);
  const roomsRef      = useRef<HTMLElement>(null);
  const amenitiesRef  = useRef<HTMLElement>(null);
  const diningRef     = useRef<HTMLElement>(null);
  const reviewsRef    = useRef<HTMLElement>(null);
  const bookRef       = useRef<HTMLElement>(null);

  const overviewInView  = useInView(overviewRef,  { once: true, margin: '-80px' });
  const roomsInView     = useInView(roomsRef,     { once: true, margin: '-80px' });
  const amenitiesInView = useInView(amenitiesRef, { once: true, margin: '-80px' });
  const diningInView    = useInView(diningRef,    { once: true, margin: '-80px' });
  const reviewsInView   = useInView(reviewsRef,   { once: true, margin: '-80px' });
  const bookInView      = useInView(bookRef,      { once: true, margin: '-80px' });

  const handleHoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = '#c8a96e';
    e.currentTarget.style.color = '#0a1628';
  };
  const handleHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = '#faf7f0';
  };

  return (
    <main style={{ fontFamily: "'Lato', sans-serif", backgroundColor: '#0a1628', color: '#faf7f0' }}>

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="The Grand Meridian exterior"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,22,40,0.80) 0%, rgba(10,22,40,0.50) 50%, rgba(10,22,40,0.80) 100%)' }} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1.5rem' }}
        >
          {/* Ornament */}
          <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ display: 'inline-block', width: 48, height: 1, background: '#c8a96e' }} />
            <span style={{ color: '#c8a96e', fontSize: 10 }}>◆</span>
            <span style={{ display: 'inline-block', width: 48, height: 1, background: '#c8a96e' }} />
          </motion.div>

          {/* Welcome label */}
          <motion.p variants={fadeIn} style={{ ...labelStyle, marginBottom: '1rem' }}>
            Welcome To
          </motion.p>

          {/* Hotel name */}
          <motion.h1
            variants={fadeIn}
            style={{ fontFamily: "'Libre Baskerville', serif", color: '#faf7f0', lineHeight: 1.1, marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            The Grand Meridian
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeIn}
            style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', color: '#e8d5a3', fontSize: 'clamp(1rem, 2.5vw, 1.375rem)', marginBottom: '2rem' }}
          >
            Where luxury meets serenity
          </motion.p>

          {/* Separator */}
          <motion.div variants={fadeIn} style={{ width: 96, height: 1, background: '#c8a96e', margin: '0 auto 2.5rem' }} />

          {/* CTA */}
          <motion.div variants={fadeIn} style={{ marginBottom: '2.5rem' }}>
            <Link
              to="/book"
              onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut}
              style={{ display: 'inline-block', border: '1px solid #c8a96e', color: '#faf7f0', background: 'transparent', padding: '0.875rem 2.5rem', letterSpacing: '0.15em', fontSize: '0.8125rem', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.3s, color 0.3s', fontFamily: "'Lato', sans-serif" }}
            >
              Book Your Stay
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div variants={fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#e8d5a3', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll to Discover</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} style={{ color: '#c8a96e' }}>
              <ChevronDownIcon />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — OVERVIEW (A World Apart)
      ════════════════════════════════════════════════════════ */}
      <section ref={overviewRef} style={{ backgroundColor: '#0a1628', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            animate={overviewInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}
            className="md:grid-cols-2"
          >
            {/* Image (order-2 on mobile, order-1 on desktop) */}
            <motion.div variants={fadeUp} style={{ order: 2 }}>
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80"
                  alt="Luxury hotel interior"
                  style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 4, transform: 'rotate(-1.5deg)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
                />
                <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(200,169,110,0.3)', borderRadius: 4, transform: 'rotate(-1.5deg)', pointerEvents: 'none' }} />
              </div>
            </motion.div>

            {/* Text (order-1 on mobile, order-2 on desktop) */}
            <motion.div variants={fadeUp} style={{ order: 1 }}>
              <p style={labelStyle}>A World Apart</p>
              <h2 style={{ ...sectionHeadingStyle, lineHeight: 1.2, marginBottom: '1.5rem' }}>
                Experience Unparalleled Luxury
              </h2>
              <p style={{ color: '#8b8070', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '1rem' }}>
                For over half a century, The Grand Meridian has stood as the definitive address for those who seek not merely accommodation, but a transformative encounter with beauty, refinement, and the art of living well. Nestled where emerald hills descend to an impossibly blue sea, our estate was conceived as a refuge from the ordinary.
              </p>
              <p style={{ color: '#8b8070', lineHeight: 1.9, marginBottom: '2.5rem', fontSize: '1rem' }}>
                Every surface, scent, and service has been curated with unwavering intention. Our philosophy is simple: true luxury is the freedom to surrender entirely to the present moment, knowing that every conceivable desire has already been anticipated by our devoted team of artisans in hospitality.
              </p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(200,169,110,0.2)' }}>
                {[
                  { value: '50', label: 'Years of Excellence' },
                  { value: '200', label: 'Suites' },
                  { value: '5★', label: 'Rated' },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '2rem', color: '#c8a96e', marginBottom: '0.25rem' }}>
                      {stat.value}
                    </p>
                    <p style={{ color: '#8b8070', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                to="/rooms"
                style={{ color: '#c8a96e', textDecoration: 'none', fontSize: '0.875rem', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'gap 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.gap = '1rem'; }}
                onMouseLeave={(e) => { e.currentTarget.style.gap = '0.5rem'; }}
              >
                Discover More →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — ROOM HIGHLIGHTS
      ════════════════════════════════════════════════════════ */}
      <section ref={roomsRef} style={{ backgroundColor: '#111f35', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Heading */}
          <motion.div
            initial="hidden"
            animate={roomsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p style={labelStyle}>Our Accommodations</p>
            <h2 style={sectionHeadingStyle}>Rooms &amp; Suites</h2>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            initial="hidden"
            animate={roomsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}
          >
            {rooms.map((room) => (
              <motion.div
                key={room.name}
                variants={fadeIn}
                whileHover={{ y: -6, boxShadow: '0 0 30px rgba(200,169,110,0.25)' }}
                style={{ backgroundColor: '#162540', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(200,169,110,0.15)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
              >
                <div style={{ overflow: 'hidden', height: 220 }}>
                  <motion.img
                    src={room.image}
                    alt={room.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: '#faf7f0', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    {room.name}
                  </h3>
                  <p style={{ color: '#8b8070', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                    {room.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(200,169,110,0.15)' }}>
                    <span style={{ color: '#c8a96e', fontFamily: "'Libre Baskerville', serif", fontSize: '0.9rem' }}>
                      {room.price}
                    </span>
                    <Link
                      to="/rooms"
                      style={{ color: '#faf7f0', fontSize: '0.75rem', letterSpacing: '0.1em', textDecoration: 'none', border: '1px solid rgba(200,169,110,0.5)', padding: '0.375rem 1rem', transition: 'background 0.3s, color 0.3s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#c8a96e'; e.currentTarget.style.color = '#0a1628'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#faf7f0'; }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — AMENITIES PREVIEW
      ════════════════════════════════════════════════════════ */}
      <section ref={amenitiesRef} style={{ backgroundColor: '#111f35', padding: '7rem 1.5rem', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            animate={amenitiesInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p style={labelStyle}>Resort Amenities</p>
            <h2 style={sectionHeadingStyle}>Everything You Desire</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={amenitiesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2rem' }}
          >
            {amenities.map((amenity) => {
              const IconComponent = amenity.icon;
              return (
                <motion.div
                  key={amenity.title}
                  variants={fadeIn}
                  whileHover={{ borderColor: 'rgba(200,169,110,0.6)', boxShadow: '0 0 25px rgba(200,169,110,0.15)' }}
                  style={{ textAlign: 'center', padding: '2rem 1rem', border: '1px solid rgba(200,169,110,0.1)', borderRadius: 4, cursor: 'default', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#c8a96e' }}>
                    <IconComponent />
                  </div>
                  <h3 style={{ color: '#c8a96e', fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {amenity.title}
                  </h3>
                  <p style={{ color: '#8b8070', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                    {amenity.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — EXPERIENCE (Moments That Last Forever)
      ════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1549294413-26f195200c16?w=1920&q=80"
          alt="Luxury resort experience"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,22,40,0.72)' }} />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 720, padding: '4rem 1.5rem' }}
        >
          <p style={labelStyle}>Unforgettable Experiences</p>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", color: '#faf7f0', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Moments That Last Forever
          </h2>
          <div style={{ width: 60, height: 1, background: '#c8a96e', margin: '0 auto 1.5rem' }} />
          <p style={{ color: '#e8d5a3', lineHeight: 1.9, fontSize: '1rem', marginBottom: '2.5rem' }}>
            Beyond the sumptuous rooms and impeccable service lies a world of curated experiences — sunrise yoga over still water, private yacht excursions, truffle-hunting mornings, and starlit dinners on the clifftop terrace. At The Grand Meridian, every moment is an invitation to live more fully.
          </p>
          <Link
            to="/gallery"
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
            style={{ display: 'inline-block', border: '1px solid #c8a96e', color: '#faf7f0', background: 'transparent', padding: '0.875rem 2.5rem', letterSpacing: '0.15em', fontSize: '0.8125rem', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.3s, color 0.3s', fontFamily: "'Lato', sans-serif" }}
          >
            Explore Gallery →
          </Link>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — DINING (Culinary Excellence)
      ════════════════════════════════════════════════════════ */}
      <section ref={diningRef} style={{ backgroundColor: '#0a1628', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            animate={diningInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p style={labelStyle}>Culinary Excellence</p>
            <h2 style={sectionHeadingStyle}>Dining at The Grand Meridian</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={diningInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {diningOptions.map((dining) => (
              <motion.div
                key={dining.name}
                variants={fadeIn}
                style={{ backgroundColor: '#162540', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(200,169,110,0.15)' }}
              >
                <div style={{ overflow: 'hidden', height: 200 }}>
                  <motion.img
                    src={dining.image}
                    alt={dining.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", color: '#faf7f0', fontSize: '1.125rem', marginBottom: '0.375rem' }}>
                    {dining.name}
                  </h3>
                  <p style={{ color: '#c8a96e', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    {dining.cuisine}
                  </p>
                  <p style={{ color: '#8b8070', fontSize: '0.8rem', marginBottom: '0.875rem' }}>
                    Hours: {dining.hours}
                  </p>
                  <p style={{ color: '#8b8070', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {dining.description}
                  </p>
                  <Link
                    to="/dining"
                    style={{ color: '#c8a96e', fontSize: '0.8rem', letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#e8d5a3'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#c8a96e'; }}
                  >
                    View Menu →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — REVIEWS (What Our Guests Say)
      ════════════════════════════════════════════════════════ */}
      <section ref={reviewsRef} style={{ backgroundColor: '#111f35', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            animate={reviewsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p style={labelStyle}>Guest Stories</p>
            <h2 style={sectionHeadingStyle}>What Our Guests Say</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={reviewsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {reviews.map((review) => (
              <motion.div
                key={review.name}
                variants={fadeIn}
                style={{ backgroundColor: '#162540', border: '1px solid rgba(200,169,110,0.15)', borderRadius: 4, padding: '2rem' }}
              >
                <p style={{ color: '#c8a96e', fontSize: '1.25rem', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                  ★★★★★
                </p>
                <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: 'italic', color: '#e8d5a3', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid rgba(200,169,110,0.15)', paddingTop: '1rem' }}>
                  <p style={{ color: '#faf7f0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{review.name}</p>
                  <p style={{ color: '#c8a96e', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    {review.suite} &nbsp;&middot;&nbsp; {review.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 8 — BOOK CTA
      ════════════════════════════════════════════════════════ */}
      <section ref={bookRef} style={{ backgroundColor: '#0a1628', padding: '7rem 1.5rem', borderTop: '1px solid rgba(200,169,110,0.2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial="hidden" animate={bookInView ? 'visible' : 'hidden'} variants={fadeUp}>
            {/* Ornament */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 40, height: 1, background: '#c8a96e' }} />
              <span style={{ color: '#c8a96e', fontSize: 10 }}>◆</span>
              <span style={{ display: 'inline-block', width: 40, height: 1, background: '#c8a96e' }} />
            </div>
            <p style={labelStyle}>Reserve Your Escape</p>
            <h2 style={{ ...sectionHeadingStyle, marginBottom: '3rem' }}>Begin Your Journey</h2>

            {/* Availability form */}
            <div style={{ background: '#111f35', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 4, padding: '2.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {/* Check-in */}
                <div style={{ textAlign: 'left' }}>
                  <label htmlFor="checkin" style={{ display: 'block', color: '#c8a96e', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: "'Lato', sans-serif" }}>
                    Check-In
                  </label>
                  <input
                    id="checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    style={{ width: '100%', background: '#162540', border: '1px solid rgba(200,169,110,0.25)', color: '#faf7f0', padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none', borderRadius: 2, colorScheme: 'dark' }}
                  />
                </div>

                {/* Check-out */}
                <div style={{ textAlign: 'left' }}>
                  <label htmlFor="checkout" style={{ display: 'block', color: '#c8a96e', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: "'Lato', sans-serif" }}>
                    Check-Out
                  </label>
                  <input
                    id="checkout"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    style={{ width: '100%', background: '#162540', border: '1px solid rgba(200,169,110,0.25)', color: '#faf7f0', padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none', borderRadius: 2, colorScheme: 'dark' }}
                  />
                </div>

                {/* Adults */}
                <div style={{ textAlign: 'left' }}>
                  <label htmlFor="adults" style={{ display: 'block', color: '#c8a96e', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: "'Lato', sans-serif" }}>
                    Adults
                  </label>
                  <select
                    id="adults"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    style={{ width: '100%', background: '#162540', border: '1px solid rgba(200,169,110,0.25)', color: '#faf7f0', padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none', borderRadius: 2, cursor: 'pointer' }}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>

                {/* Room type */}
                <div style={{ textAlign: 'left' }}>
                  <label htmlFor="roomtype" style={{ display: 'block', color: '#c8a96e', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: "'Lato', sans-serif" }}>
                    Room Type
                  </label>
                  <select
                    id="roomtype"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    style={{ width: '100%', background: '#162540', border: '1px solid rgba(200,169,110,0.25)', color: roomType ? '#faf7f0' : '#8b8070', padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none', borderRadius: 2, cursor: 'pointer' }}
                  >
                    <option value="" style={{ color: '#8b8070' }}>Any Room</option>
                    <option value="deluxe">Deluxe Room</option>
                    <option value="premium">Premium Suite</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="royal">Royal Villa</option>
                  </select>
                </div>

                {/* Button */}
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ height: '1.5rem' }} />
                  <Link
                    to="/book"
                    style={{ display: 'block', background: '#c8a96e', color: '#0a1628', padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: "'Lato', sans-serif", fontWeight: 700, transition: 'background 0.3s', borderRadius: 2 }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e8d5a3'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#c8a96e'; }}
                  >
                    Check Availability
                  </Link>
                </div>
              </div>

              {/* Guarantee note */}
              <p style={{ color: '#8b8070', fontSize: '0.75rem', letterSpacing: '0.05em', paddingTop: '1.25rem', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
                Best Rate Guarantee &nbsp;&middot;&nbsp; Free Cancellation within 48 hours &nbsp;&middot;&nbsp; Complimentary Concierge Service
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;
