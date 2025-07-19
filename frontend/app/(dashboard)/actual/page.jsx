"use client";

import React from "react";
import { Categories } from "@/components/categories";
import { DashboardNavbar } from "@/components/dashboardNavbar";
import Ideathon from "@/components/ideathon"; // ✅ fixed import

const page = () => {
  const ideathon_data = {
    image: "https://example.com/cover.jpg",
    title: "Next-Gen Learning Platform",
    description:
      "A platform that redefines how students interact with educational content using AI and gamification.",
    author: "Aboubaker Elmaayouf",
    entries: 124,
    visibility: "Public",
    tag: "Education",
    price: "46",
    daysLeft: 7,
  };

  return (
    <>
      <DashboardNavbar />
      <Categories />
      <div className="flex flex-col items-center justify-center gap-8 mt-8">
        <Ideathon {...ideathon_data} />
        <Ideathon {...ideathon_data} />
      </div>
    </>
  );
};

export default page;
