import React from 'react'

const ReportCard = ({ title, value, change, changeType, period }) => {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-red-600'
  const changeIcon = changeType === 'positive' ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  )

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <div className={`flex items-center mt-4 ${changeColor}`}>
        {changeIcon}
        <span className="text-sm ml-1">{change}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{period}</p>
    </div>
  )
}

export default ReportCard