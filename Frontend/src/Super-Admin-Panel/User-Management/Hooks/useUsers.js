import { useState, useEffect, useCallback } from "react";
import { userService } from "../Services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await userService.getUsers(searchTerm);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 500); // 500ms debounce for search
    return () => clearTimeout(delayDebounce);
  }, [fetchUsers]);

  return { users, loading, searchTerm, setSearchTerm, refresh: fetchUsers };
};
