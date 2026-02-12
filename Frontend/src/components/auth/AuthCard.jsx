import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Zap } from "lucide-react";

const AuthCard = ({ mode, setMode }) => {
  const isLogin = mode === "login";

  return (
    <div className="relative w-full min-h-162.5 md:min-h-150 bg-white border-2 border-[#222222]/5 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-700">
      {/* 1️⃣ SLIDING OVERLAY: Vertical on Mobile, Horizontal on Desktop */}
      <div
        className={`relative md:absolute top-0 h-auto md:h-full w-full md:w-1/3 z-30 transition-all duration-700 ease-in-out p-8 md:p-12 flex flex-col justify-between shadow-xl ${
          isLogin ? "md:left-0 bg-[#222222]" : "md:left-2/3 bg-[#FA8112]"
        }`}
      >
        <div className="relative z-10">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FAF3E1]/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 md:mb-10 border border-[#FAF3E1]/20">
            <Zap
              className="text-[#FAF3E1]"
              size={24}
              md:size={28}
              strokeWidth={2.5}
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#FAF3E1] leading-[0.9] tracking-tighter whitespace-pre-line italic">
            {isLogin
              ? "Welcome \nBack to \nSmartPark"
              : "Join the \nSmart \nParking \nGrid"}
          </h2>

          <p className="mt-4 md:mt-6 text-[#FAF3E1]/60 text-sm md:text-base font-medium leading-relaxed max-w-62.5 md:max-w-none">
            {isLogin
              ? "Login with your credentials to continue"
              : "Create your account and start parking smarter"}
          </p>
        </div>

        {/* 🔁 SWITCH BUTTON: Visible at the bottom of the colored section on mobile */}
        <div className="relative z-10 mt-8 md:mt-0">
          <button
            onClick={() => setMode(isLogin ? "register" : "login")}
            className="w-full py-4 md:py-5 bg-[#FAF3E1] text-[#222222] font-black rounded-2xl hover:scale-105 transition-all text-[10px] md:text-[11px] uppercase tracking-[0.2em] shadow-lg active:scale-95"
          >
            {isLogin ? "Create Account" : "Sign In Now"}
          </button>
        </div>
      </div>

      {/* 2️⃣ FORM CONTAINER: Stacks below the header on mobile */}
      <div className="flex w-full bg-[#FAF3E1]/30 flex-1 relative">
        {/* REGISTER SECTION */}
        <div
          className={`w-full md:w-2/3 flex items-center justify-center p-8 md:p-16 transition-all duration-700 ${
            isLogin
              ? "opacity-0 invisible scale-95 md:translate-x-10 absolute md:relative"
              : "opacity-100 visible scale-100 translate-x-0 relative"
          }`}
        >
          <div className="w-full max-w-md">
            <span className="text-[#FA8112] font-black text-[10px] uppercase tracking-[0.3em] mb-2 md:mb-4 block">
              New Membership
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-[#222222] mb-3 md:mb-4 tracking-tighter leading-none">
              Create Account
            </h3>
            <p className="text-[#222222]/40 font-medium text-base md:text-lg mb-6 md:mb-10">
              Fill the details to get started
            </p>
            <RegisterForm setMode={setMode} />
          </div>
        </div>

        {/* LOGIN SECTION */}
        <div
          className={`w-full md:w-2/3 flex items-center justify-center p-8 md:p-16 transition-all duration-700 ${
            !isLogin
              ? "opacity-0 invisible scale-95 md:-translate-x-10 absolute md:relative"
              : "opacity-100 visible scale-100 translate-x-0 relative"
          }`}
        >
          <div className="w-full max-w-md">
            <span className="text-[#FA8112] font-black text-[10px] uppercase tracking-[0.3em] mb-2 md:mb-4 block">
              Secured Entry
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-[#222222] mb-3 md:mb-4 tracking-tighter leading-none">
              Sign In
            </h3>
            <p className="text-[#222222]/40 font-medium text-base md:text-lg mb-6 md:mb-10">
              MERN Secured Authentication
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
