import { useState, useEffect, useCallback } from "react";
import { slotService } from "../Services/slotService";

export const useSlots = (parkingId) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = useCallback(async () => {
    try {
      setLoading(true);
      const res = await slotService.getSlotsByParking(parkingId);
      setSlots(res.data);
    } catch (err) {
      console.error("Failed to fetch slots", err);
    } finally {
      setLoading(false);
    }
  }, [parkingId]);

  // Auto-refresh every 30 seconds for real-time sync
  useEffect(() => {
    if (parkingId) {
      fetchSlots();
      
      const interval = setInterval(() => {
        fetchSlots();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [parkingId, fetchSlots]);

  return { slots, loading, refresh: fetchSlots };
};

