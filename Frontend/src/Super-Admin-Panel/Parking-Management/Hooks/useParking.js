import { useState, useEffect } from "react";
import { parkingService } from "../Services/parkingService";

export const useParking = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParkings = async () => {
    try {
      setLoading(true);
      const res = await parkingService.getAll();
      setParkings(res.data);
    } catch (err) {
      console.error("Error fetching parkings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkings();
  }, []);

  return { parkings, loading, refresh: fetchParkings };
};
