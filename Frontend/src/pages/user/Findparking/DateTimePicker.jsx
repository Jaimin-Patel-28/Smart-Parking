const DateTimePicker = () => {
  return (
    <section className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold">Date & Time</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        <input type="date" className="border p-3 rounded-lg" />
        <input type="time" className="border p-3 rounded-lg" />
        <input type="time" className="border p-3 rounded-lg" />
      </div>
    </section>
  );
};

export default DateTimePicker;
