import { useState, useEffect } from "react";
import { parkingService } from "../Services/parkingService";

export const useParking = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchParkings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await parkingService.getAll();
      setParkings(res.data);
    } catch (err) {
      console.error("Error fetching parkings", err);
      setError(err?.response?.data?.message || "Failed to fetch parking locations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkings();
  }, []);

  return { parkings, loading, error, refresh: fetchParkings };
};
