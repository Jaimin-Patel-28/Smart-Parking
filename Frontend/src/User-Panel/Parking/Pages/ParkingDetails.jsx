import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  ShieldCheck,
  Loader2,
  Info,
  ArrowLeft,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  Lock,
} from "lucide-react";
import parkingService from "../Services/parkingService";
import SlotGrid from "../Components/SlotGrid";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import toast from "react-hot-toast";

const ParkingDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingTime, setBookingTime] = useState({ start: "", end: "" });
  const [isLocking, setIsLocking] = useState(false);
  const [isTimeFiltered, setIsTimeFiltered] = useState(false);
  const [timeError, setTimeError] = useState("");
  const availabilitySummary = data?.availabilitySummary || data?.summary;

  const fetchDetails = async (start, end) => {
    try {
      const res = await parkingService.getParkingDetails(id, start, end);
      const newData = res.data;

      if (selectedSlot) {
        const updatedSlot = newData.slots.find(
          (s) => s._id === selectedSlot._id,
        );
        if (!updatedSlot || !updatedSlot.isAvailableForTime)
          setSelectedSlot(null);
      }

      setData(newData);
      setIsTimeFiltered(!!(start && end));
    } catch (err) {
      toast.error("PROTOCOL_ERROR: Registry access failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDetails();
  }, [id]);

  const validateTimes = () => {
    setTimeError("");
    const s = new Date(bookingTime.start);
    const e = new Date(bookingTime.end);

    if (!bookingTime.start || !bookingTime.end) {
      setTimeError("Awaiting temporal parameters");
      return false;
    }
    if (s >= e) {
      setTimeError("Out_Node must follow In_Node");
      return false;
    }
    if (s <= new Date()) {
      setTimeError("Real-time sync requires future entry");
      return false;
    }
    return true;
  };

  const handleSearchAvailability = async () => {
    if (!validateTimes()) return;
    setLoading(true);
    await fetchDetails(bookingTime.start, bookingTime.end);
    setSelectedSlot(null);
  };

  const handleProceed = async () => {
    if (!selectedSlot || !bookingTime.start || !bookingTime.end) {
      return toast.error("VALIDATION_ERROR: Parameters incomplete");
    }
    if (!selectedSlot.isAvailableForTime) {
      return toast.error("REGISTRY_ERROR: Node state conflict");
    }
    setIsLocking(true);
    try {
      await parkingService.lockSlot(selectedSlot._id);
      navigate("/user/parking/preview", {
        state: {
          parking: data.parking,
          slot: selectedSlot,
          startTime: bookingTime.start,
          endTime: bookingTime.end,
          hourlyRate: data.parking.basePrice,
        },
      });
    } catch (err) {
      toast.error("ALLOCATION_ERROR: Node already locked");
    } finally {
      setIsLocking(false);
    }
  };

  if (loading && !data)
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-6">
        <div className="relative">
          <Loader2
            className="animate-spin text-[#FA8112]/20"
            size={48}
            strokeWidth={1}
          />
          <Terminal
            size={18}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FA8112] animate-pulse"
          />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/10">
          Synchronizing_Spatial_Matrix...
        </p>
      </div>
    );

  return (
    <div className="max-w-[1600px] mx-auto pb-24 space-y-10 animate-in fade-in duration-700">
      {/* 1. NODE IDENTITY HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all group"
          >
            <ArrowLeft
              size={20}
              className="group-active:-translate-x-1 transition-transform"
            />
          </button>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#FA8112]">
              <Activity size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
                Node_Identity_Manifest
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#FAF3E1] uppercase tracking-tight">
              {data.parking.name}
            </h1>
            <p className="flex items-center gap-2 text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
              <MapPin size={12} className="text-[#FA8112]/60" />{" "}
              {data.parking.location}
            </p>
          </div>
        </div>

        {/* METRIC BADGES */}
        {availabilitySummary && isTimeFiltered && (
          <div className="flex gap-4">
            <div className="bg-emerald-500/[0.03] border border-emerald-500/20 px-6 py-2.5 rounded-lg text-center shadow-xl">
              <p className="text-[8px] font-bold uppercase text-emerald-500/40 tracking-[0.2em] mb-1">
                VACANT_NODES
              </p>
              <p className="text-xl font-bold text-emerald-400 tabular-nums leading-none tracking-tighter">
                {availabilitySummary.available.toString().padStart(2, "0")}
              </p>
            </div>
            <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 px-6 py-2.5 rounded-lg text-center shadow-inner">
              <p className="text-[8px] font-bold uppercase text-[#FAF3E1]/10 tracking-[0.2em] mb-1">
                SECTOR_TOTAL
              </p>
              <p className="text-xl font-bold text-[#FAF3E1]/40 tabular-nums leading-none tracking-tighter">
                {availabilitySummary.total}
              </p>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* 2. SPATIAL ALLOCATION MATRIX (LEFT) */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-10 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                  Spatial_Allocation{" "}
                  <span className="text-[#FA8112]">Grid</span>
                </h2>
                <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.3em]">
                  Module_Status: Interactive
                </p>
              </div>
              <div className="flex gap-8">
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]/10">
                  <span className="w-1.5 h-1.5 bg-[#FAF3E1]/10 rounded-full" />{" "}
                  Vacant
                </div>
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-[#FA8112]">
                  <span className="w-1.5 h-1.5 bg-[#FA8112] rounded-full animate-pulse shadow-[0_0_8px_#FA8112]" />{" "}
                  Selected
                </div>
              </div>
            </div>

            <div className="relative">
              {!isTimeFiltered && (
                <div className="absolute inset-0 z-20 backdrop-blur-md bg-[#222222]/60 rounded-lg flex items-center justify-center text-center p-12 animate-in fade-in duration-500">
                  <div className="max-w-xs space-y-6">
                    <div className="bg-[#FA8112]/5 w-16 h-16 rounded-lg flex items-center justify-center mx-auto border border-[#FA8112]/10 shadow-2xl">
                      <Clock size={28} className="text-[#FA8112] opacity-60" />
                    </div>
                    <p className="text-[11px] font-bold text-[#FAF3E1]/40 leading-relaxed uppercase tracking-widest">
                      Initialize temporal parameters in the{" "}
                      <span className="text-[#FA8112]">Command_Console</span> to
                      unlock spatial node visibility.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6 bg-[#1a1a1a] rounded-lg border border-[#F5E7C6]/5 shadow-inner">
                <SlotGrid
                  slots={data.slots}
                  selectedSlot={selectedSlot}
                  onSelect={setSelectedSlot}
                  isTimeSelected={isTimeFiltered}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. TEMPORAL COMMAND CONSOLE (RIGHT) */}
        <aside className="xl:col-span-4">
          <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl p-10 sticky top-24 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FA8112]/5 blur-3xl rounded-full group-hover:bg-[#FA8112]/10 transition-colors duration-1000" />

            <div className="relative z-10 space-y-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#FA8112]">
                  <Zap size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
                    Command_Console
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                  Configure_Sequence
                </h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                    Arrival_In_Node
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-[#222222] border border-[#F5E7C6]/5 rounded-lg p-4 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 focus:outline-none transition-all tabular-nums [color-scheme:dark]"
                    value={bookingTime.start}
                    onChange={(e) => {
                      setBookingTime({ ...bookingTime, start: e.target.value });
                      setSelectedSlot(null);
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                    Departure_Out_Node
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-[#222222] border border-[#F5E7C6]/5 rounded-lg p-4 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 focus:outline-none transition-all tabular-nums [color-scheme:dark]"
                    value={bookingTime.end}
                    onChange={(e) => {
                      setBookingTime({ ...bookingTime, end: e.target.value });
                      setSelectedSlot(null);
                    }}
                  />
                </div>

                {timeError && (
                  <div className="flex items-center gap-3 text-rose-400 text-[9px] font-bold uppercase tracking-widest px-1 animate-in slide-in-from-left-2">
                    <Info size={12} className="shrink-0" /> {timeError}
                  </div>
                )}

                <button
                  onClick={handleSearchAvailability}
                  className="w-full py-4 rounded-lg bg-[#222222] border border-[#F5E7C6]/5 text-[#FAF3E1]/40 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-[#FAF3E1] hover:text-[#222222] transition-all shadow-xl active:scale-95 group/btn"
                >
                  <span className="group-hover/btn:tracking-[0.6em] transition-all duration-500">
                    Scan_Registry
                  </span>
                </button>
              </div>

              {/* TARIFF TELEMETRY */}
              <div className="pt-10 border-t border-[#F5E7C6]/5 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
                      Unit_Tariff
                    </p>
                    <span className="text-3xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter">
                      ₹{data.parking.basePrice}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#FA8112]/40 uppercase tracking-widest pb-1">
                    INR/HOUR
                  </span>
                </div>

                <div className="bg-emerald-500/[0.02] p-5 rounded-lg border border-emerald-500/10 flex gap-4 relative overflow-hidden group/advisory">
                  <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500/20" />
                  <Info
                    size={18}
                    className="shrink-0 text-emerald-500/40 mt-0.5"
                  />
                  <p className="text-[10px] text-emerald-500/60 font-bold uppercase tracking-widest leading-relaxed">
                    15-minute automated buffer integrated for driver-safety
                    protocol.
                  </p>
                </div>
              </div>

              {/* FINAL COMMIT */}
              <button
                onClick={handleProceed}
                disabled={isLocking || !selectedSlot || !isTimeFiltered}
                className="w-full bg-[#FA8112] text-[#222222] font-bold py-5 rounded-lg flex items-center justify-center gap-4 hover:bg-[#FAF3E1] disabled:opacity-10 transition-all shadow-2xl shadow-[#FA8112]/10 uppercase text-[11px] tracking-[0.3em] active:scale-[0.98] group/commit"
              >
                {isLocking ? (
                  <Activity className="animate-spin" size={18} />
                ) : (
                  <>
                    SECURE_NODE_SELECTION{" "}
                    <ArrowRight
                      size={18}
                      strokeWidth={3}
                      className="group-hover/commit:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ParkingDetails;
