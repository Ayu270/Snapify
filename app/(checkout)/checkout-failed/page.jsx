import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { adminDB } from "@/lib/firebase_admin";
import Link from "next/link";

const fetchCheckout = async (checkoutId) => {
    const list = await adminDB
      .collectionGroup("checkout_sessions")
      .where("id", "==", checkoutId)
      .get();
    if (list.docs.length === 0) {
      throw new Error("Invalid Checkout ID");
    }
    return list.docs[0].data();
};

export default async function Page({ searchParams }) {
    const { checkout_id } = searchParams;
    const checkout = await fetchCheckout(checkout_id);

    return (
        <main>
            <Header />
            <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
                <div className="flex justify-center w-full">
                    <img src="/Credit Card Payment-pana.svg" className="h-80" alt="" />
                </div>
                <h1 className="text-2xl font-semibold">Your Payment was not successful</h1>
                <div className="flex justify-center gap-6 text-sm">
                    <Link href={"/"}>
                       <button className="text-white border-blue-600 px-5 py-2 rounded-lg bg-blue-600">
                           Shop
                       </button>
                    </Link>
                    <Link href={checkout?.url}>
                       <button className="text-white border-black px-5 py-2 rounded-lg bg-black">
                           Retry
                       </button>
                    </Link>
                </div>
            </section>
            <Footer />
        </main>
    );
}