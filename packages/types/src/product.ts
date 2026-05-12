import type { Product, Category} from "@repo/product-db";
import z from "zod";

export type ProductType = Product;

export type ProductsType = ProductType[];


export type StripeProductType = {
    id: string;
    name: string;
    price: number;
}

export const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

export const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

export const ProductFormSchema = z.object({
  name: z.string({message: "Name must be at least 1 character long"}).min(1, "Name must be at least 1 character long"),
  shortDescription: z.string({message: "Short description must be at least 5 characters long"}).min(1, "Short description must be at least 5 characters long").max(60),
  description: z.string({message: "Description must be at least 1 character long"}).min(1, "Description must be at least 1 character long"),
  price: z.number({message: "Price must be a positive number"}).min(0, "Price must be a positive number"), 
  categorySlug: z.string({message: "Category is required"}).min(1, "Category is required"),
  colors: z.array(z.enum(colors)).min(1, "At least one color is required"),
  sizes: z.array(z.enum(sizes)).min(1, "At least one size is required"),
  images: z.record(z.string(), z.string(), {message: "Image for each color is required"})
}).refine(data=> {
    const missingImages = data.colors.filter(
        (color:string) => !data.images[color]
    );
    return missingImages.length === 0;
},{
    message: "Image for each color is required",
    path: ["images"],
})


export const CategoryFormSchema = z.object({
    name: z
        .string("Category name must be at least 2 characters long")
        .min(1, "Category name must be at least 2 characters long"), 
    slug: z
        .string("Category slug must be at least 2 characters long")
        .min(1, "Category slug must be at least 2 characters long"), 
})

export type CategoryType = Category;
export type CategoriesType = CategoryType[];

