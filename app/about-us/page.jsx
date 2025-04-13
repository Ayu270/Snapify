import Footer from "../components/Footer";
import Header from "../components/Header";
import { Users, Target, Globe, Lightbulb } from "lucide-react";

export const metadata = {
    title: "Snapify | About Us",
    description: "Created by Ayush",
};

export default function AboutUs() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="max-w-4xl text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Snapify</h1>
                <p className="text-lg text-gray-600">
                    We are committed to revolutionizing online shopping with innovation, customer satisfaction, 
                    and high-quality products.
                </p>
            </div>
            <div className="max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { icon: <Target size={32} className="text-blue-500" />, title: "Our Mission", desc: "To create an effortless shopping experience with quality, affordability, and trust." },
                    { icon: <Lightbulb size={32} className="text-yellow-500" />, title: "Our Vision", desc: "To become the most customer-centric e-commerce platform worldwide." }
                ].map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4">
                        {item.icon}
                        <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="max-w-5xl mt-16">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">🌟 Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: <Users size={32} className="text-green-500" />, title: "Customer First", desc: "We prioritize our customers and their needs above everything else." },
                        { icon: <Globe size={32} className="text-purple-500" />, title: "Global Impact", desc: "Our goal is to expand and make e-commerce seamless for everyone." },
                        { icon: <Lightbulb size={32} className="text-red-500" />, title: "Innovation", desc: "We constantly evolve with technology to enhance the shopping experience." }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4">
                            {item.icon}
                            <div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-12 text-center">
                <h3 className="text-lg text-gray-700">Want to know more or partner with us?</h3>
                <a href="/contact-us" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-slate-950 transition mt-4 inline-block">
                    Get in Touch
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
