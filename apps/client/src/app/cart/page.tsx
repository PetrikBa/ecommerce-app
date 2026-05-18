import { Suspense } from "react";
import CartClient from "./CartClient";

const CartPage = () => {
  return (
    <Suspense fallback={null}>
      <CartClient />
    </Suspense>
  );
}

export default CartPage
