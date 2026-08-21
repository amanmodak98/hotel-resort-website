import { useState } from 'react'
import { motion } from 'framer-motion'

const roomTypes = [
  { id: 'deluxe', name: 'Deluxe Room', price: 450, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', sqft: 420, beds: 'King Bed', view: 'Garden View' },
  { id: 'premium', name: 'Premium Suite', price: 750, img: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80', sqft: 680, beds: 'King Bed', view: 'Ocean View' },
  { id: 'penthouse', name: 'Penthouse Suite', price: 1400, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80', sqft: 1200, beds: 'King + Twin', view: 'Panoramic' },
  { id: 'villa', name: 'Royal Villa', price: 2200, img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80', sqft: 2400, beds: 'King + Lounge', view: 'Private Pool' },
]

type Step = 1 | 2 | 3

interface BookingData {
  checkIn: string
  checkOut: string
  adults: number
  children: number
  roomType: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function BookPage() {
  const [step, setStep] = useState<Step>(1)
  const [confirmed, setConfirmed] = useState(false)
  const [data, setData] = useState<BookingData>({
    checkIn: '', checkOut: '', adults: 2, children: 0,
    roomType: '', firstName: '', lastName: '',
    email: '', phone: '', specialRequests: '',
  })

  const selectedRoom = roomTypes.find(r => r.id === data.roomType)

  const nights = data.checkIn && data.checkOut
    ? Math.max(0, Math.round((new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / 86400000))
    : 0

  const total = selectedRoom ? selectedRoom.price * nights : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full bg-[#162540] rounded-2xl p-10 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#c8a96e]/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#c8a96e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#faf7f0] mb-3">Reservation Confirmed</h2>
          <p className="text-[#8b8070] mb-6">Thank you, {data.firstName}. Your reservation request has been received. Our concierge team will confirm within 2 hours via email.</p>
          <div className="bg-[#0a1628] rounded-xl p-6 text-left space-y-3 mb-6">
            <div className="flex justify-between"><span className="text-[#8b8070]">Room</span><span className="text-[#faf7f0]">{selectedRoom?.name}</span></div>
            <div className="flex justify-between"><span className="text-[#8b8070]">Check-in</span><span className="text-[#faf7f0]">{data.checkIn}</span></div>
            <div className="flex justify-between"><span className="text-[#8b8070]">Check-out</span><span className="text-[#faf7f0]">{data.checkOut}</span></div>
            <div className="flex justify-between"><span className="text-[#8b8070]">Guests</span><span className="text-[#faf7f0]">{data.adults} adults{data.children > 0 ? `, ${data.children} children` : ''}</span></div>
            <div className="flex justify-between font-semibold border-t border-[#c8a96e]/20 pt-3"><span className="text-[#c8a96e]">Estimated Total</span><span className="text-[#c8a96e]">${total.toLocaleString()}</span></div>
          </div>
          <p className="text-sm text-[#8b8070]">Reservation ID: GMR-{Date.now().toString().slice(-6)}</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a1628] pt-24">
      {/* Hero */}
      <div className="relative h-48 bg-[#111f35] flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <p className="text-[#c8a96e] text-sm tracking-[4px] uppercase mb-2">Reservations</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#faf7f0]">Book Your Stay</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${step >= s ? 'bg-[#c8a96e] text-[#0a1628]' : 'bg-[#162540] text-[#8b8070]'}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-24 h-0.5 transition-all duration-300 ${step > s ? 'bg-[#c8a96e]' : 'bg-[#162540]'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-16 -mt-8 mb-10 text-xs text-[#8b8070]">
          <span className={step === 1 ? 'text-[#c8a96e]' : ''}>Dates & Room</span>
          <span className={step === 2 ? 'text-[#c8a96e]' : ''}>Your Details</span>
          <span className={step === 3 ? 'text-[#c8a96e]' : ''}>Review</span>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h2 className="text-2xl font-serif text-[#faf7f0] mb-8 text-center">Select Dates & Room</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm text-[#8b8070] mb-2">Check-in Date</label>
                <input type="date" min={new Date().toISOString().split('T')[0]}
                  value={data.checkIn} onChange={e => setData({ ...data, checkIn: e.target.value })}
                  className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]" />
              </div>
              <div>
                <label className="block text-sm text-[#8b8070] mb-2">Check-out Date</label>
                <input type="date" min={data.checkIn || new Date().toISOString().split('T')[0]}
                  value={data.checkOut} onChange={e => setData({ ...data, checkOut: e.target.value })}
                  className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]" />
              </div>
              <div>
                <label className="block text-sm text-[#8b8070] mb-2">Adults</label>
                <select value={data.adults} onChange={e => setData({ ...data, adults: +e.target.value })}
                  className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]">
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#8b8070] mb-2">Children</label>
                <select value={data.children} onChange={e => setData({ ...data, children: +e.target.value })}
                  className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]">
                  {[0,1,2,3].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>)}
                </select>
              </div>
            </div>

            <h3 className="text-xl font-serif text-[#faf7f0] mb-6">Choose Your Accommodation</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {roomTypes.map(room => (
                <div key={room.id}
                  onClick={() => setData({ ...data, roomType: room.id })}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${data.roomType === room.id ? 'border-[#c8a96e]' : 'border-[#162540] hover:border-[#c8a96e]/40'}`}
                >
                  <div className="h-40 overflow-hidden">
                    <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-[#162540] p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[#faf7f0] font-semibold">{room.name}</h4>
                      <span className="text-[#c8a96e] font-semibold">From ${room.price}<span className="text-[#8b8070] text-xs">/night</span></span>
                    </div>
                    <div className="flex gap-4 text-xs text-[#8b8070]">
                      <span>{room.sqft} sqft</span>
                      <span>{room.beds}</span>
                      <span>{room.view}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {nights > 0 && selectedRoom && (
              <div className="bg-[#162540] rounded-xl p-4 mb-6 flex justify-between items-center">
                <span className="text-[#8b8070]">{nights} night{nights > 1 ? 's' : ''} × ${selectedRoom.price}/night</span>
                <span className="text-[#c8a96e] font-semibold text-lg">${total.toLocaleString()}</span>
              </div>
            )}

            <button
              onClick={() => { if (data.checkIn && data.checkOut && data.roomType) setStep(2) }}
              className="w-full bg-[#c8a96e] text-[#0a1628] font-semibold py-4 rounded-xl hover:bg-[#e8d5a3] transition-colors"
            >
              Continue to Guest Details
            </button>
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.form variants={fadeUp} initial="hidden" animate="visible" onSubmit={e => { e.preventDefault(); setStep(3) }}>
            <h2 className="text-2xl font-serif text-[#faf7f0] mb-8 text-center">Your Details</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-[#8b8070] mb-2">First Name *</label>
                <input required value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })}
                  className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]" placeholder="James" />
              </div>
              <div>
                <label className="block text-sm text-[#8b8070] mb-2">Last Name *</label>
                <input required value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })}
                  className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]" placeholder="Sterling" />
              </div>
              <div>
                <label className="block text-sm text-[#8b8070] mb-2">Email Address *</label>
                <input required type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
                  className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]" placeholder="james@example.com" />
              </div>
              <div>
                <label className="block text-sm text-[#8b8070] mb-2">Phone Number *</label>
                <input required value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })}
                  className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e]" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-[#8b8070] mb-2">Special Requests</label>
              <textarea value={data.specialRequests} onChange={e => setData({ ...data, specialRequests: e.target.value })}
                rows={4} placeholder="Any dietary requirements, room preferences, special occasions..."
                className="w-full bg-[#162540] border border-[#c8a96e]/20 text-[#faf7f0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#c8a96e] resize-none" />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 border border-[#c8a96e]/30 text-[#c8a96e] py-4 rounded-xl hover:bg-[#c8a96e]/10 transition-colors">
                Back
              </button>
              <button type="submit"
                className="flex-1 bg-[#c8a96e] text-[#0a1628] font-semibold py-4 rounded-xl hover:bg-[#e8d5a3] transition-colors">
                Review Reservation
              </button>
            </div>
          </motion.form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <motion.form variants={fadeUp} initial="hidden" animate="visible" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-serif text-[#faf7f0] mb-8 text-center">Review & Confirm</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#162540] rounded-xl p-6 space-y-4">
                <h3 className="text-[#c8a96e] font-semibold uppercase tracking-wider text-sm">Stay Details</h3>
                {selectedRoom && (
                  <div className="flex items-center gap-3">
                    <img src={selectedRoom.img} alt={selectedRoom.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="text-[#faf7f0] font-semibold">{selectedRoom.name}</p>
                      <p className="text-[#8b8070] text-sm">{selectedRoom.view}</p>
                    </div>
                  </div>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#8b8070]">Check-in</span><span className="text-[#faf7f0]">{data.checkIn}</span></div>
                  <div className="flex justify-between"><span className="text-[#8b8070]">Check-out</span><span className="text-[#faf7f0]">{data.checkOut}</span></div>
                  <div className="flex justify-between"><span className="text-[#8b8070]">Duration</span><span className="text-[#faf7f0]">{nights} night{nights !== 1 ? 's' : ''}</span></div>
                  <div className="flex justify-between"><span className="text-[#8b8070]">Guests</span><span className="text-[#faf7f0]">{data.adults} adults{data.children > 0 ? `, ${data.children} children` : ''}</span></div>
                  <div className="flex justify-between font-semibold border-t border-[#c8a96e]/20 pt-2">
                    <span className="text-[#c8a96e]">Total</span><span className="text-[#c8a96e]">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#162540] rounded-xl p-6 space-y-4">
                <h3 className="text-[#c8a96e] font-semibold uppercase tracking-wider text-sm">Guest Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#8b8070]">Name</span><span className="text-[#faf7f0]">{data.firstName} {data.lastName}</span></div>
                  <div className="flex justify-between"><span className="text-[#8b8070]">Email</span><span className="text-[#faf7f0] break-all">{data.email}</span></div>
                  <div className="flex justify-between"><span className="text-[#8b8070]">Phone</span><span className="text-[#faf7f0]">{data.phone}</span></div>
                  {data.specialRequests && (
                    <div><span className="text-[#8b8070] block mb-1">Special Requests</span><span className="text-[#faf7f0]">{data.specialRequests}</span></div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-[#162540]/50 rounded-xl p-4 mb-6 text-xs text-[#8b8070]">
              <strong className="text-[#faf7f0]">Cancellation Policy:</strong> Free cancellation up to 48 hours before check-in. After that, one night's rate applies. Full prepayment required for stays over 7 nights.
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(2)}
                className="flex-1 border border-[#c8a96e]/30 text-[#c8a96e] py-4 rounded-xl hover:bg-[#c8a96e]/10 transition-colors">
                Edit Details
              </button>
              <button type="submit"
                className="flex-1 bg-[#c8a96e] text-[#0a1628] font-semibold py-4 rounded-xl hover:bg-[#e8d5a3] transition-colors">
                Confirm Reservation
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  )
}
