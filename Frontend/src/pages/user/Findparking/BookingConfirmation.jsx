const BookingConfirmation = () => {
  return (
    <section className="bg-green-50 border border-green-300 p-5 rounded-xl">
      <h2 className="font-bold text-green-700">
        Booking Confirmed 🎉
      </h2>
      <p>Booking ID: BK123456</p>
      <button className="text-blue-600 mt-2">
        Go to My Bookings
      </button>
    </section>
  );
};

export default BookingConfirmation;
