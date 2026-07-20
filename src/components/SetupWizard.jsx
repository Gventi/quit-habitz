import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, Package, Cigarette, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export default function SetupWizard({ onComplete }) {
  const getNowFormatted = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const [step, setStep] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [formData, setFormData] = useState({
    quitDateTime: getNowFormatted(),
    cigsPerDay: 15,
    cigsPerPack: 20,
    costPerPack: 10.50,
    currency: '$'
  });

  const [errors, setErrors] = useState({});

  const currencyOptions = ['$', '€', '£', '¥', '₹', 'R$', 'CA$', 'AU$'];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.quitDateTime) newErrors.quitDateTime = 'Please select your quit date & time';
    } else if (currentStep === 2) {
      if (!formData.cigsPerDay || Number(formData.cigsPerDay) <= 0) newErrors.cigsPerDay = 'Valid count required (> 0)';
    } else if (currentStep === 3) {
      if (!formData.cigsPerPack || Number(formData.cigsPerPack) <= 0) newErrors.cigsPerPack = 'Valid pack size required (> 0)';
    } else if (currentStep === 4) {
      if (!formData.costPerPack || Number(formData.costPerPack) <= 0) newErrors.costPerPack = 'Valid price required (> 0)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        setIsExiting(true);
        setTimeout(() => {
          onComplete(formData);
        }, 400);
      }
    }
  };

  const setPresetQuitTime = (offsetHours) => {
    const d = new Date();
    d.setHours(d.getHours() - offsetHours);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setFormData((prev) => ({ ...prev, quitDateTime: d.toISOString().slice(0, 16) }));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#111215] text-[#F4F4F6] relative font-sans transition-all duration-400 ${
      isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
    }`}>
      <div className="w-full max-w-xl bg-[#18191E] border border-[#27272A] rounded-2xl p-6 sm:p-10 shadow-xl relative z-10 space-y-6">
        
        {/* Brand Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero Account • 100% Offline Local Privacy
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F4F6] tracking-tight">
            Welcome to quit.<span className="text-[#10B981]">habitz</span>
          </h1>
          <p className="text-[#A1A1AA] text-xs sm:text-sm">
            Set up your smoke-free tracker in seconds. All data stays strictly on your device.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="flex items-center justify-between px-2 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    step === i
                      ? 'bg-[#10B981] text-zinc-950 shadow-sm'
                      : step > i
                      ? 'bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981]'
                      : 'bg-[#141519] border border-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  {step > i ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : i}
                </div>
                <span className="text-[10px] text-[#A1A1AA] mt-1.5 font-medium hidden sm:block">
                  {i === 1 ? 'Timestamp' : i === 2 ? 'Daily Smokes' : i === 3 ? 'Pack Size' : 'Pack Cost'}
                </span>
              </div>
              {i < 4 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    step > i ? 'bg-[#10B981]/40' : 'bg-[#27272A]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Quit Date & Time */}
        {step === 1 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20 text-[#10B981] shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#F4F4F6]">When is your Quit Timestamp?</h2>
                <p className="text-xs text-[#A1A1AA]">Select the date & time you smoked your last cigarette</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
                Official Quit Timestamp
              </label>
              <input
                type="datetime-local"
                value={formData.quitDateTime}
                onChange={(e) => handleChange('quitDateTime', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl input-solid text-sm font-mono"
              />
              {errors.quitDateTime && <p className="text-rose-400 text-xs font-semibold">{errors.quitDateTime}</p>}
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] text-[#A1A1AA] font-semibold">Quick Presets:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Right Now', hours: 0 },
                  { label: '12 Hours Ago', hours: 12 },
                  { label: 'Yesterday', hours: 24 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setPresetQuitTime(preset.hours)}
                    className="px-3 py-2 rounded-lg bg-[#141519] hover:bg-[#202127] border border-[#27272A] text-xs text-[#F4F4F6] font-medium transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Daily Cigarettes */}
        {step === 2 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20 text-[#10B981] shrink-0">
                <Cigarette className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#F4F4F6]">Daily Cigarette Average</h2>
                <p className="text-xs text-[#A1A1AA]">How many cigarettes did you smoke per day?</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
                Cigarettes Per Day
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="150"
                  value={formData.cigsPerDay}
                  onChange={(e) => handleChange('cigsPerDay', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl input-solid text-xl font-bold font-mono"
                  placeholder="15"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#A1A1AA] font-semibold">
                  cigs / day
                </span>
              </div>
              {errors.cigsPerDay && <p className="text-rose-400 text-xs font-semibold">{errors.cigsPerDay}</p>}
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] text-[#A1A1AA] font-semibold">Common Averages:</span>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20, 30, 40].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleChange('cigsPerDay', num)}
                    className={`py-2 rounded-lg border text-xs font-bold font-mono transition-colors ${
                      Number(formData.cigsPerDay) === num
                        ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                        : 'bg-[#141519] hover:bg-[#202127] border-[#27272A] text-[#A1A1AA]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pack Size */}
        {step === 3 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20 text-[#10B981] shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#F4F4F6]">Pack Quantity</h2>
                <p className="text-xs text-[#A1A1AA]">How many cigarettes were in a single pack?</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
                Cigarettes Per Pack
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.cigsPerPack}
                onChange={(e) => handleChange('cigsPerPack', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl input-solid text-xl font-bold font-mono"
                placeholder="20"
              />
              {errors.cigsPerPack && <p className="text-rose-400 text-xs font-semibold">{errors.cigsPerPack}</p>}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[20, 25, 30].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleChange('cigsPerPack', size)}
                  className={`py-2 rounded-lg border text-xs font-bold font-mono transition-colors ${
                    Number(formData.cigsPerPack) === size
                      ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                      : 'bg-[#141519] hover:bg-[#202127] border-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  {size} Pack
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Cost Per Pack & Currency */}
        {step === 4 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 flex items-center justify-center border border-[#10B981]/20 text-[#10B981] shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#F4F4F6]">Financial Parameters</h2>
                <p className="text-xs text-[#A1A1AA]">Specify your average pack cost to calculate total money saved</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
                Currency Symbol
              </label>
              <div className="flex flex-wrap gap-2">
                {currencyOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleChange('currency', c)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-colors ${
                      formData.currency === c
                        ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                        : 'bg-[#141519] border-[#27272A] text-[#A1A1AA]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-wider block">
                Cost Per Pack ({formData.currency})
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] font-bold font-mono text-lg">
                  {formData.currency}
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.10"
                  value={formData.costPerPack}
                  onChange={(e) => handleChange('costPerPack', e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl input-solid text-xl font-bold font-mono"
                  placeholder="10.50"
                />
              </div>
              {errors.costPerPack && <p className="text-rose-400 text-xs font-semibold">{errors.costPerPack}</p>}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-lg border border-[#27272A] hover:border-[#3F3F46] text-[#A1A1AA] hover:text-[#F4F4F6] text-xs font-semibold transition-colors"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 max-w-[210px] flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#10B981]/90 text-zinc-950 font-extrabold text-xs tracking-wide shadow-sm transition-all active:scale-95"
          >
            {step === 4 ? (
              <>
                Initialize Dashboard <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Continue <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
