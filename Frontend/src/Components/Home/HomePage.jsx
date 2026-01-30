

// // // import React, { useState, useEffect, useRef } from 'react'
// // // import { Link } from 'react-router-dom'
// // // import banner1 from '../assets/homebanner1.png'
// // // import banner2 from '../assets/homebanner2.png'
// // // import banner3 from '../assets/homebanner3.png'

// // // export default function HomePage() {
// // //   const slides = [banner1, banner2, banner3]
// // //   const [index, setIndex] = useState(0)
// // //   const timeoutRef = useRef(null)

// // //   const next = () => setIndex((i) => (i + 1) % slides.length)
// // //   const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
// // //   const goTo = (i) => setIndex(i)

// // //   // autoplay
// // //   useEffect(() => {
// // //     timeoutRef.current = setTimeout(() => next(), 5000)
// // //     return () => clearTimeout(timeoutRef.current)
// // //   }, [index])

// // //   return (
// // //     <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen flex flex-col">
// // //       <main className="w-full flex-1">
// // //         {/* Carousel / Banner */}
// // //         <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
// // //           <div
// // //             className="absolute inset-0 flex transition-transform duration-700"
// // //             style={{ transform: `translateX(-${index * 100}%)` }}
// // //             onClick={next} /* click on banner to move next */
// // //           >
// // //             {slides.map((src, i) => (
// // //               <div key={i} className="w-full flex-shrink-0 relative">
// // //                 <img
// // //                   src={src}
// // //                   alt={`banner-${i + 1}`}
// // //                   className="w-full h-[420px] md:h-[520px] object-cover"
// // //                 />

// // //                 {/* title overlay (non-interactive) */}
// // //                 <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 pointer-events-none">
// // //                   <h1 className="mt-6 md:mt-12 text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
// // //                     Dr. Mungekar's Dental Clinic
// // //                   </h1>
// // //                   <p className="mt-3 md:mt-4 text-white text-lg md:text-xl drop-shadow-sm">
// // //                     Your Trusted Partner for a Healthy Smile
// // //                   </p>
// // //                 </div>

// // //                 {/* service boxes (interactive) */}
// // //                 <div className="absolute left-0 right-0 bottom-6 md:bottom-12 flex justify-center pointer-events-auto px-4">
// // //                   <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
// // //                     <Link
// // //                       to="/services"
// // //                       onClick={(e) => e.stopPropagation()}
// // //                       className="bg-teal-500/85 hover:bg-teal-500/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// // //                       aria-label="General Dentistry - view services"
// // //                     >
// // //                       <span className="text-sm tracking-wide">GENERAL</span>
// // //                       <span className="font-bold text-lg">DENTISTRY</span>
// // //                     </Link>

// // //                     <Link
// // //                       to="/services"
// // //                       onClick={(e) => e.stopPropagation()}
// // //                       className="bg-cyan-600/85 hover:bg-cyan-600/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// // //                       aria-label="Cosmetic Dentistry - view services"
// // //                     >
// // //                       <span className="text-sm tracking-wide">COSMETIC</span>
// // //                       <span className="font-bold text-lg">DENTISTRY</span>
// // //                     </Link>

// // //                     <Link
// // //                       to="/services"
// // //                       onClick={(e) => e.stopPropagation()}
// // //                       className="bg-emerald-500/85 hover:bg-emerald-500/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// // //                       aria-label="Emergency Dental Care - view services"
// // //                     >
// // //                       <span className="text-sm tracking-wide">EMERGENCY</span>
// // //                       <span className="font-bold text-lg">DENTAL CARE</span>
// // //                     </Link>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* left / right arrows */}
// // //           <button
// // //             aria-label="Previous slide"
// // //             onClick={(e) => { e.stopPropagation(); prev() }}
// // //             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
// // //           >
// // //             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
// // //               <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/>
// // //             </svg>
// // //           </button>

// // //           <button
// // //             aria-label="Next slide"
// // //             onClick={(e) => { e.stopPropagation(); next() }}
// // //             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
// // //           >
// // //             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
// // //               <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 11-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
// // //             </svg>
// // //           </button>

// // //           {/* indicators */}
// // //           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
// // //             {slides.map((_, i) => (
// // //               <button
// // //                 key={i}
// // //                 onClick={(e) => { e.stopPropagation(); goTo(i) }}
// // //                 className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'} shadow`}
// // //                 aria-label={`Go to slide ${i + 1}`}
// // //               />
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* rest of page content (services etc.) */}
// // //         <section className="container mx-auto px-4 py-12">
// // //           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
// // //             <div className="bg-white p-6 rounded-lg shadow-sm">
// // //               <h3 className="text-xl font-semibold text-amber-600">General Dentistry</h3>
// // //               <p className="mt-2 text-gray-600">Comprehensive check-ups and cleanings to maintain your oral health.</p>
// // //             </div>
// // //             <div className="bg-white p-6 rounded-lg shadow-sm">
// // //               <h3 className="text-xl font-semibold text-amber-600">Cosmetic Dentistry</h3>
// // //               <p className="mt-2 text-gray-600">Enhance your smile with whitening and aesthetic treatments.</p>
// // //             </div>
// // //             <div className="bg-white p-6 rounded-lg shadow-sm">
// // //               <h3 className="text-xl font-semibold text-amber-600">Orthodontics</h3>
// // //               <p className="mt-2 text-gray-600">Personalised solutions for straighter teeth and lasting confidence.</p>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Why Choose Us */}
// // //         <section className="container mx-auto px-4 pb-12">
// // //           <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-sm">
// // //             <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Dr. Mungekar's</h3>
// // //             <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
// // //               <li>
// // //                 <strong className="block text-amber-600">Experienced Team</strong>
// // //                 Compassionate dentists & staff with years of experience.
// // //               </li>
// // //               <li>
// // //                 <strong className="block text-amber-600">Modern Facility</strong>
// // //                 State-of-the-art equipment for safe and effective care.
// // //               </li>
// // //               <li>
// // //                 <strong className="block text-amber-600">Patient Focused</strong>
// // //                 Comfortable treatments tailored to each patient.
// // //               </li>
// // //             </ul>
// // //           </div>
// // //         </section>
// // //       </main>

