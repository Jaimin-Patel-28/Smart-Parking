import { useEffect, useState } from "react";
import { settingsService } from "../Services/settingsService";

const mapResponse = (response) => response?.data?.data || {};

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState("");
  const [error, setError] = useState("");

  const fetchSettings = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await settingsService.getSettings();
      setSettings(mapResponse(response));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (sectionName, payload) => {
    const actionMap = {
      general: settingsService.updateGeneralSettings,
      pricing: settingsService.updatePricingSettings,
      security: settingsService.updateSecuritySettings,
      notifications: settingsService.updateNotificationSettings,
    };

    const updater = actionMap[sectionName];
    if (!updater) {
      throw new Error(`Unsupported section: ${sectionName}`);
    }

    setSavingSection(sectionName);
    setError("");

    try {
      const response = await updater(payload);
      setSettings(mapResponse(response));
      return {
        success: true,
        message:
          response?.data?.message || `${sectionName} settings updated successfully`,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || `Failed to update ${sectionName} settings`;
      setError(message);
      return { success: false, message };
    } finally {
      setSavingSection("");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    savingSection,
    error,
    fetchSettings,
    updateSection,
  };
};
