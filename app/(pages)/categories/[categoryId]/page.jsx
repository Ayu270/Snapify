import { ProductCard } from "@/app/components/Products";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductsByCategory } from "@/lib/firestore/products/read_server";


export async function generateMetadata({ params }) {
   const { categoryId } = params;
   const category = await getCategory({ id: categoryId });
 
   return {
     title: `${category?.name} | Category`,
     openGraph: {
       images: [category?.imageURL],
     },
   };
 }


export default async function Page({ params }) {
    const { categoryId } = params;
    const category = await getCategory({ id: categoryId });
    const products = await getProductsByCategory({ categoryId: categoryId });
    return (
    <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
          <div className="max-w-7xl w-full">
            <div className="w-full flex justify-center">
               <img className="h-[150px]" src={category?.imageURL} alt="" />
            </div>
             <h1 className="text-center font-semibold text-4xl p-4">{category.name}</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((item) => {
                return <ProductCard product={item} key={item?.id} />;
                })}
             </div>
          </div>
      </main>  
    );
}