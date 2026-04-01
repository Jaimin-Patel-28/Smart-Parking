# 🚗 Buffer Time System Implementation

## Overview
A **15-minute buffer system** has been implemented across all parking slot booking operations. Each booking locks a slot not only during the actual booking time but also for 15 minutes before and after.

---

## 📌 Core Concept

### Real-Life Scenario
- **User 1** books Slot S1 from **2:00 PM to 2:15 PM**
- **Actual blocked time**: **1:45 PM to 2:30 PM** (includes 15min buffer)

### Buffer Calculation
```
blockedStart = startTime - 15 minutes
blockedEnd = endTime + 15 minutes
```

### Availability Rule
A slot is **available for a new booking ONLY IF**:
```
(newStart >= blockedEnd) OR (newEnd <= blockedStart)
```

Or equivalently: **NO OVERLAP** between time periods

---

## 🔧 Implementation Details

### Constant Definition
- **BUFFER_MINS = 15** (defined in bookingController.js)
- **BUFFER_MS = 15 * 60 * 1000** (15 minutes in milliseconds)

### Conflict Detection Query
All booking operations use the same conflict detection logic:
```javascript
const conflict = await Booking.findOne({
  slot: slotId,
  status: { $in: ["confirmed", "active", "completed"] },
  startTime: { $lt: blockedEnd },      // Other booking starts BEFORE our end
  endTime: { $gt: blockedStart }       // Other booking ends AFTER our start
});
```

**Only CANCELLED bookings are ignored** (they don't block slots)

---

## 📋 Modified Functions

### 1. **confirmBooking** (`/confirmBooking`)
- **Purpose**: Confirm a booking with specific start/end times
- **Buffer Check**: ✅ Applied
- **Logic**:
  - Calculates: `blockedStart = startTime - 15min`, `blockedEnd = endTime + 15min`
  - Checks for conflicts with all active/confirmed/completed bookings
  - Rejects if ANY overlap exists

### 2. **bookSlot** (`/bookSlot`)
- **Purpose**: Quick instant booking for X hours from now
- **Buffer Check**: ✅ Applied
- **Example**: Booking 1 hour now = instant booking in "occupied" status

### 3. **extendBooking** (`/extend/:id`)
- **Purpose**: Extend an active/confirmed booking
- **Buffer Check**: ✅ **FIXED**
- **Key Fix**: Now checks from `booking.startTime - buffer` to `newEnd + buffer` (not just from oldEnd-buffer)

### 4. **editBooking** (`/edit/:id`)
- **Purpose**: Reschedule a confirmed upcoming booking
- **Buffer Check**: ✅ Applied
- **Logic**: Checks if new time slot conflicts with other bookings (with buffer)

### 5. **getParkingDetails** (`/parking/:id`)
- **Purpose**: Get available slots for a specific time range
- **Buffer Check**: ✅ **IMPROVED**
- **Logic**:
  - Calculates blocked period for requested time with buffer
  - Returns `isAvailableForTime` for each slot
  - Excludes slots that conflict with that time period

### 6. **Automatic Slot Status Manager** (Runs every 1 minute)
- **Purpose**: Auto-lock, occupy, and release slots based on time
- **Buffer Applied**:
  - LOCKS slots at: `startTime - 15 minutes`
  - OCCUPIES at: `startTime`
  - RELEASES at: `endTime + 15 minutes`

---

## ✅ Testing Scenarios

### ✅ Scenario 1: Basic Buffer (PROVIDED EXAMPLE)
**User 1 Books**: 1:00 PM - 1:15 PM (blocked 12:45 PM - 1:30 PM)

**User 2 Books 10:00 AM - 11:00 AM**
- ✅ **AVAILABLE** (ends at 11:00 AM, well before 12:45 PM block)

**User 2 Books 1:20 PM - 2:00 PM**
- ❌ **UNAVAILABLE** (starts at 1:20 PM, conflicts with block 12:45 PM - 1:30 PM)

---

### ✅ Scenario 2: Extension Conflict
**Booking 1**: 2:00 PM - 3:00 PM (blocked 1:45 PM - 3:15 PM)

**Extend to 4:00 PM**
- Checks: 1:45 PM - 4:15 PM for conflicts
- ✅ Allowed if no other booking overlaps

---

### ✅ Scenario 3: Slot Status Progression
```
12:45 PM : Slot status = "locked" (15min before start)
2:00 PM  : Slot status = "occupied" (booking started)
3:15 PM  : Slot status = "available" (15min after end)
```

---

## 🔍 Conflict Detection Logic Across ALL Operations

Every booking operation follows the same pattern:

```javascript
// 1. Define requested time
const newStart = new Date(startTime);
const newEnd = new Date(endTime);

// 2. Apply buffer
const buffer = 15 * 60 * 1000;
const blockedStart = new Date(newStart.getTime() - buffer);
const blockedEnd = new Date(newEnd.getTime() + buffer);

// 3. Check conflicts
const conflict = await Booking.findOne({
  slot: slotId,
  _id: { $ne: currentBookingId },  // Exclude current booking if editing/extending
  status: { $in: ["confirmed", "active", "completed"] },
  startTime: { $lt: blockedEnd },
  endTime: { $gt: blockedStart }
});

// 4. Result
if (conflict) {
  return error("Slot not available");
}
```

---

## 📊 Slot Status States

| Status | Meaning | Duration |
|--------|---------|----------|
| `available` | Can book | - |
| `temporary_locked` | 5-min hold while user confirms | 5 mins |
| `locked` | Confirmed booking approaching | startTime - 15min to startTime |
| `occupied` | Booking in progress | startTime to endTime |
| `temporary_locked` (expired) | Converts back to available | After 5 mins |

---

## 🎯 Key Changes Made

1. ✅ **confirmBooking**: Added detailed buffer logging, fixed status filter
2. ✅ **bookSlot**: Fixed conflict detection query, added buffer validation
3. ✅ **extendBooking**: FIXED - Now uses `booking.startTime - buffer` instead of `oldEnd - buffer`
4. ✅ **editBooking**: Added buffer validation for time edits
5. ✅ **getParkingDetails**: Improved availability check with buffer logic
6. ✅ **lockSlot**: Added clear logging for temporary locks

---

## 🚀 How It Works (User Perspective)

1. **User sees available slots** for their requested time (with buffer calculated)
2. **User selects a slot and time**
3. **System locks slot for 5 minutes** (temporary_locked)
4. **User completes payment/confirmation**
5. **Booking confirmed**: Slot now shows as "locked" (will become "occupied" at startTime)
6. **15 minutes before start**: Slot physically locks (can't be accessed)
7. **At booking end**: Slot shows as "occupied"
8. **15 minutes after end**: Slot releases and becomes available again

---

## 📝 Notes

- **Buffer is 15 minutes** (configurable via `BUFFER_MINS` constant)
- **Only CANCELLED bookings are ignored** in conflict checks
- **No UI changes** - All logic is backend-only
- **Automatic slot status manager** runs every 60 seconds
- **All responses include buffer info** for transparency

---

## 🔧 Configuration

To change buffer time, modify:
```javascript
// In bookingController.js (line ~27)
const BUFFER_MINS = 15;
```

Change `15` to desired minutes (e.g., `10`, `20`, `30`)

---
