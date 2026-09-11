import { useState, type FormEvent } from 'react';
import { motion, type Variants } from 'framer-motion';

interface ContactChannel {
  icon: 'phone' | 'email' | 'concierge' | 'events';
  label: string;
  value: string;
  href: string;
  sub: string;
}

const channels: ContactChannel[] = [
  {
    icon: 'phone',
    label: 'Reservations',
    value: '+1 (800) 555-GRAND',
    href: 'tel:+180055547263',
    sub: 'Available 24 hours',
  },
  {
    icon: 'email',
    label: 'General Email',
    value: 'reservations@grandmeridian.com',
    href: 'mailto:reservations@grandmeridian.com',
    sub: 'Response within 2 hours',
  },
  {
    icon: 'concierge',
    label: 'Concierge',
    value: '+1 (800) 555-7464',
    href: 'tel:+18005557464',
    sub: 'Daily · 7:00 AM – 11:00 PM',
  },
  {
    icon: 'events',
    label: 'Events & Groups',
    value: 'events@grandmeridian.com',
    href: 'mailto:events@grandmeridian.com',
    sub: 'Groups of 10 or more',
  },
];

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function ChannelIcon({ icon }: { icon: ContactChannel['icon'] }) {
  const common = 'w-6 h-6';
  switch (icon) {
    case 'phone':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.7 2.81a2 2 0 01-.45 1.81L8.09 10.91a16 16 0 006 6l1.77-1.77a2 2 0 011.81-.45l2.81.7A2 2 0 0121 17.72V20a2 2 0 01-2 2h-1C9.61 22 2 14.39 2 5V4" />
        </svg>
      );
    case 'email':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'concierge':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'events':
      return (
        <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3M16 7V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
        </svg>
      );
  }
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

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
      <section className="relative h-screen min-h-[560px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1455587734955-081b22074882?w=1920&q=85"
          alt="Concierge desk with brass bell and fresh floral arrangement"
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
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <div aria-hidden="true" className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block w-10 h-px bg-accent-400" />
            <span className="text-accent-400 text-xs">◆</span>
            <span className="inline-block w-10 h-px bg-accent-400" />
          </div>
          <p className="eyebrow mb-5">Get In Touch</p>
          <h1 className="font-display text-fluid-6xl text-ivory-200 leading-[1.05] mb-4 text-balance">
            Contact Us
          </h1>
          <div aria-hidden="true" className="w-12 h-px bg-accent-400 mx-auto mb-4" />
          <p className="accent-italic text-champagne-200 text-fluid-base max-w-xl mx-auto">
            Every great stay begins with a conversation — our concierge awaits your call.
          </p>
        </motion.div>
      </section>

      {/* CONTACT CHANNELS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {channels.map((ch) => (
            <motion.a
              key={ch.label}
              href={ch.href}
              variants={fadeUp}
              className="group bg-primary-800/60 border border-accent-400/15 rounded-lg p-6 text-center hover:border-accent-400/40 hover:shadow-gold-sm transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-full bg-accent-400/10 border border-accent-400/35 flex items-center justify-center mx-auto mb-4 text-accent-400 group-hover:bg-accent-400 group-hover:text-primary-900 transition-all duration-500"
              >
                <ChannelIcon icon={ch.icon} />
              </div>
              <p className="text-accent-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-2">
                {ch.label}
              </p>
              <p className="text-ivory-200 text-sm font-medium mb-1 break-words">{ch.value}</p>
              <p className="text-ivory-300/70 text-xs">{ch.sub}</p>
            </motion.a>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* FORM */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="eyebrow mb-4">Send a Message</p>
            <h2 className="font-display text-fluid-3xl text-ivory-200 mb-6 text-balance">
              We are here to assist
            </h2>
            <div aria-hidden="true" className="w-10 h-px bg-accent-400 mb-8" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                aria-live="polite"
                className="bg-primary-800/70 border border-accent-400/30 rounded-xl p-10 text-center"
              >
                <div
                  aria-hidden="true"
                  className="w-16 h-16 rounded-full bg-accent-400/15 border border-accent-400 flex items-center justify-center mx-auto mb-5 text-accent-400"
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-ivory-200 mb-3">Message Received</h3>
                <p className="text-ivory-300/85">
                  Thank you, {form.name}. Our team will respond within two hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="eyebrow block mb-2">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-err' : undefined}
                      className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 placeholder:text-ivory-400/50 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                      placeholder="James Sterling"
                    />
                    {errors.name && (
                      <p id="contact-name-err" className="text-red-300 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="eyebrow block mb-2">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 placeholder:text-ivory-400/50 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="eyebrow block mb-2">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-err' : undefined}
                    className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 placeholder:text-ivory-400/50 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p id="contact-email-err" className="text-red-300 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-subject" className="eyebrow block mb-2">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 px-4 py-3 rounded-md outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-400"
                  >
                    {[
                      'General Inquiry',
                      'Reservation Request',
                      'Wedding & Events',
                      'Corporate Groups',
                      'Dining Reservation',
                      'Spa Appointment',
                      'Feedback',
                      'Other',
                    ].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="eyebrow block mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-err' : undefined}
                    rows={5}
                    placeholder="How can we assist you?"
                    className="w-full bg-primary-800/70 border border-accent-400/25 text-ivory-200 placeholder:text-ivory-400/50 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent-400 resize-none"
                  />
                  {errors.message && (
                    <p id="contact-message-err" className="text-red-300 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-6 py-4 rounded-md hover:bg-accent-300 transition-colors duration-300 shadow-sm hover:shadow-gold-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* INFO PANEL */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div
              variants={fadeUp}
              className="bg-primary-800/60 border border-accent-400/15 rounded-xl p-6 h-72 flex flex-col items-center justify-center relative overflow-hidden"
              aria-label="Map location of The Grand Meridian"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, rgba(212,175,55,0.13) 0, rgba(212,175,55,0.13) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(212,175,55,0.13) 0, rgba(212,175,55,0.13) 1px, transparent 1px, transparent 40px)',
                }}
              />
              <div className="text-center z-10">
                <div
                  aria-hidden="true"
                  className="w-14 h-14 rounded-full bg-accent-400/15 border border-accent-400 flex items-center justify-center mx-auto mb-4 text-accent-400"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-display text-2xl text-ivory-200 mb-1 text-balance">
                  The Grand Meridian
                </p>
                <p className="text-ivory-300/80 text-sm mb-3">
                  1 Ocean Boulevard, North Malé Atoll
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent-400 text-xs uppercase tracking-[0.2em] font-medium link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-sm px-1"
                >
                  View on Google Maps <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-primary-800/60 border border-accent-400/15 rounded-xl p-6 space-y-4"
            >
              <div>
                <h3 className="eyebrow mb-2">Address</h3>
                <address className="not-italic text-ivory-300/85 leading-relaxed text-sm">
                  1 Ocean Boulevard, North Malé Atoll<br />
                  Republic of Maldives, 20056
                </address>
              </div>
              <div className="border-t border-accent-400/15 pt-4">
                <h3 className="eyebrow mb-2">Front Desk Hours</h3>
                <p className="text-ivory-300/85 text-sm">Open 24 hours · 7 days a week</p>
                <p className="text-ivory-400 text-xs mt-1">Concierge · 7:00 AM – 11:00 PM</p>
              </div>
              <div className="border-t border-accent-400/15 pt-4">
                <h3 className="eyebrow mb-2">Getting Here</h3>
                <p className="text-ivory-300/85 text-sm leading-relaxed">
                  A 25-minute seaplane transfer from Velana International Airport (MLE). Private
                  yacht transfers also available upon request. Our concierge will arrange
                  transportation upon confirmation.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-accent-400/10 border border-accent-400/30 rounded-xl p-6"
            >
              <h3 className="font-display text-xl text-accent-400 mb-3 text-balance">
                VIP &amp; Corporate Inquiries
              </h3>
              <p className="text-ivory-300/85 text-sm mb-5 leading-relaxed">
                For private events, wedding proposals, long-stay arrangements or bespoke
                requests, our dedicated VIP team is here to curate your perfect experience.
              </p>
              <a
                href="mailto:vip@grandmeridian.com"
                className="inline-flex items-center justify-center bg-accent-400 text-primary-900 font-semibold uppercase tracking-[0.2em] text-xs px-6 py-3 rounded-md hover:bg-accent-300 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
              >
                vip@grandmeridian.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}