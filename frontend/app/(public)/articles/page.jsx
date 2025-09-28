"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const BlogPage = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const blogPosts = [
        {
            id: 1,
            title: "The Philosophy Behind Ideathoon",
            description: "Explore the ideas and motivations that drive the Ideathoon community.",
            date: "Sep 28, 2025",
            image: "/article2.png",
            slug: "the-philosophy-behind-ideathoon"
        },
        {
            id: 2,
            title: "Ideathoon: Beta Launch",
            description: "A first look at our beta launch and what early users can expect.",
            date: "Sep 28, 2025",
            image: "/article1.png",
            slug: "ideathoon-beta-lunch"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="text-center py-16 px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Our Blog
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Insights, tutorials, and thoughts on modern web development
                </p>
            </div>

            {/* Blog Cards Section */}
            <div className="max-w-4xl mx-auto px-4 pb-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/articles/${post.slug}`}
                            className="block"
                        >
                            <div
                                className={`bg-white border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer ${hoveredCard === post.id
                                    ? 'shadow-xl transform -translate-y-1'
                                    : 'shadow-sm'
                                    }`}
                                onMouseEnter={() => setHoveredCard(post.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Image */}
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {post.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>{post.date}</span>
                                        <span>by Chakir Benlafkih</span>
                                    </div>

                                    {/* Read More Link - appears on hover */}
                                    <div className={`transition-all duration-300 ${hoveredCard === post.id
                                        ? 'opacity-100 transform translate-y-0'
                                        : 'opacity-0 transform translate-y-2'
                                        }`}>
                                        <div className="flex items-center text-blue-600 font-medium">
                                            <span className="mr-2">Read more</span>
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;