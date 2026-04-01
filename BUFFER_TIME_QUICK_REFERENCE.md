# 🚗 Buffer Time System - Quick Reference Guide

## What Is Buffer Time?

When a user books a parking slot from **2:00 PM to 2:15 PM**, the slot is NOT immediately available after. Instead:
- Slot locks at **1:45 PM** (15 min before)
- Car parks/leaves slot: **2:00 PM - 2:15 PM**
- Slot releases at **2:30 PM** (15 min after)

This gives 15 minutes before for entry and 15 minutes after for exit.

---

## Core Logic (Same Everywhere)

```javascript
// Calculate blocked time
const buffer = 15 * 60 * 1000;  // 15 minutes
const blockedStart = bookingStart - buffer;
const blockedEnd = bookingEnd + buffer;

// Check conflicts
const conflict = await Booking.findOne({
  slot: slotId,
  status: { $in: ["confirmed", "active", "completed"] },
  startTime: { $lt: blockedEnd },      // Other booking starts before our end
  endTime: { $gt: blockedStart }       // Other booking ends after our start
});

if (conflict) {
  return "Slot unavailable (buffer conflict)";
}
```

---

## All Operations Using Buffer

### 1. **lockSlot** (5-min temporary hold)
- Temporarily locks slot while user completes payment
- Expires after 5 minutes
- Buffer: N/A (temporary only)

### 2. **confirmBooking** (Book specific time)
- Confirms booking for specific start/end times
- Buffer: ✅ 15 min before & after
- Uses: `blockedStart = startTime - 15min`, `blockedEnd = endTime + 15min`

### 3. **bookSlot** (Quick instant book)
- Instant booking for X hours from now
- Buffer: ✅ 15 min before & after
- Uses: `blockedStart = now - 15min`, `blockedEnd = (now + Xh) + 15min`

### 4. **extendBooking** (Extend active booking)
- Extend existing booking by X hours
- Buffer: ✅ 15 min before & after
- **IMPORTANT**: Uses `booking.startTime - buffer` (not oldEnd)
- Checks: `blockedStart = originalStart - 15min`, `blockedEnd = newEnd + 15min`

### 5. **editBooking** (Reschedule booking)
- Change time of confirmed booking
- Buffer: ✅ 15 min before & after
- Uses: `blockedStart = newStart - 15min`, `blockedEnd = newEnd + 15min`

### 6. **getParkingDetails** (Check availability)
- Get available slots for specific time range
- Buffer: ✅ 15 min before & after
- Returns: `isAvailableForTime` for each slot
- Uses: `blockedStart = requestedStart - 15min`, `blockedEnd = requestedEnd + 15min`

### 7. **Automatic Status Manager** (Runs every 60 sec)
- Locks slots 15min before booking starts
- Occupies slots when booking starts
- Releases slots 15min after booking ends
- Buffer: ✅ Applies everywhere

---

## Real-World Example

**Timeline for booking 2:00 PM - 2:15 PM with 15min buffer:**

```
12:45 PM [LOCK] ——— Slot is locked, no new bookings allowed
  ↓
2:00 PM [START] ——— Booking starts, car enters
  ↓
2:15 PM [END] ——— Booking ends, car exits
  ↓
2:30 PM [RELEASE] ——— Slot available again, other users can book
```

**User 2 tries different times:**

```
10:00 AM - 11:00 AM  ✅ AVAILABLE (ends before 12:45 lock)
12:30 PM - 1:00 PM   ❌ CONFLICT (overlaps lock start 12:45)
1:50 PM - 2:00 PM    ❌ CONFLICT (overlaps occupied time)
2:15 PM - 2:30 PM    ❌ CONFLICT (overlaps buffer after)
2:30 PM - 3:00 PM    ✅ AVAILABLE (starts after 2:30 release)
```

---

## How to Test Buffer System

### Test 1: Basic booking conflict
```bash
# Book slot 1 from 2:00 PM to 2:15 PM
POST /api/confirmBooking
{
  "startTime": "2:00 PM",
  "endTime": "2:15 PM"
}

# Try to book same slot 1:50 PM to 2:00 PM
# Expected: ❌ CONFLICT (overlaps 12:45 lock period)
POST /api/confirmBooking
{
  "startTime": "1:50 PM",
  "endTime": "2:00 PM"
}
```

### Test 2: Extension conflict
```bash
# Book slot from 2:00 PM to 3:00 PM
# This blocks 1:45 PM to 3:15 PM

# Try to extend to 4:00 PM with another booking at 3:30 PM
# Expected: ❌ CONFLICT (4:15 PM release overlaps 3:30 PM booking)
```

### Test 3: Availability check
```bash
GET /api/parking/123?startTime=10:00AM&endTime=11:00AM
# Response: Shows all slots with isAvailableForTime = true
```

---

## Debugging Checklist

- ✅ All functions use same conflict detection logic
- ✅ All functions apply 15-min buffer before AND after
- ✅ Only confirmed/active/completed bookings block (cancelled don't)
- ✅ Conflict query uses: `startTime < blockedEnd AND endTime > blockedStart`
- ✅ extendBooking uses: `booking.startTime - buffer` (not oldEnd - buffer)
- ✅ getParkingDetails checks status filter before checking time conflicts
- ✅ Status manager applies buffer when LOCKING and RELEASING

---

## Configuration Change

To change buffer time globally:

**File**: `Backend/User-Panel/controllers/bookingController.js`
**Lines to find**:
```javascript
const BUFFER_MINS = 15;  // ← Change this
```

Common values:
- `10` = 10-minute buffer
- `15` = 15-minute buffer (current)
- `20` = 20-minute buffer
- `30` = 30-minute buffer

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Bookings conflict incorrectly | Wrong conflict logic | Verify `$lt` and `$gt` operators |
| extendBooking rejects valid extensions | Wrong buffer calculation | Use `booking.startTime - buffer` |
| Availability check shows wrong slots | Missing status filter | Add `status: { $in: [...]}`|
| Buffer not applied | Missing buffer calculation | Add `buffer = 15 * 60 * 1000` |
| Temporary locks don't expire | Manager not running | Check console every 60 sec |

---

## Performance Notes

- ✅ Conflict detection uses simple MongoDB query (indexed on slot + time)
- ✅ getParkingDetails loops through slots (N queries for N slots)
- ✅ Status manager runs every 60 seconds (not every request)
- ✅ No UI changes = no frontend performance impact

---

## Response Format

All booking endpoints now include buffer info:

```javascript
{
  "message": "Booking confirmed successfully (15min buffer applied)",
  "booking": { /* booking details */ },
  "bufferInfo": {
    "buffer": "15 minutes before and after",
    "blockedPeriod": "2025-04-01T01:45:00Z to 2025-04-01T02:30:00Z"
  }
}
```

---

## Key Takeaways

1. **Buffer is applied EVERYWHERE** - All booking operations respect 15-min buffer
2. **Same logic everywhere** - Consistent conflict detection across all functions
3. **Only one rule** - `startTime < blockedEnd AND endTime > blockedStart`
4. **Cancelled bookings don't block** - Only confirmed/active/completed block slots
5. **Automatic management** - Status manager handles locking/releasing every 60 sec
6. **No UI changes** - All logic is backend-only, no frontend modifications needed

---
