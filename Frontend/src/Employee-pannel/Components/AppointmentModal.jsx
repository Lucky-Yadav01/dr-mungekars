import React, { useState } from 'react'

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

  const handleSubmit = (e) => {
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
        createdAt: appointment?.createdAt || new Date().toISOString()
      }
      onSave(appointmentData)
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
                errors.patientEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="example@email.com"
            />
            {errors.patientEmail && <p className="text-red-500 text-xs mt-1">{errors.patientEmail}</p>}
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