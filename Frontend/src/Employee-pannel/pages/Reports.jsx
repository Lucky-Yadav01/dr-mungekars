import React, { useState, useEffect } from 'react'
import ReportsChart from '../Components/ReportsChart'
import ReportCard from '../Components/ReportCard'
import dataService from '../../utils/dataService'

const Reports = () => {
  const [reportsData, setReportsData] = useState({
    totalAppointments: 0,
    newPatients: 0,
    patientSatisfaction: 0,
    monthlyData: [],
    sourceStats: {
      website: 0,
      admin: 0,
    },
  })
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

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
      const patients = JSON.parse(localStorage.getItem('patients') || '[]')
      const websitePatients = patients.filter((patient) => (patient.source || '').toLowerCase() === 'website').length
      const adminPatients = patients.length - websitePatients
      console.log('Reports data:', reports)
      
      setReportsData({
        ...reports,
        sourceStats: {
          website: websitePatients,
          admin: adminPatients,
        },
      })
      setLoading(false)
      console.log('Reports loaded successfully')
    } catch (error) {
      console.error('Error fetching reports:', error)
      // Set zeros on error as requested
      setReportsData({
        totalAppointments: 0,
        newPatients: 0,
        patientSatisfaction: 0,
        monthlyData: [],
        sourceStats: {
          website: 0,
          admin: 0,
        },
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
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ReportCard
          title="Total Appointments"
          value={(reportsData.totalAppointments || 0).toString()}
          change={`${reportsData.monthlyData?.length ? reportsData.monthlyData[reportsData.monthlyData.length - 1]?.growth || '+0%' : '+0%'}`}
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <ReportsChart
            data={reportsData.monthlyData || []}
            sourceStats={reportsData.sourceStats}
            period={selectedPeriod}
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Source Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200">
              <span className="text-gray-600">Website Patients</span>
              <span className="font-semibold text-gray-900">{reportsData.sourceStats?.website || 0}</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200">
              <span className="text-gray-600">Admin Added</span>
              <span className="font-semibold text-gray-900">{reportsData.sourceStats?.admin || 0}</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 bg-amber-50">
              <span className="text-gray-700">Total Patients</span>
              <span className="font-bold text-amber-700">{(reportsData.sourceStats?.website || 0) + (reportsData.sourceStats?.admin || 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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