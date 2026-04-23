import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import { MapPin, ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[90vh] flex-col justify-center px-2 py-2 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        {/* 1. TOP NAVIGATION: Consistent Back Button */}
        <button
          onClick={() => navigate("/")}
          className="group mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all w-fit"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Home
        </button>

        {/* 2. BRANDING: Refined Weight and Icons */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#FA8112] shadow-xl shadow-[#FA8112]/10 transition-transform hover:scale-105">
            <MapPin size={32} className="text-[#222222]" strokeWidth={2.5} />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#FAF3E1]">
            System Access
          </h2>
          <p className="mt-2 text-sm text-[#FAF3E1]/40 max-w-[280px] leading-relaxed">
            Authorized personnel only. Please sign in to manage parking
            operations.
          </p>
        </div>

        {/* 3. CARD CONTAINER: Sharper, Professional Corners */}
        <div className="rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-4 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          {/* Subtle Decorative Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FA8112]/[0.03] to-transparent pointer-events-none" />

          <div className="relative z-10">
            <LoginForm />

            <div className="mt-8 text-center border-t border-[#F5E7C6]/5 pt-6">
              <Link
                to="/auth/forgot-password"
                className="text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1]/30 hover:text-[#FA8112] transition-all"
              >
                Reset Access Credentials
              </Link>
            </div>
          </div>
        </div>

        {/* 4. FOOTER: Improved Hierarchy */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-xs text-[#FAF3E1]/30">
            New to the system?{" "}
            <Link
              to="/auth/register"
              className="font-bold text-[#FA8112]/60 hover:text-[#FA8112] transition-colors underline-offset-4 hover:underline"
            >
              Create Operator Account
            </Link>
          </p>

          {/* Security Disclaimer */}
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#FAF3E1]/10 font-bold">
            Secure 256-bit Encrypted Session
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
