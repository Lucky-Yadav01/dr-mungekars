import React from 'react'

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
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
          <h3 className="text-lg font-medium text-gray-900 mb-3">Treatment History</h3>
          <div className="text-center py-8 text-gray-500">
            <p>Treatment history details will be shown here</p>
            <p className="text-sm">Integration with medical records needed</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PatientDetailsModal