

// import React, { useState, useEffect, useRef } from 'react'
// import { Link } from 'react-router-dom'
// import banner1 from '../assets/homebanner1.png'
// import banner2 from '../assets/homebanner2.png'
// import banner3 from '../assets/homebanner3.png'

// export default function HomePage() {
//   const slides = [banner1, banner2, banner3]
//   const [index, setIndex] = useState(0)
//   const timeoutRef = useRef(null)

//   const next = () => setIndex((i) => (i + 1) % slides.length)
//   const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
//   const goTo = (i) => setIndex(i)

//   // autoplay
//   useEffect(() => {
//     timeoutRef.current = setTimeout(() => next(), 5000)
//     return () => clearTimeout(timeoutRef.current)
//   }, [index])

//   return (
//     <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen flex flex-col">
//       <main className="w-full flex-1">
//         {/* Carousel / Banner */}
//         <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
//           <div
//             className="absolute inset-0 flex transition-transform duration-700"
//             style={{ transform: `translateX(-${index * 100}%)` }}
//             onClick={next} /* click on banner to move next */
//           >
//             {slides.map((src, i) => (
//               <div key={i} className="w-full flex-shrink-0 relative">
//                 <img
//                   src={src}
//                   alt={`banner-${i + 1}`}
//                   className="w-full h-[420px] md:h-[520px] object-cover"
//                 />

//                 {/* title overlay (non-interactive) */}
//                 <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 pointer-events-none">
//                   <h1 className="mt-6 md:mt-12 text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
//                     Dr. Mungekar's Dental Clinic
//                   </h1>
//                   <p className="mt-3 md:mt-4 text-white text-lg md:text-xl drop-shadow-sm">
//                     Your Trusted Partner for a Healthy Smile
//                   </p>
//                 </div>

//                 {/* service boxes (interactive) */}
//                 <div className="absolute left-0 right-0 bottom-6 md:bottom-12 flex justify-center pointer-events-auto px-4">
//                   <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <Link
//                       to="/services"
//                       onClick={(e) => e.stopPropagation()}
//                       className="bg-teal-500/85 hover:bg-teal-500/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
//                       aria-label="General Dentistry - view services"
//                     >
//                       <span className="text-sm tracking-wide">GENERAL</span>
//                       <span className="font-bold text-lg">DENTISTRY</span>
//                     </Link>

//                     <Link
//                       to="/services"
//                       onClick={(e) => e.stopPropagation()}
//                       className="bg-cyan-600/85 hover:bg-cyan-600/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
//                       aria-label="Cosmetic Dentistry - view services"
//                     >
//                       <span className="text-sm tracking-wide">COSMETIC</span>
//                       <span className="font-bold text-lg">DENTISTRY</span>
//                     </Link>

//                     <Link
//                       to="/services"
//                       onClick={(e) => e.stopPropagation()}
//                       className="bg-emerald-500/85 hover:bg-emerald-500/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
//                       aria-label="Emergency Dental Care - view services"
//                     >
//                       <span className="text-sm tracking-wide">EMERGENCY</span>
//                       <span className="font-bold text-lg">DENTAL CARE</span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* left / right arrows */}
//           <button
//             aria-label="Previous slide"
//             onClick={(e) => { e.stopPropagation(); prev() }}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/>
//             </svg>
//           </button>

//           <button
//             aria-label="Next slide"
//             onClick={(e) => { e.stopPropagation(); next() }}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 11-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
//             </svg>
//           </button>

//           {/* indicators */}
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//             {slides.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={(e) => { e.stopPropagation(); goTo(i) }}
//                 className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'} shadow`}
//                 aria-label={`Go to slide ${i + 1}`}
//               />
//             ))}
//           </div>
//         </section>

