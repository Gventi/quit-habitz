const STORAGE_KEY_CONFIG = 'quit_habitz_config_v1';
const STORAGE_KEY_CRAVINGS = 'quit_habitz_cravings_v1';

export function getStoredConfig() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!data) return null;
    return JSON.parse(data);
  } catch (e) {
    console.error('Error loading config from localStorage', e);
    return null;
  }
}

export function saveStoredConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving config to localStorage', e);
  }
}

export function getStoredCravings() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CRAVINGS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading cravings from localStorage', e);
    return [];
  }
}

export function saveCraving(craving) {
  try {
    const cravings = getStoredCravings();
    const updated = [craving, ...cravings];
    localStorage.setItem(STORAGE_KEY_CRAVINGS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving craving to localStorage', e);
    return [];
  }
}

export function clearAllData() {
  try {
    localStorage.removeItem(STORAGE_KEY_CONFIG);
    localStorage.removeItem(STORAGE_KEY_CRAVINGS);
  } catch (e) {
    console.error('Error clearing data', e);
  }
}

export function exportBackupData() {
  const config = getStoredConfig();
  const cravings = getStoredCravings();
  const exportPayload = {
    app: 'quit.habitz',
    version: 1,
    exportedAt: new Date().toISOString(),
    config,
    cravings
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportPayload, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `quit_habitz_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importBackupData(jsonData) {
  try {
    const parsed = JSON.parse(jsonData);
    if (!parsed || !parsed.config || !parsed.config.quitDateTime) {
      throw new Error('Invalid backup file format.');
    }
    saveStoredConfig(parsed.config);
    if (Array.isArray(parsed.cravings)) {
      localStorage.setItem(STORAGE_KEY_CRAVINGS, JSON.stringify(parsed.cravings));
    }
    return true;
  } catch (err) {
    console.error('Failed to import backup data:', err);
    throw err;
  }
}
