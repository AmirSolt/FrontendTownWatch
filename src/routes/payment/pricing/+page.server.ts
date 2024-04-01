
import { stripe } from "$lib/stripe/stripe.server";

export const load = async ({locals}) => {

  const prices = await stripe.prices.list();  
    
  return {
    user:locals.user,
    prices:prices.data,
  }
};



