import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DiningTab = 'meridian' | 'azure' | 'lounge';
type MenuTab = 'starters' | 'mains' | 'desserts';

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

interface PrivateDiningVenue {
  name: string;
  capacity: string;
  description: string;
  image: string;
}

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

const menuData: Record<MenuTab, MenuItem[]> = {
  starters: [
    {
      name: 'Seared Scallops',
      description: 'Pan-seared Hokkaido scallops, cauliflower purée, micro herbs, truffle oil',
      price: 38
    },
    {
      name: 'Foie Gras Torchon',
      description: 'Duck foie gras, brioche toast, Sauternes gel, candied walnuts, port reduction',
      price: 45
    },
    {
      name: 'Lobster Bisque',
      description: 'Velvety cold-water lobster bisque, cognac cream, chive oil, croutons',
      price: 32
    }
  ],
  mains: [
    {
      name: 'Wagyu Beef Tenderloin',
      description: 'A5 Wagyu, pomme purée, seasonal vegetables, bordelaise sauce, bone marrow',
      price: 89
    },
    {
      name: 'Pan-Seared Turbot',
      description: 'Wild Atlantic turbot, celeriac, brown butter, capers, lemon beurre blanc',
      price: 72
    },
    {
      name: 'Truffle Risotto',
      description: 'Carnaroli rice, black Périgord truffle, aged Parmesan, white truffle oil',
      price: 58
    }
  ],
  desserts: [
    {
      name: 'Valrhona Chocolate Sphere',
      description: 'Dark chocolate dome, salted caramel mousse, praline, vanilla ice cream',
      price: 28
    },
    {
      name: 'Crème Brûlée',
      description: 'Classic Tahitian vanilla custard, caramelised sugar, fresh berries',
      price: 22
    },
    {
      name: 'Tasting of Sorbets',
      description: 'Selection of seasonal sorbets, champagne granita, candied citrus zest',
      price: 18
    }
  ]
};

const privateDiningVenues: PrivateDiningVenue[] = [
  {
    name: "The Chef's Table",
    capacity: '8 guests max',
    description: 'An intimate kitchen-side experience where Chef Antoine personally presents each course with a live culinary performance.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
  },
  {
    name: 'The Wine Cellar',
    capacity: '12 guests max',
    description: 'Dine surrounded by over 4,000 bottles in our temperature-controlled cellar, with exclusive sommelier pairing menus.',
    image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&q=80'
  },
  {
    name: 'The Garden Pavilion',
    capacity: '20 guests max',
    description: 'Our alfresco garden pavilion offers a breathtaking open-air setting beneath the stars for larger private celebrations.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80'
  }
];

const tabVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 }
};

