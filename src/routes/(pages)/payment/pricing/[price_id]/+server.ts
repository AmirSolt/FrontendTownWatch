
import { stripe } from "$lib/stripe/stripe.server";
import { error, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { PUBLIC_DOMAIN } from "$env/static/public";



const CheckoutRequestSchema = z.object({
	priceID: z.string().min(1),
});


export const GET = async ({locals, params}) => {
    if ( locals.user == null ) {
        throw error(403, {message:"Unauthorized"})
      }
      const priceID = params.price_id
  
      // validation
      const validationResponse = CheckoutRequestSchema.safeParse({
        priceID,
      })
      if ( !validationResponse.success){
        throw error(400, {
          message: validationResponse.error.message
        })
      }
  
  
      let customer:Customer|undefined|null
      try{
        customer = await locals.pb.collection('customers').getFirstListItem(`user.id="${locals.user.id}"`);
      } catch(e){
      }
    
  
    if(customer==null || customer.stripe_subscription_id==null || customer.stripe_subscription_id==""){
      await checkout(priceID, customer, locals.user)
    } else {
      await updatePrice(priceID, customer, locals.user)
    }
};





async function checkout(priceID:string, customer:Customer|null|undefined, user:User){

  let customerID:string|undefined
  let email:string|undefined
  if (customer!=null){
    customerID = customer.stripe_customer_id
  } else {
    email = user.email
  }

  const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price:priceID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${PUBLIC_DOMAIN}/payment/success`,
      cancel_url: `${PUBLIC_DOMAIN}/payment/pricing`,
      customer:customerID,
      customer_email:email,
  });

  if (checkoutSession.url==null) {
      throw error(400, {
          message: "Error: Could not create checkout",
      })
  }

  throw redirect(302, checkoutSession.url)
}

async function updatePrice(priceID:string, customer:Customer, user:User){

  
const subscription = await stripe.subscriptions.retrieve(
  customer.stripe_subscription_id
);


  const newSubscription = await stripe.subscriptions.update(
    customer.stripe_subscription_id,
    {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceID,
        },
      ],
    }
  );

  throw redirect(302, "/payment/wallet")
}