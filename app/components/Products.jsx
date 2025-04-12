// import { Rating } from "@mui/material";
// import { Button } from "@nextui-org/react";
// import { Heart, ShoppingCart } from "lucide-react";

// export default function ProductsGridView({ products }) {
//     return (
//         <section className="w-full flex justify-center">
//          <div className="flex flex-col gap-5 max-w-[1200px] p-5">
//            <h1 className="text-center font-semibold text-lg">Products</h1>
//            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
//               {products?.map((item) => {
//                 return <ProductCard product={item} key={item?.id} />;
//             })}
//            </div>
//          </div>
//     </section>    
//     );
// }

// function ProductCard({ product }) {
//     return (
//         <div className="flex flex-col gap-3 border p-4 rounded-lg">
//            <div className="relative w-full">
//              <img src={product?.featureImageURL} className="rounded-lg h-48 w-full object-cover" alt={product?.title} />
//              <div className="absolute top-1 right-1">
//                 <Button variant="light" color="danger" className="rounded-full" isIconOnly size="sm">
//                     <Heart size={13}/>
//                 </Button>
//              </div>
//            </div>
//            <h1 className="font-semibold line-clamp-2 text-sm">{product?.title}</h1>
//            <div className="">
//                <h2 className="text-green-500 text-sm font-semibold">
//                    ₹ {product?.salePrice}{" "}
//                    <span className="line-through text-xs text-gray-600">
//                       ₹ {product?.price}
//                    </span>
//                </h2>
//            </div>
//            <p className="text-xs text-gray-500 line-clamp-2">{product?.shortDesription}</p>
//            <div className="flex gap-3 items-center">
//              <Rating size="small" name="product-rating" defaultValue={2.5} precision={0.5} readOnly/>
//              <h1 className="text-xs text-gray-400">(0)</h1>
//            </div>
//            <div className="flex items-center gap-4">
//               <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-xs">
//                  Buy Now
//               </button>
//               <Button isIconOnly size="sm">
//                  <ShoppingCart size={13} />
//               </Button>
//            </div>
//         </div>
//     );
// }

// "use client"
// import { useState } from "react";
// import { Rating } from "@mui/material";
// import { Button } from "@nextui-org/react";
// import { Heart, ShoppingCart } from "lucide-react";

// export default function ProductsGridView({ products }) {
//     const [visibleCount, setVisibleCount] = useState(20);

//     const showMoreProducts = () => {
//         setVisibleCount((prevCount) => prevCount + 20);
//     };

//     return (
//         <section className="w-full flex justify-center">
//             <div className="flex flex-col gap-5 max-w-[1200px] p-5">
//                 <h1 className="text-center font-semibold text-lg">Products</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
//                     {products?.slice(0, visibleCount).map((item) => (
//                         <ProductCard product={item} key={item?.id} />
//                     ))}
//                 </div>
//                 {visibleCount < products?.length && (
//                     <div className="flex justify-center">
//                         <button 
//                             className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
//                             onClick={showMoreProducts}
//                         >
//                             Show More
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

// function ProductCard({ product }) {
//     return (
//         <div className="flex flex-col gap-3 border p-4 rounded-lg">
//             <div className="relative w-full">
//                 <img src={product?.featureImageURL} className="rounded-lg h-48 w-full object-cover" alt={product?.title} />
//                 <div className="absolute top-1 right-1">
//                     <Button variant="light" color="danger" className="rounded-full" isIconOnly size="sm">
//                         <Heart size={13} />
//                     </Button>
//                 </div>
//             </div>
//             <h1 className="font-semibold line-clamp-2 text-sm">{product?.title}</h1>
//             <div>
//                 <h2 className="text-green-500 text-sm font-semibold">
//                     ₹ {product?.salePrice} <span className="line-through text-xs text-gray-600">₹ {product?.price}</span>
//                 </h2>
//             </div>
//             <p className="text-xs text-gray-500 line-clamp-2">{product?.shortDesription}</p>
//             <div className="flex gap-3 items-center">
//                 <Rating size="small" name="product-rating" defaultValue={2.5} precision={0.5} readOnly />
//                 <h1 className="text-xs text-gray-400">(0)</h1>
//             </div>
//             <div className="flex items-center gap-4">
//                 <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-xs">Buy Now</button>
//                 <Button isIconOnly size="sm">
//                     <ShoppingCart size={13} />
//                 </Button>
//             </div>
//         </div>
//     );
// }

