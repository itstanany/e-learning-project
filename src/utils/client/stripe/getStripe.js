import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../config';

let stripePromise = null;

const getStipe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export {
  getStipe,
};
