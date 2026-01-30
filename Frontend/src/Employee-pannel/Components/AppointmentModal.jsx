import React, { useState, useEffect } from 'react'
import dataService from '../../utils/dataService'

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

const AppointmentModal = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientName: appointment?.patientName || '',
    patientPhone: appointment?.phone || '',
    patientEmail: appointment?.patientEmail || '',
    appointmentDate: appointment?.date || '',
    appointmentTime: appointment?.time || '',
    treatmentType: appointment?.treatment || '',
    doctor: appointment?.doctorName || '',
    duration: appointment?.duration ? appointment.duration.replace(' min', '') : '30',
    status: appointment?.status || 'scheduled',
    notes: appointment?.notes || ''
  })

  const [errors, setErrors] = useState({})
  const [matchedPatient, setMatchedPatient] = useState(null)
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false)
  const [prescriptions, setPrescriptions] = useState([])
  const [newPrescription, setNewPrescription] = useState({
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  })

  // Helper function to find existing patient by email
  const findExistingPatient = (email) => {
    return dataService.findPatientByEmail(email)
  }

  // Check for existing patient when email changes
  useEffect(() => {
    if (formData.patientEmail && formData.patientEmail.trim()) {
      const existingPatient = findExistingPatient(formData.patientEmail)
      setMatchedPatient(existingPatient)
    } else {
      setMatchedPatient(null)
    }
  }, [formData.patientEmail])

  // Show/hide prescription form based on status
  useEffect(() => {
    if (formData.status === 'completed') {
      setShowPrescriptionForm(true)
    } else {
      setShowPrescriptionForm(false)
    }
  }, [formData.status])

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required'
    } else if (formData.patientName.trim().length < 2) {
      newErrors.patientName = 'Name must be at least 2 characters long'
    } else if (!/^[a-zA-Z\s]+$/.test(formData.patientName.trim())) {
      newErrors.patientName = 'Name can only contain letters and spaces'
    }
    
    // Phone validation
    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = 'Phone number is required'
    } else {
      const phoneRegex = /^[0-9]{10}$/
      const cleanPhone = formData.patientPhone.replace(/[^0-9]/g, '')
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.patientPhone = 'Phone number must be exactly 10 digits'
      }
    }
    
    // Email validation (optional but if provided must be valid)
    if (formData.patientEmail && formData.patientEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.patientEmail.trim())) {
        newErrors.patientEmail = 'Please enter a valid email address'
      }
    }
    
    // Date validation
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required'
    } else {
      const selectedDate = new Date(formData.appointmentDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.appointmentDate = 'Appointment date cannot be in the past'
      }
    }
    
    // Time validation
    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Appointment time is required'
    } else if (formData.appointmentDate) {
      const selectedDateTime = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`)
      const now = new Date()
      if (selectedDateTime < now) {
        newErrors.appointmentTime = 'Appointment time cannot be in the past'
      }
      
      // Business hours validation (9 AM to 6 PM)
      const hour = parseInt(formData.appointmentTime.split(':')[0])
      if (hour < 9 || hour >= 18) {
        newErrors.appointmentTime = 'Appointments only available between 9 AM and 6 PM'
      }
    }
    
    // Other required fields
    if (!formData.treatmentType) newErrors.treatmentType = 'Treatment type is required'
    if (!formData.doctor) newErrors.doctor = 'Doctor selection is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddPrescription = () => {
    if (!newPrescription.name || !newPrescription.dosage || !newPrescription.frequency) {
      alert('Please fill in medicine name, dosage, and frequency')
      return
    }

    setPrescriptions(prev => [...prev, {
      id: Date.now(),
      ...newPrescription
    }])
    
    setNewPrescription({
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    })
  }

  const handleRemovePrescription = (prescriptionId) => {
    setPrescriptions(prev => prev.filter(p => p.id !== prescriptionId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Generate appointment number
      const appointmentNumber = `APT${String(Date.now()).slice(-6)}`
      
      const appointmentData = {
        id: appointment?.id || Date.now(),
        appointmentNumber: appointment?.appointmentNumber || appointmentNumber,
        patientName: formData.patientName,
        doctorName: formData.doctor,
        time: formData.appointmentTime,
        duration: `${formData.duration} min`,
        treatment: formData.treatmentType,
        status: formData.status,
        phone: formData.patientPhone,
        notes: formData.notes,
        date: formData.appointmentDate,
        patientEmail: formData.patientEmail,
        createdAt: appointment?.createdAt || new Date().toISOString(),
        // Add patient linking information
        linkedPatientId: matchedPatient?.id || null,
        isLinkedToExistingPatient: !!matchedPatient
      }
      
      // If appointment is marked as completed and we have prescriptions, save them
      if (formData.status === 'completed' && prescriptions.length > 0 && matchedPatient) {
        try {
          // Save each prescription to the patient's medicine list
          for (const prescription of prescriptions) {
            const medicineData = {
              id: prescription.id,
              patientId: matchedPatient.id,
              name: prescription.name,
              dosage: prescription.dosage,
              frequency: prescription.frequency,
              duration: prescription.duration,
              instructions: prescription.instructions,
              prescribedBy: formData.doctor,
              prescribedDate: new Date().toISOString(),
              appointmentId: appointmentData.id,
              startDate: formData.appointmentDate,
              status: 'active'
            }
            
            dataService.addPatientMedicine(medicineData)
          }
        } catch (error) {
          console.error('Error saving prescriptions:', error)
          alert('Appointment saved but there was an error saving prescriptions. Please add them manually from the patient details page.')
        }
      }
      
      // If matched with existing patient, update their appointment history
      if (matchedPatient) {
        dataService.updatePatientAppointments(matchedPatient.id, appointmentData)
      }
      
      onSave(appointmentData)
    }
  }

  // Helper function to update patient's appointment history
  const updatePatientAppointments = (patientId, appointmentData) => {
    try {
      const success = dataService.updatePatientAppointments(patientId, appointmentData)
      if (success) {
        // Dispatch event for UI updates
        dataService.broadcastEvent('patientAppointmentUpdate', {
          patientId: patientId,
          appointmentData: appointmentData
        })
      }
      return success
    } catch (error) {
      console.error('Error updating patient appointments:', error)
      return false
    }
  }

  return (
    <Modal title={appointment ? 'Edit Appointment' : 'New Appointment'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.patientName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter patient name"
            />
            {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.patientPhone}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '')
                if (value.length <= 10) {
                  setFormData({...formData, patientPhone: value})
                }
              }}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.patientPhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234567890"
              maxLength="10"
            />
            {errors.patientPhone && <p className="text-red-500 text-xs mt-1">{errors.patientPhone}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.patientEmail}
              onChange={(e) => setFormData({...formData, patientEmail: e.target.value.toLowerCase()})}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.patientEmail ? 'border-red-500' : matchedPatient ? 'border-green-500' : 'border-gray-300'
              }`}
              placeholder="example@email.com"
            />
            {errors.patientEmail && <p className="text-red-500 text-xs mt-1">{errors.patientEmail}</p>}
            {matchedPatient && (
              <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Patient found: {matchedPatient.name} - This appointment will be linked to their record
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date *</label>
            <input
              type="date"
              required
              value={formData.appointmentDate}
              onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.appointmentDate ? 'border-red-500' : 'border-gray-300'
              }`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.appointmentDate && <p className="text-red-500 text-xs mt-1">{errors.appointmentDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time *</label>
            <input
              type="time"
              required
              value={formData.appointmentTime}
              onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.appointmentTime ? 'border-red-500' : 'border-gray-300'
              }`}
              min="09:00"
              max="18:00"
            />
            {errors.appointmentTime && <p className="text-red-500 text-xs mt-1">{errors.appointmentTime}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Type *</label>
            <select
              required
              value={formData.treatmentType}
              onChange={(e) => setFormData({...formData, treatmentType: e.target.value})}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.treatmentType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Treatment</option>
              <option value="Consultation">Consultation</option>
              <option value="Cleaning">Teeth Cleaning</option>
              <option value="Filling">Dental Filling</option>
              <option value="Root Canal">Root Canal</option>
              <option value="Extraction">Tooth Extraction</option>
              <option value="Whitening">Teeth Whitening</option>
              <option value="Orthodontics">Orthodontics</option>
              <option value="Other">Other</option>
            </select>
            {errors.treatmentType && <p className="text-red-500 text-xs mt-1">{errors.treatmentType}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor *</label>
            <select
              required
              value={formData.doctor}
              onChange={(e) => setFormData({...formData, doctor: e.target.value})}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                errors.doctor ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Doctor</option>
              <option value="Dr. Siddhesh Mungekar">Dr. Siddhesh Mungekar</option>
              <option value="Dr. Sunita Mungekar">Dr. Sunita Mungekar</option>
              <option value="Lucky Yadav">Lucky Yadav</option>
            </select>
            {errors.doctor && <p className="text-red-500 text-xs mt-1">{errors.doctor}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Add any additional notes about this appointment..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Prescription Form - Only show when appointment is being marked as completed and patient is linked */}
        {showPrescriptionForm && matchedPatient && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Prescriptions for {matchedPatient.name}
            </h3>
            
            {/* Current Prescriptions */}
            {prescriptions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Prescriptions to add:</h4>
                <div className="space-y-2">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="bg-blue-50 p-3 rounded-lg flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{prescription.name}</div>
                        <div className="text-sm text-gray-600">
                          {prescription.dosage} • {prescription.frequency}
                          {prescription.duration && ` • ${prescription.duration}`}
                        </div>
                        {prescription.instructions && (
                          <div className="text-sm text-gray-600">{prescription.instructions}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePrescription(prescription.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Prescription Form */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Add Medicine</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                  <input
                    type="text"
                    value={newPrescription.name}
                    onChange={(e) => setNewPrescription({...newPrescription, name: e.target.value})}
                    placeholder="e.g., Amoxicillin"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={newPrescription.dosage}
                    onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                    placeholder="e.g., 500mg"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select
                    value={newPrescription.frequency}
                    onChange={(e) => setNewPrescription({...newPrescription, frequency: e.target.value})}
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
                    value={newPrescription.duration}
                    onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                    placeholder="e.g., 7 days"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <input
                    type="text"
                    value={newPrescription.instructions}
                    onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                    placeholder="e.g., Take after meals"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={handleAddPrescription}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Add Medicine
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showPrescriptionForm && !matchedPatient && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Patient Not Found</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    To add prescriptions, the patient must have a valid email address that matches an existing patient record.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            {appointment ? 'Update Appointment' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </Modal>
  )
}


export default AppointmentModal