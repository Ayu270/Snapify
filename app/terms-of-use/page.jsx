import { Headset } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
    title: "Snapify | Terms of Use",
    description: "Created by Ayush",
};

export default function TermsOfUse() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-white p-6 text-gray-800">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900">Terms of Use</h1>
                <p className="text-sm text-gray-600 mt-2">Last Updated: February 2025</p>
                <p className="mt-4 text-md">
                    Welcome to Snapify. By using our website, services, and products, you agree to the following terms and conditions. 
                    Please read them carefully.
                </p>
                <hr className="my-6 border-gray-300" />
            </div>
            <div className="max-w-5xl mx-auto space-y-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                    <p className="text-md">
                        By accessing and using Snapify, you agree to be bound by these Terms of Use and all applicable laws. If you do not 
                        agree, please discontinue use of our services.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">2. User Accounts & Responsibilities</h2>
                    <p className="text-md">
                        You are responsible for maintaining the confidentiality of your account credentials. Any activities under your 
                        account are your responsibility. If you suspect unauthorized use, notify us immediately.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property Rights</h2>
                    <p className="text-md">
                        All content on Snapify, including logos, text, graphics, and software, is the property of Snapify and protected under 
                        copyright laws. You may not copy, reproduce, or distribute any content without our permission.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">4. Prohibited Activities</h2>
                    <p className="text-md">
                        You agree not to engage in fraudulent activities, unauthorized data collection, spam, hacking, or any activity that 
                        violates applicable laws or harms Snapify or other users.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
                    <p className="text-md">
                        Snapify is not liable for indirect, incidental, or consequential damages arising from the use of our services, 
                        including but not limited to lost profits or service interruptions.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
                    <p className="text-md">
                        Snapify reserves the right to update these Terms of Use at any time. Any changes will be posted on this page, and 
                        continued use of our services implies acceptance of the updated terms.
                    </p>
                </div>
            </div>
            <div className="mt-12 text-center">
                <h3 className="text-lg text-gray-700">Need Help?</h3>
                <a href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-black transition mt-4 inline-block">
                    <Headset size={20} className="inline mr-2" /> Contact Support
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}