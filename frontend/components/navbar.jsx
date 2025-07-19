import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-black">IdeaThons</h1>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">IdeaThons</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Blog</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Updates</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/login" passHref>
              <Button variant="ghost" className="text-gray-600 hover:text-black">
                Login
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button className="bg-black text-white hover:bg-gray-800">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