// // //       {/* Footer */}
// // //       <footer className="bg-gray-800 text-white py-8">
// // //         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
// // //           <div>
// // //             <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
// // //             <p>Dr. Mungekar's Dental Clinic</p>
// // //             <p>123 Smile Avenue, Mumbai, India</p>
// // //             <p>Phone: +91 98765 43210</p>
// // //             <p>Email: info@mungekarsdental.com</p>
// // //           </div>
// // //           <div>
// // //             <h4 className="text-lg font-semibold mb-2">Clinic Hours</h4>
// // //             <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
// // //             <p>Sat: 10:00 AM - 5:00 PM</p>
// // //             <p>Sun: Closed</p>
// // //           </div>
// // //           <div>
// // //             <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
// // //             <p>
// // //               <a href="#" className="hover:underline">Instagram</a> |{' '}
// // //               <a href="#" className="hover:underline">Facebook</a> |{' '}
// // //               <a href="#" className="hover:underline">Twitter</a>
// // //             </p>
// // //           </div>
// // //         </div>

// // //         <div className="container mx-auto px-4 text-center mt-8 text-sm text-gray-400">
// // //           <p>&copy; 2025 Dr. Mungekar's Dental Clinic. All rights reserved.</p>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   )
// // // }


// // // ...existing code...
// // import React, { useState, useEffect, useRef } from 'react'
// // import { Link } from 'react-router-dom'
// // import banner1 from '../assets/homebanner1.png'
// // import banner2 from '../assets/homebanner2.png'
// // import banner3 from '../assets/homebanner3.png'
// // import drsiddhesh from '../assets/drsiddhesh.png'
// // import drsunita from '../assets/drsunita.png'

// // export default function HomePage() {
// //   const slides = [banner1, banner2, banner3]
// //   const [index, setIndex] = useState(0)
// //   const timeoutRef = useRef(null)

// //   const next = () => setIndex((i) => (i + 1) % slides.length)
// //   const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
// //   const goTo = (i) => setIndex(i)

// //   useEffect(() => {
// //     // autoplay every 5s
// //     timeoutRef.current = setTimeout(() => {
// //       setIndex((i) => (i + 1) % slides.length)
// //     }, 5000)
// //     return () => clearTimeout(timeoutRef.current)
// //   }, [index])

// //   return (
// //     <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen flex flex-col">
// //       <main className="w-full flex-1">
// //         {/* Carousel / Banner */}
// //         <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
// //           <div
// //             className="absolute inset-0 flex transition-transform duration-700"
// //             style={{ transform: `translateX(-${index * 100}%)` }}
// //             onClick={next} /* click on banner to move next */
// //           >
// //             {slides.map((src, i) => (
// //               <div key={i} className="w-full flex-shrink-0 relative">
// //                 <img
// //                   src={src}
// //                   alt={`banner-${i + 1}`}
// //                   className="w-full h-[420px] md:h-[520px] object-cover"
// //                 />

// //                 {/* title overlay (moved slightly down) */}
// //                 <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 pointer-events-none">
// //                   <h1 className="mt-6 md:mt-12 text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
// //                     Dr. Mungekar's Dental Clinic
// //                   </h1>
// //                   <p className="mt-3 md:mt-4 text-white text-lg md:text-xl drop-shadow-sm">
// //                     Your Trusted Partner for a Healthy Smile
// //                   </p>
// //                 </div>

// //                 {/* service boxes (interactive) */}
// //                 <div className="absolute left-0 right-0 bottom-6 md:bottom-12 flex justify-center pointer-events-auto px-4">
// //                   <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
// //                     <Link
// //                       to="/services"
// //                       onClick={(e) => e.stopPropagation()}
// //                       className="bg-teal-500/85 hover:bg-teal-500/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// //                       aria-label="General Dentistry - view services"
// //                     >
// //                       <span className="text-sm tracking-wide">GENERAL</span>
// //                       <span className="font-bold text-lg">DENTISTRY</span>
// //                     </Link>

// //                     <Link
// //                       to="/services"
// //                       onClick={(e) => e.stopPropagation()}
// //                       className="bg-cyan-600/85 hover:bg-cyan-600/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// //                       aria-label="Cosmetic Dentistry - view services"
// //                     >
// //                       <span className="text-sm tracking-wide">COSMETIC</span>
// //                       <span className="font-bold text-lg">DENTISTRY</span>
// //                     </Link>

