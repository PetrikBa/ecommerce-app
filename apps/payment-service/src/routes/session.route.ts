import { Hono } from 'hono';
import $stripe from 'stripe';
import { shouldBeUser } from '../middleware/authMiddleware';
import { CartItemsType } from '@repo/types';
import { getStripeProductPrice } from '../utils/stripeProduct';

const sessionRoute = new Hono;

const stripe = new $stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia" as any,
});


sessionRoute.post('/create-checkout-session', shouldBeUser, async (c) => {

    const { cart }: {cart: CartItemsType} = await c.req.json();
    const userId = c.get('userId');

    try {
    const lineItems = await Promise.all(
        cart.map(async (item) => {
            const unitAmount = await getStripeProductPrice(item.id);
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: unitAmount as number,
                },
                quantity: item.quantity,
            }
        })
    );
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        client_reference_id: userId,
        mode: 'payment',
        ui_mode: 'elements' as any,
        return_url: `${process.env.CLIENT_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
            userId,
            cart: JSON.stringify(cart.map(({ id, quantity, selectedSize, selectedColor }) => ({ id, quantity, selectedSize, selectedColor }))),
        }
        });

    return c.json({checkoutSessionClientSecret: session.client_secret});  
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return c.json({ error: 'Failed to create checkout session' }, 500);     

    }
});

sessionRoute.get('/:session_id', async (c) => {
        const { session_id } = c.req.param();
        const session = await stripe.checkout.sessions.retrieve(session_id as string, {
            expand: ['line_items']
        });    

        console.log(session);  
        return c.json({
            session: session.status,
            paymentStatus: session.payment_status,
        });
});

export default sessionRoute;