import { useEffect, useState } from "react";
import { getShiftMetrics } from "../Services/shiftService";

const useShiftMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("today");

  const fetchMetrics = async (range = "today") => {
    try {
      setLoading(true);
      setError("");
      setTimeRange(range);
      const data = await getShiftMetrics(range);
      setMetrics(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics("today");
  }, []);

  return {
    metrics,
    loading,
    error,
    timeRange,
    fetchMetrics,
  };
};

export default useShiftMetrics;
