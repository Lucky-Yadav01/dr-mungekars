
// // // import React from 'react'
// // // import { NavLink } from 'react-router-dom'

// // // // update this path if your logo file has a different name/extension
// // // const logo = new URL('../assets/logo.png', import.meta.url).href

// // // export default function Navbar() {
// // //   const linkClass = ({ isActive }) =>
// // //     `text-base px-5 py-2 inline-block hover:text-blue-600 ${isActive ? 'text-teal-400 font-semibold relative' : 'text-gray-600'}`

// // //   return (
// // //     <header className="w-full bg-white font-sans">
// // //       {/* top bar with Call Now left, brand center (clickable), Staff Login right */}
// // //       <div className="flex items-center justify-between px-7 py-6"> {/* increased vertical padding */}
// // //         {/* left: call now */}
// // //         <div className="text-sm text-blue-600">
// // //           Call Now: <a href="tel:123-456-7890" className="underline">123-456-7890</a>
// // //         </div>

// // //         {/* center: brand (clickable) - larger */}
// // //         <NavLink to="/" className="flex items-center gap-4">
// // //           <img src={logo} alt="Dr. Mungekar logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
// // //           <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 uppercase tracking-wider">DR. MUNGEKAR'S</span>
// // //         </NavLink>

// // //         {/* right: staff login */}
// // //         <div className="flex items-center">
// // //           <NavLink
// // //             to="/login"
// // //             className="ml-4 bg-amber-500 text-white font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition text-base"
// // //           >
// // //             Staff Login
// // //           </NavLink>
// // //         </div>
// // //       </div>

// // //       {/* thin divider */}
// // //       <div className="h-1 bg-gray-100" />

// // //       {/* nav row centered */}
// // //       <nav className="bg-gray-100 border-t border-b border-gray-200">
// // //         <ul className="max-w-7xl mx-auto flex justify-center gap-6 px-7 py-2 items-center">
// // //           <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
// // //           <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
// // //           <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>
// // //           <li><NavLink to="/team" className={linkClass}>Our Team</NavLink></li>
// // //           <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
// // //           <li><NavLink to="/book" className={linkClass}>Book Online</NavLink></li>
// // //           <li><NavLink to="/blog" className={linkClass}>Blog</NavLink></li>
// // //         </ul>
// // //       </nav>
// // //     </header>
// // //   )
// // // }


// // // ...existing code...
// // import React, { useState } from 'react'
// // import { NavLink } from 'react-router-dom'

// // // update this path if your logo file has a different name/extension
// // const logo = new URL('../assets/logo.png', import.meta.url).href

// // export default function Navbar() {
// //   const [open, setOpen] = useState(false)

// //   const linkClass = ({ isActive }) =>
// //     `block px-4 py-2 rounded transition-colors duration-150 ${
// //       isActive
// //         ? 'text-teal-400 font-semibold'
// //         : 'text-gray-600 hover:text-blue-600'
// //     }`

// //   return (
// //     <header className="w-full bg-white font-sans shadow-sm">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6">
// //         <div className="flex items-center justify-between py-4 md:py-5">
// //           {/* left: call now (hidden on very small screens) */}
// //           <div className="hidden sm:block text-sm text-blue-600">
// //             Call Now: <a href="tel:123-456-7890" className="underline">123-456-7890</a>
// //           </div>

// //           {/* center: logo & brand */}
// //           <NavLink to="/" className="flex items-center gap-3">
// //             <img src={logo} alt="Dr. Mungekar logo" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain" />
// //             <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-yellow-400 uppercase tracking-wide">DR. MUNGEKAR'S</span>
// //           </NavLink>

// //           {/* right: actions + mobile menu button */}
// //           <div className="flex items-center gap-3">
// //             <NavLink
// //               to="/login"
// //               className="hidden sm:inline-block bg-amber-500 text-white font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition text-sm"
// //             >
// //               Staff Login
// //             </NavLink>

// //             <button
// //               onClick={() => setOpen((v) => !v)}
// //               aria-expanded={open}
// //               aria-label="Toggle navigation"
// //               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:hidden"
// //             >
// //               {/* hamburger / close icons */}
// //               {open ? (
// //                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                   <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               ) : (
// //                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
// //                   <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
// //                 </svg>
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* thin divider */}
// //       <div className="h-px bg-gray-100" />

