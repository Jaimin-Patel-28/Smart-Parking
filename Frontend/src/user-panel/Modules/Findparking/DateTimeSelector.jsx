import React, { useState, useEffect } from "react";
import { Calendar, Clock, Hourglass, Info, AlertCircle } from "lucide-react";

const DateTimeSelector = ({
  bookingDate,
  startTime,
  endTime,
  duration,
  onUpdate,
}) => {
  const [localBookingDate, setLocalBookingDate] = useState(
    bookingDate || new Date().toISOString().split("T")[0],
  );
  const [localStartTime, setLocalStartTime] = useState(startTime || "09:00");
  const [localEndTime, setLocalEndTime] = useState(endTime || "11:30");
  const [localDuration, setLocalDuration] = useState(duration || "02:30 Hrs");

  // 1. Logic to calculate duration and update parent ONLY when local state changes
  useEffect(() => {
    if (localStartTime && localEndTime) {
      const [startH, startM] = localStartTime.split(":").map(Number);
      const [endH, endM] = localEndTime.split(":").map(Number);

      const startTotalMinutes = startH * 60 + startM;
      const endTotalMinutes = endH * 60 + endM;

      if (endTotalMinutes > startTotalMinutes) {
        const diff = endTotalMinutes - startTotalMinutes;
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        const newDuration = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} Hrs`;

        setLocalDuration(newDuration);

        // 🟢 GUARD: Only call onUpdate if the values are actually different from the props
        // This stops the infinite loop
        if (
          localBookingDate !== bookingDate ||
          localStartTime !== startTime ||
          localEndTime !== endTime ||
          newDuration !== duration
        ) {
          onUpdate({
            bookingDate: localBookingDate,
            startTime: localStartTime,
            endTime: localEndTime,
            duration: newDuration,
          });
        }
      } else {
        setLocalDuration("Invalid Range");
      }
    }
    // 🟢 Removed 'onUpdate' from dependencies to prevent re-triggering the loop
  }, [localStartTime, localEndTime, localBookingDate]);

  // 2. Sync local state IF props change from outside (e.g., reset or navigation)
  useEffect(() => {
    if (bookingDate && bookingDate !== localBookingDate)
      setLocalBookingDate(bookingDate);
    if (startTime && startTime !== localStartTime) setLocalStartTime(startTime);
    if (endTime && endTime !== localEndTime) setLocalEndTime(endTime);
    if (duration && duration !== localDuration) setLocalDuration(duration);
  }, [bookingDate, startTime, endTime, duration]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#FA8112]/20 rounded-lg">
          <Calendar className="text-[#FA8112]" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">Date & Time</h2>
          <p className="text-[#FAF3E1]/40 text-xs uppercase tracking-widest font-semibold">
            Timeline Node
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/40 ml-1">
            Arrival Date
          </label>
          <div className="relative group">
            <Calendar
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
              size={16}
            />
            <input
              type="date"
              value={localBookingDate}
              onChange={(e) => setLocalBookingDate(e.target.value)}
              className="w-full bg-[#222222] border border-[#F5E7C6]/10 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAF3E1] focus:outline-none focus:border-[#FA8112]/50 transition-all appearance-none"
            />
          </div>
        </div>

        {/* Start Time */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/40 ml-1">
            Start Node
          </label>
          <div className="relative group">
            <Clock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
              size={16}
            />
            <input
              type="time"
              value={localStartTime}
              onChange={(e) => setLocalStartTime(e.target.value)}
              className="w-full bg-[#222222] border border-[#F5E7C6]/10 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAF3E1] focus:outline-none focus:border-[#FA8112]/50 transition-all"
            />
          </div>
        </div>

        {/* End Time */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/40 ml-1">
            End Node
          </label>
          <div className="relative group">
            <Clock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
              size={16}
            />
            <input
              type="time"
              value={localEndTime}
              onChange={(e) => setLocalEndTime(e.target.value)}
              className="w-full bg-[#222222] border border-[#F5E7C6]/10 rounded-xl py-3 pl-11 pr-4 text-sm text-[#FAF3E1] focus:outline-none focus:border-[#FA8112]/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${localDuration === "Invalid Range" ? "bg-red-500/10" : "bg-[#FA8112]/10"}`}
          >
            <Hourglass
              size={18}
              className={
                localDuration === "Invalid Range"
                  ? "text-red-500"
                  : "text-[#FA8112]"
              }
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/40">
              Total Duration
            </p>
            <p
              className={`text-lg font-bold ${localDuration === "Invalid Range" ? "text-red-500" : "text-[#FAF3E1]"}`}
            >
              {localDuration}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#FAF3E1]/40">
          <Info size={14} className="text-[#FA8112]" />
          <span className="text-xs">Grace period: 15 minutes included</span>
        </div>
      </div>

      {localDuration === "Invalid Range" && (
        <div className="flex items-center gap-2 text-red-400 text-xs animate-pulse">
          <AlertCircle size={14} />
          <span>Exit time must be later than arrival time</span>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
