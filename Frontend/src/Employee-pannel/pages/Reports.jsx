import React, { useState, useEffect } from 'react'
import ReportsChart from '../Components/ReportsChart'
import ReportCard from '../Components/ReportCard'
import dataService from '../../utils/dataService'

const Reports = () => {
  const [reportsData, setReportsData] = useState({
    totalAppointments: 0,
    newPatients: 0,
    patientSatisfaction: 0,
    monthlyData: []
  })
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedReport, setSelectedReport] = useState('appointments')

  useEffect(() => {
    fetchReports()
    
    // Listen for data updates
    const handleDataUpdate = () => {
      fetchReports()
    }
    
    window.addEventListener('appointmentCreated', handleDataUpdate)
    window.addEventListener('appointmentUpdated', handleDataUpdate)
    window.addEventListener('patientHistoryUpdate', handleDataUpdate)
    
    return () => {
      window.removeEventListener('appointmentCreated', handleDataUpdate)
      window.removeEventListener('appointmentUpdated', handleDataUpdate)
      window.removeEventListener('patientHistoryUpdate', handleDataUpdate)
    }
  }, [selectedPeriod])

  const fetchReports = async () => {
    try {
      setLoading(true)
      console.log('Fetching reports data...')
      
      // TODO: Replace with actual API call when backend is connected
      // const response = await fetch(`/api/reports?period=${selectedPeriod}`)
      // const data = await response.json()
      
      // Get real statistics from current data
      const reports = dataService.getReportsStats()
      console.log('Reports data:', reports)
      
      setReportsData(reports)
      setLoading(false)
      console.log('Reports loaded successfully')
    } catch (error) {
      console.error('Error fetching reports:', error)
      // Set zeros on error as requested
      setReportsData({
        totalAppointments: 0,
        newPatients: 0,
        patientSatisfaction: 0,
        monthlyData: []
      })
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          <p className="ml-3 text-gray-600">Loading reports...</p>
        </div>
      ) : (
        <>
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
          value={(reportsData.totalAppointments || 0).toString()}
          change="+0%"
          changeType="neutral"
          period="Overall"
        />
        <ReportCard
          title="New Patients"
          value={(reportsData.newPatients || 0).toString()}
          change="+0%"
          changeType="neutral"
          period="This Month"
        />
        <ReportCard
          title="Patient Satisfaction"
          value={`${reportsData.patientSatisfaction || 0}%`}
          change="+0%"
          changeType="neutral"
          period="Based on Completed Appointments"
        />
      </div>

      {/* Report Type Tabs - Medical Focus */}
      {/* <div className="border-b border-gray-200">
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
      </div> */}

      {/* Charts Section */}
      {/* <div className="bg-white rounded-lg shadow-sm p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading reports...</p>
          </div>
        ) : (
          <ReportsChart
            data={reportsData.monthlyData || []}
            type={selectedReport}
            period={selectedPeriod}
          />
        )}
      </div> */}

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
              {reportsData.monthlyData && reportsData.monthlyData.length > 0 ? (
                reportsData.monthlyData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.appointments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.newPatients}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      item.growth.startsWith('+') ? 'text-green-600' : 
                      item.growth.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {item.growth}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    {loading ? 'Loading...' : 'No data available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}
    </div>
  )
}

export default Reports