import FindParkingHeader from "./FindParkingHeader";
import LocationSearch from "./LocationSearch";
import DateTimeSelector from "./DateTimeSelector";
import VehicleSelector from "./VehicleSelector";
import ParkingResults from "./ParkingResults";
import ParkingDetails from "./ParkingDetails";
import SlotSelection from "./SlotSelection";
import PriceSummary from "./PriceSummary";
import BookingActions from "./BookingActions";
import BookingRules from "./BookingRules";
import BookingConfirmation from "./BookingConfirmation";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import SupportShortcut from "./SupportShortcut";

const FindParking = () => {
  return (
    <div>
      {/* 1️⃣ Header */}
      <FindParkingHeader />

      {/* 2️⃣ Search Location */}
      <LocationSearch />

      {/* 3️⃣ Date & Time */}
      <DateTimeSelector />

      {/* 4️⃣ Vehicle Selection */}
      <VehicleSelector />

      {/* 5️⃣ Results List */}
      <ParkingResults />

      {/* 6️⃣ Location Details */}
      <ParkingDetails />

      {/* 7️⃣ Slot Selection */}
      <SlotSelection />

      {/* 8️⃣ Price Summary */}
      <PriceSummary />

      {/* 9️⃣ Booking Action */}
      <BookingActions />

      {/* 🔟 Rules */}
      <BookingRules />

      {/* 1️⃣1️⃣ Confirmation */}
      <BookingConfirmation />

      {/* 1️⃣2️⃣ Empty & Error States */}
      <EmptyState />
      <ErrorState />

      {/* 1️⃣3️⃣ Support */}
      <SupportShortcut />
    </div>
  );
};

export default FindParking;
