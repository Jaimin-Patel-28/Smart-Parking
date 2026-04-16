import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import walletService from "../Services/walletService";

const useWallet = () => {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSummary = useCallback(async () => {
    setLoadingSummary(true);
    setError(null);

    try {
      const { data } = await walletService.getSummary();
      setSummary(data?.data || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load wallet summary");
    } finally {
      setLoadingSummary(false);
    }
  }, []);

  const fetchTransactions = useCallback(async (params = {}) => {
    setLoadingTransactions(true);
    setError(null);

    try {
      const { data } = await walletService.getTransactions(params);
      setTransactions(data?.data?.transactions || data?.transactions || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoadingTransactions(false);
    }
  }, []);

  const topUpWallet = useCallback(async (amount) => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      toast.error("Enter a valid top-up amount");
      return;
    }

    setTopUpLoading(true);

    try {
      await walletService.topUpWallet(value);
      toast.success("Wallet updated successfully");
      await Promise.all([fetchSummary(), fetchTransactions()]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Top-up failed");
      throw err;
    } finally {
      setTopUpLoading(false);
    }
  }, [fetchSummary, fetchTransactions]);

  const onPaymentSuccess = useCallback((paymentData) => {
    // Refresh wallet data after successful payment
    return Promise.all([fetchSummary(), fetchTransactions()]);
  }, [fetchSummary, fetchTransactions]);

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
  }, [fetchSummary, fetchTransactions]);

  return {
    summary,
    transactions,
    loadingSummary,
    loadingTransactions,
    topUpLoading,
    error,
    fetchSummary,
    fetchTransactions,
    topUpWallet,
    onPaymentSuccess,
  };
};

export default useWallet;
