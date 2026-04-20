import { Order } from "@repo/order-db";
import { OrderType } from "@repo/types";

export const createOrder = async (order: OrderType) => {
    const newOrder = new Order(order)

    try {
        await newOrder.save();
        console.log(`Order for user ${order.userId} successfully created with id ${newOrder._id}`);
        return newOrder;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}