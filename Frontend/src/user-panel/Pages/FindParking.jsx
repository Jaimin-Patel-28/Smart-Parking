import React, { useState, useCallback } from "react"; // 🟢 Added useCallback
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Node Imports
import FindParkingHeader from "../Modules/Findparking/FindParkingHeader";
import LocationSearch from "../Modules/Findparking/LocationSearch";
import DateTimeSelector from "../Modules/Findparking/DateTimeSelector";
import VehicleSelector from "../Modules/Findparking/VehicleSelector";
import ParkingResults from "../Modules/Findparking/ParkingResults";
import ParkingDetails from "../Modules/Findparking/ParkingDetails";
import SlotSelection from "../Modules/Findparking/SlotSelection";
import PriceSummary from "../Modules/Findparking/PriceSummary";
import BookingRules from "../Modules/Findparking/BookingRules";
import BookingActions from "../Modules/Findparking/BookingActions";
import SupportShortcut from "../Modules/Findparking/SupportShortcut";
import BookingConfirmation from "../Modules/Findparking/BookingConfirmation";
import EmptyState from "../Modules/Findparking/EmptyState";
import ErrorState from "../Modules/Findparking/ErrorState";

const FindParking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isAgreed, setIsAgreed] = useState(false);

  const [selection, setSelection] = useState({
    location: "",
    slotId: null,
    selectedNode: null,
    showDetails: false,
    hasError: false,
    isEmpty: false,
    bookingDate: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "11:30",
    duration: "02:30 Hrs",
  });

  // 🟢 SOLUTION: Stable update handler with a "Change Guard"
  // This function only triggers a re-render if the new data is actually different
  const updateSelection = useCallback((newData) => {
    setSelection((prev) => {
      const hasChanged = Object.keys(newData).some(
        (key) => prev[key] !== newData[key],
      );

      // If nothing changed, return the previous state (React will skip re-rendering)
      if (!hasChanged) return prev;

      return { ...prev, ...newData };
    });
  }, []);

  const NodeCard = ({ children, className = "" }) => (
    <div
      className={`bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] p-6 md:p-10 shadow-2xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#222222] text-[#FAF3E1] selection:bg-[#FA8112]/30 transition-colors duration-500">
      {!currentPath.includes("success") && (
        <header className="sticky top-0 z-50 bg-[#222222]/80 backdrop-blur-xl border-b border-[#F5E7C6]/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <FindParkingHeader currentPath={currentPath} />
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {currentPath === "/user/find-parking" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <NodeCard>
              <LocationSearch />
            </NodeCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NodeCard>
                <DateTimeSelector
                  bookingDate={selection.bookingDate}
                  startTime={selection.startTime}
                  endTime={selection.endTime}
                  duration={selection.duration}
                  onUpdate={updateSelection} // 🟢 Use the stable handler
                />
              </NodeCard>
              <NodeCard>
                <VehicleSelector />
              </NodeCard>
            </div>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => navigate("results")}
                className="group flex items-center gap-4 bg-[#FA8112] text-[#222222] font-black text-lg px-12 py-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(250,129,18,0.4)]"
              >
                FIND PARKING{" "}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {currentPath === "/user/find-parking/results" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            <NodeCard className="w-full">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#F5E7C6]/10 pb-4">
                  <h2 className="text-xl font-bold text-[#FAF3E1]">
                    Parking Locations
                  </h2>
                  <span className="text-[10px] text-[#FA8112] font-black uppercase tracking-widest">
                    Active Inventory
                  </span>
                </div>

                {selection.isEmpty ? (
                  <EmptyState />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <ParkingResults
                      onViewDetails={(data) =>
                        updateSelection({
                          showDetails: true,
                          selectedNode: data,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </NodeCard>

            <NodeCard className="w-full">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#FA8112] mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#FA8112] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                    Intelligence Node Details
                  </span>
                </div>

                {selection.showDetails ? (
                  <ParkingDetails data={selection.selectedNode} />
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-[#F5E7C6]/5 rounded-3xl">
                    <p className="text-[#FAF3E1]/20 uppercase tracking-widest text-xs">
                      Select a node above to initialize details
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    disabled={!selection.showDetails}
                    onClick={() => navigate("../select-slot")}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${
                      selection.showDetails
                        ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/20"
                        : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 cursor-not-allowed"
                    }`}
                  >
                    PROCEED TO SLOT SELECTION
                  </button>
                </div>
              </div>
            </NodeCard>
          </div>
        )}

        {currentPath === "/user/find-parking/select-slot" && (
          <div className="flex flex-col gap-6 animate-in zoom-in-95 duration-500">
            <NodeCard className="w-full">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#F5E7C6]/10 pb-4">
                  <h2 className="text-xl font-bold text-[#FAF3E1]">
                    Spatial Slot Selection
                  </h2>
                  <span className="text-[10px] text-[#FA8112] font-black uppercase tracking-widest">
                    Level 2 Intelligence Node
                  </span>
                </div>

                <SlotSelection
                  selectedSlot={selection.slotId}
                  onSlotSelect={(id) => updateSelection({ slotId: id })}
                />
              </div>
            </NodeCard>

            <NodeCard className="w-full border-[#FA8112]/10 bg-[#FA8112]/[0.01]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 text-[#FA8112] mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#FA8112] animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                      Settlement Breakdown
                    </span>
                  </div>
                  <PriceSummary selection={selection} />
                </div>

                <div className="w-full md:w-auto min-w-[300px]">
                  <button
                    disabled={!selection.slotId}
                    onClick={() => navigate("../checkout")}
                    className={`w-full group flex items-center justify-center gap-4 font-black text-lg px-12 py-6 rounded-[2rem] transition-all shadow-xl
                      ${
                        selection.slotId
                          ? "bg-[#FA8112] text-[#222222] hover:scale-[1.02]"
                          : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 cursor-not-allowed"
                      }
                    `}
                  >
                    REVIEW BOOKING
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </NodeCard>
          </div>
        )}

        {currentPath === "/user/find-parking/checkout" && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-500">
            <NodeCard>
              <BookingRules onAcceptChange={(val) => setIsAgreed(val)} />
            </NodeCard>

            {/* 🟢 Booking Actions only appear when isAgreed is true */}
            {isAgreed && (
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
                <NodeCard className="border-[#FA8112]/30">
                  <BookingActions
                    onConfirm={() => navigate("../success")}
                    onChangeSlot={() => navigate("../select-slot")}
                    onCancel={() => navigate("/user/find-parking")}
                  />
                </NodeCard>
              </div>
            )}
          </div>
        )}

        {currentPath === "/user/find-parking/success" && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-1000">
            {/* Digital Ticket Node */}
            <BookingConfirmation selection={selection} />

            {/* Assistance Node - Requested for Node 5 */}
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
              <SupportShortcut />
            </div>

            {/* Navigation Back to Dashboard */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => navigate("/user/dashboard")}
                className="group flex items-center gap-2 text-[10px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.5em] hover:text-[#FA8112] transition-all"
              >
                <span className="w-8 h-[1px] bg-[#FAF3E1]/10 group-hover:bg-[#FA8112]/40 transition-all" />
                Return to Dashboard Hub
                <span className="w-8 h-[1px] bg-[#FAF3E1]/10 group-hover:bg-[#FA8112]/40 transition-all" />
              </button>
            </div>
          </div>
        )}
      </main>

      {selection.hasError && (
        <div className="fixed inset-0 z-[100] bg-[#222222]/90 flex items-center justify-center p-4">
          <NodeCard className="max-w-md border-[#FA8112]/50">
            <ErrorState />
          </NodeCard>
        </div>
      )}
    </div>
  );
};

export default FindParking;
