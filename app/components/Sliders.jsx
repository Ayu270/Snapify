"use client"

import AuthContextProvider from "@/contexts/AuthContext";
import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";

export default function FeaturedProductSlider({ featuredProducts }) {
  var settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,

    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true
  };
  return (
    <div className="overflow-hidden">
        <Slider {...settings}>
        {featuredProducts?.map((product) => {
            return(
                    <div>
                    <div className="flex flex-col-reverse md:flex-row gap-4 bg-[#f8f8f8] p-5 md:px-24 md:py-20 w-full">
                    <div className="flex-1 flex flex-col md:gap-10 gap-4">
                        <h2 className="text-gray-500 text-xs md:text-base">NOW TRENDING</h2>
                        <div className="flex flex-col gap-4">
                          <Link href={`/products/${product?.id}`}>
                              <h1 className="md:text-4xl text-xl font-semibold">{product?.title}</h1>
                          </Link>
                          <Link href={`/products/${product?.id}`}>
                              <h1 className="text-gray-600 md:text-sm text-xs max-w-96 line-clamp-2">{product?.shortDesription}</h1>
                          </Link>
                        </div>
                        <div className="flex items-center gap-4">
                           <Button className="bg-blue-500 text-white text-xs md:text-sm">BUY NOW</Button>
                           <Button className="border-2 border-blue-500 bg-white text-blue-500 text-xs md:text-sm ">ADD TO CART</Button>
                           <AuthContextProvider>
                               <FavoriteButton productId={product?.id} />
                           </AuthContextProvider>
                        </div>
                    </div>
                    <div className="">
                        <Link href={`/products/${product?.id}`}>
                           <img className="h-[14rem] md:h-[23rem]" src={product?.featureImageURL} alt="" />
                        </Link>
                    </div>
                    </div>
                    </div>
            );
        })}
        </Slider>
    </div>
  );
}