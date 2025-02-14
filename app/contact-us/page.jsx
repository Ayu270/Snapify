import { Mail, Phone, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactUs() {
    return (
        <div>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Contact Us</h1>
                <p className="text-gray-600 text-center mb-6">We'd love to hear from you!</p>
                
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Phone size={20} className="text-blue-500" />
                        <span className="text-gray-700">+91 910 XXXXXXX</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail size={20} className="text-blue-500" />
                        <span className="text-gray-700">krayush266@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <MapPin size={20} className="text-blue-500" />
                        <span className="text-gray-700">Jaipur, India</span>
                    </div>
                </div>

                <form className="mt-6 space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
                    <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg h-32"></textarea>
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
                        Send Message
                    </button>
                </form>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
