"use client";

import { AiOutlineGoogle } from "react-icons/ai";
import { Button, Link } from "@nextui-org/react";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { create } from "canvas-confetti";
import { createUser } from "@/lib/firestore/user/write";

export default function Page() {
  const {user} = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const handleData = (key, value) => {
    setData({
      ...data, 
      [key]: value, 
    });
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
       await sendPasswordResetEmail(auth, data?.email);
       toast.success("Reset Link sent Successfully to your email !");
    } catch (error) {
       toast.error(error.message);
    }
    setIsLoading(false);
  };

    return(
        <main className="w-full flex justify-center items-center bg-gray-100 md:p-24 p-10 min-h-screen">
            <section className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <img className="h-12" src="/logo.png" alt="Logo"/>
                </div>
                <div className="flex flex-col gap-6 bg-white md:p-10 p-5 rounded-xl shadow-lg md:min-w-[440px] w-full">
                   <h1 className="font-semibold text-xl">Forgot Password</h1>
                   <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendEmail();
                      }}
                     className="flex flex-col gap-4">
                        <input
                        placeholder="Enter Your Email"
                        type="email"
                        name="user-email"
                        id="user-email"
                        value={data?.email}
                        onChange={(e) => {
                          handleData("email", e.target.value);
                        }}
                        className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none w-full focus:ring-2 focus:ring-blue-500 transition-shadow"
                        />
                        <Button isLoading={isLoading} isDisabled={isLoading} type="submit" color="primary" className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all">Send Reset Link</Button>
                   </form>
                   <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-medium text-blue-600 gap-2">
                      <Link href={'/login'} className="hover:underline">
                        <button className="font-semibold text-sm text-blue-700">
                            Sign In
                        </button>
                      </Link>
                   </div>
                </div>
            </section>
        </main>
    );
}