import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Loader2,
  Database,
  LayoutGrid,
} from "lucide-react";
import { useParking } from "../Hooks/useParking";
import ParkingTable from "../Components/ParkingTable";
import { parkingService } from "../Services/parkingService";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";

const ParkingList = () => {
  const navigate = useNavigate();
  const { parkings, loading, error, refresh } = useParking();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [parkingToDelete, setParkingToDelete] = useState(null);

  const filteredParkings = parkings.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id) => {
    setParkingToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!parkingToDelete) return;
    const id = parkingToDelete;
    setShowDeleteConfirm(false);
    setParkingToDelete(null);

    try {
      await parkingService.delete(id);
      toast.success("Asset Purged Successfully", {
        style: {
          background: "#1a1a1a",
          color: "#FAF3E1",
          border: "1px solid rgba(245, 231, 198, 0.05)",
        },
      });
      refresh();
    } catch (error) {
      toast.error("Protocol Error: Delete failed");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {/* 1. HEADER & ACTION COMMAND */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Database size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Central Registry
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
            Parking <span className="text-[#FA8112]">Management</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest">
            Network Status: {parkings.length} Active Nodes
          </p>
        </div>

        <button
          onClick={() => navigate("/super-admin/parking/add")}
          className="flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-[11px] hover:bg-[#FAF3E1] transition-all shadow-xl shadow-[#FA8112]/10 active:scale-95"
        >
          <Plus size={16} strokeWidth={2.5} />
          Initialize New Zone
        </button>
      </div>

      {/* 2. SEARCH & FILTER COMMAND BAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 bg-[#FAF3E1]/[0.01] p-3 rounded-xl border border-[#F5E7C6]/5 shadow-2xl">
        <div className="lg:col-span-9 relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search registry by name, city, or terminal ID..."
            className="w-full pl-12 pr-6 py-3.5 text-[#FAF3E1] bg-[#222222] rounded-lg border border-[#F5E7C6]/5 focus:border-[#FA8112]/30 focus:outline-none transition-all text-[13px] font-medium placeholder:text-[#FAF3E1]/5 uppercase tracking-wider"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="lg:col-span-3 flex items-center justify-center gap-3 px-6 py-3.5 bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1]/40 font-bold uppercase tracking-widest text-[10px] hover:bg-[#FAF3E1]/10 hover:text-[#FAF3E1] transition-all">
          <Filter size={14} />
          Refine Search
        </button>
      </div>

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-4 text-rose-400 text-[11px] font-bold uppercase tracking-widest">
          {error}
        </div>
      )}

      {/* 3. MAIN REGISTRY VIEWPORT */}
      <div className="relative">
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center bg-[#FAF3E1]/[0.01] rounded-xl border border-dashed border-[#F5E7C6]/5">
            <div className="relative">
              <Loader2
                className="h-10 w-10 animate-spin text-[#FA8112]"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 rounded-full border-2 border-[#FA8112]/5" />
            </div>
            <p className="mt-6 text-[#FAF3E1]/20 font-bold uppercase tracking-[0.4em] text-[9px]">
              Synchronizing Asset Database...
            </p>
          </div>
        ) : filteredParkings.length > 0 ? (
          <div className="animate-in fade-in duration-700">
            <ParkingTable
              data={filteredParkings}
              onRefresh={refresh}
              onDelete={handleDelete}
            />
          </div>
        ) : (
          <div className="min-h-[400px] flex flex-col items-center justify-center bg-[#FAF3E1]/[0.01] rounded-xl border border-[#F5E7C6]/5 text-center p-12">
            <div className="p-6 rounded-xl bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 text-[#FAF3E1]/10 mb-6">
              <LayoutGrid size={48} strokeWidth={1} />
            </div>
            <h3 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.3em]">
              Zero Nodes Identified
            </h3>
            <p className="text-[#FAF3E1]/30 max-w-[280px] mx-auto mt-4 text-[13px] font-medium leading-relaxed">
              The current search parameters do not match any registered
              terminals. Please verify your filters or initialize a new asset.
            </p>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Asset Decommission"
        message="Are you certain you wish to purge this terminal from the registry? All associated data will be archived."
        confirmLabel="Purge Asset"
        intent="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setParkingToDelete(null);
        }}
      />
    </div>
  );
};

export default ParkingList;
