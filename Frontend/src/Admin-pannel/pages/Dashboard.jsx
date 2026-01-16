import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0,
    employees: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Mock API call - replace with actual backend
      setTimeout(() => {
        setStats({
          totalAppointments: 156,
          todayAppointments: 8,
          totalPatients: 342,
          employees: 12
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: 'Manage Appointments',
      description: 'View and manage all clinic appointments',
      path: '/admin/appointments',
      buttonText: 'View Appointments'
    },
    {
      title: 'Patient Records',
      description: 'Access and manage patient information',
      path: '/admin/patients',
      buttonText: 'View Patients'
    },
    {
      title: 'Employee Management',
      description: 'Manage staff and employee accounts',
      path: '/admin/team',
      buttonText: 'Manage Employees'
    },
    {
      title: 'Reports & Analytics',
      description: 'View clinic performance and reports',
      path: '/admin/reports',
      buttonText: 'View Reports'
    },
    {
      title: 'Settings',
      description: 'Configure clinic settings and preferences',
      path: '/admin/settings',
      buttonText: 'Open Settings'
    },
    {
      title: 'Schedule Management',
      description: 'Manage clinic hours and availability',
      path: '/admin/settings',
      buttonText: 'Manage Schedule'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 font-poppins mb-4">
          Dashboard Overview
        </h2>
      </div>

      {/* Stats Cards - Original Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Appointments</h3>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : (
              stats.totalAppointments
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Today's Appointments</h3>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : (
              stats.todayAppointments
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Patients</h3>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : (
              stats.totalPatients
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Employees</h3>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : (
              stats.employees
            )}
          </p>
        </div>
      </div>

      {/* Quick Actions - Original Design with Working Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
              {action.title}
            </h3>
            <p className="text-gray-600 mb-4">{action.description}</p>
            <button 
              onClick={() => navigate(action.path)}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors w-full"
            >
              {action.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
