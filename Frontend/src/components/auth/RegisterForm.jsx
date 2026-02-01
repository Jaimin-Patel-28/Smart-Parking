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

    if (!passwordsMatch) return;
    if (!emailRegex.test(form.email)) return;
    if (form.vehicleNumber && !vehicleRegex.test(form.vehicleNumber)) return;

    try {
      setIsLoading(true);

      await axios.post("http://localhost:5000/api/auth/register", form);

      // 🔹 RULE 2: save for login autofill (NO auto-login)
      sessionStorage.setItem(
        "loginPrefill",
        JSON.stringify({
          email: form.email,
          password: form.password,
        })
      );

      setMode("login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* FULL NAME */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400">
          <User size={18} />
        </div>
        <input
          type="text"
          placeholder="Full Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl py-3 pl-11 pr-4 focus:border-purple-400/50"
        />
      </div>

      {/* EMAIL */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400">
          <Mail size={18} />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl py-3 pl-11 pr-4 focus:border-purple-400/50"
        />
      </div>
      {form.email && !emailRegex.test(form.email) && (
        <p className="text-rose-400 text-xs">Example: admin123@gmail.com</p>
      )}

      {/* PASSWORD */}
      <div className="space-y-2">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400">
            <Lock size={18} />
          </div>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl py-3 pl-11 pr-4"
          />
        </div>
        <PasswordStrength password={form.password} />
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400">
          <Lock size={18} />
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className={`w-full bg-slate-950/50 border text-white text-sm rounded-xl py-3 pl-11 pr-10 ${
            confirm
              ? passwordsMatch
                ? "border-emerald-500/50"
                : "border-rose-500/50"
              : "border-slate-800"
          }`}
        />
        {confirm && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {passwordsMatch ? (
              <CheckCircle2 size={16} className="text-emerald-500" />
            ) : (
              <AlertCircle size={16} className="text-rose-500" />
            )}
          </div>
        )}
      </div>

      {/* VEHICLE */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400">
          <Car size={18} />
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
          className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl py-3 pl-11 pr-4"
        />
      </div>
      {form.vehicleNumber && !vehicleRegex.test(form.vehicleNumber) && (
        <p className="text-rose-400 text-xs">Format: GJ-07-AC-1234</p>
      )}

      {/* ERROR */}
      {error && <p className="text-rose-400 text-sm">{error}</p>}

      {/* SUBMIT */}
      <button
        disabled={!passwordsMatch || isLoading}
        className="w-full bg-linear-to-r from-purple-500 to-pink-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
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
