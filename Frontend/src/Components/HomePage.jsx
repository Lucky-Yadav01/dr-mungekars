import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-amber-600 to-amber-400 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold font-poppins">Dr. Mungekar's Dental Clinic</h1>
            <p className="text-lg mt-2">Your Trusted Partner for a Healthy Smile</p>
          </div>
          <Link
            to="/login"
            className="bg-white text-amber-600 px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition"
          >
            Staff Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 font-poppins">Welcome to Our Clinic</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            At Dr. Mungekar's Dental Clinic, we provide exceptional dental care with a focus on patient comfort and satisfaction. 
            Our state-of-the-art facility and experienced team ensure your smile shines bright.
          </p>
          <a
            href="#book-appointment"
            className="mt-6 inline-block bg-amber-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-600 transition"
          >
            Book an Appointment
          </a>
        </section>

        {/* Services Overview */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins">General Dentistry</h3>
            <p className="mt-2 text-gray-600">Comprehensive check-ups and cleanings to maintain your oral health.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins">Cosmetic Dentistry</h3>
            <p className="mt-2 text-gray-600">Enhance your smile with our whitening and alignment services.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins">Orthodontics</h3>
            <p className="mt-2 text-gray-600">Customized solutions for straighter teeth and a confident smile.</p>
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
        <div className="container mx-auto px-4 text-center mt-8 text-sm text-gray-300">
          <p>&copy; 2025 Dr. Mungekar's Dental Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage