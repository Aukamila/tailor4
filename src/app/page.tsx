import { LoginForm } from "@/components/login-form";
import { SewingPinIcon } from "@/components/icons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
            <SewingPinIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-center font-headline">StitchPerfect</h1>
          <p className="text-muted-foreground text-center">Your Digital Tailoring Assistant</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
