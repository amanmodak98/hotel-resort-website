import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const navLinks = [
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Gallery', path: '/gallery' },
  ]

  const rightLinks = [
    { name: 'Dining', path: '/dining' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-fixed transition-all duration-300 ${
          scrolled ? 'bg-navy-900/95 backdrop-blur-luxury shadow-lg' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-wider font-light transition-colors duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-sm px-2 py-1 ${
                    isActive(link.path)
                      ? 'text-gold-400'
                      : 'text-ivory-200/80 hover:text-gold-400'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-sm px-2 py-1"
              aria-label="The Grand Meridian - Home"
            >
              <div className="w-8 h-[1px] bg-gold-400 hidden sm:block" aria-hidden="true" />
              <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-gold-400 font-serif">
                THE GRAND MERIDIAN
              </h1>
              <div className="w-8 h-[1px] bg-gold-400 hidden sm:block" aria-hidden="true" />
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {rightLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-wider font-light transition-colors duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-sm px-2 py-1 ${
                    isActive(link.path)
                      ? 'text-gold-400'
                      : 'text-ivory-200/80 hover:text-gold-400'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="navbar-indicator-right"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <Link
                to="/book"
                className="bg-gold-400 text-navy-900 px-6 py-2.5 text-sm uppercase tracking-wider font-semibold hover:bg-gold-300 active:bg-gold-500 transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 shadow-sm hover:shadow-gold-sm"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-11 h-11 flex flex-col items-center justify-center space-y-1.5 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-lg"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`w-6 h-0.5 bg-gold-400 transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
                aria-hidden="true"
              />
              <span
                className={`w-6 h-0.5 bg-gold-400 transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
                aria-hidden="true"
              />
              <span
                className={`w-6 h-0.5 bg-gold-400 transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-navy-900/98 backdrop-blur-luxury border-t border-gold-400/10"
            >
              <div className="px-6 py-8 space-y-6">
                {[...navLinks, ...rightLinks].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-base uppercase tracking-wider font-light transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-sm px-2 py-1 ${
                      isActive(link.path)
                        ? 'text-gold-400'
                        : 'text-ivory-200/80 hover:text-gold-400'
                    }`}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/book"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-gold-400 text-navy-900 px-6 py-3 text-center text-sm uppercase tracking-wider font-semibold hover:bg-gold-300 active:bg-gold-500 transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 shadow-sm"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
