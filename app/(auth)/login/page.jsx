"use client";

import { AiOutlineGoogle } from "react-icons/ai";
import { Button, Link } from "@nextui-org/react";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const {user} = useAuth();
  const router = useRouter();
  useEffect (() => {
    if(user){
        router.push("/account");
    }
  }, [user])
    return(
        <main className="w-full flex justify-center items-center bg-gray-100 md:p-24 p-10 min-h-screen">
            <section className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <img className="h-12" src="/logo.png" alt="Logo"/>
                </div>
                <div className="flex flex-col gap-6 bg-white md:p-10 p-5 rounded-xl shadow-lg md:min-w-[440px] w-full">
                   <h1 className="font-semibold text-xl">Login With Email</h1>
                   <form className="flex flex-col gap-4">
                        <input
                        placeholder="Enter Your Email"
                        type="email"
                        name="user-email"
                        id="user-email"
                        className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none w-full focus:ring-2 focus:ring-blue-500 transition-shadow"
                        />
                        <input
                        placeholder="Enter Your Password"
                        type="password"
                        name="user-password"
                        id="user-password"
                        className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none w-full focus:ring-2 focus:ring-blue-500 transition-shadow"
                        />
                        <Button color="primary" className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all">Login</Button>
                   </form>
                   <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-medium text-blue-600 gap-2">
                      <Link href={'/sign-up'} className="hover:underline">
                        <button className="font-semibold text-sm text-blue-700">
                            New? Create Account
                        </button>
                      </Link>
                      <Link href={'/forget-password'} className="hover:underline">
                        <button className="font-semibold text-sm text-blue-700">
                            Forget Password?
                        </button>
                      </Link>
                   </div>
                   <hr className="border-gray-300"/>
                   <SignInWithGoogleComponent/>
                </div>
            </section>
        </main>
    );
}

function SignInWithGoogleComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
      setIsLoading(true);
      try{
        const user = await signInWithPopup(auth, new GoogleAuthProvider());
      }catch(error){
        toast.error(error?.message);
      }
      setIsLoading(false);
    };
    return (
        <Button isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin} className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl transition-all">
            <AiOutlineGoogle className="text-xl" />
             Sign In With Google
        </Button>
    );
}