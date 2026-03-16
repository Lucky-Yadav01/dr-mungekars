import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clinicLogo from "../../assets/dental_logo.png";

const normalizePath = (pathname) => {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
};

const Navbar = ({ pageTitle = "Employee Panel", onLogout, navLinks = [] }) => {
  const location = useLocation();
  const normalizedPath = normalizePath(location.pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="h-full max-w-[1440px] mx-auto w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Nav links */}
        <div className="flex items-center gap-8 min-w-0">
          <NavLink
            to="/admin"
            end
            className="flex-shrink-0 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded-lg"
          >
            <img
              src={clinicLogo}
              alt="Dr. Mungekar's Dental Clinic"
              className="w-10 h-10 rounded-full border-2 border-amber-500 object-cover"
            />
            <span className="hidden sm:block text-sm font-semibold text-gray-800 truncate">
              Dr. Mungekar&apos;s
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.index
                  ? normalizedPath === link.to || normalizedPath === "/admin"
                  : normalizedPath === link.to;
              return (
                <NavLink
                  key={link.key}
                  to={link.to}
                  end={link.index}
                  className={({ isActive: navActive }) =>
                    [
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                      navActive || isActive
                        ? "bg-amber-50 text-amber-700 border border-amber-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Right: page title, search, logout */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden xl:block text-right min-w-0">
            <p className="text-xs uppercase tracking-widest text-gray-400">Employee console</p>
            <p className="text-lg font-semibold text-gray-900 truncate max-w-[180px]">{pageTitle}</p>
          </div>
          <p className="hidden xl:hidden lg:block text-xs font-medium text-gray-500 truncate max-w-[150px]">
            {pageTitle}
          </p>
          <div className="hidden xl:block relative">
            <input
              type="search"
              placeholder="Search"
              className="pl-4 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm w-40 lg:w-52"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-sm">
              /
            </span>
          </div>
          <button
            onClick={onLogout}
            className="hidden sm:block px-4 py-2 rounded-full border border-amber-500 text-amber-600 font-semibold hover:bg-amber-50 transition text-sm whitespace-nowrap"
          >
            Logout
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="px-4 py-3 flex flex-col gap-1">
            <button
              onClick={() => {
                onLogout()
                setMobileMenuOpen(false)
              }}
              className="mb-2 px-4 py-2 rounded-lg text-sm font-medium border border-amber-300 text-amber-700 hover:bg-amber-50 text-left"
            >
              Logout
            </button>
            {navLinks.map((link) => {
              const isActive =
                link.index
                  ? normalizedPath === link.to || normalizedPath === "/admin"
                  : normalizedPath === link.to;
              return (
                <NavLink
                  key={link.key}
                  to={link.to}
                  end={link.index}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive: navActive }) =>
                    [
                      "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      navActive || isActive
                        ? "bg-amber-50 text-amber-700 border border-amber-100"
                        : "text-gray-600 hover:bg-gray-50",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
