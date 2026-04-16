import { useState, useEffect, useCallback } from "react";
import { transactionService } from "../Services/transactionService";

export const useTransactions = (initialFilters = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  // Filter state based on your backend query params
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    type: "", // 'credit' or 'debit'
    status: "", // 'success', 'failed', 'pending'
    startDate: "",
    endDate: "",
    ...initialFilters,
  });

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await transactionService.getTransactions(filters);

      // Based on your backend: { success: true, page, totalPages, totalRecords, data }
      setTransactions(res.data.data);
      setPagination({
        currentPage: res.data.page,
        totalPages: res.data.totalPages,
        totalRecords: res.data.totalRecords,
      });
    } catch (err) {
      console.error("Transaction fetch error:", err);
      setError(err?.response?.data?.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 })); // Reset to page 1 on filter change
  };

  const changePage = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return {
    transactions,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
    refresh: fetchTransactions,
  };
};
