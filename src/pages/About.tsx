// src/pages/About.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-[#FFDCEF] flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-[#1A1A1A]/60 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-[#FF69B4]/40 shadow-2xl">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="text-[#FFDCEF] hover:text-[#FF69B4] border border-[#FFDCEF]/30 hover:border-[#FF69B4] bg-transparent hover:bg-[#FFDCEF]/10 px-6 py-3 rounded-lg text-lg mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Button>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4]">EventFlow</span>
        </h1>
        <p className="text-xl text-[#BBBBBB] mb-6">
          EventFlow is engineered for excellence, designed for those who demand more from their scheduling tools.
        </p>
        <p className="text-lg text-[#888888]">
          Our mission is to provide the most sophisticated calendar application for visionaries and achievers—helping you turn every moment into a milestone.
        </p>
      </div>
    </div>
  );
};

export default About;
