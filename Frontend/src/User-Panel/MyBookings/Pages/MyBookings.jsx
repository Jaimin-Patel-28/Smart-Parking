import React, { useState } from "react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import { useMyBookings } from "../Hooks/useMyBookings";
import Tabs from "../Components/Tabs";
import BookingCard from "../Components/BookingCard";
import {
  Hash,
  RefreshCw,
  Ticket,
  ChevronLeft,
  Terminal,
  Activity,
  Database,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    currentBookings,
    upcomingBookings,
    historyBookings,
    loadingCurrent,
    loadingUpcoming,
    loadingHistory,
    extending,
    error,
    fetchCurrent,
    fetchUpcoming,
    fetchHistory,
    extendBooking,
    editBooking,
    cancelBooking,
  } = useMyBookings();

  const [activeTab, setActiveTab] = useState("current");

  const getBookingsForTab = () => {
    switch (activeTab.toLowerCase()) {
      case "current":
        return {
          bookings: currentBookings,
          loading: loadingCurrent,
          fetchFn: fetchCurrent,
        };
      case "upcoming":
        return {
          bookings: upcomingBookings,
          loading: loadingUpcoming,
          fetchFn: fetchUpcoming,
        };
      case "history":
        return {
          bookings: historyBookings,
          loading: loadingHistory,
          fetchFn: fetchHistory,
        };
      default:
        return { bookings: [], loading: false, fetchFn: () => {} };
    }
  };

  const { bookings, loading, fetchFn } = getBookingsForTab();

  const handleRefresh = () => fetchFn();

  const EmptyState = ({ type }) => (
    <div className="flex flex-col items-center justify-center py-32 px-6 bg-[#FAF3E1]/[0.01] border border-dashed border-[#F5E7C6]/5 rounded-xl text-center max-w-4xl mx-auto">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#FA8112]/5 blur-2xl rounded-full" />
        <div className="relative bg-[#FAF3E1]/[0.02] p-8 rounded-xl border border-[#F5E7C6]/5 text-[#FAF3E1]/10">
          <Database size={48} strokeWidth={1} />
        </div>
      </div>
      <h3 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight mb-2">
        {type === "current" ? "Zero_Active_Sequences" : "Registry_Empty"}
      </h3>
      <p className="text-[#FAF3E1]/20 text-[10px] font-bold uppercase tracking-[0.2em] max-w-xs mx-auto mb-10 leading-relaxed">
        {type === "current"
          ? "No real-time spatial allocations identified in the current cycle."
          : "System records indicate no historical entries for this sector."}
      </p>
      <button
        onClick={() => navigate("/user/find-parking")}
        className="bg-[#FA8112] text-[#222222] font-bold px-10 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em] hover:bg-[#FAF3E1] transition-all shadow-2xl shadow-[#FA8112]/5 active:scale-95"
      >
        Initialize_New_Booking
      </button>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. REGISTRY HEADER */}
      <header className="px-1 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all group"
            >
              <ChevronLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#FA8112]">
                <Terminal size={14} />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
                  Personal Registry
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#FAF3E1] tracking-tight uppercase">
                My <span className="text-[#FA8112]">Passes</span>
              </h1>
            </div>
          </div>
          <p className="text-[#FAF3E1]/20 font-bold uppercase text-[9px] tracking-[0.3em] ml-12">
            Node: {user?.email?.split("@")[0].toUpperCase()} • Status: Synced
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/user/booking-history")}
            className="flex items-center gap-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 px-6 py-3 rounded-lg text-[#FAF3E1]/40 font-bold text-[10px] uppercase tracking-widest hover:border-[#FA8112]/40 hover:text-[#FA8112] transition-all group"
          >
            <Database className="h-4 w-4 opacity-40 group-hover:opacity-100" />
            Ledger_View
          </button>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-3 bg-[#FA8112]/5 border border-[#FA8112]/20 px-8 py-3 rounded-lg text-[#FA8112] font-bold text-[10px] uppercase tracking-widest hover:bg-[#FA8112] hover:text-[#222222] transition-all disabled:opacity-20 shadow-xl shadow-[#FA8112]/5"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Sync_Registry
          </button>
        </div>
      </header>

      {/* 2. SECTOR TABS */}
      <div className="px-1 overflow-x-auto no-scrollbar">
        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={["Current", "Upcoming", "History"]}
        />
      </div>

      {/* 3. REGISTRY VIEWPORT */}
      <div className="relative min-h-[500px] px-1">
        {error ? (
          <div className="bg-rose-500/5 border border-rose-500/10 p-12 rounded-xl text-center max-w-2xl mx-auto">
            <p className="text-rose-400 font-bold text-xs uppercase tracking-widest mb-6">
              {error}
            </p>
            <button
              onClick={handleRefresh}
              className="text-[#FA8112] text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[#FAF3E1] transition-colors flex items-center gap-2 mx-auto"
            >
              <Activity size={14} /> Reinitialize_Registry_Sync
            </button>
          </div>
        ) : loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <RefreshCw
                size={40}
                className="animate-spin text-[#FA8112]/40"
                strokeWidth={1}
              />
              <div className="absolute inset-0 border border-[#FA8112]/10 rounded-full animate-ping" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/10">
              Fetching_Sequence_Data...
            </p>
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState type={activeTab.toLowerCase()} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onExtend={extendBooking}
                onEdit={editBooking}
                onCancel={cancelBooking}
                isCurrent={activeTab.toLowerCase() === "current"}
                isUpcoming={activeTab.toLowerCase() === "upcoming"}
                extendingId={extending ? booking._id : null}
              />
            ))}
          </div>
        )}
      </div>

      {/* 4. SYSTEM FOOTNOTE */}
      <div className="flex flex-col items-center gap-4 pt-12 opacity-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <Terminal size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Registry Node Access • Latency: 24ms
        </p>
      </div>
    </div>
  );
};

export default MyBookings;
