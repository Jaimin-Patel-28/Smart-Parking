import React from "react";
import { Edit2, Trash2, MapPin, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParkingTable = ({ data, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto custom-scrollbar rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01]">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="text-[#FAF3E1]/20 text-[9px] uppercase tracking-[0.3em] font-bold bg-[#FAF3E1]/[0.02]">
            <th className="px-8 py-5 border-b border-[#F5E7C6]/5">
              Terminal Identity
            </th>
            <th className="px-6 py-5 border-b border-[#F5E7C6]/5">
              Bay Utilization
            </th>
            <th className="px-6 py-5 border-b border-[#F5E7C6]/5">
              Tariff Scale
            </th>
            <th className="px-6 py-5 border-b border-[#F5E7C6]/5">Status</th>
            <th className="px-8 py-5 border-b border-[#F5E7C6]/5 text-right">
              Operations
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((parking) => {
            const occupancyRate =
              (parking.occupiedSlots / parking.totalSlots) * 100 || 0;

            return (
              <tr
                key={parking._id}
                onClick={() =>
                  navigate(`/super-admin/parking/details/${parking._id}`)
                }
                className="group cursor-pointer transition-all duration-300 hover:bg-[#FAF3E1]/[0.03]"
              >
                {/* 1. Terminal Identity */}
                <td className="px-8 py-5 border-b border-[#F5E7C6]/5">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#FAF3E1] text-sm tracking-tight group-hover:text-[#FA8112] transition-colors">
                        {parking.name}
                      </span>
                      <ChevronRight
                        size={12}
                        className="text-[#FAF3E1]/10 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#FAF3E1]/30">
                      <MapPin size={10} className="text-[#FA8112]/40" />
                      <span className="uppercase tracking-widest">
                        {parking.location}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 2. Bay Utilization (Progress Bar) */}
                <td className="px-6 py-5 border-b border-[#F5E7C6]/5">
                  <div className="w-full max-w-[140px] space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-bold text-[#FAF3E1]/20 tabular-nums uppercase">
                        {parking.occupiedSlots} / {parking.totalSlots}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold ${occupancyRate > 90 ? "text-rose-400" : "text-[#FA8112]"}`}
                      >
                        {Math.round(occupancyRate)}%
                      </span>
                    </div>
                    <div className="h-[3px] w-full bg-[#FAF3E1]/5 rounded-full overflow-hidden relative">
                      <div
                        className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full ${
                          occupancyRate > 90
                            ? "bg-rose-500 shadow-[0_0_8px_#f43f5e]"
                            : "bg-[#FA8112] shadow-[0_0_8px_#FA8112]"
                        }`}
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* 3. Tariff Scale */}
                <td className="px-6 py-5 border-b border-[#F5E7C6]/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-[#FAF3E1] tabular-nums">
                      ₹{parking.basePrice}
                    </span>
                    <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                      PER HOUR
                    </span>
                  </div>
                </td>

                {/* 4. Status Tag */}
                <td className="px-6 py-5 border-b border-[#F5E7C6]/5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1 h-1 rounded-full animate-pulse ${parking.status === "Active" ? "bg-[#FA8112]" : "bg-amber-400"}`}
                    />
                    <span
                      className={`text-[9px] font-bold uppercase tracking-[0.2em] ${parking.status === "Active" ? "text-[#FA8112]" : "text-amber-400"}`}
                    >
                      {parking.status}
                    </span>
                  </div>
                </td>

                {/* 5. Operations (Actions) */}
                <td className="px-8 py-5 border-b border-[#F5E7C6]/5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/super-admin/parking/edit/${parking._id}`);
                      }}
                      className="p-2 text-[#FAF3E1]/20 hover:text-[#FA8112] hover:bg-[#FA8112]/5 rounded-lg border border-transparent hover:border-[#FA8112]/20 transition-all"
                      title="Update Configuration"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(parking._id);
                      }}
                      className="p-2 text-[#FAF3E1]/20 hover:text-rose-500 hover:bg-rose-500/5 rounded-lg border border-transparent hover:border-rose-500/20 transition-all"
                      title="Purge Entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Table Footer Meta */}
      <div className="px-8 py-3 bg-[#FAF3E1]/[0.01] flex justify-center">
        <p className="text-[9px] text-[#FAF3E1]/10 uppercase font-bold tracking-[0.5em]">
          End of Site Registry
        </p>
      </div>
    </div>
  );
};

export default ParkingTable;
