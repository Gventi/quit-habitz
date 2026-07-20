import React from 'react';
import { ShieldCheck, Lock, Database } from 'lucide-react';

export default function PrivacyBadge() {
  return (
    <div className="bg-[#18191E] border border-[#27272A] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans hover:border-[#3F3F46] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#F4F4F6]">100% Privacy Guarantee</h4>
          <p className="text-xs text-[#A1A1AA]">
            Zero account required. All timestamps, financial math, and craving logs are saved locally in your browser.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141519] border border-[#27272A] text-[11px] font-semibold text-[#A1A1AA] font-mono">
          <Lock className="w-3 h-3 text-[#10B981]" /> 100% Client-Side
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#141519] border border-[#27272A] text-[11px] font-semibold text-[#A1A1AA] font-mono">
          <Database className="w-3 h-3 text-cyan-400" /> LocalStorage
        </span>
      </div>
    </div>
  );
}
