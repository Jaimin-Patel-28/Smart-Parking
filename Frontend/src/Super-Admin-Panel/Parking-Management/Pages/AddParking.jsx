import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parkingService } from "../Services/parkingService";
import ParkingForm from "../Components/ParkingForm";
import { ChevronLeft, PlusCircle, Terminal, Cpu } from "lucide-react";
import toast from "react-hot-toast";

const AddParking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAdd = async (formData) => {
    try {
      setLoading(true);

      const cleanData = {
        ...formData,
        totalSlots: Number(formData.totalSlots),
        basePrice: Number(formData.basePrice),
      };

      await parkingService.create(cleanData);
      toast.success("Asset initialized successfully");
      navigate("/super-admin/parking");
    } catch (err) {
      const serverMessage =
        err.response?.data?.message || "Internal Node Sync Failure";
      toast.error("Critical Error: " + serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. TOP NAVIGATION: Clean Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all"
      >
        <ChevronLeft
          size={14}
          className="transition-transform group-hover:-translate-x-1"
        />
        Registry Directory
      </button>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="bg-[#FAF3E1]/[0.01] p-8 md:p-12 rounded-xl border border-[#F5E7C6]/5 shadow-2xl relative overflow-hidden">
        {/* Background Technical Decoration */}
        <div className="absolute -right-10 -top-10 text-[#FAF3E1]/[0.02] rotate-12 pointer-events-none">
          <Cpu size={280} strokeWidth={1} />
        </div>

        {/* Header Section: Professional Branding */}
        <div className="mb-12 relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
              <PlusCircle size={24} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[#FA8112] uppercase tracking-[0.4em]">
                System Initialization
              </p>
              <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
                Register <span className="text-[#FA8112]">New Zone</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[#FA8112]/20" />
            <p className="text-[#FAF3E1]/40 text-xs font-medium leading-relaxed italic max-w-md">
              Define a new operational parking asset. Ensure capacity and
              pricing logic align with local station protocols.
            </p>
          </div>
        </div>

        {/* Form Integration */}
        <div className="relative z-10">
          <ParkingForm
            onSubmit={handleAdd}
            onCancel={() => navigate("/super-admin/parking")}
            isLoading={loading}
          />
        </div>
      </div>

      {/* 3. FOOTER METADATA: Technical Log Style */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-[#FAF3E1]/10">
          <span className="h-px w-12 bg-[#FAF3E1]/10" />
          <Terminal size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]/10" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.6em]">
          Secure Asset Registration Module • v1.0.2
        </p>
      </div>
    </div>
  );
};

export default AddParking;
