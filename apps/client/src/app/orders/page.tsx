import {auth }  from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

const fetchOrders = async () => {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) return [];
    const data: OrderType[] = await res.json();
    return data;
}

const OrdersPage = async () => {
    const orders = await fetchOrders();

    if(!orders || orders.length === 0) {
        return <div className="text-center mt-12">No orders found.</div>
    }
    console.log(orders);
    return (
        <div className="mt-8">
            <h1 className="text-2xl font-medium mb-6">Your Orders</h1>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-gray-500 text-left">
                            <th className="pb-3 font-medium">Order ID</th>
                            <th className="pb-3 font-medium">Total</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium">Date</th>
                            <th className="pb-3 font-medium">Products</th>
                            <th className="pb-3 font-medium">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="border-b last:border-0">
                                <td className="py-3 text-gray-500 text-xs">{order._id}</td>
                                <td className="py-3">${(order.amount / 100).toFixed(2)}</td>
                                <td className="py-3">{order.status}</td>
                                <td className="py-3">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</td>
                                <td className="py-3">
                                    {order.products?.map(item => (
                                        <p key={item.name}>{item.name}</p>
                                    ))}
                                </td>
                                <td className="py-3">
                                    {order.products?.reduce((acc, item) => acc + item.quantity, 0)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersPage