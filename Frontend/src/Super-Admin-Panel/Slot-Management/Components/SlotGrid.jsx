import React from "react";
import SlotCard from "./SlotCard";

const SlotGrid = ({ slots, onSlotAction }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {slots.map((slot) => (
        <SlotCard key={slot._id} slot={slot} onAction={onSlotAction} />
      ))}
    </div>
  );
};

export default SlotGrid;
