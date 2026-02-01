import { useState } from 'react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import homebanner from '../../assets/homebanner1.png'
import PageWrapper from '../PageWrapper'

export default function BookOnline() {
  const location = useLocation()

  // Scroll to top when component mounts or location changes
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const existing =
      JSON.parse(localStorage.getItem('appointments')) || []

    localStorage.setItem(
      'appointments',
      JSON.stringify([...existing, formData])
    )

    alert('Appointment request saved ✅')

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  return (
    <PageWrapper>
    <div className="bg-[#F7F2E8]">
      {/* ===================== */}
      {/* Banner Section */}
      {/* ===================== */}
      <section className="relative h-[450px] sm:h-[550px] md:h-[700px] -mt-[72px] pt-[72px]">
        <img
          src={homebanner}
          alt="Book Appointment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-6">
          <div>
            <h1 className="text-white text-4xl md:text-5xl font-serif">
              Book Online
            </h1>
            <p className="text-white/90 mt-4 max-w-xl">
              Schedule your visit with Madison Park Family Dentistry.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* Form Section */}
      {/* ===================== */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-[#9C9A96] p-8 rounded-xl">
          <h2 className="text-center text-2xl font-serif mb-8">
            Questions? Send us a message
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-6"
          >
            <div>
              <label className="block text-sm mb-1">Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md border"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md border"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-md border"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Message *</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-md border"
              />
            </div>

            <button
              type="submit"
              className="w-fit bg-[#FFA500] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#ff9800] transition"
            >
              Submit
            </button>

            <p className="text-xs text-gray-700">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </form>
        </div>
      </section>
    </div>
    </PageWrapper>
  )
}
