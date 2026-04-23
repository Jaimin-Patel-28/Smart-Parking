import React from "react";
import {
  ArrowRight,
  UserCircle,
  Activity,
  Fingerprint,
  Database,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserWalletTable = ({ wallets, loading }) => {
  const navigate = useNavigate();

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  if (loading)
    return (
      <div className="h-[400px] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Activity
            size={32}
            className="animate-spin text-[#FA8112]/40"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 rounded-full border-2 border-[#FA8112]/5 animate-ping" />
        </div>
        <p className="font-bold text-[#FAF3E1]/10 uppercase tracking-[0.5em] text-[9px]">
          Synchronizing Ledger Balances...
        </p>
      </div>
    );

  return (
    <div className="overflow-x-auto custom-scrollbar bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-1.5 px-1">
        <thead>
          <tr className="text-[#FAF3E1]/20 text-[9px] uppercase font-bold tracking-[0.4em]">
            <th className="py-5 px-8">Entity Identity</th>
            <th className="py-5 px-6">Available Credit</th>
            <th className="py-5 px-6">Last Sync Sequence</th>
            <th className="py-5 px-8 text-right">Operational Audit</th>
          </tr>
        </thead>
        <tbody className="space-y-1">
          {wallets.map((item) => (
            <tr
              key={item._id}
              className="group bg-[#FAF3E1]/[0.01] hover:bg-[#FAF3E1]/[0.03] transition-all duration-500 border-y border-[#F5E7C6]/5"
            >
              {/* 1. Entity Identity Section */}
              <td className="py-6 px-8 rounded-l-lg border-l border-[#F5E7C6]/5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 flex items-center justify-center text-[#FAF3E1]/20 group-hover:text-[#FA8112] group-hover:border-[#FA8112]/20 transition-all duration-500">
                    <UserCircle size={18} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[#FAF3E1] text-sm tracking-tight leading-none group-hover:text-[#FA8112] transition-colors">
                      {item.user?.fullName || "System_Node_Unset"}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-40">
                      <Fingerprint size={10} className="text-[#FA8112]" />
                      <p className="text-[10px] font-mono tracking-widest uppercase truncate max-w-[180px]">
                        {item.user?.email || "REF_NULL"}
                      </p>
                    </div>
                  </div>
                </div>
              </td>

              {/* 2. Balance Section with Signal Pulse */}
              <td className="py-6 px-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-1.5 w-1.5">
                    {item.balance > 0 && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-40" />
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                        item.balance > 0 ? "bg-[#FA8112]" : "bg-rose-500"
                      }`}
                    />
                  </div>
                  <p className="font-bold text-base tabular-nums tracking-tighter text-[#FAF3E1]">
                    ₹{item.balance.toLocaleString()}
                  </p>
                </div>
              </td>

              {/* 3. Temporal Sequence */}
              <td className="py-6 px-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-[11px] font-bold text-[#FAF3E1]/60 tabular-nums">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                  <p className="text-[9px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-[0.2em]">
                    Verified_Registry_Stamp
                  </p>
                </div>
              </td>

              {/* 4. Action Console */}
              <td className="py-6 px-8 text-right rounded-r-lg border-r border-[#F5E7C6]/5">
                <button
                  onClick={() =>
                    navigate(`/super-admin/users/${item.user?._id}`)
                  }
                  className="inline-flex items-center gap-2.5 px-5 py-2 bg-[#FAF3E1]/[0.02] text-[#FAF3E1]/40 text-[10px] font-bold uppercase tracking-widest rounded-md border border-[#F5E7C6]/5 hover:bg-[#FA8112] hover:text-[#222222] hover:border-[#FA8112] transition-all active:scale-[0.98] group/btn shadow-xl"
                >
                  Inspect_Node
                  <ArrowRight
                    size={12}
                    strokeWidth={2.5}
                    className="group-hover/btn:translate-x-0.5 transition-transform"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserWalletTable;
