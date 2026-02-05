const LocationSearch = () => {
  return (
    <section>
      <h2>Search Location</h2>

      <input placeholder="Search by location name" />
      <select>
        <option>Select City / Area</option>
      </select>

      <button>Use Current Location</button>

      <div>
        <p>Recent Searches</p>
      </div>
    </section>
  );
};

export default LocationSearch;
