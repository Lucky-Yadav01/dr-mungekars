import React, { useState, useEffect } from 'react'

const PatientCard = ({ patient, onClick, onEdit, onDelete }) => {
  const [visitCount, setVisitCount] = useState(patient.totalVisits || 0)
  const [lastVisitDate, setLastVisitDate] = useState(patient.lastVisit)

  useEffect(() => {
    // Listen for patient history updates
    const handleHistoryUpdate = (event) => {
      if (event.detail.patientName === patient.name || 
          (patient.phone && event.detail.phone === patient.phone)) {
        // Update visit count from localStorage
        const allVisits = JSON.parse(localStorage.getItem('patientVisits') || '[]')
        const patientVisits = allVisits.filter(visit => 
          visit.patientName === patient.name || 
          (patient.phone && visit.phone === patient.phone)
        )
        setVisitCount(patientVisits.length)
        if (patientVisits.length > 0) {
          setLastVisitDate(patientVisits.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date)
        }
      }
    }

    window.addEventListener('patientHistoryUpdate', handleHistoryUpdate)
    
    // Load initial visit count from localStorage
    const allVisits = JSON.parse(localStorage.getItem('patientVisits') || '[]')
    const patientVisits = allVisits.filter(visit => 
      visit.patientName === patient.name || 
      (patient.phone && visit.phone === patient.phone)
    )
    if (patientVisits.length > 0) {
      setVisitCount(patientVisits.length)
      setLastVisitDate(patientVisits.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date)
    }

    return () => {
      window.removeEventListener('patientHistoryUpdate', handleHistoryUpdate)
    }
  }, [patient.name, patient.phone])
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
            <p className="text-sm text-gray-600">{patient.age} years, {patient.gender}</p>
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
        <div className="flex justify-between text-sm mb-3">
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
        
        {patient.nextAppointment && (
          <div className="mb-3">
            <p className="text-sm text-gray-600">Next Appointment</p>
            <p className="text-sm font-medium text-amber-600">
              {new Date(patient.nextAppointment).toLocaleDateString()}
            </p>
          </div>
        )}

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
          
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium"
              title="Edit Patient"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
              title="Delete Patient"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientCard