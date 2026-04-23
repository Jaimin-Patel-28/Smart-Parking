import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, RefreshCw, CheckCircle2 } from "lucide-react";
import authService from "../Services/authService";
import toast from "react-hot-toast";

const OTPInput = ({ email, onVerified }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    try {
      setLoading(true);
      await authService.verifyOTP(email, otp);
      onVerified();
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in duration-500">
      {/* 1. BACK NAVIGATION */}
      <div className="flex items-center justify-start">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
        >
          <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Change Email
          </span>
        </button>
      </div>

      {/* 2. HEADER SECTION */}
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112] mb-2">
          <ShieldCheck size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#FAF3E1]">
          Security Verification
        </h2>
        <div className="space-y-1">
          <p className="text-sm text-[#FAF3E1]/50">
            A 6-digit code was sent to your inbox:
          </p>
          <p className="text-sm font-semibold text-[#FA8112] tracking-wide">
            {email}
          </p>
        </div>
      </div>

      {/* 3. REFINED OTP INPUT */}
      <div className="space-y-6">
        <div className="relative group">
          <input
            type="text"
            maxLength="6"
            autoFocus
            autoComplete="one-time-code"
            className="w-full bg-[#FAF3E1]/[0.02] rounded-xl border border-[#F5E7C6]/10 py-5 text-center text-3xl font-bold tracking-[0.75em] text-[#FA8112] placeholder:text-[#FAF3E1]/5 focus:border-[#FA8112]/50 focus:bg-[#FAF3E1]/[0.05] focus:outline-none transition-all"
            placeholder="000000"
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            value={otp}
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={loading || otp.length < 6}
          className="w-full h-12 rounded-lg bg-[#FA8112] text-[#222222] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] disabled:opacity-30 transition-all shadow-lg shadow-[#FA8112]/10"
        >
          {loading ? (
            <RefreshCw className="animate-spin" size={16} />
          ) : (
            <>
              <CheckCircle2 size={16} /> Verify & Complete
            </>
          )}
        </button>
      </div>

      {/* 4. FOOTER OPTIONS */}
      <div className="text-center">
        <p className="text-xs text-[#FAF3E1]/30">
          Didn't receive the code?{" "}
          <button className="text-[#FA8112]/60 hover:text-[#FA8112] font-bold transition-colors">
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPInput;
