import api from "../../../Shared/Services/api";

const bookingService = {
  // Get a single booking by id
  getBookingDetails: (bookingId) => api.get(`/booking/${bookingId}`),

  // Get all user bookings (history) for logged-in user
  getUserBookings: () => api.get(`/bookings`),

  // Get current/active bookings for logged-in user
  getCurrentBookings: () => api.get(`/current-bookings`),

  // Get upcoming bookings for logged-in user
  getUpcomingBookings: () => api.get(`/upcoming-bookings`),

  // Get past/history bookings for logged-in user
  getPastBookings: () => api.get(`/past-bookings`),

  // Extend/reduce active booking by signed minutes
  extendBooking: (bookingId, adjustmentMinutes) => 
    api.patch(`/bookings/${bookingId}/extend`, { adjustmentMinutes }),

  // Edit booking date/time
  editBooking: (bookingId, updates) => 
    api.put(`/bookings/${bookingId}/edit`, updates),

  // Cancel booking
  cancelBooking: (bookingId) => 
    api.delete(`/bookings/${bookingId}`),

  // Refresh bookings (placeholder)
  refreshBookings: () => { /* refetch logic in hooks */ }
};

export default bookingService;
