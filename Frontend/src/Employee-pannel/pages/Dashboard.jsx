import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentModal from '../Components/AppointmentModal'
import AppointmentCalendar from '../Components/AppointmentCalendar'
import dataService from '../../utils/dataService'

const formatDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parseDateKey = (dateKey) => {
  const [year, month, day] = (dateKey || formatDateKey(new Date())).split('-').map(Number)
  return new Date(year, (month || 1) - 1, day || 1)
}

const Dashboard = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(formatDateKey(new Date()))
  const [allAppointments, setAllAppointments] = useState([])
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalPatients: 0,
    websiteAppointments: 0,
    adminAppointments: 0,
    monthlyAppointments: 0,
    monthlyNewPatients: 0,
    employees: 0,
    selectedDatePatients: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
    const refreshDashboard = () => fetchDashboardData()

    window.addEventListener('appointmentCreated', refreshDashboard)
    window.addEventListener('appointmentUpdated', refreshDashboard)
    window.addEventListener('patientHistoryUpdate', refreshDashboard)

    return () => {
      window.removeEventListener('appointmentCreated', refreshDashboard)
      window.removeEventListener('appointmentUpdated', refreshDashboard)
      window.removeEventListener('patientHistoryUpdate', refreshDashboard)
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      const patients = JSON.parse(localStorage.getItem('patients') || '[]')
      const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]')

      const now = new Date()

      setAllAppointments(appointments)

      const selectedAppointmentsList = appointments.filter((appointment) => appointment.date === selectedDate)
      const selectedPatientMap = new Map()

      selectedAppointmentsList.forEach((appointment) => {
        const key = appointment.patientEmail || appointment.phone || appointment.patientName
        if (!selectedPatientMap.has(key)) {
          selectedPatientMap.set(key, {
            id: appointment.id,
            name: appointment.patientName,
            time: appointment.time,
            doctor: appointment.doctorName,
            treatment: appointment.treatment,
            status: appointment.status,
          })
        }
      })

      const monthlyAppointments = appointments.filter((appointment) => {
        if (!appointment.date) return false
        const date = new Date(appointment.date)
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      }).length

      const monthlyNewPatients = patients.filter((patient) => {
        if (!patient.createdAt) return false
        const date = new Date(patient.createdAt)
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      }).length

      const websiteAppointments = appointments.filter((appointment) => (appointment.source || '').toLowerCase() === 'website').length
      const adminAppointments = appointments.length - websiteAppointments

      setStats({
        totalAppointments: appointments.length,
        todayAppointments: selectedAppointmentsList.length,
        totalPatients: patients.length,
        websiteAppointments,
        adminAppointments,
        monthlyAppointments,
        monthlyNewPatients,
        employees: teamMembers.length,
        selectedDatePatients: Array.from(selectedPatientMap.values()),
      })

      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setStats({
        totalAppointments: 0,
        todayAppointments: 0,
        totalPatients: 0,
        websiteAppointments: 0,
        adminAppointments: 0,
        monthlyAppointments: 0,
        monthlyNewPatients: 0,
        employees: 0,
        selectedDatePatients: [],
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [selectedDate])

  const autoCreateOrLinkPatient = (appointmentData) => {
    const cleanEmail = appointmentData.patientEmail?.trim().toLowerCase() || ''
    const cleanPhone = appointmentData.phone?.trim() || ''
    const patients = dataService.getPatients()

    let existingPatient = null
    if (cleanEmail) {
      existingPatient = dataService.findPatientByEmail(cleanEmail)
    }

    if (!existingPatient && cleanPhone) {
      existingPatient = patients.find((patient) => patient.phone === cleanPhone)
    }

    if (existingPatient) {
      return {
        linkedPatientId: existingPatient.id,
        isLinkedToExistingPatient: true,
      }
    }

    const [firstName = '', ...lastNames] = (appointmentData.patientName || '').trim().split(' ')
    const newPatient = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: appointmentData.patientName,
      firstName,
      lastName: lastNames.join(' '),
      email: cleanEmail,
      phone: cleanPhone,
      age: null,
      gender: 'Other',
      address: '',
      status: 'active',
      totalVisits: 0,
      appointments: [],
      medicalHistory: [],
      emergencyContact: '',
      source: appointmentData.source || 'admin',
      createdAt: new Date().toISOString(),
    }

    dataService.savePatients([...patients, newPatient])

    return {
      linkedPatientId: newPatient.id,
      isLinkedToExistingPatient: false,
    }
  }

  const handleSaveAppointment = async (appointmentData) => {
    const existingAppointments = dataService.getAppointments()
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000)

    const normalizedData = {
      ...appointmentData,
      source: appointmentData.source || 'admin',
    }

    const patientLinkInfo = autoCreateOrLinkPatient(normalizedData)

    const newAppointment = {
      id: uniqueId,
      appointmentNumber: normalizedData.appointmentNumber || `APT${String(uniqueId).slice(-6)}`,
      ...normalizedData,
      ...patientLinkInfo,
      createdAt: new Date().toISOString(),
    }

    dataService.saveAppointments([...existingAppointments, newAppointment])
    if (newAppointment.linkedPatientId) {
      dataService.updatePatientAppointments(newAppointment.linkedPatientId, newAppointment)
    }

    dataService.broadcastEvent('appointmentCreated', { appointment: newAppointment })
    setShowAppointmentModal(false)
    fetchDashboardData()
  }

  const quickActions = [
    {
      title: 'Add Appointment',
      description: 'Create a new appointment quickly',
      path: '/admin/appointments',
      buttonText: 'Create Appointment',
      opensModal: true,
    },
    {
      title: 'Manage Appointments',
      description: 'View and manage clinic appointments',
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
    }
  ]

  const selectedDateLabel = parseDateKey(selectedDate).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Today&apos;s schedule, patient flow, and monthly clinic performance</p>
        </div>
        <button
          onClick={() => setShowAppointmentModal(true)}
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Add Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Today&apos;s Appointments</h3>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : (
              stats.todayAppointments
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Monthly Appointments</h3>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : (
              stats.monthlyAppointments
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
          <h3 className="text-gray-600 text-sm font-medium mb-2">New Patients (Month)</h3>
          <p className="text-3xl font-bold text-amber-600">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : (
              stats.monthlyNewPatients
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div>
          <AppointmentCalendar
            appointments={allAppointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            title="Appointment Calendar"
            compact
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Patients on Selected Date</h3>
          <p className="text-xs text-gray-500 mb-4">{selectedDateLabel}</p>
          {stats.selectedDatePatients.length === 0 ? (
            <p className="text-sm text-gray-500">No patients scheduled on this date.</p>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {stats.selectedDatePatients.map((patient) => (
                <div key={patient.id} className="border border-gray-200 rounded-lg p-3 hover:border-amber-200 transition-colors">
                  <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{patient.time} · {patient.doctor}</p>
                  <p className="text-xs text-amber-700 mt-1">{patient.treatment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Source Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100">
              <p className="text-gray-600">Appointments from Website</p>
              <p className="text-2xl font-bold text-emerald-700">{stats.websiteAppointments}</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
              <p className="text-gray-600">Appointments Added by Admin</p>
              <p className="text-2xl font-bold text-amber-700">{stats.adminAppointments}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 text-sm">
          <div className="rounded-lg bg-amber-50 p-4 border border-amber-100">
            <p className="text-gray-600">Appointments</p>
            <p className="text-2xl font-bold text-amber-700">{stats.monthlyAppointments}</p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100">
            <p className="text-gray-600">New Patients</p>
            <p className="text-2xl font-bold text-emerald-700">{stats.monthlyNewPatients}</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
            <p className="text-gray-600">Employees</p>
            <p className="text-2xl font-bold text-blue-700">{stats.employees}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
            <p className="text-gray-600">Total Appointments</p>
            <p className="text-2xl font-bold text-gray-700">{stats.totalAppointments}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <h3 className="text-xl font-semibold text-amber-600 font-poppins mb-3">
              {action.title}
            </h3>
            <p className="text-gray-600 mb-4">{action.description}</p>
            <button 
              onClick={() => {
                if (action.opensModal) {
                  setShowAppointmentModal(true)
                  return
                }
                navigate(action.path)
              }}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors w-full"
            >
              {action.buttonText}
            </button>
          </div>
        ))}
      </div>

      {showAppointmentModal && (
        <AppointmentModal
          onClose={() => setShowAppointmentModal(false)}
          onSave={handleSaveAppointment}
        />
      )}
    </div>
  )
}

export default Dashboard
