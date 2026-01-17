import React, { useState, useEffect } from 'react'
import ReportsChart from '../Components/ReportsChart'
import ReportCard from '../Components/ReportCard'

const Reports = () => {
  const [reports, setReports] = useState({
    appointments: [],
    patients: []
  })
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedReport, setSelectedReport] = useState('appointments')

  useEffect(() => {
    fetchReports()
  }, [selectedPeriod])

  const fetchReports = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      setTimeout(() => {
        setReports({
          appointments: [
            { month: 'Jan', count: 120 },
            { month: 'Feb', count: 135 },
            { month: 'Mar', count: 128 },
            { month: 'Apr', count: 142 },
            { month: 'May', count: 156 },
            { month: 'Jun', count: 168 }
          ],
          patients: [
            { month: 'Jan', new: 25, returning: 95 },
            { month: 'Feb', new: 30, returning: 105 },
            { month: 'Mar', new: 28, returning: 100 },
            { month: 'Apr', new: 35, returning: 107 },
            { month: 'May', new: 32, returning: 124 },
            { month: 'Jun', new: 38, returning: 130 }
          ]
        })
        setLoading(false)
      }, 800)
    } catch (error) {
      console.error('Error fetching reports:', error)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Monitor clinic performance and trends</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards - Medical Focus Only */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportCard
          title="Total Appointments"
          value="168"
          change="+8.2%"
          changeType="positive"
          period="This Month"
        />
        <ReportCard
          title="New Patients"
          value="38"
          change="+18.7%"
          changeType="positive"
          period="This Month"
        />
        <ReportCard
          title="Patient Satisfaction"
          value="96%"
          change="+2.1%"
          changeType="positive"
          period="This Month"
        />
      </div>

      {/* Report Type Tabs - Medical Focus */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedReport('appointments')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedReport === 'appointments'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Appointment Trends
          </button>
          <button
            onClick={() => setSelectedReport('patients')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedReport === 'patients'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Patient Analysis
          </button>
        </nav>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading reports...</p>
          </div>
        ) : (
          <ReportsChart
            data={reports[selectedReport]}
            type={selectedReport}
            period={selectedPeriod}
          />
        )}
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Detailed Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Patients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.appointments && reports.appointments.map((item, index) => (
                <tr key={item.month}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.month} 2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reports.patients[index]?.new || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    +{Math.floor(Math.random() * 15 + 5)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports