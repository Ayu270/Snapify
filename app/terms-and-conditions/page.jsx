import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata = {
    title: "Snapify | Terms & Conditions",
    description: "Created by Ayush",
};

export default function TermsAndConditions() {
    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900">Terms & Conditions</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Please read these terms and conditions carefully before using Snapify.
                </p>
            </div>
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8 space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        By accessing or using Snapify, you agree to comply with and be bound by these Terms and Conditions. 
                        If you do not agree, you may not use our services.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">2. User Accounts</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        - You must be at least 18 years old or have parental consent to use our platform.<br />
                        - You are responsible for maintaining the confidentiality of your account credentials.<br />
                        - Any unauthorized activity on your account must be reported immediately.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">3. Purchases & Payments</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        - All transactions are securely processed.<br />
                        - Refunds and cancellations are subject to our <a href="/return-policy" className="text-blue-600 hover:underline">Return Policy</a>.<br />
                        - We accept multiple payment methods including Visa, Mastercard, and digital wallets.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">4. Prohibited Activities</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        - You agree not to engage in fraudulent activities or misuse our services.<br />
                        - Unauthorized scraping, hacking, or distribution of content is strictly prohibited.<br />
                        - Any violation may result in account termination.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">5. Liability Disclaimer</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        - Snapify is not responsible for third-party actions or service interruptions.<br />
                        - We strive for accuracy, but we do not guarantee error-free content.<br />
                        - Users agree to use our services at their own risk.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">6. Changes to Terms</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        - We may update these Terms & Conditions at any time.<br />
                        - Users will be notified of major changes via email or site announcement.<br />
                        - Continued use of Snapify after updates implies acceptance of the new terms.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-gray-800">Need Assistance?</h2>
                    <p className="text-gray-600 text-sm mt-1">
                        If you have any questions regarding these Terms, contact us at 
                        <a href="mailto:support@snapify.com" className="text-blue-600 hover:underline"> support@snapify.com</a>.
                    </p>
                </section>
            </div>
          </div>
          <Footer />
        </div>
    );
}
