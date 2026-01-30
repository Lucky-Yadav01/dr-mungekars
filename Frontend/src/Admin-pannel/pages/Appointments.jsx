import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentCard from '../Components/AppointmentCard'
import AppointmentModal from '../Components/AppointmentModal'
import FilterModal from '../Components/FilterModal'

// Note: In a real app, this would be handled through a global state manager or context
// For now, we'll simulate the patient update

const Appointments = () => {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showModal, setShowModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    doctor: 'all',
    timeSlot: 'all'
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchAppointments()
  }, [selectedDate, filters])

  // CRUD Operations
  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError('')
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/appointments?date=${selectedDate}&${new URLSearchParams(filters)}`)
      // const data = await response.json()
      
      // Mock API delay
      setTimeout(() => {
        const mockAppointments = [
          {
            id: 1,
            appointmentNumber: 'APT001',
            patientName: 'John Doe',
            doctorName: 'Dr. Siddhesh Mungekar',
            time: '10:00 AM',
            duration: '30 min',
            treatment: 'Regular Checkup',
            status: 'confirmed',
            phone: '+91 98765 43210',
            notes: 'Regular dental checkup and cleaning',
            date: selectedDate
          },
          {
            id: 2,
            appointmentNumber: 'APT002',
            patientName: 'Jane Smith',
            doctorName: 'Dr. Sunita Mungekar',
            time: '11:30 AM',
            duration: '45 min',
            treatment: 'Root Canal',
            status: 'pending',
            phone: '+91 98765 43211',
            notes: 'Follow-up for root canal treatment',
            date: selectedDate
          },
          {
            id: 3,
            appointmentNumber: 'APT003',
            patientName: 'Mike Johnson',
            doctorName: 'Dr. Siddhesh Mungekar',
            time: '2:00 PM',
            duration: '20 min',
            treatment: 'Teeth Cleaning',
            status: 'completed',
            phone: '+91 98765 43212',
            notes: 'Routine cleaning and polishing',
            date: selectedDate
          }
        ]
        setAppointments(mockAppointments)
        setLoading(false)
      }, 800)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setError('Failed to load appointments. Please try again.')
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData) => {
    try {
      setError('')
      // TODO: Replace with actual API call
      // const response = await fetch('/api/admin/appointments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(appointmentData)
      // })
      // const newAppointment = await response.json()
      
      // Mock implementation
      const newAppointment = {
        id: Date.now(),
        appointmentNumber: appointmentData.appointmentNumber || `APT${String(Date.now()).slice(-6)}`,
        ...appointmentData,
        date: selectedDate
      }
      
      setAppointments(prev => [...prev, newAppointment])
      setSuccessMessage('Appointment created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
      return newAppointment
    } catch (error) {
      console.error('Error creating appointment:', error)
      setError('Failed to create appointment. Please try again.')
      throw error
    }
  }

  const updateAppointment = async (appointmentId, updates) => {
    try {
      setError('')
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/appointments/${appointmentId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // })
      // const updatedAppointment = await response.json()
      
      // Mock implementation
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, ...updates } : apt
      ))
      
      // If appointment is marked as completed, update patient history
      if (updates.status === 'completed') {
        const completedAppointment = appointments.find(apt => apt.id === appointmentId)
        if (completedAppointment) {
          const updatedAppointment = { ...completedAppointment, ...updates }
          await updatePatientHistoryFromAppointment(updatedAppointment)
        }
      }
      
      setSuccessMessage('Appointment updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating appointment:', error)
      setError('Failed to update appointment. Please try again.')
      throw error
    }
  }

  // Patient History Integration
  const updatePatientHistoryFromAppointment = async (appointmentData) => {
    try {
      // In a real application, this would make an API call to update patient records
      // For now, we'll use localStorage to simulate patient updates
      
      const visitData = {
        id: Date.now(),
        date: appointmentData.date,
        treatment: appointmentData.treatment,
        doctor: appointmentData.doctorName,
        appointmentId: appointmentData.id,
        appointmentNumber: appointmentData.appointmentNumber,
        notes: appointmentData.notes || '',
        duration: appointmentData.duration,
        status: 'completed',
        timestamp: new Date().toISOString()
      }
      
      // Store the visit in localStorage for demo purposes
      const existingVisits = JSON.parse(localStorage.getItem('patientVisits') || '[]')
      const updatedVisits = [...existingVisits, visitData]
      localStorage.setItem('patientVisits', JSON.stringify(updatedVisits))
      
      // Also trigger a custom event that the Patients component could listen to
      window.dispatchEvent(new CustomEvent('patientHistoryUpdate', {
        detail: {
          patientName: appointmentData.patientName,
          phone: appointmentData.phone,
          visitData: visitData
        }
      }))
      
      console.log('Patient history updated for:', appointmentData.patientName, visitData)
      setSuccessMessage(`Appointment completed! Patient history updated for ${appointmentData.patientName}`)
      
    } catch (error) {
      console.error('Error updating patient history:', error)
      setError('Appointment completed but failed to update patient history')
    }
  }

  const deleteAppointment = async (appointmentId) => {
    try {
      setError('')
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/appointments/${appointmentId}`, { method: 'DELETE' })
      
      // Mock implementation
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId))
      setSuccessMessage('Appointment deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting appointment:', error)
      setError('Failed to delete appointment. Please try again.')
      throw error
    }
  }

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateAppointment(appointmentId, { status: newStatus })
    } catch (error) {
      // Error already handled in updateAppointment
    }
  }

  const handleSaveAppointment = async (appointmentData) => {
    try {
      if (selectedAppointment) {
        await updateAppointment(selectedAppointment.id, appointmentData)
      } else {
        await createAppointment(appointmentData)
      }
      setShowModal(false)
      setSelectedAppointment(null)
    } catch (error) {
      // Error already handled in CRUD functions
    }
  }

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      await deleteAppointment(appointmentId)
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.treatment.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filters.status === 'all' || appointment.status === filters.status
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage all clinic appointments</p>
        </div>
        <button
          onClick={() => {
            setSelectedAppointment(null)
            setShowModal(true)
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Appointment
        </button>
      </div>

      {/* Filters & Search - Responsive */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search patients, doctors, or treatments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Date Picker */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilter(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Appointments List - Responsive */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No appointments found for {new Date(selectedDate).toLocaleDateString()}</p>
            <button
              onClick={() => {
                setSelectedAppointment(null)
                setShowModal(true)
              }}
              className="mt-4 text-amber-600 hover:text-amber-700 underline"
            >
              Create the first appointment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onStatusChange={handleStatusChange}
                onEdit={() => {
                  setSelectedAppointment(appointment)
                  setShowModal(true)
                }}
                onDelete={() => handleDeleteAppointment(appointment.id)}
                onClick={() => {
                  setSelectedAppointment(appointment)
                  setShowModal(true)
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowModal(false)
            setSelectedAppointment(null)
          }}
          onSave={handleSaveAppointment}
        />
      )}

      {showFilter && (
        <FilterModal
          filters={filters}
          onApply={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  )
}

export default Appointments