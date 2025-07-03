import { Header } from "@/components/header";
import { customers } from "@/lib/placeholder-data";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = customers[0]; // Hardcode to first customer for demo

  return (
    <div className="flex h-screen w-full flex-col">
      <Header title="My Account" user={customer} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
