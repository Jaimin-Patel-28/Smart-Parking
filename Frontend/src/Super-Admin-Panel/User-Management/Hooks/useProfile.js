import { useCallback, useEffect, useState } from "react";
import { profileService } from "../Services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await profileService.getMyProfile();
      setProfile(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveProfile = async (payload) => {
    try {
      setSaving(true);
      setError("");
      const res = await profileService.updateMyProfile(payload);
      setProfile(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to update profile";
      setError(message);
      return { success: false, message };
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, saving, error, fetchProfile, saveProfile };
};
