import { Orden } from "../types/Orden";

interface Props {
  orden: Orden;
}

export default function ResumenServicio({ orden }: Props) {
  const colorEstado =
    orden.estado.toUpperCase() === "EJECUTADO"
      ? "#2e7d32"
      : orden.estado.toUpperCase() === "RECHAZADO"
      ? "#c62828"
      : "#1565c0";

  const fondoEstado =
    orden.estado.toUpperCase() === "EJECUTADO"
      ? "#e8f5e9"
      : orden.estado.toUpperCase() === "RECHAZADO"
      ? "#ffebee"
      : "#e3f2fd";

  return (
    <div
      style={{
        marginBottom: "24px",
        borderBottom: "1px solid #e5e5e5",
        paddingBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>{orden.idPedido}</h2>

        <span
          style={{
            background: fondoEstado,
            color: colorEstado,
            padding: "6px 12px",
            borderRadius: "20px",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          {orden.estado}
        </span>
      </div>

      <h3
        style={{
          marginTop: "18px",
          marginBottom: "10px",
        }}
      >
        {orden.lugar}
      </h3>

      <table
        style={{
          width: "100%",
          borderSpacing: "0 10px",
        }}
      >
        <tbody>
          <tr>
            <td><strong>Supervisor</strong></td>
            <td>{orden.supervisor}</td>
          </tr>

          <tr>
            <td><strong>Fecha</strong></td>
            <td>{orden.fechaEjecucion
  ? orden.fechaEjecucion.toLocaleDateString()
  : "-"}</td>
          </tr>

          <tr>
            <td><strong>Tipo</strong></td>
            <td>{orden.tipoPedido}</td>
          </tr>

          <tr>
            <td><strong>Planificación</strong></td>
            <td>{orden.tiempoParaEjecutar}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}