// //                     <Link
// //                       to="/services"
// //                       onClick={(e) => e.stopPropagation()}
// //                       className="bg-emerald-500/85 hover:bg-emerald-500/95 text-white py-8 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// //                       aria-label="Emergency Dental Care - view services"
// //                     >
// //                       <span className="text-sm tracking-wide">EMERGENCY</span>
// //                       <span className="font-bold text-lg">DENTAL CARE</span>
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* left / right arrows */}
// //           <button
// //             aria-label="Previous slide"
// //             onClick={(e) => { e.stopPropagation(); prev() }}
// //             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
// //           >
// //             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/>
// //             </svg>
// //           </button>

// //           <button
// //             aria-label="Next slide"
// //             onClick={(e) => { e.stopPropagation(); next() }}
// //             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
// //           >
// //             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 11-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
// //             </svg>
// //           </button>

// //           {/* indicators */}
// //           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
// //             {slides.map((_, i) => (
// //               <button
// //                 key={i}
// //                 onClick={(e) => { e.stopPropagation(); goTo(i) }}
// //                 className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'} shadow`}
// //                 aria-label={`Go to slide ${i + 1}`}
// //               />
// //             ))}
// //           </div>
// //         </section>

// //         {/* ABOUT SECTION (below banner) */}
// //         <section id="about" className="container mx-auto px-4 py-16">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h2
// //               className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-400"
// //             >
// //               ABOUT US
// //             </h2>

// //             <div className="mx-auto mt-4 text-gray-600 leading-relaxed">
// //               <p className="mb-6">
// //                 I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click "Edit Text" or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I'm a great place for you to tell a story and let your users know a little more about you.
// //               </p>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
// //                 <div>
// //                   <p className="mb-4">
// //                     This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide.
// //                   </p>
// //                   <p>
// //                     Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="mb-4">
// //                     We offer modern dental care with a friendly team focused on your comfort and long-term oral health. Our facility uses state-of-the-art equipment to ensure safe, effective treatments.
// //                   </p>
// //                   <p>
// //                     Book an appointment to experience personalised care and a smile-first approach to dentistry.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>
     
// //         {/* OUR SERVICES */}
// //         <section id="services" className="py-16" style={{ backgroundColor: '#f1f0eaff' }}>
// //           <div className="container mx-auto px-4">
// //             <div className="max-w-4xl mx-auto text-center mb-8">
// //               <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-yellow-400" >
// //                 OUR SERVICES
// //               </h2>
// //               <div className="mx-auto w-3 h-3 bg-[#C5A049] mt-4 rounded-sm" />
// //             </div>

// //             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {[
// //                 { title: 'Routine Exams', desc: 'Comprehensive check-ups to maintain oral health.' },
// //                 { title: 'Dental Hygiene', desc: 'Professional cleaning & preventative care.' },
// //                 { title: 'Dental Fillings', desc: 'Durable, natural-looking restorations.' },
// //                 { title: 'Dentures & Veneers', desc: 'Cosmetic and restorative tooth replacements.' },
// //                 { title: 'Emergency Dentistry', desc: 'Prompt care for urgent dental issues.' },
// //                 { title: 'Teeth Whitening', desc: 'Safe whitening for a brighter smile.' },
// //               ].map((s, i) => (
// //                 <div
// //                   key={i}
// //                   className="p-8 rounded-md shadow-md flex flex-col justify-center"
// //                   style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} /* subtle translucent panels over cream */
// //                 >
// //                   <h3 className="text-lg font-semibold mb-2 text-yellow-400" >
// //                     {s.title}
// //                   </h3>
// //                   <p className="text-sm text-gray-700">{s.desc}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>
// //    {/* STATS BAR â€” yellow background (logo color) */}
// //         <section id="stats" className="py-8" style={{ backgroundColor: '#efbc46ff' }}>
// //           <div className="max-w-7xl mx-auto px-4">
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center text-white py-8">
// //               <div>
// //                 <div className="text-3xl md:text-5xl font-extrabold leading-none">15</div>
// //                 <div className="text-xs md:text-sm mt-1 opacity-90">Years of Experience</div>
// //               </div>

// //               <div>
// //                 <div className="text-3xl md:text-5xl font-extrabold leading-none">452</div>
// //                 <div className="text-xs md:text-sm mt-1 opacity-90">Smiling Clients</div>
// //               </div>

// //               <div>
// //                 <div className="text-3xl md:text-5xl font-extrabold leading-none">26</div>
// //                 <div className="text-xs md:text-sm mt-1 opacity-90">Master Certifications</div>
// //               </div>

// //               <div>
// //                 <div className="text-3xl md:text-5xl font-extrabold leading-none">12</div>
// //                 <div className="text-xs md:text-sm mt-1 opacity-90">Happy Staff</div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>


// //         {/* OUR DENTISTS â€” two images side-by-side with info below */}
// //         <section id="dentists" className="container mx-auto px-4 py-16">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#f0b326ff' }}>
// //               OUR DENTISTS
// //             </h2>
// //             <div className="mx-auto w-3 h-3 mt-3 rounded-sm" style={{ backgroundColor: '#f0b326ff' }} />
// //           </div>

// //           <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
// //             {/* Doctor 1 */}
// //             <div className="w-56 text-center">
// //               <img
// //                 src={drsiddhesh}
// //                 alt="Dr. Siddhesh"
// //                 className="w-56 h-56 object-cover rounded-md shadow-md mx-auto bg-gray-100"
// //               />
// //               <h4 className="mt-4 text-lg font-medium text-gray-800">Dr. Siddhesh Mungekar</h4>
// //               <button
// //                 className="mt-3 bg-[#C5A049] text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-95 transition"
// //                 onClick={() => (window.location.href = '/book')}
// //               >
// //                 Book Now
// //               </button>
// //             </div>

