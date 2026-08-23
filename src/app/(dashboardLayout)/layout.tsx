import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden md:flex md:w-60 md:shrink-0">
        <DashboardSidebar />
      </div>

      <div className="md:hidden">
        <DashboardMobileNav />
      </div>
      <main className="flex-1 overflow-y-auto bg-[#080c14] p-6">
        {children}
      </main>
    </div>
  );
}
