import { ProductCard } from "@/app/components/Products";
import { getProductssByCategory } from "@/lib/firestore/products/read_server";

export default async function RelatedProducts({categoryId}) {
    const products = await getProductssByCategory({categoryId: categoryId})
    return (
        // <div className="max-w-7xl w-full">
        //     <h1 className="text-center text-2xl font-bold mb-6">Related Products</h1>
        //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        //         {products?.map((item) => {
        //            return <ProductCard product={item} key={item?.id} />;
        //         })}
        //     </div>
        // </div>
        <div className="w-full flex justify-center p-6">
          <div className="max-w-7xl w-full">
             <h1 className="text-center font-semibold text-lg p-4">Related Products</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {products?.map((item) => {
                 return <ProductCard product={item} key={item?.id} />;
                 })}
             </div>
         </div>
        </div>
    );
}