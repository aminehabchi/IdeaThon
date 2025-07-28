"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Unlock, Clock, Lock, Edit } from "lucide-react";
import Link from "next/link";
import { extractDocumentData } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";


export const DocumentHeader = ({ data }) => {
  const { user } = useAuth();
  console.log("user header", user);
  
  const extractedData = extractDocumentData(data);
  const {
    item,
    owner,
    privacy,
    daysLeft,
    price,
    currency,
  } = extractedData;

  const isOwner = user && user.id === owner.id; // ⬅️ Check ownership

  return (
    <nav className="border-b bg-gray-100 py-4 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        {/* Left: owner avatar/name, privacy badge, days left */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src={`http://localhost:8080/api${owner.avatar}`}
              alt={`${owner.first_name} avatar`}
              className="w-6 h-6 rounded-2xl"
            />
            <span className="font-medium text-gray-900">
              By {owner.first_name} {owner.last_name}
            </span>
          </div>

          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-medium px-3 py-1 flex items-center"
          >
            {privacy.toLowerCase() === "private" ? (
              <Lock className="w-3 h-3 mr-1" />
            ) : (
              <Unlock className="w-3 h-3 mr-1" />
            )}
            {privacy}
          </Badge>

          {daysLeft !== null && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{daysLeft}</span>
            </div>
          )}

          {/* Show Update button only if user is owner */}
          {isOwner && (
            <>
              -
              <div className="flex items-center gap-2 text-gray-800">
                <Edit className="w-4 h-4" />
                <Link
                  href={`/ideas/${item.id}/update`}
                  className="text-sm font-medium cursor-pointer"
                >
                  Update
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Right: price and Participate button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            {price} {currency}
          </span>

          {/* Show Participate only if user is not the owner */}
          {!isOwner && (
            <Link
              href={`/ideas/${item.id}/create`}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-md w-full sm:w-auto"
            >
              Participate
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
