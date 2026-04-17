import { Hono } from 'hono';
import Stripe from 'stripe';
import stripe from '../utils/stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const webHookRoute = new Hono();

webHookRoute.post('/stripe', async (c) => {
    const body = await c.req.text();
    const sig = c.req.header('stripe-signature') as string;

    let event : Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);

    } catch (error) {
        console.error('Webhook verification failed:');
        return c.json({ error: 'Webhook verification failed' }, 400);
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            //TODO : create order

            console.log('webhook received',session);

            break;
        default:
            console.warn(`Unhandled event type: ${event.type}`);        
        break;

    }   
    return c.json({ received: true });
    
});

export default webHookRoute;
