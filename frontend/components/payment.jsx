"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DashboardNavbar } from "./dashboardNavbar";
export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <PaymentSuccess></PaymentSuccess>
    );
  }

  function routing(method) {
    setPaymentMethod(method);
    router.push(`/${method}.com`);
  }

  return (
    <div className=" mt-[-60px] min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white  p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-medium text-gray-900 mb-2">Payment</h1>
            <p className="text-sm text-gray-600">
              Motivate contributions by granting a reward for the winner
            </p>
          </div>

          {/* Price */}
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-gray-900">499$</div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            {/* PayPal */}
            <button
              onClick={() => routing("paypal")}
              className={`w-full p-3 rounded-2xl border-2 transition-colors cursor-pointer ${
                paymentMethod === "paypal"
                  ? "bg-[#FFC43A]"
                  : "border-orange-300"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                  <Link href={"paypal.com"} className="flex  items-center space-x-2">
                  <Image
                    src={"/paypal.png"}
                    width={72}
                    height={72}
                    alt="PayPal"
                  ></Image>
                  </Link>
              </div>
            </button>

            {/* Credit Card */}
            <button
              onClick={() => routing("card")}
              className={`w-full p-3 rounded-2xl border-2 transition-colors ${
                paymentMethod === "card"
                  ? "border-gray-400 bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <CreditCard className="w-4 h-4 text-gray-600" />
                  <Link href={"paypal.com"} className="flex  items-center space-x-2">
                    Pay with Credit Card
                  </Link>
              </div>
            </button>
          </div>

          {/* Powered by PayPal */}
          <div className="text-center">
            <p className="text-xs text-gray-500">Powered by</p>
            <div className="text-sm font-medium text-blue-600">PayPal</div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <Button variant="ghost" asChild className="text-gray-600">
              <Link href="/ideas" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
            </Button>
            
            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-gray-900 hover:bg-gray-800 cursor-pointer"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
