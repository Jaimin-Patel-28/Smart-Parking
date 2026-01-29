import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import SecurityNotes from "./SecurityNotes";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mimicking a MERN backend request for your presentation
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* EMAIL INPUT */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
            <Mail size={18} />
          </div>
          <input
            type="email"
            placeholder="name@company.com"
            required
            className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-700 text-sm rounded-xl py-3.5 pl-11 pr-4 outline-hidden focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5 transition-all"
          />
        </div>
      </div>

      {/* PASSWORD INPUT */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
          Secret Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
            <Lock size={18} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="w-full bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-700 text-sm rounded-xl py-3.5 pl-11 pr-12 outline-hidden focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-600 hover:text-cyan-400 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* FORM ACTIONS */}
      <div className="flex items-center justify-between px-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-sm border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 focus:ring-offset-0 transition-all"
          />
          <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors font-medium">
            Remember me
          </span>
        </label>
        <button
          type="button"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline underline-offset-4 transition-all"
        >
          Forgot password?
        </button>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={isLoading}
        className="w-full relative group overflow-hidden bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm py-4 rounded-xl transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            <LogIn size={20} />
            Authorize & Enter
          </>
        )}
      </button>

      {/* SECURITY COMPONENT */}
      <div className="pt-2">
        <SecurityNotes />
      </div>
    </form>
  );
};

export default LoginForm;