// //             {/* Doctor 2 */}
// //             <div className="w-56 text-center">
// //               <img
// //                 src={drsunita}
// //                 alt="Dr. Sunita"
// //                 className="w-56 h-56 object-cover rounded-md shadow-md mx-auto bg-gray-100"
// //               />
// //               <h4 className="mt-4 text-lg font-medium text-gray-800">Dr. Sunita Mungekar</h4>
// //               <button
// //                 className="mt-3 bg-[#C5A049] text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-95 transition"
// //                 onClick={() => (window.location.href = '/book')}
// //               >
// //                 Book Now
// //               </button>
// //             </div>
// //           </div>

// //           {/* Info paragraph below images */}
// //           <div className="max-w-3xl mx-auto text-center mt-10 text-gray-600">
// //             <p>
// //               Our dentists bring years of experience in general and cosmetic dentistry, combining modern techniques
// //               with a gentle, patient-first approach. They specialise in preventive care, aesthetic treatments and
// //               complex restorative procedures â€” dedicated to delivering comfortable, personalised treatment plans for every patient.
// //             </p>
// //           </div>
// //         </section>



// //         {/* HAPPY CLIENTS / TESTIMONIALS (cream background) */}
// //         <section id="testimonials" className="py-16" style={{ backgroundColor: '#F4F0E6' }}>
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#f0b326ff' }}>
// //               HAPPY CLIENTS
// //             </h2>
// //             <div className="mx-auto w-3 h-3 bg-[#0ea5a4] mt-3 rounded-sm" />
// //           </div>

// //           <div className="max-w-7xl mx-auto px-4 mt-10">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
// //               <div className="text-center px-6">
// //                 <div className="text-4xl text-teal-400 mb-4">â€œ</div>
// //                 <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
// //                   "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
// //                 </p>
// //                 <div className="mt-6 text-sm font-semibold text-gray-900">Danielle Hudson</div>
// //               </div>

// //               <div className="text-center px-6">
// //                 <div className="text-4xl text-teal-400 mb-4">â€œ</div>
// //                 <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
// //                   "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
// //                 </p>
// //                 <div className="mt-6 text-sm font-semibold text-gray-900">Philip Cruz</div>
// //               </div>

// //               <div className="text-center px-6">
// //                 <div className="text-4xl text-teal-400 mb-4">â€œ</div>
// //                 <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
// //                   "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
// //                 </p>
// //                 <div className="mt-6 text-sm font-semibold text-gray-900">Meghan Charles</div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

      
// //         {/* CONTACT US â€” below testimonials, shows address + embedded map */}
      
// //         <section id="contact" className="py-16 bg-white">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h2
// //               className="text-3xl md:text-4xl font-extrabold mb-4"
// //               style={{ color: '#f0b326ff' }}
// //             >
// //               CONTACT US
// //             </h2>
// //             <div className="mx-auto w-3 h-3" style={{ backgroundColor: '#0ea5a4' }} />
// //           </div>

// //           <div className="max-w-6xl mx-auto px-4 mt-10">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
// //               {/* Left column: Address */}
// //               <div className="md:col-span-1 text-center md:text-right">
// //                 <h4 className="text-lg font-semibold mb-2">Our Address</h4>
// //                 <p className="text-sm text-gray-700 leading-relaxed">
// //                   No 26, Nilje Gaon, Meadows Green,<br />
// //                   Near Casa Rio Main Rd, Dombivli East,<br />
// //                   Mumbai, Nilje Gaon, Maharashtra 421204
// //                 </p>
// //               </div>

// //               {/* Vertical divider on md+ */}
// //               <div className="hidden md:flex items-center justify-center">
// //                 <div className="h-28 border-l border-gray-200" />
// //               </div>

// //               {/* Right column: Hours + Phone */}
// //               <div className="md:col-span-1 text-center md:text-left">
// //                 <h4 className="text-lg font-semibold mb-2">Opening Hours</h4>
// //                 <p className="text-sm text-gray-700">
// //                   Monday â€“ Friday: 9AM â€“ 7PM<br />
// //                   Saturday: 9AM â€“ 2PM
// //                 </p>

// //                 <div className="mt-6">
// //                   <div
// //                     className="text-3xl md:text-4xl font-semibold"
// //                     style={{ color: '#f0b326ff' }}
// //                   >
// //                     8928483233
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Map centered below */}
// //             <div className="mt-10 flex justify-center">
// //               <div className="w-full md:w-3/4 h-64 rounded overflow-hidden shadow">
// //                 <iframe
// //                   title="clinic-map"
// //                   width="100%"
// //                   height="100%"
// //                   frameBorder="0"
// //                   style={{ border: 0 }}
// //                   src={
// //                     'https://maps.google.com/maps?q=' +
// //                     encodeURIComponent(
// //                       'No 26, Nilje Gaon, Meadows Green, Near Casa Rio Main Rd, Dombivli East, Mumbai, Maharashtra 421204'
// //                     ) +
// //                     '&z=15&output=embed'
// //                   }
// //                   allowFullScreen
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </section>

      
// //       </main>

