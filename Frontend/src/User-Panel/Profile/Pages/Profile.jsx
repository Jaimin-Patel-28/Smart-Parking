import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import useProfile from "../Hooks/useProfile";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";
import {
  Loader2,
  User,
  Bike,
  Car,
  Trash2,
  Mail,
  Phone,
  ShieldCheck,
  Plus,
  MapPin,
  Terminal,
  Activity,
  Database,
  Fingerprint,
  ChevronRight,
} from "lucide-react";

// --- System Components ---

const Button = ({
  children,
  onClick,
  disabled,
  className = "",
  type = "button",
  variant = "default",
}) => {
  const variants = {
    default:
      "bg-[#FA8112] text-[#222222] hover:bg-[#FAF3E1] shadow-2xl shadow-[#FA8112]/10",
    outline:
      "border border-[#F5E7C6]/5 bg-[#1a1a1a] text-[#FAF3E1]/40 hover:border-[#FA8112]/40 hover:text-[#FA8112]",
    ghost: "text-rose-500/40 hover:text-rose-400 hover:bg-rose-500/5",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${variants[variant]} px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3 ${className}`}
    >
      {children}
    </button>
  );
};

const ProfileCard = ({ children, title, icon: Icon, className = "" }) => (
  <div
    className={`bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl overflow-hidden shadow-2xl ${className}`}
  >
    <div className="px-8 py-5 border-b border-[#F5E7C6]/5 flex items-center justify-between bg-[#1a1a1a]/50">
      <div className="flex items-center gap-3">
        <Icon size={14} className="text-[#FA8112]/60" />
        <h3 className="text-[10px] font-bold text-[#FAF3E1]/40 uppercase tracking-[0.4em]">
          {title}
        </h3>
      </div>
      <Terminal size={12} className="opacity-10" />
    </div>
    <div className="p-8">{children}</div>
  </div>
);

// --- Main Engine Node ---

const Profile = () => {
  const { user } = useAuth();
  const {
    profile,
    vehicles,
    loading,
    updating,
    updateProfile,
    addVehicle,
    deleteVehicle,
    refreshProfile,
  } = useProfile();

  const [activeTab, setActiveTab] = useState("details");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [editData, setEditData] = useState({
    fullName: "",
    mobile: "",
    address: "",
  });
  const [newVehicle, setNewVehicle] = useState({
    vehicleType: "4wheel",
    vehicleNumber: "",
    color: "",
    model: "",
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        fullName: profile.fullName || "",
        mobile: profile.mobile || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  // --- LOGIC HANDLERS ---

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(editData);
    if (result.success) {
      toast.success("Identity_Updated");
      refreshProfile();
    } else toast.error(result.error);
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    const result = await addVehicle(newVehicle);
    if (result.success) {
      toast.success("Asset_Linked");
      setNewVehicle({
        vehicleType: "4wheel",
        vehicleNumber: "",
        color: "",
        model: "",
      });
      refreshProfile();
    } else toast.error(result.error);
  };

  const handleDeleteTrigger = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setShowDeleteConfirm(true);
  };

  // ✅ THIS WAS MISSING OR MISNAMED
  const confirmDeleteVehicle = async () => {
    if (!vehicleToDelete) return;
    const result = await deleteVehicle(vehicleToDelete);
    if (result.success) {
      toast.success("Asset_Purged");
      refreshProfile();
    } else {
      toast.error(result.error || "Deletions_Failed");
    }
    setShowDeleteConfirm(false);
    setVehicleToDelete(null);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative">
          <Loader2
            className="h-12 w-12 animate-spin text-[#FA8112]/20"
            strokeWidth={1}
          />
          <Fingerprint
            size={20}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FA8112] animate-pulse"
          />
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#FAF3E1]/10">
          Authenticating_Identity_Node...
        </p>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Node_Identity | SmartPark</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* 1. HEADER SECTOR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#FA8112]">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
                Security_Protocol_Active
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#FAF3E1] tracking-tight uppercase leading-none">
              User <span className="text-[#FA8112]">Identity</span>
            </h1>
            <p className="text-[#FAF3E1]/20 font-bold uppercase text-[9px] tracking-[0.3em] ml-1">
              Terminal: {user?.email?.split("@")[0].toUpperCase()} • Auth_Level:
              Authorized_User
            </p>
          </div>
          <Button onClick={refreshProfile} variant="outline">
            <Activity size={14} /> Sync_Identity
          </Button>
        </div>

        {/* 2. TAB CONTROLLER */}
        <div className="flex p-1 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl w-full md:w-fit shadow-2xl">
          {["details", "vehicles"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-10 py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 relative ${
                activeTab === tab
                  ? "bg-[#FA8112] text-[#222222] shadow-[0_0_20px_rgba(250,129,18,0.15)]"
                  : "text-[#FAF3E1]/20 hover:text-[#FAF3E1]/50"
              }`}
            >
              {tab === "details"
                ? "Identity_Manifest"
                : `Asset_Registry (${vehicles.length})`}
            </button>
          ))}
        </div>

        {/* 3. DYNAMIC CONTENT AREA */}
        {activeTab === "details" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-12 text-center relative overflow-hidden group shadow-2xl h-full">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FA8112]/40 to-transparent" />
                <div className="relative inline-block mb-8">
                  <div className="h-28 w-28 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl flex items-center justify-center text-[#FA8112] shadow-inner group-hover:border-[#FA8112]/20 transition-all duration-500">
                    <User size={48} strokeWidth={1} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-[#222222] border border-[#F5E7C6]/10 rounded-lg flex items-center justify-center shadow-2xl">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-[#FAF3E1] uppercase tracking-tight leading-none">
                  {profile?.fullName}
                </h2>
                <p className="text-[9px] font-bold text-[#FA8112]/60 uppercase tracking-[0.4em] mt-4 italic">
                  Verified_System_Node
                </p>

                <div className="mt-12 pt-12 border-t border-[#F5E7C6]/5 space-y-6 font-mono text-left">
                  <div className="flex items-center gap-4 text-[11px] text-[#FAF3E1]/30">
                    <Mail size={14} className="text-[#FA8112]/40 shrink-0" />{" "}
                    <span className="truncate">{profile?.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-[#FAF3E1]/30">
                    <Phone size={14} className="text-[#FA8112]/40 shrink-0" />{" "}
                    {profile?.mobile || "LINK_PENDING"}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ProfileCard title="Credential_Update_Console" icon={ShieldCheck}>
                <form onSubmit={handleProfileEdit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                        Full_Identity_Label
                      </label>
                      <input
                        value={editData.fullName}
                        onChange={(e) =>
                          setEditData({ ...editData, fullName: e.target.value })
                        }
                        className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 outline-none transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                        Mobile_Access_Link
                      </label>
                      <input
                        value={editData.mobile}
                        onChange={(e) =>
                          setEditData({ ...editData, mobile: e.target.value })
                        }
                        className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 outline-none transition-all shadow-inner tabular-nums"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                        Default_Spatial_Anchor
                      </label>
                      <div className="relative">
                        <MapPin
                          size={16}
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FA8112]/20"
                        />
                        <input
                          value={editData.address}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              address: e.target.value,
                            })
                          }
                          className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-4 pl-16 pr-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 outline-none transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" disabled={updating}>
                    {updating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Commit_Identity_Changes <ChevronRight size={14} />
                      </>
                    )}
                  </Button>
                </form>
              </ProfileCard>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            <div className="xl:col-span-5">
              <ProfileCard title="Register_New_Asset" icon={Plus}>
                <form onSubmit={handleAddVehicle} className="space-y-8">
                  <div className="flex gap-4 p-1.5 bg-[#1a1a1a] rounded-xl border border-[#F5E7C6]/5">
                    {["2wheel", "4wheel"].map((type) => (
                      <label key={type} className="flex-1 cursor-pointer group">
                        <input
                          type="radio"
                          name="vehicleType"
                          value={type}
                          checked={newVehicle.vehicleType === type}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              vehicleType: e.target.value,
                            })
                          }
                          className="hidden"
                        />
                        <div
                          className={`py-4 rounded-lg border text-center transition-all duration-500 ${newVehicle.vehicleType === type ? "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-xl" : "bg-transparent border-transparent text-[#FAF3E1]/10 hover:text-[#FAF3E1]/30"}`}
                        >
                          {type === "2wheel" ? (
                            <Bike size={20} className="mx-auto" />
                          ) : (
                            <Car size={20} className="mx-auto" />
                          )}
                          <p className="text-[8px] font-bold uppercase mt-2 tracking-widest">
                            {type === "2wheel" ? "Bike" : "Car"}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                      Asset_Identifier_Tag
                    </label>
                    <input
                      value={newVehicle.vehicleNumber}
                      onChange={(e) =>
                        setNewVehicle({
                          ...newVehicle,
                          vehicleNumber: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="e.g. GJ01AB1234"
                      className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 outline-none transition-all placeholder:opacity-5 tabular-nums"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                        Asset_Chroma
                      </label>
                      <input
                        value={newVehicle.color}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            color: e.target.value,
                          })
                        }
                        className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 outline-none transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                        Unit_Model
                      </label>
                      <input
                        value={newVehicle.model}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            model: e.target.value,
                          })
                        }
                        className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg py-4 px-6 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={updating} className="w-full">
                    Link_Asset_to_Identity
                  </Button>
                </form>
              </ProfileCard>
            </div>

            <div className="xl:col-span-7">
              <ProfileCard title="Active_Mobility_Fleet" icon={Database}>
                {vehicles.length === 0 ? (
                  <div className="text-center py-24 bg-[#1a1a1a]/40 rounded-xl border border-dashed border-[#F5E7C6]/10">
                    <Activity size={32} className="mx-auto mb-6 opacity-5" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
                      Zero_Fleet_Signal
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {vehicles.map((v) => (
                      <div
                        key={v._id}
                        className="group flex items-center justify-between p-5 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl hover:border-[#FA8112]/30 transition-all duration-500 shadow-2xl"
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`p-4 rounded-lg border ${v.vehicleType === "2wheel" ? "bg-sky-500/5 border-sky-500/20 text-sky-400" : "bg-[#FA8112]/5 border-[#FA8112]/20 text-[#FA8112]"}`}
                          >
                            {v.vehicleType === "2wheel" ? (
                              <Bike size={20} />
                            ) : (
                              <Car size={20} />
                            )}
                          </div>
                          <div>
                            <p className="text-xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter leading-none uppercase">
                              {v.vehicleNumber}
                            </p>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/20 mt-2 font-mono">
                              Model: {v.model || "GENERIC"} // Chroma:{" "}
                              {v.color || "NULL"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteTrigger(v._id)}
                          className="p-3 rounded-lg bg-rose-500/5 text-rose-500/20 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </ProfileCard>
            </div>
          </div>
        )}

        <ConfirmDialog
          open={showDeleteConfirm}
          title="Protocol_Purge_Sequence"
          message="Confirm permanent decoupling of mobility asset? This action is immutable."
          confirmLabel="Purge_Asset"
          intent="danger"
          onConfirm={confirmDeleteVehicle}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setVehicleToDelete(null);
          }}
        />
      </div>
    </>
  );
};

export default Profile;
