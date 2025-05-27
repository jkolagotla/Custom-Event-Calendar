import React, { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  X,
  Keyboard,
  CalendarCheck,
  CalendarClock,
  PaintBucket,
  HelpCircle,
} from "lucide-react"

const tips = [
  "Use the keyboard arrows ← → to quickly switch months.",
  "Click on any event to view or edit its details.",
  "Color-code events by category for easier identification.",
  "Use the Today button to jump back to the current date.",
  "Use keyboard shortcut Ctrl + F to search your events instantly.",
]

const helpContent = [
  {
    category: "Event Management",
    icon: <CalendarCheck className="h-4 w-4 text-[#e49cc6]" />,
    items: [
      {
        title: "Creating Events",
        description: "Click on any date cell to create a new event.",
        shortcut: "Click +",
      },
      {
        title: "Editing Events",
        description: "Click on an existing event to modify its details.",
      },
    ],
  },
  {
    category: "Time Management",
    icon: <CalendarClock className="h-4 w-4 text-[#e49cc6]" />,
    items: [
      {
        title: "Recurring Events",
        description: "Use the recurrence option when creating events.",
      },
      {
        title: "Time Zones",
        description: "Events adjust automatically to your local time.",
      },
    ],
  },
  {
    category: "Customization",
    icon: <PaintBucket className="h-4 w-4 text-[#e49cc6]" />,
    items: [
      {
        title: "Color Coding",
        description: "Assign colors to event types for quick visual reference.",
      },
      {
        title: "Themes",
        description: "Choose between light, dark, or custom themes in settings.",
      },
    ],
  },
]

export function FloatingHelp() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const [openSections, setOpenSections] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const toggleSection = (category: string) => {
    setOpenSections((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-96 bg-[#2e2a31] border border-[#e49cc6] shadow-[0_0_20px_#e49cc6] rounded-xl overflow-hidden max-h-[calc(100vh-32px)]">
          <CardHeader className="pb-3 border-b border-[#e49cc6]/40 bg-[#3b333e]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-[#e49cc6]/10 border border-[#e49cc6]/30">
                  <Lightbulb className="h-5 w-5 text-[#e49cc6]" />
                </div>
                <CardTitle className="text-white">EventFlow Help</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-[#e49cc6] hover:text-white hover:bg-[#2e2a31]/70"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-[#e49cc6]/10 border border-[#e49cc6]/30">
              <div className="flex items-center space-x-2 text-[#e49cc6] text-sm">
                <Lightbulb className="h-4 w-4" />
                <span className="font-medium">Pro Tip</span>
              </div>
              <p className="text-white/80 text-sm mt-1">{tips[currentTip]}</p>
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-y-auto custom-scrollbar" style={{ maxHeight: '70vh' }}>
            <div className="p-4 space-y-4">
              {helpContent.map((section) => (
                <Collapsible
                  key={section.category}
                  open={openSections.includes(section.category)}
                  onOpenChange={() => toggleSection(section.category)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#3b333e] hover:bg-[#4a3e4f] transition-colors border border-[#e49cc6]/20">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-md bg-[#e49cc6]/10">
                          {section.icon}
                        </div>
                        <span className="text-white font-medium">{section.category}</span>
                      </div>
                      {openSections.includes(section.category) ? (
                        <ChevronUp className="h-4 w-4 text-[#e49cc6]" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#e49cc6]" />
                      )}
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="mt-2 space-y-2">
                      {section.items.map((item, index) => (
                        <div key={index} className="p-3 rounded-lg bg-[#2e2a31] border border-[#e49cc6]/10">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-white font-medium text-sm">{item.title}</h4>
                              <p className="text-white/70 text-xs mt-1 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                            {item.shortcut && (
                              <Badge variant="outline" className="ml-2 text-xs text-[#e49cc6] border-[#e49cc6]/40">
                                {item.shortcut}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

              <div className="mt-6 p-4 rounded-lg bg-[#3b333e] border border-[#e49cc6]/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Keyboard className="h-4 w-4 text-[#e49cc6]" />
                  <span className="text-white font-medium">Keyboard Shortcuts</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Navigate months</span>
                    <Badge variant="outline" className="text-[#e49cc6] border-[#e49cc6]/30">← →</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Go to today</span>
                    <Badge variant="outline" className="text-[#e49cc6] border-[#e49cc6]/30">T</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Search events</span>
                    <Badge variant="outline" className="text-[#e49cc6] border-[#e49cc6]/30">Ctrl + F</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 bg-[#e49cc6] hover:bg-[#e49cc6]/90 shadow-lg shadow-[#e49cc6]/30"
          size="icon"
        >
          <HelpCircle className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  )
}