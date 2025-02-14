"use client"

import { ProductCard } from "@/app/components/Products";
import { useAuth } from "@/contexts/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";

export default function Page() {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });

    return (
        <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
            <div className="max-w-7xl w-full">
              <h1 className="text-center font-semibold text-4xl p-5">Favorites</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.favorites?.map((productId) => {
                    return <ProductItem productId={productId} key={productId} />;
                })}
              </div>
            </div>
        </main>
    );
}

function ProductItem({ productId }) {
    const { data: product } = useProduct({ productId: productId });
    return <ProductCard product={product} />;
}