"use client";

import { useEffect, useMemo, useState } from "react";
import { Orden } from "../types/Orden";

type HistoricoPlanificacionProps = {
  ordenes: Orden[];
};

type Categoria = {
  cantidad: number;
  porcentaje: number;
};

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function HistoricoPlanificacion({
  ordenes,
}: HistoricoPlanificacionProps) {
  const [montado, setMontado] = useState(false);

  const [mostrarHistorico, setMostrarHistorico] =
    useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  const hoy = new Date();

  const anioActual = hoy.getFullYear();
  const indiceMesActual = hoy.getMonth();

  const datosMensuales = useMemo(() => {
    return MESES.map((nombreMes, indiceMes) => {
      const ordenesDelMes = ordenes.filter((orden) => {
        if (!orden.fechaSolicitud) return false;

        return (
          orden.fechaSolicitud.getFullYear() ===
            anioActual &&
          orden.fechaSolicitud.getMonth() === indiceMes
        );
      });

      const normalizarFecha = (fecha: Date) => {
        const resultado = new Date(fecha);
        resultado.setHours(0, 0, 0, 0);
        return resultado;
      };

      const clasificar = (
        orden: Orden
      ):
        | "hoy"
        | "manana"
        | "pasadoManana"
        | "tresOMas"
        | null => {
        if (
          !orden.fechaSolicitud ||
          !orden.fechaEjecucion
        ) {
          return null;
        }

        const solicitud = normalizarFecha(
          orden.fechaSolicitud
        );

        const ejecucion = normalizarFecha(
          orden.fechaEjecucion
        );

        const diferencia = Math.round(
          (ejecucion.getTime() -
            solicitud.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        if (diferencia <= 0) return "hoy";
        if (diferencia === 1) return "manana";
        if (diferencia === 2) return "pasadoManana";

        return "tresOMas";
      };

            // Solo consideramos órdenes que tengan
      // fecha de solicitud y fecha de ejecución
      const ordenesPlanificadas = ordenesDelMes.filter(
        (orden) =>
          orden.fechaSolicitud &&
          orden.fechaEjecucion
      );

      const hoyCantidad = ordenesPlanificadas.filter(
        (orden) => clasificar(orden) === "hoy"
      ).length;

      const mananaCantidad = ordenesPlanificadas.filter(
        (orden) => clasificar(orden) === "manana"
      ).length;

      const pasadoMananaCantidad =
        ordenesPlanificadas.filter(
          (orden) =>
            clasificar(orden) === "pasadoManana"
        ).length;

      const tresOMasCantidad =
        ordenesPlanificadas.filter(
          (orden) =>
            clasificar(orden) === "tresOMas"
        ).length;

const total = ordenesPlanificadas.length;

      const porcentaje = (cantidad: number) => {
        if (total === 0) return 0;

        return Math.round(
          (cantidad / total) * 100
        );
      };

      const crearCategoria = (
        cantidad: number
      ): Categoria => ({
        cantidad,
        porcentaje: porcentaje(cantidad),
      });

      return {
        mes: nombreMes,
        indiceMes,
        total,
        hoy: crearCategoria(hoyCantidad),
        manana: crearCategoria(mananaCantidad),
        pasadoManana: crearCategoria(
          pasadoMananaCantidad
        ),
        tresOMas: crearCategoria(
          tresOMasCantidad
        ),
      };
    });
  }, [ordenes, anioActual]);

  const datosMesActual =
  datosMensuales[indiceMesActual];

 const mesesAMostrar = mostrarHistorico
  ? datosMensuales
  : [datosMesActual];

  if (!montado) {
  return null;
}
 
  // ==================================================
  // SEMÁFORO DE PLANIFICACIÓN
  // ==================================================

  let colorSemaforo = "🟢";
  let tituloSemaforo = "Planificación adecuada";
  let descripcionSemaforo =
    "La planificación de las órdenes se encuentra dentro de los parámetros establecidos.";

  // 1. Primero evaluamos las órdenes solicitadas para HOY
  if (datosMesActual.hoy.porcentaje > 15) {
    colorSemaforo = "🔴";
    tituloSemaforo = "Planificación crítica";
    descripcionSemaforo =
      `${datosMesActual.hoy.porcentaje}% (${datosMesActual.hoy.cantidad} órdenes) de las órdenes solicitadas este mes fueron programadas para ejecutarse el mismo día. El objetivo máximo es 15%.`;

  // 2. Si HOY está dentro del objetivo, evaluamos MAÑANA
  } else if (datosMesActual.manana.porcentaje > 20) {
    colorSemaforo = "🟠";
    tituloSemaforo = "Planificación en alerta";
    descripcionSemaforo =
      `${datosMesActual.manana.porcentaje}% (${datosMesActual.manana.cantidad} órdenes) fueron programadas para el día siguiente. Se requiere mejorar la anticipación de la planificación.`;

  // 3. Luego evaluamos PASADO MAÑANA
  } else if (
    datosMesActual.pasadoManana.porcentaje > 20
  ) {
    colorSemaforo = "🟡";
    tituloSemaforo = "Planificación preventiva";
    descripcionSemaforo =
      `${datosMesActual.pasadoManana.porcentaje}% (${datosMesActual.pasadoManana.cantidad} órdenes) fueron programadas con dos días de anticipación.`;
  }

  return (
        <div className="mt-8">

      {/* ENCABEZADO */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
  <h2 className="text-xl font-semibold">
    📈 Planificación
  </h2>

  <span className="text-lg">
    {colorSemaforo}
  </span>
</div>

<button
  type="button"
  onClick={() =>
    setMostrarHistorico(!mostrarHistorico)
  }
  className="text-sm text-blue-600 hover:underline"
>
  {mostrarHistorico
    ? "Ver solo mes actual"
    : "Ver histórico"}
</button>
      </div>

      {/* INDICADOR */}
<div className="mb-4 flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2">

  <span className="text-base">
    {colorSemaforo}
  </span>

  <div className="flex items-center gap-2 text-sm">
    <span className="font-semibold">
      {tituloSemaforo}
    </span>

    <span className="text-gray-500">
      —
    </span>

    <span className="text-gray-600">
      {descripcionSemaforo}
    </span>
  </div>

</div>

      {/* ENCABEZADO */}

      {/* TABLA */}
      <div className="overflow-x-auto rounded-xl border">

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b bg-gray-50">

              <th className="text-left px-4 py-3">
                Mes
              </th>

              <th className="text-center px-4 py-3">
                🔴 Hoy
              </th>

              <th className="text-center px-4 py-3">
                🟠 Mañana
              </th>

              <th className="text-center px-4 py-3">
                🟡 Pasado mañana
              </th>

              <th className="text-center px-4 py-3">
                🟢 ≥3 días
              </th>

              <th className="text-center px-4 py-3">
                Total
              </th>

            </tr>
          </thead>

          <tbody>

            {mesesAMostrar.map((dato) => (

              <tr
                key={dato.mes}
                className="border-b last:border-b-0"
              >

                <td className="px-4 py-3 font-medium">
                  {dato.mes}
                </td>

                <Celda categoria={dato.hoy} />

                <Celda categoria={dato.manana} />

                <Celda
                  categoria={dato.pasadoManana}
                />

                <Celda
                  categoria={dato.tresOMas}
                />

                <td className="px-4 py-3 text-center font-semibold">
                  {dato.total}
                </td>

              </tr>

            ))}

                   </tbody>

        </table>

      </div>

    </div>
  );
}

function Celda({
  categoria,
}: {
  categoria: Categoria;
}) {
  return (
    <td className="px-4 py-3 text-center">

      <div className="font-semibold">
        {categoria.porcentaje}%
      </div>

      <div className="text-xs text-gray-500">
        ({categoria.cantidad})
      </div>

    </td>
  );
}