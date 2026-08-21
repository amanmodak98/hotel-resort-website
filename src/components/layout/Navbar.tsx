import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

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
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-wider font-light transition-colors duration-300 relative ${
                  isActive(link.path)
                    ? 'text-[#c8a96e]'
                    : 'text-[#faf7f0]/80 hover:text-[#c8a96e]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#c8a96e]" />
                )}
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 flex-shrink-0"
          >
            <div className="w-8 h-[1px] bg-[#c8a96e] hidden sm:block" />
            <h1
              className="text-xl sm:text-2xl font-bold tracking-widest text-[#c8a96e]"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              THE GRAND MERIDIAN
            </h1>
            <div className="w-8 h-[1px] bg-[#c8a96e] hidden sm:block" />
          </Link>

          {/* Right Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {rightLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-wider font-light transition-colors duration-300 relative ${
                  isActive(link.path)
                    ? 'text-[#c8a96e]'
                    : 'text-[#faf7f0]/80 hover:text-[#c8a96e]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#c8a96e]" />
                )}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-[#c8a96e] text-[#0a1628] px-6 py-2.5 text-sm uppercase tracking-wider font-semibold hover:bg-[#e8d5a3] transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center space-y-1.5 z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#c8a96e] transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#c8a96e] transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#c8a96e] transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: menuOpen ? 'auto' : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden bg-[#0a1628]/98 backdrop-blur-md"
      >
        <div className="px-6 py-8 space-y-6">
          {[...navLinks, ...rightLinks].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block text-base uppercase tracking-wider font-light transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-[#c8a96e]'
                  : 'text-[#faf7f0]/80 hover:text-[#c8a96e]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setMenuOpen(false)}
            className="block bg-[#c8a96e] text-[#0a1628] px-6 py-3 text-center text-sm uppercase tracking-wider font-semibold hover:bg-[#e8d5a3] transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}
