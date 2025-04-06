"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrderById } from "@/lib/firestore/orders/read";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Button } from "@nextui-org/react";

export default function OrderDetails() {
  const { orderId } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      const data = await getOrderById(orderId);
      setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Skeleton className="w-1/2 h-20 rounded-lg" />
      </div>
    );
  }

  if (!order) {
    return <p className="text-center text-red-500 mt-10">Order not found</p>;
  }

  const totalAmount =
    order?.checkout?.line_items?.reduce((prev, curr) => {
      return prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity;
    }, 0) || 0;

  const amountInWords = (amount) => {
    const words = require("number-to-words");
    return words.toWords(amount).replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const generateInvoiceNumber = () => {
    if (!orderId || !order?.timestampCreate) return "INV-XXXX";
    const date = order.timestampCreate.toDate();
    const shortId = orderId.slice(-4).toUpperCase();
    const formattedDate = `${date.toLocaleString("default", {
      month: "short",
    }).toUpperCase()}${date.getFullYear().toString().slice(-2)}`;
    return `INV-${shortId}-${formattedDate}`;
  };

  const invoiceNumber = generateInvoiceNumber();

  let addressObj = null;
  if (order?.checkout?.metadata?.address) {
    try {
      addressObj = JSON.parse(order.checkout.metadata.address);
    } catch (e) {
      console.error("Invalid address format", e);
    }
  }

  return (
    <main>
      <div className="no-print sticky top-0 z-50 ">
        <Header />
      </div>
      <div className="p-6 max-w-3xl mx-auto space-y-6 no-print">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Order Details</h1>
          <Button className="bg-black text-white" onClick={() => window.print()}>
            Print Receipt
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          Order ID: <span className="text-black font-medium">{orderId}</span>
        </div>

        <Card>
          <CardContent className="p-5 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge variant="outline" className="bg-green-100 text-green-600 uppercase">
                {order?.status ?? "Pending"}
              </Badge>
              <span className="text-muted-foreground">
                {order?.timestampCreate?.toDate()?.toLocaleString()}
              </span>
            </div>

            <div className="space-y-4">
              {order?.checkout?.line_items?.map((product, i) => {
                const productId = product?.price_data?.product_data?.metadata?.productId;
                return (
                  <div
                    key={i}
                    onClick={() => router.push(`/products/${productId}`)}
                    className="flex flex-col gap-2 border rounded-lg p-4 bg-gray-50 hover:shadow cursor-pointer transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product?.price_data?.product_data?.images?.[0]}
                        alt={product?.price_data?.product_data?.name}
                        className="h-16 w-16 rounded-md border object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {product?.price_data?.product_data?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ₹{(product?.price_data?.unit_amount / 100).toFixed(2)} ×{" "}
                          {product?.quantity}
                        </p>
                      </div>
                    </div>

                    {product?.price_data?.product_data?.description && (
                      <p className="text-sm text-gray-600">
                        {product.price_data.product_data.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-right font-semibold text-lg text-green-600">
              Total: ₹{totalAmount.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        {/* Payment Details Section */}
        <div className="bg-gray-100 rounded-md p-4 text-sm text-gray-700 print:hidden">
          <p className="font-semibold mb-2">Payment Details</p>
          <p><span className="font-medium">Payment Mode:</span> <span className="uppercase">{order?.paymentMode}</span></p>
          {order?.paymentMode?.toLowerCase() === "prepaid" &&
            order?.checkout?.metadata?.checkoutId && (
              <p>
                <span className="font-medium">Payment ID:</span>{" "}
                {order.checkout.metadata.checkoutId}
              </p>
            )}
        </div>

        {addressObj && (
          <div className="bg-gray-100 rounded-md p-4 text-sm text-gray-700 print:mt-4">
            <p className="font-semibold mb-2">Shipping Address</p>
            <p><span className="font-medium">Name:</span> {addressObj.fullName}</p>
            <p><span className="font-medium">Mobile:</span> {addressObj.mobile}</p>
            <p><span className="font-medium">Email:</span> {addressObj.email}</p>
            <p><span className="font-medium">Address:</span> {addressObj.addressLine1}</p>
            <p><span className="font-medium">City:</span> {addressObj.city}</p>
            <p><span className="font-medium">State:</span> {addressObj.state}</p>
            <p><span className="font-medium">Pincode:</span> {addressObj.pincode}</p>
          </div>
        )}

        <div className="pt-4 flex gap-4 flex-wrap">
          <Button className="bg-black text-white" onClick={() => router.push("/account")}>
            Back to My Orders
          </Button>
          <Button className="bg-black text-white" onClick={() => router.push("/contact-us")}>
            Contact Support
          </Button>
        </div>
      </div>

      <div className="print-only print-invoice p-8 text-sm text-black max-w-4xl mx-auto border">
        <div className="flex justify-between items-start mb-6">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <div className="text-right text-xs">
            <h2 className="font-semibold text-base">Tax Invoice/Bill of Supply/Cash Memo</h2>
            <p className="italic">(Original for Recipient)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-xs mb-4">
          <div>
            <h3 className="font-semibold">Sold By :</h3>
            <p>Snapify India</p>
            <p>NEW DELHI, DELHI, 110002, IN</p>
            <br />
            <p><strong>PAN No:</strong> ATDPS2712F</p>
            <p><strong>GST Registration No:</strong> 07ATDPS2712F2ZV</p>
          </div>
          <div className="text-right">
            <h3 className="font-semibold mb-1">Shipping Address :</h3>
            <p>{addressObj?.fullName}</p>
            <p>{addressObj?.addressLine1}</p>
            <p>{addressObj?.city}, {addressObj?.state}, {addressObj?.pincode}</p>
            <p>IN</p>
            <p><strong>State/UT Code:</strong> 10</p>
            <br />
            <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
            <p><strong>Invoice Date:</strong> {order?.timestampCreate?.toDate()?.toLocaleDateString()}</p>
          </div>
        </div>

        <div className="text-xs mb-4 grid grid-cols-2">
          <div>
            <p><strong>Order Number:</strong> {orderId}</p>
            <p><strong>Order Date:</strong> {order?.timestampCreate?.toDate()?.toLocaleDateString()}</p>
          </div>
        </div>

        <table className="w-full border text-xs mb-4">
          <thead>
            <tr className="border">
              <th className="border p-1">Sl. No</th>
              <th className="border p-1">Description</th>
              <th className="border p-1">Unit Price</th>
              <th className="border p-1">Qty</th>
              <th className="border p-1">Net Amount</th>
              <th className="border p-1">Tax Rate</th>
              <th className="border p-1">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {order?.checkout?.line_items?.map((product, i) => {
              const unitPrice = product?.price_data?.unit_amount / 100;
              const total = unitPrice * product?.quantity;
              return (
                <tr key={i} className="border text-center">
                  <td className="border p-1">{i + 1}</td>
                  <td className="border p-1">
                    {product?.price_data?.product_data?.name}<br />
                    {product?.price_data?.product_data?.description}
                  </td>
                  <td className="border p-1">₹{unitPrice.toFixed(2)}</td>
                  <td className="border p-1">{product?.quantity}</td>
                  <td className="border p-1">₹{(unitPrice * product?.quantity).toFixed(2)}</td>
                  <td className="border p-1">18%</td>
                  <td className="border p-1">₹{(unitPrice * product?.quantity).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-right font-semibold text-sm">
          Total: ₹{totalAmount.toFixed(2)}
        </div>

        <div className="mt-2 text-xs">
          <p><strong>Amount in Words:</strong> {amountInWords(totalAmount)} only</p>
        </div>

        <div className="mt-8 text-xs text-center text-muted-foreground border-t pt-2 flex justify-center items-end">
          Thank you for shopping with us!
        </div>
      </div>

      <div className="no-print">
        <Footer />
      </div>
    </main>
  );
}
