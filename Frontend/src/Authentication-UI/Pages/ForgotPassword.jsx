import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, KeyRound, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success("Reset OTP sent to your email");
      navigate("/auth/verify", { state: { email, flow: "reset" } });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* 1. BACK NAVIGATION: Refined with breadcrumb style */}
        <Link
          to="/auth/login"
          className="group mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/30 hover:text-[#FA8112] transition-all w-fit"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          Return to Portal
        </Link>

        {/* 2. CARD CONTAINER: Sharper corners and balanced padding */}
        <div className="rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute -right-4 -top-4 text-[#FAF3E1]/[0.02] rotate-12">
            <ShieldAlert size={120} />
          </div>

          <div className="relative z-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
                <KeyRound size={28} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#FAF3E1]">
                Recovery Access
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#FAF3E1]/40">
                Enter your credentials below. We will dispatch a 6-digit
                verification code to your registered email.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 tracking-widest">
                  Registered Email
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#222222] pl-10 pr-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 outline-none transition-all"
                    placeholder="e.g. admin@smartpark.com"
                  />
                </div>
              </div>

              <button
                disabled={loading || !email}
                className="group flex w-full h-12 items-center justify-center gap-2 rounded-lg bg-[#FA8112] font-bold text-[11px] uppercase tracking-widest text-[#222222] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-30 shadow-lg shadow-[#FA8112]/10"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Dispatch Reset OTP"
                )}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-[#F5E7C6]/5 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/20">
                System Assistance:{" "}
                <span className="text-[#FA8112]/40 hover:text-[#FA8112] cursor-pointer transition-colors">
                  Support Hub
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
