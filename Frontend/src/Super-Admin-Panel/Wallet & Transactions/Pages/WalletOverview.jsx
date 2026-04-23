import React, { useState } from "react";
import toast from "react-hot-toast";
import { useWalletSummary } from "../Hooks/useWalletSummary";
import { useRevenueCharts } from "../Hooks/useRevenueCharts";
import { transactionService } from "../Services/transactionService";
import WalletStatsGrid from "../Components/WalletStatsGrid";
import RevenueChart from "../Components/RevenueChart";
import TopUsersList from "../Components/TopUsersList";
import {
  RefreshCw,
  Download,
  TrendingUp,
  PieChart,
  Activity,
  Map,
  Globe,
  Calendar,
} from "lucide-react";

const WalletOverview = () => {
  const { stats, topUsers, parkingRevenue, loading, refresh } =
    useWalletSummary();
  const {
    chartData,
    viewType,
    setViewType,
    loading: chartLoading,
  } = useRevenueCharts();
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [exporting, setExporting] = useState(false);

  const fetchTransactionsForDateRange = async () => {
    const start = startDate ? new Date(`${startDate}T00:00:00.000`) : null;
    const end = endDate ? new Date(`${endDate}T23:59:59.999`) : null;

    if (!start || !end || start > end) {
      toast.error("Period Start cannot be later than Period End");
      return [];
    }

    const limit = 200;
    let page = 1;
    let totalPages = 1;
    const allTransactions = [];

    while (page <= totalPages) {
      const res = await transactionService.getTransactions({
        page,
        limit,
        startDate,
        endDate,
      });

      const data = res?.data?.data || [];
      allTransactions.push(...data);
      totalPages = Number(res?.data?.totalPages || 1);
      page += 1;
    }

    return allTransactions;
  };

  const handleExportTransactions = async () => {
    try {
      setExporting(true);

      const selectedTransactions = await fetchTransactionsForDateRange();
      if (!selectedTransactions.length) {
        toast.error("No transactions found for selected duration");
        return;
      }

      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("WALLET HUB TRANSACTION MANIFEST", 14, 16);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Period: ${startDate} to ${endDate}`, 14, 23);
      doc.text(`Records: ${selectedTransactions.length}`, 14, 29);

      let y = 38;
      selectedTransactions.forEach((tx, index) => {
        if (y > 280) {
          doc.addPage();
          y = 14;
        }

        const createdAt = tx?.createdAt
          ? new Date(tx.createdAt).toLocaleString("en-IN")
          : "N/A";
        const type = (tx?.type || "na").toUpperCase();
        const status = (tx?.status || "na").toUpperCase();
        const amount = Number(tx?.amount || 0).toLocaleString("en-IN");
        const userLabel = tx?.user?.fullName || tx?.user?.email || "Unknown";

        doc.text(
          `${index + 1}. ${createdAt} | ${type} | ${status} | INR ${amount} | ${userLabel}`,
          14,
          y,
        );
        y += 6;
      });

      doc.save(`wallet-hub-transactions-${startDate}-to-${endDate}.pdf`);
      toast.success("Transaction manifest exported");
    } catch (error) {
      toast.error("Failed to export transactions");
    } finally {
      setExporting(false);
    }
  };

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="max-w-400 mx-auto space-y-12 pb-16 animate-in fade-in duration-700">
      {/* 1. CONTROL HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Activity size={14} className="animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Audit Protocol Alpha
            </span>
          </div>
          <h1 className="text-4xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Financial <span className="text-[#FA8112]">Intelligence</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest leading-relaxed">
            Real-time monitoring: Revenue sequence • Refund cycles • Node
            integrity
          </p>
        </div>

        <button
          onClick={refresh}
          className="flex items-center gap-3 px-8 py-3 bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] text-[#FAF3E1]/60 hover:bg-[#FA8112] hover:text-[#222222] hover:border-[#FA8112] transition-all active:scale-95 group shadow-2xl"
        >
          <RefreshCw
            size={16}
            strokeWidth={2.5}
            className={`transition-colors ${loading ? "animate-spin text-[#FA8112]" : "text-[#FA8112] group-hover:text-[#222222]"}`}
          />
          Synchronize_Registry
        </button>
      </div>

      <div className="bg-[#FAF3E1]/1 p-6 rounded-xl border border-[#F5E7C6]/5 shadow-2xl">
        <div className="flex items-center gap-3 mb-5">
          <Calendar size={14} className="text-[#FA8112]/50" />
          <p className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.35em]">
            Export Selected Transactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#FA8112]/70 ml-1">
              Period Start
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/10 rounded-lg px-4 py-2.5 text-xs font-bold text-[#FAF3E1] outline-none focus:border-[#FA8112]/50 scheme-dark"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#FA8112]/70 ml-1">
              Period End
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/10 rounded-lg px-4 py-2.5 text-xs font-bold text-[#FAF3E1] outline-none focus:border-[#FA8112]/50 scheme-dark"
            />
          </div>

          <button
            type="button"
            onClick={handleExportTransactions}
            disabled={exporting}
            className="h-10.5 flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#FAF3E1] transition-all disabled:opacity-40 active:scale-[0.98]"
          >
            <Download size={14} />
            {exporting ? "Exporting..." : "Export Manifest"}
          </button>
        </div>
      </div>

      {/* 2. CORE TELEMETRY GRID */}
      <WalletStatsGrid stats={stats} loading={loading} />

      {/* 3. DATA VISUALIZATION LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart
            data={chartData}
            viewType={viewType}
            setViewType={setViewType}
            loading={chartLoading}
          />
        </div>
        <div className="lg:col-span-1">
          <TopUsersList users={topUsers} loading={loading} />
        </div>
      </div>

      {/* 4. GEOGRAPHICAL REVENUE ANALYTICS */}
      <div className="bg-[#FAF3E1]/1 p-8 md:p-10 rounded-xl border border-[#F5E7C6]/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FA8112]/2 blur-[120px] pointer-events-none" />

        <div className="mb-10 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FA8112]/5 rounded-lg border border-[#FA8112]/20 text-[#FA8112]">
              <Globe size={20} strokeWidth={1.5} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.2em]">
                Revenue By <span className="text-[#FA8112]">Geography</span>
              </h3>
              <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
                Spatial Performance Distribution
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="text-[9px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-[0.4em]">
              Unit_Sector_Logic_V4
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {parkingRevenue.map((item, idx) => {
            const contribution = Math.round(
              (item.totalRevenue / (stats?.totalRevenue || 1)) * 100,
            );
            return (
              <div
                key={idx}
                className="p-6 bg-[#1a1a1a] rounded-lg border border-[#F5E7C6]/5 flex flex-col hover:border-[#FA8112]/30 transition-all duration-500 group/card"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest truncate group-hover/card:text-[#FA8112] transition-colors">
                    {item.parkingName}
                  </p>
                  <span className="text-[9px] font-mono font-bold text-[#FAF3E1]/10">
                    SEC_{idx.toString().padStart(2, "0")}
                  </span>
                </div>

                <p className="text-2xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter">
                  ₹{item.totalRevenue.toLocaleString()}
                </p>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                      Settlement
                    </span>
                    <span className="text-[10px] font-bold text-[#FA8112] tabular-nums">
                      {contribution}%
                    </span>
                  </div>
                  <div className="w-full bg-[#FAF3E1]/5 h-1 rounded-full overflow-hidden border border-[#F5E7C6]/5">
                    <div
                      className="bg-[#FA8112] h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_#FA8112]"
                      style={{ width: `${contribution}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {parkingRevenue.length === 0 && !loading && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-10">
              <Map size={48} strokeWidth={1} />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] mt-4">
                Void Sequence: Zero Regional Signal
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 5. SYSTEM FOOTNOTE */}
      <div className="flex flex-col items-center gap-4 pt-8 opacity-20">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#FAF3E1]" />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Financial Audit Manifest • End-to-End Encryption Secured
        </p>
      </div>
    </div>
  );
};

export default WalletOverview;
