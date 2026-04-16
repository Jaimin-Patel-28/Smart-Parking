const nodemailer = require('nodemailer');
const { createSupportTicket } = require('../services/support.service');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendContactEmail = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      category = 'General',
      userId = null,
      bookingContext = null,
      transactionContext = null,
    } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const supportTicket = await createSupportTicket({
      user: userId,
      name,
      email,
      category,
      subject,
      message,
      bookingContext,
      transactionContext,
      source: 'contact-form',
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'smartpark.spms@gmail.com',
      subject: `SmartPark Support [${category}]: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FA8112;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
            <p><strong>Ticket:</strong> ${supportTicket.ticketNumber}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Category:</strong> ${category}</p>
            ${bookingContext?.bookingCode ? `<p><strong>Booking:</strong> ${bookingContext.bookingCode}</p>` : ''}
            ${transactionContext?.transactionId ? `<p><strong>Transaction:</strong> ${transactionContext.transactionId}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #FA8112;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from the SmartPark contact form.
          </p>
        </div>
      `
    };

    // Send email if available, but keep the stored ticket as the source of truth.
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error('Email sending error:', mailError);
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      data: {
        ticketId: supportTicket._id,
        ticketNumber: supportTicket.ticketNumber,
      },
    });

  } catch (error) {
    console.error('Support request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
};