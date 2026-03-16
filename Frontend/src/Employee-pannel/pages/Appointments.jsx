import React, { useState, useEffect } from 'react'
import AppointmentCard from '../Components/AppointmentCard'
import AppointmentModal from '../Components/AppointmentModal'
import AppointmentCalendar from '../Components/AppointmentCalendar'
import FilterModal from '../Components/FilterModal'
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

const getAppointmentTimestamp = (appointment) => {
  const [year, month, day] = (appointment.date || formatDateKey(new Date())).split('-').map(Number)
  const [hours = 0, minutes = 0] = (appointment.time || '00:00').split(':').map(Number)
  return new Date(year, (month || 1) - 1, day || 1, hours, minutes).getTime()
}

const getTimeSlot = (time) => {
  if (!time) return 'all'
  const [hour = 0] = time.split(':').map(Number)
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

const Appointments = () => {
  const todayDate = formatDateKey(new Date())

  const [allAppointments, setAllAppointments] = useState([])
  const [appointments, setAppointments] = useState([])
  const [selectedDateAppointmentsCount, setSelectedDateAppointmentsCount] = useState(0)
  const [selectedDatePatients, setSelectedDatePatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(todayDate)
  const [showModal, setShowModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    status: 'all',
    doctor: 'all',
    timeSlot: 'all',
    date: '',
    sortBy: 'newest',
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchAppointments()
  }, [selectedDate])

  useEffect(() => {
    const refreshAppointments = () => fetchAppointments()
    window.addEventListener('appointmentCreated', refreshAppointments)
    window.addEventListener('appointmentUpdated', refreshAppointments)

    return () => {
      window.removeEventListener('appointmentCreated', refreshAppointments)
      window.removeEventListener('appointmentUpdated', refreshAppointments)
    }
  }, [selectedDate])

  const buildSelectedDateInsights = (appointmentList = [], dateKey = selectedDate) => {
    const selectedDateAppointments = appointmentList.filter((appointment) => appointment.date === dateKey)
    const patientMap = new Map()

    selectedDateAppointments.forEach((appointment) => {
      const key = appointment.patientEmail || appointment.phone || appointment.patientName
      if (!patientMap.has(key)) {
        patientMap.set(key, {
          id: appointment.id,
          patientName: appointment.patientName,
          time: appointment.time,
          doctorName: appointment.doctorName,
          treatment: appointment.treatment,
          status: appointment.status,
        })
      }
    })

    setSelectedDateAppointmentsCount(selectedDateAppointments.length)
    setSelectedDatePatients(Array.from(patientMap.values()))
  }

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
      gender: '',
      dateOfBirth: '',
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

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError('')

      setTimeout(() => {
        if (!dataService.isInitialized('appointments')) {
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
              date: todayDate,
              patientEmail: 'john.doe@email.com',
              createdAt: new Date().toISOString(),
              linkedPatientId: 1,
              isLinkedToExistingPatient: true,
              source: 'admin',
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
              date: formatDateKey(new Date(Date.now() + 86400000)),
              patientEmail: 'jane.smith@email.com',
              createdAt: new Date().toISOString(),
              linkedPatientId: 2,
              isLinkedToExistingPatient: true,
              source: 'admin',
            },
          ]
          dataService.saveAppointments(mockAppointments)
          dataService.setInitialized('appointments')
        }

        const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
        setAllAppointments(storedAppointments)
        buildSelectedDateInsights(storedAppointments, selectedDate)

        const newestFirst = [...storedAppointments].sort((a, b) => getAppointmentTimestamp(b) - getAppointmentTimestamp(a))
        setAppointments(newestFirst)
        setLoading(false)
      }, 300)
    } catch (fetchError) {
      console.error('Error fetching appointments:', fetchError)
      setError('Failed to load appointments. Please try again.')
      setLoading(false)
    }
  }

  const createAppointment = async (appointmentData) => {
    try {
      setError('')

      const appointmentWithDate = {
        ...appointmentData,
        date: appointmentData.date || selectedDate || todayDate,
        source: appointmentData.source || 'admin',
      }

      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000)
      const patientLinkInfo = autoCreateOrLinkPatient(appointmentWithDate)

      const newAppointment = {
        id: uniqueId,
        appointmentNumber: appointmentWithDate.appointmentNumber || `APT${String(uniqueId).slice(-6)}`,
        ...appointmentWithDate,
        ...patientLinkInfo,
        createdAt: new Date().toISOString(),
      }

      if (newAppointment.linkedPatientId) {
        dataService.updatePatientAppointments(newAppointment.linkedPatientId, newAppointment)
      }

      const updatedAppointments = [...existingAppointments, newAppointment]
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments))

      setAllAppointments(updatedAppointments)
      buildSelectedDateInsights(updatedAppointments, selectedDate)
      setAppointments((prev) => [newAppointment, ...prev])

      dataService.broadcastEvent('appointmentCreated', { appointment: newAppointment })
      setSuccessMessage('Appointment created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)

      return newAppointment
    } catch (createError) {
      console.error('Error creating appointment:', createError)
      setError('Failed to create appointment. Please try again.')
      throw createError
    }
  }

  const updatePatientFromCompletedAppointment = async (completedAppointment) => {
    try {
      if (completedAppointment.patientEmail && completedAppointment.isLinkedToExistingPatient) {
        const patient = dataService.findPatientByEmail(completedAppointment.patientEmail)
        if (patient) {
          const patients = dataService.getPatients()
          const updatedPatients = patients.map((existingPatient) => {
            if (existingPatient.id === patient.id) {
              return {
                ...existingPatient,
                lastVisit: completedAppointment.date,
                totalVisits: (existingPatient.totalVisits || 0) + 1,
              }
            }
            return existingPatient
          })
          dataService.savePatients(updatedPatients)

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
            timestamp: new Date().toISOString(),
          }

          dataService.addPatientVisit(visitData)
          dataService.broadcastEvent('patientHistoryUpdate', {
            patientId: patient.id,
            patientName: patient.name,
            phone: patient.phone,
            visitData,
          })
        }
      }
    } catch (updateError) {
      console.error('Error updating patient from completed appointment:', updateError)
    }
  }

  const updateAppointment = async (appointmentId, updates) => {
    try {
      setError('')
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      const currentAppointment = existingAppointments.find((appointment) => appointment.id === appointmentId)
      if (!currentAppointment) throw new Error('Appointment not found')

      const updatedAppointments = existingAppointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, ...updates } : appointment
      )
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
      setAllAppointments(updatedAppointments)
      buildSelectedDateInsights(updatedAppointments, selectedDate)
      setAppointments([...updatedAppointments].sort((a, b) => getAppointmentTimestamp(b) - getAppointmentTimestamp(a)))

      if (updates.status === 'completed' && currentAppointment.status !== 'completed') {
        const completedAppointment = { ...currentAppointment, ...updates }
        await updatePatientFromCompletedAppointment(completedAppointment)
      }

      dataService.broadcastEvent('appointmentUpdated', {
        appointmentId,
        updates,
        appointment: { ...currentAppointment, ...updates },
      })

      setSuccessMessage('Appointment updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (updateError) {
      console.error('Error updating appointment:', updateError)
      setError('Failed to update appointment. Please try again.')
      throw updateError
    }
  }

  const deleteAppointment = async (appointmentId) => {
    try {
      setError('')
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      const updatedAppointments = existingAppointments.filter((appointment) => appointment.id !== appointmentId)
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments))

      setAllAppointments(updatedAppointments)
      buildSelectedDateInsights(updatedAppointments, selectedDate)
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== appointmentId))

      dataService.broadcastEvent('appointmentUpdated', {
        appointmentId,
        action: 'deleted',
      })

      setSuccessMessage('Appointment deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (deleteError) {
      console.error('Error deleting appointment:', deleteError)
      setError('Failed to delete appointment. Please try again.')
      throw deleteError
    }
  }

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateAppointment(appointmentId, { status: newStatus })
    } catch {
      return null
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
    } catch {
      return null
    }
  }

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      await deleteAppointment(appointmentId)
    }
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setFilters({
      status: 'all',
      doctor: 'all',
      timeSlot: 'all',
      date: '',
      sortBy: 'newest',
    })
  }

  const hasActiveFilters = searchTerm || filters.status !== 'all' || filters.doctor !== 'all' || filters.timeSlot !== 'all' || !!filters.date || filters.sortBy !== 'newest'

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.treatment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === 'all' || appointment.status === filters.status
    const matchesDoctor = filters.doctor === 'all' || appointment.doctorName === filters.doctor
    const matchesTimeSlot = filters.timeSlot === 'all' || getTimeSlot(appointment.time) === filters.timeSlot
    const matchesDate = !filters.date || appointment.date === filters.date

    return matchesSearch && matchesStatus && matchesDoctor && matchesTimeSlot && matchesDate
  }).sort((a, b) => {
    if (filters.sortBy === 'oldest') {
      return getAppointmentTimestamp(a) - getAppointmentTimestamp(b)
    }
    if (filters.sortBy === 'name-asc') {
      return a.patientName.localeCompare(b.patientName)
    }
    return getAppointmentTimestamp(b) - getAppointmentTimestamp(a)
  })

  const doctorOptions = Array.from(new Set(allAppointments.map((appointment) => appointment.doctorName).filter(Boolean))).sort()

  const selectedDateLabel = parseDateKey(selectedDate).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
      )}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">{successMessage}</div>
      )}

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <div>
          <AppointmentCalendar
            appointments={allAppointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            title="Appointments Calendar"
            compact
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Patients on Selected Date</h2>
          <p className="text-xs text-gray-500 mb-4">{selectedDateLabel}</p>
          <p className="text-xs font-medium text-amber-700 mb-3">{selectedDateAppointmentsCount} appointments</p>
          {selectedDatePatients.length === 0 ? (
            <p className="text-sm text-gray-500">No patients scheduled on this date.</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {selectedDatePatients.map((patient) => (
                <div key={patient.id} className="rounded-lg border border-gray-200 p-3 hover:border-amber-300 transition-colors">
                  <p className="font-medium text-gray-900 text-sm">{patient.patientName}</p>
                  <p className="text-xs text-gray-600 mt-1">{patient.time} · {patient.doctorName}</p>
                  <p className="text-xs text-amber-700 mt-1">{patient.treatment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search patients, doctors, or treatments..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFilter(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-amber-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                {[searchTerm, filters.status !== 'all', filters.doctor !== 'all', filters.timeSlot !== 'all', !!filters.date, filters.sortBy !== 'newest'].filter(Boolean).length}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAppointments.map((appointment) => (
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
          doctorOptions={doctorOptions}
        />
      )}
    </div>
  )
}

export default Appointments