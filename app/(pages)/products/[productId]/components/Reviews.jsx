"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/lib/firestore/reviews/read";
import { deleteReview } from "@/lib/firestore/reviews/write";
import { useUser } from "@/lib/firestore/user/read";
import { Rating } from "@mui/material";
import { Avatar, Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Reviews({ productId }) {
  const { data: reviews, isLoading: loadingReviews } = useReviews({ productId });
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();
  const { data: userData } = useUser({ uid: user?.uid });

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    setIsDeleting(true);
    try {
      if (!user) {
        throw new Error("Please Log In First");
      }
      await deleteReview({
        uid: user?.uid,
        productId: productId,
      });
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsDeleting(false);
  };

  return (
    <div className="flex flex-col gap-3 p-3 rounded-xl border bg-white shadow-md w-full">
      <h1 className="text-lg font-semibold">Reviews</h1>

      <div className="flex flex-col gap-4">
        {loadingReviews ? (
          <p className="text-sm text-gray-500 ">Loading reviews...</p>
        ) : !reviews || reviews.length === 0 ? (
          <p className="text-medium text-gray-500 ">Be the first one to review...</p>
        ) : (
          reviews.map((item) => (
            <div key={item?.uid} className="flex gap-3">
              <Avatar src={item?.photoURL} />
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between">
                  <div>
                    <h1 className="font-semibold">{item?.displayName}</h1>
                    <Rating value={item?.rating} readOnly size="small" />
                  </div>
                  {user?.uid === item?.uid && (
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="flat"
                      isDisabled={isDeleting}
                      isLoading={isDeleting}
                      onClick={handleDelete}
                    >
                      <Trash2 size={12} />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-gray-700 pt-1">{item?.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
