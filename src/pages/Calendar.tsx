// src/pages/Calendar.tsx
import React, { useState, useEffect } from 'react';
import { CalendarProvider, CalendarEvent } from '@/components/calendar/CalendarProvider';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { EventSidebar } from '@/components/calendar/EventSidebar';
import { EventDialog } from '@/components/calendar/EventDialog';
import { SearchBar } from '@/components/calendar/SearchBar';
import { TodaysEventsNotification } from '@/components/calendar/TodaysEventsNotification';
import { TutorialOverlay } from '@/components/calendar/TutorialOverlay';
import { FloatingHelp } from '@/components/calendar/FloatingHelp';
import { QuickTips } from '@/components/calendar/QuickTips';
import { Button } from '@/components/ui/button';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { isSameDay } from 'date-fns'; // parseISO is not needed here as dates are Date objects

// Define your list of 10 (or more) event colors here
// Use Tailwind CSS background color classes
export const EVENT_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-lime-500'
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // State to manage all events, using CalendarEvent from CalendarProvider for consistency
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Effect to load dummy events or saved events from localStorage on initial mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    if (!savedEvents && events.length === 0) {
      setEvents([
        { id: '1', title: 'Project Deadline', description: 'Complete final report', date: new Date(2025, 4, 15), time: '10:00 AM', color: 'bg-blue-500' },
        { id: '2', title: 'Team Meeting', description: 'Discuss Q2 goals', date: new Date(2025, 4, 20), time: '02:00 PM', color: 'bg-green-500' },
        { id: '3', title: 'Client Call', description: 'Review progress with client', date: new Date(2025, 4, 27), time: '04:30 PM', color: 'bg-red-500' },
        { id: '4', title: 'Birthday Party', description: 'Celebrate John\'s birthday', date: new Date(2025, 4, 27), time: '07:00 PM', color: 'bg-purple-500' },
        { id: '5', title: 'Dentist Appointment', description: 'Annual check-up', date: new Date(2025, 5, 5), time: '09:00 AM', color: 'bg-orange-500' },
      ]);
    } else if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date), // Convert ISO string back to Date object
          recurrence: event.recurrence ? {
            ...event.recurrence,
            endDate: event.recurrence.endDate ? new Date(event.recurrence.endDate) : undefined,
          } : undefined,
        }));
        setEvents(parsedEvents);
      } catch (error) {
        console.error("Failed to parse events from localStorage:", error);
      }
    }
  }, []); // Run once on component mount

  // Effect to save events to localStorage whenever the 'events' state changes
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);

  // Effect to show welcome toast on initial load
  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem('eventflow-tutorial-completed');
    const hasSkippedTutorial = localStorage.getItem('eventflow-tutorial-skipped');

    if (!hasCompletedTutorial && !hasSkippedTutorial) {
      setTimeout(() => {
        toast({
          title: 'Welcome to EventFlow! 🎉',
          description: 'New here? Click the tutorial button to learn the ropes!',
          duration: 5000,
        });
      }, 1000);
    }
  }, [toast]);

  // Handler for clicking on a date cell
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null); // Ensure no event is being edited for a new entry
    setIsEventDialogOpen(true);
  };

  // Handler for editing an existing event
  const handleEventEdit = (event: CalendarEvent) => {
    setSelectedDate(event.date); // selectedDate should be the actual Date object of the event
    setEditingEvent(event);
    setIsEventDialogOpen(true);
  };

  // Handler for saving a new or updated event
  const handleSaveEvent = (eventToSave: CalendarEvent) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event =>
        event.id === eventToSave.id ? eventToSave : event
      ));
      toast({
        title: 'Event Updated!',
        description: `${eventToSave.title} has been updated.`,
        duration: 3000,
      });
    } else {
      // Add new event
      const newId = `${eventToSave.title.replace(/\s/g, '-')}-${Date.now()}`;
      setEvents([...events, { ...eventToSave, id: newId }]);
      toast({
        title: 'Event Added!',
        description: `${eventToSave.title} has been added.`,
        duration: 3000,
      });
    }
    setIsEventDialogOpen(false);
    setEditingEvent(null);
  };

  // Handler for deleting an event
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: 'Event Deleted!',
      description: 'The event has been successfully removed.',
      duration: 3000,
      variant: 'destructive',
    });
    setIsEventDialogOpen(false);
    setEditingEvent(null);
  };

  return (
    <CalendarProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-[#FFDCEF] p-8">
        <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-4rem)]">

          <div className="mb-8 flex justify-start">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="text-[#FFDCEF] hover:text-[#FF69B4] border-2 border-[#FFDCEF]/50 hover:border-[#FF69B4]
                         bg-[#1A1A1A] hover:bg-[#FFDCEF]/10 px-6 py-3 rounded-lg text-lg transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_360px] gap-8">

            {/* Left Sidebar */}
            <div className="flex flex-col space-y-8">
              {/* Help/Tutorial Card */}
              <div className="bg-[#1A1A1A]/70 backdrop-blur-md rounded-2xl p-6 border-2 border-[#FF69B4] shadow-xl text-center flex-shrink-0">
                <h3 className="text-2xl font-bold mb-4 text-[#FFDCEF]">Need help?</h3>
                <p className="text-base text-[#FFDCEF]/70 mb-6 leading-relaxed">
                  Learn how to maximize EventFlow with our comprehensive tutorial.
                </p>
                <Button
                  onClick={() => setShowTutorial(true)}
                  className="w-full bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4] hover:from-[#FF69B4] hover:to-[#FFDCEF]
                             text-[#0A0A0A] rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Start Tutorial
                </Button>
              </div>

              {/* Search Bar */}
              <div className="w-full">
                <SearchBar className="w-full p-3 text-lg bg-[#1A1A1A] text-[#FFDCEF] placeholder:text-[#FFDCEF]/50 border-2 border-[#FF69B4] rounded-xl focus:ring-2 focus:ring-[#FFDCEF] focus:outline-none transition-colors duration-300" />
              </div>

              {/* Today's Events Notification */}
              <div className="todays-events flex-grow">
                <TodaysEventsNotification />
              </div>
            </div>

            {/* Main Calendar Grid */}
            <div className="flex-1 bg-[#1A1A1A]/70 backdrop-blur-md rounded-2xl shadow-xl border-2 border-[#FF69B4] overflow-hidden flex flex-col p-6">
              <CalendarHeader currentDate={currentDate} onDateChange={setCurrentDate} />
              <div className="flex-1 mt-6">
                <CalendarGrid
                  currentDate={currentDate}
                  onDateClick={handleDateClick}
                  onEventEdit={handleEventEdit}
                  dayCellBgColor="bg-[#FFDCEF]" // Example prop for day cell background
                  dayCellTextColor="text-[#0A0A0A]" // Example prop for day cell text
                  todayHighlightBorder="border-[#FF69B4]" // Example prop for today's highlight border
                  todayHighlightBg="bg-[#FFDCEF]" // Example prop for today's highlight background
                  cellHeightClass="h-20" // Example prop for cell height
                  events={events} // Pass the dynamic events array
                />
              </div>
            </div>

            {/* Right Sidebar (Event Sidebar) */}
            <div className="bg-[#1A1A1A]/70 backdrop-blur-md rounded-2xl p-6 border-2 border-[#FF69B4] shadow-xl flex flex-col overflow-hidden">
                <EventSidebar
                    selectedDate={selectedDate}
                    onEventEdit={handleEventEdit}
                    // Filter events specific to the selected date for the sidebar
                    events={events.filter(event => selectedDate && isSameDay(event.date, selectedDate))}
                    onAddEvent={handleDateClick} // Pass the handler to add new event from sidebar
                />
            </div>

          </div>
        </div>

        {/* Overlays and Dialogs */}
        <TutorialOverlay isVisible={showTutorial} onClose={() => setShowTutorial(false)} />
        <FloatingHelp />
        <QuickTips />
        <EventDialog
          isOpen={isEventDialogOpen}
          onClose={() => setIsEventDialogOpen(false)}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
          availableColors={EVENT_COLORS} // Pass available colors to the dialog
          onSave={handleSaveEvent} // Pass save handler
          onDelete={handleDeleteEvent} // Pass delete handler
        />
      </div>
    </CalendarProvider>
  );
};

export default Calendar;