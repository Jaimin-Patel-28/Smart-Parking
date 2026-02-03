import React from "react";
import {
  Camera,
  ShieldCheck,
  Calendar,
  MapPin,
  Share2,
  Edit3,
  Sparkles,
} from "lucide-react";

const ProfileHeader = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 border-b border-white/5 pb-12">
      {/* 1. CINEMATIC BACKGROUND: Animated mesh gradients for "Best Ever" UI */}
      <div className="absolute inset-0 h-48 md:h-64 bg-linear-to-r from-blue-600/20 via-purple-600/10 to-slate-950">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent" />
      </div>

      {/* 2. MAIN CONTAINER: Increased padding for 110% zoom safety */}
      <div className="relative max-w-400 mx-auto px-6 md:px-12 pt-24 md:pt-32">
        <div className="flex flex-col md:flex-row items-end gap-8 md:gap-10">
          {/* AVATAR SYSTEM: With interactive hover and status ring */}
          <div className="relative group shrink-0">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-3xl p-1 bg-linear-to-br from-blue-500 to-purple-500 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-slate-900 border-4 border-slate-950">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jaimin"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <button className="absolute bottom-2 right-2 p-2.5 bg-blue-600 rounded-xl text-white shadow-xl hover:bg-blue-500 transition-all active:scale-95 border border-white/10">
              <Camera size={18} />
            </button>
          </div>

          {/* USER INFO: Content-rich typography */}
          <div className="flex-1 space-y-4 pb-2">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                Jaimin Patel
              </h1>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
                <ShieldCheck size={14} className="fill-emerald-400/20" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Verified User
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Anand, Gujarat
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                <Calendar size={14} className="text-purple-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Joined Jan 2025
                </span>
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[11px] font-black text-white uppercase tracking-wider">
                  MERN Intern
                </span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS: Responsive flex-row */}
          <div className="flex items-center gap-3 w-full md:w-auto pb-2">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              <Share2 size={16} />
              Share
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl shadow-blue-600/20 transition-all active:scale-95">
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* PROFILE COMPLETION: Floating bar for interactive UI */}
        <div className="mt-12 max-w-2xl bg-white/2 border border-white/5 rounded-3xl p-6 shadow-inner backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                Profile Strength
              </span>
            </div>
            <span className="text-xs font-black text-blue-400">
              85% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-px">
            <div
              className="h-full rounded-full bg-linear-to-r from-blue-600 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-1000"
              style={{ width: "85%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
