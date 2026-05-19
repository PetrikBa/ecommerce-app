"use client";

import { loadStripe } from "@stripe/stripe-js";
import {CheckoutElementsProvider} from '@stripe/react-stripe-js/checkout';
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItemsType, ShippingFormInputs } from "@repo/types";
import CheckoutForm from "./CheckoutForm";
import useCartStore from "@/stores/CartStore";

const stripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({ cart }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Payment service error ${response.status}: ${text}`);
  }
  const json = await response.json();
  return json.checkoutSessionClientSecret as string | undefined;
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();

  useEffect(() => {
    getToken().then((token) => {
      if (!token) {
        setError("Authentication error: could not get token.");
        return;
      }
      fetchClientSecret(cart, token)
        .then((secret) => {
          if (!secret) {
            setError("Payment service did not return a client secret. Check that the payment service is running and environment variables are set.");
            return;
          }
          setClientSecret(secret);
        })
        .catch((err) => {
          setError(`Failed to initialize payment: ${err?.message ?? err}`);
        });
    });
  }, []);

  if (!isSignedIn) {
    return (
      <div className="flex flex-col gap-3 text-sm">
        <p className="text-gray-700">You must be logged in to proceed with payment.</p>
        <a href="/sign-in" className="text-blue-600 hover:underline">Sign in to your account</a>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  if (!clientSecret) {
    return <div className="">Loading...</div>;
  }

  return (
    <CheckoutElementsProvider
      stripe={stripe}
      options={{ clientSecret }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutElementsProvider>
  );
};

export default StripePaymentForm;