import { Briefcase, Globe, Users, Rocket, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Careers() {
    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            {/* Header Section */}
            <div className="max-w-4xl text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">Join Snapify</h1>
                <p className="text-lg text-gray-600">
                    Be part of a dynamic, fast-growing team shaping the future of e-commerce.
                </p>
            </div>

            {/* Why Work With Us Section */}
            <div className="max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { icon: <Rocket size={32} className="text-blue-500" />, title: "Career Growth", desc: "We invest in your learning and provide opportunities to advance." },
                    { icon: <Globe size={32} className="text-green-500" />, title: "Remote Friendly", desc: "Work from anywhere with flexible hours and a great work-life balance." },
                    { icon: <Users size={32} className="text-purple-500" />, title: "Team Culture", desc: "We foster a collaborative and inclusive work environment." },
                    { icon: <CheckCircle size={32} className="text-yellow-500" />, title: "Top Benefits", desc: "Enjoy competitive pay, health benefits, and wellness perks." },
                    { icon: <Briefcase size={32} className="text-red-500" />, title: "Exciting Projects", desc: "Work on cutting-edge technology and solve real-world challenges." }
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

            {/* Open Positions */}
            <div className="max-w-4xl w-full mt-16">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">📌 Open Positions</h2>

                <div className="space-y-4">
                    {[
                        { role: "Frontend Developer (React/Next.js)", location: "Remote | Full-time" },
                        { role: "Backend Engineer (Node.js)", location: "Remote | Full-time" },
                        { role: "UI/UX Designer", location: "Remote | Full-time" },
                        { role: "Product Manager", location: "Hybrid | Full-time" }
                    ].map((job, index) => (
                        <div key={index} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">{job.role}</h3>
                                <p className="text-gray-600 text-sm">{job.location}</p>
                            </div>
                            <a href="/apply" className="text-blue-500 hover:underline text-sm">Apply Now →</a>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <div className="mt-12">
                <a href="/apply" className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-black transition">
                    Explore Careers
                </a>
            </div>
            </div>
            <Footer/>
        </div>
    );
}
