import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParkingTable = ({ data, onDelete }) => {
  const navigate = useNavigate();

  // Color Mapping:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="overflow-x-auto bg-[#222222]">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-[#FAF3E1]/30 text-[10px] uppercase tracking-[0.2em] font-black">
            <th className="px-6 py-5">Parking Info</th>
            <th className="px-6 py-5">Capacity</th>
            <th className="px-6 py-5">Pricing</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="">
          {data.map((parking) => {
            const occupancyRate =
              (parking.occupiedSlots / parking.totalSlots) * 100 || 0;

            return (
              <tr
                key={parking._id}
                onClick={() =>
                  navigate(`/super-admin/parking/details/${parking._id}`)
                }
                className="bg-[#FAF3E1]/[0.02] hover:bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 cursor-pointer transition-all duration-300 group shadow-sm"
              >
                {/* Parking Info */}
                <td className="px-6 py-5 first:rounded-l-2xl">
                  <div className="flex flex-col">
                    <span className="font-black text-[#FAF3E1] text-sm tracking-tight">
                      {parking.name}
                    </span>
                    <span className="text-[10px] font-bold text-[#FAF3E1]/40 uppercase tracking-wider mt-0.5">
                      {parking.location}
                    </span>
                  </div>
                </td>

                {/* Capacity Progress */}
                <td className="px-6 py-5">
                  <div className="w-full max-w-[120px]">
                    <div className="flex justify-between text-[9px] mb-2 font-black uppercase tracking-tighter">
                      <span className="text-[#FAF3E1]/30">
                        {parking.occupiedSlots}/{parking.totalSlots}
                      </span>

                      <span
                        className={
                          occupancyRate > 90
                            ? "text-rose-400"
                            : "text-[#FA8112]"
                        }
                      >
                        {Math.round(occupancyRate)}%
                      </span>
                    </div>

                    <div className="h-1 w-full bg-[#FAF3E1]/[0.05] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          occupancyRate > 90 ? "bg-rose-500" : "bg-[#FA8112]"
                        }`}
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Pricing */}
                <td className="px-6 py-5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-sm font-black text-[#FAF3E1]">
                      ₹{parking.basePrice}
                    </span>
                    <span className="text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-tighter">
                      /hr
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      parking.status === "Active"
                        ? "bg-[#FA8112]/10 text-[#FA8112] border-[#FA8112]/20"
                        : "bg-amber-400/10 text-amber-400 border-amber-400/20"
                    }`}
                  >
                    {parking.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-5 text-right last:rounded-r-2xl">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/super-admin/parking/edit/${parking._id}`);
                      }}
                      className="p-2 text-[#FAF3E1]/20 hover:text-[#FA8112] hover:bg-[#FA8112]/10 rounded-xl transition-all"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(parking._id);
                      }}
                      className="p-2 text-[#FAF3E1]/20 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ParkingTable;
