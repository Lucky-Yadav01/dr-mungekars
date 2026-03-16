import React from 'react'

const ReportCard = ({ title, value, change, changeType, period }) => {
  const getChangeColor = () => {
    switch(changeType) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }
  
  const getChangeIcon = () => {
    if (changeType === 'positive') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    } else if (changeType === 'negative') {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    } else {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      )
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <div className={`inline-flex items-center mt-4 ${getChangeColor()} bg-gray-50 rounded-full px-2.5 py-1`}>
        {getChangeIcon()}
        <span className="text-xs ml-1.5 font-medium">{change}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">{period}</p>
    </div>
  )
}

export default ReportCard