//         {/* rest of page content (services etc.) */}
//         <section className="container mx-auto px-4 py-12">
//           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-amber-600">General Dentistry</h3>
//               <p className="mt-2 text-gray-600">Comprehensive check-ups and cleanings to maintain your oral health.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-amber-600">Cosmetic Dentistry</h3>
//               <p className="mt-2 text-gray-600">Enhance your smile with whitening and aesthetic treatments.</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-amber-600">Orthodontics</h3>
//               <p className="mt-2 text-gray-600">Personalised solutions for straighter teeth and lasting confidence.</p>
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Us */}
//         <section className="container mx-auto px-4 pb-12">
//           <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-sm">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Dr. Mungekar's</h3>
//             <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
//               <li>
//                 <strong className="block text-amber-600">Experienced Team</strong>
//                 Compassionate dentists & staff with years of experience.
//               </li>
//               <li>
//                 <strong className="block text-amber-600">Modern Facility</strong>
//                 State-of-the-art equipment for safe and effective care.
//               </li>
//               <li>
//                 <strong className="block text-amber-600">Patient Focused</strong>
//                 Comfortable treatments tailored to each patient.
//               </li>
//             </ul>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
//           <div>
//             <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
//             <p>Dr. Mungekar's Dental Clinic</p>
//             <p>123 Smile Avenue, Mumbai, India</p>
//             <p>Phone: +91 98765 43210</p>
//             <p>Email: info@mungekarsdental.com</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-2">Clinic Hours</h4>
//             <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
//             <p>Sat: 10:00 AM - 5:00 PM</p>
//             <p>Sun: Closed</p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
//             <p>
//               <a href="#" className="hover:underline">Instagram</a> |{' '}
//               <a href="#" className="hover:underline">Facebook</a> |{' '}
//               <a href="#" className="hover:underline">Twitter</a>
//             </p>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 text-center mt-8 text-sm text-gray-400">
//           <p>&copy; 2025 Dr. Mungekar's Dental Clinic. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }


// ...existing code...
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import banner1 from '../assets/homebanner1.png'
import banner2 from '../assets/homebanner2.png'
import banner3 from '../assets/homebanner3.png'
import drsiddhesh from '../assets/drsiddhesh.png'
import drsunita from '../assets/drsunita.png'

