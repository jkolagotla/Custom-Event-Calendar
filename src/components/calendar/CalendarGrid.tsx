// src/components/calendar/CalendarGrid.tsx
import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { CalendarEvent } from '@/components/calendar/CalendarProvider'; // Import CalendarEvent

interface CalendarGridProps {
  currentDate: Date;
  onDateClick: (date: Date) => void;
  onEventEdit: (event: CalendarEvent) => void; // Use CalendarEvent
  dayCellBgColor: string;
  dayCellTextColor: string;
  todayHighlightBorder: string;
  todayHighlightBg: string;
  cellHeightClass: string;
  events: CalendarEvent[]; // Use CalendarEvent
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  onDateClick,
  onEventEdit,
  dayCellBgColor,
  dayCellTextColor,
  todayHighlightBorder,
  todayHighlightBg,
  cellHeightClass,
  events,
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  const today = new Date();

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, 'd');
      const cloneDay = day;
      // Filter events relevant to the current day using the `events` prop
      // Use the 'date' property directly as it's now a Date object
      const dayEvents = events.filter(event => isSameDay(event.date, cloneDay));

      let cellClasses = `${dayCellBgColor} ${dayCellTextColor} p-2 relative ${cellHeightClass} border border-[#FF69B4] flex flex-col cursor-pointer transition-all duration-200 hover:shadow-md`;

      if (!isSameMonth(cloneDay, monthStart)) {
        cellClasses += ' opacity-50';
      }

      if (isSameDay(cloneDay, today)) {
        cellClasses = `${todayHighlightBg} ${dayCellTextColor} p-2 relative ${cellHeightClass} ${todayHighlightBorder} border-2 flex flex-col cursor-pointer transition-all duration-200 hover:shadow-lg`;
      }

      days.push(
        <div
          className={cellClasses}
          key={cloneDay.toISOString()}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className={`text-lg font-semibold ${isSameMonth(cloneDay, monthStart) ? dayCellTextColor : 'text-gray-500'}`}>
            {formattedDate}
          </span>
          <div className="flex-grow overflow-y-auto mt-1 space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className={`${event.color} text-white text-xs rounded-md px-2 py-0.5 truncate`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventEdit(event);
                }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-px" key={day.toISOString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="calendar-grid w-full">
      <div className="grid grid-cols-7 gap-px text-center font-bold text-lg mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
          <div key={dayName} className="text-[#FF69B4] p-2">
            {dayName}
          </div>
        ))}
      </div>
      <div className="border border-[#FF69B4]">
        {rows}
      </div>
    </div>
  );
};