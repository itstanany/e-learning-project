import { useCallback } from 'react';
import Head from 'next/head';
import { apiPostJson } from '../../utils/client';
import { getStripe } from '../../utils/client/stripe';

function Enroll() {
  const redirectToCheckout = useCallback(
    async () => {
      const { data: { id } } = await apiPostJson({
        url: 'stripe/checkoutSession',
        body: {
          items: [{
            price: 'price_1Jhf4jALkn9vhIlFaPTlqVSF',
            quantity: 3,
          }],
        },
      });
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: id });
    },
    [],
  );
  return (
    <>
      <Head>
        <title>
          Enroll
        </title>
      </Head>
      <div>
        Enroll page placeholder.
        <h1>
          Coming Soon, Stay tuned!
        </h1>
      </div>
    </>

  );
}

export default Enroll;

export {
  Enroll,
};
