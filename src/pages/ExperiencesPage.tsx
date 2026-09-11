import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion';

interface Experience {
  id: number;
  title: string;
  category: 'wellness' | 'culinary' | 'adventure' | 'culture';
  duration: string;
  price: string;
  image: string;
  alt: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Sunrise Yoga on the Pier',
    category: 'wellness',
    duration: '75 min',
    price: 'Complimentary',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&q=85',
    alt: 'Guests practicing sunrise yoga on a wooden pier above calm water',
    description:
      'Begin the day with a gentle vinyasa flow on our private ocean pier as the sun rises over the horizon. Mats, bolsters and herbal tonics are provided.',
  },
  {
    id: 2,
    title: 'Truffle Hunt & Tasting',
    category: 'culinary',
    duration: '4 hours',
    price: 'from $385',
    image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=900&q=85',
    alt: 'Hands unearthing black truffles from forest soil',
    description:
      'Join our resident forager and Lagotto Romagnolo truffle dogs on a private estate hunt, followed by a tasting lunch paired with Barolo and Burgundy.',
  },
  {
    id: 3,
    title: 'Private Yacht Charter',
    category: 'adventure',
    duration: 'Half or Full Day',
    price: 'from $2,400',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85',
    alt: 'White luxury motor yacht anchored in turquoise Mediterranean waters',
    description:
      'Cruise the coastline aboard a 70-foot motor yacht with captain and crew. Includes chilled champagne, seasonal canapés, snorkel gear and paddle boards.',
  },
  {
    id: 4,
    title: 'Atelier Pastry Masterclass',
    category: 'culinary',
    duration: '3 hours',
    price: 'from $295',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=85',
    alt: 'Pastry chef piping delicate desserts in a professional kitchen',
    description:
      'Learn the secrets of our Executive Pastry Chef — from laminated dough to mirror-glaze entremets — and take home a hand-boxed selection of your creations.',
  },
  {
    id: 5,
    title: 'Olive Grove Picnic',
    category: 'culinary',
    duration: '3 hours',
    price: 'from $220',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=85',
    alt: 'Picnic blanket spread beneath an ancient olive tree at golden hour',
    description:
      'A private chauffeur whisks you to a centuries-old olive grove where a hand-laundered linen table awaits with cured meats, fresh bread and estate-pressed oil.',
  },
  {
    id: 6,
    title: 'Coral Reef Diving',
    category: 'adventure',
    duration: 'Half Day',
    price: 'from $310',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=85',
    alt: 'Scuba diver swimming above a vibrant coral reef formation',
    description:
      'Two-tank guided dive through our protected reef with PADI-certified instructors. Suitable for certified divers; introductory dives available for beginners.',
  },
  {
    id: 7,
    title: 'Private Gallery Tour',
    category: 'culture',
    duration: 'Half Day',
    price: 'from $650',
    image: 'https://images.unsplash.com/photo-1499332347742-4946bddc7d94?w=900&q=85',
    alt: 'Elegant gallery interior with framed contemporary art on white walls',
    description:
      'After-hours access to a private collection of post-impressionist and contemporary works, hosted by our resident curator over aperitifs.',
  },
  {
    id: 8,
    title: 'Stargazing on the Cliffs',
    category: 'culture',
    duration: '2 hours',
    price: 'from $185',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=85',
    alt: 'Brilliant starry sky above a silhouetted cliff edge at night',
    description:
      'A guided tour of the constellations with our resident astronomer, paired with vintage port and a cashmere throw on the clifftop terrace.',
  },
  {
    id: 9,
    title: 'Sunset Horseback Ride',
    category: 'adventure',
    duration: '90 min',
    price: 'from $240',
    image: 'https://images.unsplash.com/photo-1553284965-e2815db2e5d4?w=900&q=85',
    alt: 'Horse and rider silhouetted against a golden sunset on a beach',
    description:
      'A guided ride along the shoreline at golden hour, ending with a fire-lit aperitif on the dunes. Suitable for all experience levels.',
  },
];

