import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const contactChannels = [
  { icon: '📞', label: 'Reservations', value: '+1 (800) 643-7463', sub: 'Available 24/7' },
  { icon: '✉️', label: 'Email', value: 'reservations@grandmeridian.com', sub: 'Response within 2 hours' },
  { icon: '💬', label: 'Concierge', value: '+1 (800) 643-7464', sub: 'Mon–Sun, 7am–11pm' },
  { icon: '🎉', label: 'Events & Groups', value: 'events@grandmeridian.com', sub: 'Groups of 10+' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0a1628] pt-24">
      {/* Hero */}
      <div className="relative h-48 bg-[#111f35] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#c8a96e] text-sm tracking-[4px] uppercase mb-2">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#faf7f0]">Contact Us</h1>
        </div>
      </div>

      {/* Contact Channels */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {contactChannels.map((ch) => (
            <div key={ch.label} className="bg-[#162540] rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">{ch.icon}</div>
              <p className="text-[#c8a96e] font-semibold text-sm uppercase tracking-wider mb-1">{ch.label}</p>
              <p className="text-[#faf7f0] text-sm font-medium mb-1 break-words">{ch.value}</p>
              <p className="text-[#8b8070] text-xs">{ch.sub}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-2xl font-serif text-[#faf7f0] mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-[#162540] rounded-xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#c8a96e]/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#c8a96e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-[#faf7f0] mb-2">Message Received</h3>
                <p className="text-[#8b8070]">Thank you, {form.name}. Our team will respond within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#8b8070] mb-1">Full Name *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]"
                      placeholder="James Sterling" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-[#8b8070] mb-1">Phone</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]"
                      placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#8b8070] mb-1">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]"
                    placeholder="your@email.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm text-[#8b8070] mb-1">Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]">
                    {['General Inquiry', 'Reservation', 'Wedding & Events', 'Corporate Groups', 'Dining Reservation', 'Spa Appointment', 'Feedback', 'Other'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#8b8070] mb-1">Message *</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={5} placeholder="How can we assist you?"
                    className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e] resize-none" />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit"
                  className="w-full bg-[#c8a96e] text-[#0a1628] font-semibold py-4 rounded-xl hover:bg-[#e8d5a3] transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Info Panel */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map Placeholder */}
            <div className="bg-[#162540] rounded-xl h-64 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, #c8a96e22 0, #c8a96e22 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #c8a96e22 0, #c8a96e22 1px, transparent 1px, transparent 40px)' }} />
              <div className="text-center z-10">
                <div className="text-4xl mb-3">📍</div>
                <p className="text-[#faf7f0] font-serif text-lg">The Grand Meridian</p>
                <p className="text-[#8b8070] text-sm">1 Ocean Boulevard, Maldives</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="inline-block mt-3 text-[#c8a96e] text-sm underline hover:text-[#e8d5a3]">
                  View on Google Maps →
                </a>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="bg-[#162540] rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-[#c8a96e] text-sm uppercase tracking-wider font-semibold mb-2">Address</h3>
                <p className="text-[#faf7f0]">1 Ocean Boulevard, North Malé Atoll</p>
                <p className="text-[#8b8070]">Republic of Maldives, 20056</p>
              </div>
              <div className="border-t border-[#c8a96e]/10 pt-4">
                <h3 className="text-[#c8a96e] text-sm uppercase tracking-wider font-semibold mb-2">Front Desk Hours</h3>
                <p className="text-[#faf7f0] text-sm">Open 24 hours, 7 days a week</p>
                <p className="text-[#8b8070] text-sm">Concierge: 7:00 AM – 11:00 PM</p>
              </div>
              <div className="border-t border-[#c8a96e]/10 pt-4">
                <h3 className="text-[#c8a96e] text-sm uppercase tracking-wider font-semibold mb-2">Getting Here</h3>
                <p className="text-[#8b8070] text-sm">25-minute seaplane transfer from Velana International Airport (MLE). Private yacht transfers also available. Our concierge will arrange transportation upon confirmation.</p>
              </div>
            </div>

            {/* VIP Inquiry */}
            <div className="bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-xl p-6">
              <h3 className="text-[#c8a96e] font-serif text-lg mb-2">VIP & Corporate Inquiries</h3>
              <p className="text-[#8b8070] text-sm mb-4">For private events, wedding proposals, long-stay arrangements, or bespoke requests, our dedicated VIP team is here to curate your perfect experience.</p>
              <a href="mailto:vip@grandmeridian.com"
                className="inline-block bg-[#c8a96e] text-[#0a1628] font-semibold px-6 py-2 rounded-lg text-sm hover:bg-[#e8d5a3] transition-colors">
                vip@grandmeridian.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
