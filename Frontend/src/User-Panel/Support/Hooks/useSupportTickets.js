import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import supportService from "../../../Shared/Services/supportService";

const useSupportTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reopening, setReopening] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);

  const fetchTickets = useCallback(async () => {
    if (!user?._id && !user?.id) {
      setTickets([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await supportService.getMyTickets({
        limit: 8,
        status: statusFilter,
      });
      setTickets(data?.data?.tickets || []);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Failed to load your support tickets.",
      );
    } finally {
      setLoading(false);
    }
  }, [statusFilter, user?._id, user?.id]);

  const reopenTicket = useCallback(
    async (ticketId) => {
      setReopening(true);

      try {
        await supportService.reopenMyTicket(ticketId);
        toast.success("Ticket reopened successfully.");
        await fetchTickets();
      } catch (requestError) {
        toast.error(
          requestError?.response?.data?.message || "Failed to reopen ticket.",
        );
      } finally {
        setReopening(false);
      }
    },
    [fetchTickets],
  );

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    loading,
    reopening,
    statusFilter,
    setStatusFilter,
    error,
    reopenTicket,
    refreshTickets: fetchTickets,
  };
};

export default useSupportTickets;