import React, { useState } from 'react'
import ClinicSettings from '../Components/ClinicSettings'
import UserSettings from '../Components/UserSettings'
import SystemSettings from '../Components/SystemSettings'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('clinic')
  const [loading, setLoading] = useState(false)

  const tabs = [
    { id: 'clinic', label: 'Clinic Settings', component: ClinicSettings },
    { id: 'users', label: 'User Management', component: UserSettings },
    { id: 'system', label: 'System Settings', component: SystemSettings }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ClinicSettings

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage clinic preferences and configurations</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <ActiveComponent loading={loading} setLoading={setLoading} />
      </div>
    </div>
  )
}

export default Settings