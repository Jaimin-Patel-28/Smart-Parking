import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import bookingService from "../Services/bookingService";

const useBookingDetails = (bookingId) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooking = useCallback(async () => {
    if (!bookingId) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await bookingService.getBookingDetails(bookingId);
      setBooking(data?.booking || data?.data || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load booking details");
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  const cancelBooking = useCallback(async () => {
    if (!bookingId) return;

    setActionLoading(true);

    try {
      await bookingService.cancelBooking(bookingId);
      toast.success("Booking cancelled");
      await fetchBooking();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [bookingId, fetchBooking]);

  const extendBooking = useCallback(
    async (extraHours) => {
      if (!bookingId) return;

      setActionLoading(true);

      try {
        const { data } = await bookingService.extendBooking(bookingId, extraHours);
        setBooking(data?.booking || data?.data || data);
        toast.success("Booking extended");
        return data?.booking || data?.data || data;
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to extend booking");
        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [bookingId],
  );

  const editBooking = useCallback(
    async (updates) => {
      if (!bookingId) return;

      setActionLoading(true);

      try {
        const { data } = await bookingService.editBooking(bookingId, updates);
        setBooking(data?.booking || data?.data || data);
        toast.success("Booking updated");
        return data?.booking || data?.data || data;
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update booking");
        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [bookingId],
  );

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  return {
    booking,
    loading,
    actionLoading,
    error,
    fetchBooking,
    cancelBooking,
    extendBooking,
    editBooking,
  };
};

export default useBookingDetails;
