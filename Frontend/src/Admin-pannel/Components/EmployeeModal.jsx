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

// Employee Details Modal - for viewing employee information
export const EmployeeDetailsModal = ({ employee, onClose, onEdit }) => {
  if (!employee) return null

  return (
    <Modal title="Employee Details" onClose={onClose}>
      <div className="space-y-6">
        {/* Employee Header */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold text-amber-600">
              {employee.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-amber-600 font-medium">{employee.role}</p>
            <p className="text-gray-500">{employee.department}</p>
          </div>
        </div>

        {/* Employee Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <p className="text-gray-900">{employee.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <p className="text-gray-900">{employee.phone}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{employee.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
            <p className="text-gray-900">{employee.joinDate}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {employee.status}
            </span>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <p className="text-gray-900">{employee.specialization}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Edit Employee
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Employee Form Modal - for adding/editing employees
export const EmployeeFormModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    role: employee?.role || '',
    department: employee?.department || '',
    status: employee?.status || 'Active',
    specialization: employee?.specialization || '',
    joinDate: employee?.joinDate || new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Modal title={employee ? 'Edit Employee' : 'Add New Employee'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
            <select
              required
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Select Role</option>
              <option value="Dentist">Dentist</option>
              <option value="Dental Hygienist">Dental Hygienist</option>
              <option value="Dental Assistant">Dental Assistant</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Office Manager">Office Manager</option>
              <option value="Technician">Technician</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">Select Department</option>
              <option value="General Dentistry">General Dentistry</option>
              <option value="Orthodontics">Orthodontics</option>
              <option value="Oral Surgery">Oral Surgery</option>
              <option value="Pediatric Dentistry">Pediatric Dentistry</option>
              <option value="Administration">Administration</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Join Date *</label>
            <input
              type="date"
              required
              value={formData.joinDate}
              onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter specialization (e.g., General Dentistry, Root Canal)"
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
            {employee ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EmployeeDetailsModal