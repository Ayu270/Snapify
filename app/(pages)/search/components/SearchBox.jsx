"use client";

import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const searchParams = useSearchParams();
    const q = searchParams.get("q");
    const router = useRouter();

    useEffect(() => {
        setQuery(q);
    }, [q]);

    const handleSubmit = () => {
        router.push(`/search?q=${query}`);
        router.refresh();
    };

    return (
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col sm:flex-row w-full justify-center gap-3 items-center"
        >
            <input 
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search for Products, Brands and More"
              className="min-w-[400px] border px-5 py-2 rounded-xl bg-white focus:outline-none"
              required
            />
            <Button type="submit" className="bg-black text-white w-full sm:w-auto">
               <Search size={13} />
                Search
            </Button>
        </form>
    );
}