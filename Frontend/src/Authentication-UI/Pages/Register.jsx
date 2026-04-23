import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../Components/RegisterForm";
import { ShieldCheck, ArrowLeft, Hexagon } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[95vh] flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        {/* 1. TOP NAVIGATION: Essential for UX flow */}
        <button
          onClick={() => navigate("/")}
          className="group mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all w-fit"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Site
        </button>

        {/* 2. HEADER SECTION: Architectural Branding */}
        <div className="mb-10 text-center">
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
            {/* Geometric background for icon */}
            <Hexagon
              size={64}
              className="absolute text-[#FA8112]/10 fill-[#FA8112]/5 rotate-90"
              strokeWidth={1}
            />
            <ShieldCheck
              size={32}
              className="relative z-10 text-[#FA8112]"
              strokeWidth={1.5}
            />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#FAF3E1]">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-[#FAF3E1]/40 tracking-wide">
            Register your vehicle and join the Smart Park network.
          </p>
        </div>

        {/* 3. CARD CONTAINER: Sharper, Professional Corners */}
        <div className="rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-6 md:p-10 backdrop-blur-sm shadow-2xl relative">
          {/* Subtle Side Accent */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-[#FA8112] rounded-r-full" />

          <RegisterForm />
        </div>

        {/* 4. FOOTER: Improved Hierarchy */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-xs text-[#FAF3E1]/30">
            Already have an active profile?{" "}
            <Link
              to="/auth/login"
              className="font-bold text-[#FA8112]/60 hover:text-[#FA8112] transition-colors"
            >
              Sign in to Portal
            </Link>
          </p>

          {/* Version/Identity metadata */}
          <div className="flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.3em] font-bold text-[#FAF3E1]/10">
            <span>Verified Environment</span>
            <span className="h-1 w-1 rounded-full bg-[#FAF3E1]/10" />
            <span>v1.2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
