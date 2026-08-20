import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 overflow-auto p-6">

          {children}

        </main>

      </div>

    </div>
  );
}