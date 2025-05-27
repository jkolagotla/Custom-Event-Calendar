import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

const quickTips = [
  {
    title: 'Smart Scheduling',
    content: 'EventFlow automatically detects conflicts and suggests better times for your events.',
    action: 'Try dragging an event to a busy time slot!'
  },
  {
    title: 'Natural Language Search',
    content: 'Search for events using phrases like "team meetings this week" or "doctor appointments".',
    action: 'Try searching now!'
  },
  {
    title: 'Color Coding',
    content: 'Assign different colors to event categories for better visual organization.',
    action: 'Create a work event and choose a color!'
  },
  {
    title: 'Quick Event Creation',
    content: 'Double-click any date to instantly create an all-day event.',
    action: 'Try it on tomorrow\'s date!'
  },
  {
    title: 'Smart Reminders',
    content: 'Set intelligent reminders that adapt based on event importance and your schedule.',
    action: 'Add a reminder to your next event!'
  }
];

export const QuickTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenTips, setHasSeenTips] = useState(false);

  useEffect(() => {
    const hasSeenBefore = localStorage.getItem('eventflow-tips-seen');
    if (!hasSeenBefore) {
      setTimeout(() => setIsVisible(true), 3000); // Show after 3 seconds
    }
    setHasSeenTips(!!hasSeenBefore);
  }, []);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % quickTips.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + quickTips.length) % quickTips.length);
  };

  const closeTips = () => {
    setIsVisible(false);
    localStorage.setItem('eventflow-tips-seen', 'true');
  };

  if (!isVisible || hasSeenTips) return null;

  const tip = quickTips[currentTip];

  return (
    <Card className="fixed bottom-20 left-6 z-40 w-80 bg-gradient-to-br from-emerald-900/95 via-emerald-800/95 to-emerald-900/95 backdrop-blur-sm border-emerald-500/30 shadow-2xl animate-fade-in">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <Lightbulb className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="text-emerald-300 font-medium text-sm">Quick Tip</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeTips}
            className="h-6 w-6 text-emerald-400 hover:text-white hover:bg-emerald-700/50"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <h3 className="text-white font-semibold mb-2">{tip.title}</h3>
        <p className="text-emerald-100 text-sm mb-3 leading-relaxed">{tip.content}</p>
        
        <div className="text-emerald-300 text-xs font-medium mb-4 p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
          💡 {tip.action}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {quickTips.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  index === currentTip ? 'bg-emerald-400 w-4' : 'bg-emerald-600'
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTip}
              className="h-7 w-7 text-emerald-400 hover:text-white hover:bg-emerald-700/50"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTip}
              className="h-7 w-7 text-emerald-400 hover:text-white hover:bg-emerald-700/50"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
