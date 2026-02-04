const BookingRules = () => {
  return (
    <section className="bg-white p-5 rounded-xl shadow text-sm">
      <h2 className="font-semibold">Booking Rules</h2>
      <ul className="list-disc ml-5 mt-2">
        <li>Cancellation allowed before 30 minutes</li>
        <li>Late entry may cancel booking</li>
        <li>Refund as per policy</li>
      </ul>
    </section>
  );
};

export default BookingRules;