// Best
// "use client";
// import { Suspense, useEffect, useState } from "react";
// import { Rating } from "@mui/material";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Heart, ShoppingCart } from "lucide-react";
// import Link from "next/link";
// import FavoriteButton from "./FavoriteButton";
// import AuthContextProvider from "@/contexts/AuthContext";
// import AddToCartButton from "./AddToCartButton";
// import { getProductReviewCounts } from "@/lib/firestore/products/count/read";

// export default function ProductsGridView({ products }) {
//     const [visibleCount, setVisibleCount] = useState(20);

//     const showMoreProducts = () => {
//         setVisibleCount((prevCount) => prevCount + 20);
//     };

//     return (
//         <section className="w-full flex justify-center p-6">
//             <div className="max-w-7xl w-full">
//                 <h1 className="text-center text-2xl font-bold mb-6">Products</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {products?.slice(0, visibleCount).map((item) => (
//                         <ProductCard product={item} key={item?.id} />
//                     ))}
//                 </div>
//                 {visibleCount < products?.length && (
//                     <div className="flex justify-center mt-6">
//                         <Button onClick={showMoreProducts} className="px-5 py-2 text-sm">Show More</Button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

// export function ProductCard({ product }) {
//     return (
//         <Card className="overflow-hidden shadow-md rounded-xl">
//             <div className="relative w-full h-56">
//             <Link href={`/products/${product?.id}`}>
//                 <img src={product?.featureImageURL} className="w-full h-full object-cover object-center" alt={product?.title} />
//             </Link>
//                 <div className="absolute top-2 right-2 ">
//                    <AuthContextProvider>
//                       <FavoriteButton productId={product?.id} />
//                    </AuthContextProvider>
//                 </div>
//             </div>
//             <CardContent className="p-4 flex flex-col gap-3">
//                 <Link href={`/products/${product?.id}`}>
//                     <h1 className="text-lg font-semibold line-clamp-2">{product?.title}</h1>
//                 </Link>
//                 <p className="text-sm text-gray-500 line-clamp-2">{product?.shortDesription}</p>
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-green-600 font-bold">
//                         ₹ {product?.salePrice} <span className="text-xs text-gray-400 line-through">₹ {product?.price}</span>
//                     </h2>
//                     <div className="flex items-center gap-1">
//                           <RatingReview product={product} />
//                     </div>                    
//                 </div>
//                 {product?.stock <= (product?.orders ?? 0) && (
//                 <div className="flex">
//                    <h3 className="text-red-500 rounded-lg text-xs font-semibold">
//                     Out Of Stock
//                    </h3>
//                 </div>
//                 )}
//                 <div className="flex gap-3 mt-2">
//                     <div className="w-full">
//                       <Link href={`/checkout?type=buynow&productId=${product?.id}`}> 
//                          <button className="w-full bg-black text-white text-xs md:text-sm px-4 py-1.5 rounded-lg">Buy Now</button>
//                       </Link>
//                     </div>
//                     {/* <Button className="w-full">Buy Now</Button> */}
//                     <AuthContextProvider>
//                         <AddToCartButton productId={product?.id} />
//                     </AuthContextProvider>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

// function RatingReview({ product }) {
//     const [counts, setCounts] = useState({ averageRating: 2.5, totalReviews: 0 });

//     useEffect(() => {
//         async function fetchReviewCounts() {
//             const data = await getProductReviewCounts({ productId: product?.id });
//             if (data) {
//                 setCounts(data);
//             }
//         }

//         fetchReviewCounts();
//     }, [product?.id]);

//     return (
//         <div className="flex items-center gap-1 text-xs text-gray-500">
//             <Rating size="small" value={counts?.averageRating ?? 0} precision={0.5} readOnly />
//             <h1>
//                 <span>{counts?.averageRating?.toFixed(1)}</span> ({counts.totalReviews})
//             </h1>
//         </div>
//     );
// }




"use client";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/contexts/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import toast, { Toaster } from "react-hot-toast";

