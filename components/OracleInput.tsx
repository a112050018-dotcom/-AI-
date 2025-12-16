import React, { useState } from 'react';
import { AnswerStyle } from '../types';

interface OracleInputProps {
  onSubmit: (question: string, style: AnswerStyle) => void;
  isLoading: boolean;
}

const OracleInput: React.FC<OracleInputProps> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');
  const [style, setStyle] = useState<AnswerStyle>(AnswerStyle.MYSTICAL);

  const handleSubmit = () => {
    if (isLoading) return;
    onSubmit(question, style);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in relative z-10">
      
      {/* Intro Text */}
      <div className="text-center space-y-2">
        <p className="text-mystic-text/70 font-serif italic text-sm md:text-base">
          Concentrate on your question...
        </p>
        <p className="text-mystic-text/50 text-xs">
          (You may type it below, or simply hold it in your mind)
        </p>
      </div>

      {/* Input Field */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-mystic-gold/20 to-purple-600/20 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What does fate hold for me?"
          className="relative block w-full bg-mystic-800/80 border border-mystic-700 text-mystic-text placeholder-mystic-700 rounded-lg p-4 font-serif focus:outline-none focus:border-mystic-gold/50 focus:ring-1 focus:ring-mystic-gold/30 transition-all resize-none h-24 text-center text-lg"
          disabled={isLoading}
        />
      </div>

      {/* Style Selector */}
      <div className="flex flex-col items-center space-y-3">
        <label className="text-mystic-gold text-xs uppercase tracking-widest font-display">
          Select Tone
        </label>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.values(AnswerStyle).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-4 py-2 rounded-full text-xs transition-all duration-300 border ${
                style === s
                  ? 'bg-mystic-gold text-mystic-900 border-mystic-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-transparent text-mystic-text/60 border-mystic-700 hover:border-mystic-gold/50 hover:text-mystic-gold'
              }`}
              disabled={isLoading}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="relative px-12 py-4 bg-transparent group overflow-hidden rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Button Borders/Styling simulating a physical button or rune */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-mystic-gold to-yellow-600 opacity-10 group-hover:opacity-20 transition-opacity"></span>
          <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-mystic-gold to-transparent"></span>
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-mystic-gold to-transparent"></span>
          
          <span className="relative font-display text-mystic-gold text-xl tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-500">
            {isLoading ? 'CONSULTING...' : 'REVEAL ANSWER'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default OracleInput;
