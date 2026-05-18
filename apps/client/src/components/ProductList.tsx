"use client"

import { ProductsType } from "@repo/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Filter from "@/components/Filter";
import { Suspense, useEffect, useState } from "react";

const ProductList = ({ category, sort, search, params }: { 
    category: string, 
    sort?: string, 
    search?: string, 
    params: "homepage" | "products" 
  }) => {
  const [products, setProducts] = useState<ProductsType>([]);
  const [loading, setLoading] = useState(true);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const slowTimer = setTimeout(() => setSlow(true), 3000);
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`;
    fetch(url)
      .then(res => res.ok ? res.json() : { products: [] })
      .then(data => setProducts(data.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => { setLoading(false); clearTimeout(slowTimer); });
    return () => clearTimeout(slowTimer);
  }, [category, search, sort, params]);

  return (
    <div className='w-full'>
        <Suspense fallback={null}><Categories /></Suspense>
        {params === "products" && <Suspense fallback={null}><Filter /></Suspense>}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            {slow && (
              <p className="text-sm text-center max-w-xs">
                The server is waking up from sleep mode — this may take up to 60 seconds on the first visit. Thanks for your patience!
              </p>
            )}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center py-24 text-gray-400 text-sm">No products found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Link href={category ? `/products/${category}` : "/products"} className="flex justify-end mt-4 underline text-sm text-gray-500">View All Products</Link>
          </>
        )}
    </div>
  )
}

export default ProductList