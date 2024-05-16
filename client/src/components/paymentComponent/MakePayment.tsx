import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';

const makePayment = async (cartItems: any[],orderId:string) => {
  // Load Stripe
  const stripe: Stripe | null = await loadStripe(
    'pk_test_51OsGMhSGNsnSSQRQmPDqI6xJFK09rFCalwmbNMumK9z4nZUKue3zLhovNAdP8beG5JRx9WLXOoviK2gaJuD22xZK00VLA7Ssad'
  );

  // Prepare request body
  const body = {
    products: cartItems,
  };
console.log(body)
  // Make axios request to create checkout session
  try {
    const response = await axios.post(`http://localhost:8080/api/order/checkout-session/${orderId}`, body);

    // Extract session ID from the response
    console.log(response.data)
    const sessionId = response.data.id;
    // Redirect to checkout session using the session ID
    const result = await stripe?.redirectToCheckout({ sessionId: sessionId });
  } catch (error) {
    console.error('Error creating checkout session:', error);
  }
};

export default makePayment;
