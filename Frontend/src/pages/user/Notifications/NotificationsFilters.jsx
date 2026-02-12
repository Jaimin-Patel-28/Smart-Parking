const NotificationsFilters = () => {
  return (
    <section>
      <h2>Filters & Controls</h2>
      <select>
        <option>Filter by Type</option>
      </select>
      <select>
        <option>Status (Read / Unread)</option>
      </select>
      <select>
        <option>Sort by Date</option>
      </select>
      <button>Mark All as Read</button>
    </section>
  );
};

export default NotificationsFilters;
