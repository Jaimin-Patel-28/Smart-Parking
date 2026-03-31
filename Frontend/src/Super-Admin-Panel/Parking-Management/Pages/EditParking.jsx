import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { parkingService } from "../Services/parkingService";
import ParkingForm from "../Components/ParkingForm";
import { ChevronLeft, Loader2 } from "lucide-react";

const EditParking = () => {
  const { id } = useParams(); // Gets the ID from the URL
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load the current data when the page opens
  useEffect(() => {
    const fetchParkingDetails = async () => {
      try {
        const response = await parkingService.getById(id);
        setInitialData(response.data);
      } catch (err) {
        console.error("Failed to load parking details", err);
        alert("Could not find this parking location.");
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
      navigate("/super-admin/parking"); // Redirect back to list on success
    } catch (err) {
      alert("Failed to update parking location.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors"
      >
        <ChevronLeft size={20} /> Back to List
      </button>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-800">
            Edit Parking Zone
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">
            Updating:{" "}
            <span className="text-emerald-600">
              ID {id.slice(-6).toUpperCase()}
            </span>
          </p>
        </div>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-slate-400 font-medium">Retrieving details...</p>
          </div>
        ) : (
          <ParkingForm
            initialData={initialData}
            onSubmit={handleUpdate}
            onCancel={() => navigate("/super-admin/parking")}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditParking;
