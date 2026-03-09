import React, { useState } from "react";
import ParkingCard from "./ParkingCard";
import {
  LayoutGrid,
  ListFilter,
  Activity,
  Sparkles,
  ArrowDownAz,
} from "lucide-react";

const ParkingResults = ({ onViewDetails }) => {
  const [parkingNodes] = useState([
    {
      id: 1,
      name: "Anand Central Hub",
      slots: 42,
      distance: "0.4 km",
      price: "20/hr",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Gujarat Square Node",
      slots: 18,
      distance: "1.2 km",
      price: "15/hr",
      rating: 4.5,
    },
    {
      id: 3,
      name: "V.V. Nagar Terminal",
      slots: "08",
      distance: "2.5 km",
      price: "25/hr",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Railway Station Plaza",
      slots: "00",
      distance: "3.1 km",
      price: "10/hr",
      rating: 4.2,
    },
  ]);

  const [filterActive, setFilterActive] = useState(false);

  return (
    /* FIXED: w-full ensures the component takes up all horizontal space */
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* 🟢 Status Bar - Forced Left and Right */}
      <div className="flex flex-row items-center justify-between w-full gap-4 border-b border-[#F5E7C6]/10 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#FA8112]/20 rounded-lg text-[#FA8112]">
            <LayoutGrid size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#FAF3E1]">
              Parking Locations
            </h2>
            <p className="text-[#FAF3E1]/40 text-[10px] uppercase tracking-[0.2em] font-semibold">
              Active Inventory Node
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-2">
            <Activity size={14} className="text-[#FA8112] animate-pulse" />
            <span className="text-[10px] font-bold text-[#FA8112]/80 uppercase tracking-widest">
              Live Updates
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#FAF3E1]/[0.05] px-3 py-1.5 rounded-full border border-[#F5E7C6]/10">
            <Sparkles size={12} className="text-[#FA8112]" />
            <span className="text-[10px] font-bold text-[#FAF3E1]/80 uppercase tracking-widest">
              {parkingNodes.length} Nodes Found
            </span>
          </div>
        </div>
      </div>

      {/* 🟢 Action Bar */}
      <div className="flex justify-start gap-3">
        <button
          onClick={() => setFilterActive(!filterActive)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
            filterActive
              ? "bg-[#FA8112] text-[#222222] border-[#FA8112]"
              : "bg-[#222222] text-[#FAF3E1]/60 border-[#F5E7C6]/10 hover:border-[#FA8112]/40"
          }`}
        >
          <ListFilter size={14} />
          <span>Filter Stream</span>
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#F5E7C6]/10 bg-[#222222] text-[#FAF3E1]/60 text-[10px] font-bold uppercase tracking-widest hover:border-[#FA8112]/40 transition-all">
          <ArrowDownAz size={14} />
          <span>Sort: Distance</span>
        </button>
      </div>

      {/* 🟢 FIXED 2x2 Results Grid */}
      {/* w-full + md:grid-cols-2 ensures 2 left, 2 right on laptop screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full auto-rows-fr">
        {parkingNodes.map((node) => (
          /* flex + w-full here makes sure the card fills its grid half */
          <div key={node.id}>
            <ParkingCard
              name={node.name}
              slots={node.slots}
              distance={node.distance}
              price={node.price}
              rating={node.rating}
              onSelect={() => onViewDetails(node)}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* 🟢 End of Stream Indicator */}
      <div className="pt-12 flex flex-col items-center gap-3 opacity-20 w-full">
        <div className="w-24 h-[1px] bg-[#FAF3E1]" />
        <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-center">
          End of Inventory Stream
        </p>
      </div>
    </div>
  );
};

export default ParkingResults;
