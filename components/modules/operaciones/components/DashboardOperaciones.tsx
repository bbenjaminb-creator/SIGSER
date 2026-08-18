import IndicadoresOrdenes from "./IndicadoresOrdenes";
import { Orden } from "../types/Orden";
import HistoricoPlanificacion from "./HistoricoPlanificacion";

type DashboardOperacionesProps = {
  ordenes: Orden[];
  onVerOrden: (orden: Orden) => void;
};

export default function DashboardOperaciones({
  ordenes,
  onVerOrden,
}: DashboardOperacionesProps) {
  return (
    <>
      <IndicadoresOrdenes
        ordenes={ordenes}
        onVerOrden={onVerOrden}
      />

      <HistoricoPlanificacion
        ordenes={ordenes}
      />
    </>
  );
}