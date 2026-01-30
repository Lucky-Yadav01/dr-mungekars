import React from 'react'

const RecentActivity = ({ appointments, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Appointments</h3>
      
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent appointments</p>
      ) : (
        <div className="space-y-3">
          {appointments.map(appointment => (
            <div key={appointment.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-medium text-sm">
                  {appointment.patientName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{appointment.patientName}</p>
                <p className="text-sm text-gray-600">{appointment.treatment} at {appointment.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentActivity