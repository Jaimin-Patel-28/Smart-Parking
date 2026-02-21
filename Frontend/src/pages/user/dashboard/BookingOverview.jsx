import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock4,
  History,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingOverview = () => {
  const navigate = useNavigate();

  const bookings = [
    {
      id: 1,
      loc: "Anand Central Mall",
      date: "Feb 1, 2026",
      duration: "2h 30m",
      status: "Completed",
      type: "success",
    },
    {
      id: 2,
      loc: "Gujarat Hub Node",
      date: "Jan 30, 2026",
      duration: "1h 15m",
      status: "Cancelled",
      type: "error",
    },
    {
      id: 3,
      loc: "Station Road P1",
      date: "Jan 28, 2026",
      duration: "4h 00m",
      status: "Pending",
      type: "warn",
    },
  ];

  const getStatusStyle = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700";
      case "error":
        return "bg-red-100 text-red-700";
      case "warn":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
            <History size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#222222]">
              Recent Bookings
            </h2>
            <p className="text-sm text-[#6B6B6B]">
              Overview of your latest parking sessions
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/user/bookings/history")}
          className="text-sm text-[#FA8112] hover:underline"
        >
          View all
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-4 pb-3 mb-4 text-sm text-[#6B6B6B] border-b border-[#F5E7C6]">
        <span>Location</span>
        <span className="text-center">Date</span>
        <span className="text-center">Duration</span>
        <span className="text-right">Status</span>
      </div>

      {/* Booking List */}
      <ul className="space-y-3">
        {bookings.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 rounded-xl hover:bg-[#FAF3E1] transition cursor-pointer"
          >
            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
                <MapPin size={16} />
              </div>
              <span className="text-sm font-medium text-[#222222]">
                {item.loc}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-center gap-2 text-sm text-[#6B6B6B]">
              <Calendar size={14} />
              {item.date}
            </div>

            {/* Duration */}
            <div className="flex items-center justify-center gap-2 text-sm text-[#6B6B6B]">
              <Clock size={14} />
              {item.duration}
            </div>

            {/* Status */}
            <div className="flex items-center justify-end gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  item.type,
                )}`}
              >
                {item.type === "success" && (
                  <CheckCircle2 size={12} className="inline mr-1" />
                )}
                {item.type === "error" && (
                  <XCircle size={12} className="inline mr-1" />
                )}
                {item.type === "warn" && (
                  <Clock4 size={12} className="inline mr-1" />
                )}
                {item.status}
              </span>

              <ChevronRight
                size={16}
                className="text-[#6B6B6B] group-hover:translate-x-1 transition"
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Mobile View Button */}
      <div className="mt-6 md:hidden">
        <button
          onClick={() => navigate("/user/bookings/history")}
          className="w-full py-3 bg-[#FA8112] text-white rounded-lg text-sm hover:bg-[#e6730f] transition"
        >
          View Full History
        </button>
      </div>
    </section>
  );
};

export default BookingOverview;
