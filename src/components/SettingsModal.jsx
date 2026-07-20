import React, { useState } from 'react';
import { X, Save, ShieldCheck, Download, Upload, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { exportBackupData, importBackupData } from '../utils/storage';

export default function SettingsModal({ isOpen, onClose, config, onUpdateConfig, onResetAll }) {
  const [formData, setFormData] = useState({
    quitDateTime: config?.quitDateTime || '',
    cigsPerDay: config?.cigsPerDay || 15,
    cigsPerPack: config?.cigsPerPack || 20,
    costPerPack: config?.costPerPack || 10.00,
    currency: config?.currency || '$'
  });

  const [confirmReset, setConfirmReset] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [importError, setImportError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateConfig(formData);
    setSaveStatus('Settings updated successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = event.target.result;
        importBackupData(jsonContent);
        window.location.reload();
      } catch (err) {
        setImportError('Invalid backup file. Please select a valid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#F3F4F6]">Settings & Privacy Controls</h2>
              <p className="text-xs text-[#9CA3AF]">100% Privacy • Browser LocalStorage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {saveStatus && (
          <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {saveStatus}
          </div>
        )}

        {importError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> {importError}
          </div>
        )}

        {/* Parameters Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Tracker Parameters</h3>

          <div className="space-y-2">
            <label className="text-xs text-[#9CA3AF] font-semibold block">Quit Date & Time</label>
            <input
              type="datetime-local"
              value={formData.quitDateTime}
              onChange={(e) => handleChange('quitDateTime', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-[#F3F4F6] text-sm font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-[#9CA3AF] font-semibold block">Daily Cigarettes</label>
              <input
                type="number"
                min="1"
                value={formData.cigsPerDay}
                onChange={(e) => handleChange('cigsPerDay', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-[#F3F4F6] text-sm font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#9CA3AF] font-semibold block">Cigarettes / Pack</label>
              <input
                type="number"
                min="1"
                value={formData.cigsPerPack}
                onChange={(e) => handleChange('cigsPerPack', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-[#F3F4F6] text-sm font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-[#9CA3AF] font-semibold block">Pack Cost</label>
              <input
                type="number"
                step="0.01"
                min="0.10"
                value={formData.costPerPack}
                onChange={(e) => handleChange('costPerPack', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-[#F3F4F6] text-sm font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#9CA3AF] font-semibold block">Currency Symbol</label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-[#F3F4F6] text-sm font-mono"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#06B6D4] hover:from-[#10B981]/90 hover:to-[#06B6D4]/90 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" /> Save Updated Parameters
          </button>
        </form>

        {/* Data Backup & Restore */}
        <div className="border-t border-slate-800/60 pt-4 space-y-3">
          <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Backup & Restore</h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={exportBackupData}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[#F3F4F6] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-[#10B981]" /> Export JSON Backup
            </button>

            <label className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[#F3F4F6] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-[#06B6D4]" /> Import JSON Backup
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-slate-800/60 pt-4 space-y-3">
          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Danger Zone</h3>

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-rose-400" /> Reset All Data & Start Over
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                <AlertTriangle className="w-4 h-4" /> Are you sure? This will wipe all saved local tracker data!
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onResetAll}
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md"
                >
                  Yes, Wipe Everything
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#9CA3AF] font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
