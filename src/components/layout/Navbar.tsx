import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface NavLink {
  name: string
  path: string
}

const navLinks: NavLink[] = [
  { name: 'Rooms', path: '/rooms' },
  { name: 'Dining', path: '/dining' },
  { name: 'Spa', path: '/spa' },
  { name: 'Experiences', path: '/experiences' },
]

const rightLinks: NavLink[] = [
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)

  // Scroll-based blur backdrop
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close mobile menu with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (path: string) => location.pathname === path

  const renderLink = (link: NavLink) => {
    const active = isActive(link.path)
    return (
      <Link
        key={link.path}
        to={link.path}
        aria-current={active ? 'page' : undefined}
        className={`group relative inline-flex items-center px-2 py-1.5 text-[13px] uppercase tracking-[0.18em] font-light transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 ${
          active ? 'text-accent-400' : 'text-ivory-200/85 hover:text-accent-400'
        }`}
      >
        <span>{link.name}</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -bottom-0.5 left-2 right-2 h-px origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            active ? 'scale-x-100 bg-accent-400' : 'scale-x-0 bg-accent-400 group-hover:scale-x-100'
          }`}
        />
      </Link>
    )
  }

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1030] transition-all duration-500 ${
          scrolled
            ? 'bg-primary-900/85 shadow-[0_2px_24px_rgba(0,0,0,0.25)] backdrop-blur-luxury border-b border-accent-400/10'
            : 'bg-transparent border-b border-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation — Desktop */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.slice(0, 2).map(renderLink)}
            </div>

            {/* Center Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 flex-shrink-0 px-2 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
              aria-label="The Grand Meridian — Home"
            >
              <span aria-hidden="true" className="hidden sm:inline-block w-8 h-px bg-accent-400/70" />
              <span className="text-lg sm:text-xl font-display font-bold tracking-[0.22em] text-accent-400">
                THE GRAND MERIDIAN
              </span>
              <span aria-hidden="true" className="hidden sm:inline-block w-8 h-px bg-accent-400/70" />
            </Link>

            {/* Right Navigation — Desktop */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.slice(2).map(renderLink)}
              {rightLinks.map(renderLink)}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent-400 text-primary-900 px-6 py-2.5 text-[12px] uppercase tracking-[0.2em] font-semibold rounded-md hover:bg-accent-300 active:bg-accent-500 transition-all duration-300 shadow-sm hover:shadow-gold-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
              >
                Reserve
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 z-50 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                aria-hidden="true"
                className={`w-6 h-0.5 bg-accent-400 transition-all duration-300 ${
                  mobileOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                aria-hidden="true"
                className={`w-6 h-0.5 bg-accent-400 transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                aria-hidden="true"
                className={`w-6 h-0.5 bg-accent-400 transition-all duration-300 ${
                  mobileOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              role="region"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden bg-primary-900/95 backdrop-blur-luxury border-t border-accent-400/15"
            >
              <div className="px-6 py-8 space-y-1">
                {[...navLinks, ...rightLinks].map((link) => {
                  const active = isActive(link.path)
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`block px-2 py-3 text-base uppercase tracking-[0.18em] font-light transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 ${
                        active ? 'text-accent-400' : 'text-ivory-200/85 hover:text-accent-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 block bg-accent-400 text-primary-900 px-6 py-3.5 text-center text-sm uppercase tracking-[0.2em] font-semibold rounded-md hover:bg-accent-300 active:bg-accent-500 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  Reserve Your Stay
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}