// //       {/* Footer */}
// //       <footer className="bg-gray-800 text-white py-8">
// //         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
// //           <div>
// //             <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
// //             <p>Dr. Mungekar's Dental Clinic</p>
// //             <p>123 Smile Avenue, Mumbai, India</p>
// //             <p>Phone: +91 98765 43210</p>
// //             <p>Email: info@mungekarsdental.com</p>
// //           </div>
// //           <div>
// //             <h4 className="text-lg font-semibold mb-2">Clinic Hours</h4>
// //             <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
// //             <p>Sat: 10:00 AM - 5:00 PM</p>
// //             <p>Sun: Closed</p>
// //           </div>
// //           <div>
// //             <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
// //             <p>
// //               <a href="#" className="hover:underline">Instagram</a> |{' '}
// //               <a href="#" className="hover:underline">Facebook</a> |{' '}
// //               <a href="#" className="hover:underline">Twitter</a>
// //             </p>
// //           </div>
// //         </div>

// //         <div className="container mx-auto px-4 text-center mt-8 text-sm text-gray-400">
// //           <p>&copy; 2025 Dr. Mungekar's Dental Clinic. All rights reserved.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   )
// // }

// // import React, { useState, useEffect, useRef } from 'react'
// // import { Link } from 'react-router-dom'
// // import banner1 from '../assets/homebanner1.png'
// // import banner2 from '../assets/homebanner2.png'
// // import banner3 from '../assets/homebanner3.png'
// // import drsiddhesh from '../assets/drsiddhesh.png'
// // import drsunita from '../assets/drsunita.png'
// // import useUnsplashImages from "../hooks/useUnsplashImages";


// // export default function HomePage() {
// //   const slides = [banner1, banner2, banner3]
// //   const [index, setIndex] = useState(0)
// //   const timeoutRef = useRef(null)

// //   const next = () => setIndex((i) => (i + 1) % slides.length)
// //   const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
// //   const goTo = (i) => setIndex(i)

// //   useEffect(() => {
// //     timeoutRef.current = setTimeout(() => {
// //       setIndex((i) => (i + 1) % slides.length)
// //     }, 5000)
// //     return () => clearTimeout(timeoutRef.current)
// //   }, [index])

// //   const { images, loading, error } = useUnsplashImages(
// //   "modern dental clinic interior",
// //   4
// // );


// //   return (
// //     <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen flex flex-col">
// //       <main className="w-full flex-1">
// //         {/* Carousel / Banner */}
// //         <section className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
// //           <div
// //             className="absolute inset-0 flex transition-transform duration-700"
// //             style={{ transform: `translateX(-${index * 100}%)` }}
// //             onClick={next}
// //           >
// //             {slides.map((src, i) => (
// //               <div key={i} className="w-full flex-shrink-0 relative">
// //                 <img
// //                   src={src}
// //                   alt={`banner-${i + 1}`}
// //                   className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover"
// //                 />

// //                 {/* title overlay (non-interactive) */}
// //                 <div className="absolute inset-0 flex flex-col justify-center items-start p-6 sm:p-12 pointer-events-none">
// //                   <h1 className="mt-6 sm:mt-12 text-2xl sm:text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
// //                     Dr. Mungekar's Dental Clinic
// //                   </h1>
// //                   <p className="mt-3 text-white text-base sm:text-lg md:text-xl drop-shadow-sm">
// //                     Your Trusted Partner for a Healthy Smile
// //                   </p>
// //                 </div>

// //                 {/* service boxes overlay for sm+ only (hidden on smaller screens) */}
// //                 <div className="absolute left-0 right-0 bottom-4 md:bottom-12 flex justify-center pointer-events-auto px-4 hidden sm:flex">
// //                   <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
// //                     <Link
// //                       to="/services"
// //                       onClick={(e) => e.stopPropagation()}
// //                       className="bg-teal-500/85 hover:bg-teal-500/95 text-white py-7 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// //                       aria-label="General Dentistry - view services"
// //                     >
// //                       <span className="text-sm tracking-wide">GENERAL</span>
// //                       <span className="font-bold text-lg">DENTISTRY</span>
// //                     </Link>

// //                     <Link
// //                       to="/services"
// //                       onClick={(e) => e.stopPropagation()}
// //                       className="bg-cyan-600/85 hover:bg-cyan-600/95 text-white py-7 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// //                       aria-label="Cosmetic Dentistry - view services"
// //                     >
// //                       <span className="text-sm tracking-wide">COSMETIC</span>
// //                       <span className="font-bold text-lg">DENTISTRY</span>
// //                     </Link>

// //                     <Link
// //                       to="/services"
// //                       onClick={(e) => e.stopPropagation()}
// //                       className="bg-emerald-500/85 hover:bg-emerald-500/95 text-white py-7 px-6 text-center rounded-md shadow-md flex flex-col justify-center items-center"
// //                       aria-label="Emergency Dental Care - view services"
// //                     >
// //                       <span className="text-sm tracking-wide">EMERGENCY</span>
// //                       <span className="font-bold text-lg">DENTAL CARE</span>
// //                     </Link>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* left / right arrows */}
// //           <button
// //             aria-label="Previous slide"
// //             onClick={(e) => { e.stopPropagation(); prev() }}
// //             className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
// //           >
// //             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/>
// //             </svg>
// //           </button>

// //           <button
// //             aria-label="Next slide"
// //             onClick={(e) => { e.stopPropagation(); next() }}
// //             className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 text-gray-700 rounded-full p-2 shadow hover:scale-105 transition"
// //           >
// //             <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 11-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
// //             </svg>
// //           </button>

// //           {/* indicators */}
// //           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
// //             {slides.map((_, i) => (
// //               <button
// //                 key={i}
// //                 onClick={(e) => { e.stopPropagation(); goTo(i) }}
// //                 className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'} shadow`}
// //                 aria-label={`Go to slide ${i + 1}`}
// //               />
// //             ))}
// //           </div>
// //         </section>

