import { prisma } from '@repo/product-db';
import stripe from '../utils/stripe.js';

async function syncProducts() {
    const products = await prisma.product.findMany();

    console.log(`Syncing ${products.length} products to Stripe...`);

    for (const product of products) {
        try {
            await stripe.products.create({
                id: product.id.toString(),
                name: product.name,
                default_price_data: {
                    currency: 'usd',
                    unit_amount: product.price, // already in cents
                },
            });
            console.log(`✓ ${product.name} (id: ${product.id})`);
        } catch (error: any) {
            if (error?.code === 'resource_already_exists') {
                console.log(`- ${product.name} (id: ${product.id}) already exists, skipping`);
            } else {
                console.error(`✗ ${product.name} (id: ${product.id}):`, error?.message);
            }
        }
    }

    await prisma.$disconnect();
    console.log('Done.');
}

syncProducts();
