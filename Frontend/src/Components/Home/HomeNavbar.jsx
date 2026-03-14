
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
    `relative text-xs lg:text-sm xl:text-base font-medium whitespace-nowrap transition-colors duration-200 px-1 lg:px-2 py-1 ${
      isActive
        ? "text-amber-500 after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-amber-500"
        : scrolled || location.pathname.startsWith("/blog")
        ? "text-gray-700 hover:text-amber-500"
        : "text-white hover:text-amber-300"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        scrolled || location.pathname.startsWith("/blog") ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* MAIN BAR */}
      <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6">
        <div className="max-w-7xl mx-auto h-16 sm:h-18 md:h-[72px] flex items-center justify-between gap-2">

          {/* LEFT: LOGO */}
          <NavLink to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <img
              src={logo}
              alt="Dr. Mungekar's Dental Clinic"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
            />
            <span
              className={`text-xs sm:text-sm md:text-lg font-extrabold tracking-wide hidden sm:inline-block ${
                scrolled || location.pathname.startsWith("/blog") ? "text-amber-500" : "text-white"
              }`}
            >
              DR. MUNGEKAR&apos;S
            </span>
          </NavLink>

          {/* CENTER: NAV LINKS - Desktop Only */}
          <nav className="hidden lg:flex justify-center gap-2 xl:gap-4 flex-grow px-2">
            <NavLink to="/" end className={linkStyle}>Home</NavLink>
            <NavLink to="/about" className={linkStyle}>About Us</NavLink>
            <NavLink to="/services" className={linkStyle}>Services</NavLink>
            <NavLink to="/team" className={linkStyle}>Our Team</NavLink>
            <NavLink to="/contact" className={linkStyle}>Contact Us</NavLink>
            <NavLink to="/book" className={linkStyle}>Book Online</NavLink>
            <NavLink to="/blog" className={linkStyle}>Blog</NavLink>
          </nav>

          {/* RIGHT: ACTIONS - Desktop Only */}
          <div className="hidden lg:flex justify-end items-center gap-1 xl:gap-2 flex-shrink-0">
            <a
              href="tel:1234567890"
              className={`hidden xl:block text-xs whitespace-nowrap font-medium ${
                scrolled || location.pathname.startsWith("/blog") ? "text-gray-600" : "text-white"
              }`}
            >
              (123) 456-7890
            </a>

            <NavLink
              to="/login"
              className="bg-amber-500 text-white px-3 lg:px-3 xl:px-4 py-2 rounded-full text-xs font-semibold hover:bg-amber-600 transition whitespace-nowrap"
            >
              Staff Login
            </NavLink>
          </div>

          {/* MOBILE TOGGLE - Right Top Corner */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden ml-auto p-2 rounded-lg transition-all ${
              open
                ? scrolled || location.pathname.startsWith("/blog")
                  ? "bg-gray-100 text-gray-800"
                  : "bg-white/20 text-white"
                : scrolled || location.pathname.startsWith("/blog")
                ? "text-gray-600 hover:bg-gray-100"
                : "text-white hover:bg-white/20"
            }`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Full Screen Slide Down */}
      {open && (
        <div className="fixed inset-0 top-16 sm:top-18 md:top-[72px] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative bg-white max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Services
              </NavLink>

              <NavLink
                to="/team"
                className={({ isActive }) =>
                  `block px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Our Team
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Contact Us
              </NavLink>

              <NavLink
                to="/book"
                className={({ isActive }) =>
                  `block px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Book Online
              </NavLink>

              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `block px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                Blog
              </NavLink>

              {/* Divider */}
              <div className="my-4 h-px bg-gray-200" />

              {/* Phone Call */}
              <div className="px-4 py-3">
                <div className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">
                  Call Now
                </div>
                <a
                  href="tel:1234567890"
                  className="block text-center bg-amber-100 text-amber-600 font-semibold py-3 sm:py-4 rounded-lg hover:bg-amber-200 transition"
                >
                  (123) 456-7890
                </a>
              </div>

              {/* Staff Login Button */}
              <div className="px-4 py-3">
                <NavLink
                  to="/login"
                  className="block text-center bg-amber-500 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-amber-600 transition"
                >
                  Staff Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
