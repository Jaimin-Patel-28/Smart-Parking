import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { transactionService } from "../Services/transactionService";
import {
  ChevronLeft,
  Receipt,
  Printer,
  MapPin,
  Calendar,
  CreditCard,
  User,
  Clock,
  Fingerprint,
  Activity,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tx, setTx] = useState(null);
  const [loading, setLoading] = useState(true);

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  useEffect(() => {
    transactionService
      .getTransactionById(id)
      .then((res) => setTx(res.data.data))
      .catch((err) => console.error("Registry Sync Err:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Activity
            size={40}
            className="animate-spin text-[#FA8112]/40"
            strokeWidth={1}
          />
          <div className="absolute inset-0 border border-[#FA8112]/10 rounded-full animate-ping" />
        </div>
        <p className="font-bold text-[#FAF3E1]/10 uppercase tracking-[0.5em] text-[9px]">
          Decrypting Ledger Sequence...
        </p>
      </div>
    );

  if (!tx)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="p-6 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-500">
          <ShieldCheck size={48} strokeWidth={1} />
        </div>
        <h2 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight">
          Sequence <span className="text-rose-500">Not Identified</span>
        </h2>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. COMMAND HEADER */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-3 text-[#FAF3E1]/20 hover:text-[#FA8112] font-bold uppercase tracking-[0.3em] text-[10px] transition-all"
      >
        <ChevronLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Transaction Ledger
      </button>

      <div className="bg-[#FAF3E1]/[0.01] rounded-xl border border-[#F5E7C6]/5 shadow-2xl overflow-hidden relative">
        {/* 2. MANIFEST HEADER */}
        <div className="p-10 md:p-12 bg-[#FAF3E1]/[0.01] border-b border-[#F5E7C6]/5 text-center relative group">
          <div className="absolute -top-10 -right-10 text-[#FA8112]/[0.02] group-hover:text-[#FA8112]/[0.04] transition-colors duration-700">
            <Fingerprint size={200} strokeWidth={1} />
          </div>

          <div className="h-20 w-20 bg-[#FA8112]/5 border border-[#FA8112]/20 rounded-xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(250,129,18,0.1)]">
            <Receipt size={36} className="text-[#FA8112]" strokeWidth={1.5} />
          </div>

          <h2 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Settlement <span className="text-[#FA8112]">Manifest</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-8 bg-[#F5E7C6]/10" />
            <p className="text-[10px] font-mono font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
              REF_ID: {tx._id.toUpperCase()}
            </p>
            <span className="h-px w-8 bg-[#F5E7C6]/10" />
          </div>
        </div>

        {/* 3. ASSET VALUATION */}
        <div className="p-12 text-center bg-[#1a1a1a]/30">
          <p className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] mb-6">
            Net Settlement Asset
          </p>
          <h1
            className={`text-7xl font-bold tracking-tighter tabular-nums ${tx.type === "credit" ? "text-emerald-400" : "text-[#FAF3E1]"}`}
          >
            {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString()}
          </h1>

          <div className="mt-8 inline-flex items-center gap-3 px-6 py-2 rounded-lg bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5">
            <div className="relative flex h-2 w-2">
              {tx.status === "success" && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${tx.status === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
              />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/40">
              LOG_STATUS:{" "}
              <span
                className={
                  tx.status === "success"
                    ? "text-emerald-400/80"
                    : "text-rose-500/80"
                }
              >
                {tx.status.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        {/* 4. TELEMETRY GRID */}
        <div className="p-10 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
            <div className="space-y-4">
              <label className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em] flex items-center gap-2">
                <User size={12} className="text-[#FA8112]/60" /> Registry
                Subject
              </label>
              <div className="space-y-1">
                <p className="font-bold text-[#FAF3E1] text-lg tracking-tight">
                  {tx.user?.fullName || "SYSTEM_DAEMON"}
                </p>
                <p className="text-[11px] font-mono text-[#FAF3E1]/30 italic uppercase">
                  {tx.user?.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em] flex items-center gap-2">
                <Clock size={12} className="text-[#FA8112]/60" /> Sequence Stamp
              </label>
              <div className="space-y-1">
                <p className="font-bold text-[#FAF3E1] text-lg tracking-tight tabular-nums">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>
                <p className="text-[11px] font-mono text-[#FAF3E1]/30 uppercase">
                  {new Date(tx.createdAt).toLocaleTimeString([], {
                    hour12: false,
                  })}{" "}
                  UTC_SEQUENCE
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F5E7C6]/5">
            <div className="p-6 bg-[#1a1a1a] rounded-lg border border-[#F5E7C6]/5 flex items-center gap-5">
              <div className="p-3 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded text-[#FA8112]">
                <CreditCard size={18} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                  Description
                </p>
                <p className="text-[13px] font-bold text-[#FAF3E1]/80 uppercase">
                  {tx.description || "Automated_Billing_Protocol"}
                </p>
              </div>
            </div>

            {tx.booking && (
              <div className="p-6 bg-[#1a1a1a] rounded-lg border border-[#F5E7C6]/5 flex items-center gap-5">
                <div className="p-3 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded text-[#FA8112]">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                    Asset Location
                  </p>
                  <p className="text-[13px] font-bold text-[#FAF3E1]/80 uppercase">
                    {tx.booking.parking?.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5. OPERATIONAL FOOTER */}
        <div className="p-10 bg-[#FAF3E1]/[0.01] border-t border-[#F5E7C6]/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <ShieldCheck size={14} className="text-[#FA8112]/40" />
            <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.5em]">
              Authenticated_Checksum_Verified
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-3 px-10 py-3 bg-[#FA8112] text-[#222222] rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#FAF3E1] transition-all active:scale-[0.98] shadow-2xl shadow-[#FA8112]/10"
          >
            <Terminal size={14} strokeWidth={2.5} /> Output_Manifest
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
