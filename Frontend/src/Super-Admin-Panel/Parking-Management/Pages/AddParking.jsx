import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parkingService } from "../Services/parkingService";
import ParkingForm from "../Components/ParkingForm";
import { ChevronLeft } from "lucide-react";

const AddParking = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Frontend: AddParking.jsx
  // Frontend: AddParking.jsx
  const handleAdd = async (formData) => {
    try {
      setLoading(true);

      // Ensure types are correct
      const cleanData = {
        ...formData,
        totalSlots: Number(formData.totalSlots),
        basePrice: Number(formData.basePrice),
      };

      await parkingService.create(cleanData);
      navigate("/super-admin/parking");
    } catch (err) {
      // This will now show the actual message from the backend
      const serverMessage =
        err.response?.data?.message || "Check your backend connection";
      console.error("Backend said:", serverMessage);
      alert("Error: " + serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors"
      >
        <ChevronLeft size={20} /> Back to List
      </button>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-800">Add New Zone</h1>
          <p className="text-slate-500 font-medium">
            Create a new parking asset in your database.
          </p>
        </div>

        <ParkingForm
          onSubmit={handleAdd}
          onCancel={() => navigate("/super-admin/parking")}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default AddParking;
