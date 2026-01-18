import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PatientCard from '../Components/PatientCard'
import PatientModal from '../Components/PatientModal'
import PatientDetailsModal from '../Components/PatientDetailsModal'

const Patients = () => {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchPatients()
  }, [])

  // CRUD Operations
  const fetchPatients = async () => {
    try {
      setLoading(true)
      setError('')
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/patients?search=${searchTerm}`)
      // const data = await response.json()
      
      setTimeout(() => {
        const mockPatients = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+91 98765 43210',
            age: 35,
            gender: 'Male',
            address: '123 Main Street, Mumbai',
            lastVisit: '2024-01-15',
            nextAppointment: '2024-02-15',
            totalVisits: 12,
            status: 'active',
            medicalHistory: ['Hypertension', 'Dental Anxiety'],
            emergencyContact: '+91 98765 43299'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            phone: '+91 98765 43211',
            age: 28,
            gender: 'Female',
            address: '456 Oak Avenue, Mumbai',
            lastVisit: '2024-01-10',
            nextAppointment: '2024-02-20',
            totalVisits: 8,
            status: 'active',
            medicalHistory: ['Diabetes'],
            emergencyContact: '+91 98765 43288'
          },
          {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@email.com',
            phone: '+91 98765 43212',
            age: 42,
            gender: 'Male',
            address: '789 Pine Street, Mumbai',
            lastVisit: '2024-01-12',
            nextAppointment: null,
            totalVisits: 15,
            status: 'active',
            medicalHistory: [],
            emergencyContact: '+91 98765 43277'
          }
        ]
        setPatients(mockPatients)
        setLoading(false)
      }, 800)
    } catch (error) {
      console.error('Error fetching patients:', error)
      setError('Failed to load patients. Please try again.')
      setLoading(false)
    }
  }

  const createPatient = async (patientData) => {
    try {
      setError('')
      // TODO: Replace with actual API call
      // const response = await fetch('/api/admin/patients', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(patientData)
      // })
      // const newPatient = await response.json()
      
      const newPatient = {
        id: Date.now(),
        ...patientData,
        status: 'active',
        totalVisits: 0
      }
      
      setPatients(prev => [...prev, newPatient])
      setSuccessMessage('Patient created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
      return newPatient
    } catch (error) {
      console.error('Error creating patient:', error)
      setError('Failed to create patient. Please try again.')
      throw error
    }
  }

  const updatePatient = async (patientId, updates) => {
    try {
      setError('')
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/patients/${patientId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // })
      
      setPatients(prev => prev.map(patient => 
        patient.id === patientId ? { ...patient, ...updates } : patient
      ))
      setSuccessMessage('Patient updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error updating patient:', error)
      setError('Failed to update patient. Please try again.')
      throw error
    }
  }

  // Patient History Management
  const addPatientVisitHistory = async (patientId, visitData) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/patients/${patientId}/history`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(visitData)
      // })
      
      setPatients(prev => prev.map(patient => {
        if (patient.id === patientId) {
          const visitHistory = patient.visitHistory || []
          const updatedHistory = [...visitHistory, visitData]
          
          return {
            ...patient,
            visitHistory: updatedHistory,
            lastVisit: visitData.date,
            totalVisits: updatedHistory.length,
            treatmentHistory: [...(patient.treatmentHistory || []), {
              id: Date.now(),
              date: visitData.date,
              treatment: visitData.treatment,
              doctor: visitData.doctor,
              notes: visitData.notes,
              diagnosis: visitData.diagnosis || '',
              prescription: visitData.prescription || '',
              nextVisitDate: visitData.nextVisitDate || null
            }]
          }
        }
        return patient
      }))
      
      console.log(`Patient ${patientId} history updated with visit:`, visitData)
    } catch (error) {
      console.error('Error adding patient visit history:', error)
    }
  }

  // Function to be called when appointment is completed
  const updatePatientFromCompletedAppointment = async (appointmentData) => {
    try {
      // Find patient by name or phone
      const patient = patients.find(p => 
        p.name === appointmentData.patientName || 
        p.phone === appointmentData.phone
      )
      
      if (patient) {
        const visitData = {
          id: Date.now(),
          date: appointmentData.date,
          treatment: appointmentData.treatment,
          doctor: appointmentData.doctorName,
          appointmentId: appointmentData.id,
          appointmentNumber: appointmentData.appointmentNumber,
          notes: appointmentData.notes || '',
          duration: appointmentData.duration,
          status: 'completed'
        }
        
        await addPatientVisitHistory(patient.id, visitData)
        setSuccessMessage(`Patient history updated for ${patient.name}`)
      } else {
        console.warn('Patient not found for appointment:', appointmentData.patientName)
      }
    } catch (error) {
      console.error('Error updating patient from completed appointment:', error)
    }
  }

  const deletePatient = async (patientId) => {
    try {
      setError('')
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/patients/${patientId}`, { method: 'DELETE' })
      
      setPatients(prev => prev.filter(patient => patient.id !== patientId))
      setSuccessMessage('Patient deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting patient:', error)
      setError('Failed to delete patient. Please try again.')
      throw error
    }
  }

  const handleSavePatient = async (patientData) => {
    try {
      if (selectedPatient) {
        await updatePatient(selectedPatient.id, patientData)
      } else {
        await createPatient(patientData)
      }
      // Modal state is managed by the modal component itself
      setShowAddModal(false)
      setSelectedPatient(null)
    } catch (error) {
      // Error already handled in CRUD functions
      console.error('Error saving patient:', error)
    }
  }

  const handleDeletePatient = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      await deletePatient(patientId)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  )

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
          <h1 className="text-2xl font-bold text-gray-900">Patient Records</h1>
          <p className="text-gray-600">Manage patient information and history</p>
        </div>
        <button
          onClick={() => {
            setSelectedPatient(null)
            setShowAddModal(true)
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full sm:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Patient
        </button>
      </div>

      {/* Search - Responsive */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search patients by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Patients Grid - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading patients...</p>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p>No patients found</p>
            <button
              onClick={() => {
                setSelectedPatient(null)
                setShowAddModal(true)
              }}
              className="mt-4 text-amber-600 hover:text-amber-700 underline"
            >
              Add the first patient
            </button>
          </div>
        ) : (
          filteredPatients.map(patient => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onClick={() => {
                setSelectedPatient(patient)
                setShowDetailsModal(true)
              }}
              onEdit={() => {
                setSelectedPatient(patient)
                setShowAddModal(true)
              }}
              onDelete={() => handleDeletePatient(patient.id)}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => {
            setShowAddModal(false)
            setSelectedPatient(null)
          }}
          onSave={handleSavePatient}
        />
      )}

      {showDetailsModal && selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedPatient(null)
          }}
          onEdit={() => {
            setShowDetailsModal(false)
            setShowAddModal(true)
          }}
        />
      )}
    </div>
  )
}

export default Patients