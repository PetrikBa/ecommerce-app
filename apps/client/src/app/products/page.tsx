import ProductList from "@/components/ProductList";

const ProductsPage = async ({
  searchParams
}:{
  searchParams: Promise<{category:string , search?: string, sort?: string}>
}) => {

  const category = (await searchParams).category;
  const search = (await searchParams).search;
  const sort = (await searchParams).sort;
  return (
    <div className="">
        <ProductList category={category} search={search} sort={sort} params="products" />
    </div>
  )
}

export default ProductsPage