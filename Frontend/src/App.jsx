import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'
import AdminPanel from './Admin-pannel/pages/AdminPanel'
import EmployeePanel from './Employee-pannel/EmployeePanel'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/employee" element={<EmployeePanel />} />
      </Routes>
    </Router>
  )
}

export default App