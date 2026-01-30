// import React from 'react'

// // Replace these with your own images in Frontend/src/assets or keep as placeholders
// const img1 = new URL('../assets/about-1.jpg', import.meta.url).href
// const img2 = new URL('../assets/about-2.jpg', import.meta.url).href
// const img3 = new URL('../assets/about-3.jpg', import.meta.url).href

// export default function AboutHero() {
//   return (
//     <section
//       className="w-full"
//       style={{ backgroundColor: '#F4F0E6' }}
//       aria-labelledby="about-hero-title"
//     >
//       <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-28">
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
//           {/* Left column: Headline + mission */}
//           <div className="w-full md:w-1/2">
//             <div className="max-w-2xl">
//               <h1
//                 id="about-hero-title"
//                 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight"
//                 style={{ color: '#3E3B32', letterSpacing: '-0.01em' }}
//               >
//                 We’re on a mission to transform your relationship with your smile.
//               </h1>

//               <p className="mt-6 text-base sm:text-lg" style={{ color: '#3E3B32', opacity: 0.9 }}>
//                 Gentle experience • Transparency • Convenience • Self-care
//               </p>

//               <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
//                 <div className="flex items-start gap-3">
//                   <div
//                     className="mt-0.5 w-3 h-3 rounded-full"
//                     style={{ backgroundColor: '#EAB308' }}
//                     aria-hidden
//                   />
//                   <div>
//                     <div className="text-sm font-semibold" style={{ color: '#3E3B32' }}>
//                       Gentle experience
//                     </div>
//                     <div className="text-sm text-[#3E3B32]/80">Comfort-first care and calm rooms</div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div
//                     className="mt-0.5 w-3 h-3 rounded-full"
//                     style={{ backgroundColor: '#5B8FA8' }}
//                     aria-hidden
//                   />
//                   <div>
//                     <div className="text-sm font-semibold" style={{ color: '#3E3B32' }}>
//                       Transparency
//                     </div>
//                     <div className="text-sm text-[#3E3B32]/80">Clear plans, no surprises</div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div
//                     className="mt-0.5 w-3 h-3 rounded-full"
//                     style={{ backgroundColor: '#C5A049' }}
//                     aria-hidden
//                   />
//                   <div>
//                     <div className="text-sm font-semibold" style={{ color: '#3E3B32' }}>
//                       Convenience
//                     </div>
//                     <div className="text-sm text-[#3E3B32]/80">Easy booking and thoughtful follow-up</div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div
//                     className="mt-0.5 w-3 h-3 rounded-full"
//                     style={{ backgroundColor: '#F4F0E6', border: '2px solid #EAB308' }}
//                     aria-hidden
//                   />
//                   <div>
//                     <div className="text-sm font-semibold" style={{ color: '#3E3B32' }}>
//                       Self-care
//                     </div>
//                     <div className="text-sm text-[#3E3B32]/80">Treatments that respect you holistically</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <a
//                   href="/about"
//                   className="inline-flex items-center px-4 py-2 rounded-full border transition-shadow text-sm font-medium"
//                   style={{
//                     color: '#EAB308',
//                     borderColor: '#EAB308',
//                     backgroundColor: 'transparent',
//                     boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
//                   }}
//                 >
//                   Learn more
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Right column: Image collage */}
//           <div className="w-full md:w-1/2">
//             <div className="w-full grid grid-cols-2 grid-rows-2 gap-4">
//               <div className="col-span-2 row-span-1 sm:row-span-2 md:col-span-1 md:row-span-2">
//                 <img
//                   src={img1}
//                   alt="Studio interior, softly lit"
//                   className="w-full h-full object-cover rounded-2xl shadow-lg transform transition-transform hover:scale-105"
//                   style={{ minHeight: 220 }}
//                 />
//               </div>

//               <div className="hidden sm:block">
//                 <img
//                   src={img2}
//                   alt="Smiling patient"
//                   className="w-full h-full object-cover rounded-xl shadow-md transform transition-transform hover:scale-105"
//                   style={{ minHeight: 100 }}
//                 />
//               </div>

//               <div className="hidden sm:block">
//                 <img
//                   src={img3}
//                   alt="Welcoming reception / clean interior"
//                   className="w-full h-full object-cover rounded-xl shadow-md transform transition-transform hover:scale-105"
//                   style={{ minHeight: 100 }}
//                 />
//               </div>
//             </div>

//             {/* Mobile: show stacked small images under the main image */}
//             <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
//               <img
//                 src={img2}
//                 alt="Smiling patient"
//                 className="w-full h-28 object-cover rounded-xl shadow-md"
//               />
//               <img
//                 src={img3}
//                 alt="Welcoming reception / clean interior"
//                 className="w-full h-28 object-cover rounded-xl shadow-md"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

import React from 'react'

const imgMain = new URL('../assets/about-hero-main.jpg', import.meta.url).href
const imgA = new URL('../assets/about-hero-a.jpg', import.meta.url).href
const imgB = new URL('../assets/about-hero-b.jpg', import.meta.url).href

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="bg-[#F4F0E6] text-[#3E3B32]"
    >
      <div
        className="mx-auto max-w-[1200px] md:py-20 py-5 md:px-10 px-5"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
          {/* Text column */}
          <div className="w-full md:w-1/2">
            <div className="max-w-[480px]">
              <h1
                id="about-hero-title"
                className="font-sans font-medium text-[28px] md:text-[42px] lg:text-[54px] leading-tight"
                style={{ lineHeight: 1.05 }}
              >
                We’re on a mission to transform your relationship with your smile.
              </h1>

              <p className="mt-6 text-[17px] leading-relaxed">
                We craft gentle, evidence-led care that centers your comfort and dignity. We believe in clear communication,
                honest treatment plans, and thoughtful convenience so every visit feels calm and caring. Our approach puts
                you first — empowering better oral health and confident smiles.
              </p>

              <div className="mt-8">
                <a
                  href="/about"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-[8px] text-sm font-medium transition-shadow shadow-sm"
                  style={{
                    border: '1.5px solid #EAB308',
                    color: '#3E3B32',
                    background: 'transparent',
                  }}
                >
                  Learn our story
                </a>
              </div>
            </div>
          </div>

          {/* Image collage column */}
          <div className="w-full md:w-1/2">
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4 items-start">
                {/* Main image: always visible, scales for device */}
                <div className="col-span-2 md:col-span-1 md:row-span-2">
                  <img
                    src={imgMain}
                    alt="Warm, softly lit studio interior"
                    className="w-full h-[300px] sm:h-[360px] md:h-[420px] object-cover rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-transform hover:scale-105"
                    style={{ borderRadius: 16 }}
                  />
                </div>

                {/* Two supporting images: hidden on small screens */}
                <img
                  src={imgA}
                  alt="Smiling patient"
                  className="hidden md:block w-full h-[160px] object-cover rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform hover:scale-105"
                  style={{ borderRadius: 14 }}
                />
                <img
                  src={imgB}
                  alt="Clean reception / warm light"
                  className="hidden md:block w-full h-[160px] object-cover rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform hover:scale-105"
                  style={{ borderRadius: 14 }}
                />
              </div>

              {/* Mobile: if very small, allow collage to visually collapse to single centered image */}
              <div className="mt-4 md:hidden flex justify-center">
                <img
                  src={imgMain}
                  alt="Warm, softly lit studio interior (mobile)"
                  className="w-11/12 h-[260px] object-cover rounded-[12px] shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                  style={{ borderRadius: 12 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}