type Filter = 'all' | Experience['category'];

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Experiences' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'culinary', label: 'Culinary' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'culture', label: 'Culture' },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ExperiencesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

  const filtered = activeFilter === 'all' ? experiences : experiences.filter((e) => e.category === activeFilter);

  useEffect(() => {
    document.title = 'Experiences — The Grand Meridian';
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: 'var(--font-body)',
        background: 'var(--color-primary-900)',
        color: 'var(--color-ivory-200)',
      }}
    >
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=85"
          alt="Aerial view of a luxury yacht cutting across the Mediterranean at sunset"
          width="1920"
          height="1280"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <div aria-hidden="true" className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block w-10 h-px bg-accent-400" />
            <span className="text-accent-400 text-xs">◆</span>
            <span className="inline-block w-10 h-px bg-accent-400" />
          </div>
          <p className="eyebrow mb-5">Experiences</p>
          <h1 className="font-display text-fluid-6xl text-ivory-200 leading-[1.05] mb-6 text-balance">
            Moments composed with intention
          </h1>
          <p className="accent-italic text-champagne-200 text-fluid-lg max-w-2xl mx-auto leading-relaxed">
            From sunrise yoga on the pier to private dinners in centuries-old olive groves —
            curated encounters that turn a stay into a story.
          </p>
        </motion.div>
      </section>

      {/* FILTERS */}
      <div
        className="sticky top-20 z-30 backdrop-blur-luxury border-b border-accent-400/15"
        style={{ background: 'rgba(15, 35, 56, 0.92)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => {
            const active = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={active}
                className={`px-5 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 ${
                  active
                    ? 'bg-accent-400 text-primary-900 shadow-sm'
                    : 'border border-accent-400/40 text-accent-400 hover:bg-accent-400/10'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* EXPERIENCE GRID */}
      <section className="py-20 px-6" ref={gridRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((experience) => (
                <motion.article
                  key={experience.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="group bg-primary-800/70 border border-accent-400/15 rounded-lg overflow-hidden hover:border-accent-400/40 hover:shadow-gold-sm transition-all duration-500 card-lift"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.alt}
                      width="900"
                      height="600"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-accent-300 bg-primary-900/70 backdrop-blur px-2.5 py-1 rounded-full">
                      {experience.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl text-ivory-200 mb-3 leading-tight text-balance">
                      {experience.title}
                    </h3>
                    <p className="text-ivory-300/80 text-sm leading-relaxed mb-5">
                      {experience.description}
                    </p>
                    <footer className="flex items-center justify-between pt-4 border-t border-accent-400/15 text-xs uppercase tracking-[0.18em] text-ivory-400/80">
                      <span>{experience.duration}</span>
                      <span className="font-display text-accent-300 normal-case tracking-normal text-sm">
                        {experience.price}
                      </span>
                    </footer>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* PRIVATE EXPERIENCE CTA */}
      <section
        className="relative py-28 px-6 overflow-hidden"
        aria-labelledby="private-experience-heading"
      >
        <img
          src="https://images.unsplash.com/photo-1549294413-26f195200c16?w=1920&q=85"
          alt="Cliffside terrace set for a private dinner at twilight"
          width="1920"
          height="1280"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'rgba(10,25,47,0.78)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <p className="eyebrow mb-4">Bespoke Enquiries</p>
          <h2
            id="private-experience-heading"
            className="font-display text-fluid-5xl text-ivory-200 leading-tight mb-4 text-balance"
          >
            Curate a moment entirely your own
          </h2>
          <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mb-6" />
          <p className="accent-italic text-champagne-200 text-fluid-base mb-8">
            Our concierge team will compose a private itinerary — yacht charters, heli-tours,
            ancestral vineyards or simply an evening alone with the chef.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-300 transition-all duration-300 shadow-sm hover:shadow-gold-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            Speak with Concierge
          </a>
        </motion.div>
      </section>
    </div>
  );
}