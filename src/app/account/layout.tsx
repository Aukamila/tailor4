import { Header } from "@/components/header";
import { customers } from "@/lib/placeholder-data";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = customers[0]; // Hardcode to first customer for demo

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Account" user={customer} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
