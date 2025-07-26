"use client";
import React from "react";

export default function ErrorCard({ status = 404, text = "Something went wrong." }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">{status}</h1>
      <p className="text-xl text-gray-700">{text}</p>
    </div>
  );
}