// Index.tsx
import React, { useState } from 'react';
import { CalendarProvider } from '@/components/calendar/CalendarProvider';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { EventSidebar } from '@/components/calendar/EventSidebar';
import { EventDialog } from '@/components/calendar/EventDialog';

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsEventDialogOpen(true);
    setEditingEvent(null);
  };

  const handleEventEdit = (event: any) => {
    setEditingEvent(event);
    setIsEventDialogOpen(true);
  };

  return (
    <CalendarProvider>
      <div className="min-h-screen bg-[#1A1A1A]"> {/* Updated to dark gray */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-[#0A0A0A] rounded-lg shadow-lg overflow-hidden"> {/* Updated to black */}
            <CalendarHeader 
              currentDate={currentDate}
              onDateChange={setCurrentDate}
            />
            
            <div className="flex">
              <div className="flex-1">
                <CalendarGrid
                  currentDate={currentDate}
                  onDateClick={handleDateClick}
                  onEventEdit={handleEventEdit}
                />
              </div>
              
              <EventSidebar
                selectedDate={selectedDate}
                onEventEdit={handleEventEdit}
              />
            </div>
          </div>
        </div>

        <EventDialog
          isOpen={isEventDialogOpen}
          onClose={() => setIsEventDialogOpen(false)}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
        />
      </div>
    </CalendarProvider>
  );
};

export default Index;