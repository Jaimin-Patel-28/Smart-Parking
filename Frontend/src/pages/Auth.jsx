import { useState } from "react";
import { Sparkles, CarFront } from "lucide-react";
import AuthCard from "../components/auth/AuthCard";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden px-6">
      
      {/* 1. NEON BEAM BACKGROUND (Consistent with About Page) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-cyan-400/50 via-cyan-400/10 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)] rotate-10 origin-top"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-blue-400/50 via-blue-400/10 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.3)] -rotate-10 origin-top"></div>
      </div>

      {/* 2. DYNAMIC "SMART ROAD" TRACK */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-slate-900/50 border-t border-slate-800 backdrop-blur-sm z-0">
        <div className="container mx-auto h-full relative">
          {/* Animated Car - Moving position based on isLogin state */}
          <div 
            className={`absolute bottom-8 transition-all duration-1000 ease-in-out flex flex-col items-center group ${
              isLogin ? "left-[10%] md:left-[20%]" : "left-[70%] md:left-[75%]"
            }`}
          >
            <div className="bg-cyan-400/10 p-3 rounded-2xl border border-cyan-400/20 mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/10">
              <CarFront className="text-cyan-400" size={32} />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              {isLogin ? "Entering Hub" : "New Registration"}
            </span>
          </div>
          
          {/* Road Markings */}
          <div className="absolute top-1/2 left-0 w-full h-px border-t border-dashed border-slate-700/50"></div>
        </div>
      </div>

      {/* 3. AUTH CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <Sparkles size={12} className="animate-pulse" />
            Secure Authentication
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            {isLogin ? "Welcome" : "Get Started"} <span className="text-cyan-400">Back.</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Manage your parking slots in <span className="text-slate-300">Anand Smart City.</span>
          </p>
        </div>

        {/* AUTH CARD COMPONENT */}
        <AuthCard isLogin={isLogin} setIsLogin={setIsLogin} />
        
        {/* Footer Credit */}
        <p className="text-center mt-8 text-slate-600 text-[9px] font-bold uppercase tracking-[0.4em]">
          Powered by MERN &bull; Gujarat Hub &bull; 2026
        </p>
      </div>
      
    </div>
  );
};

export default Auth;