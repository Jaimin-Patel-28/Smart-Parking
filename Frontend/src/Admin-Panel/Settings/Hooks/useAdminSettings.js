import { useEffect, useState } from "react";
import { getAdminSettings, updateAdminSettings } from "../Services/settingsService";

const useAdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminSettings();
      setSettings(data);
      setHasChanges(false);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (path, value) => {
    setSettings((prev) => {
      const updated = JSON.parse(JSON.stringify(prev));

      // Navigate nested path and update value
      const keys = path.split(".");
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      return updated;
    });
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      // Prepare update payload (only changed settings)
      const updatePayload = {
        notifications: settings.notifications,
        alertFrequency: settings.alertFrequency,
        notificationTypes: settings.notificationTypes,
        theme: settings.theme,
        language: settings.language,
        itemsPerPage: settings.itemsPerPage,
        autoRefreshInterval: settings.autoRefreshInterval,
        exportFormat: settings.exportFormat,
        defaultShiftDuration: settings.defaultShiftDuration,
        enableShiftNotes: settings.enableShiftNotes,
        enableOperationalAlerts: settings.enableOperationalAlerts,
      };

      const updatedSettings = await updateAdminSettings(updatePayload);
      setSettings(updatedSettings);
      setHasChanges(false);
      setSuccessMessage("Settings saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
      return updatedSettings;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Failed to save settings";
      setError(errorMsg);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleResetChanges = () => {
    fetchSettings();
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    saving,
    error,
    successMessage,
    hasChanges,
    fetchSettings,
    updateSetting,
    handleSaveSettings,
    handleResetChanges,
  };
};

export default useAdminSettings;
