import React from 'react';
import './GlitchText.css';

const GlitchText = ({ text }) => {
  return (
    <div className="glitch-container">
      <h1 className="glitch" data-text={text}>
        {text}
      </h1>
    </div>
  );
};

export default GlitchText; 