import { Orden } from "../types/Orden";

type TablaOrdenesProps = {
  ordenes: Orden[];
  onVer: (orden: Orden) => void;
};

export default function TablaOrdenes({
  ordenes,
  onVer,
}: TablaOrdenesProps) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>ID</th>
<th>Cliente</th>
<th>Fecha</th>
<th>Supervisor</th>
<th>Estado</th>
<th>Planificación</th>
<th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {ordenes.map((orden) => (
        <tr key={orden.idPedido || crypto.randomUUID()}>
  <td>{orden.idPedido}</td>
  <td>{orden.lugar}</td>
  <td>{orden.fechaEjecucion
  ? orden.fechaEjecucion.toLocaleDateString()
  : "-"}</td>
  <td>{orden.supervisor}</td>
  <td>{orden.estado}</td>
  <td>{orden.tiempoParaEjecutar}</td>
  <td>
    <button onClick={() => onVer(orden)}>
      Ver
    </button>
  </td>
</tr>
        ))}
      </tbody>
    </table>
  );
}