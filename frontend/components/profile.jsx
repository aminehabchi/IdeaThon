"use client";

export default function ProfileComponent({ profile, ideas }) {
    return (
        <div className="min-h-screen bg-[#f2f2f2]">
            <div className="max-w-7xl mx-auto flex px-4 pt-8">
                {/* Left Sidebar */}
                <aside className="w-full max-w-[260px] p-6 rounded-xl mr-6"> 
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={profile.avatar || "/avatar.jpg"}
                            alt="avatar"
                            className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                        <h2 className="text-lg font-semibold">{profile.name}</h2>
                        <p className="text-sm text-gray-500">{profile.location}</p>
                    </div>

                    <div className="mt-8 text-sm space-y-4">
                        <div>
                            <p className="text-gray-500">TOTAL IDEATHONS</p>
                            <p className="font-medium">{profile.totalIdeathons} IDEAS</p>
                        </div>

                        <div>
                            <p className="text-gray-500">TOTAL PRIZE WON</p>
                            <p className="font-medium">{profile.totalPrize} $</p>
                        </div>

                        <div>
                            <p className="text-gray-500">ON THE WEB</p>
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

                    <button className="mt-6 w-full text-sm py-2 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2">
                        ✏️ Edit Profile
                    </button>
                </aside>

                {/* Right Content Area */}
                <section className="flex-1">
                    <div className="flex gap-6 border-b pb-2 mb-4 text-sm font-medium">
                        <button className="text-black border-b-2 border-black pb-1">Ideathons</button>
                        <button className="text-gray-500 hover:text-black">Entries</button>
                    </div>

                    {ideas.map((idea, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md max-w-sm mb-4">
                            <p className="text-xs text-gray-400 mb-1"># IDEA {idea.number}</p>
                            <h3 className="font-semibold mb-1">{idea.title}</h3>
                            <p className="text-sm text-gray-600">{idea.description}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
