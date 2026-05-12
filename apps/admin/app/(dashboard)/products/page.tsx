import { ProductsType } from "@repo/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (): Promise<ProductsType> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`
    );
    const data = await res.json();
    return Array.isArray(data?.products) ? data.products : [];
  } catch (error) {
      console.error("Error fetching products:", error);
    return [];
  }
};

const ProductsPage = async () => {

    const data = await getData();
    return (
        <div className="">
            <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
                <h1>All products</h1>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default ProductsPage;