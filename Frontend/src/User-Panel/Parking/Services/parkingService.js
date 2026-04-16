import api from "../../../Shared/Services/api";

const parkingService = {
  // 1. Get All Active Parkings
  getAllParkings: () => api.get(`/parkings`),

  // 2. Get Parking Details + Available Slots
  getParkingDetails: (id, startTime, endTime) => {
    const params = [];
    if (startTime) params.push(`startTime=${encodeURIComponent(startTime)}`);
    if (endTime) params.push(`endTime=${encodeURIComponent(endTime)}`);
    const query = params.length ? `?${params.join("&")}` : "";
    return api.get(`/parking/${id}${query}`);
  },

  // 3. Temporary Slot Lock (5 mins)
  lockSlot: (slotId) => api.post(`/slot/lock`, { slotId }),

// 4. Confirm Booking
  confirmBooking: (bookingData) =>
    api.post(`/booking/confirm`, bookingData),

  // NEW: Simple book slot for Find Parking
  bookSlot: (bookingData) => api.post(`/book`, bookingData),

  // NEW: Get logged-in user bookings history
  getUserBookings: () => api.get(`/bookings`),
};

export default parkingService;
