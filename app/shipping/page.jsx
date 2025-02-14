import Image from "next/image";
import { Truck, Package, MapPin, HelpCircle, Headset } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const shippingInfo = [
    { 
        title: "Fast & Reliable Shipping", 
        desc: "We ensure your orders reach you on time with trusted delivery partners.", 
        icon: <Truck size={28} className="text-blue-500" />
    },
    { 
        title: "Track Your Order", 
        desc: "Easily track your package in real-time from our website.", 
        icon: <MapPin size={28} className="text-green-500" />,
        button: { text: "Track Order", link: "/track-order" } // Button added here
    },
    { 
        title: "Safe Packaging", 
        desc: "All items are packed securely to prevent damage during transit.", 
        icon: <Package size={28} className="text-red-500" />
    }
];

const deliveryPartners = [
    { name: "Delhivery", logo: "/Delhivery.png" },
    { name: "Blue Dart", logo: "/Blue.png" },
    { name: "DTDC", logo: "/dtdc.png" },
    { name: "Ekart", logo: "/ekart.png" },
    { name: "FedEx", logo: "/fedex.png" }
];

const faqs = [
    { question: "How long does shipping take?", answer: "Shipping takes 3-7 business days, depending on your location." },
    { question: "Can I track my order?", answer: "Yes! You can track your order using the tracking ID provided after dispatch." },
    { question: "Do you offer international shipping?", answer: "Currently, we only ship within India. International shipping will be available soon." },
    { question: "What if my order is delayed?", answer: "If your order is delayed, please contact our support team for assistance." }
];

export default function Shipping() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 p-6">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-800">Shipping Information</h1>
                <p className="text-lg text-gray-600 mt-2">
                    We ensure fast, safe, and reliable delivery of your orders.
                </p>
            </div>

            {/* Shipping Info */}
            <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {shippingInfo.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                        {item.icon}
                        <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                        {item.button && (
                            <a 
                                href={item.button.link} 
                                className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                            >
                                {item.button.text}
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* Delivery Partners */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Trusted Delivery Partners</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {deliveryPartners.map((partner, index) => (
                        <div key={index} className="p-4 bg-white rounded-xl shadow-md flex items-center justify-center">
                            <Image src={partner.logo} alt={partner.name} width={120} height={60} className="h-12 w-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Shipping FAQs</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
                            <HelpCircle size={24} className="text-blue-500" />
                            <div>
                                <h3 className="text-md font-semibold">{faq.question}</h3>
                                <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Support Section */}
            <div className="mt-12 text-center">
                <h3 className="text-lg text-gray-700">Need Help with Shipping?</h3>
                <a href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-black transition mt-4 inline-block">
                    <Headset size={20} className="inline mr-2" /> Contact Support
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
