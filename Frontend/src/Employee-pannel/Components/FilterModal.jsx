import React from 'react'

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

const FilterModal = ({ filters, onApply, onClose, doctorOptions = [] }) => {
  const [localFilters, setLocalFilters] = React.useState(filters)

  React.useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  return (
    <Modal title="Filter Appointments" onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={localFilters.status}
              onChange={(event) => setLocalFilters((prev) => ({ ...prev, status: event.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              value={localFilters.doctor}
              onChange={(event) => setLocalFilters((prev) => ({ ...prev, doctor: event.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Doctors</option>
              {doctorOptions.map((doctor) => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
            <select
              value={localFilters.timeSlot}
              onChange={(event) => setLocalFilters((prev) => ({ ...prev, timeSlot: event.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Slots</option>
              <option value="morning">Morning (Before 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (After 5 PM)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={localFilters.date || ''}
              onChange={(event) => setLocalFilters((prev) => ({ ...prev, date: event.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={localFilters.sortBy || 'newest'}
              onChange={(event) => setLocalFilters((prev) => ({ ...prev, sortBy: event.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
              <option value="name-asc">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setLocalFilters({ status: 'all', doctor: 'all', timeSlot: 'all', date: '', sortBy: 'newest' })}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply(localFilters)
              onClose()
            }}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default FilterModal