import { useEffect, useState } from "react";
import {
  getAdminBookings,
  markEntry,
  markExit,
} from "../Services/adminBookingService";

const useAdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminBookings();
      setBookings(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleEntry = async (id) => {
    const previous = bookings;

    try {
      setError("");
      setBookings((current) =>
        current.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status: "active",
                entryTime: new Date().toISOString(),
              }
            : booking,
        ),
      );

      await markEntry(id);
      await fetchBookings();
    } catch (err) {
      setBookings(previous);
      setError(err?.response?.data?.message || err.message || "Failed to mark entry");
      throw err;
    }
  };

  const handleExit = async (id) => {
    const previous = bookings;

    try {
      setError("");
      setBookings((current) =>
        current.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status: "completed",
                exitTime: new Date().toISOString(),
              }
            : booking,
        ),
      );

      await markExit(id);
      await fetchBookings();
    } catch (err) {
      setBookings(previous);
      setError(err?.response?.data?.message || err.message || "Failed to mark exit");
      throw err;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    handleEntry,
    handleExit,
  };
};

export default useAdminBookings;
