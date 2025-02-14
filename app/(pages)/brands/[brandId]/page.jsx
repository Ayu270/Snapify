import { ProductCard } from "@/app/components/Products";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getProductsByBrand } from "@/lib/firestore/products/read_server";

export default async function Page({ params }) {
    const { brandId } = params;
    const brand = await getBrand({ id: brandId });
    const products = await getProductsByBrand({ brandId: brandId });
    return (
    <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
          <div className="max-w-7xl w-full">
            <div className="w-full flex justify-center">
              <img className="h-[150px]" src={brand?.imageURL} alt="" />
            </div>
             {/* <h1 className="text-center font-semibold text-4xl p-4">{brand.name}</h1> */}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((item) => {
                return <ProductCard product={item} key={item?.id} />;
                })}
             </div>
          </div>
      </main>  
    );
}