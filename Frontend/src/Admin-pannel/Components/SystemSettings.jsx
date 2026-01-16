import React from 'react'

const SystemSettings = ({ loading, setLoading }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Send email alerts for appointments and updates</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="sr-only" />
              <div className="relative">
                <div className="w-10 h-6 bg-amber-400 rounded-full shadow-inner"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 right-1"></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">SMS Reminders</h4>
              <p className="text-sm text-gray-500">Send SMS appointment reminders to patients</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="sr-only" />
              <div className="relative">
                <div className="w-10 h-6 bg-amber-400 rounded-full shadow-inner"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 right-1"></div>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Auto Backup</h4>
              <p className="text-sm text-gray-500">Automatically backup data daily</p>
            </div>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="sr-only" />
              <div className="relative">
                <div className="w-10 h-6 bg-amber-400 rounded-full shadow-inner"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 right-1"></div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Export Data</h4>
                <p className="text-sm text-gray-500">Download all clinic data as backup</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
          </button>

          <button className="w-full p-3 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">System Logs</h4>
                <p className="text-sm text-gray-500">View system activity and error logs</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default SystemSettings