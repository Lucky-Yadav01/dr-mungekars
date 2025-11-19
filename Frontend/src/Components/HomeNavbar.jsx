
import React from 'react'
import { NavLink } from 'react-router-dom'

// update this path if your logo file has a different name/extension
const logo = new URL('../assets/logo.png', import.meta.url).href

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-base px-5 py-2 inline-block hover:text-blue-600 ${isActive ? 'text-teal-400 font-semibold relative' : 'text-gray-600'}`

  return (
    <header className="w-full bg-white font-sans">
      {/* top bar with Call Now left, brand center (clickable), Staff Login right */}
      <div className="flex items-center justify-between px-7 py-6"> {/* increased vertical padding */}
        {/* left: call now */}
        <div className="text-sm text-blue-600">
          Call Now: <a href="tel:123-456-7890" className="underline">123-456-7890</a>
        </div>

        {/* center: brand (clickable) - larger */}
        <NavLink to="/" className="flex items-center gap-4">
          <img src={logo} alt="Dr. Mungekar logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
          <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 uppercase tracking-wider">DR. MUNGEKAR'S</span>
        </NavLink>

        {/* right: staff login */}
        <div className="flex items-center">
          <NavLink
            to="/login"
            className="ml-4 bg-amber-500 text-white font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition text-base"
          >
            Staff Login
          </NavLink>
        </div>
      </div>

      {/* thin divider */}
      <div className="h-1 bg-gray-100" />

      {/* nav row centered */}
      <nav className="bg-gray-100 border-t border-b border-gray-200">
        <ul className="max-w-7xl mx-auto flex justify-center gap-6 px-7 py-2 items-center">
          <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
          <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>
          <li><NavLink to="/team" className={linkClass}>Our Team</NavLink></li>
          <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
          <li><NavLink to="/book" className={linkClass}>Book Online</NavLink></li>
          <li><NavLink to="/blog" className={linkClass}>Blog</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
