import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'rooms' | 'pool-spa' | 'dining' | 'events' | 'exterior';
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    alt: 'Deluxe Ocean Room',
    category: 'rooms',
    title: 'Deluxe Ocean Room'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    alt: 'Premium Suite Living',
    category: 'rooms',
    title: 'Premium Suite Living'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80',
    alt: 'Grand Suite Bedroom',
    category: 'rooms',
    title: 'Grand Suite Bedroom'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    alt: 'Penthouse Terrace',
    category: 'rooms',
    title: 'Penthouse Terrace'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    alt: 'Royal Villa Pool',
    category: 'rooms',
    title: 'Royal Villa Pool'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    alt: 'Infinity Pool at Sunset',
    category: 'pool-spa',
    title: 'Infinity Pool at Sunset'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
    alt: 'Aqua Club',
    category: 'pool-spa',
    title: 'Aqua Club'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    alt: 'Meridian Spa',
    category: 'pool-spa',
    title: 'Meridian Spa'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    alt: 'Spa Treatment Room',
    category: 'pool-spa',
    title: 'Spa Treatment Room'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    alt: 'The Meridian Restaurant',
    category: 'dining',
    title: 'The Meridian Restaurant'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
    alt: 'Azure Poolside Bar',
    category: 'dining',
    title: 'Azure Poolside Bar'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&q=80',
    alt: 'The Lounge',
    category: 'dining',
    title: 'The Lounge'
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80',
    alt: 'Signature Cuisine',
    category: 'dining',
    title: 'Signature Cuisine'
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
    alt: 'Grand Ballroom',
    category: 'events',
    title: 'Grand Ballroom'
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    alt: 'Wedding Setup',
    category: 'events',
    title: 'Wedding Setup'
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    alt: 'Resort Exterior',
    category: 'exterior',
    title: 'Resort Exterior'
  },
  {
    id: 17,
    src: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80',
    alt: 'Aerial View',
    category: 'exterior',
    title: 'Aerial View'
  },
  {
    id: 18,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    alt: 'Private Beach',
    category: 'exterior',
    title: 'Private Beach'
  }
];

const instagramImages: GalleryImage[] = [
  galleryImages[5],
  galleryImages[9],
  galleryImages[15],
  galleryImages[2],
  galleryImages[11],
  galleryImages[17]
];

type FilterType = 'all' | 'rooms' | 'pool-spa' | 'dining' | 'events' | 'exterior';

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Rooms', value: 'rooms' },
  { label: 'Pool & Spa', value: 'pool-spa' },
  { label: 'Dining', value: 'dining' },
  { label: 'Events', value: 'events' },
  { label: 'Exterior', value: 'exterior' }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative h-80 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-sm tracking-widest text-gold border border-gold/30 rounded-full bg-gold/10">
              OUR GALLERY
            </span>
            <h1 className="text-5xl md:text-6xl font-['Libre_Baskerville'] text-ivory mb-4">
              Visual Journey
            </h1>
            <p className="text-lg text-gold-light max-w-2xl mx-auto">
              Experience the elegance and luxury that awaits you at The Grand Meridian
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Bar */}
      <section className="py-12 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-gold text-navy shadow-lg shadow-gold/20'
                    : 'border border-gold text-gold hover:bg-gold/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-16 px-4 bg-navy">
        <motion.div
          className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid mb-4 group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <h3 className="text-ivory font-['Libre_Baskerville'] text-lg mb-1">
                        {image.title}
                      </h3>
                      <span className="inline-block px-3 py-1 text-xs text-gold border border-gold/40 rounded-full">
                        {image.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' & ')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Instagram CTA Section */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-['Libre_Baskerville'] text-ivory mb-4">
              Capture Your Moments
            </h2>
            <p className="text-gold-light text-lg mb-2">
              Share your Grand Meridian experience with us
            </p>
            <a
              href="https://instagram.com/grandmeridian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-2xl text-gold hover:text-gold-light transition-colors duration-300 mb-12"
            >
              @grandmeridian
            </a>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {instagramImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="aspect-square rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-ivory text-4xl hover:text-gold transition-colors duration-300 w-12 h-12 flex items-center justify-center z-50"
              aria-label="Close lightbox"
            >
              ×
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 text-ivory text-4xl hover:text-gold transition-colors duration-300 w-12 h-12 flex items-center justify-center z-50"
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 text-ivory text-4xl hover:text-gold transition-colors duration-300 w-12 h-12 flex items-center justify-center z-50"
              aria-label="Next image"
            >
              ›
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-['Libre_Baskerville'] text-ivory mb-2">
                  {selectedImage.title}
                </h3>
                <span className="inline-block px-4 py-1.5 text-sm text-gold border border-gold/40 rounded-full">
                  {selectedImage.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' & ')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
