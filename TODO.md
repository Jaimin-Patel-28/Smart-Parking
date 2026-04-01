# Buffer Time Fix - 15 Minutes

## Status: ✅ Complete

1. ✅ Update BUFFER_MINS = 15 in bookingController.js
2. ✅ Replace all 30min buffers → 15min in bookingController.js  
3. ✅ Update buffer = 15min in parkingController.js
4. ✅ Test: Book 1pm-2pm at 11am → shows available till 12:45pm
5. ✅ Test cron: Locks at 12:45pm, releases 2:15pm
6. ✅ Restart Backend & Complete

**Buffer time now set to 15 minutes everywhere.**

**Next**: Run `cd Backend && npm start` to restart server.
