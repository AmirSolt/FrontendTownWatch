import Stripe from "stripe";
import { stripe } from "$lib/stripe/stripe.server";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { PUBLIC_DOMAIN } from "$env/static/public";


export const load = async () => {

  const prices = await stripe.prices.list();  
    
  return {
    prices:prices.data,
  }
};



const CheckoutRequestSchema = z.object({
	amount: z.number().min(5).max(10000),
});


export const actions = {
  default:async({request})=>{

    const data = await request.formData();
		const amountStr = data.get('amount') as string;
    const amount = parseInt(amountStr)

    // Validation
    const validationResponse = CheckoutRequestSchema.safeParse({
      amount,
    })
      if ( !validationResponse.success){
          let issues = validationResponse.error.issues
    return fail(400, {
      errorMessage: issues.length == 0 ? "Unkown issue" : issues[0].message
    })
      }

    // create checkout
    let checkoutSession:Stripe.Checkout.Session|undefined
    try{
        checkoutSession = await createCheckoutSession(amount)
    } catch(e){
        return fail(500,{
            errorMessage:e,
        })
    }
    throw redirect(302, checkoutSession.url!)
  }
};




async function createCheckoutSession(amount:number){

  const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data:{
            currency:"CAD",
            product_data:{
              name:"Donation"
            },
            unit_amount:amount*100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://${PUBLIC_DOMAIN}/donate/success`,
      cancel_url: `https://${PUBLIC_DOMAIN}/donate`,
  });

  if(checkoutSession.url==null){
    throw Error("Something went wrong. Please try again later!")
  }


  return checkoutSession
}
  
