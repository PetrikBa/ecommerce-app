import { ProductsType } from "@repo/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "@/components/Filter";

const fetchData = async ({
  category, search, sort, params
}: { category?: string, search?: string, sort?: string, params?: "homepage" | "products" }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`
  );

  const { products: data }: { products: ProductsType } = await res.json();
  return data;
}

const ProductList = async ({ category, sort, search, params }: { 
    category: string, 
    sort?: string, 
    search?: string, 
    params: "homepage" | "products" 
  }) => {
  const products = await fetchData({ category, sort, search,params });
  return (
    <div className='w-full'>
        <Categories />
        {params === "products" && <Filter />}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
            {products.map(product=> (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <Link href={category ? `/products/${category}` : "/products"} className="flex justify-end mt-4 underline text-sm text-gray-500">View All Products</Link>
    </div>
  )
}

export default ProductList