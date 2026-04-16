import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import bookingService from "../../MyBookings/Services/bookingService";
import walletService from "../../Wallet/Services/walletService";

const normalizeBookings = (bookings = []) =>
  bookings.map((booking) => ({
    type: "booking",
    id: booking._id,
    bookingCode: booking.bookingCode || `BK-${String(booking._id).slice(-6).toUpperCase()}`,
    title: booking.parking?.name || "Parking booking",
    subtitle: booking.slot?.label
      ? `Slot ${booking.slot.label}`
      : `${booking.status || "booking"} booking`,
    status: booking.status || "confirmed",
    createdAt: booking.createdAt || booking.startTime,
    raw: booking,
  }));

const normalizeTransactions = (transactions = []) =>
  transactions.map((transaction) => ({
    type: "transaction",
    id: transaction._id,
    transactionId: transaction._id,
    title:
      transaction.description ||
      `${transaction.type || "wallet"} transaction`,
    subtitle: `${transaction.type || "wallet"} · ${transaction.status || "success"}`,
    status: transaction.status || "success",
    createdAt: transaction.createdAt,
    raw: transaction,
  }));

const useSupportActivity = () => {
  const { user } = useAuth();
  const userId = user?._id || user?.id;
  const [bookingItems, setBookingItems] = useState([]);
  const [transactionItems, setTransactionItems] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [error, setError] = useState(null);

  const selectedBookingItems = useMemo(
    () => bookingItems.slice(0, 3),
    [bookingItems],
  );

  const selectedTransactionItems = useMemo(
    () => transactionItems.slice(0, 3),
    [transactionItems],
  );

  const fetchBookings = useCallback(async () => {
    if (!userId) {
      setBookingItems([]);
      setLoadingBookings(false);
      return;
    }

    setLoadingBookings(true);
    setError(null);

    try {
      const [currentResponse, upcomingResponse, historyResponse] = await Promise.all([
        bookingService.getCurrentBookings(),
        bookingService.getUpcomingBookings(),
        bookingService.getPastBookings(),
      ]);

      const currentBookings = currentResponse?.data || [];
      const upcomingBookings = upcomingResponse?.data || [];
      const historyBookings = historyResponse?.data || [];

      const combined = [...currentBookings, ...upcomingBookings, ...historyBookings];
      const unique = Array.from(
        new Map(combined.map((booking) => [booking._id, booking])).values(),
      );

      setBookingItems(normalizeBookings(unique).slice(0, 6));
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Failed to load recent bookings.",
      );
    } finally {
      setLoadingBookings(false);
    }
  }, [userId]);

  const fetchTransactions = useCallback(async () => {
    if (!userId) {
      setTransactionItems([]);
      setLoadingTransactions(false);
      return;
    }

    setLoadingTransactions(true);
    setError(null);

    try {
      const { data } = await walletService.getTransactions({ limit: 6 });
      const transactions = data?.data?.transactions || data?.transactions || [];
      setTransactionItems(normalizeTransactions(transactions).slice(0, 6));
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Failed to load recent transactions.",
      );
    } finally {
      setLoadingTransactions(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBookings();
    fetchTransactions();
  }, [fetchBookings, fetchTransactions]);

  return {
    bookingItems: selectedBookingItems,
    transactionItems: selectedTransactionItems,
    loadingBookings,
    loadingTransactions,
    error,
    refreshActivity: () => Promise.all([fetchBookings(), fetchTransactions()]),
  };
};

export default useSupportActivity;