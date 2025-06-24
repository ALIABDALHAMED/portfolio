import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroSection.css';

const HeroSection = ({ scrollY }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const image = imageRef.current;

    // Initial animation timeline
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([title, subtitle, cta, image], { opacity: 0, y: 100 });

    // Animate elements in sequence
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .to(cta, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .to(image, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8');

    // Floating animation for the image
    gsap.to(image, {
      y: '+=20',
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Typing effect for subtitle
    const words = ['Full Stack Developer', 'Network Engineer', 'Problem Solver', 'Tech Innovator'];
    let currentWordIndex = 0;
    
    const typeWord = () => {
      const word = words[currentWordIndex];
      const roleElement = subtitle.querySelector('.dynamic-role');
      
      gsap.to(roleElement, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          roleElement.textContent = word;
          gsap.to(roleElement, {
            opacity: 1,
            duration: 0.3
          });
        }
      });
      
      currentWordIndex = (currentWordIndex + 1) % words.length;
    };

    // Start typing animation after initial load
    const typingInterval = setInterval(typeWord, 3000);

    return () => {
      clearInterval(typingInterval);
      tl.kill();
    };
  }, []);

  const scrollToNext = () => {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={titleRef} className="hero-title">
              <span className="greeting">Hello, I'm</span>
              <span className="name">Ali Abd Al HaMeD</span>
            </h1>
            
            <p ref={subtitleRef} className="hero-subtitle">
              <span>I'm a </span>
              <span className="dynamic-role">Full Stack Developer</span>
              <span className="cursor">|</span>
            </p>
            
            <div ref={ctaRef} className="hero-cta">
              <button onClick={scrollToNext} className="cta-primary">
                <span>Explore My Work</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <a href="#contact" className="cta-secondary">
                <span>Get In Touch</span>
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div ref={imageRef} className="hero-image-container">
              <div className="image-backdrop"></div>
              <div className="image-wrapper">
                <img 
                  src="/images/Ali1.jpg" 
                  alt="Ali Abd Al HaMeD - Full Stack Developer" 
                  className="hero-image"
                />
                <div className="image-glow"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll to explore</span>
        </div> */}
      </div>
      
      {/* Parallax elements */}
      <div 
        className="parallax-element parallax-1"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      ></div>
      <div 
        className="parallax-element parallax-2"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      ></div>
    </section>
  );
};

export default HeroSection;
