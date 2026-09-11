import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Room {
  id: number;
  name: string;
  category: 'room' | 'suite' | 'villa';
  image: string;
  alt: string;
  size: number;
  maxOccupancy: number;
  bedType: string;
  view: string;
  pricePerNight: number;
  description: string;
  amenities: string[];
  highlights: string[];
}

const rooms: Room[] = [
  {
    id: 1,
    name: 'Deluxe Garden Room',
    category: 'room',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85',
    alt: 'Deluxe Garden Room with warm wood floors and tropical garden balcony view',
    size: 450,
    maxOccupancy: 2,
    bedType: 'King Bed',
    view: 'Garden View',
    pricePerNight: 450,
    description:
      'An elegant retreat surrounded by lush tropical gardens, offering a serene escape from the world. The Deluxe Garden Room combines timeless design with modern comforts, featuring hand-selected furnishings and locally inspired artwork.',
    amenities: ['Free WiFi', 'King Bed', 'Marble Bathroom', 'Mini Bar', 'Room Service', 'Flat-screen TV', 'Air Conditioning', 'In-room Safe'],
    highlights: ['Tropical garden views', 'Marble en-suite bathroom', 'Curated minibar', 'Evening turndown service'],
  },
  {
    id: 2,
    name: 'Deluxe Ocean Room',
    category: 'room',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&q=85',
    alt: 'Deluxe Ocean Room with private balcony overlooking the sea',
    size: 500,
    maxOccupancy: 2,
    bedType: 'King Bed',
    view: 'Ocean View',
    pricePerNight: 620,
    description:
      'Wake up to breathtaking ocean panoramas from the comfort of your private balcony. The Deluxe Ocean Room is a sanctuary of calm, where the rhythm of the waves sets the tone for each day.',
    amenities: ['Ocean View Balcony', 'King Bed', 'Marble Bathroom', 'Mini Bar', 'Nespresso Machine', 'Rain Shower', 'ESPA Toiletries', '24-hour Room Service'],
    highlights: ['Private ocean-view balcony', 'Nespresso machine', 'Rain shower', 'Premium ESPA toiletries'],
  },
  {
    id: 3,
    name: 'Junior Suite',
    category: 'suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=85',
    alt: 'Junior Suite with separate living area and warm Mediterranean palette',
    size: 750,
    maxOccupancy: 3,
    bedType: 'King Bed + Sofa',
    view: 'Ocean View',
    pricePerNight: 850,
    description:
      'Spacious living area with separate bedroom offering an elevated sense of space and refinement. The Junior Suite is ideal for those who appreciate a dedicated lounge for relaxation or entertaining.',
    amenities: ['Separate Living Area', 'Soaking Tub', 'Walk-in Closet', 'Premium Bar', 'Butler Service', 'Terrace', 'Ocean View', 'Smart TV'],
    highlights: ['Separate living and sleeping areas', 'Free-standing soaking tub', 'Walk-in closet', 'Dedicated butler service'],
  },
  {
    id: 4,
    name: 'Executive Suite',
    category: 'suite',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=85',
    alt: 'Executive Suite with panoramic ocean view and dedicated work area',
    size: 950,
    maxOccupancy: 4,
    bedType: 'King Bed',
    view: 'Panoramic View',
    pricePerNight: 1200,
    description:
      'Impeccably appointed executive suite designed for discerning travelers who demand the finest. This suite seamlessly blends business functionality with indulgent leisure in a breathtaking panoramic setting.',
    amenities: ['Executive Lounge Access', 'Meeting Facilities', 'Panoramic View', 'Premium Butler', 'Wine Cellar', 'In-suite Jacuzzi', 'Home Theater', 'Dining Area'],
    highlights: ['Private panoramic terrace', 'In-suite jacuzzi', 'Executive lounge access', 'Dedicated meeting space'],
  },
  {
    id: 5,
    name: 'Grand Suite',
    category: 'suite',
    image: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&q=85',
    alt: 'Grand Suite bedroom with four-poster bed and ocean view',
    size: 1200,
    maxOccupancy: 4,
    bedType: 'King + Twin',
    view: 'Ocean & Pool',
    pricePerNight: 1800,
    description:
      'The pinnacle of suite luxury, offering sweeping views over both the ocean and our signature infinity pool. The Grand Suite is an immersive residential experience with museum-quality art and bespoke furnishings.',
    amenities: ['Private Pool Access', 'Personal Chef on Request', 'Panoramic Terrace', 'Two Bathrooms', 'Lounge Area', 'Daily Turndown', 'Flower Service', 'Private Check-in'],
    highlights: ['Private pool access', 'Dual ocean and pool views', 'Personal chef on request', 'Private check-in experience'],
  },
  {
    id: 6,
    name: 'Penthouse Suite',
    category: 'suite',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=900&q=85',
    alt: 'Penthouse suite with floor-to-ceiling windows and infinity hot tub',
    size: 2000,
    maxOccupancy: 4,
    bedType: 'King Bed',
    view: '360° Ocean',
    pricePerNight: 2400,
    description:
      'Perched atop the resort, our Penthouse commands 360° ocean views and an unrivaled sense of elevation. Every detail has been curated to deliver an extraordinary living experience with the finest materials and technologies.',
    amenities: ['360° Ocean Views', 'Private Rooftop Terrace', 'Infinity Hot Tub', 'Chef Kitchen', 'Smart Home System', 'VIP Concierge', 'Helipad Access', 'Rolls Royce Transfer'],
    highlights: ['360° panoramic ocean views', 'Rooftop infinity hot tub', 'Rolls Royce airport transfer', 'Private helipad access'],
  },
  {
    id: 7,
    name: 'Beach Villa',
    category: 'villa',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=85',
    alt: 'Beach Villa with private pool and direct access to white sand',
    size: 2800,
    maxOccupancy: 6,
    bedType: 'King + 2 Queens',
    view: 'Beachfront',
    pricePerNight: 3200,
    description:
      'Step directly onto the pristine white sand from your private villa. The Beach Villa is a self-contained paradise offering the freedom and privacy of your own home with the full service of the resort at your fingertips.',
    amenities: ['Direct Beach Access', 'Private Pool', 'Full Kitchen', '3 Bedrooms', 'Outdoor Shower', 'Beach Butler', 'Golf Cart', 'Twice-daily Housekeeping'],
    highlights: ['Direct beachfront access', 'Private infinity pool', 'Three en-suite bedrooms', 'Dedicated beach butler'],
  },
  {
    id: 8,
    name: 'Royal Villa',
    category: 'villa',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85',
    alt: 'Royal Villa estate with private infinity pool and panoramic ocean',
    size: 4500,
    maxOccupancy: 8,
    bedType: '4 King Beds',
    view: 'Panoramic Estate',
    pricePerNight: 5800,
    description:
      'The ultimate expression of luxury, the Royal Villa is an estate unto itself. Reserved for the most distinguished guests, it offers an unprecedented level of privacy, space and bespoke service that is simply without equal.',
    amenities: ['4 Bedrooms', 'Private Infinity Pool', 'Live-in Butler', 'Personal Chef', 'Home Theater', 'Spa Room', 'Wine Cellar', 'Helipad', 'Rolls Royce Fleet', 'Yacht Charter'],
    highlights: ['Private infinity pool and spa room', 'Live-in butler and personal chef', 'Rolls Royce fleet', 'Yacht charter included'],
  },
];

