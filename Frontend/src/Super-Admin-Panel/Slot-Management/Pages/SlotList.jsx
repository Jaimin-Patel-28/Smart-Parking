import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  RefreshCw,
  Loader2,
  LayoutGrid,
  Terminal,
} from "lucide-react";
import { useSlots } from "../Hooks/useSlots";
import { slotService } from "../Services/slotService";
import SlotGrid from "../Components/SlotGrid";
import SlotControls from "../Components/SlotControls";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";
import InputDialog from "../../../app/Components/InputDialog";

const SlotList = () => {
  const { parkingId } = useParams();
  const navigate = useNavigate();
  const { slots, loading, refresh } = useSlots(parkingId);
  const [processing, setProcessing] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showReleaseConfirm, setShowReleaseConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  // 1. SAFETY CHECK: If no parkingId is present in URL, show Selection UI
  if (!parkingId) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-[#FAF3E1]/[0.05] p-10 rounded-full text-[#FAF3E1]/20 border border-[#F5E7C6]/5">
          <LayoutGrid size={64} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter">
            No Location <span className="text-[#FA8112]">Selected</span>
          </h2>
          <p className="text-[#FAF3E1]/40 max-w-sm mx-auto font-medium text-sm leading-relaxed">
            To manage slots, please select a specific parking location from the
            Management panel first.
          </p>
        </div>
        <button
          onClick={() => navigate("/super-admin/parking")}
          className="px-8 py-4 bg-[#FA8112] text-[#222222] rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[#FA8112]/20 hover:bg-[#FAF3E1] transition-all active:scale-95"
        >
          Go to Parking Management
        </button>
      </div>
    );
  }

  const occupiedCount = slots
    ? slots.filter((s) => s.status?.toLowerCase() === "occupied").length
    : 0;

  const totalSlots = slots ? slots.length : 0;

  const handleAction = async (slot) => {
    const status = slot.status.toLowerCase();
    if (status === "available") {
      setSelectedSlot(slot);
      setVehicleNumber("");
      setShowAssignDialog(true);
      return;
    }

    if (status === "occupied") {
      setSelectedSlot(slot);
      setShowReleaseConfirm(true);
      return;
    }

    try {
      setProcessing(true);
      await slotService.updateStatus(slot._id, "available");
      toast.success("Slot set to available");
      refresh();
    } catch (err) {
      console.error("Action failed", err);
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleResetAll = async () => {
    const nonAvailable = slots.filter((s) => s.status !== "available");
    if (nonAvailable.length === 0) return;
    setShowResetConfirm(true);
  };

  const confirmAssignVehicle = async () => {
    if (!selectedSlot || !vehicleNumber.trim()) {
      toast.error("Enter a vehicle number");
      return;
    }

    try {
      setProcessing(true);
      setShowAssignDialog(false);
      await slotService.assignVehicle(selectedSlot._id, vehicleNumber.trim());
      toast.success("Vehicle assigned successfully");
      refresh();
    } catch (err) {
      console.error("Assign failed", err);
      toast.error(err.response?.data?.message || "Assign failed");
    } finally {
      setProcessing(false);
      setSelectedSlot(null);
      setVehicleNumber("");
    }
  };

  const confirmReleaseSlot = async () => {
    if (!selectedSlot) return;

    try {
      setProcessing(true);
      setShowReleaseConfirm(false);
      await slotService.releaseSlot(selectedSlot._id);
      toast.success(`Released slot ${selectedSlot.label}`);
      refresh();
    } catch (err) {
      console.error("Release failed", err);
      toast.error(err.response?.data?.message || "Release failed");
    } finally {
      setProcessing(false);
      setSelectedSlot(null);
    }
  };

  const confirmResetAll = async () => {
    const nonAvailable = slots.filter((s) => s.status !== "available");
    if (nonAvailable.length === 0) return;

    try {
      setProcessing(true);
      setShowResetConfirm(false);
      await Promise.all(
        nonAvailable.map((slot) => slotService.releaseSlot(slot._id)),
      );
      toast.success("All active slots released");
      refresh();
    } catch (err) {
      console.error("Reset failed", err);
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10 bg-[#222222]">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] font-black uppercase tracking-widest text-[10px] transition-all group"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Directory
        </button>
        <button
          onClick={refresh}
          disabled={loading || processing}
          className="p-3 bg-[#FAF3E1]/[0.05] hover:bg-[#FA8112] text-[#FAF3E1]/40 hover:text-[#222222] rounded-xl transition-all disabled:opacity-50 border border-[#F5E7C6]/5"
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

      {/* Main Content Area */}
      <div className="bg-[#FAF3E1]/[0.02] p-10 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm min-h-[500px] relative overflow-hidden">
        {/* Subtle Decorative Icon */}
        <Terminal
          size={150}
          className="absolute -right-10 -top-10 text-[#FAF3E1]/[0.02] pointer-events-none"
        />

        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#FAF3E1] tracking-tighter uppercase">
              Slot <span className="text-[#FA8112]">Real-time</span>{" "}
              Intelligence
            </h1>
            <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
              Active Monitoring:{" "}
              <span className="text-[#FA8112] font-mono">
                ID-{parkingId?.slice(-6).toUpperCase() || "SYSTEM-ERR"}
              </span>
            </p>
          </div>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-[#FA8112]/20 to-transparent hidden md:block mb-3 ml-6" />
        </div>

        {loading ? (
          <div className="h-80 flex flex-col items-center justify-center space-y-4">
            <Loader2 size={48} className="animate-spin text-[#FA8112]" />
            <p className="text-[#FAF3E1]/20 font-black uppercase tracking-[0.3em] text-[10px]">
              Syncing Unit Data...
            </p>
          </div>
        ) : (
          <SlotGrid slots={slots} onSlotAction={handleAction} />
        )}
      </div>

      {/* Persistent Processing Status Overlay */}
      {processing && !loading && (
        <div className="fixed bottom-10 right-10 bg-[#FA8112] text-[#222222] px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-300 border border-[#FAF3E1]/20">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#222222] opacity-40"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#222222]"></span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest">
            Writing to Blockchain...
          </span>
        </div>
      )}
      <InputDialog
        open={showAssignDialog}
        title="Assign Vehicle"
        message={`Enter the vehicle number for ${selectedSlot?.label || "this slot"}.`}
        value={vehicleNumber}
        onChange={setVehicleNumber}
        placeholder="Enter vehicle number"
        confirmLabel="Assign"
        onConfirm={confirmAssignVehicle}
        onCancel={() => {
          setShowAssignDialog(false);
          setSelectedSlot(null);
          setVehicleNumber("");
        }}
      />

      <ConfirmDialog
        open={showReleaseConfirm}
        title="Release Slot"
        message={`Release slot ${selectedSlot?.label || ""}?`}
        confirmLabel="Release"
        intent="danger"
        onConfirm={confirmReleaseSlot}
        onCancel={() => {
          setShowReleaseConfirm(false);
          setSelectedSlot(null);
        }}
      />

      <ConfirmDialog
        open={showResetConfirm}
        title="Release All Slots"
        message={`Release ALL ${slots.filter((s) => s.status !== "available").length} active slots?`}
        confirmLabel="Release All"
        intent="danger"
        onConfirm={confirmResetAll}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};

export default SlotList;
