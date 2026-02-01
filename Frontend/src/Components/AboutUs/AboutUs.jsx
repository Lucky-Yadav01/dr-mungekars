// // import React, { useState, useEffect } from 'react'
// // import { Link } from 'react-router-dom'
// // import useUnsplashImages from '../../hooks/useUnsplashImages'

// // export default function AboutHero() {
// //   const { images, loading } = useUnsplashImages('dental office team professional', 1)
// //   const [bannerImage, setBannerImage] = useState('')

// //   useEffect(() => {
// //     if (images.length > 0) {
// //       setBannerImage(images[0])
// //     }
// //   }, [images])

// //   return (
// //     <>
// //       {/* Hero Banner with Unsplash Image */}
// //       <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
// //         {bannerImage && (
// //           <img
// //             src={bannerImage}
// //             alt="About Us - Feel-Good Dentistry Team"
// //             className="w-full h-full object-cover"
// //           />
// //         )}

// //         {/* Dark overlay for text readability */}
// //         <div className="absolute inset-0 bg-black/40"></div>

// //         {/* Title overlay */}
// //         <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 pointer-events-none">
// //           <h1 className="mt-6 md:mt-12 text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
// //             This Is Feel-Good Dentistry
// //           </h1>
// //           <p className="mt-3 md:mt-4 text-white text-lg md:text-xl drop-shadow-sm">
// //             Get to know our approach at Dr. Mungekar's Family Dentistry
// //           </p>
// //         </div>

// //         {/* CTA buttons */}
// //         <div className="absolute left-0 right-0 bottom-6 md:bottom-12 flex justify-start px-8 md:px-16 pointer-events-auto gap-4">
// //           <Link
// //             to="/book-appointment"
// //             className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md shadow-md font-semibold transition-colors"
// //           >
// //             Request Appointment
// //           </Link>
// //           <a
// //             href="tel:(310) 928-9447"
// //             className="bg-gray-800/85 hover:bg-gray-800/95 text-white py-3 px-6 rounded-md shadow-md font-semibold transition-colors"
// //           >
// //             Call/Text (310) 928-9447
// //           </a>
// //         </div>
// //       </section>

// //       {/* Content Section */}
// //       <section
// //         aria-labelledby="about-hero-title"
// //         className="bg-[#F4F0E6] text-[#3E3B32]"
// //       >
// //         <div
// //           className="mx-auto max-w-[1200px] md:py-20 py-5 md:px-10 px-5"
// //           style={{ paddingTop: '80px', paddingBottom: '80px' }}
// //         >
// //           <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
// //             {/* Text column */}
// //             <div className="w-full md:w-1/2">
// //               <div className="max-w-[480px]">
// //                 <h2
// //                   id="about-hero-title"
// //                   className="font-sans font-medium text-[28px] md:text-[42px] lg:text-[54px] leading-tight"
// //                   style={{ lineHeight: 1.05 }}
// //                 >
// //                   We're on a mission to transform your relationship with your smile.
// //                 </h2>

// //                 <p className="mt-6 text-[17px] leading-relaxed">
// //                   We craft gentle, evidence-led care that centers your comfort and dignity. We believe in clear communication,
// //                   honest treatment plans, and thoughtful convenience so every visit feels calm and caring. Our approach puts
// //                   you first — empowering better oral health and confident smiles.
// //                 </p>

// //                 <div className="mt-8">
// //                   <Link
// //                     to="/about"
// //                     className="inline-flex items-center justify-center px-5 py-3 rounded-[8px] text-sm font-medium transition-shadow shadow-sm"
// //                     style={{
// //                       border: '1.5px solid #EAB308',
// //                       color: '#3E3B32',
// //                       background: 'transparent',
// //                     }}
// //                   >
// //                     Learn our story
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Loading state or image */}
// //             <div className="w-full md:w-1/2">
// //               <div className="w-full">
// //                 {loading ? (
// //                   <div className="w-full h-[300px] sm:h-[360px] md:h-[420px] bg-gray-300 rounded-[16px] flex items-center justify-center">
// //                     <p className="text-gray-600">Loading images...</p>
// //                   </div>
// //                 ) : bannerImage ? (
// //                   <img
// //                     src={bannerImage}
// //                     alt="Our dental team"
// //                     className="w-full h-[300px] sm:h-[360px] md:h-[420px] object-cover rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-transform hover:scale-105"
// //                     style={{ borderRadius: 16 }}
// //                   />
// //                 ) : (
// //                   <div className="w-full h-[300px] sm:h-[360px] md:h-[420px] bg-gray-300 rounded-[16px]"></div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   )
// // }

// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import useUnsplashImages from '../../hooks/useUnsplashImages'

// export default function AboutHero() {
//   // Hero banner image
//   const { images: heroImages } = useUnsplashImages(
//     'dental team outdoors professional',
//     1
//   )

