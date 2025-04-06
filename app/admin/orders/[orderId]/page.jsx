"use client";

import { useOrder } from "@/lib/firestore/orders/read";
import { CircularProgress, Button } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ChangeOrderStatus from "./components/ChangeStatus";
import { useEffect, useState } from "react";

export default function Page() {
  const { orderId } = useParams();
  const { data: order, error, isLoading } = useOrder({ id: orderId });
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (order?.checkout?.metadata?.address) {
      try {
        setAddress(JSON.parse(order.checkout.metadata.address));
      } catch (e) {
        console.error("Address parse error", e);
      }
    }
  }, [order]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-48">
        <CircularProgress />
      </div>
    );
  }

  if (error || !order) {
    return <div>Error loading order details.</div>;
  }

  const totalAmount =
    order.checkout?.line_items?.reduce((prev, curr) => {
      return prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity;
    }, 0) || 0;

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <ChangeOrderStatus order={order} />
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          {/* Order Summary */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-blue-100 text-blue-600 uppercase">
              {order.paymentMode}
            </Badge>
            <Badge variant="outline" className="bg-green-100 text-green-600 uppercase">
              {order.status ?? "Pending"}
            </Badge>
            <span className="text-muted-foreground">
              {order.timestampCreate?.toDate()?.toLocaleString()}
            </span>
          </div>

          {/* Products */}
          <div className="space-y-3">
            {order.checkout.line_items.map((product, i) => {
              const unitPrice = product.price_data.unit_amount / 100;
              return (
                <div key={i} className="flex items-center gap-4">
                  <img
                    src={product.price_data.product_data.images?.[0]}
                    alt={product.price_data.product_data.name}
                    className="h-14 w-14 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{product.price_data.product_data.name}</h3>
                    <p className="text-gray-500 text-xs">
                      ₹{unitPrice.toFixed(2)} × {product.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-right font-semibold text-lg text-green-600">
            Total: ₹{totalAmount.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardContent className="p-5 text-sm space-y-2">
          <h2 className="font-semibold mb-2 text-xl">Payment Details</h2>
          <p><span className="font-medium">Payment Mode: </span>{order.paymentMode?.toUpperCase()}</p>
          {order.paymentMode?.toLowerCase() === "prepaid" && order.checkout?.metadata?.checkoutId && (
            <p><span className="font-medium">Payment ID: </span>{order.checkout.metadata.checkoutId}</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5 text-sm space-y-2">
          <h2 className="font-semibold mb-2 text-xl">Shipping Address</h2>
          {address && (
            <table className="w-full border-collapse">
              <tbody>
                <tr><td className="px-1  font-medium">Name</td><td className=" ">{address.fullName}</td></tr>
                <tr><td className="px-1  font-medium">Mobile</td><td className="">{address.mobile}</td></tr>
                <tr><td className="px-1  font-medium">Email</td><td className="">{address.email}</td></tr>
                <tr><td className="px-1  font-medium">Address</td><td className="">{address.addressLine1}</td></tr>
                <tr><td className="px-1  font-medium">City</td><td className="">{address.city}</td></tr>
                <tr><td className="px-1  font-medium">State</td><td className="">{address.state}</td></tr>
                <tr><td className="px-1  font-medium">Pincode</td><td className="">{address.pincode}</td></tr>
                {address.note && (
                  <tr><td className="px-1 font-medium">Notes</td><td className="">{address.note}</td></tr>
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}