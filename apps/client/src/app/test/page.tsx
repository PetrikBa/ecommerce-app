"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { set } from "zod";

const TestPage = () => {
    const { getToken, isLoaded } = useAuth();
    const [productMessage, setProductMessage] = useState("Loading...");
    const [orderMessage, setOrderMessage] = useState("Loading...");
    const [paymentMessage, setPaymentMessage] = useState("Loading...");
    const [paymentUserId, setPaymentUserId] = useState("");

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
            setPaymentUserId(dataProduct.userId);
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
            setPaymentUserId(dataOrder.userId);
        };

        runOrder();

        const runPayment = async () => {
            if (!isLoaded) return;

            const token = await getToken();

            console.log("Token for payment service:", token);

            const resPayment = await fetch("http://localhost:8002/test", {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const dataPayment = await resPayment.json();
            setPaymentMessage(dataPayment.message);
            setPaymentUserId(dataPayment.userId);
            console.log("Payment service response:", dataPayment);
        };

        runPayment();
    }, [getToken, isLoaded]);

    return (
        <div className="p-4">
            <div>Product service: {productMessage}</div>
            <div>Order service: {orderMessage}</div>
            <div>Payment service: {paymentMessage}</div>
            <div>Payment userId: {paymentUserId}</div>
            <div>Product userId: {paymentUserId}</div>
            <div>Order userId: {paymentUserId}</div>
        </div>
    );
};

export default TestPage