import React from 'react'
import AdminPanel from './pages/Dashboard'

const PlaceholderView = ({ title, description }) => (
  <section className="p-8">
    <div className="max-w-3xl">
      <h2 className="text-3xl font-semibold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="bg-white border border-dashed border-amber-300 rounded-xl p-6 text-center">
        <p className="text-amber-600 font-medium">Feature coming soon</p>
      </div>
    </div>
  </section>
)

const adminRoutes = [
  {
    key: 'dashboard',
    index: true,
    path: '',
    to: '/admin',
    label: 'Dashboard',
    pageTitle: 'Admin Dashboard',
    element: <AdminPanel />,
  },
  {
    key: 'appointments',
    path: 'appointments',
    to: '/admin/appointments',
    label: 'Appointments',
    pageTitle: 'Appointments',
    element: (
      <PlaceholderView
        title="Appointments"
        description="Track, filter, and manage all scheduled visits."
      />
    ),
  },
  {
    key: 'patients',
    path: 'patients',
    to: '/admin/patients',
    label: 'Patients',
    pageTitle: 'Patient Records',
    element: (
      <PlaceholderView
        title="Patient Records"
        description="Access patient history, treatment plans, and notes."
      />
    ),
  },
  {
    key: 'team',
    path: 'team',
    to: '/admin/team',
    label: 'Team',
    pageTitle: 'Employee Management',
    element: (
      <PlaceholderView
        title="Employee Management"
        description="Invite staff, manage permissions, and track roles."
      />
    ),
  },
  {
    key: 'reports',
    path: 'reports',
    to: '/admin/reports',
    label: 'Reports',
    pageTitle: 'Reports & Analytics',
    element: (
      <PlaceholderView
        title="Reports & Analytics"
        description="Monitor clinic KPIs, revenue, and operational health."
      />
    ),
  },
  {
    key: 'settings',
    path: 'settings',
    to: '/admin/settings',
    label: 'Settings',
    pageTitle: 'Clinic Settings',
    element: (
      <PlaceholderView
        title="Clinic Settings"
        description="Configure clinic preferences, schedules, and billing."
      />
    ),
  },
]

export default adminRoutes