export default function ProductsGridView({ products }) {
    const [visibleCount, setVisibleCount] = useState(20);

    const showMoreProducts = () => {
        setVisibleCount((prevCount) => prevCount + 20);
    };

    return (
        <section className="w-full flex justify-center p-6">
            <Toaster position="top-right" />
            <div className="max-w-7xl w-full">
                <h1 className="text-center text-2xl font-bold mb-6">Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.slice(0, visibleCount).map((item) => (
                        <ProductCard product={item} key={item?.id} />
                    ))}
                </div>
                {visibleCount < products?.length && (
                    <div className="flex justify-center mt-6">
                        <Button onClick={showMoreProducts} className="px-5 py-2 text-sm">Show More</Button>
                    </div>
                )}
            </div>
        </section>
    );
}

export function ProductCard({ product }) {
    const isOutOfStock = product?.stock <= (product?.orders ?? 0);

    const handleOutOfStockClick = () => {
        if (isOutOfStock) {
            // toast.error("This product is currently out of stock.");
        }
    };

    return (
        <Card className="overflow-hidden shadow-md rounded-xl">
            <div className="relative w-full h-56">
                <Link href={`/products/${product?.id}`}>
                    <img src={product?.featureImageURL} className="w-full h-full object-cover object-center" alt={product?.title} />
                </Link>
                <div className="absolute top-2 right-2 ">
                    <AuthContextProvider>
                        <FavoriteButton productId={product?.id} />
                    </AuthContextProvider>
                </div>
            </div>
            <CardContent className="p-4 flex flex-col gap-3">
                <Link href={`/products/${product?.id}`}>
                    <h1 className="text-lg font-semibold line-clamp-2">{product?.title}</h1>
                </Link>
                <p className="text-sm text-gray-500 line-clamp-2">{product?.shortDesription}</p>
                <div className="flex items-center justify-between">
                    <h2 className="text-green-600 font-bold">
                        ₹ {product?.salePrice} <span className="text-xs text-gray-400 line-through">₹ {product?.price}</span>
                    </h2>
                    <div className="flex items-center gap-1">
                        <RatingReview product={product} />
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                    <div className="w-full">
                        {isOutOfStock ? (
                            <button
                                disabled
                                className="w-full bg-red-100 text-red-500 text-xs md:text-sm px-4 py-2 md:py-1.5 rounded-lg cursor-not-allowed"
                            >
                                Out of Stock
                            </button>
                        ) : (
                            <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
                                <button className="w-full bg-black text-white text-xs md:text-sm px-4 py-2 md:py-1.5 rounded-lg">
                                    Buy Now
                                </button>
                            </Link>
                        )}
                    </div>
                    <div className="" onClick={handleOutOfStockClick}>
                        <AuthContextProvider>
                            {/* <button
                                disabled={isOutOfStock}
                                className="w-full text-xs md:text-sm  bg-white  hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <AddToCartButton productId={product?.id} />
                            </button> */}
                            <AddToCartButton
                              productId={product?.id}
                              isDisabled={isOutOfStock}
                            />
                        </AuthContextProvider>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function RatingReview({ product }) {
    const [counts, setCounts] = useState({ averageRating: 2.5, totalReviews: 0 });

    useEffect(() => {
        async function fetchReviewCounts() {
            const data = await getProductReviewCounts({ productId: product?.id });
            if (data) {
                setCounts(data);
            }
        }

        fetchReviewCounts();
    }, [product?.id]);

    return (
        <div className="flex items-center gap-1 text-xs text-gray-500">
            <Rating size="small" value={counts?.averageRating ?? 0} precision={0.5} readOnly />
            <h1>
                <span>{counts?.averageRating?.toFixed(1)}</span> ({counts.totalReviews})
            </h1>
        </div>
    );
}


// Ertra
// async function RatingReview({ product }) {
//     const counts = await getProductReviewCounts({ productId: product?.id });
//     return (
//       <div className="flex gap-1 items-center">
//         <Rating size="small" defaultValue={counts?.averageRating ?? 0} readOnly precision={0.5} name="product-rating" />
//         <h1 className="text-sm text-gray-400">
//           <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
//           )
//         </h1>
//       </div>
//     );
//   }