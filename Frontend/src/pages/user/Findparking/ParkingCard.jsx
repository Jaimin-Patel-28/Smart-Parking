const ParkingCard = () => {
  return (
    <div className="border p-4 rounded-lg mt-3 flex justify-between">
      <div>
        <h3 className="font-semibold">City Center Parking</h3>
        <p className="text-sm text-gray-500">12 slots available</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        View Details
      </button>
    </div>
  );
};

export default ParkingCard;