type FilterCategory = 'all' | 'room' | 'suite' | 'villa';

const filterLabels: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'room', label: 'Rooms' },
  { value: 'suite', label: 'Suites' },
  { value: 'villa', label: 'Villas' },
];

const categoryBadgeLabel: Record<Room['category'], string> = {
  room: 'ROOM',
  suite: 'SUITE',
  villa: 'VILLA',
};

// ─── Icons ──────────────────────────────────────────────────────────────────

function BedIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12V6a1 1 0 011-1h16a1 1 0 011 1v6M3 12h18M3 12v6m18-6v6M3 18h18" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function SquareIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16v16H4z" />
    </svg>
  );
}

function ViewIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─── Room Card ──────────────────────────────────────────────────────────────

function RoomCard({ room, index }: { room: Room; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-primary-800/60 border border-accent-400/15 rounded-lg overflow-hidden flex flex-col hover:border-accent-400/40 hover:shadow-gold-sm transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
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
          className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent"
        />
        <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.2em] text-accent-300 bg-primary-900/80 px-2.5 py-1 rounded">
          {categoryBadgeLabel[room.category]}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl text-accent-400 mb-3 leading-tight text-balance">
          {room.name}
        </h3>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-ivory-400 text-xs">
            <SquareIcon />
            <span>{room.size} sqft</span>
          </div>
          <div className="flex items-center gap-1.5 text-ivory-400 text-xs">
            <PersonIcon />
            <span>Up to {room.maxOccupancy} guests</span>
          </div>
          <div className="flex items-center gap-1.5 text-ivory-400 text-xs">
            <BedIcon />
            <span>{room.bedType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-ivory-400 text-xs">
            <ViewIcon />
            <span>{room.view}</span>
          </div>
        </div>

        <p
          className={`text-ivory-300/85 text-sm leading-relaxed mb-4 ${
            expanded ? '' : 'line-clamp-2'
          }`}
        >
          {room.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="text-[10px] text-accent-300 border border-accent-400/30 px-2 py-0.5 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="text-[10px] text-ivory-400 border border-ivory-400/30 px-2 py-0.5 rounded-full">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="mb-5">
          <span className="text-ivory-400 text-xs">From </span>
          <span className="font-display text-accent-400 text-2xl">
            ${room.pricePerNight.toLocaleString()}
          </span>
          <span className="text-ivory-400 text-xs"> / night</span>
        </div>

        <div className="flex gap-3 mt-auto">
          <Link
            to="/contact"
            className="flex-1 inline-flex items-center justify-center bg-accent-400 text-primary-900 text-[11px] font-semibold tracking-[0.18em] uppercase py-2.5 text-center rounded-md hover:bg-accent-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            Reserve Suite
          </Link>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="flex-1 inline-flex items-center justify-center border border-accent-400 text-accent-400 text-[11px] font-semibold tracking-[0.18em] uppercase py-2.5 rounded-md hover:bg-accent-400/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            {expanded ? 'Less Info' : 'View Details'}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-accent-400/20">
                <h4 className="text-champagne-200 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  All Amenities
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
                  {room.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-2 text-ivory-300/85 text-sm"
                    >
                      <span className="text-accent-400">
                        <CheckIcon />
                      </span>
                      {amenity}
                    </li>
                  ))}
                </ul>
                {room.highlights.length > 0 && (
                  <>
                    <h4 className="text-champagne-200 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                      Signature Highlights
                    </h4>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {room.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center gap-2 text-ivory-300/85 text-sm"
                        >
                          <span aria-hidden="true" className="text-accent-400">
                            —
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function RoomsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredRooms =
    activeFilter === 'all' ? rooms : rooms.filter((r) => r.category === activeFilter);

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
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=85"
          alt="Elegantly appointed suite bedroom with soft natural light and luxurious linens"
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
          <p className="eyebrow mb-5">Our Accommodations</p>
          <h1 className="font-display text-fluid-6xl text-ivory-200 leading-[1.05] mb-4 text-balance">
            Rooms &amp; Suites
          </h1>
          <div aria-hidden="true" className="w-16 h-px bg-accent-400 mx-auto mb-4" />
          <p className="accent-italic text-champagne-200 text-fluid-base">
            Eight exceptional spaces composed for the art of rest
          </p>
        </motion.div>
      </section>

      {/* FILTER BAR */}
      <div
        className="sticky top-20 z-30 backdrop-blur-luxury border-b border-accent-400/15"
        style={{ background: 'rgba(15, 35, 56, 0.92)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-2">
          {filterLabels.map(({ value, label }) => {
            const active = activeFilter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setActiveFilter(value)}
                aria-pressed={active}
                className={`px-6 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 ${
                  active
                    ? 'bg-accent-400 text-primary-900 shadow-sm'
                    : 'border border-accent-400 text-accent-400 hover:bg-accent-400/10'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ROOMS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* RATES & POLICIES */}
      <section className="py-24 px-6" style={{ background: 'var(--color-primary-800)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-4">Pricing Information</p>
            <h2 className="font-display text-fluid-4xl text-ivory-200 mb-4 leading-tight text-balance">
              Rates &amp; Policies
            </h2>
            <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="overflow-x-auto mb-12"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-accent-400/30">
                  <th className="text-left py-3 pr-6 text-accent-400 font-semibold tracking-[0.18em] uppercase text-xs">
                    Season
                  </th>
                  <th className="text-left py-3 pr-6 text-accent-400 font-semibold tracking-[0.18em] uppercase text-xs">
                    Dates
                  </th>
                  <th className="text-left py-3 text-accent-400 font-semibold tracking-[0.18em] uppercase text-xs">
                    Rate Modifier
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { season: 'Peak Season', dates: 'Dec 15 – Jan 10 & Jul – Aug', modifier: '+30%' },
                  { season: 'High Season', dates: 'Feb – Apr & Oct – Dec 14', modifier: '+10%' },
                  { season: 'Shoulder Season', dates: 'May & Sep – Oct', modifier: 'Standard' },
                  { season: 'Low Season', dates: 'Jun & Early Sep', modifier: '−10%' },
                ].map((row) => (
                  <tr
                    key={row.season}
                    className="border-b border-accent-400/10 hover:bg-primary-900/40 transition-colors"
                  >
                    <td className="py-3.5 pr-6 text-ivory-200">{row.season}</td>
                    <td className="py-3.5 pr-6 text-ivory-300/80">{row.dates}</td>
                    <td
                      className={`py-3.5 font-medium ${
                        row.modifier.startsWith('+')
                          ? 'text-accent-400'
                          : row.modifier.startsWith('−')
                          ? 'text-champagne-200'
                          : 'text-ivory-200'
                      }`}
                    >
                      {row.modifier}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            <div className="bg-primary-900/60 p-6 rounded-lg border border-accent-400/15">
              <h3 className="text-accent-400 font-semibold tracking-[0.2em] uppercase text-xs mb-4">
                Cancellation Policy
              </h3>
              <ul className="space-y-2 text-ivory-300/85 text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-accent-400">—</span>Free cancellation up to 72 hours prior
                  to arrival.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400">—</span>Cancellations within 72 hours: one
                  night charged.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400">—</span>No-show: full reservation amount
                  charged.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400">—</span>Peak season reservations: 7-day
                  cancellation policy applies.
                </li>
              </ul>
            </div>
            <div className="bg-primary-900/60 p-6 rounded-lg border border-accent-400/15">
              <h3 className="text-accent-400 font-semibold tracking-[0.2em] uppercase text-xs mb-4">
                General Policies
              </h3>
              <ul className="space-y-2 text-ivory-300/85 text-sm leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-accent-400">—</span>Check-in: 3:00 PM · Check-out: 12:00
                  PM.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400">—</span>Early check-in and late check-out upon
                  availability.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400">—</span>All rates include daily breakfast for
                  two.
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-400">—</span>Resort fee: $45/night covers all
                  facilities.
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-4 bg-primary-900/70 border border-accent-400 px-8 py-5 rounded-lg">
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-full bg-accent-400/10 border border-accent-400 flex items-center justify-center flex-shrink-0"
              >
                <svg
                  className="w-6 h-6 text-accent-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-accent-400 font-semibold tracking-[0.2em] uppercase text-xs mb-1">
                  Best Rate Guarantee
                </p>
                <p className="text-ivory-300/85 text-sm">
                  Book directly and we guarantee the lowest available rate. Found it cheaper? We
                  will match it and offer a complimentary upgrade.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}