const VehicleSelector = () => {
  return (
    <section className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold">Select Vehicle</h2>
      <select className="w-full border p-3 rounded-lg mt-3">
        <option>Select Vehicle</option>
        <option>Car - GJ01AB1234</option>
        <option>Bike - GJ01XY5678</option>
      </select>
      <button className="text-blue-600 text-sm mt-2">
        + Add New Vehicle
      </button>
    </section>
  );
};

export default VehicleSelector;
