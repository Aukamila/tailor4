import { SignupForm } from "@/components/signup-form";
import { SewingPinIcon } from "@/components/icons";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
            <SewingPinIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-center font-headline">Create an Account</h1>
          <p className="text-muted-foreground text-center">Join StitchPerfect today.</p>
        </div>
        <SignupForm />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="underline">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