export default function DiningPage() {
  const [activeTab, setActiveTab] = useState<DiningTab>('meridian');
  const [activeMenuTab, setActiveMenuTab] = useState<MenuTab>('starters');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<PrivateDiningForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: 'Anniversary',
    specialRequests: ''
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value, 10) : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const diningTabs: { label: string; value: DiningTab }[] = [
    { label: 'The Meridian Restaurant', value: 'meridian' },
    { label: 'Azure Poolside Bar', value: 'azure' },
    { label: 'The Lounge', value: 'lounge' }
  ];

  const menuTabs: { label: string; value: MenuTab }[] = [
    { label: 'Starters', value: 'starters' },
    { label: 'Mains', value: 'mains' },
    { label: 'Desserts', value: 'desserts' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-96 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm tracking-widest text-gold border border-gold/30 rounded-full bg-gold/10">
              CULINARY EXCELLENCE
            </span>
            <h1 className="text-5xl md:text-6xl font-['Libre_Baskerville'] text-ivory mb-4">
              Dining at The Grand Meridian
            </h1>
            <p className="text-xl text-gold-light max-w-2xl mx-auto italic">
              A symphony of flavors awaits
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Tab Navigation */}
      <section className="bg-surface sticky top-0 z-40 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {diningTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-6 py-5 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300 ${
                  activeTab === tab.value
                    ? 'text-gold'
                    : 'text-muted hover:text-gold-light'
                }`}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="tabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* ---- THE MERIDIAN RESTAURANT ---- */}
        {activeTab === 'meridian' && (
          <motion.section
            key="meridian"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="bg-navy py-20 px-4"
          >
            <div className="max-w-7xl mx-auto">
              {/* Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
                {/* Image */}
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
                    alt="The Meridian Restaurant"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-4xl font-['Libre_Baskerville'] text-gold mb-3">
                    The Meridian Restaurant
                  </h2>
                  <p className="italic text-gold-light text-xl mb-6">
                    Where every meal is a masterpiece
                  </p>
                  <p className="text-ivory/80 leading-relaxed mb-4">
                    Recognised with two Michelin stars, The Meridian Restaurant stands as a pinnacle
                    of contemporary French gastronomy. Our dining room — dressed in warm amber
                    lighting, handcrafted leather banquettes and floor-to-ceiling windows overlooking
                    the bay — provides the perfect stage for an evening that transcends the
                    ordinary.
                  </p>
                  <p className="text-ivory/80 leading-relaxed mb-8">
                    Executive Chef Antoine Dubois brings two decades of classical French training to
                    every plate, selecting only the finest seasonal produce from trusted artisan
                    suppliers. Each tasting menu is a personal narrative — a journey through
                    memory, landscape and craft — designed to move and surprise in equal measure.
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {[
                      { label: 'Cuisine Type', value: 'Contemporary French' },
                      { label: 'Hours', value: '6:00 PM – 11:00 PM' },
                      { label: 'Dress Code', value: 'Smart Elegant' },
                      { label: 'Reservations', value: 'Recommended' }
                    ].map((detail) => (
                      <div
                        key={detail.label}
                        className="bg-surface rounded-lg p-4 border border-gold/10"
                      >
                        <p className="text-xs text-muted tracking-widest uppercase mb-1">
                          {detail.label}
                        </p>
                        <p className="text-ivory font-medium">{detail.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chef Bio */}
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-surface border border-gold/10 mb-10">
                    <div className="w-16 h-16 rounded-full bg-card border-2 border-gold/30 flex-shrink-0 flex items-center justify-center text-gold text-xl">
                      AD
                    </div>
                    <div>
                      <p className="text-xs text-muted tracking-widest uppercase mb-1">
                        Executive Chef
                      </p>
                      <h3 className="text-xl font-['Libre_Baskerville'] text-ivory mb-1">
                        Chef Antoine Dubois
                      </h3>
                      <p className="text-ivory/70 text-sm leading-relaxed">
                        Trained under Alain Ducasse and Joel Robuchon, Chef Antoine has earned
                        Michelin stars across three continents. His philosophy — rigorously
                        classical, fearlessly modern — defines every dish that leaves the kitchen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Preview */}
              <div>
                <h3 className="text-2xl font-['Libre_Baskerville'] text-ivory text-center mb-8">
                  Menu Preview
                </h3>

                {/* Menu Tabs */}
                <div className="flex justify-center gap-2 mb-8">
                  {menuTabs.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setActiveMenuTab(tab.value)}
                      className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                        activeMenuTab === tab.value
                          ? 'bg-gold text-navy'
                          : 'border border-gold text-gold hover:bg-gold/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
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
                        className="flex items-start justify-between gap-4 p-5 bg-surface rounded-xl border border-gold/10"
                      >
                        <div>
                          <h4 className="text-ivory font-['Libre_Baskerville'] text-lg mb-1">
                            {item.name}
                          </h4>
                          <p className="text-muted text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-gold font-medium text-lg flex-shrink-0">
                          ${item.price}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="text-center mt-10">
                  <a
                    href="/book"
                    className="inline-block px-10 py-4 bg-gold text-navy font-medium tracking-wider text-sm rounded hover:bg-gold-light transition-colors duration-300"
                  >
                    Reserve a Table
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ---- AZURE POOLSIDE BAR ---- */}
        {activeTab === 'azure' && (
          <motion.section
            key="azure"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="bg-navy py-20 px-4"
          >
            <div className="max-w-7xl mx-auto">
              {/* Split Layout Reversed */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
                {/* Content Left */}
                <div>
                  <h2 className="text-4xl font-['Libre_Baskerville'] text-gold mb-3">
                    Azure Poolside Bar
                  </h2>
                  <p className="italic text-gold-light text-xl mb-6">
                    Sip, Savor, Sunshine
                  </p>
                  <p className="text-ivory/80 leading-relaxed mb-4">
                    Perched at the edge of our signature infinity pool, Azure is the resort's most
                    vibrant gathering point. Whether you're unwinding after a morning swim or
                    watching the golden hour paint the horizon, our bar team crafts cocktails and
                    light bites that turn every sip into a ceremony.
                  </p>
                  <p className="text-ivory/80 leading-relaxed mb-8">
                    Inspired by the Mediterranean and the tropics, Azure's menu balances the playful
                    with the precise. From refreshing bespoke cocktails using hand-sourced spirits
                    to Wagyu sliders and fresh ceviche, every item is designed to complement the
                    languid luxury of a sun-drenched afternoon.
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {[
                      { label: 'Hours', value: '10:00 AM – 10:00 PM' },
                      { label: 'Dress Code', value: 'Resort Casual' },
                      { label: 'Location', value: 'Pool Deck Level 2' },
                      { label: 'Reservations', value: 'Walk-in Welcome' }
                    ].map((detail) => (
                      <div
                        key={detail.label}
                        className="bg-surface rounded-lg p-4 border border-gold/10"
                      >
                        <p className="text-xs text-muted tracking-widest uppercase mb-1">
                          {detail.label}
                        </p>
                        <p className="text-ivory font-medium">{detail.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Cocktail Menu */}
                  <div className="mb-8">
                    <h3 className="text-xl font-['Libre_Baskerville'] text-ivory mb-4">
                      Signature Cocktails
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          name: 'The Meridian Sunset',
                          description: 'Tequila, passion fruit, ginger, lime',
                          price: 22
                        },
                        {
                          name: 'Azure Blue',
                          description: 'Vodka, blue curaçao, coconut, lychee',
                          price: 24
                        },
                        {
                          name: 'Golden Hour',
                          description: 'Aged rum, vanilla, mango, prosecco',
                          price: 26
                        },
                        {
                          name: 'The Classic Negroni',
                          description: 'Gin, Campari, sweet vermouth',
                          price: 20
                        }
                      ].map((cocktail) => (
                        <div
                          key={cocktail.name}
                          className="flex items-start justify-between gap-4 p-4 bg-surface rounded-lg border border-gold/10"
                        >
                          <div>
                            <h4 className="text-ivory font-medium mb-0.5">{cocktail.name}</h4>
                            <p className="text-muted text-sm">{cocktail.description}</p>
                          </div>
                          <span className="text-gold font-medium flex-shrink-0">
                            ${cocktail.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Light Bites */}
                  <div className="mb-10">
                    <h3 className="text-xl font-['Libre_Baskerville'] text-ivory mb-4">
                      Light Bites
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Truffle Fries', price: 18 },
                        { name: 'Wagyu Sliders', price: 28 },
                        { name: 'Ceviche', price: 24 },
                        { name: 'Cheese Board', price: 35 }
                      ].map((bite) => (
                        <div
                          key={bite.name}
                          className="flex items-center justify-between p-3 bg-surface rounded-lg border border-gold/10"
                        >
                          <span className="text-ivory text-sm">{bite.name}</span>
                          <span className="text-gold text-sm font-medium">${bite.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/book"
                      className="inline-block px-8 py-3.5 bg-gold text-navy font-medium tracking-wider text-sm rounded hover:bg-gold-light transition-colors duration-300"
                    >
                      Reserve Cabana
                    </a>
                    <button className="px-8 py-3.5 border border-gold text-gold font-medium tracking-wider text-sm rounded hover:bg-gold/10 transition-colors duration-300">
                      View Full Menu
                    </button>
                  </div>
                </div>

                {/* Image Right */}
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=80"
                    alt="Azure Poolside Bar"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ---- THE LOUNGE ---- */}
        {activeTab === 'lounge' && (
          <motion.section
            key="lounge"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="bg-navy py-20 px-4"
          >
            <div className="max-w-5xl mx-auto">
              {/* Large BG Image Overlay Header */}
              <div className="relative rounded-2xl overflow-hidden mb-16">
                <img
                  src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=900&q=80"
                  alt="The Lounge"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent flex items-end p-10">
                  <div>
                    <h2 className="text-5xl font-['Libre_Baskerville'] text-ivory mb-2">
                      The Lounge
                    </h2>
                    <p className="italic text-gold-light text-xl">
                      Tradition &amp; Tranquility
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-ivory/80 leading-relaxed mb-5 text-lg">
                  Since our founding, The Lounge has been the heartbeat of The Grand Meridian — a
                  sanctuary where the timeless tradition of afternoon tea is observed with quiet
                  ceremony, and where evenings unfold beneath the warm glow of candlelight and
                  curated spirits.
                </p>
                <p className="text-ivory/80 leading-relaxed text-lg">
                  As dusk settles over the resort, The Lounge transforms into an intimate cocktail
                  parlour, with live piano accompaniment Thursday through Sunday and an exceptional
                  selection of rare spirits, vintage champagnes and house-crafted cocktails that
                  celebrate the art of hospitality.
                </p>
              </div>

              {/* Afternoon Tea Section */}
              <div className="bg-surface rounded-2xl border border-gold/20 p-10 mb-10">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="flex-1">
                    <p className="text-xs text-gold tracking-widest uppercase mb-2">
                      Daily Tradition
                    </p>
                    <h3 className="text-3xl font-['Libre_Baskerville'] text-ivory mb-2">
                      Afternoon Tea
                    </h3>
                    <p className="text-muted text-sm mb-6">2:00 PM – 5:00 PM &nbsp;·&nbsp; £95 per person</p>

                    <ul className="space-y-2.5">
                      {[
                        'Finger sandwiches with seasonal fillings',
                        'Freshly baked plain and fruit scones with Devonshire clotted cream',
                        'Seasonal pastries and patisserie',
                        'Premium loose-leaf teas from our curated selection',
                        'Champagne pairing available on request'
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-ivory/80">
                          <span className="text-gold mt-1">◆</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:w-56">
                    <div className="bg-card rounded-xl p-5 border border-gold/10">
                      <h4 className="text-xs text-muted tracking-widest uppercase mb-4">
                        Service Hours
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-gold text-sm font-medium">Afternoon Tea</p>
                          <p className="text-ivory/70 text-sm">2:00 PM – 5:00 PM</p>
                        </div>
                        <div className="border-t border-gold/10 pt-3">
                          <p className="text-gold text-sm font-medium">Evening Service</p>
                          <p className="text-ivory/70 text-sm">6:00 PM – Midnight</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="/book"
                  className="inline-block px-10 py-4 bg-gold text-navy font-medium tracking-wider text-sm rounded hover:bg-gold-light transition-colors duration-300"
                >
                  Book Afternoon Tea
                </a>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Private Dining Section */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs tracking-widest text-gold border border-gold/30 rounded-full bg-gold/10">
              EXCLUSIVE EXPERIENCES
            </span>
            <h2 className="text-4xl font-['Libre_Baskerville'] text-ivory mb-4">
              Private Dining &amp; Events
            </h2>
            <p className="text-ivory/70 max-w-2xl mx-auto leading-relaxed">
              Whether you're celebrating an intimate anniversary or hosting a board dinner, our
              private dining rooms offer bespoke experiences for 2 to 20 guests — with dedicated
              butler service and personalised menus crafted by Chef Antoine.
            </p>
          </motion.div>

          {/* Venue Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {privateDiningVenues.map((venue, index) => (
              <motion.div
                key={venue.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="bg-card rounded-2xl overflow-hidden border border-gold/10"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-['Libre_Baskerville'] text-ivory mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-gold tracking-wide uppercase mb-3">
                    {venue.capacity}
                  </p>
                  <p className="text-ivory/70 text-sm leading-relaxed">{venue.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-3xl font-['Libre_Baskerville'] text-ivory text-center mb-10">
              Submit an Enquiry
            </h3>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 px-8 bg-card rounded-2xl border border-gold/20"
                >
                  <div className="text-4xl text-gold mb-4">✓</div>
                  <h4 className="text-2xl font-['Libre_Baskerville'] text-ivory mb-3">
                    Enquiry Received
                  </h4>
                  <p className="text-ivory/70 leading-relaxed max-w-md mx-auto">
                    Thank you for your interest in private dining at The Grand Meridian. Our events
                    team will contact you within 24 hours to discuss your requirements.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="bg-card rounded-2xl border border-gold/10 p-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-muted tracking-widest uppercase mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted tracking-widest uppercase mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors duration-300"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted tracking-widest uppercase mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors duration-300"
                        placeholder="+1 000 000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted tracking-widest uppercase mb-2">
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleFormChange}
                        min={1}
                        max={20}
                        required
                        className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted tracking-widest uppercase mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted tracking-widest uppercase mb-2">
                        Preferred Time *
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted tracking-widest uppercase mb-2">
                      Occasion *
                    </label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-ivory focus:outline-none focus:border-gold transition-colors duration-300"
                    >
                      <option value="Anniversary">Anniversary</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Business">Business Dinner</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-muted tracking-widest uppercase mb-2">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full bg-surface border border-gold/20 rounded-lg px-4 py-3 text-ivory placeholder-muted focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                      placeholder="Dietary requirements, room preferences, decorations..."
                    />
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="submit"
                      className="px-12 py-4 bg-gold text-navy font-medium tracking-widest text-sm rounded hover:bg-gold-light transition-colors duration-300"
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
