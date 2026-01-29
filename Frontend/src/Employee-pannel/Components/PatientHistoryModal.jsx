import React, { useState, useEffect } from 'react'

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-yellow-50">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

const PatientHistoryModal = ({ patient, onClose }) => {
  const [visitHistory, setVisitHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('visits')

  useEffect(() => {
    loadPatientHistory()
  }, [patient])

  const loadPatientHistory = async () => {
    try {
      setLoading(true)
      
      // In a real app, this would be an API call
      // const response = await fetch(`/api/patients/${patient.id}/history`)
      // const data = await response.json()
      
      // For demo, load from localStorage and filter by patient
      const allVisits = JSON.parse(localStorage.getItem('patientVisits') || '[]')
      const patientVisits = allVisits.filter(visit => 
        visit.patientName === patient.name || 
        (patient.phone && visit.phone === patient.phone)
      )
      
      // Sort by date (newest first)
      const sortedVisits = patientVisits.sort((a, b) => new Date(b.date) - new Date(a.date))
      
      setVisitHistory(sortedVisits)
      setLoading(false)
    } catch (error) {
      console.error('Error loading patient history:', error)
      setLoading(false)
    }
  }

  const getTreatmentColor = (treatment) => {
    switch (treatment?.toLowerCase()) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800'
      case 'cleaning':
        return 'bg-green-100 text-green-800'
      case 'filling':
        return 'bg-yellow-100 text-yellow-800'
      case 'root canal':
        return 'bg-red-100 text-red-800'
      case 'extraction':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Modal title={`${patient.name} - Medical History`} onClose={onClose}>
      <div className="space-y-6">
        {/* Patient Summary */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{visitHistory.length}</div>
              <div className="text-sm text-gray-600">Total Visits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {visitHistory.length > 0 ? new Date(visitHistory[0].date).toLocaleDateString() : 'Never'}
              </div>
              <div className="text-sm text-gray-600">Last Visit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">
                {patient.age} years
              </div>
              <div className="text-sm text-gray-600">Age</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 capitalize">{patient.status}</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('visits')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'visits'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Visit History ({visitHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('treatments')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'treatments'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Treatments
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notes'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Medical Notes
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading patient history...</p>
            </div>
          ) : (
            <>
              {activeTab === 'visits' && (
                <div className="space-y-4">
                  {visitHistory.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
                      </svg>
                      <p className="text-lg font-medium">No visit history found</p>
                      <p>Patient visits will appear here after appointments are completed</p>
                    </div>
                  ) : (
                    visitHistory.map((visit, index) => (
                      <div key={visit.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {visit.appointmentNumber ? `#${visit.appointmentNumber}` : 'Visit'} - {visit.treatment}
                            </h4>
                            <p className="text-sm text-gray-600">Dr. {visit.doctor}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{new Date(visit.date).toLocaleDateString()}</div>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTreatmentColor(visit.treatment)}`}>
                              {visit.treatment}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Duration:</span> {visit.duration || 'Not specified'}
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span> 
                            <span className="ml-1 capitalize font-medium text-green-600">{visit.status}</span>
                          </div>
                        </div>
                        
                        {visit.notes && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600"><strong>Notes:</strong> {visit.notes}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'treatments' && (
                <div className="space-y-4">
                  {visitHistory.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No treatment history available</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...new Set(visitHistory.map(v => v.treatment))].map(treatment => {
                        const treatmentVisits = visitHistory.filter(v => v.treatment === treatment)
                        return (
                          <div key={treatment} className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{treatment}</h4>
                            <div className="text-sm text-gray-600">
                              <p>Visits: {treatmentVisits.length}</p>
                              <p>Last: {new Date(treatmentVisits[0].date).toLocaleDateString()}</p>
                              <p>Doctors: {[...new Set(treatmentVisits.map(v => v.doctor))].join(', ')}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  {patient.medicalHistory && patient.medicalHistory.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Medical History</h4>
                      <ul className="list-disc list-inside text-sm text-blue-800">
                        {Array.isArray(patient.medicalHistory) 
                          ? patient.medicalHistory.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))
                          : <li>{patient.medicalHistory}</li>
                        }
                      </ul>
                    </div>
                  )}

                  {patient.allergies && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Allergies</h4>
                      <p className="text-sm text-red-800">{patient.allergies}</p>
                    </div>
                  )}

                  {patient.medications && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Current Medications</h4>
                      <p className="text-sm text-green-800">{patient.medications}</p>
                    </div>
                  )}

                  {visitHistory.filter(v => v.notes).length > 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Visit Notes</h4>
                      <div className="space-y-3">
                        {visitHistory.filter(v => v.notes).map((visit, index) => (
                          <div key={index} className="text-sm">
                            <div className="font-medium text-gray-900">
                              {new Date(visit.date).toLocaleDateString()} - {visit.treatment}
                            </div>
                            <div className="text-gray-600 mt-1">{visit.notes}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(!patient.medicalHistory || patient.medicalHistory.length === 0) && 
                   !patient.allergies && !patient.medications && 
                   visitHistory.filter(v => v.notes).length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <p>No medical notes available</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default PatientHistoryModal