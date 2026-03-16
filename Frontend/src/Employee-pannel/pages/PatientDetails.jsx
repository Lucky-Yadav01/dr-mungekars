import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dataService from '../../utils/dataService'
import AppointmentModal from '../Components/AppointmentModal'

const formatDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

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
  return formatDateKey(parsed)
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

const getPatientRelatedAppointments = (patientData) => {
  const allAppointments = dataService.getAppointments()
  const email = patientData.email?.trim().toLowerCase()
  const phone = patientData.phone?.trim()
  const name = patientData.name?.trim().toLowerCase()

  return allAppointments.filter((appointment) => {
    const appointmentEmail = appointment.patientEmail?.trim().toLowerCase()
    const appointmentPhone = appointment.phone?.trim()
    const appointmentName = appointment.patientName?.trim().toLowerCase()
    return (
      appointment.linkedPatientId === patientData.id ||
      (email && appointmentEmail === email) ||
      (phone && appointmentPhone === phone) ||
      (name && appointmentName === name)
    )
  })
}

const PatientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [editingSection, setEditingSection] = useState(null)
  const [showMedicineForm, setShowMedicineForm] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [appointmentDraft, setAppointmentDraft] = useState(null)
  
  // Form states
  const [personalInfo, setPersonalInfo] = useState({})
  const [medicalHistory, setMedicalHistory] = useState([])
  const [emergencyContact, setEmergencyContact] = useState({})
  const [insuranceInfo, setInsuranceInfo] = useState({})
  const [notes, setNotes] = useState('')
  const [patientDocuments, setPatientDocuments] = useState([])
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    startDate: '',
    instructions: '',
    prescribedBy: '',
    appointmentId: ''
  })

  useEffect(() => {
    fetchPatientDetails()
  }, [id])

  useEffect(() => {
    const refreshPatientDetails = () => fetchPatientDetails()

    window.addEventListener('appointmentCreated', refreshPatientDetails)
    window.addEventListener('appointmentUpdated', refreshPatientDetails)
    window.addEventListener('patientHistoryUpdate', refreshPatientDetails)
    window.addEventListener('patientAppointmentUpdate', refreshPatientDetails)

    return () => {
      window.removeEventListener('appointmentCreated', refreshPatientDetails)
      window.removeEventListener('appointmentUpdated', refreshPatientDetails)
      window.removeEventListener('patientHistoryUpdate', refreshPatientDetails)
      window.removeEventListener('patientAppointmentUpdate', refreshPatientDetails)
    }
  }, [id])

  const fetchPatientDetails = async () => {
    try {
      setLoading(true)
      setError('')
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/patients/${id}`)
      // const patientData = await response.json()
      
      // Mock implementation using dataService
      const patients = dataService.getPatients()
      const patientData = patients.find(p => p.id === parseInt(id))
      
      if (!patientData) {
        setError('Patient not found')
        setLoading(false)
        return
      }

      // Get patient appointments
      const appointments = getPatientRelatedAppointments(patientData)
      
      // Get patient medicines
      const medicines = dataService.getPatientMedicines(patientData.id)
      
      // Get patient visits
      const visits = dataService.getPatientVisits().filter(visit => 
        visit.patientId === patientData.id || 
        visit.patientName === patientData.name
      )

      const allPatientDocuments = JSON.parse(localStorage.getItem('patientDocuments') || '{}')
      const documents = allPatientDocuments[patientData.id] || []

      const enrichedPatient = {
        ...patientData,
        appointments: appointments.sort((a, b) => new Date(b.date) - new Date(a.date)),
        medicines: medicines || [],
        visits: visits.sort((a, b) => new Date(b.date) - new Date(a.date)),
        documents,
      }

      const now = new Date()

      const completedAppointmentDates = enrichedPatient.appointments
        .filter((appointment) => {
          const appointmentDateTime = getAppointmentDateTime(appointment)
          return appointmentDateTime && appointmentDateTime <= now && appointment.status !== 'cancelled'
        })
        .map((appointment) => {
          const dateKey = getDateKey(appointment.date)
          if (!dateKey) return null
          return `${dateKey}-${appointment.time || '00:00'}`
        })

      const recordedVisitDates = enrichedPatient.visits.map((visit) => {
        const visitDateKey = getDateKey(visit.date)
        if (!visitDateKey) return null
        const visitTime = visit.time || '00:00'
        return `${visitDateKey}-${visitTime}`
      })

      const unifiedVisitRecords = [...completedAppointmentDates, ...recordedVisitDates].filter(Boolean)
      const uniqueVisitRecords = new Set(unifiedVisitRecords)
      const visitDateKeys = [...uniqueVisitRecords].map((record) => record.split('-').slice(0, 3).join('-'))
      const derivedLastVisit = visitDateKeys.length
        ? visitDateKeys.sort((a, b) => parseDateKey(b) - parseDateKey(a))[0]
        : null

      enrichedPatient.totalVisits = uniqueVisitRecords.size
      enrichedPatient.lastVisit = derivedLastVisit

      setPatient(enrichedPatient)
      setPersonalInfo({
        name: enrichedPatient.name,
        email: enrichedPatient.email,
        phone: enrichedPatient.phone,
        dateOfBirth: enrichedPatient.dateOfBirth || '',
        gender: enrichedPatient.gender,
        address: enrichedPatient.address
      })
      setMedicalHistory(enrichedPatient.medicalHistory || [])
      setEmergencyContact({
        name: enrichedPatient.emergencyContactName || '',
        phone: enrichedPatient.emergencyContact || '',
        relationship: enrichedPatient.emergencyContactRelation || ''
      })
      setInsuranceInfo({
        provider: enrichedPatient.insuranceProvider || '',
        policyNumber: enrichedPatient.insurancePolicyNumber || '',
        expiryDate: enrichedPatient.insuranceExpiry || ''
      })
      setNotes(enrichedPatient.notes || '')
      setPatientDocuments(documents)
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching patient details:', error)
      setError('Failed to load patient details. Please try again.')
      setLoading(false)
    }
  }

  const handleSaveSection = async (section) => {
    try {
      setError('')
      
      let updateData = {}
      
      switch (section) {
        case 'personal':
          updateData = { ...personalInfo }
          break
        case 'medical':
          updateData = { medicalHistory }
          break
        case 'emergency':
          updateData = {
            emergencyContactName: emergencyContact.name,
            emergencyContact: emergencyContact.phone,
            emergencyContactRelation: emergencyContact.relationship
          }
          break
        case 'insurance':
          updateData = {
            insuranceProvider: insuranceInfo.provider,
            insurancePolicyNumber: insuranceInfo.policyNumber,
            insuranceExpiry: insuranceInfo.expiryDate
          }
          break
        case 'notes':
          updateData = { notes }
          break
        default:
          return
      }

      // TODO: Replace with actual API call
      // await fetch(`/api/admin/patients/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updateData)
      // })

      // Update using dataService
      const patients = dataService.getPatients()
      const updatedPatients = patients.map(p => 
        p.id === parseInt(id) ? { ...p, ...updateData } : p
      )
      dataService.savePatients(updatedPatients)

      // Refresh patient data
      await fetchPatientDetails()
      
      setEditingSection(null)
      setSuccessMessage(`${section.charAt(0).toUpperCase() + section.slice(1)} information updated successfully!`)
      setTimeout(() => setSuccessMessage(''), 3000)
      
    } catch (error) {
      console.error('Error updating patient:', error)
      setError('Failed to update patient information. Please try again.')
    }
  }

  const handleAddMedicine = async () => {
    try {
      setError('')
      
      if (!newMedicine.name || !newMedicine.dosage || !newMedicine.frequency) {
        setError('Please fill in medicine name, dosage, and frequency')
        return
      }

      const medicineData = {
        id: Date.now(),
        patientId: parseInt(id),
        ...newMedicine,
        prescribedDate: new Date().toISOString(),
        status: 'active'
      }

      // TODO: Replace with actual API call
      // await fetch(`/api/admin/patients/${id}/medicines`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(medicineData)
      // })

      // Add using dataService
      dataService.addPatientMedicine(medicineData)

      // Reset form
      setNewMedicine({
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        startDate: '',
        instructions: '',
        prescribedBy: '',
        appointmentId: ''
      })
      
      setShowMedicineForm(false)
      await fetchPatientDetails()
      
      setSuccessMessage('Medicine added successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
      
    } catch (error) {
      console.error('Error adding medicine:', error)
      setError('Failed to add medicine. Please try again.')
    }
  }

  const handleRemoveMedicine = async (medicineId) => {
    try {
      if (!window.confirm('Are you sure you want to remove this medicine?')) return

      // TODO: Replace with actual API call
      // await fetch(`/api/admin/medicines/${medicineId}`, { method: 'DELETE' })

      // Remove using dataService
      dataService.removePatientMedicine(medicineId)
      
      await fetchPatientDetails()
      setSuccessMessage('Medicine removed successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
      
    } catch (error) {
      console.error('Error removing medicine:', error)
      setError('Failed to remove medicine. Please try again.')
    }
  }

  const addMedicalCondition = () => {
    const condition = prompt('Enter medical condition:')
    if (condition && condition.trim()) {
      setMedicalHistory(prev => [...prev, condition.trim()])
    }
  }

  const removeMedicalCondition = (index) => {
    setMedicalHistory(prev => prev.filter((_, i) => i !== index))
  }

  const handleUploadDocuments = (event, category) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0 || !patient?.id) return

    const newDocuments = files.map((file, index) => ({
      id: Date.now() + index,
      category,
      name: file.name,
      size: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
    }))

    const allPatientDocuments = JSON.parse(localStorage.getItem('patientDocuments') || '{}')
    const existingDocuments = allPatientDocuments[patient.id] || []
    const updatedDocuments = [...existingDocuments, ...newDocuments]

    localStorage.setItem(
      'patientDocuments',
      JSON.stringify({
        ...allPatientDocuments,
        [patient.id]: updatedDocuments,
      })
    )

    setPatientDocuments(updatedDocuments)
    setSuccessMessage(`${category === 'xray' ? 'X-ray' : 'Report'} uploaded successfully!`)
    setTimeout(() => setSuccessMessage(''), 3000)
    event.target.value = ''
  }

  const handleRemoveDocument = (documentId) => {
    if (!patient?.id) return

    const allPatientDocuments = JSON.parse(localStorage.getItem('patientDocuments') || '{}')
    const existingDocuments = allPatientDocuments[patient.id] || []
    const updatedDocuments = existingDocuments.filter((doc) => doc.id !== documentId)

    localStorage.setItem(
      'patientDocuments',
      JSON.stringify({
        ...allPatientDocuments,
        [patient.id]: updatedDocuments,
      })
    )

    setPatientDocuments(updatedDocuments)
    setSuccessMessage('Document removed successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleDeletePatient = () => {
    if (!patient?.id) return
    const confirmDelete = window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')
    if (!confirmDelete) return

    const updatedPatients = dataService.getPatients().filter((existingPatient) => existingPatient.id !== patient.id)
    dataService.savePatients(updatedPatients)

    const existingAppointments = dataService.getAppointments()
    const updatedAppointments = existingAppointments.filter((appointment) => {
      const patientEmail = patient.email?.trim().toLowerCase()
      const appointmentEmail = appointment.patientEmail?.trim().toLowerCase()
      return appointment.linkedPatientId !== patient.id && (!patientEmail || appointmentEmail !== patientEmail)
    })
    dataService.saveAppointments(updatedAppointments)

    const existingMedicines = dataService.getPatientMedicines()
    const filteredMedicines = existingMedicines.filter((medicine) => medicine.patientId !== patient.id)
    localStorage.setItem('patientMedicines', JSON.stringify(filteredMedicines))

    const allPatientDocuments = JSON.parse(localStorage.getItem('patientDocuments') || '{}')
    delete allPatientDocuments[patient.id]
    localStorage.setItem('patientDocuments', JSON.stringify(allPatientDocuments))

    navigate('/admin/patients')
  }

  const openAddAppointmentModal = () => {
    if (!patient) return
    const defaultDate = formatDateKey(new Date())
    setAppointmentDraft({
      patientName: patient.name || '',
      patientEmail: patient.email || '',
      phone: patient.phone || '',
      doctorName: 'Dr. Siddhesh Mungekar',
      treatment: 'Consultation',
      date: defaultDate,
      time: '10:00',
      duration: '30 min',
      status: 'scheduled',
      notes: '',
      source: 'existing-patient',
      linkedPatientId: patient.id,
      isLinkedToExistingPatient: true,
    })
    setShowAppointmentModal(true)
  }

  const handleSaveAppointment = async (appointmentData) => {
    try {
      const existingAppointments = dataService.getAppointments()
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000)

      const newAppointment = {
        id: uniqueId,
        appointmentNumber: appointmentData.appointmentNumber || `APT${String(uniqueId).slice(-6)}`,
        ...appointmentData,
        source: 'existing-patient',
        linkedPatientId: patient.id,
        isLinkedToExistingPatient: true,
        createdAt: new Date().toISOString(),
      }

      dataService.saveAppointments([...existingAppointments, newAppointment])
      dataService.updatePatientAppointments(patient.id, newAppointment)
      dataService.broadcastEvent('appointmentCreated', { appointment: newAppointment })

      setShowAppointmentModal(false)
      setAppointmentDraft(null)
      await fetchPatientDetails()
      setSuccessMessage('Appointment added successfully for this patient!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (saveError) {
      console.error('Error creating appointment from patient details:', saveError)
      setError('Failed to create appointment. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        <p className="ml-3 text-gray-600">Loading patient details...</p>
      </div>
    )
  }

  if (error && !patient) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate('/admin/patients')}
          className="text-amber-600 hover:text-amber-700 underline"
        >
          Back to Patients
        </button>
      </div>
    )
  }

  const dynamicAge = calculateAgeFromDateOfBirth(patient?.dateOfBirth)

  return (
    <>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/patients')}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Patients
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient?.name}</h1>
            <p className="text-gray-600">Patient ID: {patient?.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openAddAppointmentModal}
            className="px-4 py-2 text-sm rounded-lg border border-amber-500 text-amber-700 hover:bg-amber-50 transition-colors"
          >
            Add Appointment
          </button>
          <button
            onClick={handleDeletePatient}
            className="px-4 py-2 text-sm rounded-lg border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
          >
            Delete Patient
          </button>
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-amber-600 font-medium text-lg">
              {patient?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal & Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              <button
                onClick={() => setEditingSection(editingSection === 'personal' ? null : 'personal')}
                className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {editingSection === 'personal' ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {editingSection === 'personal' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={personalInfo.dateOfBirth || ''}
                    onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    max={formatDateKey(new Date())}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={personalInfo.gender}
                    onChange={(e) => setPersonalInfo({...personalInfo, gender: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <button
                    onClick={() => handleSaveSection('personal')}
                    className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Full Name:</span>
                  <p className="font-medium">{patient?.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{patient?.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium">{patient?.phone}</p>
                </div>
                <div>
                  <span className="text-gray-600">Age:</span>
                  <p className="font-medium">{dynamicAge !== null ? `${dynamicAge} years` : 'Not set'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Date of Birth:</span>
                  <p className="font-medium">{patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'Not set'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Gender:</span>
                  <p className="font-medium">{patient?.gender}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-600">Address:</span>
                  <p className="font-medium">{patient?.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Medical History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Medical History & Allergies</h2>
              <button
                onClick={() => setEditingSection(editingSection === 'medical' ? null : 'medical')}
                className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {editingSection === 'medical' ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            <div className="space-y-2">
              {medicalHistory.length === 0 ? (
                <p className="text-gray-500 text-sm">No medical conditions recorded</p>
              ) : (
                medicalHistory.map((condition, index) => (
                  <div key={index} className="flex items-center justify-between bg-red-50 px-3 py-2 rounded-lg">
                    <span className="text-red-800 font-medium">{condition}</span>
                    {editingSection === 'medical' && (
                      <button
                        onClick={() => removeMedicalCondition(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
            
            {editingSection === 'medical' && (
              <div className="mt-4 space-y-3">
                <button
                  onClick={addMedicalCondition}
                  className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Medical Condition
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveSection('medical')}
                    className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prescribed Medicines */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Prescribed Medicines</h2>
              <button
                onClick={() => setShowMedicineForm(!showMedicineForm)}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Medicine
              </button>
            </div>

            {showMedicineForm && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-gray-900 mb-3">Add New Medicine</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name *</label>
                    <input
                      type="text"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter medicine name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage *</label>
                    <input
                      type="text"
                      value={newMedicine.dosage}
                      onChange={(e) => setNewMedicine({...newMedicine, dosage: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
                    <select
                      value={newMedicine.frequency}
                      onChange={(e) => setNewMedicine({...newMedicine, frequency: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Four times daily">Four times daily</option>
                      <option value="As needed">As needed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newMedicine.duration}
                      onChange={(e) => setNewMedicine({...newMedicine, duration: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., 7 days"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newMedicine.startDate}
                      onChange={(e) => setNewMedicine({...newMedicine, startDate: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prescribed By</label>
                    <select
                      value={newMedicine.prescribedBy}
                      onChange={(e) => setNewMedicine({...newMedicine, prescribedBy: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select doctor</option>
                      <option value="Dr. Siddhesh Mungekar">Dr. Siddhesh Mungekar</option>
                      <option value="Dr. Sunita Mungekar">Dr. Sunita Mungekar</option>
                      <option value="Lucky Yadav">Lucky Yadav</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                    <textarea
                      value={newMedicine.instructions}
                      onChange={(e) => setNewMedicine({...newMedicine, instructions: e.target.value})}
                      rows="2"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g., Take after meals"
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <button
                      onClick={handleAddMedicine}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Add Medicine
                    </button>
                    <button
                      onClick={() => setShowMedicineForm(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {patient?.medicines && patient.medicines.length > 0 ? (
                patient.medicines.map((medicine) => (
                  <div key={medicine.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{medicine.name}</h4>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {medicine.status || 'Active'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div><span className="font-medium">Dosage:</span> {medicine.dosage}</div>
                          <div><span className="font-medium">Frequency:</span> {medicine.frequency}</div>
                          <div><span className="font-medium">Duration:</span> {medicine.duration}</div>
                          {medicine.startDate && <div><span className="font-medium">Start Date:</span> {new Date(medicine.startDate).toLocaleDateString()}</div>}
                          {medicine.prescribedBy && <div><span className="font-medium">Prescribed By:</span> {medicine.prescribedBy}</div>}
                          {medicine.prescribedDate && <div><span className="font-medium">Prescribed On:</span> {new Date(medicine.prescribedDate).toLocaleDateString()}</div>}
                        </div>
                        {medicine.instructions && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Instructions:</span> {medicine.instructions}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveMedicine(medicine.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove medicine"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No medicines prescribed yet</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column - Quick Info & History */}
        <div className="space-y-6">
          
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Visits:</span>
                <span className="font-medium">{patient?.totalVisits || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Visit:</span>
                <span className="font-medium">
                  {patient?.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'Never'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Appointments:</span>
                <span className="font-medium">{patient?.appointments?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Medicines:</span>
                <span className="font-medium">
                  {patient?.medicines?.filter(m => m.status === 'active').length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
              <button
                onClick={() => setEditingSection(editingSection === 'emergency' ? null : 'emergency')}
                className="text-amber-600 hover:text-amber-700 text-sm"
              >
                {editingSection === 'emergency' ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {editingSection === 'emergency' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={emergencyContact.name}
                    onChange={(e) => setEmergencyContact({...emergencyContact, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={emergencyContact.phone}
                    onChange={(e) => setEmergencyContact({...emergencyContact, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <input
                    type="text"
                    value={emergencyContact.relationship}
                    onChange={(e) => setEmergencyContact({...emergencyContact, relationship: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g., Spouse, Parent"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveSection('emergency')}
                    className="bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{emergencyContact.name || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium">{emergencyContact.phone || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Relationship:</span>
                  <p className="font-medium">{emergencyContact.relationship || 'Not provided'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Insurance Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Insurance</h3>
              <button
                onClick={() => setEditingSection(editingSection === 'insurance' ? null : 'insurance')}
                className="text-amber-600 hover:text-amber-700 text-sm"
              >
                {editingSection === 'insurance' ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {editingSection === 'insurance' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                  <input
                    type="text"
                    value={insuranceInfo.provider}
                    onChange={(e) => setInsuranceInfo({...insuranceInfo, provider: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                  <input
                    type="text"
                    value={insuranceInfo.policyNumber}
                    onChange={(e) => setInsuranceInfo({...insuranceInfo, policyNumber: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={insuranceInfo.expiryDate}
                    onChange={(e) => setInsuranceInfo({...insuranceInfo, expiryDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveSection('insurance')}
                    className="bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Provider:</span>
                  <p className="font-medium">{insuranceInfo.provider || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Policy Number:</span>
                  <p className="font-medium">{insuranceInfo.policyNumber || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Expiry Date:</span>
                  <p className="font-medium">
                    {insuranceInfo.expiryDate ? new Date(insuranceInfo.expiryDate).toLocaleDateString() : 'Not provided'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
              <button
                onClick={() => setEditingSection(editingSection === 'notes' ? null : 'notes')}
                className="text-amber-600 hover:text-amber-700 text-sm"
              >
                {editingSection === 'notes' ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {editingSection === 'notes' ? (
              <div className="space-y-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Add any additional notes about this patient..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveSection('notes')}
                    className="bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingSection(null)}
                    className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                {notes || 'No additional notes'}
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">X-rays & Reports</h3>
              <span className="text-xs text-gray-500">{patientDocuments.length} files</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <label className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50/50 cursor-pointer transition-colors text-sm font-medium text-gray-700">
                Upload X-ray
                <input
                  type="file"
                  accept="image/*,.dcm"
                  multiple
                  className="hidden"
                  onChange={(event) => handleUploadDocuments(event, 'xray')}
                />
              </label>

              <label className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50/50 cursor-pointer transition-colors text-sm font-medium text-gray-700">
                Upload Report
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => handleUploadDocuments(event, 'report')}
                />
              </label>
            </div>

            {patientDocuments.length === 0 ? (
              <p className="text-sm text-gray-500">No X-rays or reports uploaded yet.</p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {patientDocuments
                  .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
                  .map((document) => (
                    <div key={document.id} className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{document.name}</p>
                        <p className="text-xs text-gray-500">
                          {document.category === 'xray' ? 'X-ray' : 'Report'} · {(document.size / 1024).toFixed(1)} KB · {new Date(document.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveDocument(document.id)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Appointment History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patient?.appointments && patient.appointments.length > 0 ? (
                patient.appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.doctorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.treatment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${{
                        'completed': 'bg-green-100 text-green-800',
                        'confirmed': 'bg-blue-100 text-blue-800',
                        'scheduled': 'bg-yellow-100 text-yellow-800',
                        'cancelled': 'bg-red-100 text-red-800'
                      }[appointment.status] || 'bg-gray-100 text-gray-800'}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {appointment.notes || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>

    {showAppointmentModal && (
      <AppointmentModal
        appointment={appointmentDraft}
        onClose={() => {
          setShowAppointmentModal(false)
          setAppointmentDraft(null)
        }}
        onSave={handleSaveAppointment}
      />
    )}
    </>
  )
}

export default PatientDetails