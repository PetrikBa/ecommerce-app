"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const TestPage = () => {
    const { getToken, isLoaded } = useAuth();
    const [productMessage, setProductMessage] = useState("Loading...");
    const [orderMessage, setOrderMessage] = useState("Loading...");

    useEffect(() => {
        const runProduct = async () => {
            if (!isLoaded) return;

            const token = await getToken();

            const resProduct = await fetch("http://localhost:8000/test", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const dataProduct = await resProduct.json();
            setProductMessage(dataProduct.message);
        };

        runProduct();

        const runOrder = async () => {
            if (!isLoaded) return;

            const token = await getToken();

            const resOrder = await fetch("http://localhost:8001/test", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const dataOrder = await resOrder.json();
            setOrderMessage(dataOrder.message);
        };

        runOrder();
    }, [getToken, isLoaded]);

    return (
        <div className="p-4">
            <div>Product service: {productMessage}</div>
            <div>Order service: {orderMessage}</div>
        </div>
    );
};

export default TestPage