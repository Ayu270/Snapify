import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const stories = [
    {
        title: "How AI is Transforming E-Commerce",
        excerpt: "Discover how artificial intelligence is reshaping the online shopping experience.",
        image: "/storie1.jpg",
        link: "/stories/ai-ecommerce",
    },
    {
        title: "Sustainable Shopping: The Future of Retail",
        excerpt: "Learn how eco-friendly shopping practices are gaining momentum.",
        image: "/storie2.jpg",
        link: "/stories/sustainable-shopping",
    },
    {
        title: "Behind the Scenes: The Journey of a Product",
        excerpt: "Explore the complete lifecycle of a product from warehouse to doorstep.",
        image: "/stories3.png",
        link: "/stories/product-journey",
    },
    {
        title: "Customer Success Stories",
        excerpt: "Real stories from happy customers who found what they love on Snapify.",
        image: "/stories4.png",
        link: "/stories/customer-success",
    },
];

export default function Stories() {
    return (
       <div>
          <Header/>
          <div className="min-h-screen bg-gray-50 p-6">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-800">Snapify Stories</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Discover inspiring stories, latest trends, and behind-the-scenes insights.
                </p>
            </div>

            {/* Stories Grid */}
            <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {stories.map((story, index) => (
                    <Link key={index} href={story.link} className="group">
                        <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
                            <img 
                                src={story.image} 
                                alt={story.title} 
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{story.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">{story.excerpt}</p>
                                <span className="text-blue-500 text-sm mt-2 inline-block group-hover:underline">
                                    Read More →
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            </div>
            <Footer/>
       </div>
    );
}
