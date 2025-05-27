// src/components/calendar/CalendarProvider.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { addDays, addWeeks, addMonths, isSameDay } from 'date-fns';

// Define the structure of a Calendar Event
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string; // Optional description
  date: Date; // Stored as a Date object
  time: string;
  endTime?: string; // Optional end time
  color: string;
  category?: string; // Optional category
  recurrence?: {
    type: 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';
    interval?: number;
    endDate?: Date; // End date for recurrence, stored as Date object
    daysOfWeek?: number[]; // For custom weekly recurrence (0 for Sunday, 1 for Monday, etc.)
  };
}

// Define the shape of the Calendar context state
interface CalendarState {
  events: CalendarEvent[];
  filteredEvents: CalendarEvent[];
  searchTerm: string;
  selectedCategory: string;
}

// Define the types of actions that can be dispatched to the reducer
type CalendarAction =
  | { type: 'ADD_EVENT'; event: CalendarEvent }
  | { type: 'UPDATE_EVENT'; event: CalendarEvent }
  | { type: 'DELETE_EVENT'; id: string }
  | { type: 'SET_SEARCH'; term: string }
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'LOAD_EVENTS'; events: CalendarEvent[] };

// Create the Calendar Context
const CalendarContext = createContext<{
  state: CalendarState;
  dispatch: React.Dispatch<CalendarAction>;
  getEventsForDate: (date: Date) => CalendarEvent[];
  generateRecurringEvents: (event: CalendarEvent) => CalendarEvent[];
} | null>(null);

// Reducer function to manage calendar state
const calendarReducer = (state: CalendarState, action: CalendarAction): CalendarState => {
  switch (action.type) {
    case 'ADD_EVENT':
      const newEvents = [...state.events, action.event];
      return {
        ...state,
        events: newEvents,
        filteredEvents: filterEvents(newEvents, state.searchTerm, state.selectedCategory),
      };

    case 'UPDATE_EVENT':
      const updatedEvents = state.events.map(event =>
        event.id === action.event.id ? action.event : event
      );
      return {
        ...state,
        events: updatedEvents,
        filteredEvents: filterEvents(updatedEvents, state.searchTerm, state.selectedCategory),
      };

    case 'DELETE_EVENT':
      const remainingEvents = state.events.filter(event => event.id !== action.id);
      return {
        ...state,
        events: remainingEvents,
        filteredEvents: filterEvents(remainingEvents, state.searchTerm, state.selectedCategory),
      };

    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.term,
        filteredEvents: filterEvents(state.events, action.term, state.selectedCategory),
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.category,
        filteredEvents: filterEvents(state.events, state.searchTerm, action.category),
      };

    case 'LOAD_EVENTS':
      return {
        ...state,
        events: action.events,
        filteredEvents: filterEvents(action.events, state.searchTerm, state.selectedCategory),
      };

    default:
      return state;
  }
};

// Helper function to filter events based on search term and category
const filterEvents = (events: CalendarEvent[], searchTerm: string, category: string) => {
  return events.filter(event => {
    const matchesSearch = searchTerm === '' ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())); // Check if description exists

    const matchesCategory = category === '' || event.category === category;

    return matchesSearch && matchesCategory;
  });
};

// CalendarProvider component that wraps your application
export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, {
    events: [],
    filteredEvents: [],
    searchTerm: '',
    selectedCategory: '',
  });

  // Effect to load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar-events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date), // Convert ISO string back to Date object
          recurrence: event.recurrence ? {
            ...event.recurrence,
            endDate: event.recurrence.endDate ? new Date(event.recurrence.endDate) : undefined,
          } : undefined,
        }));
        dispatch({ type: 'LOAD_EVENTS', events: parsedEvents });
      } catch (error) {
        console.error("Failed to parse events from localStorage:", error);
      }
    }
  }, []);

  // Effect to save events to localStorage whenever the 'events' state changes
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(state.events));
  }, [state.events]);

  // Function to generate recurring events based on recurrence rules
  const generateRecurringEvents = (event: CalendarEvent): CalendarEvent[] => {
    if (!event.recurrence || event.recurrence.type === 'none') {
      return [event];
    }

    const events: CalendarEvent[] = [event];
    const { type, interval = 1, endDate, daysOfWeek } = event.recurrence;
    // Default to 1 year of recurrence if no end date is specified
    const maxDate = endDate || addMonths(event.date, 12);
    let currentDate = new Date(event.date);

    // Loop to generate recurring instances
    while (currentDate <= maxDate) {
      switch (type) {
        case 'daily':
          currentDate = addDays(currentDate, interval);
          break;
        case 'weekly':
          currentDate = addWeeks(currentDate, interval);
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, interval);
          break;
        case 'custom':
          if (daysOfWeek && daysOfWeek.length > 0) {
            // For custom weekly recurrence on specific days
            currentDate = addDays(currentDate, 1); // Move to next day
            // Find the next day that matches one of the daysOfWeek
            while (!daysOfWeek.includes(currentDate.getDay()) && currentDate <= maxDate) {
              currentDate = addDays(currentDate, 1);
            }
          } else {
            currentDate = addDays(currentDate, interval); // Fallback if custom is defined but no daysOfWeek
          }
          break;
      }

      if (currentDate <= maxDate) {
        events.push({
          ...event,
          id: `${event.id}-${currentDate.getTime()}`, // Generate unique ID for recurring instances
          date: new Date(currentDate), // Ensure it's a new Date object
        });
      }
    }

    return events;
  };

  // Function to get events for a specific date, including recurring ones
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const allEvents: CalendarEvent[] = [];

    state.filteredEvents.forEach(event => {
      const recurringEvents = generateRecurringEvents(event);
      const eventsForDate = recurringEvents.filter(e => isSameDay(e.date, date));
      allEvents.push(...eventsForDate);
    });

    // Sort events by time
    return allEvents.sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <CalendarContext.Provider value={{
      state,
      dispatch,
      getEventsForDate,
      generateRecurringEvents,
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

// Custom hook to use the Calendar context
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
};