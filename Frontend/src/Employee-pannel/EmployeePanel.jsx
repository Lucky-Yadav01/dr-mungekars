import React from 'react'
import { useNavigate } from 'react-router-dom'

function EmployeePanel() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear any authentication data
    // TODO: Add actual logout logic
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-amber-400 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold font-poppins">Employee Panel</h1>
            <p className="text-lg mt-2">Dr. Mungekar's Dental Clinic</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-amber-600 px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 font-poppins mb-4">
            Today's Schedule
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Today's Appointments</h3>
            <p className="text-3xl font-bold text-amber-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Pending Tasks</h3>
            <p className="text-3xl font-bold text-amber-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Completed</h3>
            <p className="text-3xl font-bold text-amber-600">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
              View Appointments
            </h3>
            <p className="text-gray-600 mb-4">Check today's and upcoming appointments</p>
            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
              View Schedule
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
              Patient Check-in
            </h3>
            <p className="text-gray-600 mb-4">Check in patients for their appointments</p>
            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
              Check-in Patient
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
              Patient Records
            </h3>
            <p className="text-gray-600 mb-4">View patient information and history</p>
            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
              Search Patients
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
              Add Appointment
            </h3>
            <p className="text-gray-600 mb-4">Schedule a new appointment for a patient</p>
            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
              New Appointment
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
              Treatment Notes
            </h3>
            <p className="text-gray-600 mb-4">Add or view treatment notes</p>
            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
              View Notes
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
              My Profile
            </h3>
            <p className="text-gray-600 mb-4">View and update your profile information</p>
            <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
              View Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EmployeePanel

