import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Clock,
  Car,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  Wallet,
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
import VehicleSelector from "../Components/VehicleSelector";
import parkingService from "../Services/parkingService";
import profileService from "../../Profile/Services/profileService";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import toast from "react-hot-toast";

const BookingPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { parking, slot, startTime, endTime } = location.state || {};
  const [selectedVehicle, setSelectedVehicle] = useState(
    user?.vehicleNumber || "",
  );
  const [registeredVehicles, setRegisteredVehicles] = useState(
    user?.vehicleNumber ? [user.vehicleNumber] : [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data } = await profileService.getProfile();
        const profileVehicles = (data?.vehicles || [])
          .filter(
            (vehicle) => vehicle?.isActive !== false && vehicle?.vehicleNumber,
          )
          .map((vehicle) => vehicle.vehicleNumber);

        const fallbackVehicle = user?.vehicleNumber ? [user.vehicleNumber] : [];
        const uniqueVehicles = [
          ...new Set([...profileVehicles, ...fallbackVehicle]),
        ];

        setRegisteredVehicles(uniqueVehicles);
        setSelectedVehicle((prev) => prev || uniqueVehicles[0] || "");
      } catch (err) {
        const fallbackVehicle = user?.vehicleNumber ? [user.vehicleNumber] : [];
        setRegisteredVehicles(fallbackVehicle);
      }
    };
    fetchVehicles();
  }, [user?.vehicleNumber]);

  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationHours = Math.max(
    1,
    Math.ceil((end - start) / (1000 * 60 * 60)),
  );
  const totalAmount = durationHours * parking?.basePrice;

  const handleConfirm = async () => {
    if (registeredVehicles.length === 0)
      return toast.error("PROTOCOL_ERROR: Link vehicle to profile");
    if (!selectedVehicle)
      return toast.error("PROTOCOL_ERROR: Select active unit");

    setIsSubmitting(true);
    try {
      const bookingData = {
        userId: user._id || user.id,
        parkingId: parking._id,
        slotId: slot._id,
        vehicleNumber: selectedVehicle,
        startTime,
        endTime,
        duration: durationHours,
        hourlyRate: parking?.basePrice,
        totalAmount,
        paymentMethod: "wallet",
      };

      const { data } = await parkingService.confirmBooking(bookingData);
      toast.success("Node Secured");
      navigate("/user/parking/success", { state: { booking: data.booking } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registry failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!parking)
    return (
      <div className="max-w-2xl mx-auto py-32 text-center">
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-10 text-rose-400">
          <p className="font-bold uppercase tracking-[0.3em] text-[10px]">
            Registry_Data_Null
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4">
      {/* 1. COMMAND HEADER */}
      <div className="flex items-center gap-6 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1]/20 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all group"
        >
          <ChevronLeft
            size={20}
            className="group-active:-translate-x-1 transition-transform"
          />
        </button>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Terminal size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Checkout_Manifest
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] uppercase tracking-tight leading-none">
            Finalize_Pass
          </h1>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#F5E7C6]/5 bg-[#1a1a1a] shadow-2xl">
        {/* 2. AUTHORIZED ENTRY CERTIFICATE */}
        <div className="bg-gradient-to-r from-[#FA8112] to-[#FA8112]/80 p-8 text-[#222222] relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <h2 className="text-2xl font-bold uppercase tracking-tight">
              Authorized Entry Pass
            </h2>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">
              SYSTEM_UID:{" "}
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
          <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 -rotate-12" />
        </div>

        <div className="p-10 space-y-12 relative">
          {/* LOGISTICS MATRIX */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 ml-1">
                Spatial_Zone
              </p>
              <div className="flex items-center gap-4 bg-[#222222] border border-[#F5E7C6]/5 p-4 rounded-lg shadow-inner">
                <MapPin size={16} className="text-[#FA8112]" />
                <p className="font-bold text-[#FAF3E1] uppercase text-xs tracking-widest truncate">
                  {parking.name}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 ml-1">
                Allocation_Node
              </p>
              <div className="flex items-center gap-4 bg-[#222222] border border-[#F5E7C6]/5 p-4 rounded-lg shadow-inner">
                <ShieldCheck size={16} className="text-[#FA8112]" />
                <p className="font-bold text-[#FAF3E1] uppercase text-xs tracking-widest">
                  Slot {slot.label}
                </p>
              </div>
            </div>
          </div>

          {/* TEMPORAL TELEMETRY */}
          <div className="relative bg-[#222222] border border-[#F5E7C6]/5 rounded-xl p-8 overflow-hidden group">
            <div className="flex justify-between items-center relative z-10">
              <div className="space-y-1.5">
                <p className="text-[9px] font-bold text-[#FA8112]/60 uppercase tracking-[0.3em]">
                  Sequence_Start
                </p>
                <p className="text-sm font-bold text-[#FAF3E1] tabular-nums">
                  {start
                    .toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .toUpperCase()}
                </p>
              </div>
              <div className="h-10 w-px bg-[#F5E7C6]/5" />
              <div className="space-y-1.5 text-right">
                <p className="text-[9px] font-bold text-[#FA8112]/60 uppercase tracking-[0.3em]">
                  Temporal_Cycle
                </p>
                <p className="text-sm font-bold text-[#FAF3E1] tabular-nums">
                  {durationHours} HOURS
                </p>
              </div>
            </div>
            {/* HUD Scanline */}
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#FA8112]/20 to-transparent" />
          </div>

          {/* ASSET VERIFICATION */}
          <div className="space-y-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20 ml-1">
              Asset_Verification
            </p>
            <VehicleSelector
              selectedVehicle={selectedVehicle}
              onSelect={setSelectedVehicle}
              vehicles={registeredVehicles}
            />
          </div>

          {/* SETTLEMENT CHANNEL */}
          <div className="space-y-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20 ml-1">
              Settlement_Channel
            </p>
            <div className="rounded-lg border border-[#FA8112]/20 bg-[#FA8112]/5 px-6 py-5 flex items-center justify-between group">
              <div className="flex items-center gap-4 text-[#FA8112]">
                <Wallet size={18} />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
                  Vault_Settlement_Only
                </span>
              </div>
              <Activity size={12} className="text-[#FA8112]/40 animate-pulse" />
            </div>
          </div>

          {/* FINAL SETTLEMENT ACTIONS */}
          <div className="pt-12 border-t border-[#F5E7C6]/5 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20 ml-1">
                Final_Settlement
              </p>
              <h2 className="text-5xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter leading-none">
                ₹{totalAmount.toFixed(2)}
              </h2>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isSubmitting || registeredVehicles.length === 0}
              className="w-full md:w-auto bg-[#FA8112] text-[#222222] px-12 py-5 rounded-lg font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-[#FAF3E1] transition-all shadow-2xl shadow-[#FA8112]/10 active:scale-[0.98] disabled:opacity-20 group"
            >
              {isSubmitting ? (
                <Activity size={18} className="animate-spin" />
              ) : (
                <>
                  SECURE_NODE_ALLOCATION{" "}
                  <ArrowRight
                    size={18}
                    strokeWidth={3}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPreview;
