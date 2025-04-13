import { ShieldCheck, Lock, EyeOff, UserCheck, FileText, Globe, Headset } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
    title: "Snapify | Privacy Policy",
    description: "Created by Ayush",
};

const privacySections = [
    {
        title: "Data Security",
        description: "We implement advanced encryption and security protocols to safeguard your personal and payment information.",
        icon: <Lock size={32} className="text-blue-500" />
    },
    {
        title: "No Unauthorized Tracking",
        description: "We respect your privacy and do not engage in unauthorized tracking or data sharing with third parties.",
        icon: <EyeOff size={32} className="text-red-500" />
    },
    {
        title: "Your Personal Information",
        description: "We collect minimal personal information and only use it to improve your experience on our platform.",
        icon: <UserCheck size={32} className="text-green-500" />
    },
    {
        title: "Data Usage Policy",
        description: "We only use your data to enhance your experience, process transactions, and ensure security.",
        icon: <FileText size={32} className="text-indigo-500" />
    },
    {
        title: "Global Privacy Compliance",
        description: "We comply with GDPR, CCPA, and other international privacy laws to protect your rights.",
        icon: <Globe size={32} className="text-orange-500" />
    },
    {
        title: "Privacy Commitment",
        description: "Your privacy is our priority, and we ensure transparency in how we handle your data.",
        icon: <ShieldCheck size={32} className="text-purple-500" />
    }
];

export default function Privacy() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-lg text-gray-600 mt-2">
                    We are committed to protecting your personal data and ensuring transparency in how we handle it.
                </p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {privacySections.map((item, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg shadow-md flex items-start space-x-4">
                        {item.icon}
                        <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="max-w-4xl mx-auto text-center mt-12">
                <h2 className="text-xl font-semibold text-gray-800">Need Assistance?</h2>
                <p className="text-gray-600 mt-1">
                    If you have any privacy-related questions, contact us at
                    <a href="mailto:privacy@snapify.com" className="text-blue-600 hover:underline"> privacy@snapify.com</a>.
                </p>
            </div>
            <div className="mt-12 text-center">
                <a href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-black transition mt-4 inline-block">
                    <Headset size={20} className="inline mr-2" /> Contact Support
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
