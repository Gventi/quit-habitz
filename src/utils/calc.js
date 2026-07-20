/**
 * Helper to calculate stats based on quit timestamp and setup config.
 * Ticks in real-time down to the second.
 */
export function calculateStats(config, now = new Date()) {
  if (!config || !config.quitDateTime) {
    return {
      totalSeconds: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      exactCigsAvoided: 0,
      cigsAvoided: 0,
      moneySaved: 0,
      lifeMinutesRegained: 0,
      lifeHoursRegained: 0,
      lifeDaysRegained: 0,
      cigsPerSecond: 0,
      costPerCig: 0
    };
  }

  const quitTime = new Date(config.quitDateTime).getTime();
  const currentTime = now.getTime();
  const diffMs = Math.max(0, currentTime - quitTime);
  const totalSeconds = Math.floor(diffMs / 1000);
  const exactSeconds = diffMs / 1000;

  // Time components (Days, Hours, Minutes, Seconds)
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Cigarette rate calculation
  const cigsPerDay = Number(config.cigsPerDay) || 0;
  const cigsPerSecond = cigsPerDay / 86400;
  const exactCigsAvoided = exactSeconds * cigsPerSecond;
  const cigsAvoided = Math.floor(exactCigsAvoided);

  // Financial calculation: cost per cigarette * time elapsed (exact cigarettes avoided)
  const costPerPack = Number(config.costPerPack) || 0;
  const cigsPerPack = Number(config.cigsPerPack) || 20;
  const costPerCig = cigsPerPack > 0 ? costPerPack / cigsPerPack : 0;
  const moneySaved = exactCigsAvoided * costPerCig;

  // Life Time Regained: standard medical metric of 11 minutes per avoided cigarette
  const lifeMinutesRegained = exactCigsAvoided * 11;
  const lifeHoursRegained = lifeMinutesRegained / 60;
  const lifeDaysRegained = lifeHoursRegained / 24;

  const lifeRegainedDays = Math.floor(lifeMinutesRegained / (24 * 60));
  const lifeRegainedHours = Math.floor((lifeMinutesRegained % (24 * 60)) / 60);
  const lifeRegainedMins = Math.floor(lifeMinutesRegained % 60);
  const lifeRegainedSecs = Math.floor((lifeMinutesRegained * 60) % 60);

  return {
    totalSeconds,
    exactSeconds,
    days,
    hours,
    minutes,
    seconds,
    exactCigsAvoided,
    cigsAvoided,
    moneySaved,
    lifeMinutesRegained,
    lifeHoursRegained,
    lifeDaysRegained,
    lifeRegainedDays,
    lifeRegainedHours,
    lifeRegainedMins,
    lifeRegainedSecs,
    cigsPerSecond,
    costPerCig
  };
}

/**
 * Calculates current health milestone progress
 */
export function getMilestoneProgress(milestones, totalSeconds) {
  return milestones.map((m) => {
    const isCompleted = totalSeconds >= m.seconds;
    const progressPercent = isCompleted ? 100 : Math.min(99, Math.max(0, (totalSeconds / m.seconds) * 100));
    const secondsRemaining = Math.max(0, m.seconds - totalSeconds);

    return {
      ...m,
      isCompleted,
      progressPercent: Math.round(progressPercent * 10) / 10,
      secondsRemaining
    };
  });
}

/**
 * Format currency with flexible decimal places
 */
export function formatCurrency(amount, symbol = '$', decimals = 2) {
  return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}
