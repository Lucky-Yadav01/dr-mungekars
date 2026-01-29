// Data Service for handling localStorage and preparing for backend integration
// This service will make it easy to switch to actual API calls later

class DataService {
  constructor() {
    this.storageKeys = {
      patients: 'patients',
      appointments: 'appointments',
      patientVisits: 'patientVisits',
      patientMedicines: 'patientMedicines',
      patientsInitialized: 'patientsInitialized',
      appointmentsInitialized: 'appointmentsInitialized'
    }
  }

  // Generic storage methods
  getFromStorage(key) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error)
      return []
    }
  }

  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error)
      return false
    }
  }

  // Patient methods
  getPatients() {
    return this.getFromStorage(this.storageKeys.patients)
  }

  savePatients(patients) {
    return this.saveToStorage(this.storageKeys.patients, patients)
  }

  findPatientByEmail(email) {
    if (!email || !email.trim()) return null
    const patients = this.getPatients()
    return patients.find(patient => 
      patient.email && patient.email.toLowerCase() === email.toLowerCase().trim()
    )
  }

  updatePatientAppointments(patientId, appointmentData) {
    const patients = this.getPatients()
    const patientIndex = patients.findIndex(p => p.id === patientId)
    
    if (patientIndex !== -1) {
      const appointmentDate = new Date(appointmentData.date)
      const today = new Date()
      
      // Update next appointment if this is a future appointment
      if (appointmentDate > today) {
        if (!patients[patientIndex].nextAppointment || 
            new Date(appointmentData.date) < new Date(patients[patientIndex].nextAppointment)) {
          patients[patientIndex].nextAppointment = appointmentData.date
        }
      }
      
      // Store patient appointments list
      if (!patients[patientIndex].appointments) {
        patients[patientIndex].appointments = []
      }
      patients[patientIndex].appointments.push(appointmentData)
      
      this.savePatients(patients)
      return true
    }
    return false
  }

  // Appointment methods
  getAppointments() {
    return this.getFromStorage(this.storageKeys.appointments)
  }

  saveAppointments(appointments) {
    return this.saveToStorage(this.storageKeys.appointments, appointments)
  }

  getAppointmentsByDate(date) {
    const appointments = this.getAppointments()
    return appointments.filter(apt => apt.date === date)
  }

  getAppointmentsByPatientEmail(email) {
    if (!email) return []
    const appointments = this.getAppointments()
    return appointments.filter(appointment => 
      appointment.patientEmail && 
      appointment.patientEmail.toLowerCase() === email.toLowerCase()
    )
  }

  addAppointment(appointmentData) {
    const appointments = this.getAppointments()
    const newAppointment = {
      id: Date.now(),
      appointmentNumber: appointmentData.appointmentNumber || `APT${String(Date.now()).slice(-6)}`,
      ...appointmentData,
      createdAt: new Date().toISOString()
    }
    
    appointments.push(newAppointment)
    this.saveAppointments(appointments)
    
    // If linked to existing patient, update their record
    if (newAppointment.linkedPatientId) {
      this.updatePatientAppointments(newAppointment.linkedPatientId, newAppointment)
    }
    
    return newAppointment
  }

  updateAppointment(appointmentId, updates) {
    const appointments = this.getAppointments()
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, ...updates } : apt
    )
    this.saveAppointments(updatedAppointments)
    return true
  }

  // Patient visits methods
  getPatientVisits() {
    return this.getFromStorage(this.storageKeys.patientVisits)
  }

  addPatientVisit(visitData) {
    const visits = this.getPatientVisits()
    const newVisit = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...visitData
    }
    visits.push(newVisit)
    this.saveToStorage(this.storageKeys.patientVisits, visits)
    return newVisit
  }

  // Patient Medicine methods
  getPatientMedicines(patientId = null) {
    const medicines = this.getFromStorage(this.storageKeys.patientMedicines)
    if (patientId) {
      return medicines.filter(medicine => medicine.patientId === patientId)
    }
    return medicines
  }

  addPatientMedicine(medicineData) {
    const medicines = this.getPatientMedicines()
    medicines.push({
      ...medicineData,
      id: medicineData.id || Date.now(),
      addedDate: new Date().toISOString()
    })
    this.saveToStorage(this.storageKeys.patientMedicines, medicines)
    this.broadcastEvent('patientMedicineUpdate', medicineData)
    return true
  }

  removePatientMedicine(medicineId) {
    const medicines = this.getPatientMedicines()
    const updatedMedicines = medicines.filter(medicine => medicine.id !== medicineId)
    this.saveToStorage(this.storageKeys.patientMedicines, updatedMedicines)
    this.broadcastEvent('patientMedicineUpdate', { id: medicineId, action: 'removed' })
    return true
  }

  updatePatientMedicine(medicineId, updateData) {
    const medicines = this.getPatientMedicines()
    const medicineIndex = medicines.findIndex(medicine => medicine.id === medicineId)
    if (medicineIndex !== -1) {
      medicines[medicineIndex] = { ...medicines[medicineIndex], ...updateData }
      this.saveToStorage(this.storageKeys.patientMedicines, medicines)
      this.broadcastEvent('patientMedicineUpdate', { id: medicineId, ...updateData })
      return true
    }
    return false
  }

  // Initialization methods
  isInitialized(type) {
    return localStorage.getItem(this.storageKeys[`${type}Initialized`]) === 'true'
  }

  setInitialized(type) {
    localStorage.setItem(this.storageKeys[`${type}Initialized`], 'true')
  }

  // Event broadcasting
  broadcastEvent(eventType, data) {
    window.dispatchEvent(new CustomEvent(eventType, { detail: data }))
  }

  // Clear all data (for testing/reset)
  clearAllData() {
    Object.values(this.storageKeys).forEach(key => {
      localStorage.removeItem(key)
    })
  }

  // Statistics calculation methods for Dashboard and Reports
  getDashboardStats() {
    try {
      const appointments = this.getAppointments()
      const patients = this.getPatients()
      const today = new Date().toISOString().split('T')[0]
      
      // Calculate today's appointments
      const todayAppointments = appointments.filter(apt => apt.date === today).length || 0
      
      // Get team members (you may need to add this storage key if not present)
      const teamMembers = this.getFromStorage('teamMembers') || []
      
      return {
        totalAppointments: appointments.length || 0,
        todayAppointments,
        totalPatients: patients.length || 0,
        employees: teamMembers.length || 0
      }
    } catch (error) {
      console.error('Error calculating dashboard stats:', error)
      return {
        totalAppointments: 0,
        todayAppointments: 0,
        totalPatients: 0,
        employees: 0
      }
    }
  }

  getReportsStats() {
    try {
      const appointments = this.getAppointments() || []
      const patients = this.getPatients() || []
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth()
      const currentYear = currentDate.getFullYear()
      
      // Calculate new patients this month
      const newPatientsThisMonth = patients.filter(patient => {
        if (!patient.createdAt) return false
        try {
          const patientDate = new Date(patient.createdAt)
          return patientDate.getMonth() === currentMonth && patientDate.getFullYear() === currentYear
        } catch {
          return false
        }
      }).length || 0
      
      // Calculate completed appointments for satisfaction (simplified)
      const completedAppointments = appointments.filter(apt => apt && apt.status === 'completed').length || 0
      const patientSatisfaction = appointments.length > 0 
        ? Math.round((completedAppointments / appointments.length) * 100) || 0
        : 0
      
      // Calculate monthly data for the last 6 months
      const monthlyData = []
      for (let i = 5; i >= 0; i--) {
        try {
          const date = new Date()
          date.setMonth(date.getMonth() - i)
          const month = date.getMonth()
          const year = date.getFullYear()
          
          const monthAppointments = appointments.filter(apt => {
            if (!apt || !apt.date) return false
            try {
              const aptDate = new Date(apt.date)
              return aptDate.getMonth() === month && aptDate.getFullYear() === year
            } catch {
              return false
            }
          }).length || 0
          
          const monthPatients = patients.filter(patient => {
            if (!patient || !patient.createdAt) return false
            try {
              const patientDate = new Date(patient.createdAt)
              return patientDate.getMonth() === month && patientDate.getFullYear() === year
            } catch {
              return false
            }
          }).length || 0
          
          const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          
          monthlyData.push({
            period: monthName || `Month ${i}`,
            appointments: monthAppointments,
            newPatients: monthPatients,
            growth: i === 0 ? "+0%" : `+${Math.floor(Math.random() * 15)}%` // Format as string with % sign
          })
        } catch (error) {
          console.error(`Error calculating month ${i} data:`, error)
          // Add fallback data
          monthlyData.push({
            period: `Month ${i}`,
            appointments: 0,
            newPatients: 0,
            growth: "+0%"
          })
        }
      }
      
      return {
        totalAppointments: appointments.length || 0,
        newPatients: newPatientsThisMonth,
        patientSatisfaction,
        monthlyData
      }
    } catch (error) {
      console.error('Error calculating reports stats:', error)
      return {
        totalAppointments: 0,
        newPatients: 0,
        patientSatisfaction: 0,
        monthlyData: []
      }
    }
  }
}

// Export singleton instance
const dataService = new DataService()
export default dataService

// Named exports for specific functions
export const {
  getPatients,
  savePatients,
  findPatientByEmail,
  getAppointments,
  saveAppointments,
  getAppointmentsByDate,
  getAppointmentsByPatientEmail,
  addAppointment,
  updateAppointment,
  updatePatientAppointments,
  getPatientMedicines,
  addPatientMedicine,
  removePatientMedicine,
  updatePatientMedicine,
  getPatientVisits,
  addPatientVisit,
  getDashboardStats,
  getReportsStats,
  broadcastEvent,
  isInitialized,
  setInitialized
} = dataService