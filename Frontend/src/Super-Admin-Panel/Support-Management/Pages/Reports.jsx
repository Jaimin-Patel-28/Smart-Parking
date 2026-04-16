import React from "react";
import { BarChart3, FileText } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-6 max-w-5xl animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter">
          Reports <span className="text-[#FA8112]">Center</span>
        </h1>
        <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
          Summary exports and operational analytics
        </p>
      </div>

      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-8">
        <div className="flex items-center gap-3 mb-3 text-[#FA8112]">
          <BarChart3 size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">
            Module Ready
          </h2>
        </div>
        <p className="text-sm text-[#FAF3E1]/70 leading-relaxed">
          Reports route is now live. Connect this page to backend summary/export
          endpoints when report templates are finalized.
        </p>

        <button className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FA8112] text-[#222222] font-black text-xs uppercase tracking-widest hover:bg-[#FAF3E1] transition-all">
          <FileText size={16} /> Generate Snapshot
        </button>
      </div>
    </div>
  );
};

export default Reports;
