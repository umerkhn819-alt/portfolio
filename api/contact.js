import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS configuration (allow requests from the frontend)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Configure the email transport using Gmail
    // Make sure to add EMAIL_USER and EMAIL_PASS to your Vercel Environment Variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This MUST be an App Password, not your regular password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'umerkhn819@gmail.com', // Sending to yourself
      replyTo: email, // If you hit "Reply" in Gmail, it replies to the person who filled the form
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio contact form!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please check server logs.' });
  }
}
