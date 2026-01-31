// import React from 'react'
// import {
//   CheckCircle,
//   Smile,
//   Plus,
//   Scissors,
//   Zap,
//   Trash2,
//   Award,
//   Layers,
//   Camera,
//   Monitor,
//   Image,
//   Target,
//   Search,
// } from 'lucide-react'

// const services = [
//   { name: 'Routine Check-up', icon: CheckCircle },
//   { name: 'Invisible Aligners', icon: Smile },
//   { name: 'Dental Implant', icon: Plus },
//   { name: 'Dental Surgeries', icon: Scissors },
//   { name: 'Laser RCT', icon: Zap },
//   { name: 'Tooth Extraction', icon: Trash2 },
//   { name: 'Braces Treatment', icon: Award },
//   { name: 'Child Teeth Care', icon: Layers },
//   { name: 'Zirconia Crowns', icon: Award },
//   { name: 'Tooth Veneers', icon: Layers },
// ]

// const equipments = [
//   { name: 'Intra-Oral Camera', icon: Camera },
//   { name: 'Dental Laser', icon: Zap },
//   { name: 'Digital RVG X-Ray', icon: Monitor },
//   { name: 'Digital OPG (Full Mouth X-Ray) Machine', icon: Image },
//   { name: 'Integrated Endomotor', icon: Target },
//   { name: 'Digital Scanner For Accurate Measurements', icon: Search },
// ]

// export default function Services() {
//   return (
//     <div style={{ background: '#F4F0E6' }} className="py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Heading */}
//         <header className="mb-8 text-center">
//           <h2
//             className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
//             style={{ color: '#efdf53ff' }}
//           >
//             Treatments We Provide
//           </h2>
//           <p className="mt-2 text-sm sm:text-base" style={{ color: '#3E3B32' }}>
//             Evidence-based treatments delivered with compassionate care.
//           </p>
//         </header>

//         {/* Services Grid */}
//         <section className="mb-12">
//           <div
//             className="grid gap-4 sm:gap-6"
//             style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}
//           >
//             {/* small default is 2 columns, adjust with responsive CSS below */}
//             <style>
//               {`
//                 @media (min-width: 768px) {
//                   .services-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
//                 }
//                 @media (min-width: 1024px) {
//                   .services-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
//                 }
//               `}
//             </style>

//             <div className="services-grid col-span-full grid gap-4">
//               {services.map((s) => {
//                 const Icon = s.icon
//                 return (
//                   <div
//                     key={s.name}
//                     className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm transform transition hover:shadow-lg hover:scale-[1.02]"
//                     role="article"
//                     aria-label={s.name}
//                     style={{ borderLeft: '4px solid #efdf53ff' }}
//                   >
//                     <div className="flex-shrink-0">
//                       <div
//                         className="p-3 rounded-md"
//                         style={{ background: 'rgba(91,143,168,0.08)' }}
//                       >
//                         <Icon size={28} className="text-[#5B8FA8]" />
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-base font-semibold" style={{ color: '#3E3B32' }}>
//                         {s.name}
//                       </h3>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Equipment Section */}
//         <section>
//           <header className="mb-6 text-center">
//             <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#efdf53ff' }}>
//               Our Advanced Dental Equipments
//             </h3>
//             <p className="mt-2 text-sm" style={{ color: '#3E3B32' }}>
//               Modern technology to support precise, comfortable treatments.
//             </p>
//           </header>

//           <div
//             className="grid gap-6"
//             style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}
//           >
//             <style>
//               {`
//                 @media (min-width: 768px) {
//                   .equip-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
//                 }
//                 @media (min-width: 1024px) {
//                   .equip-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
//                 }
//               `}
//             </style>

//             <div className="equip-grid col-span-full grid gap-6">
//               {equipments.map((e) => {
//                 const Icon = e.icon
//                 return (
//                   <div
//                     key={e.name}
//                     className="bg-white rounded-lg overflow-hidden shadow-sm transform transition hover:shadow-lg hover:scale-[1.02]"
//                   >
//                     <div
//                       className="w-full h-40 flex items-center justify-center"
//                       style={{ background: 'linear-gradient(180deg, rgba(91,143,168,0.06), rgba(197,176,73,0.03))' }}
//                     >
//                       <Icon size={48} className="text-[#5B8FA8]" />
//                     </div>

//                     <div className="p-4">
//                       <h4 className="text-sm font-semibold" style={{ color: '#3E3B32' }}>
//                         {e.name}
//                       </h4>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle,
  Smile,
  Plus,
  Scissors,
  Zap,
  Trash2,
  Award,
  Layers,
  Camera,
  Monitor,
  Image as ImageIcon,
  Target,
  Search,
} from 'lucide-react'
import useUnsplashImages from '../../hooks/useUnsplashImages'

/* ---------------- DATA ---------------- */

