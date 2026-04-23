import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/auth/login");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword({ email, password: formData.password });
      toast.success("Security credentials updated. Please login.");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const hasMinLength = formData.password.length >= 8;
  const hasMatch =
    formData.password === formData.confirmPassword && formData.password !== "";

  return (
    <div className="flex min-h-[85vh] flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* CARD CONTAINER: Refined with sharper professional corners */}
        <div className="rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Icon Accent */}
          <div className="absolute -right-6 -top-6 text-[#FAF3E1]/[0.02] rotate-12">
            <ShieldAlert size={140} />
          </div>

          <div className="relative z-10">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
                <ShieldCheck size={30} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#FAF3E1]">
                Define Credentials
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#FAF3E1]/40">
                Establish a new secure password for:
                <span className="block mt-1 font-semibold text-[#FA8112]/80">
                  {email}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 tracking-widest">
                  New Secure Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                    size={18}
                  />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#222222] pl-10 pr-12 text-sm text-[#FAF3E1] focus:border-[#FA8112]/50 outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 hover:text-[#FAF3E1] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 tracking-widest">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                    size={18}
                  />
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#222222] pl-10 pr-4 text-sm text-[#FAF3E1] focus:border-[#FA8112]/50 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* REFINED: Requirement Indicators */}
              <div className="grid grid-cols-1 gap-2 py-2 px-1">
                <div
                  className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${hasMinLength ? "text-emerald-400" : "text-[#FAF3E1]/20"}`}
                >
                  <CheckCircle2 size={14} /> 8 Character minimum
                </div>
                <div
                  className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${hasMatch ? "text-emerald-400" : "text-[#FAF3E1]/20"}`}
                >
                  <CheckCircle2 size={14} /> Pattern Match confirmed
                </div>
              </div>

              <button
                disabled={loading || !hasMinLength || !hasMatch}
                className="group flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-[#FA8112] font-bold text-[11px] uppercase tracking-widest text-[#222222] transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-30 shadow-lg shadow-[#FA8112]/10"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Update Credentials"
                )}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-[#F5E7C6]/5 pt-6">
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#FAF3E1]/10">
                End-to-End Encryption Enabled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
