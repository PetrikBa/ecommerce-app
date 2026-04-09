import { JSX } from "react/jsx-dev-runtime";
import {z} from "zod";

export type ProductType = {
  id: string | number
  name: string
  shortDescription: string
  description: string
  price: number
  sizes: [string, ...string[]]
  colors: [string, ...string[]]
  images: { [key: string]: string }
};

export type ProductsType = ProductType[];

export type CategoryType = {
  name: string
  icon: JSX.Element
  slug: string
};

export type CategoriesType = CategoryType[];

export type CartItemType = ProductType & {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 12 characters")
    .max(12, "Phone number must be between 7 and 12 characters")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!")
})

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(1, "Card number is required!")
    .max(19, "Card number must be between 13 and 19 characters"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiration date must be in MM/YY format"),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
})

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart (product:CartItemType): void;
  removeFromCart (product:CartItemType): void;
  clearCart (): void;
}