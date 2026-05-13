import { Order } from "@repo/order-db";
import { OrderType } from "@repo/types";
import { producer } from "./kafka";

export const createOrder = async (order: OrderType) => {
    const newOrder = new Order(order)

    try {
        await newOrder.save();
        producer.send("order.created", {
            email: order.email,
            amount: order.amount,
            status: order.status
        });
        console.log(`Order for user ${order.userId} successfully created with id ${newOrder._id}`);
        return newOrder;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}