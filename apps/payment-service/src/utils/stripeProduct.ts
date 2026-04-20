import stripe from './stripe';
import type Stripe from 'stripe';
import { StripeProductType } from '@repo/types';

export const createStripeProduct = async (item: StripeProductType) => {
    try {
        const res = await stripe.products.create({
            id: item.id,
            name: item.name,
            default_price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            }
        });
        console.log(`Product "${res.name}" (id: ${res.id}) successfully created in Stripe`);
        return res;
    } catch (error) {
        console.error('Error creating Stripe product:', error);
        throw error;
    }
}

export const getStripeProductPrice = async (productId:number) => {
    try {
        const res = await stripe.prices.list({
            product: productId.toString(),
        });
        return res.data[0]?.unit_amount;
    } catch (error) {
        console.error('Error creating Stripe product:', error);
        throw error;
    }
}

export const deleteStripeProduct = async (item: {id: number}) => {
    try {
        const productId = item.id.toString();

        // Unset default_price before deactivating prices (Stripe rejects deactivating a default price)
        await stripe.products.update(productId, { default_price: '' as any });

        const prices = await stripe.prices.list({ product: productId, active: true });
        await Promise.all(prices.data.map(price => stripe.prices.update(price.id, { active: false })));

        const res = await stripe.products.update(productId, { active: false });
        console.log(`Product "${productId}" successfully archived in Stripe`);
        return res;
    } catch (error) {
        console.error('Error archiving Stripe product:', error);
        throw error;
    }
}