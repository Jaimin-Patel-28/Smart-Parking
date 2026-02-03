const VehicleInfo = () => {
  return (
    <section>
      <h2>Vehicle Information</h2>

      <VehicleCard />

      <button>Add New Vehicle</button>
    </section>
  );
};

const VehicleCard = () => {
  return (
    <div>
      <p>Vehicle Number</p>
      <p>Vehicle Type: Car / Bike</p>
      <button>Edit</button>
      <button>Remove</button>
    </div>
  );
};

export default VehicleInfo;
