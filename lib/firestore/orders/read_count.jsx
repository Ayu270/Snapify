"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  count,
  getAggregateFromServer,
  sum,
  query,
  where,
} from "firebase/firestore";
import useSWR from "swr";

export const getOrdersCounts = async ({ date }) => {
  const ref = collection(db, "orders");
  let q = query(ref);

  if (date) {
    const fromDate = new Date(date);
    fromDate.setHours(0, 0, 0, 0);

    const toDate = new Date(date);
    toDate.setHours(23, 59, 59, 999);

    q = query(
      q,
      where("timestampCreate", ">=", fromDate),
      where("timestampCreate", "<=", toDate)
    );
  }

  try {
    const data = await getAggregateFromServer(q, {
      totalRevenue: sum("payment.amount"),
      totalOrders: count(),
    });

    if (date) {
      return {
        date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        data: data.data(),
      };
    }

    return data.data();
  } catch (err) {
    console.error("❌ Firestore indexing error or query issue:");
    console.error("Message:", err?.message);
    console.error("Full Error:", err);
    throw err;
  }
};

export function useOrderssCount() {
  const { data, error, isLoading } = useSWR("orders_count_today", () =>
    getOrdersCounts({ date: null })
  );

  if (error) {
    console.error("❌ useOrderssCount error:", error?.message);
  }

  return { data, error, isLoading };
}

const getTotalOrdersCounts = async (dates) => {
  const promisesList = dates.map((date) =>
    getOrdersCounts({ date: new Date(date) })
  );

  return await Promise.all(promisesList);
};

export function useOrdersCountsByTotalDays({ dates }) {
  const { data, error, isLoading } = useSWR(
    ["orders_count_range", dates],
    ([, dates]) =>
      getTotalOrdersCounts(
        dates?.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      )
  );

  if (error) {
    console.error("❌ useOrdersCountsByTotalDays error:", error);
  }

  return { data, error, isLoading };
}
