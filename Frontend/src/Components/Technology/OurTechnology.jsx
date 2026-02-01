import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useUnsplashImages from '../../hooks/useUnsplashImages'
import PageWrapper from '../../Components/PageWrapper'
import TechnologyIntro from './TechnologyIntro'

export default function OurTechnology() {
  const location = useLocation()
  const { images, loading } = useUnsplashImages(
    'modern dental technology dentist patient digital xray clinic',
    1
  )
  

  const [heroImage, setHeroImage] = useState('')

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    if (images && images.length > 0) {
      const img = images[0]
      setHeroImage(img.urls?.regular || img)
    }
  }, [images])

  return (
    <PageWrapper>
    <main className="bg-[#F4F0E6]">
      {/* ================= HERO ================= */}
      <section className="relative w-full h-[420px] md:h-[540px] overflow-hidden">
        {/* Background image */}
        {!loading && heroImage && (
          <img
            src={heroImage}
            alt="Dental technology consultation"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-center">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight max-w-2xl">
            Next-Gen Dental Technology
          </h1>

          <p className="mt-4 text-white/90 text-lg md:text-xl max-w-xl">
            Experience the future of dentistry, now.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/book"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-full transition"
            >
              Request Appointment
            </Link>

            <a
              href="tel:3109289447"
              className="text-white underline underline-offset-4 hover:text-amber-300 transition"
            >
              Call/Text (310) 928-9447
            </a>
          </div>
        </div>
      </section>

      {/* ================= CONTENT PLACEHOLDER ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#3E3B32]">
          Technology That Elevates Your Care
        </h2>
        <p className="mt-4 max-w-2xl text-[#5A564C] text-lg">
          We invest in advanced tools that improve precision, comfort, and
          long-term outcomes — all designed around you.
        </p>
      </section>
      <TechnologyIntro />
    </main>
    </PageWrapper>
  )
}
