const NotificationPreferences = () => {
  return (
    <section>
      <h2>Notification Preferences</h2>
      <label>
        <input type="checkbox" /> Booking Notifications
      </label>
      <label>
        <input type="checkbox" /> Payment Alerts
      </label>
      <label>
        <input type="checkbox" /> System Updates
      </label>
    </section>
  );
};

export default NotificationPreferences;
