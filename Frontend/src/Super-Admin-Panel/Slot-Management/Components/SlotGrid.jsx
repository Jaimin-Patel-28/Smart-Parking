import React from "react";
import SlotCard from "./SlotCard";

const SlotGrid = ({ slots, onSlotAction }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {slots.map((slot) => (
        <SlotCard key={slot._id} slot={slot} onAction={onSlotAction} />
      ))}
    </div>
  );
};

export default SlotGrid;
