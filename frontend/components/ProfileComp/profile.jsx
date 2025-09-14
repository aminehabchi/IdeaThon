import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pen, MapPin, Phone, Trophy, Target, Award, Users } from "lucide-react";

export default function ProfileComponent({ profile }) {
    let avatar = "/api" + profile?.avatar;

    return (
        <div className="max-w-7xl mx-auto flex px-4 pt-8">
            {/* Left Sidebar */}
            <aside className="w-full max-w-[260px] mr-6">
                <Card className="h-fit">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-6">
                            {/* Avatar and Name */}
                            <div className="flex flex-col items-center text-center">
                                <Avatar className="w-24 h-24 border-2 border-gray-300 mb-4">
                                    <AvatarImage 
                                        src={avatar || "/avatar-default.svg"} 
                                        alt="avatar"
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="text-lg">
                                        {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold">
                                        {profile?.first_name} {profile?.last_name}
                                    </h2>
                                    {profile?.location && (
                                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {profile.location}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* Bio */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">Bio</h3>
                                <p className="text-sm text-muted-foreground break-words">
                                    {profile?.bio || "No bio available."}
                                </p>
                                {profile?.phone_number && (
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Phone className="w-3 h-3 mr-2" />
                                        {profile.phone_number}
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Stats */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Statistics</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center text-muted-foreground">
                                            <Users className="w-4 h-4 mr-2" />
                                            Total Ideathons
                                        </div>
                                        <Badge variant="secondary">{profile?.ideathons || 0}</Badge>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center text-muted-foreground">
                                            <Target className="w-4 h-4 mr-2" />
                                            Total entries
                                        </div>
                                        <Badge variant="secondary">{profile?.entries || 0}</Badge>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center text-muted-foreground">
                                            <Trophy className="w-4 h-4 mr-2" />
                                            Total prize
                                        </div>
                                        <Badge variant="secondary">{profile?.total_prices || 0}</Badge>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center text-muted-foreground">
                                            <Award className="w-4 h-4 mr-2" />
                                            Total wins
                                        </div>
                                        <Badge variant="secondary">{profile?.total_wins || 0}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            {profile?.links && profile.links.length > 0 && (
                                <>
                                    <Separator />
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold">On the web</h3>
                                        <div className="space-y-2">
                                            {profile.links.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="block text-sm text-primary hover:underline"
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            <Separator />

                            {/* Edit Profile Button */}
                            <Link href="/profile/edit">
                                <Button className="w-full" variant="default">
                                    <Pen className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
}