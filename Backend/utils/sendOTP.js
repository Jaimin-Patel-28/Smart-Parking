const nodemailer = require("nodemailer");

const sendOTP = async (email, otp, fullName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Smart-Park Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `🔐 ${otp} is your Smart-Park Verification Code`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            body { font-family: 'Inter', sans-serif; background-color: #1a1a1a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #222222; border: 1px solid #333; border-radius: 24px; overflow: hidden; }
            .header { background-color: #FA8112; padding: 40px 20px; text-align: center; }
            .header h1 { margin: 0; color: #1a1a1a; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: -1px; }
            .content { padding: 40px; text-align: center; color: #FAF3E1; }
            .greeting { font-size: 18px; color: rgba(250, 243, 225, 0.6); margin-bottom: 10px; }
            .name { font-size: 24px; font-weight: 900; margin-bottom: 30px; color: #FAF3E1; }
            .otp-container { background: rgba(250, 129, 18, 0.1); border: 1px dashed #FA8112; border-radius: 16px; padding: 20px; margin: 20px 0; }
            .otp-code { font-size: 30px; font-weight: 600; color: #FA8112; letter-spacing: 10px; margin: 0; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: rgba(250, 243, 225, 0.3); border-top: 1px solid #333; }
            .timer { color: #FA8112; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Smart-Park</h1>
            </div>
            <div class="content">
                <p class="greeting">Identity Verification</p>
                <div class="name">Hello, ${fullName}</div>
                <p style="opacity: 0.7;">To secure your account and finalize your parking access, please use the following one-time passcode:</p>
                
                <div class="otp-container">
                    <p class="otp-code">${otp}</p>
                </div>

                <p style="font-size: 14px;">This code is valid for <span class="timer">5 minutes</span>.</p>
                <p style="font-size: 12px; opacity: 0.5; margin-top: 30px;">
                    If you didn't request this, please ignore this email or contact support if you're concerned about your account security.
                </p>
            </div>
            <div class="footer">
                &copy; 2026 Smart-Park Solutions. All rights reserved.<br>
                High-Efficiency Parking Management Terminal
            </div>
        </div>
    </body>
    </html>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log("OTP Email Sent");
};

module.exports = sendOTP;
