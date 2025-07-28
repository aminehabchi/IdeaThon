"use client";

import { useState } from "react";
import Ideathon from "../ideasComponent/ideathonCard";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProfileContent({ ideathons, entries }) {
    const [activeTab, setActiveTab] = useState("ideathons");

    return (
        <section className="w-full">
            {/* Custom Tab Header - Responsive */}
            <div className="flex flex-col sm:flex-row gap-1 border-b mb-4 sm:mb-6 overflow-x-auto">
                <Button
                    variant={activeTab === "ideathons" ? "default" : "ghost"}
                    className={`flex-shrink-0 rounded-none border-0 border-b-2 px-3 sm:px-4 py-2 text-sm sm:text-base ${
                        activeTab === "ideathons"
                            ? "border-primary bg-transparent text-primary hover:bg-primary/10"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-transparent"
                    }`}
                    onClick={() => setActiveTab("ideathons")}
                >
                    <span className="whitespace-nowrap">Ideathons</span>
                    {ideathons?.length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                            {ideathons.length}
                        </Badge>
                    )}
                </Button>
                <Button
                    variant={activeTab === "entries" ? "default" : "ghost"}
                    className={`flex-shrink-0 rounded-none border-0 border-b-2 px-3 sm:px-4 py-2 text-sm sm:text-base ${
                        activeTab === "entries"
                            ? "border-primary bg-transparent text-primary hover:bg-primary/10"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-transparent"
                    }`}
                    onClick={() => setActiveTab("entries")}
                >
                    <span className="whitespace-nowrap">Entries</span>
                    {entries?.length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                            {entries.length}
                        </Badge>
                    )}
                </Button>
            </div>

            {/* Tab Content */}
            {activeTab === "ideathons" && (
                <div className="w-full">
                    {ideathons && ideathons.length > 0 ? (
                        <div className="w-full max-w-full space-y-3 sm:space-y-4">
                            {ideathons.map((idea) => (
                                <Link key={idea.id} href={`/ideas/${idea.id}`}>
                                    <div className="w-full transition-transform hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.99]">
                                        <Ideathon {...idea} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Card className="w-full">
                            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                                <div className="text-center space-y-2 max-w-sm">
                                    <h3 className="text-base sm:text-lg font-semibold text-muted-foreground">
                                        No Ideathons Yet
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        You haven't created any ideathons yet. Start creating to see them here!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {activeTab === "entries" && (
                <div className="w-full">
                    {entries && entries.length > 0 ? (
                        <div className="w-full space-y-3 sm:space-y-4">
                            {entries.map((entry) => (
                                <Link key={entry.id} href={`/entries/${entry.id}`}>
                                    <Card className="w-full transition-all duration-200 hover:shadow-md hover:border-primary/20 active:scale-[0.99]">
                                        <CardContent className="p-3 sm:p-4">
                                            <div className="space-y-2">
                                                <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2">
                                                    {entry.title || "Untitled Entry"}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                                    {entry.description || "No description available"}
                                                </p>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2">
                                                    <Badge variant="outline" className="text-xs w-fit">
                                                        {entry.status || "Submitted"}
                                                    </Badge>
                                                    {entry.date && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(entry.date).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Card className="w-full">
                            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                                <div className="text-center space-y-2 max-w-sm">
                                    <h3 className="text-base sm:text-lg font-semibold text-muted-foreground">
                                        No Entries Yet
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        You haven't submitted any entries yet. Participate in ideathons to see your entries here!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </section>
    );
}