import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create transporter with more explicit settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.SMTP_EMAIL || 'rayyanhassan1688@gmail.com',
      // Strip spaces from the App Password string
      pass: (process.env.SMTP_PASSWORD || 'zpqynkjcqrxsthaa').replace(/\s/g, ''),
    },
  });

  // Email content
  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.SMTP_EMAIL || 'rayyanhassan1688@gmail.com'}>`,
    replyTo: email, // <--- Correctly set replyTo to user's email
    to: process.env.RECEIVER_EMAIL || 'rayyanhassan1688@gmail.com',
    subject: `New Message: ${subject}`,
    text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #088F8F; border-radius: 12px; overflow: hidden;">
        <div style="background: #088F8F; color: white; padding: 24px; text-align: center;">
          <h2 style="margin: 0;">Portfolio Message</h2>
        </div>
        <div style="padding: 24px; background: #fafafa; color: #333;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #088F8F;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div style="padding: 16px; text-align: center; background: #eee; font-size: 12px; color: #666;">
          This message was sent via your portfolio contact form.
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
