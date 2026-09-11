import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

type MenuTab = 'starters' | 'mains' | 'desserts';

const menuData: Record<MenuTab, MenuItem[]> = {
  starters: [
    {
      name: 'Seared Hokkaido Scallops',
      description: 'Cauliflower purée, micro herbs, Périgord truffle oil',
      price: 38,
    },
    {
      name: 'Foie Gras Torchon',
      description: 'Brioche toast, Sauternes gel, candied walnuts, port reduction',
      price: 45,
    },
    {
      name: 'Lobster Bisque',
      description: 'Velvety cold-water lobster, cognac cream, chive oil, golden croutons',
      price: 32,
    },
  ],
  mains: [
    {
      name: 'Wagyu Beef Tenderloin',
      description: 'A5 Wagyu, pomme purée, seasonal vegetables, bordelaise, bone marrow',
      price: 89,
    },
    {
      name: 'Pan-Seared Wild Turbot',
      description: 'Celeriac, brown butter, capers, lemon beurre blanc',
      price: 72,
    },
    {
      name: 'Black Truffle Risotto',
      description: 'Carnaroli rice, Périgord truffle, aged Parmigiano, white truffle oil',
      price: 58,
    },
  ],
  desserts: [
    {
      name: 'Valrhona Chocolate Sphere',
      description: 'Dark chocolate dome, salted caramel mousse, praline, vanilla ice cream',
      price: 28,
    },
    {
      name: 'Tahitian Vanilla Crème Brûlée',
      description: 'Classic custard, caramelised sugar, fresh berries',
      price: 22,
    },
    {
      name: 'Tasting of Seasonal Sorbets',
      description: 'Champagne granita, candied citrus zest, mint oil',
      price: 18,
    },
  ],
};

interface Venue {
  name: string;
  capacity: string;
  description: string;
  image: string;
  alt: string;
}

const privateDiningVenues: Venue[] = [
  {
    name: "The Chef's Table",
    capacity: 'Up to 8 guests',
    description:
      'An intimate kitchen-side experience where Chef Antoine personally presents each course with a live culinary performance.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85',
    alt: "Chef's table in fine dining kitchen with copper pots overhead",
  },
  {
    name: 'The Wine Cellar',
    capacity: 'Up to 12 guests',
    description:
      'Dine surrounded by over 4,000 bottles in our temperature-controlled cellar, with exclusive sommelier pairing menus.',
    image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=900&q=85',
    alt: 'Stone wine cellar with rows of aged bottles on wooden racks',
  },
  {
    name: 'The Garden Pavilion',
    capacity: 'Up to 20 guests',
    description:
      'Our alfresco garden pavilion offers a breathtaking open-air setting beneath the stars for larger private celebrations.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85',
    alt: 'Garden pavilion dining setup with string lights and floral centrepieces',
  },
];

interface Cocktail {
  name: string;
  description: string;
  price: number;
}

const signatureCocktails: Cocktail[] = [
  { name: 'The Meridian Sunset', description: 'Tequila, passion fruit, ginger, lime', price: 22 },
  { name: 'Azure Blue', description: 'Vodka, blue curaçao, coconut, lychee', price: 24 },
  { name: 'Golden Hour', description: 'Aged rum, vanilla, mango, prosecco', price: 26 },
  { name: 'The Classic Negroni', description: 'Gin, Campari, sweet vermouth', price: 20 },
];

const lightBites = [
  { name: 'Truffle Fries', price: 18 },
  { name: 'Wagyu Sliders', price: 28 },
  { name: 'Citrus Ceviche', price: 24 },
  { name: 'Artisan Cheese Board', price: 35 },
];

type DiningTab = 'meridian' | 'azure' | 'lounge';

interface PrivateDiningForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  specialRequests: string;
}

const tabVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function DiningPage() {
  const [activeTab, setActiveTab] = useState<DiningTab>('meridian');
  const [activeMenuTab, setActiveMenuTab] = useState<MenuTab>('starters');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState<PrivateDiningForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: 'Anniversary',
    specialRequests: '',
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError('Please complete name and email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const diningTabs: { label: string; value: DiningTab }[] = [
    { label: 'The Meridian', value: 'meridian' },
    { label: 'Azure Bar', value: 'azure' },
    { label: 'The Lounge', value: 'lounge' },
  ];

  const menuTabs: { label: string; value: MenuTab }[] = [
    { label: 'Starters', value: 'starters' },
    { label: 'Mains', value: 'mains' },
    { label: 'Desserts', value: 'desserts' },
  ];

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
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85"
          alt="Candlelit fine-dining table with crystal glassware and floral arrangement"
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
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <div aria-hidden="true" className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block w-10 h-px bg-accent-400" />
            <span className="text-accent-400 text-xs">◆</span>
            <span className="inline-block w-10 h-px bg-accent-400" />
          </div>
          <p className="eyebrow mb-5">Culinary Excellence</p>
          <h1 className="font-display text-fluid-6xl text-ivory-200 leading-[1.05] mb-4 text-balance">
            Dining at The Grand Meridian
          </h1>
          <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mb-4" />
          <p className="accent-italic text-champagne-200 text-fluid-lg">
            A symphony of flavours awaits
          </p>
        </motion.div>
      </section>

      {/* TABS */}
      <div
        className="sticky top-20 z-30 backdrop-blur-luxury border-b border-accent-400/15"
        style={{ background: 'rgba(15, 35, 56, 0.92)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto" role="tablist" aria-label="Dining venues">
            {diningTabs.map((tab) => (
              <button
                key={tab.value}
                role="tab"
                aria-selected={activeTab === tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-6 py-5 text-[11px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 ${
                  activeTab === tab.value
                    ? 'text-accent-400'
                    : 'text-ivory-300/70 hover:text-accent-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="dining-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB CONTENT */}
      <AnimatePresence mode="wait">
        {/* ─── MERIDIAN ─── */}
        {activeTab === 'meridian' && (
          <motion.section
            key="meridian"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="py-24 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-14 items-start mb-20">
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85"
                    alt="Elegant dining room with amber lighting and banquette seating"
                    width="900"
                    height="600"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div>
                  <p className="eyebrow mb-4">Two Michelin Stars</p>
                  <h2 className="font-display text-fluid-4xl text-accent-400 mb-3 leading-tight text-balance">
                    The Meridian Restaurant
                  </h2>
                  <p className="accent-italic text-champagne-200 text-fluid-base mb-6">
                    Where every meal is a masterpiece
                  </p>
                  <p className="text-ivory-300/85 leading-relaxed mb-4">
                    Recognised with two Michelin stars, The Meridian Restaurant stands as a
                    pinnacle of contemporary French gastronomy. Our dining room — dressed in warm
                    amber lighting, handcrafted leather banquettes and floor-to-ceiling windows
                    overlooking the bay — provides the perfect stage for an evening that
                    transcends the ordinary.
                  </p>
                  <p className="text-ivory-300/85 leading-relaxed mb-9">
                    Executive Chef Antoine Dubois brings two decades of classical French training
                    to every plate, selecting only the finest seasonal produce from trusted
                    artisan suppliers. Each tasting menu is a personal narrative — a journey
                    through memory, landscape and craft — designed to move and surprise in equal
                    measure.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-9">
                    {[
                      { label: 'Cuisine', value: 'Contemporary French' },
                      { label: 'Hours', value: '6:00 PM – 11:00 PM' },
                      { label: 'Dress Code', value: 'Smart Elegant' },
                      { label: 'Reservations', value: 'Recommended' },
                    ].map((detail) => (
                      <div
                        key={detail.label}
                        className="bg-primary-800/70 rounded-lg p-4 border border-accent-400/15"
                      >
                        <p className="text-[10px] text-champagne-200 tracking-[0.2em] uppercase mb-1">
                          {detail.label}
                        </p>
                        <p className="text-ivory-200 font-medium">{detail.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-4 p-5 rounded-lg bg-primary-800/70 border border-accent-400/15">
                    <div
                      aria-hidden="true"
                      className="w-16 h-16 rounded-full bg-primary-900 border-2 border-accent-400/40 flex-shrink-0 flex items-center justify-center text-accent-400 font-display text-lg"
                    >
                      AD
                    </div>
                    <div>
                      <p className="text-[10px] text-champagne-200 tracking-[0.2em] uppercase mb-1">
                        Executive Chef
                      </p>
                      <h3 className="font-display text-xl text-ivory-200 mb-1">
                        Chef Antoine Dubois
                      </h3>
                      <p className="text-ivory-300/80 text-sm leading-relaxed">
                        Trained under Alain Ducasse and Joël Robuchon, Chef Antoine has earned
                        Michelin stars across three continents. His philosophy — rigorously
                        classical, fearlessly modern — defines every dish that leaves the kitchen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MENU */}
              <div>
                <h3 className="font-display text-fluid-3xl text-ivory-200 text-center mb-8 text-balance">
                  A Taste of the Menu
                </h3>
                <div className="flex justify-center gap-2 mb-8" role="tablist" aria-label="Menu">
                  {menuTabs.map((tab) => {
                    const active = activeMenuTab === tab.value;
                    return (
                      <button
                        key={tab.value}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setActiveMenuTab(tab.value)}
                        className={`px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 ${
                          active
                            ? 'bg-accent-400 text-primary-900 shadow-sm'
                            : 'border border-accent-400 text-accent-400 hover:bg-accent-400/10'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMenuTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-3xl mx-auto space-y-4"
                  >
                    {menuData[activeMenuTab].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start justify-between gap-4 p-5 bg-primary-800/70 rounded-lg border border-accent-400/15"
                      >
                        <div>
                          <h4 className="font-display text-ivory-200 text-lg mb-1 text-balance">
                            {item.name}
                          </h4>
                          <p className="text-ivory-300/80 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <span className="font-display text-accent-400 text-lg flex-shrink-0">
                          ${item.price}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="text-center mt-10">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-300 transition-colors duration-300 shadow-sm hover:shadow-gold-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                  >
                    Reserve a Table
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── AZURE ─── */}
        {activeTab === 'azure' && (
          <motion.section
            key="azure"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="py-24 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-14 items-start mb-16">
                <div>
                  <p className="eyebrow mb-4">Poolside Ceremonies</p>
                  <h2 className="font-display text-fluid-4xl text-accent-400 mb-3 leading-tight text-balance">
                    Azure Poolside Bar
                  </h2>
                  <p className="accent-italic text-champagne-200 text-fluid-base mb-6">
                    Sip, savour, sunshine
                  </p>
                  <p className="text-ivory-300/85 leading-relaxed mb-4">
                    Perched at the edge of our signature infinity pool, Azure is the resort's
                    most vibrant gathering point. Whether you are unwinding after a morning swim
                    or watching the golden hour paint the horizon, our bar team crafts cocktails
                    and light bites that turn every sip into a ceremony.
                  </p>
                  <p className="text-ivory-300/85 leading-relaxed mb-9">
                    Inspired by the Mediterranean and the tropics, Azure's menu balances the
                    playful with the precise. From refreshing bespoke cocktails using
                    hand-sourced spirits to wagyu sliders and fresh ceviche, every item is
                    designed to complement the languid luxury of a sun-drenched afternoon.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-9">
                    {[
                      { label: 'Hours', value: '10:00 AM – 10:00 PM' },
                      { label: 'Dress Code', value: 'Resort Casual' },
                      { label: 'Location', value: 'Pool Deck Level 2' },
                      { label: 'Reservations', value: 'Walk-in Welcome' },
                    ].map((detail) => (
                      <div
                        key={detail.label}
                        className="bg-primary-800/70 rounded-lg p-4 border border-accent-400/15"
                      >
                        <p className="text-[10px] text-champagne-200 tracking-[0.2em] uppercase mb-1">
                          {detail.label}
                        </p>
                        <p className="text-ivory-200 font-medium">{detail.value}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-display text-xl text-ivory-200 mb-4">
                    Signature Cocktails
                  </h3>
                  <div className="space-y-3 mb-9">
                    {signatureCocktails.map((cocktail) => (
                      <div
                        key={cocktail.name}
                        className="flex items-start justify-between gap-4 p-4 bg-primary-800/70 rounded-lg border border-accent-400/15"
                      >
                        <div>
                          <h4 className="text-ivory-200 font-medium mb-0.5">
                            {cocktail.name}
                          </h4>
                          <p className="text-ivory-300/80 text-sm">{cocktail.description}</p>
                        </div>
                        <span className="text-accent-400 font-medium flex-shrink-0">
                          ${cocktail.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-display text-xl text-ivory-200 mb-4">Light Bites</h3>
                  <div className="grid grid-cols-2 gap-3 mb-9">
                    {lightBites.map((bite) => (
                      <div
                        key={bite.name}
                        className="flex items-center justify-between p-3 bg-primary-800/70 rounded-lg border border-accent-400/15"
                      >
                        <span className="text-ivory-200 text-sm">{bite.name}</span>
                        <span className="text-accent-400 text-sm font-medium">
                          ${bite.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-300 transition-colors duration-300 shadow-sm hover:shadow-gold-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                  >
                    Reserve a Cabana
                  </Link>
                </div>

                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=85"
                    alt="Sun-drenched poolside bar with turquoise water in foreground"
                    width="900"
                    height="600"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── LOUNGE ─── */}
        {activeTab === 'lounge' && (
          <motion.section
            key="lounge"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="py-24 px-6"
          >
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden mb-16">
                <img
                  src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=900&q=85"
                  alt="Elegant drawing-room with afternoon tea set on a silver tray"
                  width="1200"
                  height="600"
                  loading="lazy"
                  className="w-full h-80 object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/60 to-transparent flex items-end p-10"
                >
                  <div>
                    <h2 className="font-display text-fluid-5xl text-ivory-200 mb-2 text-balance">
                      The Lounge
                    </h2>
                    <p className="accent-italic text-champagne-200 text-fluid-lg">
                      Tradition &amp; Tranquility
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-ivory-300/85 leading-relaxed mb-5 text-fluid-base">
                  Since our founding, The Lounge has been the heartbeat of The Grand Meridian —
                  a sanctuary where the timeless tradition of afternoon tea is observed with
                  quiet ceremony, and where evenings unfold beneath the warm glow of candlelight
                  and curated spirits.
                </p>
                <p className="text-ivory-300/85 leading-relaxed text-fluid-base">
                  As dusk settles over the resort, The Lounge transforms into an intimate
                  cocktail parlour, with live piano accompaniment Thursday through Sunday and an
                  exceptional selection of rare spirits, vintage champagnes and house-crafted
                  cocktails that celebrate the art of hospitality.
                </p>
              </div>

              <div className="bg-primary-800/70 rounded-2xl border border-accent-400/20 p-10 mb-9">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="flex-1">
                    <p className="eyebrow mb-3">Daily Ritual</p>
                    <h3 className="font-display text-fluid-3xl text-ivory-200 mb-2 text-balance">
                      Afternoon Tea
                    </h3>
                    <p className="text-champagne-200 text-sm mb-6">
                      2:00 PM – 5:00 PM · $95 per person
                    </p>
                    <ul className="space-y-2.5">
                      {[
                        'Finger sandwiches with seasonal fillings',
                        'Freshly baked scones with Devonshire clotted cream',
                        'Seasonal pastries and patisserie',
                        'Premium loose-leaf teas from our curated selection',
                        'Champagne pairing available on request',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-ivory-300/85 text-sm"
                        >
                          <span aria-hidden="true" className="text-accent-400 mt-1">
                            ◆
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:w-56">
                    <div className="bg-primary-900/80 rounded-xl p-5 border border-accent-400/15">
                      <h4 className="text-[10px] text-champagne-200 tracking-[0.2em] uppercase mb-4">
                        Service Hours
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-accent-400 text-sm font-medium">Afternoon Tea</p>
                          <p className="text-ivory-300/80 text-sm">2:00 PM – 5:00 PM</p>
                        </div>
                        <div className="border-t border-accent-400/15 pt-3">
                          <p className="text-accent-400 text-sm font-medium">Evening Service</p>
                          <p className="text-ivory-300/80 text-sm">6:00 PM – Midnight</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-7 py-3.5 rounded-md hover:bg-accent-300 transition-colors duration-300 shadow-sm hover:shadow-gold-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  Book Afternoon Tea
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* PRIVATE DINING */}
      <section className="py-24 px-6" style={{ background: 'var(--color-primary-800)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-4">Exclusive Experiences</p>
            <h2 className="font-display text-fluid-4xl text-ivory-200 mb-4 leading-tight text-balance">
              Private Dining &amp; Events
            </h2>
            <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mb-6" />
            <p className="accent-italic text-champagne-200 max-w-2xl mx-auto leading-relaxed">
              Whether you are celebrating an intimate anniversary or hosting a board dinner, our
              private dining rooms offer bespoke experiences for 2 to 20 guests — with dedicated
              butler service and personalised menus crafted by Chef Antoine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-7 mb-16">
            {privateDiningVenues.map((venue, index) => (
              <motion.article
                key={venue.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                className="group bg-primary-900/70 rounded-2xl overflow-hidden border border-accent-400/15 hover:border-accent-400/40 hover:shadow-gold-sm transition-all duration-500"
              >
                <div className="h-52 overflow-hidden">
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
                  <h3 className="font-display text-xl text-ivory-200 mb-1 text-balance">
                    {venue.name}
                  </h3>
                  <p className="text-[10px] text-accent-400 tracking-[0.2em] uppercase mb-3">
                    {venue.capacity}
                  </p>
                  <p className="text-ivory-300/85 text-sm leading-relaxed">
                    {venue.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ENQUIRY FORM */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="font-display text-fluid-3xl text-ivory-200 text-center mb-8 text-balance">
              Submit an Enquiry
            </h3>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-14 px-8 bg-primary-900/70 rounded-2xl border border-accent-400/25"
                >
                  <div
                    aria-hidden="true"
                    className="w-14 h-14 rounded-full bg-accent-400/15 border border-accent-400 flex items-center justify-center mx-auto mb-5 text-accent-400 text-2xl"
                  >
                    ✓
                  </div>
                  <h4 className="font-display text-2xl text-ivory-200 mb-3">
                    Enquiry Received
                  </h4>
                  <p className="text-ivory-300/85 leading-relaxed max-w-md mx-auto">
                    Thank you for your interest in private dining at The Grand Meridian. Our
                    events team will contact you within 24 hours to discuss your requirements.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  noValidate
                  className="bg-primary-900/70 rounded-2xl border border-accent-400/15 p-8 space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="pd-name" className="eyebrow block mb-2">
                        Full Name *
                      </label>
                      <input
                        id="pd-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 placeholder:text-ivory-400/50 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="pd-email" className="eyebrow block mb-2">
                        Email Address *
                      </label>
                      <input
                        id="pd-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 placeholder:text-ivory-400/50 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="pd-phone" className="eyebrow block mb-2">
                        Phone Number
                      </label>
                      <input
                        id="pd-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 placeholder:text-ivory-400/50 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                        placeholder="+1 000 000 0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="pd-guests" className="eyebrow block mb-2">
                        Number of Guests *
                      </label>
                      <input
                        id="pd-guests"
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleFormChange}
                        min={1}
                        max={20}
                        required
                        className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="pd-date" className="eyebrow block mb-2">
                        Preferred Date *
                      </label>
                      <input
                        id="pd-date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="pd-time" className="eyebrow block mb-2">
                        Preferred Time *
                      </label>
                      <input
                        id="pd-time"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pd-occasion" className="eyebrow block mb-2">
                      Occasion *
                    </label>
                    <select
                      id="pd-occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 px-4 py-3 rounded-md outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-400"
                    >
                      <option value="Anniversary">Anniversary</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Business">Business Dinner</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pd-requests" className="eyebrow block mb-2">
                      Special Requests
                    </label>
                    <textarea
                      id="pd-requests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 placeholder:text-ivory-400/50 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400 resize-none"
                      placeholder="Dietary requirements, room preferences, decorations..."
                    />
                  </div>

                  <p
                    role="status"
                    aria-live="polite"
                    className={`text-xs ${formError ? 'text-red-300' : 'text-champagne-200/70'}`}
                  >
                    {formError || 'A member of our events team will respond within 24 hours.'}
                  </p>

                  <div className="text-center pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-8 py-3.5 rounded-md hover:bg-accent-300 transition-colors duration-300 shadow-sm hover:shadow-gold-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                    >
                      Send Enquiry
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}