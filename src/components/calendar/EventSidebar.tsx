// src/components/calendar/EventSidebar.tsx
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { CalendarEvent } from '@/components/calendar/CalendarProvider'; // Import CalendarEvent
import { Button } from '@/components/ui/button';

interface EventSidebarProps {
  selectedDate: Date | null;
  onEventEdit: (event: CalendarEvent) => void; // Use CalendarEvent
  events: CalendarEvent[]; // Use CalendarEvent
  onAddEvent: (date: Date) => void;
}

export const EventSidebar: React.FC<EventSidebarProps> = ({ selectedDate, onEventEdit, events, onAddEvent }) => {
  const filteredEvents = selectedDate
    ? events.filter(event => isSameDay(event.date, selectedDate)) // Compare Date objects directly
    : [];

  return (
    <div className="event-sidebar p-4 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-[#FFDCEF]">{selectedDate ? format(selectedDate, 'PPP') : 'Select a Date'} Events</h2>
      <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div
              key={event.id}
              className={`p-4 rounded-lg shadow-md ${event.color} text-white cursor-pointer transition-all duration-200 hover:scale-[1.02]`}
              onClick={() => onEventEdit(event)}
            >
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm opacity-90">{event.time}</p>
            </div>
          ))
        ) : (
          <p className="text-[#FFDCEF]/70 text-center mt-8">No events for this day.</p>
        )}
      </div>
      {selectedDate && (
        <Button
          onClick={() => onAddEvent(selectedDate)}
          className="mt-6 w-full bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4] hover:from-[#FF69B4] hover:to-[#FFDCEF]
                     text-[#0A0A0A] rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Add New Event
        </Button>
      )}
    </div>
  );
};