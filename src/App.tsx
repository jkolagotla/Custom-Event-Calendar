// src/App.tsx (or your main routing file)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Calendar from '@/pages/Calendar'; // Make sure this import is correct
import About from '@/pages/About';
import Features from '@/pages/Features';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/calendar" element={<Calendar />} /> {/* THIS IS THE CRUCIAL LINE */}
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;