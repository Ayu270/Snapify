// "use client";

// import { useEffect, useState } from "react";
// import CountMeter from "./components/CountMeter";
// import OrdersChart from "./components/OrdersChart";
// import RevenueChart from "./components/RevenueChart";
// import { useOrdersCountsByTotalDays } from "@/lib/firestore/orders/read_count";

// export default function Page() {
//     const [dates, setDates] = useState([]);

//     useEffect(() => {
//       let list = [];
//       for (let i = 0; i < 7; i++) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         list.push(date);
//       }
//       setDates(list);
//     }, []);

//     const { data } = useOrdersCountsByTotalDays({ dates: dates });


//     return(
//         <main className="flex flex-col gap-6 p-5">
//             <CountMeter />
//             <div className="flex flex-col md:flex-row gap-5 p-2">
//                 <RevenueChart items={data} />
//                 <OrdersChart items={data} />
//             </div>
//         </main>
//     );
// }


"use client";

import { useEffect, useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CountMeter from "./components/CountMeter";
import OrdersChart from "./components/OrdersChart";
import RevenueChart from "./components/RevenueChart";
import { useOrdersCountsByTotalDays } from "@/lib/firestore/orders/read_count";

export default function DashboardPage() {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6);
    return date;
  });

  const [endDate, setEndDate] = useState(new Date());
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const dateList = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dateList.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    setDates(dateList);
  }, [startDate, endDate]);

  const { data } = useOrdersCountsByTotalDays({ dates });

  const exportCSV = () => {
    const rows = [["Date", "Orders", "Revenue"]];
    data?.forEach((item) => {
      const formattedDate = item?.date || "";
      rows.push([
        formattedDate,
        item?.data?.totalOrders ?? 0,
        (item?.data?.totalRevenue ?? 0) / 100,
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <main className="flex flex-col gap-6 p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Home</h1>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center ">
          <Datepicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="rounded-md border px-3 py-1 w-full sm:w-auto -z-10"
          />
          <Datepicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            className="rounded-md border px-3 py-1 w-full sm:w-auto -z-10"
          />
          <button
            onClick={exportCSV}
            className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 transition w-full sm:w-auto"
          >
            Export CSV
          </button>
        </div>
      </div>

      <CountMeter />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <RevenueChart items={data} />
        <OrdersChart items={data} />
      </div>
    </main>
  );
}
