const SupportTicket = require("../models/SupportTicket");

const createSupportTicket = async ({
  user,
  name,
  email,
  category = "General",
  subject,
  message,
  bookingContext = null,
  transactionContext = null,
  source = "contact-form",
}) => {
  return SupportTicket.create({
    user: user || null,
    name,
    email,
    category,
    subject,
    message,
    bookingContext,
    transactionContext,
    source,
  });
};

const buildSupportQuery = ({ status, category, search }) => {
  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (category && category !== "all") {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { ticketNumber: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }

  return query;
};

const listSupportTickets = async ({ page = 1, limit = 10, status, category, search } = {}) => {
  const query = buildSupportQuery({ status, category, search });
  const skip = (Number(page) - 1) * Number(limit);

  const [tickets, total, openCount, inProgressCount, resolvedCount, closedCount] = await Promise.all([
    SupportTicket.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("user", "fullName email role userId")
      .populate("handledBy", "fullName email role")
      .lean(),
    SupportTicket.countDocuments(query),
    SupportTicket.countDocuments({ status: "open" }),
    SupportTicket.countDocuments({ status: "in-progress" }),
    SupportTicket.countDocuments({ status: "resolved" }),
    SupportTicket.countDocuments({ status: "closed" }),
  ]);

  return {
    tickets,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.max(1, Math.ceil(total / Number(limit))),
    counts: {
      open: openCount,
      inProgress: inProgressCount,
      resolved: resolvedCount,
      closed: closedCount,
    },
  };
};

const listUserSupportTickets = async (
  userId,
  { page = 1, limit = 5, status } = {},
) => {
  const query = { user: userId };

  if (status && status !== "all") {
    query.status = status;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [tickets, total] = await Promise.all([
    SupportTicket.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate("handledBy", "fullName email role")
      .lean(),
    SupportTicket.countDocuments(query),
  ]);

  return {
    tickets,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.max(1, Math.ceil(total / Number(limit))),
  };
};

const reopenUserSupportTicket = async (ticketId, userId) => {
  const ticket = await SupportTicket.findOne({ _id: ticketId, user: userId })
    .populate("handledBy", "fullName email role")
    .populate("user", "fullName email role userId");

  if (!ticket) {
    return null;
  }

  if (!["resolved", "closed"].includes(ticket.status)) {
    return { error: "Only resolved or closed tickets can be reopened." };
  }

  ticket.status = "open";
  ticket.resolvedAt = null;

  await ticket.save();

  return ticket;
};

const getSupportTicketById = async (id) => {
  return SupportTicket.findById(id)
    .populate("user", "fullName email role userId")
    .populate("handledBy", "fullName email role");
};

const updateSupportTicket = async (id, { status, adminNotes, handledBy }) => {
  const ticket = await SupportTicket.findById(id);

  if (!ticket) {
    return null;
  }

  if (status) {
    ticket.status = status;
    ticket.resolvedAt = ["resolved", "closed"].includes(status)
      ? ticket.resolvedAt || new Date()
      : null;
  }

  if (typeof adminNotes === "string") {
    ticket.adminNotes = adminNotes;
  }

  if (handledBy) {
    ticket.handledBy = handledBy;
  }

  await ticket.save();

  await ticket.populate([
    { path: "user", select: "fullName email role userId" },
    { path: "handledBy", select: "fullName email role" },
  ]);

  return ticket;
};

module.exports = {
  createSupportTicket,
  listSupportTickets,
  listUserSupportTickets,
  reopenUserSupportTicket,
  getSupportTicketById,
  updateSupportTicket,
};