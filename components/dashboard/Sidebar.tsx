export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          SIGSER
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Sistema Integral de Gestión SERBEN
        </p>
      </div>

      {/* Módulos */}
      <nav className="flex-1 p-4 space-y-2">

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          🏠 Dashboard
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          💼 Comercial
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          🧹 Operaciones
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          👥 Recursos Humanos
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          💰 Finanzas
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          📊 Calidad
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          📈 Reportes
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          🏛 Filosofía
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          🤖 Inteligencia Artificial
        </button>

        <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-slate-800">
          ⚙️ Configuración
        </button>

      </nav>

      {/* Usuario */}
      <div className="border-t border-slate-700 p-4">
        <p className="font-semibold">
          Bruno Berton
        </p>

        <p className="text-sm text-slate-400">
          Gerente Administrativo
        </p>
      </div>

    </aside>
  );
}