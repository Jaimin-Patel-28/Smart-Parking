import { useState } from "react";
import axios from "axios";
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

const RegisterForm = ({ setMode }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    vehicleNumber: "",
  });

  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const vehicleRegex = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;

  const passwordsMatch = form.password && confirm && form.password === confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!passwordsMatch || !emailRegex.test(form.email)) return;
    if (form.vehicleNumber && !vehicleRegex.test(form.vehicleNumber)) return;

    try {
      setIsLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", form);

      // Rule 2: Save for login prefill logic remains identical
      sessionStorage.setItem(
        "loginPrefill",
        JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      );

      setMode("login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 1. FULL NAME */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#222222]/30 group-focus-within:text-[#FA8112]">
          <User size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-[#FAF3E1] border-2 border-transparent text-[#222222] text-sm font-bold rounded-2xl py-4 pl-11 pr-4 focus:border-[#222222] outline-none transition-all placeholder:text-[#222222]/20"
        />
      </div>

      {/* 2. EMAIL */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#222222]/30 group-focus-within:text-[#FA8112]">
          <Mail size={18} strokeWidth={2.5} />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-[#FAF3E1] border-2 border-transparent text-[#222222] text-sm font-bold rounded-2xl py-4 pl-11 pr-4 focus:border-[#222222] outline-none transition-all placeholder:text-[#222222]/20"
        />
      </div>
      {form.email && !emailRegex.test(form.email) && (
        <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest px-2">
          Example: user@gmail.com
        </p>
      )}

      {/* 3. PASSWORD & STRENGTH */}
      <div className="space-y-3">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#222222]/30 group-focus-within:text-[#FA8112]">
            <Lock size={18} strokeWidth={2.5} />
          </div>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-[#FAF3E1] border-2 border-transparent text-[#222222] text-sm font-bold rounded-2xl py-4 pl-11 pr-4 focus:border-[#222222] outline-none transition-all"
          />
        </div>
        <PasswordStrength password={form.password} />
      </div>

      {/* 4. CONFIRM PASSWORD */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#222222]/30 group-focus-within:text-[#FA8112]">
          <Lock size={18} strokeWidth={2.5} />
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className={`w-full bg-[#FAF3E1] border-2 text-[#222222] text-sm font-bold rounded-2xl py-4 pl-11 pr-10 outline-none transition-all ${
            confirm
              ? passwordsMatch
                ? "border-emerald-500/50"
                : "border-rose-500/50"
              : "border-transparent focus:border-[#222222]"
          }`}
        />
        {confirm && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {passwordsMatch ? (
              <CheckCircle2
                size={18}
                strokeWidth={3}
                className="text-emerald-500"
              />
            ) : (
              <AlertCircle
                size={18}
                strokeWidth={3}
                className="text-rose-500"
              />
            )}
          </div>
        )}
      </div>

      {/* 5. VEHICLE NUMBER */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#222222]/30 group-focus-within:text-[#FA8112]">
          <Car size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Vehicle Number (GJ-07-AC-1234)"
          onChange={(e) =>
            setForm({
              ...form,
              vehicleNumber: e.target.value.toUpperCase(),
            })
          }
          className="w-full bg-[#FAF3E1] border-2 border-transparent text-[#222222] text-sm font-bold rounded-2xl py-4 pl-11 pr-4 focus:border-[#222222] outline-none transition-all placeholder:text-[#222222]/20"
        />
      </div>
      {form.vehicleNumber && !vehicleRegex.test(form.vehicleNumber) && (
        <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest px-2">
          Format: GJ-07-AC-1234
        </p>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-rose-500 text-xs font-black uppercase tracking-widest px-2">
          {error}
        </p>
      )}

      {/* 6. SUBMIT BUTTON */}
      <button
        disabled={!passwordsMatch || isLoading}
        className="w-full bg-[#FA8112] text-[#FAF3E1] font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-[#FA8112]/20 hover:bg-[#222222] transition-all active:scale-95 disabled:opacity-50 text-[11px] uppercase tracking-[0.2em]"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            <UserPlus size={20} strokeWidth={3} />
            Create Account
          </>
        )}
      </button>

      <div className="pt-2 border-t border-[#222222]/5">
        <SecurityNotes />
      </div>
    </form>
  );
};

export default RegisterForm;
