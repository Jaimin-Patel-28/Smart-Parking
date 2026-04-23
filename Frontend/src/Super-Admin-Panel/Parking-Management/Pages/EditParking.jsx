import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { parkingService } from "../Services/parkingService";
import ParkingForm from "../Components/ParkingForm";
import { ChevronLeft, Loader2, Edit3, Terminal, Settings2 } from "lucide-react";
import toast from "react-hot-toast";

const EditParking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchParkingDetails = async () => {
      try {
        const response = await parkingService.getById(id);
        setInitialData(response.data);
      } catch (err) {
        toast.error("Asset Sync Failure: Location not found in registry.");
        navigate("/super-admin/parking");
      } finally {
        setLoading(false);
      }
    };
    fetchParkingDetails();
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    try {
      setIsUpdating(true);
      await parkingService.update(id, updatedData);
      toast.success("Configuration updated successfully");
      navigate("/super-admin/parking");
    } catch (err) {
      toast.error("Protocol Error: Update synchronization failed.");
    } finally {
      setIsUpdating(false);
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
        Site Registry
      </button>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="bg-[#FAF3E1]/[0.01] p-8 md:p-12 rounded-xl border border-[#F5E7C6]/5 shadow-2xl relative overflow-hidden">
        {/* Background Technical Decoration */}
        <div className="absolute -right-10 -top-10 text-[#FAF3E1]/[0.02] rotate-12 pointer-events-none">
          <Settings2 size={280} strokeWidth={1} />
        </div>

        {/* Header Section: Professional Branding */}
        <div className="mb-12 relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
              <Edit3 size={24} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[#FA8112] uppercase tracking-[0.4em]">
                Asset Re-Configuration
              </p>
              <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
                Modify <span className="text-[#FA8112]">Parking Zone</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[#FA8112]/20" />
            <p className="text-[#FAF3E1]/40 text-xs font-medium leading-relaxed italic max-w-md">
              Adjusting operational parameters for:{" "}
              <span className="text-[#FA8112] font-mono not-italic font-bold tracking-widest">
                ID-{id.slice(-6).toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        {/* Content Logic */}
        {loading ? (
          <div className="h-80 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Loader2
                className="h-12 w-12 animate-spin text-[#FA8112]"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 h-12 w-12 border-2 border-[#FA8112]/10 rounded-full"></div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[#FAF3E1] font-bold uppercase tracking-[0.3em] text-[10px]">
                Accessing Local Node
              </p>
              <p className="text-[#FAF3E1]/30 text-[10px] font-medium">
                Retrieving site configuration...
              </p>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            <ParkingForm
              initialData={initialData}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/super-admin/parking")}
              isLoading={isUpdating}
            />
          </div>
        )}
      </div>

      {/* 3. FOOTER METADATA: Technical Log Style */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-[#FAF3E1]/10">
          <span className="h-px w-12 bg-[#FAF3E1]/10" />
          <Terminal size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]/10" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.6em]">
          Internal Asset Modification Module • v1.0.4
        </p>
      </div>
    </div>
  );
};

export default EditParking;
