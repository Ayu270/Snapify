import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Link from "next/link";

export default function Page({ searchParams }) {
    const checkoutId = searchParams;
    return (
        <main>
            <Header />
            <section className="min-h-screen flex flex-col gap-3 justify-center items-center">
                <div className="flex justify-center w-full">
                    <img src="/Successful purchase-pana.svg" className="h-80" alt="" />
                </div>
                <h1 className="text-2xl font-semibold ">Your Order is{" "} <span className="font-bold text-green-600">Successfully</span> Placed !</h1>
                <div className="flex justify-center gap-6 text-sm">
                    <Link href={"/account"}>
                       <button className="text-white border-black px-5 py-2 rounded-lg bg-black">
                           Go to My Orders
                       </button>
                    </Link>
                </div>
            </section>
            <Footer />
        </main>
    );
}