import Image from "next/image";
import { CreditCard, Banknote, Lock, HelpCircle, Headset } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
    title: "Snapify | Payments",
    description: "Created by Ayush",
};

const paymentMethods = [
    { 
        title: "Credit & Debit Cards", 
        desc: "We accept Visa, Mastercard, and Rupay.", 
        icon: <CreditCard size={28} className="text-blue-500" />,
        logos: ["/visapng.png", "/Mastercard.png", "/Rupaylogo.png"]
    },
    { 
        title: "UPI & Wallets", 
        desc: "Pay instantly via Google Pay, PhonePe, and Paytm.", 
        icon: <Banknote size={28} className="text-green-500" />,
        logos: ["/Googlelogo.png", "/pelogo.png", "/Paytmlogo.png"]
    },
    { 
        title: "Net Banking", 
        desc: "Secure payments from all major banks.", 
        icon: <Lock size={28} className="text-red-500" />,
        logos: ["/SBIlogo.png"]
    }
];

const faqs = [
    { question: "Is online payment secure?", answer: "Yes! We use industry-standard encryption to protect your payment details." },
    { question: "Can I use UPI for payments?", answer: "Absolutely! We support Google Pay, PhonePe, Paytm, and more." },
    { question: "Do you offer Cash on Delivery?", answer: "Yes! COD is available for select locations and products." },
    { question: "How can I get a refund?", answer: "Refunds are processed within 5-7 business days after the return is approved." }
];

export default function Payments() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-800">Secure Payments</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Choose from multiple payment methods for a seamless shopping experience.
                </p>
            </div>
            <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paymentMethods.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                        {item.icon}
                        <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                        <div className="flex gap-3 mt-4">
                            {item.logos.map((logo, idx) => (
                                <Image key={idx} src={logo} alt={item.title} width={50} height={30} className="h-8 w-auto" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Payment FAQs</h2>
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
            <div className="mt-12 text-center">
                <h3 className="text-lg text-gray-700">Need Help with Payments?</h3>
                <a href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-black transition mt-4 inline-block">
                    <Headset size={20} className="inline mr-2" /> Contact Support
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
