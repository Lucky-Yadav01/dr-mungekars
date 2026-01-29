import React from 'react'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Patients from './pages/Patients'
import PatientDetails from './pages/PatientDetails'
import Team from './pages/Team'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

const adminRoutes = [
  {
    key: 'dashboard',
    index: true,
    path: '',
    to: '/admin',
    label: 'Dashboard',
    pageTitle: 'Dashboard Overview',
    element: <Dashboard />,
  },
  {
    key: 'appointments',
    path: 'appointments',
    to: '/admin/appointments',
    label: 'Appointments',
    pageTitle: 'Appointment Management',
    element: <Appointments />,
  },
  {
    key: 'patients',
    path: 'patients',
    to: '/admin/patients',
    label: 'Patients',
    pageTitle: 'Patient Records',
    element: <Patients />,
  },
  {
    key: 'patient-details',
    path: 'patients/:id',
    to: '/admin/patients/:id',
    label: 'Patient Details',
    pageTitle: 'Patient Details',
    element: <PatientDetails />,
    showInSidebar: false, // Don't show this in sidebar navigation
  },
  {
    key: 'team',
    path: 'team',
    to: '/admin/team',
    label: 'Team',
    pageTitle: 'Employee Management',
    element: <Team />,
  },
  {
    key: 'reports',
    path: 'reports',
    to: '/admin/reports',
    label: 'Reports',
    pageTitle: 'Reports & Analytics',
    element: <Reports />,
  },
  {
    key: 'settings',
    path: 'settings',
    to: '/admin/settings',
    label: 'Settings',
    pageTitle: 'Clinic Settings',
    element: <Settings />,
  },
]

export default adminRoutes
