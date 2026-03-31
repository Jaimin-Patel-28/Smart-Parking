import { useState, useEffect, useCallback } from "react";
import { bookingService } from "../Services/bookingService";

export const useBookings = (initialStatus = "") => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(initialStatus);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await bookingService.getAll(status);
      setBookings(res.data.data); // Based on your backend { success: true, data: [...] }
    } catch (err) {
      console.error("Fetch bookings failed", err);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, loading, status, setStatus, refresh: fetchBookings };
};
