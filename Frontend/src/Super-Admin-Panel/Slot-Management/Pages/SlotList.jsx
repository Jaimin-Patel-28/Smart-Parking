import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  RefreshCw,
  Loader2,
  LayoutGrid,
  Terminal,
  Activity,
  Cpu,
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

  // 1. ARCHITECTURAL SAFETY CHECK: Handled with premium "Empty State"
  if (!parkingId) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FA8112]/20 blur-3xl rounded-full group-hover:bg-[#FA8112]/30 transition-all duration-700" />
          <div className="relative bg-[#FAF3E1]/[0.02] p-12 rounded-xl text-[#FAF3E1]/10 border border-[#F5E7C6]/5 backdrop-blur-xl">
            <LayoutGrid size={64} strokeWidth={1} />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Location <span className="text-[#FA8112]">Null</span>
          </h2>
          <p className="text-[#FAF3E1]/30 max-w-sm mx-auto font-medium text-[13px] leading-relaxed italic">
            Telemetry requires a specific target. Please initialize a parking
            location from the primary registry.
          </p>
        </div>
        <button
          onClick={() => navigate("/super-admin/parking")}
          className="px-10 py-3.5 bg-[#FA8112] text-[#222222] rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-[#FA8112]/10 hover:bg-[#FAF3E1] transition-all active:scale-95"
        >
          Access Site Registry
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
      toast.success("Protocol: Unit Reset to Available");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Internal Node Sync Failure");
    } finally {
      setProcessing(false);
    }
  };

  const handleResetAll = () => {
    const nonAvailable = slots.filter((s) => s.status !== "available");
    if (nonAvailable.length === 0) return;
    setShowResetConfirm(true);
  };

  const confirmAssignVehicle = async () => {
    if (!selectedSlot || !vehicleNumber.trim()) {
      toast.error("Required: Valid Vehicle Identifier");
      return;
    }

    try {
      setProcessing(true);
      setShowAssignDialog(false);
      await slotService.assignVehicle(selectedSlot._id, vehicleNumber.trim());
      toast.success("Logic: Vehicle Assigned Successfully");
      refresh();
    } catch (err) {
      toast.error("Protocol Error: Assignment Failed");
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
      toast.success(`Registry: Released Node ${selectedSlot.label}`);
      refresh();
    } catch (err) {
      toast.error("Protocol Error: Release Failed");
    } finally {
      setProcessing(false);
      setSelectedSlot(null);
    }
  };

  const confirmResetAll = async () => {
    const nonAvailable = slots.filter((s) => s.status !== "available");
    try {
      setProcessing(true);
      setShowResetConfirm(false);
      await Promise.all(
        nonAvailable.map((slot) => slotService.releaseSlot(slot._id)),
      );
      toast.success("Full Registry Purge Complete");
      refresh();
    } catch (err) {
      toast.error("Critical Failure: Bulk Purge Failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-16 animate-in fade-in duration-700">
      {/* 1. COMMAND HEADER */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Site Map Directory
        </button>

        <button
          onClick={refresh}
          disabled={loading || processing}
          className="p-3 bg-[#FAF3E1]/5 hover:bg-[#FA8112]/10 text-[#FAF3E1]/20 hover:text-[#FA8112] rounded-lg transition-all border border-[#F5E7C6]/5 active:scale-95 disabled:opacity-20"
        >
          <RefreshCw
            size={18}
            className={
              loading || processing
                ? "animate-spin"
                : "hover:rotate-180 transition-transform duration-500"
            }
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

      {/* 2. MAIN REGISTRY WORKSPACE */}
      <div className="bg-[#FAF3E1]/[0.01] p-8 md:p-12 rounded-xl border border-[#F5E7C6]/5 shadow-2xl relative overflow-hidden min-h-[600px]">
        {/* Architectural Branding */}
        <div className="absolute -right-20 -top-20 text-[#FAF3E1]/[0.01] rotate-12 pointer-events-none">
          <Terminal size={400} strokeWidth={1} />
        </div>

        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10 border-b border-[#F5E7C6]/5 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
                <Activity size={20} />
              </div>
              <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
                Slot <span className="text-[#FA8112]">Telemetry</span> Engine
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="h-px w-6 bg-[#FA8112]/30" />
              <p className="text-[#FAF3E1]/20 text-[10px] font-bold uppercase tracking-[0.4em]">
                Monitoring Node:{" "}
                <span className="text-[#FA8112] font-mono tracking-widest">
                  {parkingId?.slice(-8).toUpperCase()}
                </span>
              </p>
            </div>
          </div>

          <div className="hidden lg:block h-[1px] flex-1 mx-12 bg-gradient-to-r from-[#F5E7C6]/10 to-transparent" />
        </div>

        {/* 3. DATA VIEWPORT */}
        {loading ? (
          <div className="h-[400px] flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Loader2
                size={48}
                className="animate-spin text-[#FA8112]"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 border-2 border-[#FA8112]/5 rounded-full" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
              Synchronizing Unit Logic...
            </p>
          </div>
        ) : (
          <SlotGrid slots={slots} onSlotAction={handleAction} />
        )}
      </div>

      {/* 4. OPERATIONAL STATUS OVERLAY: High-end fixed alert */}
      {processing && !loading && (
        <div className="fixed bottom-12 right-12 bg-[#222222] border border-[#FA8112]/30 px-8 py-5 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-5 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="relative h-2 w-2">
            <span className="animate-ping absolute inset-0 rounded-full bg-[#FA8112] opacity-75" />
            <span className="relative block h-2 w-2 rounded-full bg-[#FA8112]" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FA8112]">
              Encryption Active
            </p>
            <p className="text-[11px] font-bold text-[#FAF3E1]/60 uppercase tracking-widest">
              Writing to Central Node...
            </p>
          </div>
        </div>
      )}

      {/* 5. MODAL INTERFACE */}
      <InputDialog
        open={showAssignDialog}
        title="Initialize Occupancy"
        message={`Enter Vehicle Identifier for Node ${selectedSlot?.label || "Null"}.`}
        value={vehicleNumber}
        onChange={setVehicleNumber}
        placeholder="PLATE-REF-XXXX"
        confirmLabel="Assign Unit"
        onConfirm={confirmAssignVehicle}
        onCancel={() => {
          setShowAssignDialog(false);
          setSelectedSlot(null);
          setVehicleNumber("");
        }}
      />

      <ConfirmDialog
        open={showReleaseConfirm}
        title="Unit Decommission"
        message={`Are you certain you wish to release Node ${selectedSlot?.label || "Null"}?`}
        confirmLabel="Release Node"
        intent="danger"
        onConfirm={confirmReleaseSlot}
        onCancel={() => {
          setShowReleaseConfirm(false);
          setSelectedSlot(null);
        }}
      />

      <ConfirmDialog
        open={showResetConfirm}
        title="Registry Flush"
        message={`Authorize bulk release of ${slots.filter((s) => s.status !== "available").length} active nodes?`}
        confirmLabel="Acknowledge Purge"
        intent="danger"
        onConfirm={confirmResetAll}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};

export default SlotList;
