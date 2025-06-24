import { useEffect, useState } from 'react';
import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import './App.css';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <Navigation />
      
      {/* Modern Hero Section */}
      <HeroSection scrollY={scrollY} />
      
      {/* Content Sections */}
      <ProfileSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

export default App;
