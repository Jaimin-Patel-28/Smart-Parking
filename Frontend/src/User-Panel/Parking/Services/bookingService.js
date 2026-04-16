import api from "../../../Shared/Services/api";

const bookingService = {
  // Confirm the final booking (Backend: parkingController.confirmBooking)
  confirm: (bookingData) =>
    api.post(`/booking/confirm`, bookingData),

  // Get logged-in user's bookings
  getUserBookings: () => api.get(`/bookings`),
};

export default bookingService;
