import React from 'react';
import { DollarSign, Ban, Heart, TrendingUp, Sparkles, Award } from 'lucide-react';
import { formatCurrency, getMilestoneProgress } from '../utils/calc';
import { HEALTH_MILESTONES } from '../utils/constants';

export default function LiveCounter({ stats, config }) {
  const currency = config?.currency || '$';

  const milestones = getMilestoneProgress(HEALTH_MILESTONES, stats.totalSeconds);
  const nextMilestone = milestones.find((m) => !m.isCompleted) || milestones[milestones.length - 1];

  const dailyCost = (config.cigsPerDay / (config.cigsPerPack || 20)) * config.costPerPack;
  const annualSavings = dailyCost * 365;

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1) Executive Hero Card: Real-Time Smoke-Free Clock */}
      <div className="bg-[#18191E] border border-[#27272A] rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-extrabold text-[#F4F4F6] uppercase tracking-wider">
              Smoke-Free Elapsed Time
            </span>
          </div>

          <div className="text-xs text-[#A1A1AA] font-mono">
            Ticking Live • Quit Date:{' '}
            <span className="text-[#F4F4F6] font-semibold">
              {new Date(config.quitDateTime).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* 4-Box Ticker Grid with JetBrains Mono numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {/* Days */}
          <div className="bg-[#141519] rounded-xl p-4 sm:p-5 flex flex-col items-center border border-[#27272A]">
            <span className="text-4xl sm:text-5xl font-black text-[#F4F4F6] tracking-tight tabular-nums font-mono">
              {String(stats.days).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-widest mt-1">Days</span>
          </div>

          {/* Hours */}
          <div className="bg-[#141519] rounded-xl p-4 sm:p-5 flex flex-col items-center border border-[#27272A]">
            <span className="text-4xl sm:text-5xl font-black text-[#F4F4F6] tracking-tight tabular-nums font-mono">
              {String(stats.hours).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-widest mt-1">Hours</span>
          </div>

          {/* Minutes */}
          <div className="bg-[#141519] rounded-xl p-4 sm:p-5 flex flex-col items-center border border-[#27272A]">
            <span className="text-4xl sm:text-5xl font-black text-[#F4F4F6] tracking-tight tabular-nums font-mono">
              {String(stats.minutes).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-widest mt-1">Minutes</span>
          </div>

          {/* Seconds */}
          <div className="bg-[#141519] rounded-xl p-4 sm:p-5 flex flex-col items-center border border-[#10B981]/50">
            <span className="text-4xl sm:text-5xl font-black text-[#10B981] tracking-tight tabular-nums font-mono">
              {String(stats.seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-extrabold text-[#10B981] uppercase tracking-widest mt-1">Seconds</span>
          </div>
        </div>
      </div>

      {/* Primary Key Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Money Saved */}
        <div className="bg-[#18191E] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] transition-colors space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-wider">
              Total Money Saved
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-[#10B981] tabular-nums font-mono tracking-tight">
              {formatCurrency(stats.moneySaved, currency, 2)}
            </div>
            <div className="text-[11px] text-[#A1A1AA] font-mono mt-1">
              +{(stats.cigsPerSecond * stats.costPerCig).toFixed(5)} {currency}/sec
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#27272A] text-xs text-[#A1A1AA]">
            <div className="flex justify-between items-center">
              <span>Cost per cig:</span>
              <span className="text-[#F4F4F6] font-bold font-mono">{formatCurrency(stats.costPerCig, currency, 3)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Projected Annual:</span>
              <span className="text-[#F4F4F6] font-bold font-mono">{formatCurrency(annualSavings, currency, 0)}</span>
            </div>
          </div>
        </div>

        {/* Cigarettes Avoided */}
        <div className="bg-[#18191E] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] transition-colors space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-wider">
              Cigarettes Avoided
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Ban className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-cyan-400 tabular-nums font-mono tracking-tight">
              {stats.cigsAvoided.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#A1A1AA] font-mono mt-1">
              Exact: {stats.exactCigsAvoided.toFixed(3)} unsmoked
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#27272A] text-xs text-[#A1A1AA]">
            <div className="flex justify-between items-center">
              <span>Unsmoked Packs:</span>
              <span className="text-[#F4F4F6] font-bold font-mono">
                {(stats.exactCigsAvoided / (config.cigsPerPack || 20)).toFixed(2)} packs
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Hourly Avoidance:</span>
              <span className="text-[#F4F4F6] font-bold font-mono">{(stats.cigsPerSecond * 3600).toFixed(1)} / hr</span>
            </div>
          </div>
        </div>

        {/* Life Time Regained */}
        <div className="bg-[#18191E] border border-[#27272A] rounded-2xl p-5 hover:border-[#3F3F46] transition-colors space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#A1A1AA] uppercase tracking-wider">
              Life Time Regained
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Heart className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-2xl font-black text-purple-400 tabular-nums font-mono tracking-tight">
              {stats.lifeRegainedDays > 0 ? `${stats.lifeRegainedDays}d ` : ''}
              {String(stats.lifeRegainedHours).padStart(2, '0')}h{' '}
              {String(stats.lifeRegainedMins).padStart(2, '0')}m{' '}
              {String(stats.lifeRegainedSecs).padStart(2, '0')}s
            </div>
            <div className="text-[11px] text-[#A1A1AA] font-mono mt-1">
              +{(stats.cigsPerSecond * 11 * 60).toFixed(3)} sec / sec
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#27272A] text-xs text-[#A1A1AA]">
            <div className="flex justify-between items-center">
              <span>Medical Formula:</span>
              <span className="text-[#F4F4F6] font-bold font-mono">+11 mins / cig</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Hours:</span>
              <span className="text-[#F4F4F6] font-bold font-mono">{stats.lifeHoursRegained.toFixed(1)} Hours</span>
            </div>
          </div>
        </div>

      </div>

      {/* Target Milestone Banner */}
      {nextMilestone && (
        <div className="bg-[#18191E] border border-[#27272A] rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
                Next Recovery Target: {nextMilestone.title}
              </span>
              <span className="text-xs font-bold text-[#F4F4F6]">{nextMilestone.benefit}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-[#10B981] font-mono">{nextMilestone.progressPercent}%</span>
          </div>
        </div>
      )}

    </div>
  );
}
