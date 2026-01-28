import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import { envConfig } from "@/services";

// Load Stripe with your publishable key
const stripePromise = loadStripe(envConfig.stripePublishableKey || "");

function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}

export default CheckoutWrapper;
