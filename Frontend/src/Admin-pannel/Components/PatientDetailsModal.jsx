import React, { useState, useEffect } from 'react'
import PatientHistoryModal from './PatientHistoryModal'

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

const PatientDetailsModal = ({ patient, onClose }) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [recentVisits, setRecentVisits] = useState([])

  useEffect(() => {
    loadRecentVisits()
  }, [patient])

  const loadRecentVisits = () => {
    // Load recent visits from localStorage for demo
    const allVisits = JSON.parse(localStorage.getItem('patientVisits') || '[]')
    const patientVisits = allVisits
      .filter(visit => 
        visit.patientName === patient.name || 
        (patient.phone && visit.phone === patient.phone)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3) // Show only last 3 visits
    
    setRecentVisits(patientVisits)
  }
  return (
    <Modal title={`${patient.name} - Patient Details`} onClose={onClose}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-600">Name:</span> {patient.name}</div>
              <div><span className="text-gray-600">Age:</span> {patient.age} years</div>
              <div><span className="text-gray-600">Gender:</span> {patient.gender}</div>
              <div><span className="text-gray-600">Email:</span> {patient.email}</div>
              <div><span className="text-gray-600">Phone:</span> {patient.phone}</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Medical History</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-600">Last Visit:</span> {new Date(patient.lastVisit).toLocaleDateString()}</div>
              <div><span className="text-gray-600">Total Visits:</span> {patient.totalVisits}</div>
              <div><span className="text-gray-600">Status:</span> {patient.status}</div>
              {patient.nextAppointment && (
                <div><span className="text-gray-600">Next Appointment:</span> {new Date(patient.nextAppointment).toLocaleDateString()}</div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900">Recent Treatment History</h3>
            <button
              onClick={() => setShowHistoryModal(true)}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
              </svg>
              View Full History
            </button>
          </div>
          
          {recentVisits.length > 0 ? (
            <div className="space-y-3">
              {recentVisits.map((visit, index) => (
                <div key={visit.id || index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm text-gray-900">
                        {visit.treatment} - Dr. {visit.doctor}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {new Date(visit.date).toLocaleDateString()} • {visit.duration || '30 min'}
                      </div>
                      {visit.notes && (
                        <div className="text-xs text-gray-600 mt-1 italic">
                          "{visit.notes.substring(0, 100)}{visit.notes.length > 100 ? '...' : ''}"
                        </div>
                      )}
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
              
              {recentVisits.length === 3 && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setShowHistoryModal(true)}
                    className="text-amber-600 hover:text-amber-700 text-sm"
                  >
                    View all {JSON.parse(localStorage.getItem('patientVisits') || '[]').filter(v => 
                      v.patientName === patient.name || (patient.phone && v.phone === patient.phone)
                    ).length} visits →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
              </svg>
              <p className="text-sm">No treatment history available</p>
              <p className="text-xs text-gray-400 mt-1">History will appear after appointments are completed</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Patient History Modal */}
      {showHistoryModal && (
        <PatientHistoryModal
          patient={patient}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </Modal>
  )
}

export default PatientDetailsModal