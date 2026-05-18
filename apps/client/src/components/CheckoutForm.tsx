"use client"

import { ShippingFormInputs } from "@repo/types";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
import { ConfirmError } from "@stripe/stripe-js/dist/stripe-js/checkout";
import { useState } from "react";

const CheckoutForm = ({shippingForm}: {shippingForm: ShippingFormInputs}) => {

    const checkoutState = useCheckout();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<ConfirmError | null>(null);


    const handleClick = async () => {
        if (checkoutState.type !== "success") return;
        const checkout = checkoutState.checkout;
        setLoading(true);
        await checkout.updateEmail(shippingForm.email);
        await checkout.updateShippingAddress({
            name: "shipping_address",
            address: {
                line1: shippingForm.address,
                city: shippingForm.city,
                country : "US",
            }
        });

        const res = await checkout.confirm();
        if (res.type === "error") {
            setError(res.error);
            }
        setLoading(false);
        };
    return (
        <form className="">
            <PaymentElement options={{layout: 'accordion'}}/>
            <button
                disabled={loading}
                onClick={handleClick}
                className="mt-4 w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {error && <div className="text-red-500">{error.message}</div>}
        </form>
    )
}

export default CheckoutForm;