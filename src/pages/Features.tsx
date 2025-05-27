// src/pages/Features.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Move, Clock, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-[#FFDCEF] flex flex-col items-center justify-center p-6">
      <div className="max-w-7xl w-full bg-[#1A1A1A]/60 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-[#FF69B4]/40 shadow-2xl">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="text-[#FFDCEF] hover:text-[#FF69B4] border border-[#FFDCEF]/30 hover:border-[#FF69B4] bg-transparent hover:bg-[#FFDCEF]/10 px-6 py-3 rounded-lg text-lg mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Button>

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          EventFlow's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4]">Advanced Features</span>
        </h1>
        <p className="text-xl text-[#BBBBBB] mb-12">
          Experience cutting-edge capabilities that set new industry standards for event management.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Move className="h-6 w-6 text-[#FF69B4]" />,
              title: "Drag & Drop Mastery",
              bg: "bg-[#FF69B4]/20",
              desc: "Intuitive event management with intelligent conflict detection and automatic resolution."
            },
            {
              icon: <Clock className="h-6 w-6 text-[#FFDCEF]" />,
              title: "Smart Recurrence",
              bg: "bg-[#FFDCEF]/20",
              desc: "Complex recurring patterns with machine learning optimization and predictive scheduling."
            },
            {
              icon: <Bell className="h-6 w-6 text-[#FF69B4]" />,
              title: "Contextual Intelligence",
              bg: "bg-[#FF69B4]/20",
              desc: "Adaptive notifications that learn your patterns and optimize for maximum productivity."
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#1A1A1A]/40 backdrop-blur-sm rounded-2xl p-8 border border-[#555555]/20 hover:bg-[#1A1A1A]/60 transition-all duration-300"
            >
              <div className={`${feature.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#FFDCEF]">{feature.title}</h3>
              <p className="text-[#AAAAAA]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
