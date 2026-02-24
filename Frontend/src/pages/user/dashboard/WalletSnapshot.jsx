import React from "react";
import { Wallet, Plus, History } from "lucide-react";

const WalletSnapshot = ({ wallet }) => {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Wallet size={20} className="text-[#FA8112]" />
        <h3 className="text-lg font-black uppercase tracking-tight">Wallet</h3>
      </div>

      <div className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-4">
        <p className="text-[10px] uppercase text-[#FAF3E1]/30">
          Available Balance
        </p>
        <h2 className="text-3xl font-black text-[#FA8112]">
          ₹{wallet.balance.toFixed(2)}
        </h2>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-[#FAF3E1] text-[#222222] py-3 rounded-xl font-black text-[10px] uppercase">
          <Plus size={14} /> Add
        </button>

        <button className="flex-1 bg-[#222222] border border-[#F5E7C6]/10 py-3 rounded-xl">
          <History size={14} />
        </button>
      </div>
    </section>
  );
};

export default WalletSnapshot;
