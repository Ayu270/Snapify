"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { Badge } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function HeaderClientButtons() {
    const { user } = useAuth();
    const { data } = useUser({ uid: user?.uid });

    return (
        <div className="flex items-center gap-1">
            <Link href={`/favorites`}>
                 <Badge 
                   variant="solid"
                   size="sm"
                   className="text-white bg-red-500 text-[8px]"
                   content={data?.favorites?.length ?? 0}
                   >
                     <button 
                        title="Favorites"
                        className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100">
                        <Heart size={14}/>
                     </button>
                 </Badge>
              </Link>
              <Link href={`/cart`}>
                <Badge 
                    variant="solid"
                    size="sm"
                    className="text-white bg-red-500 text-[8px]"
                    content={data?.carts?.length ?? 0}
                    >
                      <button 
                         title="Cart"
                         className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100">
                         <ShoppingCart size={14}/>
                      </button>
                    </Badge>
              </Link>
        </div>
    );
}