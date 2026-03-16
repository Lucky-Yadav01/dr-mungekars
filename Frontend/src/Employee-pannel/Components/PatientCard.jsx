import React, { useState, useEffect } from 'react'
import dataService from '../../utils/dataService'

const parseDateKey = (dateKey) => {
  const [year, month, day] = (dateKey || '').split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

const getDateKey = (value) => {
  if (!value) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getAppointmentDateTime = (appointment) => {
  const date = parseDateKey(appointment?.date)
  if (!date) return null
  const [hours = 0, minutes = 0] = (appointment?.time || '00:00').split(':').map(Number)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
}

const calculateAgeFromDateOfBirth = (dateOfBirth) => {
  if (!dateOfBirth) return null
  const birthDate = new Date(dateOfBirth)
  if (Number.isNaN(birthDate.getTime())) return null

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }
  return age >= 0 ? age : null
}

const PatientCard = ({ patient, onClick }) => {
  const [visitCount, setVisitCount] = useState(patient.totalVisits || 0)
  const [lastVisitDate, setLastVisitDate] = useState(patient.lastVisit)
  const [nextAppointment, setNextAppointment] = useState(null)

  const getPatientAppointments = () => {
    const appointments = dataService.getAppointments()
    const patientEmail = patient.email?.trim().toLowerCase()
    const patientPhone = patient.phone?.trim()
    const patientName = patient.name?.trim().toLowerCase()
    return appointments.filter((appointment) => {
      const appointmentEmail = appointment.patientEmail?.trim().toLowerCase()
      const appointmentPhone = appointment.phone?.trim()
      const appointmentName = appointment.patientName?.trim().toLowerCase()
      return (
        appointment.linkedPatientId === patient.id ||
        (patientEmail && appointmentEmail === patientEmail) ||
        (patientPhone && appointmentPhone === patientPhone) ||
        (patientName && appointmentName === patientName)
      )
    })
  }

  const calculateAppointmentDates = () => {
    const patientAppointments = getPatientAppointments()
    
    if (patientAppointments.length === 0) {
      setNextAppointment(null)
      return
    }

    const now = new Date()
    
    // Find future appointments (next appointment)
    const futureAppointments = patientAppointments
      .filter(apt => {
        const appointmentDateTime = getAppointmentDateTime(apt)
        return appointmentDateTime && appointmentDateTime > now
      })
      .sort((a, b) => getAppointmentDateTime(a) - getAppointmentDateTime(b))
    
    // Find past appointments (last appointment)
    const pastAppointments = patientAppointments
      .filter(apt => {
        const appointmentDateTime = getAppointmentDateTime(apt)
        return appointmentDateTime && appointmentDateTime <= now
      })
      .sort((a, b) => getAppointmentDateTime(b) - getAppointmentDateTime(a))
    
    setNextAppointment(futureAppointments.length > 0 ? futureAppointments[0] : null)

    const completedAppointments = patientAppointments.filter((appointment) => {
      const appointmentDateTime = getAppointmentDateTime(appointment)
      return appointmentDateTime && appointmentDateTime <= now && appointment.status !== 'cancelled'
    })

    const allVisits = dataService.getPatientVisits()
    const recordedVisits = allVisits.filter((visit) =>
      visit.patientId === patient.id ||
      visit.patientName === patient.name ||
      (patient.phone && visit.phone === patient.phone)
    )

    const unifiedVisitRecords = [
      ...completedAppointments.map((appointment) => `${getDateKey(appointment.date)}-${appointment.time || '00:00'}`),
      ...recordedVisits.map((visit) => {
        const visitDateKey = getDateKey(visit.date)
        if (!visitDateKey) return null
        const visitTime = visit.time || '00:00'
        return `${visitDateKey}-${visitTime}`
      }),
    ].filter(Boolean)

    const unifiedVisitDates = unifiedVisitRecords.map((record) => record.split('-').slice(0, 3).join('-'))

    if (unifiedVisitDates.length > 0) {
      const latestVisitDate = unifiedVisitDates.sort((a, b) => parseDateKey(b) - parseDateKey(a))[0]
      setLastVisitDate(latestVisitDate)
    } else {
      setLastVisitDate(null)
    }

    const uniqueVisitRecords = new Set(unifiedVisitRecords)
    setVisitCount(uniqueVisitRecords.size)
  }

  useEffect(() => {
    const handleDataUpdate = () => {
      calculateAppointmentDates()
    }

    window.addEventListener('patientHistoryUpdate', handleDataUpdate)
    window.addEventListener('patientAppointmentUpdate', handleDataUpdate)
    window.addEventListener('appointmentCreated', handleDataUpdate)
    window.addEventListener('appointmentUpdated', handleDataUpdate)

    calculateAppointmentDates()

    return () => {
      window.removeEventListener('patientHistoryUpdate', handleDataUpdate)
      window.removeEventListener('patientAppointmentUpdate', handleDataUpdate)
      window.removeEventListener('appointmentCreated', handleDataUpdate)
      window.removeEventListener('appointmentUpdated', handleDataUpdate)
    }
  }, [patient.id, patient.name, patient.phone, patient.email])
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const dynamicAge = calculateAgeFromDateOfBirth(patient.dateOfBirth)
  const ageToDisplay = dynamicAge ?? patient.age
  const demographics = [
    ageToDisplay !== null && ageToDisplay !== undefined && ageToDisplay !== '' ? `${ageToDisplay} years` : null,
    patient.gender || null,
  ].filter(Boolean).join(', ')

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-amber-600 font-medium text-lg">
              {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate">{patient.name}</h3>
            <p className="text-sm text-gray-600">{demographics || 'Details pending'}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{patient.phone}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
          <div>
            <p className="text-gray-600">Last Visit</p>
            <p className="font-medium">
              {lastVisitDate ? new Date(lastVisitDate).toLocaleDateString() : 'Never'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Total Visits</p>
            <p className="font-medium">{visitCount}</p>
          </div>
        </div>
        
        <div className="text-sm mb-3">
          <p className="text-gray-600">Next Appointment</p>
          {nextAppointment ? (
            <>
              <p className="font-medium text-amber-600">{new Date(nextAppointment.date).toLocaleDateString()}</p>
              <p className="text-xs text-amber-600">{nextAppointment.time}</p>
            </>
          ) : (
            <p className="font-medium text-gray-500">Not Scheduled</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
            className="flex-1 px-3 py-2 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default PatientCard