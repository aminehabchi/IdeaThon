"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Unlock, Lock, Clock } from "lucide-react";

export function ProjectNavbar() {
    return (
      <nav className="border-b bg-gray-100 py-4 px-4  sm:px-8 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 max-w-full">
          
          {/* Left Section */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* By Expert */}
            <div className="flex items-center gap-2">
              <img
                src="/belmaayo_avatar.png"
                alt="Asana Logo"
                className="w-6 h-6 rounded-2xl"
              />
              <span className="font-medium text-gray-900">By Asana</span>
            </div>
  
            {/* Private Badge */}
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-medium px-3 py-1 flex items-center"
            >
              {/* change it to lock if the idea is private */}
              <Unlock className="w-3 h-3 mr-1" />
              Public
            </Badge>
  
            {/* Days Left */}
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">5 Days Left</span>
            </div>
          </div>
  
          {/* Right Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            {/* Price */}
            <span className="text-xl sm:text-2xl font-bold text-gray-900">$499</span>
  
            {/* Participate Button */}
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-md w-full sm:w-auto">
              Participate
            </Button>
          </div>
        </div>
      </nav>
    );
  }