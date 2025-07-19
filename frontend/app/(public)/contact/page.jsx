import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main className="mt-[-60px] min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-black">Contact us</h1>

          <div className="space-y-1">
            <Label className="text-sm text-gray-700">Your Email</Label>
            <Input placeholder="e.g. you@example.com" type="email" />
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-gray-700">Title</Label>
            <Input placeholder="e.g. Feedback, Question..." />
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-gray-700">Message</Label>
            <Textarea placeholder="Type your message here..." rows={15} />
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800 cursor-pointer">
            Submit
          </Button>
        </div>
      </main>
    </div>
  );
}
