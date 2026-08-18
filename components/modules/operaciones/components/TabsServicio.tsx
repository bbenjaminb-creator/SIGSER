"use client";

import { useState } from "react";
import { Orden } from "../types/Orden";

interface Props {
  orden: Orden;
}

export default function TabsServicio({ orden }: Props) {
  const [tab, setTab] = useState("general");

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <button onClick={() => setTab("general")}>
          Información General
        </button>

        <button onClick={() => setTab("observaciones")}>
          Observaciones
        </button>

        <button onClick={() => setTab("materiales")}>
          Materiales
        </button>
      </div>

      {tab === "general" && (
        <div style={{ lineHeight: 1.8 }}>
          <p><strong>Código:</strong> {orden.idPedido}</p>
          <p><strong>Supervisor:</strong> {orden.supervisor}</p>
          <p>
            <strong>Fecha:</strong>{" "}
            {orden.fechaEjecucion
              ? orden.fechaEjecucion.toLocaleDateString()
              : "-"}
          </p>
          <p><strong>Tipo:</strong> {orden.tipoPedido}</p>
          <p><strong>Estado:</strong> {orden.estado}</p>
          <p><strong>Planificación:</strong> {orden.tiempoParaEjecutar}</p>
          <p><strong>Correo:</strong> {orden.correo}</p>
        </div>
      )}

      {tab === "observaciones" && (
        <div style={{ lineHeight: 1.8 }}>
          <p><strong>Ubicación</strong></p>
          <p>{orden.ubicacion || "Sin ubicación registrada."}</p>

          <br />

          <p><strong>Personal asignado</strong></p>
          <p>{orden.personal || "Sin personal asignado."}</p>

          <br />

          <p><strong>Observaciones</strong></p>
          <p>{orden.observaciones || "Sin observaciones."}</p>
        </div>
      )}

      {tab === "materiales" && (
        <div style={{ lineHeight: 1.8 }}>
          {Object.keys(orden.materiales).length === 0 ? (
            <p>No hay materiales registrados.</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    Material
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    Cantidad
                  </th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(orden.materiales).map(
                  ([material, cantidad]) => (
                    <tr key={material}>
                      <td
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        {material}
                      </td>

                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        {cantidad}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
}