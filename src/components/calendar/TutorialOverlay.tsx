import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ArrowRight, ArrowLeft, Lightbulb, Calendar as CalendarIcon, Plus, Search, Bell } from 'lucide-react'; // Renamed Calendar to CalendarIcon

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ReactNode;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to EventFlow Calendar!',
    description: 'Let\'s take a quick tour to help you master your event management. Click Next to begin your journey.',
    target: '.calendar-header',
    position: 'bottom',
    icon: <CalendarIcon className="h-5 w-5" /> // Using CalendarIcon
  },
  {
    id: 'add-event',
    title: 'Create Your First Event',
    description: 'Click on any date to create a new event. You can add titles, descriptions, set reminders, and even invite others!',
    target: '.calendar-grid',
    position: 'top',
    icon: <Plus className="h-5 w-5" />
  },
  {
    id: 'search-events',
    title: 'Smart Search',
    description: 'Use the search bar to quickly find events by title, description, or date. Our AI-powered search understands natural language!',
    target: '.search-bar',
    position: 'bottom',
    icon: <Search className="h-5 w-5" />
  },
  {
    id: 'notifications',
    title: 'Stay Updated',
    description: 'Today\'s events are automatically highlighted. Get smart notifications and never miss important moments!',
    target: '.todays-events',
    position: 'right',
    icon: <Bell className="h-5 w-5" />
  },
  {
    id: 'drag-drop',
    title: 'Drag & Drop Magic',
    description: 'Easily reschedule events by dragging them to new dates. Our conflict detection will warn you about overlapping events!',
    target: '.calendar-grid',
    position: 'top',
    icon: <ArrowRight className="h-5 w-5" />
  }
];

interface TutorialOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowTooltip(true);
      setCurrentStep(0);
    }
  }, [isVisible]);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTutorial = () => {
    setShowTooltip(false);
    localStorage.setItem('eventflow-tutorial-completed', 'true');
    onClose();
  };

  const skipTutorial = () => {
    setShowTooltip(false);
    localStorage.setItem('eventflow-tutorial-skipped', 'true');
    onClose();
  };

  if (!isVisible || !showTooltip) return null;

  const currentStepData = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="absolute inset-0 pointer-events-none">
        {/* Tutorial spotlight effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      </div>

      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-emerald-500/20 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                {currentStepData.icon}
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                {currentStep + 1} of {tutorialSteps.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipTutorial}
              className="h-6 w-6 text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-xl text-white">
            {currentStepData.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-slate-300 text-base leading-relaxed mb-6">
            {currentStepData.description}
          </CardDescription>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="text-slate-400 hover:text-white disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-emerald-500 w-6'
                      : index < currentStep
                        ? 'bg-emerald-600'
                        : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};