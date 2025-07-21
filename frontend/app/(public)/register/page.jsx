import { SignUpForm } from "@/components/register-form"
import { Navbar } from "@/components/navbar"
export default function RegisterPage() {
  return (
    <>
      <Navbar></Navbar>
     <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
            <SignUpForm />
        </div>
     </div>
    </>

  )
}
