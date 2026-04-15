"use client"

import { ProductType } from "@repo/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { useState } from "react";
import UseCartStore from "@/stores/CartStore";
import { toast } from "react-toastify";

const ProductInteraction = ({ 
    product, 
    selectedSize, 
    selectedColor
}: { 
    product: ProductType; 
    selectedSize: string; 
    selectedColor: string;
}) => {
    
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [quantity, setQuantity] = useState(1);

    const {addToCart} = UseCartStore();
    
    const handleTypeChange = (type: string, value: string) => () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    const handleQuantityChange = (action: "increment" | "decrement") => {
        setQuantity(prev => {
            if (action === "increment") return prev + 1;
            if (action === "decrement" && prev > 1) return prev - 1;
            return prev;
        })
    }

    const handleAddtoCart = () => {
        addToCart({
            ...product,
            quantity,
            selectedSize,
            selectedColor
        });
        toast.success("Product added to cart!");
    }

    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* SIZE */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500">Size</span>
                <div className="flex items-center gap-2">
                    {product.sizes.map(size => (
                        <div 
                            key={size}
                            className={`border-1 p-[2px] ${selectedSize === size ? "border-gray-600" : "border-gray-300"} cursor-pointer`}
                            onClick={handleTypeChange("size", size)}
                        >
                            <div className={`w-6 h-6 text-center items-center flex justify-center ${selectedSize === size ? "bg-black text-white" : "bg-white text-black "}`}>{size.toUpperCase()}</div>
                            
                        </div>
                    ))}
                </div>
            </div>
            {/* COLOR */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500">Color</span>
                <div className="flex items-center gap-2">
                    {product.colors.map(color => (
                    <div key={color}
                        className={`border-1 p-[2px] ${selectedColor === color ? "border-gray-600" : "border-gray-300"} cursor-pointer`}
                        onClick={handleTypeChange("color", color)}
                    > 
                        <div className={`w-6 h-6 ${selectedColor === color ? "border-gray-600" : "border-gray-300"}`} style={{ backgroundColor: color }}></div>
                        
                    </div>
                ))}
                </div>
            </div>                    
            {/* QUANTITY */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500">Quantity</span>
                <div className="flex items-center gap-2">
                    <button 
                        className="cursor-pointer border-1 border-gray--300 p-1"
                        onClick={() => handleQuantityChange("decrement")}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span>{quantity}</span>
                    <button 
                        className="cursor-pointer border-1 border-gray--300 p-1"
                        onClick={() => handleQuantityChange("increment")}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>    
            {/* BUTTONS */}
            <button onClick={handleAddtoCart} className="bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" />
                Add to cart
            </button>
            <button className="ring-1 ring-gray-400 shadow-lg text-sm font-medium text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer">
                <ShoppingCart className="w-4 h-4" />
                Buy this item
            </button>
        </div>
    );
}

export default ProductInteraction;