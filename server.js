const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const port = 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('Received POST request to /api/contact');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    
    try {
        const { firstName, lastName, email, subject, message } = req.body;
        
        // Validate required fields
        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields are required' 
            });
        }

        // Send email using Resend
        const emailData = await resend.emails.send({
            from: 'Luggsters Contact Form <onboarding@resend.dev>',
            to: 'admin@holdmyluggage.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                
                <hr>
                <p><em>This message was sent from the Luggsters website contact form.</em></p>
            `
        });

        console.log('Email sent successfully:', emailData);
        
        res.json({ 
            success: true, 
            message: 'Your message has been sent successfully!' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Full error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        res.status(500).json({ 
            success: false, 
            error: 'Failed to send message. Please try again later.' 
        });
    }
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Luggsters server running on http://0.0.0.0:${port}`);
});