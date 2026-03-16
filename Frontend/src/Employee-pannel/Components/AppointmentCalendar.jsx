import React, { useMemo, useState } from 'react'

const formatDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parseDateKey = (dateKey) => {
  if (!dateKey) return new Date()
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, (month || 1) - 1, day || 1)
}

const AppointmentCalendar = ({
  appointments = [],
  selectedDate,
  onDateSelect,
  title = 'Appointment Calendar',
  compact = true,
}) => {
  const initialDate = selectedDate ? parseDateKey(selectedDate) : new Date()
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  )

  const appointmentCountByDate = useMemo(() => {
    const counts = new Map()
    appointments.forEach((appointment) => {
      if (!appointment?.date) return
      counts.set(appointment.date, (counts.get(appointment.date) || 0) + 1)
    })
    return counts
  }, [appointments])

  const selectedDateKey = selectedDate || formatDateKey(new Date())
  const selectedCount = appointmentCountByDate.get(selectedDateKey) || 0

  const monthGrid = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const startDay = new Date(year, month, 1).getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()

    const cells = []
    for (let i = 0; i < startDay; i += 1) cells.push(null)
    for (let day = 1; day <= totalDays; day += 1) {
      cells.push(new Date(year, month, day))
    }
    return cells
  }, [currentMonth])

  const todayKey = formatDateKey(new Date())
  const selectedDateLabel = parseDateKey(selectedDateKey).toLocaleDateString('en-IN')

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${compact ? 'p-3' : 'p-3 md:p-4'}`}>
      <div className={`flex items-center justify-between gap-3 ${compact ? 'mb-2.5' : 'mb-3'}`}>
        <div>
          <h3 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-900`}>{title}</h3>
          <p className="text-xs text-gray-500 mt-1">Selected date: {selectedDateLabel}</p>
        </div>
        <div className={`inline-flex items-center gap-2 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 ${compact ? 'px-2.5 py-1' : 'px-3 py-1'}`}>
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          {selectedCount} appointments
        </div>
      </div>

      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-2.5'}`}>
        <button
          type="button"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          className={`${compact ? 'h-6 w-6' : 'h-7 w-7'} rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition`}
          aria-label="Previous month"
        >
          ←
        </button>
        <p className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-gray-800`}>
          {currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </p>
        <button
          type="button"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className={`${compact ? 'h-6 w-6' : 'h-7 w-7'} rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition`}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className={`grid grid-cols-7 text-[11px] text-gray-500 ${compact ? 'gap-1 mb-1' : 'gap-1.5 mb-1.5'}`}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium">{day}</div>
        ))}
      </div>

      <div className={`grid grid-cols-7 ${compact ? 'gap-1' : 'gap-1.5'}`}>
        {monthGrid.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className={`${compact ? 'h-8' : 'h-9'} rounded-lg`} />
          }

          const dateKey = formatDateKey(date)
          const count = appointmentCountByDate.get(dateKey) || 0
          const isSelected = dateKey === selectedDateKey
          const isToday = dateKey === todayKey

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onDateSelect(dateKey)}
              className={`${compact ? 'h-8 text-xs' : 'h-9 text-sm'} rounded-lg border relative transition ${
                isSelected
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : isToday
                  ? 'border-amber-200 bg-amber-50/70 text-amber-800'
                  : 'border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50/40'
              }`}
            >
              {date.getDate()}
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 px-1 h-4 rounded-full text-[9px] leading-4 bg-amber-500 text-white font-semibold">
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => onDateSelect(todayKey)}
        className={`${compact ? 'mt-3 text-xs' : 'mt-4 text-sm'} text-amber-700 font-medium hover:text-amber-800 transition`}
      >
        Jump to Today
      </button>
    </div>
  )
}

export default AppointmentCalendar
