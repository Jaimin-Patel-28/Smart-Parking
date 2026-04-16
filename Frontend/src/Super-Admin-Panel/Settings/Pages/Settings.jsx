import React, { useEffect, useState } from "react";
import {
  BellRing,
  CircleAlert,
  LockKeyhole,
  RefreshCw,
  Settings as SettingsIcon,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";
import SettingsSectionCard from "../Components/SettingsSectionCard";
import SettingsToggle from "../Components/SettingsToggle";
import { useSettings } from "../Hooks/useSettings";

const inputBaseClass =
  "w-full bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/30 focus:outline-none focus:border-[#FA8112]/60";

const Settings = () => {
  const { settings, loading, savingSection, error, fetchSettings, updateSection } =
    useSettings();

  const [general, setGeneral] = useState({
    companyName: "",
    supportEmail: "",
    supportPhone: "",
    timezone: "",
    currency: "INR",
    defaultBufferMinutes: 15,
  });

  const [pricing, setPricing] = useState({
    baseHourlyRate: 40,
    minBookingMinutes: 30,
    cancelPenaltyPercent: 10,
    taxPercent: 18,
  });

  const [security, setSecurity] = useState({
    sessionTimeoutMinutes: 120,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    twoFactorRequired: false,
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    newBookingAlert: true,
    cancelBookingAlert: true,
    systemIncidentAlert: true,
    dailyReportEmail: true,
  });

  useEffect(() => {
    if (!settings) return;

    setGeneral((prev) => ({ ...prev, ...(settings.general || {}) }));
    setPricing((prev) => ({ ...prev, ...(settings.pricing || {}) }));
    setSecurity((prev) => ({ ...prev, ...(settings.security || {}) }));
    setNotifications((prev) => ({
      ...prev,
      ...(settings.notifications || {}),
    }));
  }, [settings]);

  const onSave = async (sectionName, payload) => {
    const result = await updateSection(sectionName, payload);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter flex items-center gap-3">
            <SettingsIcon className="text-[#FA8112]" size={30} />
            System <span className="text-[#FA8112]">Settings</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
            Configure platform behavior, billing, security, and alerts
          </p>
        </div>

        <button
          onClick={fetchSettings}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-[#FAF3E1]/6 border border-[#F5E7C6]/10 text-[#FAF3E1] px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FAF3E1]/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-4 text-sm font-semibold">
          {error}
        </div>
      ) : null}

      <SettingsSectionCard
        title="General Settings"
        description="Branding and default operational preferences"
        icon={CircleAlert}
        onSave={() => onSave("general", general)}
        saving={savingSection === "general"}
      >
        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Company Name
          </span>
          <input
            className={inputBaseClass}
            value={general.companyName}
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, companyName: e.target.value }))
            }
            placeholder="Smart Parking"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Support Email
          </span>
          <input
            className={inputBaseClass}
            value={general.supportEmail}
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, supportEmail: e.target.value }))
            }
            placeholder="support@smartparking.com"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Support Phone
          </span>
          <input
            className={inputBaseClass}
            value={general.supportPhone}
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, supportPhone: e.target.value }))
            }
            placeholder="+91 00000 00000"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Timezone
          </span>
          <input
            className={inputBaseClass}
            value={general.timezone}
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, timezone: e.target.value }))
            }
            placeholder="Asia/Kolkata"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Currency
          </span>
          <input
            className={inputBaseClass}
            value={general.currency}
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, currency: e.target.value }))
            }
            placeholder="INR"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Default Buffer (Minutes)
          </span>
          <input
            type="number"
            className={inputBaseClass}
            value={general.defaultBufferMinutes}
            onChange={(e) =>
              setGeneral((prev) => ({
                ...prev,
                defaultBufferMinutes: Number(e.target.value),
              }))
            }
          />
        </label>
      </SettingsSectionCard>

      <SettingsSectionCard
        title="Pricing Controls"
        description="Revenue and billing defaults"
        icon={Wallet}
        onSave={() => onSave("pricing", pricing)}
        saving={savingSection === "pricing"}
      >
        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Base Hourly Rate
          </span>
          <input
            type="number"
            className={inputBaseClass}
            value={pricing.baseHourlyRate}
            onChange={(e) =>
              setPricing((prev) => ({
                ...prev,
                baseHourlyRate: Number(e.target.value),
              }))
            }
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Min Booking Minutes
          </span>
          <input
            type="number"
            className={inputBaseClass}
            value={pricing.minBookingMinutes}
            onChange={(e) =>
              setPricing((prev) => ({
                ...prev,
                minBookingMinutes: Number(e.target.value),
              }))
            }
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Cancellation Penalty (%)
          </span>
          <input
            type="number"
            className={inputBaseClass}
            value={pricing.cancelPenaltyPercent}
            onChange={(e) =>
              setPricing((prev) => ({
                ...prev,
                cancelPenaltyPercent: Number(e.target.value),
              }))
            }
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Tax (%)
          </span>
          <input
            type="number"
            className={inputBaseClass}
            value={pricing.taxPercent}
            onChange={(e) =>
              setPricing((prev) => ({
                ...prev,
                taxPercent: Number(e.target.value),
              }))
            }
          />
        </label>
      </SettingsSectionCard>

      <SettingsSectionCard
        title="Security Policies"
        description="Session and authentication policies"
        icon={LockKeyhole}
        onSave={() => onSave("security", security)}
        saving={savingSection === "security"}
      >
        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Session Timeout (Minutes)
          </span>
          <input
            type="number"
            className={inputBaseClass}
            value={security.sessionTimeoutMinutes}
            onChange={(e) =>
              setSecurity((prev) => ({
                ...prev,
                sessionTimeoutMinutes: Number(e.target.value),
              }))
            }
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Max Login Attempts
          </span>
          <input
            type="number"
            className={inputBaseClass}
            value={security.maxLoginAttempts}
            onChange={(e) =>
              setSecurity((prev) => ({
                ...prev,
                maxLoginAttempts: Number(e.target.value),
              }))
            }
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/45">
            Min Password Length
          </span>
          <input
            type="number"
            className={inputBaseClass}
            value={security.passwordMinLength}
            onChange={(e) =>
              setSecurity((prev) => ({
                ...prev,
                passwordMinLength: Number(e.target.value),
              }))
            }
          />
        </label>

        <SettingsToggle
          label="Two-Factor Authentication Required"
          hint="Require extra verification for admin access"
          checked={security.twoFactorRequired}
          onChange={(value) =>
            setSecurity((prev) => ({ ...prev, twoFactorRequired: value }))
          }
        />
      </SettingsSectionCard>

      <SettingsSectionCard
        title="Notification Rules"
        description="Control operational alerts and communications"
        icon={BellRing}
        onSave={() => onSave("notifications", notifications)}
        saving={savingSection === "notifications"}
      >
        <SettingsToggle
          label="Email Alerts"
          checked={notifications.emailAlerts}
          onChange={(value) =>
            setNotifications((prev) => ({ ...prev, emailAlerts: value }))
          }
        />

        <SettingsToggle
          label="SMS Alerts"
          checked={notifications.smsAlerts}
          onChange={(value) =>
            setNotifications((prev) => ({ ...prev, smsAlerts: value }))
          }
        />

        <SettingsToggle
          label="New Booking Alerts"
          checked={notifications.newBookingAlert}
          onChange={(value) =>
            setNotifications((prev) => ({ ...prev, newBookingAlert: value }))
          }
        />

        <SettingsToggle
          label="Booking Cancellation Alerts"
          checked={notifications.cancelBookingAlert}
          onChange={(value) =>
            setNotifications((prev) => ({ ...prev, cancelBookingAlert: value }))
          }
        />

        <SettingsToggle
          label="System Incident Alerts"
          checked={notifications.systemIncidentAlert}
          onChange={(value) =>
            setNotifications((prev) => ({ ...prev, systemIncidentAlert: value }))
          }
        />

        <SettingsToggle
          label="Daily Report Email"
          checked={notifications.dailyReportEmail}
          onChange={(value) =>
            setNotifications((prev) => ({ ...prev, dailyReportEmail: value }))
          }
        />
      </SettingsSectionCard>
    </div>
  );
};

export default Settings;
