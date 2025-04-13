"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/lib/firestore/orders/read";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { user } = useAuth();
  const { data: orders, error, isLoading } = useOrders({ uid: user?.uid });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Skeleton className="w-1/2 h-20 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {(!orders || orders.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <img className="h-64" src="/EmptyF.png" alt="No Orders" />
          <h2 className="text-lg font-medium text-gray-600">You have no orders yet</h2>
        </div>
      )}

      <div className="space-y-6">
        {orders?.map((item, orderIndex) => {
          const totalAmount =
            item?.checkout?.line_items?.reduce((prev, curr) => {
              return (prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity);
            }, 0) || 0;

          return (
            <Link
              key={item?.id ?? orderIndex}
              href={`/orders/${item?.id ?? orderIndex}`}
              className="block"
            >
              <Card className="transition-shadow hover:shadow-lg cursor-pointer">
                <CardContent className="p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-semibold">Order #{orderIndex + 1}</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-600 uppercase">
                        {item?.paymentMode}
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-600 uppercase">
                        {item?.status ?? "Pending"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item?.timestampCreate?.toDate()?.toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {item?.checkout?.line_items?.map((product, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <img
                          src={product?.price_data?.product_data?.images?.[0]}
                          alt={product?.price_data?.product_data?.name}
                          className="h-14 w-14 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{product?.price_data?.product_data?.name}</h3>
                          <p className="text-gray-500 text-xs">
                            ₹{(product?.price_data?.unit_amount / 100).toFixed(2)} × {product?.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-right font-semibold text-lg text-green-600">
                    Total: ₹{totalAmount.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
