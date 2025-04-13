import { ShieldCheck, Lock, UserCheck, AlertTriangle, Globe, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
    title: "Snapify | Security",
    description: "Created by Ayush",
};

const securityData = [
    {
        title: "Data Encryption",
        description: "We use industry-standard AES-256 encryption to secure your personal and payment information.",
        icon: <Lock size={28} className="text-blue-500" />
    },
    {
        title: "Account Protection",
        description: "Multi-factor authentication (MFA) and security alerts keep your account safe from unauthorized access.",
        icon: <UserCheck size={28} className="text-green-500" />
    },
    {
        title: "Fraud Detection",
        description: "Our AI-powered system continuously monitors for suspicious activity and fraud attempts.",
        icon: <ShieldCheck size={28} className="text-indigo-500" />
    },
    {
        title: "Secure Transactions",
        description: "All transactions are protected with PCI-DSS compliance to ensure a safe and reliable shopping experience.",
        icon: <CheckCircle size={28} className="text-purple-500" />
    },
    {
        title: "Privacy Protection",
        description: "Your personal data is never sold or shared with third parties. We comply with GDPR and other privacy laws.",
        icon: <Globe size={28} className="text-orange-500" />
    },
    {
        title: "Security Alerts",
        description: "Get real-time notifications if any unusual login or transaction is detected on your account.",
        icon: <AlertTriangle size={28} className="text-red-500" />
    }
];

export default function Security() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900">Security</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Your safety is our top priority. We implement advanced security measures to protect your data and transactions.
                </p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {securityData.map((item, index) => (
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
                <h2 className="text-xl font-semibold text-gray-800">Need Help?</h2>
                <p className="text-gray-600 mt-1">
                    If you notice any suspicious activity or security concerns, contact us at
                    <a href="mailto:security@snapify.com" className="text-blue-600 hover:underline"> security@snapify.com</a>.
                </p>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