//   // Content image
//   const { images: contentImages, loading } = useUnsplashImages(
//     'modern dental clinic interior warm',
//     1
//   )

//   const [heroBg, setHeroBg] = useState('')
//   const [contentImg, setContentImg] = useState('')

//   useEffect(() => {
//     if (heroImages?.length) setHeroBg(heroImages[0])
//     if (contentImages?.length) setContentImg(contentImages[0])
//   }, [heroImages, contentImages])

//   return (
//     <>
//       {/* ================= HERO BANNER ================= */}
//       <section className="relative w-full h-[380px] sm:h-[450px] md:h-[520px] overflow-hidden">
//         {/* Background image */}
//         {heroBg && (
//           <img
//             src={heroBg}
//             alt="Dr. Mungekar's Dental Team"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         )}

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/40" />

//         {/* Content */}
//         <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
//           <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-serif leading-tight max-w-2xl">
//             This Is Feel-Good Dentistry
//           </h1>

//           <p className="mt-4 text-white text-base sm:text-lg max-w-xl">
//             Get to know our approach at Dr. Mungekar&apos;s Family Dentistry
//           </p>

//           <div className="mt-6 flex flex-wrap gap-4">
//             <Link
//               to="/book"
//               className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium shadow"
//             >
//               Request Appointment
//             </Link>

//             <a
//               href="tel:3109289447"
//               className="text-white font-medium underline underline-offset-4"
//             >
//               Call/Text (310) 928-9447
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ================= ABOUT CONTENT ================= */}
//       <section className="bg-[#F4F0E6] py-16 sm:py-20">
//         <div className="max-w-7xl mx-auto px-6 md:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             {/* Text */}
//             <div>
//               <h2 className="text-3xl sm:text-4xl font-serif leading-tight text-[#3E3B32]">
//                 We&apos;re on a mission to transform your relationship with your
//                 smile.
//               </h2>

//               <p className="mt-6 text-[#4A473E] text-base leading-relaxed max-w-lg">
//                 We craft gentle, evidence-led care that centers your comfort and
//                 dignity. We believe in clear communication, honest treatment
//                 plans, and thoughtful convenience so every visit feels calm and
//                 caring.
//               </p>

//               <p className="mt-4 text-[#4A473E] text-base leading-relaxed max-w-lg">
//                 Our approach puts you first — empowering better oral health and
//                 confident smiles.
//               </p>

//               <Link
//                 to="/about"
//                 className="inline-block mt-8 border border-amber-500 text-[#3E3B32] px-6 py-3 rounded-md hover:bg-amber-500 hover:text-white transition"
//               >
//                 Learn our story
//               </Link>
//             </div>

//             {/* Image */}
//             <div>
//               {loading ? (
//                 <div className="w-full h-[320px] bg-gray-300 rounded-xl" />
//               ) : (
//                 contentImg && (
//                   <img
//                     src={contentImg}
//                     alt="Inside our dental clinic"
//                     className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover rounded-xl shadow-lg"
//                   />
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import useUnsplashImages from '../../hooks/useUnsplashImages'
import PageWrapper from '../PageWrapper'




