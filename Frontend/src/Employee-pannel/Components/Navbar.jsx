import React from 'react'

const Navbar = ({ pageTitle = 'Admin Console', onLogout }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-400">Employee console</p>
        <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="pl-4 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-sm">
            /
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-full border border-amber-500 text-amber-600 font-semibold hover:bg-amber-50 transition"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