// //       {/* desktop nav */}
// //       <nav className="hidden md:block bg-gray-50 border-t border-b border-gray-200">
// //         <ul className="max-w-7xl mx-auto flex justify-center gap-6 px-4 py-2 items-center">
// //           <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
// //           <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
// //           <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>
// //           <li><NavLink to="/team" className={linkClass}>Our Team</NavLink></li>
// //           <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
// //           <li><NavLink to="/book" className={linkClass}>Book Online</NavLink></li>
// //           <li><NavLink to="/blog" className={linkClass}>Blog</NavLink></li>
// //         </ul>
// //       </nav>

// //       {/* mobile nav panel */}
// //       <div className={`md:hidden bg-white border-t border-gray-200 ${open ? 'block' : 'hidden'}`}>
// //         <div className="px-4 pt-4 pb-6 space-y-1">
// //           <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
// //           <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About Us</NavLink>
// //           <NavLink to="/services" className={linkClass} onClick={() => setOpen(false)}>Services</NavLink>
// //           <NavLink to="/team" className={linkClass} onClick={() => setOpen(false)}>Our Team</NavLink>
// //           <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact Us</NavLink>
// //           <NavLink to="/book" className={linkClass} onClick={() => setOpen(false)}>Book Online</NavLink>
// //           <NavLink to="/blog" className={linkClass} onClick={() => setOpen(false)}>Blog</NavLink>

// //           <div className="pt-3 border-t border-gray-100">
// //             <NavLink
// //               to="/login"
// //               className="block text-center bg-amber-500 text-white font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition"
// //               onClick={() => setOpen(false)}
// //             >
// //               Staff Login
// //             </NavLink>

// //             <div className="mt-3 text-center text-sm text-blue-600">
// //               Call Now: <a href="tel:123-456-7890" className="underline">123-456-7890</a>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   )
// // }

// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// const logo = new URL("../assets/logo.png", import.meta.url).href;

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
  
//   const isHome = location.pathname === "/";


//   // detect scroll
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // close mobile menu on route change
//   useEffect(() => {
//     setOpen(false);
//   }, [location.pathname]);

//   const linkBase =
//     "text-sm font-medium transition-colors duration-200";

//   const linkStyle = ({ isActive }) =>
//     `${linkBase} ${
//       isActive
//         ? "text-amber-500"
//         : scrolled
//         ? "text-gray-700 hover:text-amber-500"
//         : "text-white hover:text-amber-300"
//     }`;

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//   !isHome || scrolled
//     ? "bg-white shadow-sm"
//     : "bg-transparent"
//     }`}

//     >
//       {/* MAIN BAR */}
//       <div className="max-w-[1580px] mx-auto px-4 sm:px-6">
//         <div className="h-[72px] flex items-center justify-between">

//           {/* LOGO */}
//           <NavLink to="/" className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt="Dr. Mungekar's Dental Clinic"
//               className="w-10 h-10 object-contain"
//             />
//             <span
//               className={`text-lg font-extrabold tracking-wide ${
//                 scrolled ? "text-amber-500" : "text-white"
//               }`}
//             >
//               DR. MUNGEKAR&apos;S
//             </span>
//           </NavLink>

//           {/* DESKTOP NAV */}
//           <nav className="hidden lg:flex items-center gap-8">
//             <NavLink to="/" end className={linkStyle}>Home</NavLink>
//             <NavLink to="/about" className={linkStyle}>About Us</NavLink>
//             <NavLink to="/services" className={linkStyle}>Services</NavLink>
//             <NavLink to="/team" className={linkStyle}>Our Team</NavLink>
//             <NavLink to="/contact" className={linkStyle}>Contact Us</NavLink>
//             <NavLink to="/book" className={linkStyle}>Book Online</NavLink>
//             <NavLink to="/blog" className={linkStyle}>Blog</NavLink>
//           </nav>

//           {/* RIGHT ACTIONS */}
//           <div className="hidden lg:flex items-center gap-4">
//             <a
//               href="tel:1234567890"
//               className={`text-sm ${
//                 !isHome || scrolled ? "text-gray-700" : "text-white"

//               }`}
//             >
//               (123) 456-7890
//             </a>

//             <NavLink
//               to="/login"
//               className="bg-amber-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-600 transition"
//             >
//               Staff Login
//             </NavLink>
//           </div>

