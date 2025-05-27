// src/pages/Landing.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Sun, Moon, Shield, Zap, Users, Clock, Bell, Move } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-[#FFDCEF] relative overflow-hidden ${isDark ? 'dark' : ''}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4] p-3 rounded-xl">
            <Calendar className="h-7 w-7 text-[#0A0A0A]" />
          </div>
          <span className="text-3xl font-bold text-[#FFDCEF]">EventFlow</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#FF69B4] transition-colors cursor-pointer text-[#FFDCEF] text-lg px-4 py-2 rounded-md border border-transparent hover:border-[#FFDCEF]/50" // Boxed look
          >
            Home
          </button>
          <button
            onClick={() => navigate('/about')}
            className="hover:text-[#FF69B4] transition-colors cursor-pointer text-[#FFDCEF] text-lg px-4 py-2 rounded-md border border-transparent hover:border-[#FFDCEF]/50" // Boxed look
          >
            About
          </button>
          <button
            onClick={() => navigate('/features')}
            className="hover:text-[#FF69B4] transition-colors cursor-pointer text-[#FFDCEF] text-lg px-4 py-2 rounded-md border border-transparent hover:border-[#FFDCEF]/50" // Boxed look
          >
            Features
          </button>
        </div>

        <div className="flex items-center space-x-5">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#FFDCEF] hover:text-[#FF69B4]"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            className="bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4] hover:from-[#FF69B4] hover:to-[#FFDCEF] text-[#0A0A0A] rounded-xl px-8 py-3 text-xl"
            onClick={() => navigate('/auth')}
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section in a Horizontal Box */}
      <section id="home" className="relative z-10 flex justify-center items-center min-h-[80vh] px-6">
        <div className="bg-[#1A1A1A]/70 backdrop-blur-md rounded-xl p-10 md:p-16 w-full max-w-4xl">
          <div className="text-center">
            <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight text-[#FFDCEF]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4]">
                Unlock Your Legacy:
              </span>{' '}
              Where Moments Become Milestones
            </h1>
            <h3 className="mb-10">
              <p className="text-2xl text-[#555555] max-w-3xl mx-auto leading-relaxed">
                Crafting experiences that resonate and propel you. The most sophisticated calendar application for visionaries and achievers.
              </p>
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FFDCEF] to-[#FF69B4] hover:from-[#FF69B4] hover:to-[#FFDCEF] text-[#0A0A0A] rounded-xl px-10 py-5 text-xl font-semibold group transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/auth')}
              >
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#555555] text-[#FFDCEF] hover:bg-[#FFDCEF]/20 rounded-xl px-10 py-5 text-xl font-semibold"
                onClick={() => navigate('/calendar')}
              >
                Explore Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;