export const DEFAULT_CONFIG = {
  quitDateTime: '',
  cigsPerDay: 15,
  cigsPerPack: 20,
  costPerPack: 10.00,
  currency: '$',
};

// Official World Health Organization (WHO) Health Recovery Milestones
export const WHO_MILESTONES = [
  {
    id: 'who_20m',
    seconds: 20 * 60, // 20 minutes
    title: '20 Minutes',
    benefit: 'Heart Rate & Blood Pressure Normalize',
    description: 'Heart rate and blood pressure drop back to normal.',
    icon: 'HeartPulse',
    category: 'Cardiovascular'
  },
  {
    id: 'who_12h',
    seconds: 12 * 3600, // 12 hours
    title: '12 Hours',
    benefit: 'Carbon Monoxide Levels Normalize',
    description: 'Carbon monoxide levels in the blood drop to normal.',
    icon: 'Wind',
    category: 'Blood Stream'
  },
  {
    id: 'who_48h',
    seconds: 48 * 3600, // 48 hours
    title: '48 Hours',
    benefit: 'Nicotine Elimination & Nerve Regrowth',
    description: 'Nicotine is entirely eliminated from the body; nerve endings start regrowing, improving smell and taste.',
    icon: 'Sparkles',
    category: 'Sensory & Sensory'
  },
  {
    id: 'who_72h',
    seconds: 72 * 3600, // 72 hours
    title: '72 Hours',
    benefit: 'Bronchial Relaxation',
    description: 'Bronchial tubes relax, making breathing significantly easier.',
    icon: 'Zap',
    category: 'Respiratory'
  },
  {
    id: 'who_2w_3m',
    seconds: 90 * 86400, // 3 months
    title: '2 Weeks to 3 Months',
    benefit: 'Lung Function +30% & Circulation Boost',
    description: 'Lung function increases up to 30% and circulation vastly improves.',
    icon: 'Activity',
    category: 'Circulation & Lungs'
  },
  {
    id: 'who_1y',
    seconds: 365 * 86400, // 1 year
    title: '1 Year',
    benefit: 'Coronary Heart Risk Halved',
    description: 'Excess risk of coronary heart disease is halved compared to a smoker.',
    icon: 'Award',
    category: 'Long-term Health'
  }
];

export const HEALTH_MILESTONES = WHO_MILESTONES;

// Badge Achievements
export const BADGES = [
  {
    id: 'badge_1d',
    title: 'Day 1 Champion',
    description: 'Completed 24 smoke-free hours',
    icon: 'Flame',
    color: 'from-amber-500 to-orange-600',
    check: (stats) => stats.totalSeconds >= 86400
  },
  {
    id: 'badge_3d',
    title: 'Peak Withdrawal Overcome',
    description: 'Made it past the 72-hour nicotine clear zone',
    icon: 'Shield',
    color: 'from-blue-500 to-cyan-600',
    check: (stats) => stats.totalSeconds >= 3 * 86400
  },
  {
    id: 'badge_1w',
    title: '1 Week Unstoppable',
    description: '7 consecutive smoke-free days',
    icon: 'Trophy',
    color: 'from-emerald-500 to-teal-600',
    check: (stats) => stats.totalSeconds >= 7 * 86400
  },
  {
    id: 'badge_1m',
    title: 'Monthly Hero',
    description: '30 days of clean, healthy lungs',
    icon: 'Star',
    color: 'from-purple-500 to-indigo-600',
    check: (stats) => stats.totalSeconds >= 30 * 86400
  },
  {
    id: 'badge_100cigs',
    title: '100 Smokes Avoided',
    description: 'Saved your lungs from 100 toxic cigarettes',
    icon: 'Ban',
    color: 'from-pink-500 to-rose-600',
    check: (stats) => stats.cigsAvoided >= 100
  },
  {
    id: 'badge_100saved',
    title: 'Century Saver',
    description: 'Kept over $100 in your bank account',
    icon: 'PiggyBank',
    color: 'from-green-500 to-emerald-600',
    check: (stats) => stats.moneySaved >= 100
  },
  {
    id: 'badge_1daylife',
    title: '1 Day Life Reclaimed',
    description: 'Regained 24+ full hours of living time',
    icon: 'Clock',
    color: 'from-yellow-400 to-amber-600',
    check: (stats) => stats.lifeHoursRegained >= 24
  }
];

// Craving Distraction Tips & Mantras
export const CRAVING_MANTRAS = [
  "This craving will pass in 3 to 5 minutes whether you smoke or not.",
  "You are not giving up a reward, you are gaining freedom.",
  "Every delay is a victory for your future self.",
  "Deep breath in: clarity. Deep breath out: tension.",
  "You don't need a cigarette to get through this moment."
];

export const QUICK_DISTRACTIONS = [
  { title: "Drink a cold glass of ice water", duration: "1 min", icon: "GlassWater" },
  { title: "Perform 15 quick jumping jacks", duration: "2 mins", icon: "Activity" },
  { title: "Step outside and take 10 deep breaths", duration: "3 mins", icon: "Wind" },
  { title: "Chew mint gum or eat a healthy snack", duration: "2 mins", icon: "Apple" },
  { title: "Send a encouraging text to a friend", duration: "3 mins", icon: "MessageCircle" }
];
