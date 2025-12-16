import React, { useState } from 'react';
import { AppState, AnswerStyle } from './types';
import { fetchOracleAnswer } from './services/openRouterService';
import OracleInput from './components/OracleInput';
import OracleResult from './components/OracleResult';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleConsult = async (question: string, style: AnswerStyle) => {
    setAppState(AppState.THINKING);
    setError(null);
    try {
      // Artificial delay to build suspense, adds to the "Book" feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = await fetchOracleAnswer(question, style);
      setAnswer(result);
      setAppState(AppState.REVEALED);
    } catch (err: any) {
      setError(err.message || "The stars are silent.");
      setAppState(AppState.IDLE);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setAnswer('');
    setError(null);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 overflow-hidden selection:bg-mystic-gold/30 selection:text-white">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mystic-900 z-0">
        {/* Radial Gradient for spotlight effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mystic-700/20 rounded-full blur-[100px] pointer-events-none"></div>
        {/* Noise Texture Overlay (CSS pattern) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        
        {/* Title / Header */}
        <header className={`text-center mb-12 transition-all duration-700 ${appState === AppState.REVEALED ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border border-mystic-gold/50 rotate-45 flex items-center justify-center">
              <div className="w-8 h-8 border border-mystic-gold/30"></div>
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-mystic-gold tracking-widest uppercase mb-2">
            The Oracle
          </h1>
          <p className="font-serif text-mystic-text/60 italic">
            The Book of Answers
          </p>
        </header>

        {/* Content Switcher */}
        {appState === AppState.IDLE && (
          <OracleInput onSubmit={handleConsult} isLoading={false} />
        )}

        {appState === AppState.THINKING && (
          <div className="flex flex-col items-center justify-center space-y-6 animate-pulse-slow">
             <div className="relative w-32 h-32">
               <div className="absolute inset-0 border-2 border-mystic-gold/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
               <div className="absolute inset-2 border-t-2 border-mystic-gold/60 rounded-full animate-[spin_3s_linear_infinite]"></div>
               <div className="absolute inset-8 border border-mystic-gold/40 rotate-45"></div>
             </div>
             <p className="font-display text-mystic-gold text-sm tracking-[0.3em] animate-pulse">
               CONSULTING THE STARS...
             </p>
          </div>
        )}

        {appState === AppState.REVEALED && (
          <OracleResult answer={answer} onReset={handleReset} />
        )}

        {/* Error Notification */}
        {error && (
          <div className="mt-8 p-4 border border-red-900/50 bg-red-900/10 text-red-200 text-sm font-serif rounded">
            {error}
            <br/>
            <span className="text-xs opacity-50 mt-1 block">Please ensure API Key is set in services/openRouterService.ts</span>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center z-10 opacity-30">
        <p className="text-[10px] text-mystic-text font-sans uppercase tracking-widest">
          Powered by OpenRouter & Gemma
        </p>
      </footer>

    </div>
  );
}

export default App;
