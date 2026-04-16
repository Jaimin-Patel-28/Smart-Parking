import { Save, RotateCcw, Loader, AlertCircle } from "lucide-react";
import useAdminSettings from "../Settings/Hooks/useAdminSettings";

const Settings = () => {
  const {
    settings,
    loading,
    saving,
    error,
    successMessage,
    hasChanges,
    updateSetting,
    handleSaveSettings,
    handleResetChanges,
  } = useAdminSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-[#FA8112] animate-spin" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-red-400">
        <p>Failed to load settings. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#FAF3E1]">Admin Settings</h2>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-rose-400 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-emerald-400">
          {successMessage}
        </div>
      )}

      {/* Settings Form */}
      <div className="space-y-6">
        {/* Notifications Section */}
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-black text-[#FAF3E1] uppercase tracking-wider">Notifications</h3>

          {/* Notification Channels */}
          <div className="space-y-4">
            <p className="text-[#FAF3E1]/70 text-sm uppercase tracking-widest">Notification Channels</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Email Notification */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#222222]/50 border border-[#F5E7C6]/10">
                <input
                  type="checkbox"
                  checked={settings.notifications?.emailEnabled || false}
                  onChange={(e) => updateSetting("notifications.emailEnabled", e.target.checked)}
                  className="w-4 h-4 accent-[#FA8112] cursor-pointer"
                />
                <span className="text-[#FAF3E1] text-sm font-semibold">Email Notifications</span>
              </div>

              {/* SMS Notification */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#222222]/50 border border-[#F5E7C6]/10">
                <input
                  type="checkbox"
                  checked={settings.notifications?.smsEnabled || false}
                  onChange={(e) => updateSetting("notifications.smsEnabled", e.target.checked)}
                  className="w-4 h-4 accent-[#FA8112] cursor-pointer"
                />
                <span className="text-[#FAF3E1] text-sm font-semibold">SMS Notifications</span>
              </div>

              {/* Push Notification */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#222222]/50 border border-[#F5E7C6]/10">
                <input
                  type="checkbox"
                  checked={settings.notifications?.pushEnabled || false}
                  onChange={(e) => updateSetting("notifications.pushEnabled", e.target.checked)}
                  className="w-4 h-4 accent-[#FA8112] cursor-pointer"
                />
                <span className="text-[#FAF3E1] text-sm font-semibold">Push Notifications</span>
              </div>
            </div>
          </div>

          {/* Alert Frequency */}
          <div className="space-y-3">
            <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-widest">Alert Frequency</label>
            <select
              value={settings.alertFrequency || "instant"}
              onChange={(e) => updateSetting("alertFrequency", e.target.value)}
              className="w-full h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] focus:outline-none focus:border-[#FA8112] transition"
            >
              <option value="instant">Instant</option>
              <option value="every_5_mins">Every 5 Minutes</option>
              <option value="every_15_mins">Every 15 Minutes</option>
              <option value="every_hour">Every Hour</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          {/* Notification Types */}
          <div className="space-y-4">
            <p className="text-[#FAF3E1]/70 text-sm uppercase tracking-widest">Alert Types</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: "exceptionAlerts", label: "Exception Alerts" },
                { key: "overstayAlerts", label: "Overstay Alerts" },
                { key: "pendingPaymentAlerts", label: "Pending Payment Alerts" },
                { key: "noShowAlerts", label: "No-Show Alerts" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-3 p-3 rounded-xl bg-[#222222]/50 border border-[#F5E7C6]/10">
                  <input
                    type="checkbox"
                    checked={settings.notificationTypes?.[item.key] || false}
                    onChange={(e) => updateSetting(`notificationTypes.${item.key}`, e.target.checked)}
                    className="w-4 h-4 accent-[#FA8112] cursor-pointer"
                  />
                  <span className="text-[#FAF3E1] text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Display & Preferences Section */}
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-black text-[#FAF3E1] uppercase tracking-wider">Display & UI</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme */}
            <div className="space-y-3">
              <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-widest">Theme</label>
              <select
                value={settings.theme || "dark"}
                onChange={(e) => updateSetting("theme", e.target.value)}
                className="w-full h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] focus:outline-none focus:border-[#FA8112] transition"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>

            {/* Language */}
            <div className="space-y-3">
              <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-widest">Language</label>
              <select
                value={settings.language || "en"}
                onChange={(e) => updateSetting("language", e.target.value)}
                className="w-full h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] focus:outline-none focus:border-[#FA8112] transition"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div className="space-y-3">
              <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-widest">Items Per Page</label>
              <input
                type="number"
                min="5"
                max="100"
                value={settings.itemsPerPage || 20}
                onChange={(e) => updateSetting("itemsPerPage", parseInt(e.target.value))}
                className="w-full h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] focus:outline-none focus:border-[#FA8112] transition"
              />
              <p className="text-[#FAF3E1]/50 text-xs">Range: 5 - 100 items</p>
            </div>

            {/* Auto Refresh Interval */}
            <div className="space-y-3">
              <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-widest">Auto Refresh (seconds)</label>
              <input
                type="number"
                min="10"
                max="300"
                value={settings.autoRefreshInterval || 60}
                onChange={(e) => updateSetting("autoRefreshInterval", parseInt(e.target.value))}
                className="w-full h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] focus:outline-none focus:border-[#FA8112] transition"
              />
              <p className="text-[#FAF3E1]/50 text-xs">Range: 10 - 300 seconds</p>
            </div>

            {/* Export Format */}
            <div className="space-y-3">
              <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-widest">Export Format</label>
              <select
                value={settings.exportFormat || "csv"}
                onChange={(e) => updateSetting("exportFormat", e.target.value)}
                className="w-full h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] focus:outline-none focus:border-[#FA8112] transition"
              >
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
                <option value="xlsx">Excel (XLSX)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Operational Settings Section */}
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-black text-[#FAF3E1] uppercase tracking-wider">Operational Defaults</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default Shift Duration */}
            <div className="space-y-3">
              <label className="text-[#FAF3E1] text-sm font-semibold uppercase tracking-widest">Default Shift Duration (minutes)</label>
              <input
                type="number"
                min="60"
                max="1440"
                value={settings.defaultShiftDuration || 480}
                onChange={(e) => updateSetting("defaultShiftDuration", parseInt(e.target.value))}
                className="w-full h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] focus:outline-none focus:border-[#FA8112] transition"
              />
              <p className="text-[#FAF3E1]/50 text-xs">Range: 60 - 1440 minutes (1 - 24 hours)</p>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="space-y-4">
            <p className="text-[#FAF3E1]/70 text-sm uppercase tracking-widest">Feature Controls</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: "enableShiftNotes", label: "Enable Shift Notes" },
                { key: "enableOperationalAlerts", label: "Enable Operational Alerts" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-3 p-3 rounded-xl bg-[#222222]/50 border border-[#F5E7C6]/10">
                  <input
                    type="checkbox"
                    checked={settings[item.key] || false}
                    onChange={(e) => updateSetting(item.key, e.target.checked)}
                    className="w-4 h-4 accent-[#FA8112] cursor-pointer"
                  />
                  <span className="text-[#FAF3E1] text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSaveSettings}
            disabled={!hasChanges || saving}
            className="flex-1 h-11 rounded-xl bg-[#FA8112] text-[#222222] text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#FA8112]/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {saving ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>

          <button
            onClick={handleResetChanges}
            disabled={!hasChanges || saving}
            className="flex-1 h-11 rounded-xl bg-[#FAF3E1]/10 text-[#FAF3E1] text-sm font-black uppercase tracking-widest border border-[#F5E7C6]/10 flex items-center justify-center gap-2 hover:bg-[#FAF3E1]/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Changes
          </button>
        </div>

        {/* Change Indicator */}
        {hasChanges && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-400 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            You have unsaved changes
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
