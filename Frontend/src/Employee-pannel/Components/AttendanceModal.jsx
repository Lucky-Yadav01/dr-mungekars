import React, { useState } from 'react'

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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

const AttendanceModal = ({ employee, onClose, onSave, existingAttendance }) => {
  const [formData, setFormData] = useState({
    employeeId: employee?.id || '',
    employeeName: employee?.name || '',
    date: existingAttendance?.date || new Date().toISOString().split('T')[0],
    checkIn: existingAttendance?.checkIn || '',
    checkOut: existingAttendance?.checkOut || '',
    breakDuration: existingAttendance?.breakDuration || '30',
    status: existingAttendance?.status || 'present',
    remark: existingAttendance?.remark || existingAttendance?.notes || ''
  })

  const [errors, setErrors] = useState({})

  // Convert 24-hour time to 12-hour AM/PM format
  const formatTime = (time24) => {
    if (!time24) return ''
    const [hours, minutes] = time24.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${hour12}:${minutes} ${ampm}`
  }

  // Convert 12-hour AM/PM format back to 24-hour for input
  const parseTime = (time12) => {
    if (!time12) return ''
    const match = time12.match(/(\d+):(\d+) (AM|PM)/)
    if (!match) return ''
    let [, hours, minutes, ampm] = match
    hours = parseInt(hours)
    if (ampm === 'PM' && hours !== 12) hours += 12
    if (ampm === 'AM' && hours === 12) hours = 0
    return `${hours.toString().padStart(2, '0')}:${minutes}`
  }

  const calculateTotalHours = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkInTime = parseTime(formData.checkIn)
      const checkOutTime = parseTime(formData.checkOut)
      if (checkInTime && checkOutTime) {
        const checkIn = new Date(`${formData.date}T${checkInTime}`)
        const checkOut = new Date(`${formData.date}T${checkOutTime}`)
        const diff = (checkOut - checkIn) / (1000 * 60 * 60) // hours
        const totalHours = Math.max(0, diff - (parseInt(formData.breakDuration) / 60))
        const hours = Math.floor(totalHours)
        const minutes = Math.round((totalHours - hours) * 60)
        return `${hours}h ${minutes}m`
      }
    }
    return '0h 0m'
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.employeeName) newErrors.employeeName = 'Employee is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (formData.status === 'present') {
      if (!formData.checkIn) newErrors.checkIn = 'Check-in time is required'
      if (formData.checkIn && formData.checkOut) {
        const checkInTime = parseTime(formData.checkIn)
        const checkOutTime = parseTime(formData.checkOut)
        if (checkInTime >= checkOutTime) {
          newErrors.checkOut = 'Check-out must be after check-in'
        }
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const attendanceData = {
        id: existingAttendance?.id || Date.now(),
        employeeId: formData.employeeId,
        employeeName: formData.employeeName,
        date: formData.date,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        totalHours: calculateTotalHours(),
        status: formData.status,
        remark: formData.remark
      }
      onSave(attendanceData)
    }
  }

  return (
    <Modal title={existingAttendance ? 'Edit Attendance' : 'Record Attendance'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee *</label>
            <input
              type="text"
              value={formData.employeeName}
              readOnly
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 text-gray-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="half-day">Half Day</option>
              <option value="late">Late</option>
              <option value="leave">On Leave</option>
            </select>
          </div>

          {formData.status === 'present' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time *</label>
                <input
                  type="time"
                  required
                  value={parseTime(formData.checkIn)}
                  onChange={(e) => setFormData({...formData, checkIn: formatTime(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
                <input
                  type="time"
                  value={parseTime(formData.checkOut)}
                  onChange={(e) => setFormData({...formData, checkOut: formatTime(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Break Duration (minutes)</label>
                <select
                  value={formData.breakDuration}
                  onChange={(e) => setFormData({...formData, breakDuration: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="0">No Break</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Hours</label>
                <input
                  type="text"
                  value={calculateTotalHours()}
                  readOnly
                  className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 text-gray-600"
                />
              </div>
            </>
          )}
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
            <textarea
              rows="3"
              value={formData.remark}
              onChange={(e) => setFormData({...formData, remark: e.target.value})}
              placeholder="Add any remarks about this attendance record..."
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
            {existingAttendance ? 'Update Attendance' : 'Record Attendance'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AttendanceModal