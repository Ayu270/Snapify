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

export function ProductCard({ product }) {
    const isOutOfStock = product?.stock <= (product?.orders ?? 0);

    const handleOutOfStockClick = () => {
        if (isOutOfStock) {
             //toast.error("This product is currently out of stock.");
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
