import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Car,
  Lock,
  Loader2,
  ArrowRight,
  ShieldPlus,
} from "lucide-react";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    vehicleNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register(formData);
      toast.success("Verification OTP sent to your email");
      navigate("/auth/verify", { state: { email: formData.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 animate-in fade-in duration-500"
    >
      {/* 1. FULL NAME - PRIMARY INPUT */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 tracking-widest">
          Full Name
        </label>
        <div className="relative group">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
            size={18}
          />
          <input
            name="fullName"
            type="text"
            required
            onChange={handleChange}
            className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] pl-10 pr-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 focus:bg-[#FAF3E1]/[0.05] focus:outline-none transition-all"
            placeholder="e.g. Johnathan Doe"
          />
        </div>
      </div>

      {/* 2. CONTACT INFO GRID - RESPONSIVE */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 tracking-widest">
            Email
          </label>
          <div className="relative group">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
              size={18}
            />
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] pl-10 pr-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 focus:outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 tracking-widest">
            Mobile
          </label>
          <div className="relative group">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
              size={18}
            />
            <input
              name="mobile"
              type="tel"
              required
              onChange={handleChange}
              className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] pl-10 pr-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 focus:outline-none transition-all"
              placeholder="+91 00000 00000"
            />
          </div>
        </div>
      </div>

      {/* 3. VEHICLE & SECURITY SECTION */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 tracking-widest">
            Vehicle Number
          </label>
          <div className="relative group">
            <Car
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
              size={18}
            />
            <input
              name="vehicleNumber"
              type="text"
              required
              onChange={handleChange}
              className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] pl-10 pr-4 text-sm text-[#FAF3E1] font-mono placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 focus:outline-none transition-all uppercase"
              placeholder="GJ-01-AB-1234"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 tracking-widest">
            Access Password
          </label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
              size={18}
            />
            <input
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] pl-10 pr-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      {/* 4. SUBMIT ACTION */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-2 h-12 rounded-lg bg-[#FA8112] font-bold text-[11px] uppercase tracking-widest text-[#222222] transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#FA8112]/10"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Initialize Account
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>

      <p className="text-center text-[10px] text-[#FAF3E1]/20 font-bold uppercase tracking-widest">
        Secure encryption active
      </p>
    </form>
  );
};

export default RegisterForm;