export default function HomePage() {
  const slides = [banner1, banner2, banner3]
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  const next = () => setIndex((i) => (i + 1) % slides.length)
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goTo = (i) => setIndex(i)

  useEffect(() => {
    // autoplay every 5s
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearTimeout(timeoutRef.current)
  }, [index])

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen flex flex-col">
      <main className="w-full flex-1">
        {/* Carousel / Banner */}
        <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
          <div
            className="absolute inset-0 flex transition-transform duration-700"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onClick={next} /* click on banner to move next */
          >
            {slides.map((src, i) => (
              <div key={i} className="w-full flex-shrink-0 relative">
                <img
                  src={src}
                  alt={`banner-${i + 1}`}
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />

                {/* title overlay (moved slightly down) */}
                <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 pointer-events-none">
                  <h1 className="mt-6 md:mt-12 text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
                    Dr. Mungekar's Dental Clinic
                  </h1>
                  <p className="mt-3 md:mt-4 text-white text-lg md:text-xl drop-shadow-sm">
                    Your Trusted Partner for a Healthy Smile
                  </p>
                </div>

                {/* service boxes (interactive) */}
                <div className="absolute left-0 right-0 bottom-6 md:bottom-12 flex justify-center pointer-events-auto px-4">
                  <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                      to="/services"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-teal-500/85 hover:bg-teal-500/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
                      aria-label="General Dentistry - view services"
                    >
                      <span className="text-sm tracking-wide">GENERAL</span>
                      <span className="font-bold text-lg">DENTISTRY</span>
                    </Link>

                    <Link
                      to="/services"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-cyan-600/85 hover:bg-cyan-600/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
                      aria-label="Cosmetic Dentistry - view services"
                    >
                      <span className="text-sm tracking-wide">COSMETIC</span>
                      <span className="font-bold text-lg">DENTISTRY</span>
                    </Link>

                    <Link
                      to="/services"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-emerald-500/85 hover:bg-emerald-500/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
                      aria-label="Emergency Dental Care - view services"
                    >
                      <span className="text-sm tracking-wide">EMERGENCY</span>
                      <span className="font-bold text-lg">DENTAL CARE</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* left / right arrows */}
          <button
            aria-label="Previous slide"
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
          </button>

          <button
            aria-label="Next slide"
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 11-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>

          {/* indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i) }}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'} shadow`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ABOUT SECTION (below banner) */}
        <section id="about" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-400"
            >
              ABOUT US
            </h2>

            <div className="mx-auto mt-4 text-gray-600 leading-relaxed">
              <p className="mb-6">
                I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click "Edit Text" or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I'm a great place for you to tell a story and let your users know a little more about you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
                <div>
                  <p className="mb-4">
                    This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide.
                  </p>
                  <p>
                    Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    We offer modern dental care with a friendly team focused on your comfort and long-term oral health. Our facility uses state-of-the-art equipment to ensure safe, effective treatments.
                  </p>
                  <p>
                    Book an appointment to experience personalised care and a smile-first approach to dentistry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
     
        {/* OUR SERVICES */}
        <section id="services" className="py-16" style={{ backgroundColor: '#f1f0eaff' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-yellow-400" >
                OUR SERVICES
              </h2>
              <div className="mx-auto w-3 h-3 bg-[#C5A049] mt-4 rounded-sm" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Routine Exams', desc: 'Comprehensive check-ups to maintain oral health.' },
                { title: 'Dental Hygiene', desc: 'Professional cleaning & preventative care.' },
                { title: 'Dental Fillings', desc: 'Durable, natural-looking restorations.' },
                { title: 'Dentures & Veneers', desc: 'Cosmetic and restorative tooth replacements.' },
                { title: 'Emergency Dentistry', desc: 'Prompt care for urgent dental issues.' },
                { title: 'Teeth Whitening', desc: 'Safe whitening for a brighter smile.' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-8 rounded-md shadow-md flex flex-col justify-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} /* subtle translucent panels over cream */
                >
                  <h3 className="text-lg font-semibold mb-2 text-yellow-400" >
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-700">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
   {/* STATS BAR — yellow background (logo color) */}
        <section id="stats" className="py-8" style={{ backgroundColor: '#efbc46ff' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center text-white py-8">
              <div>
                <div className="text-3xl md:text-5xl font-extrabold leading-none">15</div>
                <div className="text-xs md:text-sm mt-1 opacity-90">Years of Experience</div>
              </div>

              <div>
                <div className="text-3xl md:text-5xl font-extrabold leading-none">452</div>
                <div className="text-xs md:text-sm mt-1 opacity-90">Smiling Clients</div>
              </div>

              <div>
                <div className="text-3xl md:text-5xl font-extrabold leading-none">26</div>
                <div className="text-xs md:text-sm mt-1 opacity-90">Master Certifications</div>
              </div>

              <div>
                <div className="text-3xl md:text-5xl font-extrabold leading-none">12</div>
                <div className="text-xs md:text-sm mt-1 opacity-90">Happy Staff</div>
              </div>
            </div>
          </div>
        </section>


        {/* OUR DENTISTS — two images side-by-side with info below */}
        <section id="dentists" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#f0b326ff' }}>
              OUR DENTISTS
            </h2>
            <div className="mx-auto w-3 h-3 mt-3 rounded-sm" style={{ backgroundColor: '#f0b326ff' }} />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
            {/* Doctor 1 */}
            <div className="w-56 text-center">
              <img
                src={drsiddhesh}
                alt="Dr. Siddhesh"
                className="w-56 h-56 object-cover rounded-md shadow-md mx-auto bg-gray-100"
              />
              <h4 className="mt-4 text-lg font-medium text-gray-800">Dr. Siddhesh Mungekar</h4>
              <button
                className="mt-3 bg-[#C5A049] text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-95 transition"
                onClick={() => (window.location.href = '/book')}
              >
                Book Now
              </button>
            </div>

            {/* Doctor 2 */}
            <div className="w-56 text-center">
              <img
                src={drsunita}
                alt="Dr. Sunita"
                className="w-56 h-56 object-cover rounded-md shadow-md mx-auto bg-gray-100"
              />
              <h4 className="mt-4 text-lg font-medium text-gray-800">Dr. Sunita Mungekar</h4>
              <button
                className="mt-3 bg-[#C5A049] text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-95 transition"
                onClick={() => (window.location.href = '/book')}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Info paragraph below images */}
          <div className="max-w-3xl mx-auto text-center mt-10 text-gray-600">
            <p>
              Our dentists bring years of experience in general and cosmetic dentistry, combining modern techniques
              with a gentle, patient-first approach. They specialise in preventive care, aesthetic treatments and
              complex restorative procedures — dedicated to delivering comfortable, personalised treatment plans for every patient.
            </p>
          </div>
        </section>



        {/* HAPPY CLIENTS / TESTIMONIALS (cream background) */}
        <section id="testimonials" className="py-16" style={{ backgroundColor: '#F4F0E6' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#f0b326ff' }}>
              HAPPY CLIENTS
            </h2>
            <div className="mx-auto w-3 h-3 bg-[#0ea5a4] mt-3 rounded-sm" />
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center px-6">
                <div className="text-4xl text-teal-400 mb-4">“</div>
                <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
                  "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
                </p>
                <div className="mt-6 text-sm font-semibold text-gray-900">Danielle Hudson</div>
              </div>

              <div className="text-center px-6">
                <div className="text-4xl text-teal-400 mb-4">“</div>
                <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
                  "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
                </p>
                <div className="mt-6 text-sm font-semibold text-gray-900">Philip Cruz</div>
              </div>

              <div className="text-center px-6">
                <div className="text-4xl text-teal-400 mb-4">“</div>
                <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
                  "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
                </p>
                <div className="mt-6 text-sm font-semibold text-gray-900">Meghan Charles</div>
              </div>
            </div>
          </div>
        </section>

      
        {/* CONTACT US — below testimonials, shows address + embedded map */}
      
        <section id="contact" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ color: '#f0b326ff' }}
            >
              CONTACT US
            </h2>
            <div className="mx-auto w-3 h-3" style={{ backgroundColor: '#0ea5a4' }} />
          </div>

          <div className="max-w-6xl mx-auto px-4 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Left column: Address */}
              <div className="md:col-span-1 text-center md:text-right">
                <h4 className="text-lg font-semibold mb-2">Our Address</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  No 26, Nilje Gaon, Meadows Green,<br />
                  Near Casa Rio Main Rd, Dombivli East,<br />
                  Mumbai, Nilje Gaon, Maharashtra 421204
                </p>
              </div>

              {/* Vertical divider on md+ */}
              <div className="hidden md:flex items-center justify-center">
                <div className="h-28 border-l border-gray-200" />
              </div>

              {/* Right column: Hours + Phone */}
              <div className="md:col-span-1 text-center md:text-left">
                <h4 className="text-lg font-semibold mb-2">Opening Hours</h4>
                <p className="text-sm text-gray-700">
                  Monday – Friday: 9AM – 7PM<br />
                  Saturday: 9AM – 2PM
                </p>

                <div className="mt-6">
                  <div
                    className="text-3xl md:text-4xl font-semibold"
                    style={{ color: '#f0b326ff' }}
                  >
                    8928483233
                  </div>
                </div>
              </div>
            </div>

            {/* Map centered below */}
            <div className="mt-10 flex justify-center">
              <div className="w-full md:w-3/4 h-64 rounded overflow-hidden shadow">
                <iframe
                  title="clinic-map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={
                    'https://maps.google.com/maps?q=' +
                    encodeURIComponent(
                      'No 26, Nilje Gaon, Meadows Green, Near Casa Rio Main Rd, Dombivli East, Mumbai, Maharashtra 421204'
                    ) +
                    '&z=15&output=embed'
                  }
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

      
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p>Dr. Mungekar's Dental Clinic</p>
            <p>123 Smile Avenue, Mumbai, India</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: info@mungekarsdental.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Clinic Hours</h4>
            <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
            <p>Sat: 10:00 AM - 5:00 PM</p>
            <p>Sun: Closed</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <p>
              <a href="#" className="hover:underline">Instagram</a> |{' '}
              <a href="#" className="hover:underline">Facebook</a> |{' '}
              <a href="#" className="hover:underline">Twitter</a>
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center mt-8 text-sm text-gray-400">
          <p>&copy; 2025 Dr. Mungekar's Dental Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
