import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import adminRoutes from '../routes'
import Navbar from '../Components/Navbar'

const sidebarLinks = adminRoutes.filter((route) => route.label)

const normalizePath = (pathname) => {
  if (pathname === '/') return pathname
  return pathname.replace(/\/+$/, '') || '/'
}

const MainLayout = ({ children }) => {
  const location = useLocation()
  const normalizedPath = normalizePath(location.pathname)
  const activeRoute =
    sidebarLinks.find((route) => route.to === normalizedPath) ??
    sidebarLinks.find((route) => route.index)

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-700">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-24 flex items-center justify-center border-b border-gray-200">
          <div className="w-14 h-14 rounded-full border-2 border-amber-500 flex items-center justify-center text-xl font-semibold text-amber-600 tracking-wide">
            DM
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <p className="px-6 pt-6 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Navigation
          </p>
          <nav className="mt-3 px-2 space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.key}
                to={link.to}
                end={link.index}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors',
                    isActive
                      ? 'bg-amber-50 text-amber-700 border border-amber-100'
                      : 'text-gray-600 hover:bg-gray-50',
                  ].join(' ')
                }
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Dr. Mungekar&apos;s Clinic
        </div>
      </aside>

      {/* Content area */}
      <section className="flex-1 flex flex-col">
        <Navbar pageTitle={activeRoute?.pageTitle ?? 'Admin Console'} />

        <main className="flex-1 overflow-y-auto p-8 bg-amber-50/50">
          {children ?? <Outlet />}
        </main>
      </section>
    </div>
  )
}

export default MainLayout
