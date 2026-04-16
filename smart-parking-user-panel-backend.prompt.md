---
name: smart-parking-user-panel-backend
description: "Generate or extend the backend for Smart Parking User-Panel pages such as Booking Details, Wallet/Payments, and Notifications."
---

You are working in the Smart-Parking-Final workspace.

Build or extend the backend for these User-Panel pages:
- Booking Details page
- Wallet/Payments page
- Notifications page

Follow the existing backend style, folder structure, naming conventions, response shapes, and middleware patterns already used in the project.

Before making changes, inspect the current backend implementation for:
- routes
- controllers
- services
- models
- middleware
- any existing frontend API usage that depends on the backend

Implement the backend in a production-ready way with minimal, focused changes. Prefer extending existing modules over creating duplicate patterns.

Required backend capabilities:
- Booking Details
  - fetch a single booking by id
  - return slot and parking details
  - include booking time, duration, status, and payment status
  - support cancel and extend actions when permitted
  - include any booking metadata needed for a detailed view, such as QR-code or access data if the system supports it

- Wallet/Payments
  - fetch wallet balance and wallet summary
  - return transaction history
  - support top-up or payment initiation if the project already has payment flow support
  - track payment status, refunds, and booking-related charges if applicable
  - expose clean endpoints for the frontend to consume

- Notifications
  - fetch user notifications
  - return unread counts
  - mark notifications as read
  - support clearing or deleting notifications if appropriate
  - connect notification data to booking, payment, and account events where relevant

Implementation rules:
- Reuse the existing auth and role middleware.
- Keep endpoint naming consistent with the rest of the API.
- Preserve compatibility with the current frontend wherever possible.
- Add validation, error handling, and authorization checks where needed.
- If a required model or endpoint does not exist, create the smallest sensible backend addition.
- If database schema changes are needed, make them explicit and keep them backward compatible.
- Add or update tests only if the repo already uses them for the affected area.

When finished, summarize:
- what backend files were changed
- what new endpoints were added
- what frontend pages those endpoints support
- any assumptions or follow-up work still needed
