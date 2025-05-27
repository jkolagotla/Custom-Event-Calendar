import React, { useState, useEffect } from 'react';
import { useCalendar } from './CalendarProvider';
import { format, isToday } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Bell, Clock, Calendar as CalendarIcon, X, ChevronDown, ChevronUp } from 'lucide-react'; // Renamed Calendar to CalendarIcon
import { toast } from '@/hooks/use-toast';

export const TodaysEventsNotification: React.FC = () => {
  const { getEventsForDate } = useCalendar();
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasShownNotification, setHasShownNotification] = useState(false);

  const today = new Date();
  const todaysEvents = getEventsForDate(today);

  useEffect(() => {
    if (todaysEvents.length > 0 && !hasShownNotification) {
      toast({
        title: "Today's Events",
        description: `You have ${todaysEvents.length} event${todaysEvents.length > 1 ? 's' : ''} scheduled for today`,
        duration: 5000,
      });
      setHasShownNotification(true);
    }
  }, [todaysEvents.length, hasShownNotification]);

  if (todaysEvents.length === 0) {
    return (
      <div className="bg-[#787878] border border-[#ffcde8]/20 rounded-xl p-4 mb-6 shadow-2xl"> {/* Medium grey background, light pink border with transparency */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#ffcde8]/10 rounded-lg"> {/* Light pink background with transparency */}
            <CalendarIcon className="h-5 w-5 text-[#ffcde8]" /> {/* Light pink icon */}
          </div>
          <div>
            <h3 className="text-[#ffcde8] font-semibold">Today's Schedule</h3> {/* Light pink text */}
            <p className="text-[#ffcde8]/70 text-sm">No events scheduled for today</p> {/* Light pink text with transparency */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#787878] border border-[#ffcde8]/20 rounded-xl overflow-hidden mb-6 shadow-2xl"> {/* Medium grey background, light pink border with transparency */}
      {/* Header */}
      <div className="px-4 py-3 bg-[#ffcde8]/20 border-b border-[#ffcde8]/20"> {/* Light pink background with transparency, light pink border with transparency */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="h-5 w-5 text-[#ffcde8]" /> {/* Light pink icon */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ffcde8] rounded-full animate-pulse"></div> {/* Light pink dot */}
            </div>
            <div>
              <h3 className="text-[#ffcde8] font-semibold">Today's Events</h3> {/* Light pink text */}
              <p className="text-[#ffcde8]/70 text-xs"> {/* Light pink text with transparency */}
                {format(today, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#ffcde8]/20 text-[#ffcde8] px-2 py-1 rounded-full text-xs font-medium"> {/* Light pink background with transparency, light pink text */}
              {todaysEvents.length} event{todaysEvents.length > 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#ffcde8] hover:text-white hover:bg-[#ffcde8]/10 h-8 w-8 p-0" // Light pink text, white text on hover, light pink background on hover with transparency
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Events List */}
      {isExpanded && (
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {todaysEvents.map((event: any) => ( // Added 'any' type to event for now, consider defining a proper Event type
            <div
              key={event.id}
              className="bg-[#787878]/50 border border-[#787878]/30 rounded-lg p-3 hover:bg-[#787878]/70 transition-all duration-200 group" // Medium grey background and border with transparencies
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: event.color }} // Keep dynamic event colors
                    ></div>
                    <h4 className="text-[#ffcde8] font-medium text-sm group-hover:text-white transition-colors"> {/* Light pink text, white on hover */}
                      {event.title}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-[#ffcde8]/80"> {/* Light pink text with transparency */}
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                      {event.endTime && <span>- {event.endTime}</span>}
                    </div>
                    {event.category && (
                      <span className="bg-[#787878]/50 px-2 py-0.5 rounded text-[#ffcde8]/90"> {/* Medium grey background with transparency, light pink text with transparency */}
                        {event.category}
                      </span>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-[#ffcde8]/70 text-xs mt-2 line-clamp-2"> {/* Light pink text with transparency */}
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {isExpanded && (
        <div className="px-4 py-3 bg-[#787878]/30 border-t border-[#ffcde8]/10"> {/* Medium grey background with transparency, light pink border with transparency */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-[#ffcde8] font-semibold text-sm">{todaysEvents.length}</div> {/* Light pink text */}
              <div className="text-[#ffcde8]/80 text-xs">Total Events</div> {/* Light pink text with transparency */}
            </div>
            <div>
              <div className="text-[#ffcde8] font-semibold text-sm"> {/* Light pink text */}
                {todaysEvents.filter(e => new Date(`2000-01-01 ${e.time}`) < new Date()).length}
              </div>
              <div className="text-[#ffcde8]/80 text-xs">Completed</div> {/* Light pink text with transparency */}
            </div>
            <div>
              <div className="text-[#ffcde8] font-semibold text-sm"> {/* Light pink text */}
                {todaysEvents.filter(e => new Date(`2000-01-01 ${e.time}`) >= new Date()).length}
              </div>
              <div className="text-[#ffcde8]/80 text-xs">Upcoming</div> {/* Light pink text with transparency */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};