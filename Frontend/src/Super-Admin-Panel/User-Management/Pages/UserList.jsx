import React, { useState } from "react";
import { useUsers } from "../Hooks/useUsers";
import { userService } from "../Services/userService";
import UserTable from "../Components/UserTable";
import UserSearch from "../Components/UserSearch";
import { Users, UserPlus, Database, Activity, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmDialog from "../../../app/Components/ConfirmDialog";

const UserList = () => {
  const { users, loading, error, searchTerm, setSearchTerm, refresh } =
    useUsers();
  const [processingId, setProcessingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleStatusToggle = async (id) => {
    setProcessingId(id);
    try {
      await userService.toggleStatus(id);
      toast.success("Protocol: Status Sequence Updated");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Status Update Failure");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    setUserToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    const id = userToDelete;
    setShowDeleteConfirm(false);
    setUserToDelete(null);

    try {
      await userService.deleteUser(id);
      toast.success("Registry Entry Purged");
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Purge Protocol Failed");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. REGISTRY HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Database size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              IAM Protocol
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            User <span className="text-[#FA8112]">Directory</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest leading-relaxed">
            Manage system permissions, identity authorization, and global access
            levels.
          </p>
        </div>

        <button
          onClick={() => navigate("/super-admin/create-admin")}
          className="flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] px-8 py-2.5 rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-[#FA8112]/10 hover:bg-[#FAF3E1] transition-all active:scale-95"
        >
          <UserPlus size={16} strokeWidth={2.5} />
          Initialize_Admin_Node
        </button>
      </div>

      {/* 2. SEARCH INTERFACE */}
      <UserSearch
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={handleClearSearch}
        isLoading={loading}
      />

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-4 text-rose-400 text-[11px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} />
            Registry Sync Error: {error}
          </div>
        </div>
      )}

      {/* 3. DATA VIEWPORT */}
      <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl overflow-hidden shadow-2xl min-h-[500px] relative">
        {!loading && users.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#FAF3E1]/5 blur-3xl rounded-full" />
              <div className="relative bg-[#FAF3E1]/[0.02] p-12 rounded-xl border border-[#F5E7C6]/5 text-[#FAF3E1]/5">
                <Users size={64} strokeWidth={1} />
              </div>
            </div>
            <div className="space-y-4 relative z-10">
              <p className="text-[#FAF3E1]/20 font-bold uppercase tracking-[0.4em] text-[10px]">
                Zero Registry Sequences Identified
              </p>
              <button
                onClick={handleClearSearch}
                className="inline-flex items-center gap-2 text-[#FA8112] font-bold text-[10px] uppercase tracking-widest hover:text-[#FAF3E1] transition-colors"
              >
                <Activity size={12} /> Reset_Query_Parameters
              </button>
            </div>
          </div>
        ) : (
          <UserTable
            users={users}
            onToggleStatus={handleStatusToggle}
            onDelete={handleDelete}
            processingId={processingId}
          />
        )}
      </div>

      {/* 4. SYSTEM METADATA */}
      <div className="flex flex-col items-center gap-4 pt-4 opacity-20">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <Activity size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          Identity Access Management Node • Site_Auth_V1.0.9
        </p>
      </div>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="IDENTITY_PURGE_PROTOCOL"
        message="Authorize permanent removal of user identity from the central registry? This action is irreversible."
        confirmLabel="Authorize Purge"
        intent="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
};

export default UserList;
