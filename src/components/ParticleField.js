import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import './ParticleField.css';

const ParticleField = ({ 
  particleCount = 100,
  connectionDistance = 100,
  mouseInfluence = 150,
  particleColor = '#4A90E2',
  connectionColor = '#4A90E2',
  particleSize = 2,
  animationSpeed = 0.5
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        originalVx: (Math.random() - 0.5) * animationSpeed,
        originalVy: (Math.random() - 0.5) * animationSpeed,
        size: particleSize + Math.random() * 2,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    particlesRef.current = particles;
  }, [particleCount, animationSpeed, particleSize]);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach((particle, index) => {
      // Mouse influence
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseInfluence) {
        const force = (mouseInfluence - distance) / mouseInfluence;
        particle.vx += (dx / distance) * force * 0.01;
        particle.vy += (dy / distance) * force * 0.01;
      } else {
        // Return to original velocity
        particle.vx += (particle.originalVx - particle.vx) * 0.01;
        particle.vy += (particle.originalVy - particle.vy) * 0.01;
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
        particle.originalVx *= -1;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
        particle.originalVy *= -1;
      }
      
      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      
      // Draw particle
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particleColor;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw connections
      for (let j = index + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx2 = particle.x - other.x;
        const dy2 = particle.y - other.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (distance2 < connectionDistance) {
          const opacity = 1 - (distance2 / connectionDistance);
          ctx.globalAlpha = opacity * 0.3;
          ctx.strokeStyle = connectionColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });
    
    ctx.globalAlpha = 1;
  }, [connectionDistance, mouseInfluence, particleColor, connectionColor]);

  const animate = useCallback(() => {
    drawParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    createParticles();
  }, [createParticles]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, handleMouseMove, animate]);

  return (
    <div className="particle-field">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ParticleField;
