import Link from "next/link";
import ListView from "./components/ListView";


export default function Page() {
  return (
    <main className="flex flex-col gap-4 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Products</h1>
        <Link href={`/admin/products/form`}>
          <button className="bg-[#313131] text-sm text-white px-4 py-2 rounded-lg">
            Create
          </button>
        </Link>
      </div>
      <ListView />
    </main>
  );
}
// "use client"

// import Link from "next/link";
// import { useState } from "react";
// import ListView from "./components/ListView";

// export default function Page() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <main className="flex flex-col gap-4 p-5">
//       <div className="flex justify-between items-center gap-4">
//         <h1 className="text-xl">Products</h1>
//         <div className="flex items-center gap-2">
//           {/* Small Search Bar */}
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="px-4 py-1 border rounded-lg text-sm w-40 outline-none"
//           />
//           {/* Create Button */}
//           <Link href={`/admin/products/form`}>
//             <button className="bg-[#313131] text-sm text-white px-4 py-2 rounded-lg">
//               Create
//             </button>
//           </Link>
//         </div>
//       </div>
//       {/* Pass the search query to ListView */}
//       <ListView searchQuery={searchQuery} />
//     </main>
//   );
// }
