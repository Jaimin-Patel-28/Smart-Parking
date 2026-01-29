import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Zap, ShieldCheck } from "lucide-react";

const AuthCard = ({ isLogin, setIsLogin }) => {
  return (
    <div className="relative w-full min-h-150 bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex transition-all duration-700">
      {/* 1. THE SLIDING OVERLAY (Moving Panel) */}
      <div
        className={`absolute top-0 h-full w-1/3 z-30 transition-all duration-700 ease-in-out p-12 flex flex-col justify-between shadow-2xl ${
          isLogin
            ? "left-0 bg-linear-to-br from-blue-600 to-cyan-600"
            : "left-2/3 bg-linear-to-br from-purple-600 to-pink-600"
        }`}
      >
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8 border border-white/20">
            <Zap className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">
            {isLogin
              ? "Welcome Back to \nAnand Hub."
              : "Join the \nDigital Grid."}
          </h2>
          <p className="mt-4 text-white/70 text-sm font-medium leading-relaxed">
            {isLogin
              ? "To keep connected with us please login with your personal info"
              : "Enter your personal details and start journey with us"}
          </p>
        </div>

        <div className="relative z-10">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full py-4 bg-white/10 backdrop-blur-xl text-white font-black rounded-2xl hover:bg-white hover:text-slate-900 transition-all text-[10px] uppercase tracking-[0.2em] border border-white/20"
          >
            {isLogin ? "Create Account" : "Sign In Now"}
          </button>
        </div>
      </div>

      {/* 2. FORM SLOTS */}
      <div className="flex w-full">
        {/* Register Section (Left Side) */}
        <div
          className={`w-2/3 flex items-center justify-center p-12 transition-all duration-700 ${isLogin ? "opacity-0 invisible scale-95" : "opacity-100 visible scale-100"}`}
        >
          <div className="w-full max-w-md">
            <h3 className="text-4xl font-black text-white mb-2">
              Create Account
            </h3>
            <p className="text-slate-500 text-sm mb-8">
              Fill the details to get started
            </p>
            <RegisterForm />
          </div>
        </div>

        {/* Login Section (Right Side) */}
        <div
          className={`w-2/3 flex items-center justify-center p-12 transition-all duration-700 ${!isLogin ? "opacity-0 invisible scale-95" : "opacity-100 visible scale-100"}`}
        >
          <div className="w-full max-w-md">
            <h3 className="text-4xl font-black text-white mb-2">Sign In</h3>
            <p className="text-slate-500 text-sm mb-8">
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