const services = [
  { name: 'Routine Check-up', icon: CheckCircle },
  { name: 'Invisible Aligners', icon: Smile },
  { name: 'Dental Implant', icon: Plus },
  { name: 'Dental Surgeries', icon: Scissors },
  { name: 'Laser RCT', icon: Zap },
  { name: 'Tooth Extraction', icon: Trash2 },
  { name: 'Braces Treatment', icon: Award },
  { name: 'Child Teeth Care', icon: Layers },
  { name: 'Zirconia Crowns', icon: Award },
  { name: 'Tooth Veneers', icon: Layers },
]

const equipments = [
  { name: 'Intra-Oral Camera', icon: Camera },
  { name: 'Dental Laser', icon: Zap },
  { name: 'Digital RVG X-Ray', icon: Monitor },
  { name: 'Digital OPG Machine', icon: ImageIcon },
  { name: 'Integrated Endomotor', icon: Target },
  { name: 'Digital Scanner', icon: Search },
]

/* ---------------- COMPONENT ---------------- */

export default function Services() {
  const { images: heroImages } = useUnsplashImages(
    'modern dental clinic treatment',
    1
  )

  const { images: serviceImages } = useUnsplashImages(
    'dentist patient treatment clinic',
    services.length
  )

  const { images: equipmentImages } = useUnsplashImages(
    'dental technology equipment clinic',
    equipments.length
  )

  return (
    <main className="bg-[#F4F0E6]">
      {/* ================= HERO ================= */}
      <section className="relative h-[360px] md:h-[480px] overflow-hidden">
        {heroImages[0] && (
          <img
            src={heroImages[0].urls.regular}
            alt="Dental services"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Treatments We Provide
          </h1>
          <p className="mt-4 text-white max-w-xl">
            Evidence-based dentistry delivered with comfort, clarity, and care.
          </p>

          <div className="mt-6">
            <Link
              to="/book"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-semibold"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEEL-GOOD DENTISTRY SECTION ================= */}
<section className="py-20 bg-[#F4F0E6]">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

    {/* LEFT IMAGE */}
    <div className="w-full rounded-xl overflow-hidden shadow-sm">
      {serviceImages[9] && (
        <img
          src={serviceImages[9].urls.regular}
          alt="Dental technology planning"
          className="w-full h-[420px] object-cover"
        />
      )}
    </div>

    {/* RIGHT CONTENT */}
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-serif text-[#1F1E1C]">
        Dentistry that feels good
      </h2>

      <p className="mt-5 text-[#5C5A52] leading-relaxed max-w-xl">
        Your teeth do a lot for you — let’s make sure they’re getting the care
        they deserve. Whether you’re dealing with pain, damage, missing teeth,
        or just want to feel more confident about your smile, our team is ready
        to help. Look to us for premier Torrance dental services focused on
        helping you smile your best.
      </p>

      <div className="mt-8">
        <a
          href="/book"
          className="  inline-flex items-center justify-center
    bg-[#FFA500] hover:bg-[#E69500]
    text-white font-semibold
    px-8 py-4
    rounded-lg
    transition-colors duration-200
    shadow-md hover:shadow-lg"
        >
          Request Appointment
        </a>
      </div>

      {/* SECOND IMAGE */}
      <div className="mt-14 rounded-xl overflow-hidden shadow-sm">
        {serviceImages[6] && (
          <img
            src={serviceImages[6].urls.regular}
            alt="Comfortable dental treatment"
            className="w-full h-[320px] object-cover"
          />
        )}
      </div>
    </div>
  </div>
</section>


      {/* ================= SERVICES ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E3B32]">
              Comprehensive Dental Care
            </h2>
            <p className="mt-3 text-[#5C5A52]">
              Personalized treatments for every stage of your smile.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => {
              const Icon = s.icon
              const img = serviceImages[i]

              return (
                <article
                  key={s.name}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden">
                    {img && (
                      <img
                        src={img.urls.regular}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="text-amber-500" size={22} />
                      <h3 className="text-lg font-semibold text-[#3E3B32]">
                        {s.name}
                      </h3>
                    </div>

                    <p className="text-sm text-[#5C5A52]">
                      Advanced techniques designed for comfort, precision, and
                      long-term oral health.
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= EQUIPMENT ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <header className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#3E3B32]">
              Our Advanced Dental Technology
            </h3>
            <p className="mt-3 text-[#5C5A52]">
              Modern tools that make your visit faster, gentler, and more precise.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipments.map((e, i) => {
              const Icon = e.icon
              const img = equipmentImages[i]

              return (
                <div
                  key={e.name}
                  className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-[#111827]"
                >
                  {/* Image */}
                  <div className="h-44">
                    {img && (
                      <img
                        src={img.urls.regular}
                        alt={e.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="p-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={20} className="text-amber-400" />
                      <h4 className="font-semibold">{e.name}</h4>
                    </div>
                    <p className="text-sm text-white/80">
                      Designed to improve accuracy, comfort, and treatment
                      outcomes.
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
