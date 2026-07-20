import React, { useState } from 'react';
import { X, Smartphone, Monitor, Share, PlusSquare, MoreVertical, Download, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function InstallPwaModal({ isOpen, onClose, deferredPrompt, onTriggerInstall }) {
  const [activeTab, setActiveTab] = useState(() => {
    const ua = navigator.userAgent || '';
    if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
    if (/android/i.test(ua)) return 'android';
    return 'desktop';
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#141519] border border-[#27272A] rounded-2xl max-w-lg w-full p-6 space-y-6 text-[#F4F4F6] shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">Install quit.habitz App</h2>
              <p className="text-xs text-[#A1A1AA]">Add to home screen for offline access & full-screen UI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#202127] hover:bg-[#2A2B32] text-[#A1A1AA] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1-Click Install Button if supported (Android / Desktop Chrome) */}
        {deferredPrompt && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#10B981]/20 to-emerald-950/40 border border-[#10B981]/40 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-[#10B981]">Direct Install Available</div>
              <div className="text-[11px] text-zinc-300">Click below to install directly to your device</div>
            </div>
            <button
              onClick={onTriggerInstall}
              className="px-4 py-2 rounded-lg bg-[#10B981] hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" /> Install Now
            </button>
          </div>
        )}

        {/* Device Select Tabs */}
        <div className="flex items-center bg-[#1D1E24] p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ios'
                ? 'bg-[#10B981] text-zinc-950 shadow-sm'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#25262E]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> iOS (iPhone)
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'android'
                ? 'bg-[#10B981] text-zinc-950 shadow-sm'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#25262E]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Android
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'desktop'
                ? 'bg-[#10B981] text-zinc-950 shadow-sm'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#25262E]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
        </div>

        {/* Step-by-Step Instructions Content */}
        {activeTab === 'ios' && (
          <div className="space-y-3 text-xs text-[#D4D4D8]">
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
              <strong>Safari Required:</strong> Apple iOS requires opening quit.habitz in <strong>Safari</strong> to install on your Home Screen.
            </div>

            <ol className="space-y-2.5">
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                <div>
                  Tap the <strong className="text-white inline-flex items-center gap-1">Share button <Share className="w-3.5 h-3.5 text-[#10B981]" /></strong> at the bottom of Safari.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                <div>
                  Scroll down the options list and select <strong className="text-white inline-flex items-center gap-1">Add to Home Screen <PlusSquare className="w-3.5 h-3.5 text-[#10B981]" /></strong>.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                <div>
                  Tap <strong className="text-white">Add</strong> in the top right corner. The app icon will appear on your Home Screen!
                </div>
              </li>
            </ol>
          </div>
        )}

        {activeTab === 'android' && (
          <div className="space-y-3 text-xs text-[#D4D4D8]">
            <ol className="space-y-2.5">
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                <div>
                  Tap the <strong className="text-white inline-flex items-center gap-1">3 dots menu <MoreVertical className="w-3.5 h-3.5 text-[#10B981]" /></strong> in the top right of Chrome/Edge.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                <div>
                  Tap <strong className="text-white inline-flex items-center gap-1">Install app <Download className="w-3.5 h-3.5 text-[#10B981]" /></strong> or <strong>Add to Home screen</strong>.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                <div>
                  Confirm by tapping <strong className="text-white">Install</strong>. It will be added to your app drawer.
                </div>
              </li>
            </ol>
          </div>
        )}

        {activeTab === 'desktop' && (
          <div className="space-y-3 text-xs text-[#D4D4D8]">
            <ol className="space-y-2.5">
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                <div>
                  Look at the right side of your browser <strong className="text-white">Address / URL Bar</strong>.
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                <div>
                  Click the <strong className="text-white inline-flex items-center gap-1">Install Icon <Download className="w-3.5 h-3.5 text-[#10B981]" /></strong> (computer with down arrow or plus icon).
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-[#1D1E24] border border-[#27272A]">
                <span className="w-5 h-5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                <div>
                  Click <strong className="text-white">Install</strong> to open quit.habitz as a standalone desktop app!
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272A] text-[11px] text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#10B981]" /> Offline Ready
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Zero Server Tracking
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#202127] hover:bg-[#2A2B32] text-white font-bold text-xs transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
