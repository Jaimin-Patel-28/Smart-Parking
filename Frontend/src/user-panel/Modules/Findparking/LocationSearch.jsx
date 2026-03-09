import React, { useState } from "react";
import {
  Search,
  MapPin,
  Navigation,
  History,
  ChevronDown,
  Crosshair,
} from "lucide-react";

const LocationSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("Select City / Area");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const recentSearches = ["Anand Hub", "Central Mall", "V.V. Nagar"];
  const areas = ["Anand City", "Vidhyanagar", "Karamsad", "Borsad"];

  // Handle selecting a recent search
  const handleRecentClick = (location) => {
    setQuery(location);
  };

  // Handle "Use Current Location"
  const handleGPS = () => {
    setQuery("Detecting location...");
    setTimeout(() => setQuery("My Current Location (Anand)"), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[#FA8112]/20 rounded-lg">
          <Search className="text-[#FA8112]" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">Search Location</h2>
          <p className="text-[#FAF3E1]/40 text-xs uppercase tracking-widest">
            Discovery Node
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Input Field */}
        <div className="relative group">
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/30 group-focus-within:text-[#FA8112] transition-colors"
            size={18}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search location..."
            className="w-full bg-[#222222] border border-[#F5E7C6]/10 rounded-2xl py-4 pl-12 pr-4 text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112]/50 focus:ring-1 focus:ring-[#FA8112]/50 transition-all"
          />
        </div>

        {/* Custom Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-[#222222] border border-[#F5E7C6]/10 rounded-2xl py-4 px-5 text-[#FAF3E1]/80 hover:border-[#F5E7C6]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <Navigation size={18} className="text-[#FA8112]" />
              <span>{selectedArea}</span>
            </div>
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#2d2d2d] border border-[#F5E7C6]/10 rounded-2xl overflow-hidden z-50 shadow-2xl">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    setSelectedArea(area);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 text-sm text-[#FAF3E1]/70 hover:bg-[#FA8112] hover:text-[#222222] transition-colors"
                >
                  {area}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GPS Action Button */}
      <button
        onClick={handleGPS}
        className="flex items-center gap-2 text-[#FA8112] text-sm font-medium hover:opacity-80 transition-opacity"
      >
        <Crosshair size={16} />
        Use Current Location
      </button>

      {/* Recent Searches Section */}
      <div className="pt-4 border-t border-[#F5E7C6]/5">
        <div className="flex items-center gap-2 mb-4 text-[#FAF3E1]/40">
          <History size={14} />
          <span className="text-xs uppercase font-bold tracking-widest">
            Recent Searches
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {recentSearches.map((item) => (
            <button
              key={item}
              onClick={() => handleRecentClick(item)}
              className="px-4 py-2 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 rounded-xl text-sm text-[#FAF3E1]/70 hover:border-[#FA8112]/40 hover:text-[#FA8112] transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
