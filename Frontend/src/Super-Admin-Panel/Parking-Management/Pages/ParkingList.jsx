import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, MapPin, Loader2 } from "lucide-react";
import { useParking } from "../Hooks/useParking";
import ParkingTable from "../Components/ParkingTable";
import { parkingService } from "../Services/parkingService";
import toast from "react-hot-toast";

const ParkingList = () => {
  const navigate = useNavigate();
  const { parkings, loading, refresh } = useParking();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search input
  const filteredParkings = parkings.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this parking location?")) return;

    try {
      await parkingService.delete(id);
      toast.success("Parking deleted successfully");
      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Parking Management
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Manage {parkings.length} parking locations across your network.
          </p>
        </div>
        <button
          onClick={() => navigate("/super-admin/parking/add")}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
        >
          <Plus size={20} />
          Add Location
        </button>
      </div>

      {/* --- Search & Filters Bar --- */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="sm:col-span-3 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, city, or address..."
            className="w-full pl-10 pr-4 py-2.5 text-gray-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors text-sm">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* --- Table / Content Section --- */}
      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-2" />
          <p className="text-slate-400 font-medium">
            Loading parking assets...
          </p>
        </div>
      ) : filteredParkings.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <ParkingTable
            data={filteredParkings}
            onRefresh={refresh}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 text-center p-10">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <MapPin size={32} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Locations Found
          </h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-1">
            We couldn't find any parking zones matching your search. Try adding
            a new one!
          </p>
        </div>
      )}
    </div>
  );
};

export default ParkingList;
