import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AmenitySection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string[];
  highlights: string[];
  hours: string;
  bookingRequired: boolean;
}

const amenitySections: AmenitySection[] = [
  {
    id: 'pool',
    title: 'Infinity Pool & Aqua Club',
    subtitle: 'AQUATIC PARADISE',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=80',
    description: [
      'Our signature 85-meter infinity pool appears to merge seamlessly with the azure horizon, creating an optical illusion of endless water stretching toward the sky. This architectural marvel is the crown jewel of our resort, offering a sanctuary of tranquility for adults seeking peaceful contemplation.',
      'Adjacent to the main pool, our dedicated family zone features a vibrant children\'s splash area complete with interactive water features, gentle slides, and shallow wading pools designed specifically for our youngest guests. Parents can relax in nearby cabanas while maintaining a watchful eye.',
      'Personalized poolside service ensures every need is anticipated—from chilled towels and refreshing beverages to light bites prepared by our culinary team. Reserve a private cabana for the ultimate day of indulgence, complete with dedicated attendant service and premium amenities.',
    ],
    highlights: [
      'Olympic-length infinity edge',
      'Heated year-round',
      'Poolside cabanas (reservable)',
      'Full bar service',
      'Professional lifeguards',
      'Dedicated family area',
    ],
    hours: '6:00 AM – 10:00 PM daily',
    bookingRequired: false,
  },
  {
    id: 'spa',
    title: 'The Meridian Spa',
    subtitle: 'HOLISTIC WELLNESS',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    description: [
      'Step into The Meridian Spa and leave the ordinary world behind. Our 20,000-square-foot sanctuary draws on ancient healing traditions from around the globe, offering transformative treatments that nurture body, mind, and spirit. Each of our 20 private treatment rooms has been designed as a cocoon of serenity.',
      'Our signature Ayurvedic menu honors centuries-old wellness wisdom with customized treatments based on your unique dosha constitution. From traditional Abhyanga massage to Shirodhara oil treatments, our expert therapists guide you on a journey toward inner balance using only organic, sustainably sourced products.',
      'The thermal hydrotherapy circuit—featuring steam rooms, Finnish sauna, experience showers, and heated relaxation lounges—prepares the body for deep healing. Couples are invited to share the experience in our luxurious dual-treatment suites, complete with private terraces overlooking the gardens.',
    ],
    highlights: [
      '20 private treatment rooms',
      'Couples suites',
      'Steam & sauna',
      'Hydrotherapy circuit',
      'Ayurvedic menu',
      'Organic products',
    ],
    hours: '8:00 AM – 9:00 PM daily',
    bookingRequired: true,
  },
  {
    id: 'fitness',
    title: 'Fitness & Wellness Center',
    subtitle: 'STRENGTH & VITALITY',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
    description: [
      'Our state-of-the-art fitness center features the latest Technogym equipment in a light-filled space with panoramic ocean views. Whether you prefer cardiovascular training, strength conditioning, or functional fitness, every piece of equipment has been selected to deliver professional-grade results.',
      'Certified personal trainers are available for one-on-one sessions, small group training, or customized programming tailored to your goals. Our dedicated yoga and Pilates studios offer daily classes ranging from gentle restorative practices to vigorous power flows, all led by experienced instructors.',
      'The adjoining meditation garden provides a peaceful outdoor space for contemplative movement practices, sunrise yoga sessions, and guided meditation. Complement your fitness routine with personalized nutritional consulting from our on-site wellness experts who can design meal plans aligned with your goals.',
    ],
    highlights: [
      'Technogym equipment',
      'Personal trainers',
      'Yoga studio',
      'Pilates reformers',
      'Meditation garden',
      'Nutritional consulting',
    ],
    hours: '5:00 AM – 11:00 PM daily',
    bookingRequired: false,
  },
  {
    id: 'beach',
    title: 'Private Beach & Water Sports',
    subtitle: 'COASTAL ADVENTURES',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
    description: [
      'Our exclusive 500-meter stretch of pristine white sand beach is yours to explore, reserved solely for resort guests. Powder-soft sand meets crystal-clear turquoise waters in a setting of unparalleled natural beauty. Beach butlers attend to your every need, from setting up loungers to delivering cocktails directly to your spot in the sand.',
      'For the adventurous, our water sports center offers an array of activities on the gentle bay waters. Explore vibrant coral reefs while snorkeling or diving with certified instructors, glide across the surface on a stand-up paddleboard, or feel the rush of adrenaline while jet skiing along the coastline.',
      'As the sun begins its descent, join us for a sunset sailing excursion aboard our elegant catamaran. Toast to golden hour with champagne as the sky transforms into a masterpiece of coral and amber hues, creating memories that will last a lifetime.',
    ],
    highlights: [
      '500m private coastline',
      'Beach butlers',
      'Snorkeling & diving',
      'Jet skiing',
      'Kayaking',
      'Sunset sailing',
    ],
    hours: '7:00 AM – 8:00 PM daily',
    bookingRequired: false,
  },
  {
    id: 'golf',
    title: 'Championship Golf Course',
    subtitle: 'PRECISION & BEAUTY',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=900&q=80',
    description: [
      'Our 18-hole championship golf course has been masterfully designed to challenge players of all skill levels while showcasing the breathtaking natural landscape. Each hole offers a unique strategic challenge, from oceanfront par 3s that demand precision over crashing waves to tree-lined fairways that reward thoughtful course management.',
      'The fully stocked pro shop carries premium equipment, apparel, and accessories from the world\'s leading golf brands. Our PGA-certified instructor offers private lessons, group clinics, and video swing analysis to help you refine your game during your stay.',
      'Golf carts equipped with GPS technology come standard with every round, while experienced caddies are available for those who prefer traditional walking golf with expert local knowledge. Early morning tee times offer the magical experience of playing as the sun rises over the ocean.',
    ],
    highlights: [
      '18-hole championship layout',
      'Pro shop',
      'Golf carts included',
      'Caddies available',
      'Club rentals',
      'PGA instructor',
    ],
    hours: '6:00 AM – 7:00 PM daily',
    bookingRequired: true,
  },
  {
    id: 'kids',
    title: 'Kids Club & Family Activities',
    subtitle: 'ADVENTURES FOR ALL AGES',
    image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=900&q=80',
    description: [
      'Our award-winning Kids Club provides a safe, stimulating environment where children ages 3-12 can explore, create, and make new friends under the supervision of our trained childcare professionals. Daily programming includes arts and crafts, nature walks, treasure hunts, and interactive educational activities designed to spark curiosity and imagination.',
      'Young chefs can don aprons for cooking classes where they learn to prepare simple, delicious recipes while discovering the joy of culinary creation. Outdoor adventures include beach games, pool activities, and guided nature exploration that connects children with the natural world around them.',
      'Teenagers have their own dedicated lounge space featuring the latest gaming consoles, board games, and a curated library. Evening babysitting services are available for parents who wish to enjoy a romantic dinner or evening entertainment, ensuring that every member of the family has an exceptional experience.',
    ],
    highlights: [
      'Ages 3-12 supervised',
      'Arts & crafts',
      'Cooking classes',
      'Outdoor adventures',
      'Teen gaming lounge',
      'Evening babysitting',
    ],
    hours: '8:00 AM – 8:00 PM daily',
    bookingRequired: false,
  },
  {
    id: 'business',
    title: 'Business Center & Events',
    subtitle: 'MEETINGS & CELEBRATIONS',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80',
    description: [
      'Our world-class conference and event facilities seamlessly blend cutting-edge technology with elegant design, providing the perfect setting for corporate meetings, destination weddings, and special celebrations. Five versatile conference rooms can be configured to accommodate groups from 10 to 500 guests.',
      'High-speed fiber-optic internet ensures flawless connectivity throughout all meeting spaces, while state-of-the-art audiovisual production capabilities include professional sound systems, HD projection, video conferencing, and simultaneous translation services. Our expert technical team remains on standby to ensure every presentation flows smoothly.',
      'Your dedicated event planner works closely with you from initial concept to final execution, coordinating every detail including room setup, catering, floral arrangements, entertainment, and logistics. Our award-winning culinary team creates customized menus ranging from working breakfast buffets to lavish gala dinners.',
    ],
    highlights: [
      '5 conference rooms',
      'Capacity up to 500 guests',
      'High-speed fiber internet',
      'AV production',
      'Dedicated event planner',
      'Catering packages',
    ],
    hours: '24/7 for guests',
    bookingRequired: true,
  },
  {
    id: 'concierge',
    title: 'Concierge & Luxury Services',
    subtitle: 'BESPOKE EXPERIENCES',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    description: [
      'Our 24/7 concierge team stands ready to transform your wishes into reality. Members of Les Clefs d\'Or, our concierges possess deep local knowledge and global connections that open doors to exclusive experiences unavailable to the general public. From securing impossible restaurant reservations to arranging private museum tours, no request is too ambitious.',
      'Arrive and depart in style with our fleet of chauffeur-driven Rolls Royce vehicles, available for airport transfers and local excursions. For those traveling by private aircraft, our dedicated aviation liaison coordinates all aspects of your arrival, including ground transportation, customs facilitation, and welcome services.',
      'Experience the ultimate freedom with our yacht charter service, offering everything from intimate sunset cruises to multi-day island-hopping adventures aboard luxury vessels. Every itinerary is customized to your interests, whether that means diving remote reefs, discovering secluded beaches, or enjoying world-class sport fishing.',
    ],
    highlights: [
      '24/7 personal concierge',
      'Rolls Royce transfers',
      'Private jet liaison',
      'Yacht charters',
      'Restaurant reservations',
      'Custom itineraries',
    ],
    hours: 'Available 24/7',
    bookingRequired: false,
  },
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AmenitySectionBlock({ section, index }: { section: AmenitySection; index: number }) {
  const isEven = index % 2 === 0;
  const bgColor = isEven ? 'bg-[#0a1628]' : 'bg-[#111f35]';

  return (
    <section className={`${bgColor} py-20`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-1/2 flex-shrink-0"
          >
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-[#c8a96e] text-xs font-bold tracking-[0.3em] uppercase block mb-3">
              {section.subtitle}
            </span>
            <h2 className="font-['Libre_Baskerville'] text-3xl md:text-4xl text-[#faf7f0] mb-6 leading-tight">
              {section.title}
            </h2>
            <div className="w-10 h-px bg-[#c8a96e] mb-6" />

            {section.description.map((para, i) => (
              <p key={i} className="text-[#8b8070] text-sm leading-relaxed mb-4 last:mb-0">
                {para}
              </p>
            ))}

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {section.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2.5 text-[#faf7f0] text-sm">
                  <span className="text-[#c8a96e]">
                    <CheckIcon />
                  </span>
                  {highlight}
                </div>
              ))}
            </div>

            {/* Hours Badge */}
            <div className="mt-6 inline-flex items-center gap-2 bg-[#162540] border border-[#c8a96e]/20 px-4 py-2.5 rounded-full">
              <span className="text-[#c8a96e]"><ClockIcon /></span>
              <span className="text-[#8b8070] text-xs tracking-wide">{section.hours}</span>
            </div>

            {/* Book / Enquire Button */}
            {section.bookingRequired && (
              <div className="mt-5">
                <Link
                  to="/contact"
                  className="inline-block bg-[#c8a96e] text-[#0a1628] text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#e8d5a3] transition-colors duration-200"
                >
                  Book / Enquire
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-[#faf7f0] font-['Lato',sans-serif]">

      {/* HERO BANNER */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
          alt="Amenities hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/50 to-[#0a1628]/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <span className="text-[#c8a96e] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            RESORT AMENITIES
          </span>
          <h1 className="font-['Libre_Baskerville'] text-5xl md:text-6xl text-[#faf7f0] mb-4">
            Everything You Desire
          </h1>
          <div className="w-16 h-px bg-[#c8a96e] mb-4" />
          <p className="text-[#e8d5a3] text-base tracking-wider max-w-md">
            A world of luxury experiences awaits at every corner of our resort
          </p>
        </motion.div>
      </section>

      {/* INTRO PARAGRAPH */}
      <section className="bg-[#111f35] py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <span className="text-[#c8a96e] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            WORLD-CLASS FACILITIES
          </span>
          <h2 className="font-['Libre_Baskerville'] text-3xl text-[#faf7f0] mb-6">
            A Resort Without Limits
          </h2>
          <div className="w-10 h-px bg-[#c8a96e] mx-auto mb-8" />
          <p className="text-[#8b8070] text-base leading-relaxed mb-6">
            At our resort, every amenity has been thoughtfully curated to exceed the expectations of even the most discerning traveler. From the moment you arrive, a world of extraordinary experiences unfolds before you — an 85-meter infinity pool that kisses the horizon, a spa that transports you to states of profound wellbeing, a championship golf course that challenges and delights, and a private beach that feels as though it exists solely for you.
          </p>
          <p className="text-[#8b8070] text-base leading-relaxed">
            We believe that true luxury lies not merely in beautiful surroundings, but in the seamless harmony of space, service, and soul. Each of our amenities is staffed by passionate professionals who take genuine pride in crafting moments of joy, relaxation, and discovery. Whether you seek exhilarating adventure or serene solitude, our resort provides the perfect canvas for an experience that is entirely, uniquely yours.
          </p>
        </motion.div>
      </section>

      {/* 8 AMENITY SECTIONS */}
      {amenitySections.map((section, index) => (
        <AmenitySectionBlock key={section.id} section={section} index={index} />
      ))}

      {/* BOTTOM CTA */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80"
          alt="Experience it all"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a1628]/75" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto px-4 text-center"
        >
          <span className="text-[#c8a96e] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            YOUR JOURNEY AWAITS
          </span>
          <h2 className="font-['Libre_Baskerville'] text-4xl md:text-5xl text-[#faf7f0] mb-4">
            Experience It All
          </h2>
          <div className="w-12 h-px bg-[#c8a96e] mx-auto mb-6" />
          <p className="text-[#e8d5a3] text-base mb-10 leading-relaxed">
            Every amenity. Every experience. Every memory — yours to discover. Reserve your stay today and let us exceed every expectation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-[#c8a96e] text-[#0a1628] text-sm font-bold tracking-widest uppercase px-10 py-4 hover:bg-[#e8d5a3] transition-colors duration-200"
            >
              Book Your Stay
            </Link>
            <Link
              to="/contact"
              className="border border-[#c8a96e] text-[#c8a96e] text-sm font-bold tracking-widest uppercase px-10 py-4 hover:bg-[#c8a96e]/10 transition-colors duration-200"
            >
              Enquire Now
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