// //         {/* Mobile: Service boxes shown below the banner (stacked) */}
// //         <section className="sm:hidden px-4 mt-6">
// //           <div className="space-y-4">
// //             <Link
// //               to="/services"
// //               className="block bg-teal-500/90 text-white py-6 px-4 rounded-md shadow-md text-center"
// //               aria-label="General Dentistry - view services"
// //             >
// //               <div className="text-sm tracking-wide">GENERAL</div>
// //               <div className="font-bold text-lg">DENTISTRY</div>
// //             </Link>

// //             <Link
// //               to="/services"
// //               className="block bg-cyan-600/90 text-white py-6 px-4 rounded-md shadow-md text-center"
// //               aria-label="Cosmetic Dentistry - view services"
// //             >
// //               <div className="text-sm tracking-wide">COSMETIC</div>
// //               <div className="font-bold text-lg">DENTISTRY</div>
// //             </Link>

// //             <Link
// //               to="/services"
// //               className="block bg-emerald-500/90 text-white py-6 px-4 rounded-md shadow-md text-center"
// //               aria-label="Emergency Dental Care - view services"
// //             >
// //               <div className="text-sm tracking-wide">EMERGENCY</div>
// //               <div className="font-bold text-lg">DENTAL CARE</div>
// //             </Link>
// //           </div>
// //         </section>

// //         {/* ABOUT SECTION (below banner) */}
// //         <section id="about" className="container mx-auto px-4 py-16">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-yellow-400">
// //               ABOUT US
// //             </h2>

// //             <div className="mx-auto mt-4 text-gray-600 leading-relaxed">
// //               <p className="mb-6">
// //                 I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click "Edit Text" or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I'm a great place for you to tell a story and let your users know a little more about you.
// //               </p>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
// //                 <div>
// //                   <p className="mb-4">
// //                     This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide.
// //                   </p>
// //                   <p>
// //                     Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.
// //                   </p>
// //                 </div>

// //                 <div>
// //                   <p className="mb-4">
// //                     We offer modern dental care with a friendly team focused on your comfort and long-term oral health. Our facility uses state-of-the-art equipment to ensure safe, effective treatments.
// //                   </p>
// //                   <p>
// //                     Book an appointment to experience personalised care and a smile-first approach to dentistry.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* rest of page unchanged... */}
// //         {/* (services, stats, dentists, testimonials, contact, footer) */}
// //         <section id="services" className="py-16" style={{ backgroundColor: '#f1f0eaff' }}>
// //           <div className="container mx-auto px-4">
// //             <div className="max-w-4xl mx-auto text-center mb-8">
// //               <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-yellow-400" >
// //                 OUR SERVICES
// //               </h2>
// //               <div className="mx-auto w-3 h-3 bg-[#C5A049] mt-4 rounded-sm" />
// //             </div>

// //             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {[
// //                 { title: 'Routine Exams', desc: 'Comprehensive check-ups to maintain oral health.' },
// //                 { title: 'Dental Hygiene', desc: 'Professional cleaning & preventative care.' },
// //                 { title: 'Dental Fillings', desc: 'Durable, natural-looking restorations.' },
// //                 { title: 'Dentures & Veneers', desc: 'Cosmetic and restorative tooth replacements.' },
// //                 { title: 'Emergency Dentistry', desc: 'Prompt care for urgent dental issues.' },
// //                 { title: 'Teeth Whitening', desc: 'Safe whitening for a brighter smile.' },
// //               ].map((s, i) => (
// //                 <div
// //                   key={i}
// //                   className="p-8 rounded-md shadow-md flex flex-col justify-center"
// //                   style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
// //                 >
// //                   <h3 className="text-lg font-semibold mb-2 text-yellow-400" >
// //                     {s.title}
// //                   </h3>
// //                   <p className="text-sm text-gray-700">{s.desc}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* STATS, DENTISTS, TESTIMONIALS, CONTACT, FOOTER (unchanged) */}
// //         <section id="stats" className="py-8" style={{ backgroundColor: '#efbc46ff' }}>
// //           <div className="max-w-7xl mx-auto px-4">
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center text-white py-8">
// //               <div>
// //                 <div className="text-3xl md:text-5xl font-extrabold leading-none">15</div>
// //                 <div className="text-xs md:text-sm mt-1 opacity-90">Years of Experience</div>
// //               </div>

// //               <div>
// //                 <div className="text-3xl md:text-5xl font-extrabold leading-none">452</div>
// //                 <div className="text-xs md:text-sm mt-1 opacity-90">Smiling Clients</div>
// //               </div>

// //               <div>
// //                 <div className="text-3xl md:text-5xl font-extrabold leading-none">26</div>
// //                 <div className="text-xs md:text-sm mt-1 opacity-90">Master Certifications</div>
// //               </div>

// //               <div>
// //                 <div className="text-3xl md:text-5xl font-extrabold leading-none">12</div>
// //                 <div className="text-xs md:text-sm mt-1 opacity-90">Happy Staff</div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         <section id="dentists" className="container mx-auto px-4 py-16">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#f0b326ff' }}>
// //               OUR DENTISTS
// //             </h2>
// //             <div className="mx-auto w-3 h-3 mt-3 rounded-sm" style={{ backgroundColor: '#f0b326ff' }} />
// //           </div>

