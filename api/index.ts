import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();

// Configure multer with memory storage (5MB max limit)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Server running on Vercel" });
});

// Contact Form Endpoint (Original)
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  try {
    await transporter.sendMail({
      from: `"${name.trim()}" <${process.env.SMTP_USER}>`,
      replyTo: email.trim(),
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New Contact Message from ${name.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #28a745; margin-top: 0;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 6px;">${message.trim()}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("SMTP Contact Error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

// Join Chapter Application Endpoint (With Resume Attachment)
app.post("/api/join", upload.single("resume"), async (req, res) => {
  const { name, email, year, interest } = req.body;

  if (!name?.trim() || !email?.trim() || !year?.trim() || !interest?.trim()) {
    return res.status(400).json({ error: "All text fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  if (req.file) {
    attachments.push({
      filename: req.file.originalname,
      content: req.file.buffer,
    });
  }

  try {
    await transporter.sendMail({
      from: `"Chapter Application: ${name.trim()}" <${process.env.SMTP_USER}>`,
      replyTo: email.trim(),
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `🎯 New Chapter Membership Application - ${name.trim()} (${year})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #28a745; margin-top: 0;">New Chapter Application</h2>
          <p><strong>Applicant Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Academic Year:</strong> ${year.trim()}</p>
          <p><strong>Resume Attached:</strong> ${req.file ? req.file.originalname : "No resume uploaded"}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Area of Interest / Note:</strong></p>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 6px;">${interest.trim()}</p>
        </div>
      `,
      attachments,
    });

    return res.status(200).json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("SMTP Application Error:", error);
    return res.status(500).json({ error: "Failed to submit application. Please try again later." });
  }
});

export default app;