import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { HttpStatus } from "../enums/HttpStatus.enum";
import StudentRepository from "../repositories/student.repository";
dotenv.config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY!; // Add the ! operator to assert that it's not undefined
const stripe = new Stripe(stripeSecretKey, {});


class StripePayments {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  async checkoutSession(req: Request, res: Response) {
    try {
      const { products } = req.body;
      const orderId = req.params.orderId;
      // Create line items array
      const lineItems = products.map((product: any) => ({
        price_data: {
          currency: "USD",
          product_data: {
            name: product.course_title,
          },
          unit_amount: Math.floor(product.prize * 100), // Convert prize to cents (assuming it's in dollars)
        },
        quantity: 1,
      }));

      // Create a new checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        // Add appropriate URLs for success and cancel redirects
        success_url: `https://studybuddy-react-host.s3.ap-south-1.amazonaws.com/success/${orderId}`,
        cancel_url: "https://studybuddy-react-host.s3.ap-south-1.amazonaws.com/cancel",
        // success_url: `http://localhost:3000/success/${orderId}`,
        // cancel_url: "http://localhost:3000/cancel",
      });

      // Send the session URL to the client

      res.json({ id: session.id });
    } catch (error) {
      // Handle any errors
      console.error("Error creating checkout session:", error);
      res
        .status(HttpStatus.ServerError)
        .send({ success: false, message: "Error creating checkout session" });
    }
  }
}

export default StripePayments;
