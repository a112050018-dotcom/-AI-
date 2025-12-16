import React from 'react';

interface OracleResultProps {
  answer: string;
  onReset: () => void;
}

const OracleResult: React.FC<OracleResultProps> = ({ answer, onReset }) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center animate-fade-in text-center p-6 relative">
      
      {/* Decorative Elements */}
      <div className="mb-8 text-mystic-gold/30">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto">
          <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
        </svg>
      </div>

      {/* The Answer Card */}
      <div className="relative bg-mystic-800 border border-mystic-gold/20 p-12 shadow-2xl rounded-sm w-full">
        {/* Inner Border */}
        <div className="absolute inset-2 border border-mystic-gold/10 pointer-events-none"></div>
        
        <h2 className="font-serif text-3xl md:text-4xl leading-relaxed text-mystic-text text-shadow-lg font-medium tracking-wide">
          "{answer}"
        </h2>

        <div className="mt-8 flex justify-center">
             <div className="h-px w-24 bg-gradient-to-r from-transparent via-mystic-gold/50 to-transparent"></div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="mt-12 text-mystic-text/50 hover:text-mystic-gold transition-colors font-display text-sm tracking-widest border-b border-transparent hover:border-mystic-gold"
      >
        ASK ANOTHER QUESTION
      </button>
    </div>
  );
};

export default OracleResult;
