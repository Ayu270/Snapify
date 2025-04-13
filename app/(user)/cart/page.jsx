"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const { user } = useAuth();
    const { data, isLoading } = useUser({ uid: user?.uid });
    if(isLoading){
        return (
            <div className="p-10 flex w-full justify-center">
                <CircularProgress />
            </div>
        );
    }

    const hasProducts = data?.carts && data?.carts.length > 0;

    return (
        <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
            <div className="max-w-7xl w-full">
              <h1 className="text-center font-semibold text-4xl p-5">Your Shopping Cart</h1>
              {!hasProducts && (
                <div className="flex flex-col gap-5 justify-center items-center h-full w-full py-3">
                    <div className="flex justify-center">
                        <img className="h-[400px]" src="/EmptyF.png" alt="No Products" />
                    </div>
                    <h1 className="text-gray-600 font-semibold">
                        Please Add Products To Cart
                    </h1>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hasProducts && data?.carts?.map((item, key) => (
                    <ProductItem item={item} key={item?.id} />
                ))}
              </div>
              {hasProducts && ( 
              <div className="flex w-full justify-center p-6">
                <Link href={`/checkout?type=cart`} >
                   <button className="bg-black px-5 py-2 text-sm rounded-lg text-white">
                        Proceed to Checkout
                   </button>
                </Link>
              </div> 
              )}
            </div>  
        </main>
    );
}

function ProductItem({ item }) {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });

    const [isRemoving, setIsRemoving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { data: product } = useProduct({ productId: item?.id });

    const handleRemove = async () => {
        if(!confirm("Are you sure you want to remove this item?")) return;
        setIsRemoving(true);
        try {
            const newList = data?.carts?.filter((d) => d?.id != item?.id);
            await updateCarts({ list: newList, uid: user?.uid });
        } catch (error) {
            toast.error(error?.message);
        }
        setIsRemoving(false);
    };

    const handleUpdate = async (quantity) => {
        setIsUpdating(true);
        try {
            const newList = data?.carts?.map((d) => {
                if (d?.id === item?.id){
                    return {
                        ...d,
                        quantity: parseInt(quantity),
                    };
                } else {
                    return d;
                }
            });
            await updateCarts({ list: newList, uid: user?.uid });
        } catch (error) {
            toast.error(error?.message);
        }
        setIsUpdating(false);
    };

    return (
        <div className="flex gap-3 items-center border px-3 py-3 rounded-xl shadow-lg">
            <div className="h-24 w-24 p-1">
                <img className="w-full h-full object-cover rounded-lg" src={product?.featureImageURL} alt="" />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <h1 className="text-sm font-semibold">{product?.title}</h1>
                <h1 className="text-green-500 text-sm">
                    ₹ {product?.salePrice}{" "}
                    <span className="line-through text-xs text-gray-500">₹ {product?.price}</span>
                </h1>
                <div className="flex text-xs items-center gap-2">
                    <Button 
                      onClick={() => {handleUpdate(item?.quantity - 1);}}
                      isDisabled={isUpdating || item?.quantity <= 1}
                      isIconOnly  
                      size="sm"
                      className="h-6 w-4"
                    >
                      <Minus size={13} />
                    </Button>
                    <h2>{item?.quantity}</h2>
                    <Button 
                      onClick={() => {handleUpdate(item?.quantity + 1);}}
                      isDisabled={isUpdating}
                      isIconOnly 
                      size="sm"
                      className="h-6 w-4"
                    >
                      <Plus size={13} />
                    </Button>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <Button 
                  onClick={handleRemove}
                  isLoading={isRemoving}
                  isDisabled={isRemoving}
                  isIconOnly 
                  color="danger" 
                  size="sm"
                >
                    <X size={13} />
                </Button>
            </div>
        </div>
    );
}
