
import Link from "next/link";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

export default function ProfileComponent({ profile }) {

    let avatar = "http://localhost:8080/api" + profile?.avatar

    return (

        <div className="max-w-7xl mx-auto flex px-4 pt-8">
            {/* Left Sidebar */}
            <aside className="w-full max-w-[260px] p-6  mr-6 border-r border-gray-200">
                <div className="flex flex-col gap-6 ">
                    {/* Avatar and Name */}
                    <div className="flex flex-col  items-center text-center">
                        <img
                            src={avatar || "/avatar-default.svg"}
                            alt="avatar"
                            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover mb-4"
                        />
                        <h2 className="text-lg font-semibold">{profile?.first_name}</h2>
                        <h2 className="text-lg font-semibold">{profile?.last_name}</h2>
                        <p className="text-sm text-gray-500">{profile?.location}</p>
                    </div>

                    {/* Bio */}
                    <div>
                        <h2 className="text-lg font-semibold">Bio</h2>
                        <p className="text-sm text-gray-500 break-words">
                            {profile?.bio || "No bio available."}
                        </p>
                        <p className="text-gray-500 mt-2">Phone : {profile?.phone_number || "No Phone Number"}</p>
                    </div>

                    {/* Stats */}
                    <div className="text-sm space-y-4">
                        <div>
                            <p className="text-gray-500">Total Ideathons : {profile?.ideathons || 0}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Total entries : {profile?.entries || 0}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Total prize : {profile?.total_prices || 0}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Total Ideathons that win : {profile?.total_wins || 0}</p>
                        </div>
                        {profile?.links ? <div>
                            <p className="text-gray-500">On the web</p>
                            <ul className="text-blue-500 space-y-1">
                                {profile?.links?.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} target="_blank" rel="noreferrer">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div> : null}
                    </div>

                    {/* Edit Profile Button */}
                    <Link href="/profile/edit">
                        <Button className="cursor-pointer w-full  hover:bg-gray-800 flex items-center justify-center space-x-1">
                            <Pen className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </Button>
                    </Link>
                </div>
            </aside>
        </div>

    );
}
