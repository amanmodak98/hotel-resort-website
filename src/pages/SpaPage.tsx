import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── Data ───────────────────────────────────────────────────────────────────

interface Treatment {
  name: string;
  duration: string;
  price: string;
  description: string;
}

const signatureTreatments: Treatment[] = [
  {
    name: 'Meridian Royal Ritual',
    duration: '150 min',
    price: 'from $485',
    description:
      'A four-hand ceremony beginning with a gold-infused body polish, followed by a 90-minute deep-tissue massage using warm jade stones and a concluding facial with caviar extract.',
  },
  {
    name: 'Hammam Voyage',
    duration: '120 min',
    price: 'from $320',
    description:
      'An evocative journey through the Moroccan hammam tradition: black soap cleanse, kessa exfoliation, rhassoul mask and a Vichy shower rinse that leaves the skin luminous.',
  },
  {
    name: 'Ayurvedic Abhyanga',
    duration: '90 min',
    price: 'from $260',
    description:
      'Two therapists synchronise their movements in a warm herbal-oil pour that grounds the nervous system and restores prana. Completed with Shirodhara and a copper-bowl singing bowl meditation.',
  },
  {
    name: 'Coastal Botanical Facial',
    duration: '75 min',
    price: 'from $220',
    description:
      'A results-driven facial featuring hand-pressed marine actives, cold-stone sculpting and a collagen-marine mask that lifts, hydrates and revives the complexion.',
  },
  {
    name: 'Sunset Sound Bath',
    duration: '60 min',
    price: 'from $160',
    description:
      'A floating sound meditation in our sea-water pool as the sun sets over the bay. Crystal bowls, gongs and breath-work guide you into deep theta states of restoration.',
  },
  {
    name: 'Couples Atelier Suite',
    duration: '180 min',
    price: 'from $720',
    description:
      'A private dual-therapist suite for two with soaking tub, private terrace and a tailored sensory menu including champagne, fruit and a private sound bath.',
  },
];

interface Ritual {
  title: string;
  description: string;
}

