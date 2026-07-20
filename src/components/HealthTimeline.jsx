import React, { useState } from 'react';
import { HEALTH_MILESTONES } from '../utils/constants';
import { getMilestoneProgress } from '../utils/calc';
import { HeartPulse, Wind, Activity, Sparkles, Zap, Footprints, ShieldCheck, Smile, Award, Target, CheckCircle2, Clock } from 'lucide-react';

const ICON_MAP = {
  HeartPulse, Wind, Activity, Sparkles, Zap, Footprints, ShieldCheck, Smile, Award, Target
};

// SVG Circular Progress Component
function RadialProgress({ percent, isCompleted }) {
  const radius = 18;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg] overflow-visible">
        <circle
          stroke="rgba(255, 255, 255, 0.08)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={isCompleted ? '#10b981' : '#f59e0b'}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className={`absolute text-[10px] font-bold font-mono ${isCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
        {Math.round(percent)}%
      </span>
    </div>
  );
}

export default function HealthTimeline({ totalSeconds }) {
  const [filter, setFilter] = useState('all');

  const milestoneData = getMilestoneProgress(HEALTH_MILESTONES, totalSeconds);
  const filteredMilestones = milestoneData.filter((m) => {
    if (filter === 'completed') return m.isCompleted;
    if (filter === 'in_progress') return !m.isCompleted;
    return true;
  });

  const completedCount = milestoneData.filter((m) => m.isCompleted).length;
  const overallPercent = Math.round((completedCount / milestoneData.length) * 100);

  const formatRemainingTime = (secs) => {
    if (secs <= 0) return 'Achieved!';
    const days = Math.floor(secs / 86400);
    const hrs = Math.floor((secs % 86400) / 3600);
    const mins = Math.floor((secs % 3600) / 60);

    if (days > 0) return `${days}d ${hrs}h remaining`;
    if (hrs > 0) return `${hrs}h ${mins}m remaining`;
    return `${mins} mins remaining`;
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 font-sans">
      
      {/* Header & Category Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-extrabold text-white">Clinical Recovery Timeline</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
              {completedCount} / {milestoneData.length}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Scientifically validated body recovery stages post smoking cessation
          </p>
        </div>

        {/* Filter Pill Segmented Buttons */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-stretch sm:self-auto">
          {['all', 'in_progress', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f === 'all' ? `All (${milestoneData.length})` : f === 'in_progress' ? 'In Progress' : `Achieved (${completedCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Overall Progress Index */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-slate-300">Total Clinical Body Recovery Index</span>
          <span className="text-emerald-400 font-mono text-sm">{overallPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Milestones Cards */}
      <div className="space-y-3 pt-2">
        {filteredMilestones.map((m) => {
          const IconComponent = ICON_MAP[m.icon] || HeartPulse;

          return (
            <div
              key={m.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                m.isCompleted
                  ? 'bg-slate-900/40 border-emerald-500/25 hover:border-emerald-500/40'
                  : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* SVG Radial Meter */}
                <RadialProgress percent={m.progressPercent} isCompleted={m.isCompleted} />

                {/* Category Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    m.isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-300 font-mono uppercase tracking-wider">{m.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-semibold">
                          {m.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-0.5">{m.benefit}</h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold shrink-0 mt-1 sm:mt-0">
                      {m.isCompleted ? (
                        <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Achieved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 text-[11px] font-mono">
                          <Clock className="w-3.5 h-3.5" /> {formatRemainingTime(m.secondsRemaining)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
