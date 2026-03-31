import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParkingTable = ({ data, onRefresh, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-200">
            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase">
              Parking Info
            </th>
            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase">
              Capacity
            </th>
            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase">
              Pricing
            </th>
            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase">
              Status
            </th>
            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {data.map((parking) => {
            const occupancyRate =
              (parking.occupiedSlots / parking.totalSlots) * 100 || 0;

            return (
              <tr
                key={parking._id}
                onClick={() =>
                  navigate(`/super-admin/parking/details/${parking._id}`)
                }
                className="hover:bg-slate-50 cursor-pointer transition-colors"
              >
                {/* Parking Info */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">
                      {parking.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {parking.location}
                    </span>
                  </div>
                </td>

                {/* Capacity */}
                <td className="px-6 py-4">
                  <div className="w-full max-w-[100px]">
                    <div className="flex justify-between text-[10px] mb-1 font-bold">
                      <span className="text-slate-400">
                        {parking.occupiedSlots}/{parking.totalSlots}
                      </span>

                      <span
                        className={
                          occupancyRate > 90
                            ? "text-red-500"
                            : "text-emerald-500"
                        }
                      >
                        {Math.round(occupancyRate)}%
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          occupancyRate > 90 ? "bg-red-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Pricing */}
                <td className="px-6 py-4 text-sm font-bold text-slate-700">
                  ${parking.basePrice}
                  <span className="text-[10px] text-slate-400 ml-1">/hr</span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      parking.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {parking.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {/* Edit */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/super-admin/parking/edit/${parking._id}`);
                      }}
                      className="p-2 text-slate-400 hover:text-emerald-600"
                    >
                      <Edit2 size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(parking._id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-600"
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
