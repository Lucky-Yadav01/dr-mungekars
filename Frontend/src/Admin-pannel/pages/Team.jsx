import React, { useState, useEffect } from 'react'
import EmployeeCard from '../Components/EmployeeCard'
import { EmployeeDetailsModal, EmployeeFormModal } from '../Components/EmployeeModal'
import AttendanceModal from '../Components/AttendanceModal'

const Team = () => {
  const [employees, setEmployees] = useState([])
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedEmployeeForAttendance, setSelectedEmployeeForAttendance] = useState(null)
  const [selectedAttendanceFilter, setSelectedAttendanceFilter] = useState('')
  const [activeTab, setActiveTab] = useState('employees')

  useEffect(() => {
    fetchEmployees()
    fetchAttendance()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      setTimeout(() => {
        setEmployees([
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
            specialization: 'General Dentistry, Root Canal'
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
            specialization: 'Cosmetic Dentistry, Orthodontics'
          },
          {
            id: 3,
            name: 'Priya Sharma',
            email: 'priya.sharma@drmungekars.com',
            phone: '+91 98765 43212',
            role: 'Dental Hygienist',
            department: 'Clinical',
            joinDate: '2021-03-10',
            status: 'active',
            workingHours: '8:00 AM - 5:00 PM',
            specialization: 'Teeth Cleaning, Preventive Care'
          },
          {
            id: 4,
            name: 'Rajesh Kumar',
            email: 'rajesh.kumar@drmungekars.com',
            phone: '+91 98765 43213',
            role: 'Receptionist',
            department: 'Administrative',
            joinDate: '2022-01-20',
            status: 'active',
            workingHours: '9:00 AM - 6:00 PM',
            specialization: 'Patient Management, Scheduling'
          },
          {
            id: 5,
            name: 'Lucky Yadav',
            email: 'lucky.yadav@drmungekars.com',
            phone: '+91 741529630',
            role: 'Dentist',
            department: 'Oral Surgery',
            joinDate: '2023-01-15',
            status: 'active',
            workingHours: '9:00 AM - 6:00 PM',
            specialization: 'Oral Surgery, Implants'
          }
        ])
        setLoading(false)
      }, 800)
    } catch (error) {
      console.error('Error fetching employees:', error)
      setLoading(false)
    }
  }

  const fetchAttendance = async () => {
    try {
      // Mock attendance data
      setTimeout(() => {
        setAttendance([
          {
            id: 1,
            employeeId: 1,
            employeeName: 'Dr. Siddhesh Mungekar',
            date: '2024-01-15',
            checkIn: '9:00 AM',
            checkOut: '6:15 PM',
            totalHours: '9h 15m',
            status: 'present'
          },
          {
            id: 2,
            employeeId: 2,
            employeeName: 'Dr. Sunita Mungekar',
            date: '2024-01-15',
            checkIn: '9:05 AM',
            checkOut: '6:00 PM',
            totalHours: '8h 55m',
            status: 'present'
          },
          {
            id: 3,
            employeeId: 3,
            employeeName: 'Priya Sharma',
            date: '2024-01-15',
            checkIn: '8:00 AM',
            checkOut: '5:00 PM',
            totalHours: '9h 00m',
            status: 'present'
          }
        ])
      }, 500)
    } catch (error) {
      console.error('Error fetching attendance:', error)
    }
  }

  const handleAddEmployee = (employeeData) => {
    // Mock implementation - replace with actual API call
    const newEmployee = {
      id: Date.now(),
      name: employeeData.name,
      email: employeeData.email,
      phone: employeeData.phone,
      role: employeeData.role,
      department: employeeData.department,
      joinDate: employeeData.joinDate,
      status: employeeData.status,
      workingHours: '9:00 AM - 6:00 PM',
      specialization: employeeData.specialization || `${employeeData.role} Services`
    }
    setEmployees([...employees, newEmployee])
    setShowFormModal(false)
  }

  const handleUpdateEmployee = (employeeData) => {
    // Mock implementation - replace with actual API call
    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, ...employeeData }
        : emp
    ))
    setShowFormModal(false)
    setSelectedEmployee(null)
  }

  const handleSaveAttendance = (attendanceData) => {
    // Mock implementation - replace with actual API call
    setAttendance([...attendance, attendanceData])
    setShowAttendanceModal(false)
    setSelectedEmployeeForAttendance(null)
  }

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Filter attendance based on selected employee
  const filteredAttendance = selectedAttendanceFilter 
    ? attendance.filter(record => record.employeeId === parseInt(selectedAttendanceFilter))
    : attendance

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600">Manage staff and employee records</p>
        </div>
        <button
          onClick={() => setShowFormModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('employees')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'employees'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Employees
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'attendance'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Attendance
          </button>
        </nav>
      </div>

      {activeTab === 'employees' && (
        <>
          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search employees by name, role, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Employees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading employees...</p>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">No employees found</div>
            ) : (
              filteredEmployees.map(employee => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onClick={() => {
                    setSelectedEmployee(employee)
                    setShowDetailsModal(true)
                  }}
                />
              ))
            )}
          </div>
        </>
      )}

      {activeTab === 'attendance' && (
        <>
          {/* Attendance Controls */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-4">
              <select 
                value={selectedAttendanceFilter}
                onChange={(e) => setSelectedAttendanceFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (selectedAttendanceFilter) {
                    const employee = employees.find(emp => emp.id === parseInt(selectedAttendanceFilter))
                    setSelectedEmployeeForAttendance(employee)
                    setShowAttendanceModal(true)
                  } else {
                    alert('Please select an employee first')
                  }
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Attendance
              </button>
            </div>
          </div>

          {/* Employee Attendance Display */}
          {selectedAttendanceFilter && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Employee Header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {employees.find(emp => emp.id === parseInt(selectedAttendanceFilter))?.name} - Attendance Records
                </h3>
              </div>

              {/* Attendance Table */}
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remark
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAttendance.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No attendance records found for this employee
                        </td>
                      </tr>
                    ) : (
                      filteredAttendance.map(record => (
                        <tr key={record.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkIn || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkOut || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{record.notes || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!selectedAttendanceFilter && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p className="text-lg font-medium text-gray-900 mb-2">Select Employee</p>
                <p className="text-gray-600">Choose an employee from the dropdown above to view their attendance records</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {showDetailsModal && selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedEmployee(null)
          }}
          onEdit={() => {
            setShowDetailsModal(false)
            setShowFormModal(true)
            // selectedEmployee remains set for editing
          }}
        />
      )}

      {showFormModal && (
        <EmployeeFormModal
          employee={selectedEmployee}
          onClose={() => {
            setShowFormModal(false)
            setSelectedEmployee(null)
          }}
          onSave={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}
        />
      )}

      {showAttendanceModal && selectedEmployeeForAttendance && (
        <AttendanceModal
          employee={selectedEmployeeForAttendance}
          onClose={() => {
            setShowAttendanceModal(false)
            setSelectedEmployeeForAttendance(null)
          }}
          onSave={handleSaveAttendance}
        />
      )}
    </div>
  )
}

export default Team