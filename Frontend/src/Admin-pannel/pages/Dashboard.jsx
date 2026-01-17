import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminPanel() {
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
                        <p className="text-lg mt-2">Welcome to the Admin Pannel of</p>
                        <h1 className="text-4xl font-bold font-poppins">Dr. Mungekar's Dental Clinic</h1>

                    </div>

                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">


                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Appointments</h3>
                        <p className="text-3xl font-bold text-amber-600">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Today's Appointments</h3>
                        <p className="text-3xl font-bold text-amber-600">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Total Patients</h3>
                        <p className="text-3xl font-bold text-amber-600">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-gray-600 text-sm font-medium mb-2">Employees</h3>
                        <p className="text-3xl font-bold text-amber-600">0</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
                            Manage Appointments
                        </h3>
                        <p className="text-gray-600 mb-4">View and manage all clinic appointments</p>
                        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
                            View Appointments
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
                            Patient Records
                        </h3>
                        <p className="text-gray-600 mb-4">Access and manage patient information</p>
                        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
                            View Patients
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
                            Employee Management
                        </h3>
                        <p className="text-gray-600 mb-4">Manage staff and employee accounts</p>
                        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
                            Manage Employees
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
                            Reports & Analytics
                        </h3>
                        <p className="text-gray-600 mb-4">View clinic performance and reports</p>
                        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
                            View Reports
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
                            Settings
                        </h3>
                        <p className="text-gray-600 mb-4">Configure clinic settings and preferences</p>
                        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
                            Open Settings
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
                            Schedule Management
                        </h3>
                        <p className="text-gray-600 mb-4">Manage clinic hours and availability</p>
                        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
                            Manage Schedule
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminPanel

