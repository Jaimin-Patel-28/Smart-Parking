import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  RefreshCcw,
  ArrowLeft,
  Loader2,
  MailCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);

  const email = location.state?.email;
  const flow = location.state?.flow || "register";

  useEffect(() => {
    if (!email) {
      navigate(flow === "reset" ? "/auth/login" : "/auth/register");
    }
  }, [email, navigate, flow]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setLoading(true);
    try {
      await authService.verifyOTP(email, otp, flow);
      if (flow === "reset") {
        navigate("/auth/reset-password", { state: { email } });
      } else {
        toast.success("Identity verified. Access granted.");
        navigate("/auth/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid security code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await authService.resendOTP(email);
      setTimer(60);
      toast.success("New verification code dispatched.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Dispatch failed");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* 1. BACK NAVIGATION */}
        <button
          onClick={() =>
            navigate(
              flow === "reset" ? "/auth/forgot-password" : "/auth/register",
            )
          }
          className="group mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          Modify {flow === "reset" ? "Request" : "Details"}
        </button>

        {/* 2. MAIN CARD */}
        <div className="rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-[#FAF3E1]/[0.02] rotate-12">
            <MailCheck size={140} />
          </div>

          <div className="relative z-10">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
                <ShieldCheck size={30} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#FAF3E1]">
                {flow === "reset" ? "Verify Reset" : "Email Security"}
              </h2>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-[#FAF3E1]/40 leading-relaxed">
                  We've dispatched a 6-digit code to:
                </p>
                <p className="text-sm font-semibold text-[#FA8112]/80">
                  {email}
                </p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-8">
              {/* OTP INPUT: Refined tracking and background */}
              <div className="relative group">
                <input
                  type="text"
                  maxLength="6"
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-[#222222] rounded-lg border border-[#F5E7C6]/10 py-4 text-center text-3xl font-bold tracking-[0.6em] text-[#FA8112] placeholder:text-[#FAF3E1]/5 focus:border-[#FA8112]/50 outline-none transition-all"
                  placeholder="000000"
                />
              </div>

              <button
                disabled={loading || otp.length !== 6}
                className="flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-[#FA8112] font-bold text-[11px] uppercase tracking-widest text-[#222222] transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-30 shadow-lg shadow-[#FA8112]/10"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : flow === "reset" ? (
                  "Authorize Reset"
                ) : (
                  "Verify Identity"
                )}
              </button>
            </form>

            {/* 3. RESEND ACTION */}
            <div className="mt-10 text-center border-t border-[#F5E7C6]/5 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/20 mb-3">
                No code received?
              </p>
              <button
                onClick={handleResend}
                disabled={timer > 0 || resending}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#FA8112]/60 hover:text-[#FA8112] disabled:text-[#FAF3E1]/10 transition-colors"
              >
                {resending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    <RefreshCcw
                      size={14}
                      className={timer === 0 ? "animate-pulse" : ""}
                    />
                    {timer > 0 ? `Retry in ${timer}s` : "Resend Security Code"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
