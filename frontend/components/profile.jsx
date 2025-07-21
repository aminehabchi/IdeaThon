"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";

export default function ProfileComponent({ profile, createdIdeathons, submittedEntries }) {
    const [activeTab, setActiveTab] = useState("ideathons");

    return (
        <div className="min-h-screen bg-[#ffffff]">
            <div className="max-w-7xl mx-auto flex px-4 pt-8">
                {/* Left Sidebar */}
                <aside className="w-full max-w-[260px] p-6  mr-6 border-r border-gray-200">
                    <div className="flex flex-col gap-6">
                        {/* Avatar and Name */}
                        <div className="flex flex-col items-start text-center">
                            <img
                                src={profile.avatar}
                                alt="avatar"
                                className="w-24 h-24 rounded-full object-cover mb-4"
                            />
                            <h2 className="text-lg font-semibold">{profile.name}</h2>
                            <p className="text-sm text-gray-500">{profile.location}</p>
                        </div>

                        {/* Bio */}
                        <div>
                            <h2 className="text-lg font-semibold">Bio</h2>
                            <p className="text-sm text-gray-500">{profile.bio}</p>
                        </div>

                        {/* Stats */}
                        <div className="text-sm space-y-4">
                            <div>
                                <p className="text-gray-500">Total Ideathons</p>
                                <p className="font-medium">{createdIdeathons.length} Ideas</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Total prize won</p>
                                <p className="font-medium">{profile.totalPrize} $</p>
                            </div>

                            <div>
                                <p className="text-gray-500">On the web</p>
                                <ul className="text-blue-500 space-y-1">
                                    {profile.links?.map((link, i) => (
                                        <li key={i}>
                                            <a href={link.url} target="_blank" rel="noreferrer">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Edit Profile Button */}
                        <Link href="/edit_profile">
                            <Button className="cursor-pointer w-full  hover:bg-gray-800 flex items-center justify-center space-x-1">
                                <Pen className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </Button>
                        </Link>
                    </div>
                </aside>
                {/* Right Content Area */}
                <section className="flex-1">
                    <div className="flex gap-6 border-b mb-4 text-sm font-medium">
                        <button
                            className={activeTab === "ideathons"
                                ? "text-black border-b-2 border-black pb-1 cursor-pointer"
                                : "text-gray-500 hover:text-black cursor-pointer"}
                            onClick={() => setActiveTab("ideathons")}
                        >
                            Ideathons
                        </button>
                        <button
                            className={activeTab === "entries"
                                ? "text-black border-b-2 border-black pb-1 cursor-pointer"
                                : "text-gray-500 hover:text-black cursor-pointer"}
                            onClick={() => setActiveTab("entries")}
                        >
                            Entries
                        </button>
                    </div>

                    {activeTab === "ideathons" && createdIdeathons.map((idea, index) => (
                        <div key={idea.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-transparent transition-shadow max-w-sm mb-4">
                            <p className="text-xs text-gray-400 mb-1"># IDEA {index + 1}</p>
                            <h3 className="font-semibold mb-1">{idea.title}</h3>
                            <p className="text-sm text-gray-600">{idea.description}</p>
                        </div>
                    ))}

                    {activeTab === "entries" && submittedEntries.map((entry, index) => (
                        <div key={entry.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md hover:border-transparent transition-shadow max-w-sm mb-4">
                            <p className="text-xs text-gray-400 mb-1"># ENTRY {index + 1}</p>
                            <h3 className="font-semibold mb-1">{entry.title}</h3>
                            <p className="text-sm text-gray-600">{entry.description}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
