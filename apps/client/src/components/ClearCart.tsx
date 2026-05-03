"use client"

import { useEffect } from "react";
import UseCartStore from "@/stores/CartStore";

const ClearCart = () => {
    const { clearCart } = UseCartStore();

    useEffect(() => {
        clearCart();
    }, []);

    return null;
};

export default ClearCart;
