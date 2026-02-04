const LocationSearch = () => {
  return (
    <section className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold">Search Location</h2>
      <input
        type="text"
        placeholder="Enter city or area"
        className="w-full border p-3 rounded-lg mt-3"
      />
      <button className="text-blue-600 text-sm mt-2">
        Use Current Location
      </button>
    </section>
  );
};

export default LocationSearch;
