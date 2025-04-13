"use client"
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Headset } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const faqData = [
    { 
        question: "How can I track my order?", 
        answer: "You can track your order using the tracking ID provided in your order details." 
    },
    { 
        question: "What is the return policy?", 
        answer: "You can return eligible products within 7 days of delivery. Check our Returns page for details." 
    },
    { 
        question: "How long does it take to process a refund?", 
        answer: "Refunds are typically processed within 5-7 business days after return approval." 
    },
    { 
        question: "Do you offer international shipping?", 
        answer: "Currently, we only ship within India. International shipping will be available soon." 
    },
    { 
        question: "How do I contact customer support?", 
        answer: "You can reach out via email at support@snapify.com or call us at +91 910 XXXXXXX." 
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-800">Frequently Asked Questions</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Find answers to common queries below.
                </p>
            </div>
            <div className="max-w-3xl mx-auto mt-12 space-y-4">
                {faqData.map((faq, index) => (
                    <div 
                        key={index} 
                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-md font-semibold flex items-center">
                                <HelpCircle size={20} className="mr-2 text-blue-500" />
                                {faq.question}
                            </h3>
                            {openIndex === index ? (
                                <ChevronUp size={20} className="text-gray-600" />
                            ) : (
                                <ChevronDown size={20} className="text-gray-600" />
                            )}
                        </div>
                        {openIndex === index && (
                            <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-12 text-center">
                <h3 className="text-lg text-gray-700">Still have questions?</h3>
                <a href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-black transition mt-4 inline-block">
                    <Headset size={20} className="inline mr-2" /> Contact Support
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
