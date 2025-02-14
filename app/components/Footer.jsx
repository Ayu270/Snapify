import Link from "next/link";
import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { PiXLogoDuotone } from "react-icons/pi";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-blue-100 text-black text-sm p-6 md:p-10">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                <div>
                    <h2 className="font-bold mb-3">ABOUT</h2>
                    <ul className="space-y-2">
                        <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
                        <li><Link href="/about-us" className="hover:underline">About Us</Link></li>
                        <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                        <li><Link href="/stories" className="hover:underline">Snapify Stories</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold mb-3">HELP</h2>
                    <ul className="space-y-2">
                        <li><Link href="/payments" className="hover:underline">Payments</Link></li>
                        <li><Link href="/shipping" className="hover:underline">Shipping</Link></li>
                        <li><Link href="/cancellation-returns" className="hover:underline">Cancellation & Returns</Link></li>
                        <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold mb-3">CONSUMER POLICY</h2>
                    <ul className="space-y-2">
                        <li><Link href="/return-policy" className="hover:underline">Return Policy</Link></li>
                        <li><Link href="/terms-of-use" className="hover:underline">Terms of Use</Link></li>
                        <li><Link href="/security" className="hover:underline">Security</Link></li>
                        <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold mb-3">SOCIAL</h2>
                    <div className="flex space-x-4 text-lg">
                        <Link href="https://github.com/Ayu270"><FaGithub /></Link>
                        <Link href="https://x.com/_ayush27"><PiXLogoDuotone /></Link>
                        <Link href="https://www.instagram.com/krayush27/"><FaInstagram /></Link>
                        <Link href="https://www.youtube.com/@ayush_27"><FaYoutube /></Link>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs">
                <div className=" w-full flex flex-col md:flex-row md:justify-between gap-3">
                    <div className="flex">
                        <img className="h-8" src="/logo.png" alt="Logo" />
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row justify-end gap-4">
                        <div className="flex gap-2 items-center">
                            <Phone size={12} className="text-black" />
                            <h2 className="text-sm text-gray-600">+91 910 XXXXXXX</h2>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Mail size={12} className="text-black" />
                            <h2 className="text-sm text-gray-600">krayush266@gmail.com</h2>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MapPin size={12} className="text-black" />
                            <h2 className="text-sm text-gray-600">Jaipur</h2>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full p-2">
                    <h3 className="text-xs text-gray-700">
                        © 2025 Snapify. All rights reserved by Ayush.
                    </h3>
                </div>
            </div>
        </footer>
    );
}
