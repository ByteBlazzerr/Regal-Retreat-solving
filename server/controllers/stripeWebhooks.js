import stripe from "stripe";
import Booking from "../models/Booking.js"

// API to handle Stripe Webhooks
const stripeInstance =new stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks=async(request,response)=>{
    // Stripe Gateway Initialize

    const sigd=request.headers['stripe-signature'];

    let event;
    try{
        event=stripeInstance.webhooks.constructEvent(request.body,
            sigd,
            process.env.STRIPE_WEBHOOK_SECRET)
    }
    catch(err){
        console.error("Webhook Error",err.message);
        response.status(400).send(`Webhook Error:${err.message}`)
    }

    // Handle the event
    if(event.type==="payment_intent.succeeded"){
        const paymentIntent=event.data.object;
        const paymentIntentId=paymentIntent.id;

        // Getting Session Metadata
        const session=await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId,
        });

        const {bookingId}=session.data[0].metadata;
        // Mark Payment as Paid
        await Booking.findByIdAndUpdate(bookingId,{isPaid:true,paymentMethod:"Stripe"})
    }
    else{
        console.log("Unhandled event type:",event.type)
    }
    response.json()
}