export default function AboutHero() {

  const { images, loading } = useUnsplashImages(
    'modern dental clinic dentist patient consultation technology',
    4
  )

  // Optional slider index (if needed later)
  const [activeIndex, setActiveIndex] = useState(0)

  // ✅ 2. SAFE IMAGE ACCESS (NO useEffect needed)
  const heroImage =
    images?.[0]?.urls?.regular || images?.[0] || ''

  const cardImage1 =
    images?.[1]?.urls?.regular || images?.[1] || ''

  const cardImage2 =
    images?.[2]?.urls?.regular || images?.[2] || ''

  const techImage =
    images?.[3]?.urls?.regular || images?.[3] || ''



  return (
    <PageWrapper>
    <>
      {/* ================= HERO (MATCHES HOME PAGE) ================= */}
      <section className="relative w-full h-[450px] sm:h-[550px] md:h-[700px] overflow-hidden -mt-[72px] pt-[72px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={
              heroImage ||
              'https://images.unsplash.com/photo-1606813902917-6c1b7d4f7b68'
            }
            alt="Dr. Mungekar's Dental Clinic"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold max-w-2xl">
            Dr. Mungekar&apos;s Dental Clinic
          </h1>

          <p className="mt-4 text-white text-base sm:text-lg max-w-xl">
            Modern dentistry with comfort, care, and advanced technology.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/book"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Book Appointment
            </Link>

            <Link
              to="/contact"
              className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="bg-[#F4F0E6] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3E3B32] leading-tight">
                We&apos;re on a mission to transform your relationship with your
                smile.
              </h2>

              <p className="mt-6 text-[#4A473E] leading-relaxed max-w-lg">
                We craft gentle, evidence-led care that centers your comfort and
                dignity. We believe in clear communication, honest treatment
                plans, and thoughtful convenience so every visit feels calm and
                caring.
              </p>

              <p className="mt-4 text-[#4A473E] leading-relaxed max-w-lg">
                Our approach puts you first — empowering better oral health and
                confident smiles.
              </p>

              <Link
                to="/about"
                className="inline-block mt-8 border border-amber-500 text-[#3E3B32] px-6 py-3 rounded-md hover:bg-amber-500 hover:text-white transition"
              >
                Learn our story
              </Link>
            </div>

            {/* Image */}
            <div className="w-full">
              {loading ? (
                <div className="w-full h-[320px] bg-gray-300 rounded-xl animate-pulse" />
              ) : (
                <img
                  src={
                    heroImage ||
                    'https://images.unsplash.com/photo-1588776814546-1c1c3cfc6c7a'
                  }
                  alt="Dental clinic interior"
                  className="w-full h-[320px] sm:h-[380px] md:h-[420px] object-cover rounded-xl shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {/* ================= WHAT SETS US APART ================= */}
<section className="bg-[#F4F0E6] py-20">
  <div className="max-w-7xl mx-auto px-5 sm:px-8">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <p className="uppercase tracking-widest text-sm text-gray-600">
        What Sets Us Apart
      </p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#3E3B32]">
        We build care around you
      </h2>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      
      {/* LEFT COLUMN */}
      <div className="space-y-10">
        {/* Card 1 */}
        <div className="bg-[#F8F5EC] rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-serif text-[#3E3B32]">
            The most thorough exam you’ve ever had
          </h3>

          <p className="mt-4 text-gray-700 leading-relaxed">
            Patients tell us they’ve never had things explained so clearly.
            We take time to listen, examine carefully, and walk you through
            everything — so you’re never left guessing.
          </p>

          <div className="rounded-xl overflow-hidden bg-[#F4F0E6]">
  {!loading && images[2] ? (
    <img
      src={images[2].urls?.regular || images[2]}
      alt="Dentist explaining treatment"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-[280px] bg-gray-200 animate-pulse" />
  )}
</div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F8F5EC] rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-serif text-[#3E3B32]">
            You deserve to know what’s going on in your mouth
          </h3>

          <p className="mt-4 text-gray-700 leading-relaxed">
            We believe informed patients make better decisions.
            That’s why we explain everything clearly, without pressure —
            just honest guidance.
          </p>

          <div className="rounded-xl overflow-hidden bg-[#F4F0E6]">
  {!loading && images[2] ? (
    <img
      src={images[2].urls?.regular || images[2]}
      alt="Dentist explaining treatment"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-[280px] bg-gray-200 animate-pulse" />
  )}
</div>
        </div>
      </div>

      {/* RIGHT COLUMN – FEATURE */}
      <div className="bg-[#F8F5EC] rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-serif text-[#3E3B32]">
          A high-tech dental care experience
        </h3>

        <p className="mt-4 text-gray-700 leading-relaxed">
          From advanced imaging to modern tools, our technology
          enhances comfort, precision, and long-term results —
          designed around you.
        </p>

        <Link
            to="/technology"
             className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500
             text-[#3E3B32] hover:bg-amber-500 hover:text-white transition"
        >
  Explore Our Technology
</Link>


        <div className="mt-8 rounded-xl overflow-hidden relative">
          {loading ? (
            <div className="h-[360px] bg-gray-300" />
          ) : (
            <img
              src={images[3]}
              alt="Dental technology in clinic"
              className="w-full h-[360px] object-cover"
            />
          )}

          {/* Decorative play icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-amber-500
                            flex items-center justify-center bg-white/70">
              ▶
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
          {/* ================= DETAILS SLIDER SECTION ================= */}
<section className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      {/* Left Text */}
      <div>
        <h3 className="text-3xl md:text-4xl font-serif text-[#3E3B32]">
          It’s all in the details
        </h3>

        <p className="mt-5 text-[#5A564D] leading-relaxed max-w-md">
          Your experience matters. From the calm, modern design of our
          office to the ceiling-mounted blankets and warm tones,
          we’ve designed our space to help you relax.
        </p>

        {/* Decorative line */}
        <div className="mt-10 w-16 h-[2px] bg-amber-500" />
      </div>

      {/* Slider */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">

        {/* Image */}
        {!loading && images?.[activeIndex] ? (
          <img
            src={
              images[activeIndex].urls?.regular ||
              images[activeIndex]
            }
            alt="Dental clinic interior"
            className="w-full h-[260px] sm:h-[320px] md:h-[360px] object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-[320px] bg-gray-200 animate-pulse" />
        )}

        {/* Left Arrow */}
        <button
          onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow transition"
        >
          ←
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow transition"
        >
          →
        </button>
      </div>

    </div>
  </div>
</section>


    </>
    </PageWrapper>
  )
}
