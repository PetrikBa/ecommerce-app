import ProductInteraction from "@/components/ProductInteraction";
import { ProductType, ProductsType } from "@repo/types";
import Image from "next/image";
import { notFound } from "next/navigation";

//temp
const products: ProductsType = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: { gray: "/products/1g.png", purple: "/products/1p.png", green: "/products/1gr.png" },
    categorySlug: "t-shirts",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    categorySlug: "t-shirts",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: { green: "/products/3gr.png", blue: "/products/3b.png", black: "/products/3bl.png" },
    categorySlug: "t-shirts",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Nike Dri Flex T-Shirt",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 29.9,
    sizes: ["s", "m", "l"],
    colors: ["white", "pink"],
    images: { white: "/products/4w.png", pink: "/products/4p.png" },
    categorySlug: "t-shirts",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Under Armour StormFleece",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 49.9,
    sizes: ["s", "m", "l"],
    colors: ["red", "orange", "black"],
    images: { red: "/products/5r.png", orange: "/products/5o.png", black: "/products/5bl.png" },
    categorySlug: "t-shirts",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "Nike Air Max 270",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["40", "42", "43", "44"],
    colors: ["gray", "white"],
    images: { gray: "/products/6g.png", white: "/products/6w.png" },
    categorySlug: "shoes",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    name: "Nike Ultraboost Pulse",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["40", "42", "43"],
    colors: ["gray", "pink"],
    images: { gray: "/products/7g.png", pink: "/products/7p.png" },
    categorySlug: "shoes",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "Levi's Classic Denim",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l"],
    colors: ["blue", "green"],
    images: { blue: "/products/8b.png", green: "/products/8gr.png" },
    categorySlug: "jeans",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const generateMetadata = async ({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params;
  const product = products.find((p) => p.id === Number(id));
  return {  
    title: product ? product.name : `Product ${id}`,
    description: product ? product.description : `Detailed view of product ${id} in our e-commerce store.`
  }
}

const ProductPage = async ({params,searchParams} : {params:Promise<{id: string}>; searchParams: Promise<{color:string; size:string}>}) => {
  
  const {id} = await params;
  const {size, color} = await searchParams;

  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  const selectedSize = (size || product.sizes[0] || "");
  const selectedColor = (color || product.colors[0] || "");

  return (
      <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
          {/* IMAGE */}
          <div className="w-full lg:w-5/12 relative aspect-[2/3]">
          <Image
              src={(product.images as Record<string,string>)[selectedColor] || ""}
              alt={product.name}
              fill
              className="object-contain rounded-md"
          />
          </div>
          {/* DETAILS */}
          <div className="w-full lg:w-7/12 flex flex-col gap-4">
              <h1 className="text-2xl font-medium">{product.name}</h1>
              <p className="text-sm text-gray-500">{product.description}</p>
              <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>
              <ProductInteraction product={product} selectedSize={selectedSize} selectedColor={selectedColor} />
              {/* CARD INFO */}
              <div className="flex items-center gap-2 mt-4">
                <Image src="/klarna.png" alt="Secure payment" width={50} height={25} className="rounded-md" />
                <Image src="/cards.png" alt="Secure payment" width={50} height={25} className="rounded-md" />
                <Image src="/stripe.png" alt="Secure payment" width={50} height={25} className="rounded-md" />
              </div>
              <p className="text-gray-500 text-xs">
                By clicking Pay Now, you agree to our{" "}
                <span className="underline hover:text-black">Terms & Conditions</span>{" "}
                and <span className="underline hover:text-black">Privacy Policy</span>
                . You authorize us to charge your selected payment method for the
                total amount shown. All sales are subject to our return and{" "}
                <span className="underline hover:text-black">Refund Policies</span>.
              </p>
          </div>
      </div>
  )
}

export default ProductPage;
