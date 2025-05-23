"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId, type, isDisabled = false }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isAdded = data?.carts?.find((item) => item?.id === productId);

  const handlClick = async () => {
    if (isDisabled) return;
    setIsLoading(true);
    try {
      if (!user?.uid) {
        router.push("/login");
        throw new Error("Please Log In First!");
      }
      if (isAdded) {
        const newList = data?.carts?.filter((item) => item?.id !== productId);
        await updateCarts({ list: newList, uid: user?.uid });
      } else {
        await updateCarts({
          list: [...(data?.carts ?? []), { id: productId, quantity: 1 }],
          uid: user?.uid,
        });
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const commonProps = {
    isLoading,
    isDisabled: isDisabled || isLoading,
    onClick: handlClick,
  };

  if (type === "cute") {
    return (
      <Button variant="bordered" {...commonProps}>
        {!isAdded && "Add To Cart"}
        {isAdded && "Click To Remove"}
      </Button>
    );
  }

  if (type === "large") {
    return (
      <Button
        variant="bordered"
        size="sm"
        color="primary"
        className={`text-black border-black hover:bg-black hover:text-white ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        {...commonProps}
      >
        {!isAdded && <AddShoppingCartIcon className="text-sm" />}
        {isAdded && <ShoppingCartIcon className="text-sm" />}
        {!isAdded && "Add To Cart"}
        {isAdded && "Click To Remove"}
      </Button>
    );
  }

  return (
    <Button
      variant="flat"
      isIconOnly
      size="sm"
      {...commonProps}
    >
      {!isAdded && <AddShoppingCartIcon className="text-sm" />}
      {isAdded && <ShoppingCartIcon className="text-sm" />}
    </Button>
  );
}
