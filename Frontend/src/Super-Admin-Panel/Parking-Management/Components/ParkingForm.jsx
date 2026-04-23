import React, { useState, useEffect } from "react";
import {
  Save,
  X,
  MapPin,
  Car,
  IndianRupee,
  Info,
  Activity,
} from "lucide-react";
import toast from "react-hot-toast";

const ParkingForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalSlots: "",
    basePrice: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = {
      ...formData,
      totalSlots: Number(formData.totalSlots),
      basePrice: Number(formData.basePrice),
    };

    if (cleanData.totalSlots <= 0 || cleanData.basePrice < 0) {
      toast.error("Validation Error: Check capacity and rates.");
      return;
    }

    onSubmit(cleanData);
  };

  // REFINED: Technical Input Style
  const inputStyle =
    "w-full h-12 px-4 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/40 focus:bg-[#FAF3E1]/[0.03] outline-none transition-all font-medium";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 animate-in fade-in duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {/* Parking Name */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
            <Info size={12} className="text-[#FA8112]" strokeWidth={2.5} /> Site
            Designation
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="e.g. ALPHA TERMINAL SOUTH"
            className={inputStyle}
            required
          />
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
            <MapPin size={12} className="text-[#FA8112]" strokeWidth={2.5} />{" "}
            Geo Location
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            type="text"
            placeholder="e.g. ANAND, GUJARAT"
            className={inputStyle}
            required
          />
        </div>

        {/* Slots */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
            <Car size={12} className="text-[#FA8112]" strokeWidth={2.5} /> Bay
            Capacity
          </label>
          <input
            name="totalSlots"
            value={formData.totalSlots}
            onChange={handleChange}
            type="number"
            placeholder="000"
            className={inputStyle}
            required
          />
        </div>

        {/* Pricing */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
            <IndianRupee
              size={12}
              className="text-[#FA8112]"
              strokeWidth={2.5}
            />{" "}
            Rate Scale (Hourly)
          </label>
          <input
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            type="number"
            placeholder="₹ 0.00"
            className={inputStyle}
            required
          />
        </div>

        {/* Status Select */}
        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
            <Activity size={12} className="text-[#FA8112]" strokeWidth={2.5} />{" "}
            Operational Status
          </label>
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`${inputStyle} appearance-none cursor-pointer pr-10 uppercase tracking-widest text-[11px]`}
            >
              <option value="Active" className="bg-[#222222]">
                System Operational
              </option>
              <option value="Maintenance" className="bg-[#222222]">
                Maintenance Mode
              </option>
              <option value="Closed" className="bg-[#222222]">
                Offline / Closed
              </option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FAF3E1]/20">
              <Info size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* FORM ACTIONS */}
      <div className="flex items-center justify-end gap-4 pt-10 border-t border-[#F5E7C6]/5">
        <button
          type="button"
          onClick={onCancel}
          className="group px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/20 hover:text-[#FAF3E1] transition-all flex items-center gap-2"
        >
          <X size={14} className="group-hover:rotate-90 transition-transform" />{" "}
          Discard
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="px-10 py-3 bg-[#FA8112] text-[#222222] rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#FAF3E1] shadow-xl shadow-[#FA8112]/5 transition-all flex items-center gap-2 disabled:opacity-30"
        >
          {isLoading ? (
            <span className="flex items-center gap-2 italic">
              Processing Payload...
            </span>
          ) : (
            <>
              <Save size={14} />
              {initialData ? "Synchronize Site" : "Initialize Site"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ParkingForm;
