import ExploradorOrdenes from "@/components/modules/operaciones/components/ExploradorOrdenes";
import VolverAtras from "@/src/components/VolverAtras";

export default function OperacionesPage() {
  return (
    <div className="p-8">
      <VolverAtras />

      <h1 className="text-3xl font-bold mb-2">
        Operaciones
      </h1>

      <p className="text-gray-600 mb-8">
        Gestión y seguimiento de órdenes de servicio.
      </p>

      <ExploradorOrdenes />
    </div>
  );
}