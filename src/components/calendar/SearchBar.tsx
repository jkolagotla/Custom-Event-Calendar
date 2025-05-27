import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useCalendar } from './CalendarProvider';

interface SearchBarProps {
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const { state, dispatch } = useCalendar();

  const handleSearchChange = (value: string) => {
    dispatch({ type: 'SET_SEARCH', term: value });
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_SEARCH', term: '' });
  };

  return (
    <div className={`relative w-full max-w-md ${className ?? ''}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#692475]" />
        <Input
          type="text"
          placeholder="Search events..."
          value={state.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10 bg-white/90 border-[#ffcde8]/30 focus:border-[#F4C2C2] focus:ring-[#f5c0e9] placeholder:text-[#F4C2C2]/60"
        />
        {state.searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-[#82AB7D]/10 text-[#692475]"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      {state.searchTerm && (
        <div className="mt-2 text-sm text-[#deb9e5]">
          {state.filteredEvents.length} event(s) found
        </div>
      )}
    </div>
  );
};
