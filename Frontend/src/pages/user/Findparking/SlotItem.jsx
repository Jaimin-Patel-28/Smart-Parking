const SlotItem = ({ slot }) => {
  return (
    <button className="border p-3 rounded-lg hover:bg-green-500 hover:text-white">
      {slot}
    </button>
  );
};

export default SlotItem;
