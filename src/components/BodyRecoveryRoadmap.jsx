import React from 'react';
import { WHO_MILESTONES } from '../utils/constants';
import { getMilestoneProgress } from '../utils/calc';
import { HeartPulse, Wind, Sparkles, Zap, Activity, Award, CheckCircle2, Clock } from 'lucide-react';

const ICON_MAP = {
  HeartPulse,
  Wind,
  Sparkles,
  Zap,
  Activity,
  Award
};

export default function BodyRecoveryRoadmap({ totalSeconds }) {
  const milestoneData = getMilestoneProgress(WHO_MILESTONES, totalSeconds);
  const completedCount = milestoneData.filter((m) => m.isCompleted).length;

  const formatCountdown = (secs) => {
    if (secs <= 0) return 'Achieved';
    const days = Math.floor(secs / 86400);
    const hrs = Math.floor((secs % 86400) / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;

    if (days > 0) return `${days}d ${hrs}h remaining`;
    if (hrs > 0) return `${hrs}h ${mins}m remaining`;
    if (mins > 0) return `${mins}m ${s}s remaining`;
    return `${s}s remaining`;
  };

  return (
    <div className="bg-[#18191E] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6 font-sans">
      
      {/* Header with WHO attribution */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-extrabold text-[#F4F4F6]">Body Recovery Roadmap</h2>
            <span className="px-2.5 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-bold font-mono">
              WHO Benchmark
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA]">
            Milestone progress based on World Health Organization clinical smoking cessation standards
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#141519] px-3 py-1.5 rounded-lg border border-[#27272A] text-xs font-bold font-mono">
          <span className="text-[#A1A1AA]">Completed:</span>
          <span className="text-[#10B981]">{completedCount} / {WHO_MILESTONES.length}</span>
        </div>
      </div>

      {/* Milestone List */}
      <div className="space-y-3.5">
        {milestoneData.map((m) => {
          const IconComp = ICON_MAP[m.icon] || HeartPulse;

          return (
            <div
              key={m.id}
              className={`p-4 sm:p-5 rounded-xl border transition-colors ${
                m.isCompleted
                  ? 'bg-[#141519] border-[#10B981]/30'
                  : 'bg-[#141519]/60 border-[#27272A]'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon Container */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    m.isCompleted
                      ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                      : 'bg-[#1C1D24] text-[#A1A1AA] border border-[#27272A]'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>

                {/* Body Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#F4F4F6] font-mono">{m.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#1C1D24] text-[#A1A1AA] font-semibold uppercase tracking-wider">
                        WHO Medical Standard
                      </span>
                    </div>

                    <div className="shrink-0 mt-1 sm:mt-0">
                      {m.isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded border border-[#10B981]/20 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Achieved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 text-xs font-bold font-mono">
                          <Clock className="w-3.5 h-3.5" /> {formatCountdown(m.secondsRemaining)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#A1A1AA] font-medium leading-relaxed">
                    {m.description}
                  </p>

                  {/* Minimalist 4px Track Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-[#A1A1AA]">Recovery Progress</span>
                      <span className={`font-mono ${m.isCompleted ? 'text-[#10B981]' : 'text-amber-400'}`}>
                        {m.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-[#1C1D24] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          m.isCompleted ? 'bg-[#10B981]' : 'bg-amber-400'
                        }`}
                        style={{ width: `${m.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