const wellnessRituals: Ritual[] = [
  {
    title: 'Thermal Circuit',
    description:
      'Sequential immersion through Finnish sauna, aromatic steam, ice fountain and tepidarium prepares the body for deep treatment and clears the respiratory system.',
  },
  {
    title: 'Sea-Water Pool',
    description:
      'Our heated 24-meter mineral pool is infused with magnesium and Dead Sea salts. Gentle jets target muscular tension while the salt-air eases the breath.',
  },
  {
    title: 'Meditation Atrium',
    description:
      'A lantern-lit sanctuary of cedar and stone offering daily guided meditation, breath-work and sound healing led by our resident yogi masters.',
  },
  {
    title: 'Wellness Pantry',
    description:
      'Cold-pressed juices, adaptogenic tonics and light plant-based plates curated by our resident naturopath are served throughout the day.',
  },
];

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function SpaPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ritualsRef = useRef<HTMLElement>(null);
  const treatmentsRef = useRef<HTMLElement>(null);

  const ritualsInView = useInView(ritualsRef, { once: true, margin: '-100px' });
  const treatmentsInView = useInView(treatmentsRef, { once: true, margin: '-100px' });

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
      <section
        ref={heroRef}
        className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=85"
          alt="The Meridian Spa — warm-toned treatment room with candles and stone basin"
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
          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="inline-block w-10 h-px bg-accent-400" />
            <span className="text-accent-400 text-xs">◆</span>
            <span className="inline-block w-10 h-px bg-accent-400" />
          </div>
          <p className="eyebrow mb-5">The Meridian Spa</p>
          <h1 className="font-display text-fluid-6xl text-ivory-200 leading-[1.05] mb-6 text-balance">
            A sanctuary for the senses
          </h1>
          <p className="accent-italic text-champagne-200 text-fluid-lg max-w-2xl mx-auto leading-relaxed">
            Twenty thousand square feet devoted entirely to restoration of body, mind and
            breath — where ancient ritual meets contemporary refinement.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-300 active:bg-accent-500 transition-all duration-300 shadow-sm hover:shadow-gold-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Reserve a Treatment
            </Link>
            <Link
              to="/experiences"
              className="inline-flex items-center justify-center border border-accent-400 text-accent-400 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-400/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Discover Experiences
            </Link>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-accent-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* INTRO */}
      <section
        className="py-24 px-6"
        style={{ background: 'var(--color-primary-800)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="eyebrow mb-4">Holistic Wellness</p>
          <h2 className="font-display text-fluid-4xl text-ivory-200 leading-tight mb-6 text-balance">
            Where the wisdom of ages meets contemporary luxury
          </h2>
          <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mb-8" />
          <p className="text-ivory-300/85 text-base leading-relaxed mb-5">
            At The Meridian Spa, every detail has been composed to honour the rituals of
            restoration practiced across cultures for centuries. From the warm hand of our
            therapists to the quiet choreography of our thermal circuit, each element invites
            you to slow, soften, and arrive fully in the present.
          </p>
          <p className="accent-italic text-champagne-200 text-fluid-base leading-relaxed">
            “Wellness is not a single moment, but the quiet accumulation of care.”
          </p>
        </motion.div>
      </section>

      {/* WELLNESS RITUALS */}
      <section ref={ritualsRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={ritualsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-4">The Rituals</p>
            <h2 className="font-display text-fluid-4xl text-ivory-200 leading-tight mb-4 text-balance">
              Four pillars of restoration
            </h2>
            <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate={ritualsInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {wellnessRituals.map((ritual) => (
              <motion.article
                key={ritual.title}
                variants={fadeUp}
                className="group relative bg-primary-800/60 border border-accent-400/15 rounded-lg p-8 hover:border-accent-400/40 transition-all duration-500 card-lift"
              >
                <span
                  aria-hidden="true"
                  className="block w-10 h-10 rounded-full border border-accent-400/40 mb-6 group-hover:bg-accent-400 group-hover:text-primary-900 transition-all duration-500 flex items-center justify-center text-accent-400 font-display text-lg"
                >
                  ✦
                </span>
                <h3 className="font-display text-xl text-ivory-200 mb-3 leading-tight text-balance">
                  {ritual.title}
                </h3>
                <p className="text-ivory-300/75 text-sm leading-relaxed">{ritual.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SIGNATURE TREATMENTS */}
      <section
        ref={treatmentsRef}
        className="py-24 px-6"
        style={{ background: 'var(--color-primary-800)' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={treatmentsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-4">Signature Treatments</p>
            <h2 className="font-display text-fluid-4xl text-ivory-200 leading-tight mb-4 text-balance">
              A curated menu of restoration
            </h2>
            <p className="accent-italic text-champagne-200 text-fluid-base max-w-2xl mx-auto">
              Each ritual is composed by our resident spa director and personalised to your
              constitution on the day of your visit.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={treatmentsInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {signatureTreatments.map((treatment) => (
              <motion.article
                key={treatment.name}
                variants={fadeUp}
                className="bg-primary-900/70 border border-accent-400/15 rounded-lg p-8 hover:border-accent-400/40 hover:shadow-gold-sm transition-all duration-500"
              >
                <header className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-display text-xl text-accent-400 leading-tight text-balance">
                    {treatment.name}
                  </h3>
                  <span className="font-display text-accent-300 text-sm whitespace-nowrap">
                    {treatment.price}
                  </span>
                </header>
                <p className="text-ivory-300/80 text-sm leading-relaxed mb-5">
                  {treatment.description}
                </p>
                <footer className="flex items-center justify-between text-xs text-ivory-400/70 uppercase tracking-[0.18em]">
                  <span>Duration · {treatment.duration}</span>
                  <Link
                    to="/contact"
                    className="text-accent-400 hover:text-accent-300 link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm"
                  >
                    Reserve
                  </Link>
                </footer>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARALLAX BANNER */}
      <section
        className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden"
        aria-label="A quiet place to restore"
      >
        <img
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=85"
          alt="Spa treatment room softly lit with candles and tropical greenery"
          width="1920"
          height="1280"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'rgba(10,25,47,0.7)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-2xl"
        >
          <p className="eyebrow mb-5">Wellness Memberships</p>
          <h2 className="font-display text-fluid-5xl text-ivory-200 leading-tight mb-6 text-balance">
            Become a resident of restoration
          </h2>
          <p className="accent-italic text-champagne-200 text-fluid-base mb-8">
            Annual memberships include unlimited thermal access, monthly signature treatments,
            and private consultations with our resident naturopath.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-300 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            Enquire About Membership
          </Link>
        </motion.div>
      </section>
    </div>
  );
}