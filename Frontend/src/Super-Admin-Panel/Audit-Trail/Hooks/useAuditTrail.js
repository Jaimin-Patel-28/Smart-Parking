import { useCallback, useEffect, useState } from "react";
import { auditTrailService } from "../Services/auditTrailService";

export const useAuditTrail = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    module: "",
    action: "",
    status: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await auditTrailService.getAuditTrails(filters);
      setLogs(data?.data || []);
      setPagination({
        page: data?.page || 1,
        totalPages: data?.totalPages || 1,
        totalRecords: data?.totalRecords || 0,
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch audit trail logs");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const updateFilters = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch, page: 1 }));
  };

  const changePage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return {
    logs,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    changePage,
    refresh: fetchLogs,
  };
};
