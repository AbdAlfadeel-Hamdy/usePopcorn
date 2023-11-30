import React, { useState, ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
};

export default Box;
