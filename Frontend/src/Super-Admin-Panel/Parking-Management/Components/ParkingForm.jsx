import React, { useState, useEffect } from "react";
import { Save, X, MapPin, Car, DollarSign, Info } from "lucide-react";

const ParkingForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    totalSlots: "",
    basePrice: "",
    status: "Active",
  });

  // Sync state if initialData is provided (for Editing)
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

    // Simple validation to prevent 400 errors
    if (cleanData.totalSlots <= 0 || cleanData.basePrice < 0) {
      alert("Please enter valid numbers for slots and price.");
      return;
    }

    onSubmit(cleanData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Info size={16} className="text-emerald-500" /> Parking Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Grand Plaza Underground"
            className="w-full p-3 text-emerald-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            required
          />
        </div>

        {/* Location Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <MapPin size={16} className="text-emerald-500" /> Address / City
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Sector 4, New York"
            className="w-full p-3 text-emerald-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            required
          />
        </div>

        {/* Slots Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Car size={16} className="text-emerald-500" /> Total Capacity
          </label>
          <input
            name="totalSlots"
            value={formData.totalSlots}
            onChange={handleChange}
            type="number"
            placeholder="Total slots"
            className="w-full p-3 text-emerald-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            required
          />
        </div>

        {/* Pricing Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <DollarSign size={16} className="text-emerald-500" /> Hourly Rate
          </label>
          <input
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            type="number"
            placeholder="Price per hour"
            className="w-full p-3 text-emerald-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            required
          />
        </div>

        {/* Status Select */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Operating Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 text-emerald-700 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          >
            <option value="Active">Active / Operational</option>
            <option value="Maintenance">Under Maintenance</option>
            <option value="Closed">Temporarily Closed</option>
          </select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all flex items-center gap-2"
        >
          <X size={18} /> Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <Save size={18} />{" "}
              {initialData ? "Update Location" : "Save Location"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ParkingForm;