//           {/* MOBILE TOGGLE */}
//           <button
//             onClick={() => setOpen(!open)}
//             className={`lg:hidden p-2 ${
//               scrolled ? "text-gray-800" : "text-white"
//             }`}
//             aria-label="Toggle menu"
//           >
//             {open ? (
//               <svg width="24" height="24" viewBox="0 0 24 24">
//                 <path
//                   d="M6 18L18 6M6 6l12 12"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             ) : (
//               <svg width="24" height="24" viewBox="0 0 24 24">
//                 <path
//                   d="M4 6h16M4 12h16M4 18h16"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       <div
//         className={`lg:hidden transition-all duration-300 ${
//           open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//         } overflow-hidden bg-white`}
//       >
//         <div className="px-4 py-6 space-y-4">
//           <NavLink to="/" end className="block text-gray-700">Home</NavLink>
//           <NavLink to="/about" className="block text-gray-700">About Us</NavLink>
//           <NavLink to="/services" className="block text-gray-700">Services</NavLink>
//           <NavLink to="/team" className="block text-gray-700">Our Team</NavLink>
//           <NavLink to="/contact" className="block text-gray-700">Contact Us</NavLink>
//           <NavLink to="/book" className="block text-gray-700">Book Online</NavLink>
//           <NavLink to="/blog" className="block text-gray-700">Blog</NavLink>

//           <div className="pt-4 border-t">
//             <NavLink
//               to="/login"
//               className="block text-center bg-amber-500 text-white py-2 rounded-full font-semibold"
//             >
//               Staff Login
//             </NavLink>

//             <div className="mt-3 text-center text-sm text-gray-600">
//               Call Now: <a href="tel:1234567890" className="underline">(123) 456-7890</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkStyle = ({ isActive }) =>
  `relative text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
      isActive
        ? "text-amber-500 after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-amber-500"
        : !isHome || scrolled
        ? "text-gray-700 hover:text-amber-500"
        : "text-white hover:text-amber-300"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        !isHome || scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      {/* MAIN BAR */}
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6">
        <div className="h-[72px] grid grid-cols-3 items-center">

          {/* LEFT: LOGO */}
          <div className="flex justify-start">
            <NavLink to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Dr. Mungekar's Dental Clinic"
                className="w-16 h-16 object-contain"
              />
              <span
                className={`text-lg font-extrabold tracking-wide ${
                  !isHome || scrolled ? "text-amber-500" : "text-white"
                }`}
              >
                DR. MUNGEKAR&apos;S
              </span>
            </NavLink>
          </div>

          {/* CENTER: NAV LINKS */}
          <nav className="hidden lg:flex justify-center gap-8">
            <NavLink to="/" end className={linkStyle}>Home</NavLink>
            <NavLink to="/about" className={linkStyle}>About Us</NavLink>
            <NavLink to="/services" className={linkStyle}>Services</NavLink>
            <NavLink to="/team" className={linkStyle}>Our Team</NavLink>
            <NavLink to="/contact" className={linkStyle}>Contact Us</NavLink>
            <NavLink to="/book" className={linkStyle}>Book Online</NavLink>
            <NavLink to="/blog" className={linkStyle}>Blog</NavLink>
          </nav>

          {/* RIGHT: ACTIONS */}
          <div className="hidden lg:flex justify-end items-center gap-4">
            <a
              href="tel:1234567890"
              className={`text-sm ${
                !isHome || scrolled ? "text-gray-600" : "text-white"
              }`}
            >
              (123) 456-7890
            </a>

            <NavLink
              to="/login"
              className="bg-amber-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-600 transition"
            >
              Staff Login
            </NavLink>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden justify-self-end p-2 ${
              !isHome || scrolled ? "text-gray-800" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white`}
      >
        <div className="px-4 py-6 space-y-4">
          <NavLink to="/" end className="block text-gray-700">Home</NavLink>
          <NavLink to="/about" className="block text-gray-700">About Us</NavLink>
          <NavLink to="/services" className="block text-gray-700">Services</NavLink>
          <NavLink to="/team" className="block text-gray-700">Our Team</NavLink>
          <NavLink to="/contact" className="block text-gray-700">Contact Us</NavLink>
          <NavLink to="/book" className="block text-gray-700">Book Online</NavLink>
          <NavLink to="/blog" className="block text-gray-700">Blog</NavLink>

          <div className="pt-4 border-t">
            <NavLink
              to="/login"
              className="block text-center bg-amber-500 text-white py-2 rounded-full font-semibold"
            >
              Staff Login
            </NavLink>

            <div className="mt-3 text-center text-sm text-gray-600">
              Call Now:{" "}
              <a href="tel:1234567890" className="underline">
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
