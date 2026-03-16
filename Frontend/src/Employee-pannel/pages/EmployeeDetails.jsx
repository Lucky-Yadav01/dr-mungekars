import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import drSiddhesh from '../../assets/drsiddhesh.png'
import drSunita from '../../assets/drsunita.png'

const EmployeeDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const fallbackEmployees = useMemo(
    () => [
      {
        id: 1,
        name: 'Dr. Siddhesh Mungekar',
        email: 'siddhesh@drmungekars.com',
        phone: '+91 98765 43210',
        role: 'Senior Dentist',
        department: 'Clinical',
        joinDate: '2020-01-15',
        status: 'active',
        workingHours: '9:00 AM - 6:00 PM',
        specialization: 'General Dentistry, Root Canal',
        profileImage: drSiddhesh,
        details:
          'Senior consultant for comprehensive dental treatment planning and complex restorative procedures.',
      },
      {
        id: 2,
        name: 'Dr. Sunita Mungekar',
        email: 'sunita@drmungekars.com',
        phone: '+91 98765 43211',
        role: 'Senior Dentist',
        department: 'Clinical',
        joinDate: '2020-01-15',
        status: 'active',
        workingHours: '9:00 AM - 6:00 PM',
        specialization: 'Cosmetic Dentistry, Orthodontics',
        profileImage: drSunita,
        details:
          'Leads cosmetic and alignment cases with advanced esthetic treatment workflows.',
      },
      // {
      //   id: 3,
      //   name: 'Priya Sharma',
      //   email: 'priya.sharma@drmungekars.com',
      //   phone: '+91 98765 43212',
      //   role: 'Dental Hygienist',
      //   department: 'Clinical',
      //   joinDate: '2021-03-10',
      //   status: 'active',
      //   workingHours: '8:00 AM - 5:00 PM',
      //   specialization: 'Teeth Cleaning, Preventive Care',
      //   profileImage: '',
      //   details: 'Supports preventive and hygiene-focused treatment sessions and patient education.',
      // },
      // {
      //   id: 4,
      //   name: 'Rajesh Kumar',
      //   email: 'rajesh.kumar@drmungekars.com',
      //   phone: '+91 98765 43213',
      //   role: 'Receptionist',
      //   department: 'Administrative',
      //   joinDate: '2022-01-20',
      //   status: 'active',
      //   workingHours: '9:00 AM - 6:00 PM',
      //   specialization: 'Patient Management, Scheduling',
      //   profileImage: '',
      //   details: 'Coordinates front desk operations, appointments, and patient communication.',
      // },
      // {
      //   id: 5,
      //   name: 'Lucky Yadav',
      //   email: 'lucky.yadav@drmungekars.com',
      //   phone: '+91 741529630',
      //   role: 'Dentist',
      //   department: 'Oral Surgery',
      //   joinDate: '2023-01-15',
      //   status: 'active',
      //   workingHours: '9:00 AM - 6:00 PM',
      //   specialization: 'Oral Surgery, Implants',
      //   profileImage: '',
      //   details: 'Manages oral surgery support and implant care workflows.',
      // },
    ],
    []
  )

  const persistedEmployees = JSON.parse(localStorage.getItem('teamMembers') || '[]')
  const employees = persistedEmployees.length > 0 ? persistedEmployees : fallbackEmployees

  const employee = employees.find((item) => item.id === Number(id))

  if (!employee) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4">Employee not found.</p>
        <button
          onClick={() => navigate('/admin/team')}
          className="px-4 py-2 rounded-lg border border-amber-500 text-amber-700 hover:bg-amber-50"
        >
          Back to Team
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/team')}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Team
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {employee.profileImage ? (
            <img
              src={employee.profileImage}
              alt={employee.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-amber-100"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-3xl font-semibold">
              {employee.name
                .split(' ')
                .map((part) => part[0])
                .join('')
                .toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-amber-700 font-medium mt-1">{employee.role}</p>
            <p className="text-gray-600 mt-1">{employee.department}</p>
            <div className="mt-3 inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              {employee.status}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Contact & Schedule</h2>
          <p className="text-sm text-gray-700"><span className="font-medium">Email:</span> {employee.email}</p>
          <p className="text-sm text-gray-700"><span className="font-medium">Phone:</span> {employee.phone}</p>
          <p className="text-sm text-gray-700"><span className="font-medium">Working Hours:</span> {employee.workingHours}</p>
          <p className="text-sm text-gray-700"><span className="font-medium">Join Date:</span> {new Date(employee.joinDate).toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Professional Details</h2>
          <p className="text-sm text-gray-700"><span className="font-medium">Specialization:</span> {employee.specialization}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{employee.details || 'No additional details available.'}</p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails
