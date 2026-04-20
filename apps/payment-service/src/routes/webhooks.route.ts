import { Hono } from 'hono';
import Stripe from 'stripe';
import stripe from '../utils/stripe';
import { producer } from '../utils/kafka';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const webHookRoute = new Hono();

webHookRoute.post('/stripe', async (c) => {
    console.log('[WEBHOOK] Received request');
    const body = await c.req.text();
    const sig = c.req.header('stripe-signature') as string;

    if (!sig) {
        console.error('[WEBHOOK] Missing stripe-signature header');
        return c.json({ error: 'Missing stripe-signature header' }, 400);
    }

    if (!webhookSecret) {
        console.error('[WEBHOOK] STRIPE_WEBHOOK_SECRET is not set');
        return c.json({ error: 'Webhook secret not configured' }, 500);
    }

    let event : Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
        console.log('[WEBHOOK] Signature verified, event type:', event.type);
    } catch (error) {
        console.error('[WEBHOOK] Signature verification failed:', error);
        return c.json({ error: 'Webhook verification failed' }, 400);
    }

    switch (event.type) {
        case "checkout.session.completed":
            try {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log('[WEBHOOK] Session id:', session.id, '| payment_status:', session.payment_status, '| client_reference_id:', session.client_reference_id);

                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                console.log('[WEBHOOK] Line items count:', lineItems.data.length);

                const payload = {
                    userId: session.client_reference_id,
                    email: session.customer_details?.email ?? "unknown@test.com",
                    amount: session.amount_total ?? 0,
                    status: session.payment_status === "paid" ? "success" : "failed",
                    products: lineItems.data.map(item => ({
                        name: item.description ?? "",
                        quantity: item.quantity ?? 0,
                        price: item.price?.unit_amount ?? 0
                    }))
                };
                console.log('[WEBHOOK] Sending Kafka message payload:', JSON.stringify(payload));

                await producer.send("payment.successfull", payload);
                console.log('[WEBHOOK] Kafka message sent successfully');
            } catch (error) {
                console.error('[WEBHOOK] Error processing checkout.session.completed:', error);
                return c.json({ error: 'Internal error processing webhook' }, 500);
            }
            break;
        default:
            console.warn(`[WEBHOOK] Unhandled event type: ${event.type}`);        
        break;

    }   
    return c.json({ received: true });
    
});

export default webHookRoute;

//stripe listen --forward-to localhost:8002/webhooks/stripe
