import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Car,
  UserPlus,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import PasswordStrength from "./PasswordStrength";
import SecurityNotes from "./SecurityNotes";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password && confirm && password === confirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    setIsLoading(true);
    // Mimicking a MERN backend registration request
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* FULL NAME */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
          <User size={18} />
        </div>
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-700 text-sm rounded-xl py-3 pl-11 pr-4 outline-hidden focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/5 transition-all"
        />
      </div>

      {/* EMAIL */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
          <Mail size={18} />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-700 text-sm rounded-xl py-3 pl-11 pr-4 outline-hidden focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/5 transition-all"
        />
      </div>

      {/* PASSWORD */}
      <div className="space-y-2">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
            <Lock size={18} />
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-700 text-sm rounded-xl py-3 pl-11 pr-4 outline-hidden focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/5 transition-all"
          />
        </div>
        <PasswordStrength password={password} />
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
          <Lock size={18} />
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className={`w-full bg-slate-950/50 border text-white placeholder:text-slate-700 text-sm rounded-xl py-3 pl-11 pr-10 outline-hidden transition-all ${
            confirm
              ? passwordsMatch
                ? "border-emerald-500/50 focus:ring-emerald-400/5"
                : "border-rose-500/50 focus:ring-rose-400/5"
              : "border-slate-800 focus:border-purple-400/50"
          }`}
        />
        {confirm && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            {passwordsMatch ? (
              <CheckCircle2 size={16} className="text-emerald-500" />
            ) : (
              <AlertCircle size={16} className="text-rose-500" />
            )}
          </div>
        )}
      </div>

      {/* VEHICLE NUMBER */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
          <Car size={18} />
        </div>
        <input
          type="text"
          placeholder="Vehicle Number (e.g., GJ-06-XX-XXXX)"
          className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-700 text-sm rounded-xl py-3 pl-11 pr-4 outline-hidden focus:border-purple-400/50 focus:ring-4 focus:ring-purple-400/5 transition-all"
        />
      </div>

      {/* TERMS */}
      <label className="flex items-center gap-2 cursor-pointer group px-1">
        <input
          type="checkbox"
          required
          className="w-4 h-4 rounded-sm border-slate-800 bg-slate-950 text-purple-500 focus:ring-0 transition-all"
        />
        <span className="text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors font-medium leading-tight">
          I agree to the{" "}
          <span className="text-purple-400">Terms of Service</span> and{" "}
          <span className="text-purple-400">Privacy Policy</span>.
        </span>
      </label>

      {/* SUBMIT BUTTON */}
      <button
        disabled={!passwordsMatch || isLoading}
        className="w-full relative group overflow-hidden bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-black text-sm py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:grayscale disabled:active:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            <UserPlus size={20} />
            Create Account
          </>
        )}
      </button>

      <SecurityNotes />
    </form>
  );
};

export default RegisterForm;
