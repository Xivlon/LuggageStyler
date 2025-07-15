const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.static('.'));

// Create payment intent for Stripe
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, planType, customerEmail, customerName } = req.body;
    
    if (!amount || !planType) {
      return res.status(400).json({ error: 'Amount and plan type are required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        planType: planType,
        customerEmail: customerEmail || '',
        customerName: customerName || ''
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Process membership signup
app.post('/api/process-membership', async (req, res) => {
  try {
    const { fullName, email, planType, amount, paymentIntentId } = req.body;
    
    if (!fullName || !email || !planType || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // In a real app, you would:
    // 1. Verify payment with Stripe
    // 2. Save customer to database
    // 3. Send confirmation email
    // 4. Create membership record

    // For now, we'll simulate success
    const membership = {
      id: Date.now(),
      customerName: fullName,
      email: email,
      planType: planType,
      amount: amount,
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: planType === 'monthly' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    };

    console.log('Membership created:', membership);

    res.json({
      success: true,
      membership: membership,
      message: 'Membership activated successfully!'
    });
  } catch (error) {
    console.error('Error processing membership:', error);
    res.status(500).json({ error: 'Failed to process membership' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Payment server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});