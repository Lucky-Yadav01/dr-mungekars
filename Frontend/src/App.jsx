// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import HomePage from './Components/HomePage'
// import LoginPage from './Components/LoginPage'
// import MainLayout from './Admin-pannel/layout/MainLayout'
// import EmployeePanel from './Employee-pannel/EmployeePanel'
// import adminRoutes from './Admin-pannel/routes'
// import HomeNavbar from './Components/HomeNavbar'; // Adjust the path if necessary


// function App() {
//   return (
//     <Router>
//       <HomeNavbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/admin" element={<MainLayout />}>
//           {adminRoutes.map((route) =>
//             route.index ? (
//               <Route key={route.key} index element={route.element} />
//             ) : (
//               <Route key={route.key} path={route.path} element={route.element} />
//             )
//           )}
//         </Route>
//         <Route path="/employee" element={<EmployeePanel />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'
import MainLayout from './Admin-pannel/layout/MainLayout'
import EmployeePanel from './Employee-pannel/EmployeePanel'
import adminRoutes from './Admin-pannel/routes'
import HomeNavbar from './Components/HomeNavbar' // public navbar

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {/* show public navbar only when not on admin routes */}
      {!isAdmin && <HomeNavbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<MainLayout />}>
          {adminRoutes.map((route) =>
            route.index ? (
              <Route key={route.key} index element={route.element} />
            ) : (
              <Route key={route.key} path={route.path} element={route.element} />
            )
          )}
        </Route>
        <Route path="/employee" element={<EmployeePanel />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}