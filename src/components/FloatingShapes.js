import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './FloatingShapes.css';

const FloatingShapes = () => {
  const containerRef = useRef(null);

  const createShape = (type, size, delay) => {
    const shape = document.createElement('div');
    shape.className = `floating-shape floating-shape--${type}`;
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + size;
    
    // Random properties
    const endX = startX + (Math.random() - 0.5) * 400;
    const endY = -size * 2;
    const rotation = Math.random() * 360;
    const scale = 0.5 + Math.random() * 0.5;
    const duration = 15 + Math.random() * 10;
    
    // Apply styles
    gsap.set(shape, {
      x: startX,
      y: startY,
      rotation: rotation,
      scale: scale,
      width: size,
      height: size
    });
    
    return { element: shape, endX, endY, duration, delay };
  };

  const animateShape = (shapeData) => {
    const { element, endX, endY, duration, delay } = shapeData;
    
    const tl = gsap.timeline({ delay });
    
    tl.to(element, {
      x: endX,
      y: endY,
      duration: duration,
      ease: "none",
      rotation: "+=720",
      onComplete: () => {
        element.remove();
        // Create a new shape to maintain count
        setTimeout(() => {
          if (containerRef.current) {
            const newShapeData = createShape(
              ['cube', 'pyramid', 'sphere', 'torus'][Math.floor(Math.random() * 4)],
              20 + Math.random() * 40,
              0
            );
            containerRef.current.appendChild(newShapeData.element);
            animateShape(newShapeData);
          }
        }, Math.random() * 5000);
      }
    });
    
    // Add floating motion
    tl.to(element, {
      x: `+=${(Math.random() - 0.5) * 100}`,
      duration: duration / 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 2
    }, 0);
    
    // Add scale pulsing
    tl.to(element, {
      scale: `*=${0.8 + Math.random() * 0.4}`,
      duration: duration / 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 3
    }, 0);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    const shapes = ['cube', 'pyramid', 'sphere', 'torus'];
    const shapeCount = 15;
    
    // Create initial shapes
    for (let i = 0; i < shapeCount; i++) {
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const size = 20 + Math.random() * 40;
      const delay = Math.random() * 10;
      
      const shapeData = createShape(shapeType, size, delay);
      containerRef.current.appendChild(shapeData.element);
      animateShape(shapeData);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="floating-shapes-container">
    </div>
  );
};

export default FloatingShapes;
