import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Mail, Lock, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleLogin } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields", {
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#FAF3E1",
          border: "1px solid rgba(245, 231, 198, 0.1)",
        },
      });
      return;
    }

    setLoading(true);
    try {
      await handleLogin({ email, password });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* Container: Horizontal Grid on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
        
        {/* LEFT SECTION: Branding (Occupies 4/12 columns) */}
        <div className="lg:col-span-4 space-y-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#F5E7C6]/5 pb-6 lg:pb-0 lg:pr-8">
          <div className="inline-flex p-3 rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#FAF3E1]">Welcome Back</h2>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#FAF3E1]/30 font-bold mt-1">
              Secure Access Portal
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="hidden lg:inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all pt-4"
          >
            <ArrowLeft size={14} /> Back to Homepage
          </button>
        </div>

        {/* RIGHT SECTION: Inputs (Occupies 8/12 columns) */}
        <form onSubmit={onSubmit} className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/40 ml-1 tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors" size={18} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#222222] pl-10 pr-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 focus:outline-none transition-all"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/40 tracking-widest">
                  Password
                </label>
                <button type="button" className="text-[10px] uppercase font-bold text-[#FA8112]/60 hover:text-[#FA8112] transition-colors">
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors" size={18} />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full h-12 rounded-lg border border-[#F5E7C6]/10 bg-[#222222] pl-10 pr-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 focus:outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* ACTION BUTTON - Spans full width of the right grid */}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 h-12 rounded-lg bg-[#FA8112] font-bold text-[11px] uppercase tracking-widest text-[#222222] transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#FA8112]/10"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Authorize Access"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* MOBILE ONLY FOOTER */}
      <div className="lg:hidden mt-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all"
        >
          <ArrowLeft size={14} /> Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default LoginForm;