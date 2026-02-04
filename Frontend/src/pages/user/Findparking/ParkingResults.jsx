import ParkingCard from "./ParkingCard";

const ParkingResults = () => {
  return (
    <section className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold">Available Parking</h2>
      <ParkingCard />
    </section>
  );
};

export default ParkingResults;
