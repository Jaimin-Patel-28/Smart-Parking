import React, { useState } from "react";
import {
  BarChart3,
  IndianRupee,
  TrendingUp,
  Users,
  AlertCircle,
  Download,
  RefreshCw,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import { useReports } from "../hooks/useReports";
import ReportCard from "../components/ReportCard";
import ReportFilters from "../components/ReportFilters";

const Reports = () => {
  const { comprehensiveReport, revenueReport, occupancyReport, userReport, systemHealthReport, loading, error, refresh } =
    useReports();

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    reportType: "comprehensive",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      let y = 16;

      doc.setFontSize(18);
      doc.text("Smart Parking - Super Admin Report", 14, y);
      y += 8;

      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, y);
      y += 10;

      if (comprehensiveReport?.data) {
        const data = comprehensiveReport.data;
        doc.setFontSize(12);
        doc.text("Comprehensive Summary", 14, y);
        y += 7;
        doc.setFontSize(10);
        doc.text(`Total Revenue: INR ${Number(data.totalRevenue || 0).toLocaleString()}`, 14, y);
        y += 6;
        doc.text(`Occupancy Rate: ${data.occupancyRate || 0}%`, 14, y);
        y += 6;
        doc.text(`Active Users: ${data.activeUsers || 0} / ${data.totalUsers || 0}`, 14, y);
        y += 6;
        doc.text(`Completion Rate: ${data.completionRate || 0}%`, 14, y);
        y += 10;
      }

      if (revenueReport?.data?.revenueByParking?.length) {
        doc.setFontSize(12);
        doc.text("Revenue by Parking", 14, y);
        y += 7;
        doc.setFontSize(10);

        revenueReport.data.revenueByParking.slice(0, 15).forEach((item) => {
          if (y > 275) {
            doc.addPage();
            y = 16;
          }
          doc.text(
            `${item.parkingName}: INR ${Number(item.totalRevenue || 0).toLocaleString()} (${item.bookingsCount || 0} bookings)`,
            14,
            y,
          );
          y += 6;
        });
        y += 6;
      }

      const fileName = `super-admin-report-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(fileName);
      toast.success("PDF exported successfully");
    } catch (exportError) {
      toast.error("Failed to export PDF");
      console.error("PDF export failed", exportError);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-[#222222]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter flex items-center gap-4">
            <BarChart3 className="text-[#FA8112]" size={32} />
            Reports <span className="text-[#FA8112]">Center</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
            Comprehensive system analytics and operational insights
          </p>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#FA8112]/10 hover:bg-[#FAF3E1] transition-all active:scale-95"
        >
          <Download size={20} /> Export PDF
        </button>
      </div>

      {/* Filters Section */}
      <ReportFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onRefresh={refresh}
        loading={loading}
      />

      {error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-300 text-sm font-semibold">
          {error}
        </div>
      ) : null}

      {/* Comprehensive Overview Cards */}
      {comprehensiveReport && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <ReportCard
            title="Total Revenue"
            icon={IndianRupee}
            value={`₹${(comprehensiveReport.data?.totalRevenue || 0).toLocaleString()}`}
            bgColor="from-emerald-500/10 to-emerald-400/5"
          />
          <ReportCard
            title="Occupancy Rate"
            icon={MapPin}
            value={`${comprehensiveReport.data?.occupancyRate || 0}%`}
            bgColor="from-blue-500/10 to-blue-400/5"
          />
          <ReportCard
            title="Active Users"
            icon={Users}
            value={comprehensiveReport.data?.activeUsers || 0}
            subtitle={`of ${comprehensiveReport.data?.totalUsers || 0}`}
            bgColor="from-purple-500/10 to-purple-400/5"
          />
          <ReportCard
            title="Total Bookings"
            icon={TrendingUp}
            value={comprehensiveReport.data?.completionRate || 0}
            subtitle="Completion Rate"
            bgColor="from-orange-500/10 to-orange-400/5"
          />
          <ReportCard
            title="System Status"
            icon={AlertCircle}
            value="Healthy"
            bgColor="from-green-500/10 to-green-400/5"
          />
        </div>
      )}

      {/* Revenue Report Section */}
      {revenueReport && (
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <IndianRupee className="text-[#FA8112]" size={24} />
            <h2 className="text-xl font-black text-[#FAF3E1] uppercase tracking-tighter">
              Revenue <span className="text-[#FA8112]">Analysis</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5">
                <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest mb-2">
                  Total Revenue
                </p>
                <p className="text-3xl font-black text-emerald-400 tracking-tighter">
                  ₹{(revenueReport.data?.totalRevenue || 0).toLocaleString()}
                </p>
              </div>

              <div className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5">
                <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest mb-2">
                  Period
                </p>
                <p className="text-sm font-bold text-[#FAF3E1]">
                  {revenueReport.data?.period?.startDate || "All Time"}
                </p>
              </div>

              <div className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5">
                <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest mb-2">
                  Report Generated
                </p>
                <p className="text-sm font-bold text-[#FAF3E1]">
                  {new Date(revenueReport.generatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Revenue by Parking */}
            {revenueReport.data?.revenueByParking && (
              <div className="mt-6">
                <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest mb-4">
                  Revenue by Parking Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {revenueReport.data.revenueByParking.map((item) => (
                    <div
                      key={item._id}
                      className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5 hover:border-[#FA8112]/20 transition-all"
                    >
                      <p className="text-sm font-black text-[#FAF3E1] mb-2">
                        {item.parkingName}
                      </p>
                      <p className="text-2xl font-black text-[#FA8112] mb-4">
                        ₹{item.totalRevenue.toLocaleString()}
                      </p>
                      <p className="text-[10px] font-black text-[#FAF3E1]/40">
                        {item.bookingsCount} Bookings
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Occupancy Report Section */}
      {occupancyReport && (
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="text-[#FA8112]" size={24} />
            <h2 className="text-xl font-black text-[#FAF3E1] uppercase tracking-tighter">
              Occupancy <span className="text-[#FA8112]">Status</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {occupancyReport.data && occupancyReport.data.map((parking) => (
              <div
                key={parking.parkingId}
                className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5"
              >
                <p className="text-sm font-black text-[#FAF3E1] mb-2">
                  {parking.parkingName}
                </p>
                <p className="text-[10px] font-black text-[#FAF3E1]/40 mb-4 uppercase tracking-widest">
                  {parking.location}
                </p>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-[#FAF3E1]/60">
                        Occupancy
                      </span>
                      <span className="text-sm font-black text-[#FA8112]">
                        {parking.occupancyRate}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#FAF3E1]/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FA8112] rounded-full transition-all"
                        style={{ width: `${parking.occupancyRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs font-black text-[#FAF3E1]">
                        {parking.occupiedSlots}
                      </p>
                      <p className="text-[8px] text-[#FAF3E1]/40">Occupied</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#FAF3E1]">
                        {parking.availableSlots}
                      </p>
                      <p className="text-[8px] text-[#FAF3E1]/40">Available</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#FAF3E1]">
                        {parking.totalSlots}
                      </p>
                      <p className="text-[8px] text-[#FAF3E1]/40">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Report Section */}
      {userReport && (
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-[#FA8112]" size={24} />
            <h2 className="text-xl font-black text-[#FAF3E1] uppercase tracking-tighter">
              User <span className="text-[#FA8112]">Analytics</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5">
              <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest mb-2">
                Total Users
              </p>
              <p className="text-3xl font-black text-[#FAF3E1]">
                {userReport.data?.summary?.totalUsers || 0}
              </p>
            </div>
            <div className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5">
              <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest mb-2">
                Active Users
              </p>
              <p className="text-3xl font-black text-emerald-400">
                {userReport.data?.summary?.activeUsers || 0}
              </p>
            </div>
            <div className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5">
              <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest mb-2">
                Inactive Users
              </p>
              <p className="text-3xl font-black text-orange-400">
                {userReport.data?.summary?.inactiveUsers || 0}
              </p>
            </div>
            <div className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5">
              <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest mb-2">
                Admins
              </p>
              <p className="text-3xl font-black text-blue-400">
                {userReport.data?.summary?.adminUsers || 0}
              </p>
            </div>
            <div className="bg-[#222222] rounded-2xl p-6 border border-[#F5E7C6]/5">
              <p className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-widest mb-2">
                Regular Users
              </p>
              <p className="text-3xl font-black text-purple-400">
                {userReport.data?.summary?.regularUsers || 0}
              </p>
            </div>
          </div>

          {/* Top Users */}
          {userReport.data?.topUsers && userReport.data.topUsers.length > 0 && (
            <div>
              <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest mb-4">
                Top 10 Users by Spending
              </h3>
              <div className="space-y-3">
                {userReport.data.topUsers.map((user, idx) => (
                  <div
                    key={user.userId}
                    className="bg-[#222222] rounded-xl p-4 border border-[#F5E7C6]/5 flex items-center justify-between hover:border-[#FA8112]/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FA8112]/20 rounded-lg flex items-center justify-center text-[#FA8112] font-black">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="font-black text-[#FAF3E1]">{user.fullName}</p>
                        <p className="text-[10px] text-[#FAF3E1]/40">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-[#FA8112]">
                        ₹{user.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-[#FAF3E1]/40">
                        {user.totalBookings} bookings
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {loading && (
        <div className="min-h-96 flex flex-col items-center justify-center gap-4">
          <RefreshCw className="h-10 w-10 animate-spin text-[#FA8112]" />
          <p className="font-black text-[#FAF3E1]/40 uppercase tracking-[0.3em] text-[10px]">
            Generating Reports...
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center">
        <p className="text-[9px] font-black text-[#FAF3E1]/10 uppercase tracking-[0.5em]">
          Report Generated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Reports;
