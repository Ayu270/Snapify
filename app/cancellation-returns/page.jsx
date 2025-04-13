import { RefreshCw, XCircle, DollarSign, HelpCircle, Headset } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
    title: "Snapify | Cancellation & Returns",
    description: "Created by Ayush",
};

const policies = [
    { 
        title: "Cancellation Policy", 
        desc: "Orders can be canceled before they are shipped. Once shipped, cancellations are not allowed.", 
        icon: <XCircle size={28} className="text-red-500" />,
        button: { text: "Cancel Order", link: "/track-order" }
    },
    { 
        title: "Return Policy", 
        desc: "You can return products within 7 days of delivery if they meet our return criteria.", 
        icon: <RefreshCw size={28} className="text-blue-500" />,
        button: { text: "Return Request", link: "/returns" }
    },
    { 
        title: "Refund Process", 
        desc: "Refunds are processed within 5-7 business days after return approval.", 
        icon: <DollarSign size={28} className="text-green-500" />,
        button: { text: "Check Refund Status", link: "/refund-status" }
    }
];

const faqs = [
    { question: "Can I cancel my order after it's shipped?", answer: "No, orders cannot be canceled once they are shipped. You may initiate a return after delivery." },
    { question: "How do I request a return?", answer: "Go to the 'Return Request' page and follow the steps to request a return." },
    { question: "How long does it take to process a refund?", answer: "Refunds are typically processed within 5-7 business days after return approval." },
    { question: "Are there any items that can't be returned?", answer: "Yes, certain items like perishable goods, personal care items, and final sale products are non-returnable." }
];

export default function CancellationReturns() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-800">Cancellation & Returns</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Hassle-free cancellations, easy returns, and quick refunds.
                </p>
            </div>
            <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {policies.map((item, index) => (
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
            <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Cancellation & Return FAQs</h2>
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
                <h3 className="text-lg text-gray-700">Need Help with Cancellation or Returns?</h3>
                <a href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-black transition mt-4 inline-block">
                    <Headset size={20} className="inline mr-2" /> Contact Support
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}