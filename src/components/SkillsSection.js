import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SkillsSection.css';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const skillsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    { name: 'React', level: 95, icon: '⚛️', category: 'Frontend' },
    { name: 'Java', level: 90, icon: '☕', category: 'Programming' },
    { name: 'Node.js', level: 85, icon: '🟢', category: 'Backend' },
    { name: '.NET', level: 80, icon: '💠', category: 'Backend' },
    { name: 'Python', level: 80, icon: '🐍', category: 'Programming' },
    { name: 'CSS/SCSS', level: 92, icon: '🎨', category: 'Frontend' },
    { name: 'MongoDB', level: 78, icon: '🍃', category: 'Database' },
    { name: 'Git', level: 88, icon: '🔀', category: 'Tools' },
    { name: 'Linux', level: 82, icon: '🐧', category: 'Systems' }
  ];

  const categories = [...new Set(skills.map(skill => skill.category))];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate skill bars
          skillsRef.current.forEach((skillBar, index) => {
            if (skillBar) {
              const skill = skills[index];
              gsap.fromTo(skillBar, 
                { width: '0%' },
                { 
                  width: `${skill.level}%`,
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: 'power2.out'
                }
              );
            }
          });

          // Animate skill cards
          gsap.fromTo('.skill-card',
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
              stagger: 0.1,
              ease: 'back.out(1.7)'
            }
          );
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const getSkillsByCategory = (category) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section ref={sectionRef} className="skills-section" id="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">
            <span className="title-text">Technical</span>
            <span className="title-text highlight">Expertise</span>
          </h2>
          <p className="skills-subtitle">
            Crafting digital experiences with cutting-edge technologies
          </p>
        </div>

        <div className="skills-grid">
          {categories.map((category, categoryIndex) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="category-skills">
                {getSkillsByCategory(category).map((skill, skillIndex) => {
                  const globalIndex = skills.findIndex(s => s === skill);
                  return (
                    <div key={skill.name} className="skill-card">
                      <div className="skill-header">
                        <div className="skill-info">
                          <span className="skill-icon">{skill.icon}</span>
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div 
                          className="skill-bar"
                          ref={el => skillsRef.current[globalIndex] = el}
                          style={{ backgroundColor: `hsl(${220 + globalIndex * 20}, 70%, 55%)` }}
                        >
                          <div className="skill-bar-glow"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-stats">
          <div className="stat-item">
            <div className="stat-number">1+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">6+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">-1%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
