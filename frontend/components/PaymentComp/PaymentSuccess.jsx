"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";


export function PaymentSuccess() {
    return (
        <div className=" min-h-screen mt-[-70px] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 space-y-6 ">
            <h1 className="text-2xl font-message text-gray-900">Payment</h1>
            <p className="text-sm text-gray-600">
                Payment was successful! Thank you for your contribution.
            </p>
            
            {/* Success State */}
            <div className="py-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white"></div>
                  <span className="text-sm text-gray-500">Start</span>
                </div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-gray-300"></div>
                  <span className="text-sm text-gray-900 font-medium">Paid</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <p className="text-green-600 font-medium">Paid Successfully</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" asChild className="text-gray-600">
                <Link href="/ideas" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Link>
              </Button>
              
              <Button asChild className="bg-gray-900 hover:bg-gray-800">
                <Link href="/ideas">Continue</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}