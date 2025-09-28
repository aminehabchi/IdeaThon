"use client";

import React from 'react';
import Image from 'next/image';

export default function IdeathoonIdeology() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Banner Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8">
                <Image
                    src="/article1.png" // replace with your banner image
                    alt="Ideathoon Ideology Banner"
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
                    The Ideology of Ideathoon
                </h1>
            </div>
            <hr className="border-gray-300 my-6" />
            {/* Content Section */}
            <div className="prose prose-lg max-w-none mx-auto">
                <p className="mb-6 text-lg">
                    Imagine a world where the best ideas aren’t just born in isolation, but cultivated together — where diverse minds gather to solve problems, refine concepts, and create solutions that truly make an impact. This is the core philosophy behind <strong>Ideathoon</strong>.
                </p>

                <h2 className="text-2xl font-semibold mb-4">The Power of Perspectives</h2>
                <p className="mb-6">
                    Innovation thrives on diversity. One person’s solution might be another person’s missed opportunity. Ideathoon encourages <strong>openness to multiple perspectives and directions</strong>, allowing participants to challenge assumptions, offer alternative approaches, and bring fresh thinking to every idea. By welcoming contributions from many angles, we move beyond the limits of individual thought.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Thinking Together, Creating Together</h2>
                <p className="mb-6">
                    Ideas become powerful when they are shared. Through <strong>collaborative ideathons</strong>, innovators connect with a community of experts in their field, creating a space where knowledge and experience intersect. Participants don’t just submit ideas; they build on each other’s concepts, sparking creativity and fostering breakthroughs that no single mind could achieve alone.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Impact and Positive Change</h2>
                <p className="mb-6">
                    At Ideathoon, we believe in creating a meaningful impact. Our platform focuses on challenges that contribute to a better world — helping the community make a positive difference and shape the future in the right direction. Every ideathon is a step toward building a community committed to meaningful, lasting change.
                </p>

                <p className="text-lg">
                    Ideathoon isn’t just a platform; it’s a movement — a way to think differently, work together, and turn ideas into reality. Join the community, share your perspective, and experience the power of collective creativity. Together, brilliant minds can solve problems that matter and shape a better future.
                </p>
            </div>
        </div>
    );
}
