import { RefreshCw, CheckCircle, XCircle, Clock, Headset } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const returnPolicyData = [
    { 
        title: "Return Eligibility", 
        desc: "Returns are accepted within 7 days of delivery for eligible items. Items must be unused and in original packaging.", 
        icon: <CheckCircle size={28} className="text-green-500" />,
    },
    { 
        title: "Non-Returnable Items", 
        desc: "Certain items like perishable goods, personal care products, and final sale items are non-returnable.", 
        icon: <XCircle size={28} className="text-red-500" />,
    },
    { 
        title: "Return Process", 
        desc: "To initiate a return, go to 'My Orders' and select the item you want to return. Follow the steps to generate a return request.", 
        icon: <RefreshCw size={28} className="text-blue-500" />,
        button: { text: "Request a Return", link: "/returns" }
    },
    { 
        title: "Refund Timeline", 
        desc: "Refunds are processed within 5-7 business days after return approval. The amount is credited back to the original payment method.", 
        icon: <Clock size={28} className="text-yellow-500" />,
        button: { text: "Check Refund Status", link: "/refund-status" }
    }
];

export default function ReturnPolicy() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 p-6">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-800">Return Policy</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Hassle-free returns and easy refunds for eligible purchases.
                </p>
            </div>

            {/* Policy Sections */}
            <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {returnPolicyData.map((item, index) => (
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

            {/* Support Section */}
            <div className="mt-12 text-center">
                <h3 className="text-lg text-gray-700">Need Help with Returns?</h3>
                <a href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-black transition mt-4 inline-block">
                    <Headset size={20} className="inline mr-2" /> Contact Support
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