// //           <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
// //             <div className="w-56 text-center">
// //               <img
// //                 src={drsiddhesh}
// //                 alt="Dr. Siddhesh"
// //                 className="w-56 h-56 object-cover rounded-md shadow-md mx-auto bg-gray-100"
// //               />
// //               <h4 className="mt-4 text-lg font-medium text-gray-800">Dr. Siddhesh Mungekar</h4>
// //               <button
// //                 className="mt-3 bg-[#C5A049] text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-95 transition"
// //                 onClick={() => (window.location.href = '/book')}
// //               >
// //                 Book Now
// //               </button>
// //             </div>

// //             <div className="w-56 text-center">
// //               <img
// //                 src={drsunita}
// //                 alt="Dr. Sunita"
// //                 className="w-56 h-56 object-cover rounded-md shadow-md mx-auto bg-gray-100"
// //               />
// //               <h4 className="mt-4 text-lg font-medium text-gray-800">Dr. Sunita Mungekar</h4>
// //               <button
// //                 className="mt-3 bg-[#C5A049] text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-95 transition"
// //                 onClick={() => (window.location.href = '/book')}
// //               >
// //                 Book Now
// //               </button>
// //             </div>
// //           </div>

// //           <div className="max-w-3xl mx-auto text-center mt-10 text-gray-600">
// //             <p>
// //               Our dentists bring years of experience in general and cosmetic dentistry, combining modern techniques
// //               with a gentle, patient-first approach. They specialise in preventive care, aesthetic treatments and
// //               complex restorative procedures â€” dedicated to delivering comfortable, personalised treatment plans for every patient.
// //             </p>
// //           </div>
// //         </section>

// //         <section id="testimonials" className="py-16" style={{ backgroundColor: '#F4F0E6' }}>
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#f0b326ff' }}>
// //               HAPPY CLIENTS
// //             </h2>
// //             <div className="mx-auto w-3 h-3 bg-[#0ea5a4] mt-3 rounded-sm" />
// //           </div>

// //           <div className="max-w-7xl mx-auto px-4 mt-10">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
// //               <div className="text-center px-6">
// //                 <div className="text-4xl text-teal-400 mb-4">â€œ</div>
// //                 <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
// //                   "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
// //                 </p>
// //                 <div className="mt-6 text-sm font-semibold text-gray-900">Danielle Hudson</div>
// //               </div>

// //               <div className="text-center px-6">
// //                 <div className="text-4xl text-teal-400 mb-4">â€œ</div>
// //                 <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
// //                   "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
// //                 </p>
// //                 <div className="mt-6 text-sm font-semibold text-gray-900">Philip Cruz</div>
// //               </div>

// //               <div className="text-center px-6">
// //                 <div className="text-4xl text-teal-400 mb-4">â€œ</div>
// //                 <p className="text-sm md:text-base italic text-gray-700 leading-relaxed">
// //                   "I'm a testimonial. Click to edit me and add text that says something nice about you and your services."
// //                 </p>
// //                 <div className="mt-6 text-sm font-semibold text-gray-900">Meghan Charles</div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         <section id="contact" className="py-16 bg-white">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: '#f0b326ff' }}>
// //               CONTACT US
// //             </h2>
// //             <div className="mx-auto w-3 h-3" style={{ backgroundColor: '#0ea5a4' }} />
// //           </div>

// //           <div className="max-w-6xl mx-auto px-4 mt-10">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
// //               <div className="md:col-span-1 text-center md:text-right">
// //                 <h4 className="text-lg font-semibold mb-2">Our Address</h4>
// //                 <p className="text-sm text-gray-700 leading-relaxed">
// //                   No 26, Nilje Gaon, Meadows Green,<br />
// //                   Near Casa Rio Main Rd, Dombivli East,<br />
// //                   Mumbai, Nilje Gaon, Maharashtra 421204
// //                 </p>
// //               </div>

// //               <div className="hidden md:flex items-center justify-center">
// //                 <div className="h-28 border-l border-gray-200" />
// //               </div>

// //               <div className="md:col-span-1 text-center md:text-left">
// //                 <h4 className="text-lg font-semibold mb-2">Opening Hours</h4>
// //                 <p className="text-sm text-gray-700">
// //                   Monday â€“ Friday: 9AM â€“ 7PM<br />
// //                   Saturday: 9AM â€“ 2PM
// //                 </p>

// //                 <div className="mt-6">
// //                   <div className="text-3xl md:text-4xl font-semibold" style={{ color: '#f0b326ff' }}>
// //                     8928483233
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-10 flex justify-center">
// //               <div className="w-full md:w-3/4 h-64 rounded overflow-hidden shadow">
// //                 <iframe
// //                   title="clinic-map"
// //                   width="100%"
// //                   height="100%"
// //                   frameBorder="0"
// //                   style={{ border: 0 }}
// //                   src={
// //                     'https://maps.google.com/maps?q=' +
// //                     encodeURIComponent(
// //                       'No 26, Nilje Gaon, Meadows Green, Near Casa Rio Main Rd, Dombivli East, Mumbai, Maharashtra 421204'
// //                     ) +
// //                     '&z=15&output=embed'
// //                   }
// //                   allowFullScreen
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       </main>

    

        
// //     </div>
// //   )
// // }

// import React from "react";
// import { Link } from "react-router-dom";
// import PageWrapper from "./PageWrapper";
// import heroVideo from "../assets/hero section.mp4";


