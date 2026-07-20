import React, { useState, useEffect } from 'react';
import { X, Flame, Trophy, RefreshCw, DollarSign, CheckCircle2, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatCurrency } from '../utils/calc';
import { saveCraving } from '../utils/storage';

const CARD_ICONS = ['🌿', '💧', '🫁', '💰', '🏆', '🫀', '🧘', '⚡'];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const deck = [...CARD_ICONS, ...CARD_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, idx) => ({ id: idx, symbol }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].symbol === cards[secondIdx].symbol) {
        setMatched((prev) => [...prev, firstIdx, secondIdx]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const isCompleted = cards.length > 0 && matched.length === cards.length;

  return (
    <div className="space-y-4 text-center">
      <div className="flex items-center justify-between text-xs font-bold text-[#9CA3AF]">
        <span>Memory Distraction Game</span>
        <div className="flex items-center gap-3">
          <span>Moves: <span className="text-[#10B981] font-mono">{moves}</span></span>
          <button
            onClick={initGame}
            className="flex items-center gap-1 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {isCompleted ? (
        <div className="p-4 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 space-y-2">
          <Trophy className="w-8 h-8 text-[#10B981] mx-auto" />
          <h4 className="text-sm font-bold text-[#F3F4F6]">All Pairs Matched!</h4>
          <p className="text-xs text-[#9CA3AF]">Great focus. Keep your mind engaged!</p>
          <button
            onClick={initGame}
            className="px-4 py-1.5 rounded-xl bg-[#10B981] text-slate-950 font-bold text-xs"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto">
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(idx);
            const isMatch = matched.includes(idx);

            return (
              <button
                key={idx}
                onClick={() => handleCardClick(idx)}
                className={`h-16 rounded-2xl text-2xl font-bold flex items-center justify-center transition-all duration-300 border ${
                  isMatch
                    ? 'bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981] scale-95'
                    : isFlipped
                    ? 'bg-slate-800 border-[#10B981] text-white'
                    : 'bg-slate-900 border-slate-800/80 hover:border-slate-700 text-transparent'
                }`}
              >
                {isFlipped ? card.symbol : '❓'}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CravingKit({ isOpen, onClose, moneySaved = 0, currency = '$' }) {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isVictory, setIsVictory] = useState(false);
  const [activeTab, setActiveTab] = useState('game');
  const [breathePhase, setBreathePhase] = useState('Inhale');

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(300);
      setIsVictory(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isVictory) return;

    if (timeLeft <= 0) {
      setIsVictory(true);
      saveCraving({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        intensity: 5,
        trigger: 'Emergency SOS Beat',
        note: 'Survived full 5-minute craving wave'
      });

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, isVictory]);

  useEffect(() => {
    if (!isOpen || activeTab !== 'breathing') return;

    let timeoutId;
    const runCycle = () => {
      setBreathePhase('Inhale Deeply (4s)');
      timeoutId = setTimeout(() => {
        setBreathePhase('Hold Breath (7s)');
        timeoutId = setTimeout(() => {
          setBreathePhase('Exhale Slowly (8s)');
          timeoutId = setTimeout(() => {
            runCycle();
          }, 8000);
        }, 7000);
      }, 4000);
    };

    runCycle();
    return () => clearTimeout(timeoutId);
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = Math.round(((300 - timeLeft) / 300) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-slate-900/90 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Flame className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#F3F4F6]">Emergency Craving SOS</h2>
              <p className="text-xs text-[#9CA3AF]">Wait out the 5-minute craving spike</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Victory Screen */}
        {isVictory ? (
          <div className="text-center space-y-5 py-4 animate-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#10B981] to-[#06B6D4] flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-[#10B981]/30">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-bold font-mono">
                5-MINUTE WAVE OVERCOME!
              </span>
              <h3 className="text-2xl font-black text-[#F3F4F6]">Craving Beaten! 🎉</h3>
              <p className="text-xs text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
                You successfully waited out the critical 5-minute wave. Your brain is rewiring itself for freedom right now!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-[#10B981]/20 max-w-md mx-auto">
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Total Progress Retained</span>
              <span className="text-2xl font-black text-[#10B981] font-mono">
                {formatCurrency(moneySaved, currency)} Saved
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-[#10B981]/20 active:scale-95 transition-all"
            >
              Return to Main Dashboard
            </button>
          </div>
        ) : (
          /* Active Countdown */
          <div className="space-y-6">
            
            {/* 5-Minute Countdown */}
            <div className="bg-slate-900/60 rounded-2xl p-5 border border-rose-500/30 text-center space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-rose-400 flex items-center gap-1">
                  <Flame className="w-4 h-4" /> Craving Wave Active
                </span>
                <span className="text-[#9CA3AF] font-mono">{progressPercent}% Elapsed</span>
              </div>

              <div className="text-5xl font-black text-rose-400 font-mono tracking-tight tabular-nums py-1">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>

              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Money Saved Grounding Reminder */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-[#10B981]/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-left flex-1">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block">
                  Grounding Reminder
                </span>
                <p className="text-xs text-[#F3F4F6] font-medium">
                  You have already saved <span className="text-[#10B981] font-bold font-mono">{formatCurrency(moneySaved, currency)}</span> since quitting. Don't trade your hard-earned progress for a 5-minute spike!
                </p>
              </div>
            </div>

            {/* Distraction Tabs */}
            <div className="space-y-4">
              <div className="flex rounded-2xl bg-slate-900/80 p-1 border border-slate-800">
                <button
                  onClick={() => setActiveTab('game')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'game'
                      ? 'bg-[#10B981] text-slate-950 shadow-md'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                  }`}
                >
                  Memory Game Distraction
                </button>
                <button
                  onClick={() => setActiveTab('breathing')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'breathing'
                      ? 'bg-[#10B981] text-slate-950 shadow-md'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                  }`}
                >
                  4-7-8 Breathing Bubble
                </button>
              </div>

              {activeTab === 'game' && <MemoryGame />}

              {activeTab === 'breathing' && (
                <div className="bg-slate-900/60 rounded-2xl p-6 text-center space-y-4 border border-slate-800">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#10B981]">
                    Deep Breathing Exercise
                  </span>

                  <div className="relative my-4 flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full border border-[#10B981]/30 flex items-center justify-center animate-breathe-ring relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#10B981]/20 to-[#06B6D4]/20 flex items-center justify-center">
                        <Zap className="w-7 h-7 text-[#10B981]" />
                      </div>
                    </div>
                  </div>

                  <div className="text-base font-bold font-mono text-[#F3F4F6]">{breathePhase}</div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsVictory(true)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#06B6D4] hover:from-[#10B981]/90 hover:to-[#06B6D4]/90 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-md active:scale-95 transition-all"
            >
              I Overcame The Craving Early!
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
