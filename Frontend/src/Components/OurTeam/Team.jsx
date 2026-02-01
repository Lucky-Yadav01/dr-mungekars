import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useUnsplashImages from '../../hooks/useUnsplashImages'
import PageWrapper from '../PageWrapper'

// assets
import drSiddhesh from '../../assets/drsiddhesh.png'
import drSunita from '../../assets/drsunita.png'

// Fallback images in case Unsplash fails
const fallbackImages = [
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1606768666260-37ddf4c35124?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1629909613654-28afa0215e11?w=800&h=600&fit=crop'
]

export default function Team() {
  const location = useLocation()

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  /* ===============================
     HERO BANNER IMAGE (UNSPLASH)
  =============================== */
  const { images } = useUnsplashImages(
    'professional dental clinic team outdoor portrait',
    3
  )

  const [heroImage, setHeroImage] = useState('')

  useEffect(() => {
    if (images?.length > 0) {
      setHeroImage(images[0].urls?.regular || images[0])
    } else {
      // Fallback if Unsplash fails
      setHeroImage(fallbackImages[0])
    }
  }, [images])

  return (
    <PageWrapper>
    <main className="bg-[#F4F0E6] text-[#3E3B32]">
      {/* ======================================================
          HERO SECTION (IMG 1 STYLE)
      ====================================================== */}
      <section className="relative w-full h-[450px] sm:h-[550px] md:h-[700px] overflow-hidden -mt-[72px] pt-[72px]">
        {heroImage && (
          <img
            src={heroImage}
            alt="Dr. Mungekar's Dental Clinic Team"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-white max-w-3xl">
            This Is Feel-Good Dentistry
          </h1>

          <p className="mt-4 text-white/90 max-w-xl text-lg">
            Get to know our approach at Dr. Mungekar’s Family Dentistry
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/book-appointment"
              className="bg-[#FFA000] hover:bg-[#ff9800] text-white px-6 py-3 rounded-full font-medium shadow-md transition"
            >
              Request Appointment
            </Link>

            <a
              href="tel:3109289447"
              className="text-white underline underline-offset-4"
            >
              Call/Text (310) 928-9447
            </a>
          </div>
        </div>
      </section>

      {/* ===============================
   MODERN CARE SECTION
=============================== */}
<section className="bg-white py-24">
  <div className="max-w-7xl mx-auto px-6 relative">
    {/* Title */}
    <div className="max-w-md">
      <h2 className="text-3xl md:text-4xl font-serif leading-tight">
        We’re committed to
        <br />
        your long-term health
      </h2>

      <p className="mt-6 text-base leading-relaxed text-gray-700">
        Your oral health is just one part of your overall well-being. Our team
        takes the time to understand your health, your goals, and your past
        experiences. It’s how we build a care plan that truly fits you.
      </p>
    </div>

    {/* Image collage */}
    <div className="relative mt-16 h-[520px]">
      {/* Left image */}
      <img
        src={images?.[0]?.urls?.regular || fallbackImages[0]}
        alt="Dental consultation"
        className="absolute left-0 bottom-0 w-[220px] h-[220px] object-cover rounded-2xl shadow-lg"
      />

      {/* Center BIG image */}
      <img
        src={images?.[1]?.urls?.regular || fallbackImages[1]}
        alt="Dentist explaining treatment"
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[320px] h-[320px] object-cover rounded-2xl shadow-xl"
      />

      {/* Right image */}
      <img
        src={images?.[2]?.urls?.regular || fallbackImages[2]}
        alt="Dental technology"
        className="absolute right-0 top-20 w-[220px] h-[220px] object-cover rounded-2xl shadow-lg"
      />
    </div>

    {/* Bottom text */}
    <div className="absolute right-6 bottom-10 max-w-sm">
      <h3 className="text-2xl font-serif">
        Modern care, zero judgment
      </h3>

      <p className="mt-4 text-gray-700 leading-relaxed">
        Whether you’re managing anxiety, catching up after time away, or just
        looking for a new kind of dental experience, this is a space where
        you’ll feel seen, heard, and cared for.
      </p>
    </div>
  </div>
</section>

{/* ===============================
   DOCTORS SECTION
=============================== */}
<section className="bg-[#EFEAE1] py-24">
  <div className="max-w-7xl mx-auto px-6 space-y-12">
    {/* Doctor 1 */}
    <div className="bg-[#F6F1E9] rounded-2xl p-10 grid md:grid-cols-[260px_1fr] gap-10 items-center">
      <img
        src={drSiddhesh}
        alt="Dr. Siddhesh Mungekar"
        className="w-[240px] h-[280px] object-cover rounded-xl"
      />

      <div>
        <h3 className="text-2xl font-serif">
          Dr. Siddhesh Mungekar
        </h3>

        <p className="mt-1 italic text-sm text-gray-700">
          B.D.S., N.H.D.C. (Nair Hospital)
          <br />
          Dental Surgeon & Implantologist
        </p>

        <p className="mt-6 leading-relaxed text-gray-800">
          Dr. Siddhesh Mungekar brings a precise, technology-driven approach
          to dentistry. With advanced training in implantology and restorative
          care, he focuses on long-term outcomes and patient comfort.
        </p>
      </div>
    </div>

    {/* Doctor 2 */}
    <div className="bg-[#F6F1E9] rounded-2xl p-10 grid md:grid-cols-[260px_1fr] gap-10 items-center">
      <img
        src={drSunita}
        alt="Dr. Sunita Mungekar"
        className="w-[240px] h-[280px] object-cover rounded-xl"
      />

      <div>
        <h3 className="text-2xl font-serif">
          Dr. Sunita Mungekar
        </h3>

        <p className="mt-1 italic text-sm text-gray-700">
          B.D.S., N.H.D.C. (Nair Hospital)
          <br />
          Dental Surgeon & Consultant
        </p>

        <p className="mt-6 leading-relaxed text-gray-800">
          Dr. Sunita Mungekar is known for her gentle care and clear
          communication. She believes patients should feel informed,
          respected, and relaxed at every stage of treatment.
        </p>
      </div>
    </div>
  </div>
</section>

    </main>
    </PageWrapper>
  )
}
