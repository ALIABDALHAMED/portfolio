import React, { useEffect, useRef } from 'react';
import './CircularText.css';

const CircularText = ({ text, children }) => {
  const circleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle || !text) return;

    const chars = text.split('');
    const degree = 360 / chars.length;

    circle.innerHTML = chars.map((char, i) => 
      `<span style="transform:rotate(${degree * i}deg)">${char}</span>`
    ).join('');
  }, [text]);

  return (
    <div className="circular-text-container">
      <div className="circular-text" ref={circleRef} />
      <div className="circular-content">
        {children}
      </div>
    </div>
  );
};

export default CircularText; 