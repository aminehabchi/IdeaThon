"use client";

import React from 'react';
import Image from 'next/image';

export default function IdeathoonArticle() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Banner Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8">
                <Image
                    src="/article1.png" // replace with your banner image
                    alt="Ideathoon Beta Launch Banner"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg shadow-md"
                />
            </div>

            {/* Metadata Section */}
            <div className="text-center mb-8">
                <p className="text-sm text-gray-500 mb-2">
                    Sep 28, 2025 &middot; by Chakir Benlafkih
                </p>
                <h1 className="text-4xl font-bold text-gray-900">
                    Ideathoon: Beta Launch
                </h1>
            </div>

            {/* Separator */}
            <hr className="border-gray-300 my-6" />

            {/* Content Section */}
            <div className="prose prose-lg max-w-none mx-auto">
                <p className="mb-6 text-lg">
                    We are thrilled to announce the <strong>beta launch of Ideathoon</strong> — the platform where innovators, startups, and creative minds come together to run idea competitions and gain diverse, actionable insights.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Beta Features</h2>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li><strong>Create Your Profile:</strong> Set up and edit your profile, add social links, and showcase who you are.</li>
                    <li><strong>Run Free Ideathoons:</strong>
                        <ul className="list-disc list-inside ml-6 mt-1">
                            <li>Use a <strong>Notion-style WYSIWYG editor</strong> to freely describe your ideas.</li>
                            <li>Select <strong>categories</strong> and <strong>end dates</strong> for your competitions.</li>
                        </ul>
                    </li>
                    <li><strong>Submit Entries:</strong> Participants can submit ideas to your ideathon.</li>
                    <li><strong>Edit & Delete:</strong> Manage your ideathons and entries at any time.</li>
                    <li><strong>Choose a Winner:</strong> Pick the most outstanding submission.</li>
                    <li><strong>Notifications:</strong> Stay informed when entries are submitted or when your ideathon concludes.</li>
                    <li><strong>Search Ideathons:</strong> Discover and join competitions that inspire you.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li><strong>Paid Ideathoons:</strong> Monetize your competitions.</li>
                    <li><strong>Guaranteed Prizes:</strong> Decide if prizes are guaranteed or conditional.</li>
                    <li><strong>Entries Lock:</strong> Make submissions private for selective visibility.</li>
                    <li><strong>Direct Messaging:</strong> Connect with participants and collaborators directly.</li>
                </ul>

                <p className="text-lg">
                    Ideathoon is designed to empower both innovators and ideators — enabling collaboration, discovery, and recognition in a dynamic, community-driven environment.
                </p>
            </div>
        </div>
    );
}
