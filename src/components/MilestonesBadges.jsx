import React, { useEffect, useRef } from 'react';
import { BADGES } from '../utils/constants';
import { Flame, Shield, Trophy, Star, Ban, PiggyBank, Clock, Lock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const BADGE_ICONS = {
  Flame, Shield, Trophy, Star, Ban, PiggyBank, Clock
};

export default function MilestonesBadges({ stats }) {
  const previousUnlockedRef = useRef(new Set());

  const badgeResults = BADGES.map((b) => {
    const isUnlocked = b.check(stats);
    return { ...b, isUnlocked };
  });

  const unlockedCount = badgeResults.filter((b) => b.isUnlocked).length;

  useEffect(() => {
    const currentlyUnlocked = new Set(
      badgeResults.filter((b) => b.isUnlocked).map((b) => b.id)
    );

    let newlyUnlocked = false;
    currentlyUnlocked.forEach((id) => {
      if (!previousUnlockedRef.current.has(id)) {
        newlyUnlocked = true;
      }
    });

    if (newlyUnlocked && previousUnlockedRef.current.size > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    previousUnlockedRef.current = currentlyUnlocked;
  }, [stats]);

  return (
    <div className="bg-[#18191E] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-[#27272A] pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-[#F4F4F6]">Achievement Badges</h2>
          <p className="text-xs text-[#A1A1AA]">Unlock trophies as you hit streak and financial goals</p>
        </div>
        <span className="px-3 py-1 rounded bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-bold font-mono">
          {unlockedCount} / {BADGES.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {badgeResults.map((badge) => {
          const IconComp = BADGE_ICONS[badge.icon] || Trophy;

          return (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-colors flex items-start gap-3.5 ${
                badge.isUnlocked
                  ? 'bg-[#141519] border-[#27272A] hover:border-[#3F3F46]'
                  : 'bg-[#141519]/50 border-[#27272A]/60 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  badge.isUnlocked
                    ? `bg-gradient-to-tr ${badge.color} text-white`
                    : 'bg-[#1C1D24] text-[#A1A1AA] border border-[#27272A]'
                }`}
              >
                {badge.isUnlocked ? <IconComp className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-[#F4F4F6] truncate">{badge.title}</h3>
                  {badge.isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />}
                </div>
                <p className="text-xs text-[#A1A1AA] mt-0.5 leading-snug">{badge.description}</p>
                <span
                  className={`inline-block text-[10px] font-bold mt-2 px-2 py-0.5 rounded ${
                    badge.isUnlocked
                      ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                      : 'bg-[#1C1D24] text-[#A1A1AA]'
                  }`}
                >
                  {badge.isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
