// src/components/calendar/EventDialog.tsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // Import format from date-fns for date display
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EventType } from '@/pages/Calendar'; // Import EventType
import { EVENT_COLORS } from '@/pages/Calendar'; // Import EVENT_COLORS

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  editingEvent: EventType | null;
  availableColors: string[]; // This prop should be passed from Calendar.tsx
  onSave: (event: EventType) => void; // This prop should be passed from Calendar.tsx
}

export const EventDialog: React.FC<EventDialogProps> = ({
  isOpen,
  onClose,
  selectedDate,
  editingEvent,
  availableColors = EVENT_COLORS, // Use default from Calendar.tsx if not provided
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>(availableColors[0] || 'bg-gray-500');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setTime(editingEvent.time);
      setSelectedColor(editingEvent.color || availableColors[0]);
    } else {
      setTitle('');
      setTime('');
      // For a new event, pre-select the first available color or a default grey
      setSelectedColor(availableColors[0] || 'bg-gray-500');
    }
  }, [editingEvent, selectedDate, availableColors]); // Depend on availableColors to reset color when they change

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !time.trim()) {
      // You might want to add a toast notification here for user feedback
      console.error("Title and Time are required.");
      return;
    }

    const newEvent: EventType = {
      id: editingEvent?.id || `event-${Date.now()}`, // Generate unique ID if new event
      title,
      time,
      // Store date as an ISO string for easier serialization/deserialization
      date: selectedDate ? selectedDate.toISOString() : '',
      color: selectedColor,
    };

    onSave(newEvent); // Call the save handler passed from Calendar.tsx
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] text-[#FFDCEF] border border-[#FF69B4] rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#FFDCEF]">
            {editingEvent ? 'Edit Event' : `Add Event for ${selectedDate ? format(selectedDate, 'PPP') : ''}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-[#FFDCEF]">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3 bg-[#0A0A0A] text-[#FFDCEF] border border-[#FF69B4] focus:ring-[#FFDCEF]"
                required
              />
            </div>
            {/* Time Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right text-[#FFDCEF]">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="col-span-3 bg-[#0A0A0A] text-[#FFDCEF] border border-[#FF69B4] focus:ring-[#FFDCEF]"
                required
              />
            </div>

            {/* Color Picker Section */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-[#FFDCEF]">
                Color
              </Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {availableColors.map((colorClass, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${colorClass} ${
                      selectedColor === colorClass ? 'border-white ring-2 ring-[#FFDCEF]' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedColor(colorClass)}
                    title={colorClass.replace('bg-', '')} // Display color name on hover
                  />
                ))}
              </div>
            </div>

          </div>
          <DialogFooter>
            <Button type="submit" className="bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4] hover:from-[#FF69B4] hover:to-[#FFDCEF] text-[#0A0A0A] rounded-xl font-semibold">
              {editingEvent ? 'Save Changes' : 'Add Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};