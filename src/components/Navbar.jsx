import React from 'react';
import { ShieldCheck, Flame, Settings } from 'lucide-react';

export default function Navbar({ daysSmokeFree, onOpenCravingKit, onOpenSettings }) {
  return (
    <header className="sticky top-0 z-40 bg-[#18191E] border-b border-[#27272A] px-4 sm:px-8 py-3.5 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center text-zinc-950 font-extrabold text-base font-mono">
            q
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#F4F4F6] tracking-tight leading-none">
              quit.<span className="text-[#10B981]">habitz</span>
            </h1>
            <div className="flex items-center gap-1 text-[10px] text-[#A1A1AA] font-medium mt-0.5">
              <ShieldCheck className="w-3 h-3 text-[#10B981] inline" />
              <span>100% Offline Local Storage</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Emergency Red Craving Button */}
        <div className="flex items-center gap-2.5">
          {/* Streak pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141519] border border-[#27272A] text-xs font-semibold text-[#F4F4F6] font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{daysSmokeFree} Days Streak</span>
          </div>

          {/* Solid Red Emergency Button */}
          <button
            onClick={onOpenCravingKit}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs tracking-wide shadow-sm active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 text-white fill-white" />
            <span>I Have a Craving</span>
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-[#141519] hover:bg-[#202127] border border-[#27272A] text-[#A1A1AA] hover:text-[#F4F4F6] transition-colors"
            title="Settings & Privacy Controls"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
