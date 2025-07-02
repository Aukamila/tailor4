import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { DashboardNav } from "@/components/dashboard-nav";
import { Header } from "@/components/header";
import { customers } from "@/lib/placeholder-data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardNav />
      </Sidebar>
      <SidebarInset>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
