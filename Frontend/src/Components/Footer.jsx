

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* LOGO */}
          <div>
            <img
              src={logo}
              alt="Dr. Mungekar's Dental Clinic"
              className="w-20 mb-4"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              Modern dentistry with comfort, care, and advanced technology.
            </p>
          </div>

          {/* PRACTICE */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">
              Practice
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/team" className="hover:text-white">Our Team</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Routine Check-up</li>
              <li>Dental Hygiene</li>
              <li>Invisible Aligners</li>
              <li>Dental Implants</li>
              <li>Dental Surgeries</li>
              <li>Laser RCT</li>
              <li>Tooth Extraction</li>
              <li>Braces Treatment</li>
              <li>Child Teeth Care</li>
              <li>Zirconia Crowns</li>
              <li>Tooth Veneers</li>
            </ul>
          </div>

          {/* OFFICE */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">
              Office
            </h4>

            <p className="text-sm leading-relaxed mb-4">
              No 26, Nilje Gaon, Meadows Green,<br />
              Near Casa Rio Main Rd,<br />
              Dombivli East, Maharashtra 421204
            </p>

            <a
              href="https://maps.app.goo.gl/Xbj3fMjkqAj713Ki7"
              target="_blank"
              rel="noreferrer"
              className="text-sm underline hover:text-white"
            >
              View on Google Maps
            </a>

            <div className="mt-4 text-sm">
              <p>Mon–Fri: 9:00am – 7:00pm</p>
              <p>Sat: 9:00am – 2:00pm</p>
              <p>Sun: Emergency Only</p>
            </div>

            <p className="mt-4 text-sm">
              Call/Text:{" "}
              <a href="tel:8928483233" className="underline hover:text-white">
                8928483233
              </a>
            </p>
          </div>
        </div>

        {/* SOCIAL + COPYRIGHT */}
        <div className="border-t border-gray-800 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">

          {/* COPYRIGHT */}
          <p className="text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Dr. Mungekar's Dental Clinic. All rights reserved.
          </p>

          {/* SOCIAL */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/dr_mungekars/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a1.13 1.13 0 110 2.26 1.13 1.13 0 010-2.26z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  
  );
}
