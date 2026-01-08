import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// Send contact form email
router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const { data, error } = await resend.emails.send({
            from: 'ScaleQmarketing <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL || 'contact@scaleqmarketing.com',
            subject: subject || 'New Contact Form Submission',
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Email sent successfully', id: data.id });
    } catch (error) {
        console.error('Send email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Send welcome email
router.post('/welcome', async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const { data, error } = await resend.emails.send({
            from: 'ScaleQmarketing <onboarding@resend.dev>',
            to: email,
            subject: 'Welcome to ScaleQmarketing!',
            html: `
        <h1>Welcome to ScaleQmarketing, ${name || 'there'}! 🎉</h1>
        <p>We're excited to have you on board. Get ready to scale your marketing efforts with AI-powered insights.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Add your first leads</li>
          <li>Create a marketing campaign</li>
          <li>Chat with our AI assistant for marketing tips</li>
        </ul>
        <p>If you have any questions, feel free to reach out!</p>
        <p>Best regards,<br>The ScaleQmarketing Team</p>
      `
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: 'Welcome email sent', id: data.id });
    } catch (error) {
        console.error('Send welcome email error:', error);
        res.status(500).json({ error: 'Failed to send welcome email' });
    }
});

export default router;
