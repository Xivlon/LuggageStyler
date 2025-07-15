import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertPaymentSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get membership plans
  app.get("/api/membership-plans", async (req, res) => {
    try {
      const plans = await storage.getMembershipPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch membership plans" });
    }
  });

  // Get specific membership plan
  app.get("/api/membership-plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid plan ID" });
      }

      const plan = await storage.getMembershipPlan(id);
      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }

      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch membership plan" });
    }
  });

  // Create Stripe payment intent
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, planType } = req.body;
      
      if (!amount || !planType) {
        return res.status(400).json({ message: "Amount and plan type are required" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          planType: planType
        }
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Process payment
  app.post("/api/payments", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertPaymentSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid payment data",
          errors: validationResult.error.errors
        });
      }

      const paymentData = validationResult.data;
      
      // Verify plan exists
      const plan = await storage.getMembershipPlan(paymentData.planId);
      if (!plan) {
        return res.status(404).json({ message: "Selected plan not found" });
      }

      // Create payment record (excluding sensitive card data)
      const payment = await storage.createPayment({
        planId: paymentData.planId,
        amount: paymentData.amount,
        cardholderName: paymentData.cardholderName,
        email: paymentData.email,
        status: "completed"
      });

      res.json({
        success: true,
        payment: {
          id: payment.id,
          planId: payment.planId,
          amount: payment.amount,
          status: payment.status,
          createdAt: payment.createdAt
        },
        plan: {
          name: plan.name,
          type: plan.type,
          validityDays: plan.validityDays
        }
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      res.status(500).json({ message: "Payment processing failed. Please try again." });
    }
  });

  // Get payment status
  app.get("/api/payments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid payment ID" });
      }

      const payment = await storage.getPayment(id);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      // Don't return sensitive data
      res.json({
        id: payment.id,
        planId: payment.planId,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
