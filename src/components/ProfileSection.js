import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProfileSection.css';

gsap.registerPlugin(ScrollTrigger);

const ProfileSection = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  const stats = [
    { number: '1+', label: 'Years Experience', icon: '⚡' },
    { number: '6+', label: 'Projects Completed', icon: '🚀' },
    { number: '20+', label: 'Technologies', icon: '💻' },
    { number: '-1%', label: 'Client Satisfaction', icon: '⭐' }
  ];

  const highlights = [
    {
      title: 'Full Stack Development',
      description: 'Expert in modern web technologies including React, Node.js, and cloud platforms.',
      icon: '🌐'
    },
    {
      title: 'Network Engineering',
      description: 'Advanced networking solutions with focus on security and performance optimization.',
      icon: '🔒'
    },
    {
      title: 'Problem Solving',
      description: 'Creative approach to complex technical challenges with innovative solutions.',
      icon: '🧠'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate stats on scroll
    gsap.fromTo('.stat-item',
      {
        y: 50,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate highlight cards
    gsap.fromTo('.highlight-card',
      {
        y: 80,
        opacity: 0,
        rotationY: 15
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate numbers
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        const number = stats[index].number;
        const finalNumber = parseInt(number.replace(/\D/g, '')) || 100;
        
        gsap.fromTo(stat, 
          { textContent: 0 },
          {
            textContent: finalNumber,
            duration: 2,
            delay: index * 0.2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              stat.textContent = Math.floor(this.targets()[0].textContent) + (number.includes('+') ? '+' : '%');
            },
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="profile-section">
      <div className="profile-container">
        <div className="profile-header">
          <h2 className="profile-title">
            <span className="title-text">About</span>
            <span className="title-text highlight">Me</span>
          </h2>
          <p className="profile-description">
            I'm a passionate Full Stack Developer and Network Engineer with a drive for creating 
            innovative digital solutions. My expertise spans across modern web technologies, 
            network security, and cloud infrastructure.
          </p>
        </div>

        <div className="profile-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div 
                ref={el => statsRef.current[index] = el}
                className="stat-number"
              >
                {stat.number}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="profile-highlights">
          {highlights.map((highlight, index) => (
            <div key={index} className="highlight-card">
              <div className="highlight-icon">{highlight.icon}</div>
              <h3 className="highlight-title">{highlight.title}</h3>
              <p className="highlight-description">{highlight.description}</p>
            </div>
          ))}
        </div>

        <div className="profile-cta">
          <a href="#contact" className="cta-button">
            <span>Let's Work Together</span>
            <svg className="cta-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
