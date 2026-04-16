const {
  listSupportTickets,
  listUserSupportTickets,
  reopenUserSupportTicket,
  getSupportTicketById,
  updateSupportTicket,
} = require("../services/support.service");
const { sendNotification } = require("../services/notification.service");

exports.listTickets = async (req, res) => {
  try {
    const { page, limit, status, category, search } = req.query;

    const result = await listSupportTickets({
      page,
      limit,
      status,
      category,
      search,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await getSupportTicketById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Support ticket not found" });
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listMyTickets = async (req, res) => {
  try {
    const { page, limit, status } = req.query;
    const result = await listUserSupportTickets(req.user.id, {
      page,
      limit,
      status,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reopenMyTicket = async (req, res) => {
  try {
    const result = await reopenUserSupportTicket(req.params.id, req.user.id);

    if (!result) {
      return res.status(404).json({ message: "Support ticket not found" });
    }

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    void sendNotification({
      user: req.user.id,
      type: "support",
      title: "Support ticket reopened",
      message: `Your support ticket ${result.ticketNumber} is reopened and queued for review.`,
      entityType: "support-ticket",
      entityId: result._id,
      metadata: {
        ticketNumber: result.ticketNumber,
        status: result.status,
      },
    }).catch((notificationError) => {
      console.error("Support reopen notification error:", notificationError);
    });

    res.json({
      success: true,
      message: "Support ticket reopened",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const ticket = await updateSupportTicket(req.params.id, {
      status,
      adminNotes,
      handledBy: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({ message: "Support ticket not found" });
    }

    if (ticket.user) {
      const readableStatus = status
        ? status.replace("-", " ")
        : ticket.status.replace("-", " ");

      void sendNotification({
        user: ticket.user._id || ticket.user,
        type: "support",
        title: `Support ticket ${readableStatus}`,
        message: `Your support ticket ${ticket.ticketNumber} is now ${readableStatus}.`,
        entityType: "support-ticket",
        entityId: ticket._id,
        metadata: {
          ticketNumber: ticket.ticketNumber,
          status: ticket.status,
        },
      }).catch((notificationError) => {
        console.error("Support notification error:", notificationError);
      });
    }

    res.json({
      success: true,
      message: "Support ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};