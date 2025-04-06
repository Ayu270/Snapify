"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import Link from "next/link";

export default function AdminButton() {
  const { user } = useAuth();
  const { data } = useAdmin({ email: user?.email });

  if (!data) {
    return <></>;
  }

  return (
    <Link href="/admin">
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-white hover:text-black border border-black rounded-full transition-colors duration-300">
        Admin
      </button>
    </Link>
  );
}