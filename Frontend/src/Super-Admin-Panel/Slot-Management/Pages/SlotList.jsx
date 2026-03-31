import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, RefreshCw, Loader2, LayoutGrid } from "lucide-react"; // Added LayoutGrid for the empty state
import { useSlots } from "../Hooks/useSlots";
import { slotService } from "../Services/slotService";
import SlotGrid from "../Components/SlotGrid";
import SlotControls from "../Components/SlotControls";

const SlotList = () => {
  const { parkingId } = useParams();
  const navigate = useNavigate();
  const { slots, loading, refresh } = useSlots(parkingId);
  const [processing, setProcessing] = useState(false);

  // 1. SAFETY CHECK: If no parkingId is present in URL, show Selection UI
  if (!parkingId) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <div className="bg-slate-100 p-6 rounded-full text-slate-400">
          <LayoutGrid size={48} />
        </div>
        <h2 className="text-2xl font-black text-slate-800">
          No Location Selected
        </h2>
        <p className="text-slate-500 max-w-sm">
          To manage slots, please select a specific parking location from the
          Management panel first.
        </p>
        <button
          onClick={() => navigate("/super-admin/parking")}
          className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
        >
          Go to Parking Management
        </button>
      </div>
    );
  }

  // Calculate statistics for the SlotControls bar
  const occupiedCount = slots
    ? slots.filter((s) => s.status?.toLowerCase() === "occupied").length
    : 0;

  const totalSlots = slots ? slots.length : 0;

  const handleAction = async (slot) => {
    const originalSlot = { ...slot };
    try {
      setProcessing(true);

      // Optimistic update
      if (slot.status.toLowerCase() === "available") {
        const vNo = prompt("Enter Vehicle Number to Assign:");
        if (!vNo) return;
        slot.status = "occupied";
        slot.vehicleNumber = vNo;
        await slotService.assignVehicle(slot._id, vNo);
      } else if (slot.status.toLowerCase() === "occupied") {
        if (
          !window.confirm(
            `Release slot ${slot.label} and free vehicle ${slot.vehicleNumber}?`,
          )
        )
          return;
        slot.status = "available";
        slot.vehicleNumber = null;
        await slotService.releaseSlot(slot._id);
      } else if (slot.status.toLowerCase() === "maintenance") {
        await slotService.updateStatus(slot._id, "available");
        slot.status = "available";
      } else {
        // For temporary_locked etc.
        await slotService.updateStatus(slot._id, "available");
        slot.status = "available";
      }
      refresh();
    } catch (err) {
      console.error("Action failed", err);
      alert("Failed to update slot. Please try again.");
      // Note: optimistic rollback would require local slots state management
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteSlot = async (slot) => {
    if (!window.confirm(`Delete slot ${slot.label}? This is permanent.`))
      return;

    try {
      setProcessing(true);
      await slotService.deleteSlot(slot._id);
      refresh();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete slot.");
    } finally {
      setProcessing(false);
    }
  };

  const handleResetAll = async () => {
    const nonAvailable = slots.filter((s) => s.status !== "available");
    if (nonAvailable.length === 0) {
      alert("All slots are already available.");
      return;
    }
    if (
      !window.confirm(
        `Are you sure you want to release ALL ${nonAvailable.length} active slots?`,
      )
    )
      return;

    try {
      setProcessing(true);
      await Promise.all(
        nonAvailable.map((slot) => slotService.releaseSlot(slot._id)),
      );
      refresh();
    } catch (err) {
      console.error("Reset failed", err);
      alert("Error resetting some slots.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors"
        >
          <ChevronLeft size={20} /> Back to Locations
        </button>
        <button
          onClick={refresh}
          disabled={loading || processing}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-emerald-600 transition-all disabled:opacity-50"
        >
          <RefreshCw
            size={20}
            className={loading || processing ? "animate-spin" : ""}
          />
        </button>
      </div>

      {!loading && (
        <SlotControls
          total={totalSlots}
          occupied={occupiedCount}
          onReset={handleResetAll}
          isLoading={processing}
        />
      )}

      <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm min-h-[400px]">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-800">
            Live Parking Floor Plan
          </h1>
          <p className="text-slate-500 font-medium">
            Real-time occupancy for Zone ID:{" "}
            <span className="text-emerald-600 font-mono">
              {/* 2. ADDED OPTIONAL CHAINING TO PREVENT CRASH */}
              {parkingId?.slice(-6).toUpperCase() || "N/A"}
            </span>
          </p>
        </div>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-4 text-slate-400">
            <Loader2 size={40} className="animate-spin text-emerald-500" />
            <p className="font-bold">Syncing Slot Data...</p>
          </div>
        ) : (
          <SlotGrid slots={slots} onSlotAction={handleAction} />
        )}
      </div>

      {processing && !loading && (
        <div className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <Loader2 size={18} className="animate-spin text-emerald-400" />
          <span className="text-sm font-bold">Updating Database...</span>
        </div>
      )}
    </div>
  );
};

export default SlotList;
