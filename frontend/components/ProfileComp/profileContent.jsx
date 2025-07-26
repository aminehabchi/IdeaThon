"use client";

import { useState } from "react";
import Ideathon from "../ideasComponent/ideathonCard";
import Link from "next/link";

export function ProfileContent({ ideathons }) {
    const [activeTab, setActiveTab] = useState("ideathons");

    return (
        <section className="flex-1">
            <div className="flex gap-6 border-b mb-4 text-sm font-medium">
                <button
                    className={
                        activeTab === "ideathons"
                            ? "text-black border-b-2 border-black pb-1 cursor-pointer"
                            : "text-gray-500 hover:text-black cursor-pointer"
                    }
                    onClick={() => setActiveTab("ideathons")}
                >
                    Ideathons
                </button>
                <button
                    className={
                        activeTab === "entries"
                            ? "text-black border-b-2 border-black pb-1 cursor-pointer"
                            : "text-gray-500 hover:text-black cursor-pointer"
                    }
                    onClick={() => setActiveTab("entries")}
                >
                    Entries
                </button>
            </div>
            {ideathons?.map((idea) => (
                <Link key={idea.id} href={`/ideas/${idea.id}`}>
                    <Ideathon {...idea} />
                </Link>
            ))}
        </section>
    );
}
