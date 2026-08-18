import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import VolverAtras from "../../src/components/VolverAtras";

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

          <VolverAtras />

          {children}

        </main>

      </div>

    </div>
  );
}