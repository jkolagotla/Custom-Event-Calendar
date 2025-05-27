import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = React.memo(
  ({ currentDate, onDateChange }) => {
    const navigateMonth = (direction: 'prev' | 'next') => {
      const newDate = direction === 'prev'
        ? subMonths(currentDate, 1)
        : addMonths(currentDate, 1);
      onDateChange(newDate);
    };

    const goToToday = () => onDateChange(new Date());

    return (
      <div className="flex items-center justify-between p-6 border-b border-[#E286B4]/50 bg-[#201E1F]"> {/* Dark grey background, pink/light purple border with transparency */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-[#E286B4] p-2 rounded-lg"> {/* Pink/light purple background */}
              <Calendar className="h-5 w-5 text-[#201E1F]" /> {/* Dark grey text */}
            </div>
            <h1 className="text-xl font-bold text-[#E286B4]"> {/* Pink/light purple text */}
              Event Calendar
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-[#E286B4] border-[#E286B4] hover:bg-[#E286B4] hover:text-[#201E1F]" // Pink/light purple outline, dark grey text on hover
          >
            Today
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('prev')}
            className="hover:bg-[#E286B4]/20 text-[#E286B4]" // Subtle pink/light purple hover, pink/light purple icon
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <h2 className="text-xl font-semibold text-[#E286B4] min-w-[200px] text-center"> {/* Pink/light purple text */}
            {format(currentDate, 'MMMM yyyy')}
          </h2>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('next')}
            className="hover:bg-[#E286B4]/20 text-[#E286B4]" // Subtle pink/light purple hover, pink/light purple icon
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }
);