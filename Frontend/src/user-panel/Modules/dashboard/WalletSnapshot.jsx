import React from "react";
import {
  Wallet,
  Plus,
  ShieldCheck,
  History,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";

const WalletSnapshot = () => {
  return (
    <div className="relative overflow-hidden bg-[#222222] border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 transition-all duration-500 hover:border-[#FA8112]/30 group">
      {/* --- DECORATIVE ACCENT --- */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FA8112]/5 blur-[50px] -z-10 group-hover:bg-[#FA8112]/10 transition-colors" />

      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-[#FA8112]/10 border border-[#FA8112]/20 rounded-2xl text-[#FA8112]">
            <Wallet size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FAF3E1]/30">
              Secure Credits
            </p>
            <h3 className="text-lg font-black text-[#FAF3E1] leading-none">
              SmartWallet
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <ShieldCheck size={10} className="text-emerald-500" />
            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">
              Node Verified
            </span>
          </div>
        </div>
      </div>

      {/* --- MAIN BALANCE --- */}
      <div className="mb-8 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/20 font-bold ml-1">
          Available Balance
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-[#FA8112] text-xl font-bold">₹</span>
          <h2 className="text-5xl font-black tracking-tighter text-[#FAF3E1]">
            450.00
          </h2>
        </div>
      </div>

      {/* --- TELEMETRY ROW --- */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-[#111111]/40 border border-[#F5E7C6]/5 p-3 rounded-2xl space-y-1">
          <div className="flex items-center gap-1 text-red-400">
            <TrendingDown size={10} />
            <p className="text-[9px] uppercase tracking-widest font-bold">
              Last Outflow
            </p>
          </div>
          <p className="text-sm font-mono font-bold text-[#FAF3E1]">-₹45.00</p>
        </div>

        <div className="bg-[#111111]/40 border border-[#F5E7C6]/5 p-3 rounded-2xl space-y-1">
          <div className="flex items-center gap-1 text-[#FA8112]">
            <ArrowUpRight size={10} />
            <p className="text-[9px] uppercase tracking-widest font-bold">
              Total Usage
            </p>
          </div>
          <p className="text-sm font-mono font-bold text-[#FAF3E1]">₹1,240</p>
        </div>
      </div>

      {/* --- ACTIONS --- */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#FA8112] hover:bg-[#FA8112]/90 text-[#222222] py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(250,129,18,0.2)] active:scale-95">
          <Plus size={16} strokeWidth={3} /> Refill
        </button>
        <button className="w-12 flex items-center justify-center bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-xl text-[#FAF3E1]/40 hover:text-[#FA8112] hover:bg-[#FA8112]/10 transition-all">
          <History size={18} />
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FAF3E1]/10">
          SmartPark Financial Node
        </span>
      </div>
    </div>
  );
};

export default WalletSnapshot;
