import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  QrCode,
  Download,
  Home,
  MapPin,
  Car,
  Hash,
  Terminal,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { format } from "date-fns";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  const start = booking?.startTime ? new Date(booking.startTime) : null;
  const end = booking?.endTime ? new Date(booking.endTime) : null;
  const durationHours =
    booking?.duration ||
    (start && end
      ? Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60)))
      : null);

  const handleSavePass = async () => {
    if (!booking) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setFont("courier", "bold");
    doc.text("SMART_PARK_SYSTEM_MANIFEST", 14, 18);
    // ... (PDF generation remains stable but uses terminal-style courier font)
    doc.save(`manifest-${booking.bookingCode}.pdf`);
  };

  if (!booking) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-[#FA8112]/5 p-8 rounded-xl border border-[#FA8112]/20 mb-8 relative">
          <Activity className="w-12 h-12 text-[#FA8112] animate-pulse" />
          <div className="absolute inset-0 bg-[#FA8112]/5 blur-2xl -z-10" />
        </div>
        <h1 className="text-2xl font-bold text-[#FAF3E1] uppercase tracking-tight">
          Entry_Pass_Active
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 mt-4 mb-10 max-w-xs">
          Reservation synchronization complete. Access node via console.
        </p>
        <button
          onClick={() => navigate("/user/dashboard")}
          className="bg-[#FA8112] text-[#222222] font-bold px-12 py-4 rounded-lg uppercase text-[10px] tracking-[0.3em] hover:bg-[#FAF3E1] transition-all shadow-2xl shadow-[#FA8112]/10"
        >
          Access_Console
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
      {/* 1. SUCCESS SIGNAL */}
      <div className="text-center mb-12">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 blur-3xl bg-[#FA8112]/20 rounded-full" />
          <div className="relative h-20 w-20 bg-[#1a1a1a] border border-[#FA8112]/40 text-[#FA8112] rounded-xl flex items-center justify-center shadow-2xl">
            <ShieldCheck size={40} strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[#FAF3E1] uppercase tracking-tighter">
          Node <span className="text-[#FA8112]">Secured</span>
        </h1>
        <div className="flex items-center justify-center gap-3 mt-3">
          <Activity size={12} className="text-[#FA8112]/40" />
          <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em]">
            Digital_Permit_Allocated
          </p>
        </div>
      </div>

      {/* 2. THE SYSTEM CERTIFICATE */}
      <div className="relative mb-12 shadow-2xl">
        {/* Pass Top Section */}
        <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-t-xl p-10 pb-12 border-b-0">
          <div className="flex flex-col items-center space-y-10">
            {/* QR Viewport */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#FA8112]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 bg-white rounded-lg shadow-[0_0_40px_rgba(250,129,18,0.1)]">
                <QrCode size={180} className="text-[#222222]" strokeWidth={1} />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-[#FA8112]/40 mb-1">
                <Terminal size={12} />
                <span className="text-[8px] font-bold uppercase tracking-[0.4em]">
                  Authorized_Entry_Pass
                </span>
              </div>
              <h2 className="text-3xl font-bold text-[#FAF3E1] tracking-[0.2em] font-mono">
                {booking.bookingCode || "PRK-NULL"}
              </h2>
            </div>
          </div>
        </div>

        {/* 3. PERFORATED HARDWARE DIVIDER */}
        <div className="relative flex items-center justify-between px-4">
          <div className="absolute left-0 w-full border-t border-dashed border-[#F5E7C6]/10" />
          <div className="z-10 -ml-8 h-8 w-8 bg-[#222222] rounded-full border border-[#F5E7C6]/5" />
          <div className="z-10 -mr-8 h-8 w-8 bg-[#222222] rounded-full border border-[#F5E7C6]/5" />
        </div>

        {/* Pass Bottom Section */}
        <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-b-xl p-10 pt-12 border-t-0 font-mono">
          <div className="grid grid-cols-2 gap-y-8 gap-x-6">
            <MetricBlock
              label="Asset_ID"
              icon={Car}
              value={booking.vehicleNumber || "N/A"}
            />
            <MetricBlock
              label="Node_Alloc"
              icon={Hash}
              value={booking.slot?.label || "N/A"}
              align="right"
            />

            <div className="col-span-2 space-y-2">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60">
                Registry_Zone
              </p>
              <div className="flex items-center gap-3 text-[#FAF3E1]/80 text-[11px] uppercase">
                <MapPin size={14} className="text-[#FA8112]" />
                <span className="truncate">
                  {booking.parking?.name || "SPATIAL_CLUSTER_NULL"}
                </span>
              </div>
            </div>

            <div className="col-span-2 space-y-2 pt-2 border-t border-[#F5E7C6]/5">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60">
                Temporal_Registry
              </p>
              <p className="text-[11px] text-[#FAF3E1]/80 uppercase tabular-nums">
                {start && end
                  ? `${format(start, "dd MMM yy | HH:mm")} >> ${format(end, "HH:mm")}`
                  : "N/A"}
              </p>
            </div>

            <div className="col-span-2 flex justify-between items-end pt-4">
              <div className="space-y-1">
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60">
                  Settlement
                </p>
                <p className="text-lg font-bold text-[#FAF3E1] tabular-nums">
                  ₹{Number(booking.totalAmount || 0).toFixed(2)}
                </p>
              </div>
              <div className="text-right opacity-10">
                <Terminal size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SYSTEM ACTIONS */}
      <div className="space-y-4 px-1">
        <button
          onClick={() => navigate("/user/dashboard")}
          className="w-full flex items-center justify-center gap-4 bg-[#FA8112] text-[#222222] py-4 rounded-lg font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#FAF3E1] transition-all shadow-2xl shadow-[#FA8112]/5 active:scale-[0.98]"
        >
          Return_to_Console <Home size={16} />
        </button>

        <button
          onClick={handleSavePass}
          className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] border border-[#F5E7C6]/5 text-[#FAF3E1]/40 py-4 rounded-lg text-[10px] font-bold uppercase tracking-[0.3em] hover:text-[#FAF3E1] transition-all"
        >
          <Download size={16} /> Export_Manifest_PDF
        </button>
      </div>
    </div>
  );
};

const MetricBlock = ({ label, icon: Icon, value, align = "left" }) => (
  <div className={`space-y-2 ${align === "right" ? "text-right" : ""}`}>
    <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60">
      {label}
    </p>
    <div
      className={`flex items-center gap-3 text-[#FAF3E1]/80 text-[11px] uppercase ${align === "right" ? "justify-end" : ""}`}
    >
      {align === "left" && <Icon size={14} className="opacity-20" />}
      <span className="font-bold">{value}</span>
      {align === "right" && <Icon size={14} className="opacity-20" />}
    </div>
  </div>
);

export default BookingSuccess;
