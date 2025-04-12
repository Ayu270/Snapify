// import AddToCartButton from "@/app/components/AddToCartButton";
// import FavoriteButton from "@/app/components/FavoriteButton";
// import AuthContextProvider from "@/contexts/AuthContext";
// import { getBrand } from "@/lib/firestore/brands/read_server";
// import { getCategory } from "@/lib/firestore/categories/read_server";
// import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
// import { Rating } from "@mui/material";
// import { Button } from "@nextui-org/react";
// import { Heart } from "lucide-react";
// import Link from "next/link";
// import { Suspense } from "react";

// export default function Details({ product }) {
//     return (
//         <div className="w-full flex flex-col gap-3">
//             <div className="flex gap-3">
//                 <Category categoryId={product?.categoryId} />
//                 <Brand brandId={product?.brandId}/>
//             </div>
//             <h1 className="font-semibold text-xl md:text-4xl">{product?.title}</h1>
//             <div className="">
//                 <Suspense>
//                 <RatingReview product={product} />
//                 </Suspense>  
//             </div>  
//             <h2 className="text-gray-600 text-sm line-clamp-3 md:line-clamp-4">{product?.shortDesription}</h2>
//             <h3 className="text-green-500 font-bold text-lg">
//                 ₹ {product?.salePrice}{" "}
//                 <span className="line-through text-gray-700 text-sm">
//                     ₹ {product?.price}
//                 </span>
//             </h3>
//             <div className="flex flex-wrap items-center gap-4">
//                 {/* <Button className="bg-black text-white">Buy Now</Button> */}
//                 <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
//                     <button className="bg-black text-white rounded-lg px-4 py-2 ">
//                        Buy Now
//                     </button>
//                 </Link>
//                 {/* <Button variant="bordered" className="">
//                     Add to Cart
//                 </Button> */}
//                 <AuthContextProvider>
//                      <AddToCartButton type={"cute"} productId={product?.id} />
//                 </AuthContextProvider>
//                 {/* <Button variant="bordered" isIconOnly color="danger">
//                     <Heart size={13} />
//                 </Button> */}
//                 <AuthContextProvider>
//                     <FavoriteButton productId={product?.id} />
//                 </AuthContextProvider>
//             </div>
//             {product?.stock <= (product?.orders ?? 0) && (
//                <div className="flex">
//                   <h3 className="text-red-500 py-1 rounded-lg text-sm font-semibold">
//                    Out Of Stock
//                   </h3>
//                </div>
//             )}

//             <div className="flex flex-col gap-2 py-6">
//                 <div className="text-gray-600"
//                     dangerouslySetInnerHTML={{__html: product?.description ?? "" }}
//                 ></div>
//             </div>
//         </div>
//     );
// }


// async function Category({ categoryId }) {
//     const category = await getCategory({ id: categoryId });
//     return (
//         <Link href={`/categories/${category?.id}`}>
//           <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
//              <img className="h-4" src={category?.imageURL} alt="" />
//              <h4 className="text-xs font-semibold">{category?.name}</h4>
//           </div>
//         </Link>
//     );
//   }

//   async function Brand({ brandId }) {
//     const brand = await getBrand({ id: brandId });
//     return (
//        <Link href={`/brands/${brand?.id}`}>
//             <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
//                <img className="h-4" src={brand?.imageURL} alt="" />
//                <h4 className="text-xs font-semibold">{brand?.name}</h4>
//             </div>
//        </Link>
//     );
//   }
  
// async function RatingReview({ product }) {
//     const counts = await getProductReviewCounts({ productId: product?.id });
//     return (
//       <div className="flex gap-3 items-center">
//         <Rating defaultValue={counts?.averageRating ?? 0} readOnly precision={0.5} name="product-rating" />
//         <h1 className="text-sm text-gray-400">
//           <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
//           )
//         </h1>
//       </div>
//     );
//   }




import AddToCartButton from "@/app/components/AddToCartButton";
import FavoriteButton from "@/app/components/FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { Rating } from "@mui/material";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Details({ product }) {
    const isOutOfStock = product?.stock <= (product?.orders ?? 0);

    return (
        <div className="w-full flex flex-col gap-3">
            <div className="flex gap-3">
                <Category categoryId={product?.categoryId} />
                <Brand brandId={product?.brandId} />
            </div>
            <h1 className="font-semibold text-xl md:text-4xl">{product?.title}</h1>
            <div className="">
                <Suspense>
                    <RatingReview product={product} />
                </Suspense>
            </div>
            <h2 className="text-gray-600 text-sm line-clamp-3 md:line-clamp-4">{product?.shortDesription}</h2>
            <h3 className="text-green-500 font-bold text-lg">
                ₹ {product?.salePrice}{" "}
                <span className="line-through text-gray-700 text-sm">
                    ₹ {product?.price}
                </span>
            </h3>
            <div className="flex flex-wrap items-center gap-4">
                {isOutOfStock ? (
                    <button
                        disabled
                        className="bg-red-100 text-red-500 rounded-lg px-4 py-2 cursor-not-allowed"
                    >
                        Out of Stock
                    </button>
                ) : (
                    <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                        <button className="bg-black text-white rounded-lg px-4 py-2">
                            Buy Now
                        </button>
                    </Link>
                )}

                <AuthContextProvider>
                    {/* <button
                        disabled={isOutOfStock}
                        className="rounded-lg  text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <AddToCartButton type={"cute"} productId={product?.id} />
                    </button> */}
                    <AddToCartButton
                      productId={product?.id}
                      type={"cute"}
                      isDisabled={isOutOfStock}
                    />
                </AuthContextProvider>

                <AuthContextProvider>
                    <FavoriteButton productId={product?.id} />
                </AuthContextProvider>
            </div>
            <div className="flex flex-col gap-2 py-6">
                <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
                ></div>
            </div>
        </div>
    );
}

async function Category({ categoryId }) {
    const category = await getCategory({ id: categoryId });
    return (
        <Link href={`/categories/${category?.id}`}>
            <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
                <img className="h-4" src={category?.imageURL} alt="" />
                <h4 className="text-xs font-semibold">{category?.name}</h4>
            </div>
        </Link>
    );
}

async function Brand({ brandId }) {
    const brand = await getBrand({ id: brandId });
    return (
        <Link href={`/brands/${brand?.id}`}>
            <div className="flex items-center gap-1 border px-3 py-1 rounded-full">
                <img className="h-4" src={brand?.imageURL} alt="" />
                <h4 className="text-xs font-semibold">{brand?.name}</h4>
            </div>
        </Link>
    );
}

async function RatingReview({ product }) {
    const counts = await getProductReviewCounts({ productId: product?.id });
    return (
        <div className="flex gap-3 items-center">
            <Rating defaultValue={counts?.averageRating ?? 0} readOnly precision={0.5} name="product-rating" />
            <h1 className="text-sm text-gray-400">
                <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews})
            </h1>
        </div>
    );
}
