import React, { useState, useEffect } from 'react';
import SetupWizard from './components/SetupWizard';
import Navbar from './components/Navbar';
import LiveCounter from './components/LiveCounter';
import BodyRecoveryRoadmap from './components/BodyRecoveryRoadmap';
import HealthTimeline from './components/HealthTimeline';
import MilestonesBadges from './components/MilestonesBadges';
import CravingKit from './components/CravingKit';
import SettingsModal from './components/SettingsModal';
import PrivacyBadge from './components/PrivacyBadge';
import { getStoredConfig, saveStoredConfig, clearAllData } from './utils/storage';
import { calculateStats } from './utils/calc';
import { HeartPulse, Trophy, Activity, RefreshCw } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState(() => getStoredConfig());
  const [now, setNow] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');

  const [isCravingKitOpen, setIsCravingKitOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Tick timer every second for continuous live calculation
  useEffect(() => {
    if (!config) return;
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [config]);

  const handleSetupComplete = (newConfig) => {
    saveStoredConfig(newConfig);
    setConfig(newConfig);
    setNow(new Date());
  };

  const handleUpdateConfig = (updatedConfig) => {
    saveStoredConfig(updatedConfig);
    setConfig(updatedConfig);
    setNow(new Date());
  };

  const handleResetAll = () => {
    clearAllData();
    setConfig(null);
    setIsSettingsOpen(false);
  };

  if (!config || !config.quitDateTime) {
    return <SetupWizard onComplete={handleSetupComplete} />;
  }

  const stats = calculateStats(config, now);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] font-sans flex flex-col selection:bg-[#10B981] selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        daysSmokeFree={stats.days}
        onOpenCravingKit={() => setIsCravingKitOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-slate-900/60'
              }`}
            >
              <Activity className="w-4 h-4" /> Live Dashboard
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-slate-900/60'
              }`}
            >
              <HeartPulse className="w-4 h-4" /> Medical Recovery
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'badges'
                  ? 'bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-slate-900/60'
              }`}
            >
              <Trophy className="w-4 h-4" /> Achievements
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-[#9CA3AF] font-medium font-mono">
            <RefreshCw className="w-3.5 h-3.5 text-[#10B981] animate-spin" style={{ animationDuration: '3s' }} />
            <span>Ticking Live</span>
          </div>
        </div>

        {/* Primary Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Metric Tickers */}
            <LiveCounter stats={stats} config={config} />
            
            {/* WHO Body Recovery Roadmap */}
            <BodyRecoveryRoadmap totalSeconds={stats.totalSeconds} />

            {/* Achievements & Privacy */}
            <MilestonesBadges stats={stats} />
            <PrivacyBadge />
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="animate-in fade-in duration-300 space-y-8">
            <BodyRecoveryRoadmap totalSeconds={stats.totalSeconds} />
            <PrivacyBadge />
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="animate-in fade-in duration-300 space-y-8">
            <MilestonesBadges stats={stats} />
            <PrivacyBadge />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 px-4 text-center text-xs text-[#9CA3AF]">
        <p className="max-w-xl mx-auto">
          <span className="font-semibold text-[#F3F4F6]">quit.habitz</span> — Privacy-First Quit Smoking Tracker. Medical benchmarks sourced from World Health Organization (WHO).
        </p>
      </footer>

      {/* Modals & Overlays */}
      <CravingKit
        isOpen={isCravingKitOpen}
        onClose={() => setIsCravingKitOpen(false)}
        moneySaved={stats.moneySaved}
        currency={config.currency}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetAll={handleResetAll}
      />
    </div>
  );
}
