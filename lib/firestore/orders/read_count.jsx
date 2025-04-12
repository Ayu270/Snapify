// "use client";

// import { db } from "@/lib/firebase";
// import {
//   average,
//   collection,
//   count,
//   getAggregateFromServer,
//   getCountFromServer,
//   sum,
// } from "firebase/firestore";
// import useSWR from "swr";

// export const getOrdersCount = async () => {
//   const ref = collection(db, `orders`);
//   const data = await getAggregateFromServer(ref, {
//     totalRevenue: sum("payment.amount"),
//     totalOrders: count(),
//   });
//   return data.data();
// };




// export const getOrdersCounts = async ({ date }) => {
//   const ref = collection(db, `orders`);
//   let q = query(ref);

//   if (date) {
//     const fromDate = new Date(date);
//     fromDate.setHours(0, 0, 0, 0);
//     const toDate = new Date(date);
//     toDate.setHours(24, 0, 0, 0);
//     q = query(
//       q,
//       where("timestampCreate", ">=", fromDate),
//       where("timestampCreate", "<=", toDate)
//     );
//   }

//   const data = await getAggregateFromServer(q, {
//     totalRevenue: sum("payment.amount"),
//     totalOrders: count(),
//   });
//   if (date) {
//     return {
//       date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
//       data: data.data(),
//     };
//   }
//   return data.data();
// };


// export function useOrderssCount() {
//   const { data, error, isLoading } = useSWR("ordrs_count", (key) =>
//     getOrdersCount({ date: null })
//   );
//   if (error) {
//     console.log(error?.message);
//   }
//   return { data, error, isLoading };
// }

// const getTotalOrdersCounts = async (dates) => {
//   let promisesList = [];
//   for (let i = 0; i < dates?.length; i++) {
//     const date = dates[i];
//     promisesList.push(getOrdersCounts({ date: date }));
//   }
//   const list = await Promise.all(promisesList);
//   return list;
// };

// export function useOrdersCountsByTotalDays({ dates }) {
//   const { data, error, isLoading } = useSWR(
//     ["orders_count", dates],
//     ([key, dates]) =>
//       getTotalOrdersCounts(dates?.sort((a, b) => a?.getTime() - b?.getTime()))
//   );
//   if (error) {
//     console.log(error);
//   }
//   return { data, error, isLoading };
// }



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

// ✅ Main function to get order counts (for today or a specific date)
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

// ✅ Hook to get today's order count
export function useOrderssCount() {
  const { data, error, isLoading } = useSWR("orders_count_today", () =>
    getOrdersCounts({ date: null })
  );

  if (error) {
    console.error("❌ useOrderssCount error:", error?.message);
  }

  return { data, error, isLoading };
}

// ✅ Helper to get multiple day-wise counts
const getTotalOrdersCounts = async (dates) => {
  const promisesList = dates.map((date) =>
    getOrdersCounts({ date: new Date(date) })
  );

  return await Promise.all(promisesList);
};

// ✅ Hook to fetch total counts for multiple dates
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
