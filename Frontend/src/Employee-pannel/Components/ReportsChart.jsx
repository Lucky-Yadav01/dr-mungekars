import React from 'react'

const ReportsChart = ({ data = [], sourceStats = { website: 0, admin: 0 }, period }) => {
  const maxAppointments = Math.max(...data.map((item) => item.appointments || 0), 1)
  const maxPatients = Math.max(...data.map((item) => item.newPatients || 0), 1)

  const totalSources = (sourceStats.website || 0) + (sourceStats.admin || 0)
  const websitePercent = totalSources ? Math.round(((sourceStats.website || 0) / totalSources) * 100) : 0
  const adminPercent = 100 - websitePercent

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Appointments vs New Patients ({period})</h4>
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">No chart data available for this period.</p>
        ) : (
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.period}>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>{item.period}</span>
                  <span>{item.appointments} appts · {item.newPatients} new</span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-amber-500 rounded-full"
                      style={{ width: `${((item.appointments || 0) / maxAppointments) * 100}%` }}
                    />
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-emerald-500 rounded-full"
                      style={{ width: `${((item.newPatients || 0) / maxPatients) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-5">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Patient Source Distribution</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="mx-auto w-36 h-36 relative">
            <svg viewBox="0 0 120 120" className="w-36 h-36 -rotate-90">
              <circle cx="60" cy="60" r="45" stroke="#E5E7EB" strokeWidth="14" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="45"
                stroke="#10B981"
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${(websitePercent / 100) * 283} 283`}
                strokeLinecap="round"
              />
              <circle
                cx="60"
                cy="60"
                r="45"
                stroke="#F59E0B"
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${(adminPercent / 100) * 283} 283`}
                strokeDashoffset={`-${(websitePercent / 100) * 283}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-xl font-bold text-gray-900">{totalSources}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-gray-700">Website</span>
              </div>
              <span className="font-semibold text-gray-900">{sourceStats.website || 0} ({websitePercent}%)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-gray-700">Admin Added</span>
              </div>
              <span className="font-semibold text-gray-900">{sourceStats.admin || 0} ({adminPercent}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsChart