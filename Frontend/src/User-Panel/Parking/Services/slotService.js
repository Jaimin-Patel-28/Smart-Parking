import api from "../../../Shared/Services/api";

const slotService = {
  // Lock slot for 5 minutes (Backend: parkingController.lockSlot)
  lockSlot: (slotId) => api.post(`/slot/lock`, { slotId }),

  // Get all slots for a specific parking (Backend: parkingController.getParkingDetails)
  getSlotsByParking: (parkingId) =>
    api.get(`/parking/${parkingId}`),
};

export default slotService;
