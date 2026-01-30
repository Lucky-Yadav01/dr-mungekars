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
import HomePage from './Components/Home/HomePage'
import LoginPage from './Components/LoginPage'
import MainLayout from './Admin-pannel/layout/MainLayout'
import EmployeePanel from './Employee-pannel/EmployeePanel'
import adminRoutes from './Admin-pannel/routes'
import HomeNavbar from './Components/Home/HomeNavbar' // public navbar
import Blog from './Components/Blog/blog'
import BlogPost from './Components/Blog/BlogPost'
import Services from './Components/Services/services'
import AboutUS from './Components/AboutUs/AboutUs'
import Footer from './Components/Footer'

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {/* show public navbar only when not on admin routes */}
      {!isAdmin && <HomeNavbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUS />} />
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

      {/* Footer – show only when not on admin routes */}
      {!isAdmin && <Footer />}
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


