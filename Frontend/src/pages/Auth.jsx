import React, { useState } from "react";
import AuthCard from "../components/auth/AuthCard";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Neon Beams (Consistent with Hero) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-cyan-400 via-cyan-400/20 to-transparent rotate-12 origin-top shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-blue-400 via-blue-400/20 to-transparent -rotate-12 origin-top shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};

export default Auth;
