import React, { useEffect, useState } from "react";
import AuthCard from "../components/auth/AuthCard";

const Auth = () => {
  // 🔐 Single source of truth
  // RULE 1: Always start from Register
  const [mode, setMode] = useState("register");

  useEffect(() => {
    setMode("register");
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF3E1] flex items-center justify-center overflow-hidden px-4 py-12 selection:bg-[#FA8112] selection:text-[#FAF3E1]">
      {/* 1. HUMANIZED BACKGROUND: Subtle paper texture and soft organic blurs */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      {/* Soft Beige and Orange blurs for a gentle, "hand-painted" depth */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-full bg-[#F5E7C6]/60 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[50%] h-full bg-[#FA8112]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-5xl animate-fade-in">
        {/* 🔁 mode + setMode pass to your specialized AuthCard */}
        <AuthCard mode={mode} setMode={setMode} />

        {/* SUBTLE BRAND FOOTER: Clean and Professional */}
        <div className="mt-8 text-center">
          <p className="text-[#222222]/20 text-[10px] font-black uppercase tracking-[0.4em]">
            SmartPark Infrastructure &bull; Gujarat &bull; 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
