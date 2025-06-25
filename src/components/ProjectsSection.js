import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const projects = [
    {
      id: 1,
      title: 'NetflixClone',
      description: 'This project was made by HTML, CSS, and JS.',
      image: '\images\Screenshot (61).png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'frontend',
      github: 'https://github.com/ALIABDALHAMED/NetflixClone',
      live: 'https://aliabdalhamed.github.io/NetflixClone/',
      featured: true
    },
    {
      id: 2,
      title: 'Portfolio',
      description: 'Personal portfolio website showcasing projects and skills.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
      technologies: ['React', 'CSS', 'JavaScript'],
      category: 'frontend',
      github: 'https://github.com/ALIABDALHAMED/portfolio_2',
      live: 'https://aliabdalhamed.github.io/portfolio_2/',
      featured: true
    },
    {
      id: 3,
      title: 'Responsive Login Form',
      description: 'A modern responsive login form built with HTML, CSS, and JS.',
      image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'frontend',
      github: 'https://github.com/ALIABDALHAMED/responsive-login-form',
      live: 'https://aliabdalhamed.github.io/responsive-login-form/',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🚀' },
    { id: 'fullstack', name: 'Full Stack', icon: '⚡' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'devops', name: 'DevOps', icon: '🔧' },
    { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
    { id: 'mobile', name: 'Mobile', icon: '📱' }
  ];

  useEffect(() => {
    const filtered = activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter);
    setFilteredProjects(filtered);
  }, [activeFilter]);

  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    
    gsap.fromTo(cards, 
      { 
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationY: 15
      },
      { 
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [filteredProjects]);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
    
    // Animate filter change
    gsap.to('.project-card', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.project-card', {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05
        });
      }
    });
  };

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">
            <span className="title-text">Featured</span>
            <span className="title-text highlight">Projects</span>
          </h2>
          <p className="projects-subtitle">
            Discover my latest work and technical achievements
          </p>
        </div>

        <div className="project-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => handleFilterChange(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} className="project-link github" target="_blank" rel="noopener noreferrer">
                      <span className="link-icon">📁</span>
                      <span>Code</span>
                    </a>
                    <a href={project.live} className="project-link live" target="_blank" rel="noopener noreferrer">
                      <span className="link-icon">🌐</span>
                      <span>Live</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  {project.featured && <span className="featured-badge">★ Featured</span>}
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <p>Want to see more projects?</p>
          <a href="https://github.com" className="cta-button" target="_blank" rel="noopener noreferrer">
            <span className="cta-icon">🔗</span>
            <span>View All on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
