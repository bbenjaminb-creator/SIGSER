export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">

      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <button>📧</button>

        <button>🔔</button>

        <button>👤</button>

      </div>

    </header>
  );
}