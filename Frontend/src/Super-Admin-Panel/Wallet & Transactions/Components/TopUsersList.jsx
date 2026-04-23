import React from "react";
import { Trophy, Medal, Star, Fingerprint, Activity } from "lucide-react";

const TopUsersList = ({ users, loading }) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  const getIcon = (index) => {
    // Ranking signals tuned for industrial precision
    if (index === 0)
      return (
        <Trophy
          className="text-[#FA8112] drop-shadow-[0_0_10px_rgba(250,129,18,0.4)]"
          size={18}
          strokeWidth={2.5}
        />
      );
    if (index === 1) return <Medal className="text-slate-400" size={18} />;
    if (index === 2) return <Medal className="text-amber-800" size={18} />;
    return <Star className="text-[#FAF3E1]/10" size={16} />;
  };

  return (
    <div className="bg-[#FAF3E1]/[0.01] p-8 rounded-xl border border-[#F5E7C6]/5 shadow-2xl h-full relative overflow-hidden group">
      {/* 1. ARCHITECTURAL DECORATION */}
      <div className="absolute -bottom-12 -left-12 text-[#FA8112]/[0.02] group-hover:text-[#FA8112]/[0.04] transition-colors duration-700">
        <Fingerprint size={200} strokeWidth={1} />
      </div>

      <div className="mb-10 relative z-10 space-y-1">
        <div className="flex items-center gap-2 text-[#FA8112]">
          <Activity size={14} />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            High-Value Registry
          </span>
        </div>
        <h3 className="text-2xl font-bold text-[#FAF3E1] tracking-tight uppercase">
          Top <span className="text-[#FA8112]">Spenders</span>
        </h3>
      </div>

      {/* 2. LEADERBOARD NODES */}
      <div className="space-y-3 relative z-10">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-[#FAF3E1]/[0.02] animate-pulse rounded-lg border border-[#F5E7C6]/5"
            />
          ))
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#F5E7C6]/5 hover:border-[#FA8112]/30 transition-all duration-500 group/item"
            >
              <div className="flex items-center gap-4">
                {/* Ranking Slot */}
                <div className="bg-[#222222] h-10 w-10 flex items-center justify-center rounded border border-[#F5E7C6]/5 shadow-inner group-hover/item:border-[#FA8112]/20 transition-colors">
                  {getIcon(index)}
                </div>

                <div className="space-y-0.5">
                  <p className="font-bold text-[#FAF3E1] text-[13px] tracking-tight leading-none group-hover/item:text-[#FA8112] transition-colors">
                    {user.fullName}
                  </p>
                  <p className="text-[10px] font-mono text-[#FAF3E1]/20 uppercase tracking-tighter truncate max-w-[150px]">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <p className="text-[#FA8112] font-bold text-[15px] tracking-tighter tabular-nums">
                  ₹{user.totalSpent.toLocaleString()}
                </p>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/40" />
                  <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                    Settled_Volume
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center opacity-10">
            <Activity size={32} />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] mt-4">
              No Sequence Detected
            </p>
          </div>
        )}
      </div>

      {/* 3. SYSTEM FOOTNOTE */}
      <div className="mt-8 pt-6 border-t border-[#F5E7C6]/5 flex justify-center opacity-10">
        <p className="text-[8px] font-mono font-bold uppercase tracking-[0.5em]">
          Auth_Node_Leaderboard_V.01
        </p>
      </div>
    </div>
  );
};

export default TopUsersList;
