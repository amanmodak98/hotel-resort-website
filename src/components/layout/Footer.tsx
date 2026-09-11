import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const exploreLinks = [
  { name: 'Home', path: '/' },
  { name: 'Rooms & Suites', path: '/rooms' },
  { name: 'Dining', path: '/dining' },
  { name: 'Spa & Wellness', path: '/spa' },
  { name: 'Experiences', path: '/experiences' },
  { name: 'Contact', path: '/contact' },
]

const amenitiesList = [
  'Infinity Edge Pool',
  'The Meridian Spa',
  'Private Beach',
  'Championship Golf',
  'Michelin Dining',
  'Fitness Studio',
  'Kids Atelier',
  'Concierge & Butler',
]

const socialLinks = [
  {
    name: 'Instagram',
    handle: 'Instagram profile',
    href: 'https://instagram.com/grandmeridian',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'Facebook profile',
    href: 'https://facebook.com/grandmeridian',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
      </svg>
    ),
  },
  {
    name: 'X',
    handle: 'X profile',
    href: 'https://x.com/grandmeridian',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: 'YouTube channel',
    href: 'https://youtube.com/grandmeridian',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }
    setStatus('success')
    setMessage('Thank you. You are now part of the inner circle.')
    setEmail('')
  }

  return (
    <footer
      className="relative bg-primary-900 pt-20 pb-8 border-t border-accent-400/15 overflow-hidden"
      role="contentinfo"
    >
      {/* Subtle gold gradient flourish */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.45) 50%, transparent 100%)',
        }}
      />

      <div className="container-luxury">
        {/* Newsletter */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end pb-14 mb-14 border-b border-accent-400/15"
          aria-labelledby="footer-newsletter-heading"
        >
          <div>
            <p className="eyebrow mb-4">Inner Circle</p>
            <h2
              id="footer-newsletter-heading"
              className="text-3xl md:text-4xl font-display text-ivory-200 leading-tight text-balance"
            >
              Receive private invitations &amp; seasonal offers
            </h2>
            <p className="mt-4 text-ivory-300/80 max-w-md leading-relaxed">
              Be the first to discover new suites, chef collaborations, and members-only
              experiences at The Grand Meridian.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-3 w-full"
            aria-describedby="newsletter-feedback"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="footer-newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status !== 'idle') setStatus('idle')
                }}
                placeholder="your@email.com"
                aria-invalid={status === 'error'}
                className="flex-1 bg-primary-800/80 border border-accent-400/30 text-ivory-200 placeholder:text-ivory-400/50 px-5 py-3.5 text-sm rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:border-accent-400"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.18em] text-xs px-6 py-3.5 rounded-md hover:bg-accent-300 active:bg-accent-500 transition-all duration-300 shadow-sm hover:shadow-gold-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
              >
                Subscribe
              </button>
            </div>
            <p
              id="newsletter-feedback"
              role="status"
              aria-live="polite"
              className={`text-xs ${
                status === 'error'
                  ? 'text-red-300'
                  : status === 'success'
                  ? 'text-accent-300'
                  : 'text-ivory-400/60'
              }`}
            >
              {message ||
                'By subscribing you agree to receive marketing communications from The Grand Meridian.'}
            </p>
          </form>
        </motion.section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold tracking-[0.22em] text-accent-400 mb-3">
              THE GRAND MERIDIAN
            </h3>
            <p className="accent-italic text-champagne-300 text-sm mb-5">
              Where luxury meets serenity
            </p>
            <p className="text-ivory-300/75 text-sm leading-relaxed mb-6">
              A five-star coastal sanctuary where timeless luxury meets contemporary refinement.
              Every detail curated with intention; every stay composed as a private narrative.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.handle} (opens in new tab)`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-accent-400/30 text-accent-400 hover:bg-accent-400 hover:text-primary-900 hover:border-accent-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-display font-semibold tracking-[0.2em] uppercase text-accent-400 mb-6">
              Explore
            </h3>
            <ul className="space-y-3" role="list">
              {exploreLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-ivory-300/80 hover:text-accent-400 transition-colors duration-300 text-sm link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm px-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-display font-semibold tracking-[0.2em] uppercase text-accent-400 mb-6">
              Signature Amenities
            </h3>
            <ul className="space-y-3" role="list">
              {amenitiesList.map((amenity) => (
                <li
                  key={amenity}
                  className="text-ivory-300/80 text-sm flex items-center"
                >
                  <span aria-hidden="true" className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 flex-shrink-0" />
                  {amenity}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-display font-semibold tracking-[0.2em] uppercase text-accent-400 mb-6">
              Visit Us
            </h3>
            <div className="space-y-4 text-sm text-ivory-300/80">
              <div>
                <p className="font-semibold text-ivory-200 mb-1">Address</p>
                <address className="not-italic">
                  1 Ocean Boulevard, North Malé Atoll<br />
                  Republic of Maldives, 20056
                </address>
              </div>
              <div>
                <p className="font-semibold text-ivory-200 mb-1">Reservations</p>
                <a
                  href="tel:+180055547263"
                  className="hover:text-accent-400 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm"
                >
                  +1 (800) 555-GRAND
                </a>
              </div>
              <div>
                <p className="font-semibold text-ivory-200 mb-1">Email</p>
                <a
                  href="mailto:reservations@grandmeridian.com"
                  className="hover:text-accent-400 transition-colors duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm"
                >
                  reservations@grandmeridian.com
                </a>
                <a
                  href="mailto:concierge@grandmeridian.com"
                  className="hover:text-accent-400 transition-colors duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm"
                >
                  concierge@grandmeridian.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider-gold mb-6" aria-hidden="true" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory-300/60">
          <p>© 2026 The Grand Meridian Resort S.A. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="hover:text-accent-400 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm px-1"
            >
              Privacy Policy
            </Link>
            <span className="text-accent-400/40" aria-hidden="true">|</span>
            <Link
              to="/terms"
              className="hover:text-accent-400 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm px-1"
            >
              Terms of Service
            </Link>
            <span className="text-accent-400/40" aria-hidden="true">|</span>
            <Link
              to="/accessibility"
              className="hover:text-accent-400 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm px-1"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}