// /* Reusable max-width container (prevents zoom stretching) */
// function Container({ children, className = "" }) {
//   return (
//     <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
//       {children}
//     </div>
//   );
// }

// export default function HomePage() {
//   return (
//     <PageWrapper>
//     <div className="bg-[var(--bg-main)] min-h-screen flex flex-col">
//       <main className="flex-1">

//         {/* ================= HERO / BANNER ================= */}
//         <section className="w-full bg-[var(--bg-section)]">
//           <div className="relative h-[340px] sm:h-[420px] md:h-[520px] overflow-hidden">
//             <video
//               className="absolute inset-0 w-full h-full object-cover"
//               src={heroVideo}
//               autoPlay
//               muted
//               loop
//               playsInline
//               preload="metadata"
//             />

//             {/* dark overlay */}
//             <div className="absolute inset-0 bg-black/45" />

//             {/* hero content */}
//             <Container className="relative z-10 h-full flex flex-col justify-center">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white max-w-2xl">
//                 Dr. Mungekar's Dental Clinic
//               </h1>
//               <p className="mt-4 text-white text-base sm:text-lg max-w-xl">
//                 Modern dentistry with comfort, care, and advanced technology.
//               </p>

//               <div className="mt-6 flex flex-wrap gap-4">
//                 <Link
//                   to="/book"
//                   className="bg-[var(--primary)] text-white px-6 py-3 rounded-md font-semibold hover:bg-[var(--primary-dark)] transition"
//                 >
//                   Book Appointment
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
//                 >
//                   Contact Us
//                 </Link>
//               </div>
//             </Container>
//           </div>
//         </section>

//         {/* ================= ABOUT ================= */}
//         <section className="py-16 bg-white">
//           <Container>
//             <div className="max-w-4xl mx-auto text-center">
//               <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)]">
//                 ABOUT US
//               </h2>

//               <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
//                 We provide personalised dental care focused on comfort, hygiene,
//                 and long-term oral health. Our clinic combines modern technology
//                 with a friendly, patient-first approach.
//               </p>
//             </div>
//           </Container>
//         </section>

//         {/* ================= SERVICES ================= */}
//         <section className="py-16 bg-[var(--bg-section)]">
//           <Container>
//             <div className="text-center mb-10">
//               <h2 className="text-4xl font-extrabold text-[var(--primary)]">
//                 OUR SERVICES
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "Routine Exams",
//                 "Dental Hygiene",
//                 "Dental Fillings",
//                 "Cosmetic Dentistry",
//                 "Emergency Care",
//                 "Teeth Whitening",
//               ].map((service, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition"
//                 >
//                   <h3 className="font-semibold text-lg text-[var(--primary)]">
//                     {service}
//                   </h3>
//                   <p className="mt-3 text-sm text-[var(--text-secondary)]">
//                     High-quality treatment using modern techniques and equipment.
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </Container>
//         </section>

//         {/* ================= STATS ================= */}
//         <section className="bg-[var(--primary)] py-12">
//           <Container>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
//               {[
//                 ["15+", "Years Experience"],
//                 ["450+", "Happy Patients"],
//                 ["26", "Certifications"],
//                 ["12", "Expert Staff"],
//               ].map(([num, label], i) => (
//                 <div key={i}>
//                   <div className="text-4xl font-extrabold">{num}</div>
//                   <div className="mt-2 text-sm opacity-90">{label}</div>
//                 </div>
//               ))}
//             </div>
//           </Container>
//         </section>

//         {/* ================= CONTACT CTA ================= */}
//         <section className="py-16 bg-white">
//           <Container>
//             <div className="text-center max-w-3xl mx-auto">
//               <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)]">
//                 BOOK YOUR VISIT
//               </h2>
//               <p className="mt-4 text-[var(--text-secondary)]">
//                 Schedule an appointment today and take the first step towards a
//                 healthier smile.
//               </p>

//               <Link
//                 to="/book"
//                 className="inline-block mt-8 bg-[var(--primary)] text-white px-8 py-3 rounded-md font-semibold hover:bg-[var(--primary-dark)] transition"
//               >
//                 Book Appointment
//               </Link>
//             </div>
//           </Container>
//         </section>
//       </main>
//     </div>
//     </PageWrapper>
//   );
// }



import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import heroVideo from "../../assets/hero section.mp4";
import useUnsplashImages from "../../hooks/useUnsplashImages";
import Aboutcard from "./Aboutcard";
import Dentistcard from "./Dentistcard";
import Testimonials from "./Testimonials";
import Servicecard from "./Servicecard";
import Contactcard from "./Contactcard";



function Container({ children, className = "" }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <PageWrapper>
      <main className="flex-1">

        {/* ================= HERO ================= */}
        <section className="relative w-full">
          <div className="relative h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden">

            <video
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/hero-poster.jpg"
            />

            <div className="absolute inset-0 bg-black/45" />

            <Container className="relative z-10 h-full flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-2xl">
                Dr. Mungekar&apos;s Dental Clinic
              </h1>

              <p className="mt-4 text-white/90 text-lg max-w-xl">
                Modern dentistry with comfort, care, and advanced technology.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/book"
                  className="bg-[var(--primary)] text-white px-6 py-3 rounded-md font-semibold hover:bg-[var(--primary-dark)] transition"
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
            </Container>
          </div>
        </section>
        <Aboutcard/>
        <Dentistcard/>
        <Testimonials/>
        <Servicecard/>
        <Contactcard/>

        

      </main>
    </PageWrapper>
  );
}
