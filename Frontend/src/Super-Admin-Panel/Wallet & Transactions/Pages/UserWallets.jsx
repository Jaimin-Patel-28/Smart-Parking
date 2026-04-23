import { walletService } from "../Services/walletService";
import UserWalletTable from "../Components/UserWalletTable";
import {
  Wallet,
  Search,
  ArrowUpDown,
  Database,
  Activity,
  Terminal,
} from "lucide-react";
import { useState, useEffect } from "react";

const UserWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const res = await walletService.getAllUserWallets();
      setWallets(res.data.data);
    } catch (err) {
      console.error("Registry Sync Failure:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const filteredWallets = wallets.filter(
    (w) =>
      w.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      w.user?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. REGISTRY HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Database size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Asset Management
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Wallet <span className="text-[#FA8112]">Directory</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest leading-relaxed">
            Real-time monitoring of individual account balances and credit
            sequences across the network.
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-lg">
          <div className="relative h-1.5 w-1.5">
            <span className="animate-ping absolute inset-0 rounded-full bg-[#FA8112] opacity-75" />
            <span className="relative block h-1.5 w-1.5 rounded-full bg-[#FA8112]" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FA8112]">
            Registry_Live
          </span>
        </div>
      </div>

      {/* 2. QUERY CONSOLE */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch relative z-10">
        <div className="relative flex-1 group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors duration-500">
            <Search size={18} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="SEARCH_REGISTRY_IDENTIFIER (Name or Email)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-8 py-4 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl text-sm font-medium text-[#FAF3E1] placeholder:text-[#FAF3E1]/5 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] transition-all uppercase tracking-wider"
          />
        </div>

        {/* Tactical Sort Badge */}
        <div className="bg-[#1a1a1a] px-8 py-4 rounded-xl border border-[#F5E7C6]/5 text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] flex items-center gap-4 shadow-2xl shrink-0 group hover:border-[#FA8112]/20 transition-all duration-500">
          <ArrowUpDown
            size={14}
            className="text-[#FA8112]/40 group-hover:text-[#FA8112] transition-colors"
          />
          <span className="group-hover:text-[#FAF3E1]/40 transition-colors">
            Sequence: Balance_Descending
          </span>
        </div>
      </div>

      {/* 3. DATA VIEWPORT */}
      <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl overflow-hidden shadow-2xl min-h-[500px]">
        <UserWalletTable wallets={filteredWallets} loading={loading} />
      </div>

      {/* 4. SYSTEM FOOTNOTE */}
      <div className="flex flex-col items-center gap-4 pt-4 opacity-20">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <Terminal size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Centralized Asset Ledger • Site_Registry_Sync_Final
        </p>
      </div>
    </div>
  );
};

export default UserWallets;
