import React from 'react'

const ClinicSettings = ({ loading, setLoading }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Clinic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
            <input
              type="text"
              defaultValue="Dr. Mungekar's Dental Clinic"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              defaultValue="+91 123-456-7890"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              rows={3}
              defaultValue="123 Medical Plaza, Healthcare District, Mumbai, Maharashtra 400001"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Working Hours</h3>
        <div className="space-y-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <div key={day} className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-700">{day}</div>
              <input
                type="time"
                defaultValue="09:00"
                className="border border-gray-300 rounded px-2 py-1"
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                defaultValue="18:00"
                className="border border-gray-300 rounded px-2 py-1"
              />
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={day !== 'Saturday'} />
                <span className="text-sm text-gray-700">Open</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default ClinicSettings