import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from './keys';

const getStripe = () => (new Stripe(STRIPE_SECRET_KEY));

export {
  getStripe,
};
