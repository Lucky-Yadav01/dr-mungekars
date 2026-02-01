import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageWrapper from '../PageWrapper'

export default function ContactUs() {
  const location = useLocation()

  // Scroll to top when component mounts or location changes
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <PageWrapper>
    <main className="bg-[#F4F0E6] text-[#3E3B32]">

      {/* ======================================================
         1. HERO BANNER (IMG 1)
      ====================================================== */}
      <section className="relative w-full h-[450px] sm:h-[550px] md:h-[700px] overflow-hidden -mt-[72px] pt-[72px]">
        <img
          src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1920"
          alt="Dental clinic reception"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6">
          <p className="text-white uppercase tracking-wide text-sm mb-3">
            Contact Us
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl">
            An exceptional level of care, from your very first visit
          </h1>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/book"
              className="bg-[#FFA500] hover:bg-[#ff9800] text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Book Online
            </Link>
            <a
              href="tel:9284683233"
              className="text-white underline underline-offset-4"
            >
              Or Call 928-468-3233
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================
         2. FIRST APPOINTMENT EXPERIENCE (IMG 2)
      ====================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              We’ve carefully designed every step of your first appointment
            </h2>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: 'Simple Scheduling',
                  desc: 'Easily book online. Same-day appointments available.',
                },
                {
                  title: 'Automated Check-in',
                  desc: 'Paperless forms online or on iPad in-office.',
                },
                {
                  title: 'Ample Free Parking',
                  desc: 'Stress-free visits with plenty of parking.',
                },
                {
                  title: 'Feel at Home',
                  desc: 'Relaxing lounge, snacks, coffee & minimal wait times.',
                },
              ].map((item) => (
                <div key={item.title}>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm mt-1 text-[#5A564B]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200"
              alt="Dental chair room"
              className="w-full h-[420px] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ======================================================
         3. EMERGENCY CARE SCROLL SECTION (IMG 3)
      ====================================================== */}
      <section className="relative py-24 bg-[#FFF7EF] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1920"
          alt="Patient with tooth pain"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#FFF7EF]/90" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="bg-white max-w-xl ml-auto p-10 rounded-xl shadow-xl">
            <h3 className="text-2xl font-bold">
              Immediate care when you need it most
            </h3>
            <p className="mt-2 text-sm text-[#5A564B]">
              Same-day emergency care for new patients
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li>✓ Same-day appointments available</li>
              <li>✓ Advanced emergency diagnostics</li>
              <li>✓ Strict digital sterilization protocols</li>
            </ul>

            <a
              href="tel:9284683233"
              className="inline-block mt-6 bg-[#FFA500] hover:bg-[#ff9800] text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Call 928-468-3233
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================
         4. VISIT OUR CLINIC + MAP (IMG 4)
      ====================================================== */}
      <section className="py-20 bg-[#FFF1E6]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

          {/* Left Hex Images */}
          <div className="grid grid-cols-2 gap-6">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800"
              className="rounded-xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800"
              className="rounded-xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800"
              className="rounded-xl object-cover col-span-2"
            />
          </div>

          {/* Right Info */}
          <div>
            <h3 className="text-3xl font-bold">Visit Our Clinic</h3>
            <p className="mt-4 text-sm text-[#5A564B]">
              Conveniently book online or call us. Same-day appointments and
              ample free parking available.
            </p>

            <div className="mt-6 text-sm space-y-3">
              <p>
                <strong>Address:</strong><br />
                No 26, Nilije Goan, Meadows Green,<br />
                Near Casa Rio Main Rd,<br />
                Dombivli East, Maharashtra 421204
              </p>

              <p>
                <strong>Hours:</strong><br />
                Mon–Fri: 9:00am–7:00pm<br />
                Saturday: 9:00am–2:00pm<br />
                Sunday: Emergency Only
              </p>

              <p>
                <strong>Phone:</strong><br />
                928-468-3233
              </p>

              <p>
                <strong>Email:</strong><br />
                info@drmungekars.com
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 max-w-7xl mx-auto px-6">
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps?q=Dombivli+East+Maharashtra+421204&output=embed"
            className="w-full h-[380px] rounded-xl border-0"
            loading="lazy"
          />
        </div>
      </section>
    </main>
    </PageWrapper>
  )
}
