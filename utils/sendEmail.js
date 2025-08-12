// sendEmail.js
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env

async function sendEmail(to, subject, message) {
  try {
    // Create reusable transporter object using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
      port: process.env.SMTP_PORT, // e.g., 465 for SSL, 587 for TLS
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your email password or app password
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: `"Your App Name" <${process.env.SMTP_USER}>`, // sender
      to, // recipient(s)
      subject, // subject line
      html: `<p>${message}</p>`, // HTML body
    });

    console.log(`✅ Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

module.exports = sendEmail;
