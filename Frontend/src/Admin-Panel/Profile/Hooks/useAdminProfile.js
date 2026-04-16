import { useEffect, useState } from "react";
import { getAdminProfile, updateAdminProfile } from "../Services/profileService";

const useAdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAdminProfile();
      setProfile(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updates) => {
    try {
      setUpdating(true);
      setError("");
      setSuccessMessage("");
      
      const updatedProfile = await updateAdminProfile(updates);
      setProfile(updatedProfile);
      setSuccessMessage("Profile updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
      return updatedProfile;
    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Failed to update profile";
      setError(errorMsg);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    updating,
    error,
    successMessage,
    fetchProfile,
    handleUpdateProfile,
  };
};

export default useAdminProfile;
