import SlotItem from "./SlotItem";

const SlotGrid = () => {
  return (
    <section className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold">Select Slot</h2>
      <div className="grid grid-cols-4 gap-3 mt-3">
        <SlotItem slot="A1" />
        <SlotItem slot="A2" />
        <SlotItem slot="B1" />
        <SlotItem slot="B2" />
      </div>
    </section>
  );
};

export default SlotGrid;
