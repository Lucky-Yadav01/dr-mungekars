import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentCard from '../Components/AppointmentCard'
import AppointmentModal from '../Components/AppointmentModal'
import FilterModal from '../Components/FilterModal'
import dataService from '../../utils/dataService'

// Note: In a real app, this would be handled through a global state manager or context
// For now, we'll simulate the patient update

const Appointments = () => {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('') // Start with no date filter
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
      console.log('=== FETCH APPOINTMENTS DEBUG ===')
      console.log('Fetching appointments for date:', selectedDate)
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/appointments?date=${selectedDate}&${new URLSearchParams(filters)}`)
      // const data = await response.json()
      
      // Mock API delay
      setTimeout(() => {
        // Initialize mock data if needed
        if (!dataService.isInitialized('appointments')) {
          console.log('Initializing mock appointments...')
          const mockAppointments = [
            {
              id: 1,
              appointmentNumber: 'APT001',
              patientName: 'John Doe',
              doctorName: 'Dr. Siddhesh Mungekar',
              time: '10:00',
              duration: '30 min',
              treatment: 'Regular Checkup',
              status: 'confirmed',
              phone: '9876543210',
              notes: 'Regular dental checkup and cleaning',
              date: new Date().toISOString().split('T')[0], // Today's date
              patientEmail: 'john.doe@email.com',
              createdAt: new Date().toISOString(),
              linkedPatientId: 1,
              isLinkedToExistingPatient: true
            },
            {
              id: 2,
              appointmentNumber: 'APT002',
              patientName: 'Jane Smith',
              doctorName: 'Dr. Sunita Mungekar',
              time: '11:30',
              duration: '45 min',
              treatment: 'Root Canal',
              status: 'scheduled',
              phone: '9876543211',
              notes: 'Follow-up for root canal treatment',
              date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
              patientEmail: 'jane.smith@email.com',
              createdAt: new Date().toISOString(),
              linkedPatientId: 2,
              isLinkedToExistingPatient: true
            }
          ]
          dataService.saveAppointments(mockAppointments)
          dataService.setInitialized('appointments')
          console.log('Mock appointments initialized:', mockAppointments)
        }
        
        // Get all appointments directly from localStorage to avoid any issues
        const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
        console.log('All appointments from localStorage:', storedAppointments)
        console.log('Current selected date for filtering:', selectedDate)
        
        // Filter by date only if a date is selected
        const dateFilteredAppointments = selectedDate 
          ? storedAppointments.filter(apt => {
              const matches = apt.date === selectedDate
              console.log(`Checking appointment ID ${apt.id}: date "${apt.date}" vs selected "${selectedDate}" = ${matches}`)
              return matches
            })
          : storedAppointments // Show all appointments if no date selected
        
        console.log('Filtered appointments for date:', dateFilteredAppointments)
        console.log('Total filtered appointments:', dateFilteredAppointments.length)
        console.log('Setting appointments state with:', dateFilteredAppointments)
        
        setAppointments(dateFilteredAppointments)
        setLoading(false)
        console.log('=== FETCH APPOINTMENTS COMPLETE ===')
      }, 300)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setError('Failed to load appointments. Please try again.')
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData) => {
    try {
      setError('')
      console.log('=== APPOINTMENT CREATION DEBUG ===')
      console.log('Raw appointment data received:', appointmentData)
      console.log('Selected date from state:', selectedDate)
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/admin/appointments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(appointmentData)
      // })
      // const newAppointment = await response.json()
      
      // Ensure the appointment has the correct date
      const appointmentWithDate = {
        ...appointmentData,
        date: appointmentData.date || selectedDate
      }
      
      console.log('Appointment with date applied:', appointmentWithDate)
      
      // Create appointment directly in localStorage to ensure it works
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      console.log('Existing appointments in storage:', existingAppointments)
      
      // Generate a truly unique ID using timestamp + random number
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000)
      
      const newAppointment = {
        id: uniqueId,
        appointmentNumber: appointmentWithDate.appointmentNumber || `APT${String(uniqueId).slice(-6)}`,
        ...appointmentWithDate,
        createdAt: new Date().toISOString()
      }
      
      console.log('New appointment object created:', newAppointment)
      
      // If linked to existing patient, update their record
      if (newAppointment.linkedPatientId) {
        console.log('Updating patient record for linked patient ID:', newAppointment.linkedPatientId)
        dataService.updatePatientAppointments(newAppointment.linkedPatientId, newAppointment)
      }
      
      const updatedAppointments = [...existingAppointments, newAppointment]
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
      console.log('Updated appointments saved to localStorage:', updatedAppointments)
      console.log('Total appointments now:', updatedAppointments.length)
      
      // Immediately update the local state without waiting for fetchAppointments
      if (newAppointment.date === selectedDate) {
        console.log('Adding new appointment to current state since it matches selected date')
        setAppointments(prev => {
          const updated = [...prev, newAppointment]
          console.log('Updated local state:', updated)
          return updated
        })
      }
      
      console.log('About to refresh appointments list...')
      // Also refresh the appointments list to ensure consistency
      setTimeout(() => fetchAppointments(), 100)
      
      // Emit events for UI updates
      dataService.broadcastEvent('appointmentCreated', {
        appointment: newAppointment
      })
      
      setSuccessMessage('Appointment created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
      console.log('=== APPOINTMENT CREATION COMPLETE ===')
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
      
      // Get the appointment before update
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      const currentAppointment = existingAppointments.find(apt => apt.id === appointmentId)
      
      if (!currentAppointment) {
        throw new Error('Appointment not found')
      }

      // Update appointment directly in localStorage
      const updatedAppointments = existingAppointments.map(apt => 
        apt.id === appointmentId ? { ...apt, ...updates } : apt
      )
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
      
      // Refresh appointments list
      await fetchAppointments()
      
      // If appointment is marked as completed, update patient history
      if (updates.status === 'completed' && currentAppointment.status !== 'completed') {
        const completedAppointment = { ...currentAppointment, ...updates }
        await updatePatientFromCompletedAppointment(completedAppointment)
      }
      
      // Emit event for appointment updates
      dataService.broadcastEvent('appointmentUpdated', {
        appointmentId, 
        updates,
        appointment: { ...currentAppointment, ...updates }
      })
      
      setSuccessMessage('Appointment updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating appointment:', error)
      setError('Failed to update appointment. Please try again.')
      throw error
    }
  }

  // Patient Update from Completed Appointment
  const updatePatientFromCompletedAppointment = async (completedAppointment) => {
    try {
      // Find the patient by email if appointment is linked to existing patient
      if (completedAppointment.patientEmail && completedAppointment.isLinkedToExistingPatient) {
        const patient = dataService.findPatientByEmail(completedAppointment.patientEmail)
        if (patient) {
          // Update patient's visit data
          const patients = dataService.getPatients()
          const updatedPatients = patients.map(p => {
            if (p.id === patient.id) {
              return {
                ...p,
                lastVisit: completedAppointment.date,
                totalVisits: (p.totalVisits || 0) + 1
              }
            }
            return p
          })
          dataService.savePatients(updatedPatients)
          
          // Add visit to patient history
          const visitData = {
            id: Date.now(),
            date: completedAppointment.date,
            treatment: completedAppointment.treatment,
            doctor: completedAppointment.doctorName,
            appointmentId: completedAppointment.id,
            appointmentNumber: completedAppointment.appointmentNumber,
            notes: completedAppointment.notes || '',
            duration: completedAppointment.duration,
            status: 'completed',
            patientId: patient.id,
            patientName: patient.name,
            phone: patient.phone,
            timestamp: new Date().toISOString()
          }
          
          dataService.addPatientVisit(visitData)
          
          // Broadcast patient history update
          dataService.broadcastEvent('patientHistoryUpdate', {
            patientId: patient.id,
            patientName: patient.name,
            phone: patient.phone,
            visitData: visitData
          })
          
          console.log(`Patient ${patient.name} updated from completed appointment`)
        }
      }
      
      // Also call the existing function for backward compatibility
      await updatePatientHistoryFromAppointment(completedAppointment)
      
    } catch (error) {
      console.error('Error updating patient from completed appointment:', error)
    }
  }

  // Legacy Patient History Integration (kept for backward compatibility)
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

  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedDate('')
    setSearchTerm('')
    setFilters({
      status: 'all',
      doctor: 'all',
      timeSlot: 'all'
    })
  }

  // Check if any filters are active
  const hasActiveFilters = selectedDate || searchTerm || filters.status !== 'all' || filters.doctor !== 'all' || filters.timeSlot !== 'all'

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
              placeholder="Filter by date"
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
            {hasActiveFilters && (
              <span className="bg-amber-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                {[selectedDate && '1', searchTerm && '1', filters.status !== 'all' && '1'].filter(Boolean).length}
              </span>
            )}
          </button>

          {/* Clear Filters Button - Only show when filters are active */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="hidden sm:inline">Clear Filters</span>
            </button>
          )}
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