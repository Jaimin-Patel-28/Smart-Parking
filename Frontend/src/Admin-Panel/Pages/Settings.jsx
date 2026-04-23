import { useNavigate } from "react-router-dom";
import {
  Save,
  RotateCcw,
  Loader,
  AlertCircle,
  Bell,
  Monitor,
  Settings as SettingsIcon,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";
import useAdminSettings from "../Settings/Hooks/useAdminSettings";

const Settings = () => {
  const navigate = useNavigate();
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
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader className="w-8 h-8 text-[#FA8112] animate-spin" />
        <p className="text-[#FAF3E1]/40 text-[10px] uppercase font-bold tracking-widest">
          Loading Preferences...
        </p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-8 text-center">
        <p className="text-rose-400 font-medium">
          Configuration data unavailable. Please refresh.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* 1. BACK NAVIGATION */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
        >
          <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Dashboard
          </span>
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
          System Settings
        </h2>
        <p className="text-[#FAF3E1]/40 text-sm">
          Configure notifications, UI preferences, and operational defaults.
        </p>
      </div>

      {/* FEEDBACK ALERTS */}
      {(error || successMessage) && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            successMessage
              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/5 border-rose-500/20 text-rose-300"
          }`}
        >
          {successMessage ? (
            <BadgeCheck size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{successMessage || error}</span>
        </div>
      )}

      {/* SETTINGS FORM SECTIONS */}
      <div className="space-y-6">
        {/* NOTIFICATIONS SECTION */}
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5E7C6]/5 bg-[#FAF3E1]/2 flex items-center gap-2">
            <Bell size={18} className="text-[#FA8112]" />
            <h3 className="text-[#FAF3E1] font-semibold text-sm uppercase tracking-wider">
              Communication Channels
            </h3>
          </div>

          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: "emailEnabled",
                  label: "Email Alerts",
                  key: "notifications.emailEnabled",
                },
                {
                  id: "smsEnabled",
                  label: "SMS Alerts",
                  key: "notifications.smsEnabled",
                },
                {
                  id: "pushEnabled",
                  label: "Push Notifications",
                  key: "notifications.pushEnabled",
                },
              ].map((channel) => (
                <label
                  key={channel.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#222] border border-[#F5E7C6]/5 cursor-pointer hover:border-[#FA8112]/30 transition-all group"
                >
                  <span className="text-sm text-[#FAF3E1]/80 group-hover:text-[#FAF3E1]">
                    {channel.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.notifications?.[channel.id] || false}
                    onChange={(e) =>
                      updateSetting(channel.key, e.target.checked)
                    }
                    className="w-4 h-4 accent-[#FA8112] cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F5E7C6]/5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
                  Alert Frequency
                </label>
                <select
                  value={settings.alertFrequency || "instant"}
                  onChange={(e) =>
                    updateSetting("alertFrequency", e.target.value)
                  }
                  className="w-full h-11 rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none"
                >
                  <option value="instant">Real-time (Instant)</option>
                  <option value="every_5_mins">Every 5 Minutes</option>
                  <option value="every_15_mins">Every 15 Minutes</option>
                  <option value="every_hour">Hourly Summary</option>
                </select>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
                  Subscribed Events
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { key: "exceptionAlerts", label: "System Exceptions" },
                    { key: "overstayAlerts", label: "Vehicle Overstays" },
                    { key: "pendingPaymentAlerts", label: "Payment Issues" },
                  ].map((alert) => (
                    <div
                      key={alert.key}
                      className="flex items-center gap-3 px-1"
                    >
                      <input
                        type="checkbox"
                        checked={
                          settings.notificationTypes?.[alert.key] || false
                        }
                        onChange={(e) =>
                          updateSetting(
                            `notificationTypes.${alert.key}`,
                            e.target.checked,
                          )
                        }
                        className="w-3.5 h-3.5 accent-[#FA8112]"
                      />
                      <span className="text-xs text-[#FAF3E1]/60">
                        {alert.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DISPLAY & UI SECTION */}
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5E7C6]/5 bg-[#FAF3E1]/2 flex items-center gap-2">
            <Monitor size={18} className="text-[#FA8112]" />
            <h3 className="text-[#FAF3E1] font-semibold text-sm uppercase tracking-wider">
              Display Preferences
            </h3>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30">
                Interface Theme
              </label>
              <select
                value={settings.theme || "dark"}
                onChange={(e) => updateSetting("theme", e.target.value)}
                className="w-full h-11 rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none"
              >
                <option value="dark">Pro Dark (Recommended)</option>
                <option value="light">High Contrast Light</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30">
                System Language
              </label>
              <select
                value={settings.language || "en"}
                onChange={(e) => updateSetting("language", e.target.value)}
                className="w-full h-11 rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none"
              >
                <option value="en">English (US)</option>
                <option value="hi">हिन्दी (India)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30">
                Table Page Size
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={settings.itemsPerPage || 20}
                onChange={(e) =>
                  updateSetting("itemsPerPage", parseInt(e.target.value))
                }
                className="w-full h-11 rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none"
              />
            </div>
          </div>
        </div>

        {/* OPERATIONAL SECTION */}
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#F5E7C6]/5 bg-[#FAF3E1]/2 flex items-center gap-2">
            <SettingsIcon size={18} className="text-[#FA8112]" />
            <h3 className="text-[#FAF3E1] font-semibold text-sm uppercase tracking-wider">
              Gate Operations
            </h3>
          </div>

          <div className="p-6 space-y-6">
            <div className="max-w-md space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30">
                Default Shift Duration (Mins)
              </label>
              <input
                type="number"
                value={settings.defaultShiftDuration || 480}
                onChange={(e) =>
                  updateSetting(
                    "defaultShiftDuration",
                    parseInt(e.target.value),
                  )
                }
                className="w-full h-11 rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { key: "enableShiftNotes", label: "Enable Handover Notes" },
                { key: "enableOperationalAlerts", label: "Enable Gate Alerts" },
              ].map((toggle) => (
                <label
                  key={toggle.key}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 cursor-pointer hover:bg-[#FA8112]/5 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={settings[toggle.key] || false}
                    onChange={(e) =>
                      updateSetting(toggle.key, e.target.checked)
                    }
                    className="w-3.5 h-3.5 accent-[#FA8112]"
                  />
                  <span className="text-xs font-medium text-[#FAF3E1]/70">
                    {toggle.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ACTION PANEL */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={handleSaveSettings}
            disabled={!hasChanges || saving}
            className="flex-1 h-12 rounded-lg bg-[#FA8112] text-[#222222] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-[#FA8112]/10"
          >
            {saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save size={16} /> Deploy Settings
              </>
            )}
          </button>

          <button
            onClick={handleResetChanges}
            disabled={!hasChanges || saving}
            className="flex-1 h-12 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1]/60 border border-[#F5E7C6]/10 text-[11px] font-bold uppercase tracking-widest hover:bg-[#FAF3E1]/10 transition-all"
          >
            <RotateCcw size={16} /> Revert Changes
          </button>
        </div>

        {hasChanges && (
          <div className="flex items-center justify-center gap-2 py-4 animate-pulse">
            <AlertCircle size={14} className="text-amber-500" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500/70">
              Unsaved configuration detected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
