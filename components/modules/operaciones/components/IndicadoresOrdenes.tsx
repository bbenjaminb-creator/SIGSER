"use client";

import { useState } from "react";
import { Orden } from "../types/Orden";
import DetalleDistribucionOrdenes from "./DetalleDistribucionOrdenes";

type CategoriaDistribucion =
  | "hoy"
  | "manana"
  | "pasadoManana"
  | "tresOMas"
  | "atrasadas"
  | "pendientes"
  | "fueraHorario";

type IndicadoresOrdenesProps = {
  ordenes: Orden[];
  onVerOrden: (orden: Orden) => void;
};

export default function IndicadoresOrdenes({
  ordenes,
  onVerOrden,
}: IndicadoresOrdenesProps) {
  const [detalleAbierto, setDetalleAbierto] =
    useState<CategoriaDistribucion | null>(null);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  const pasadoManana = new Date(hoy);
  pasadoManana.setDate(pasadoManana.getDate() + 2);

  // ==================================================
  // FUNCIONES AUXILIARES
  // ==================================================

  const normalizarFecha = (fecha: Date) => {
    const resultado = new Date(fecha);
    resultado.setHours(0, 0, 0, 0);
    return resultado;
  };

  // ==================================================
  // HORARIO OPERATIVO SERBEN
  // Lunes a viernes: hasta las 17:00
  // Sábado: hasta las 12:00
  // Domingo: no operativo
  // ==================================================

  const estaFueraHorarioOperativo = (fecha: Date) => {
    const dia = fecha.getDay();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();

    const horaEnMinutos = hora * 60 + minutos;

    // Domingo
    if (dia === 0) {
      return true;
    }

    // Sábado: horario hasta las 12:00
    if (dia === 6) {
      return horaEnMinutos >= 12 * 60;
    }

    // Lunes a viernes: horario hasta las 17:00
    return horaEnMinutos >= 17 * 60;
  };

  const obtenerFechaOperativa = (fecha: Date) => {
    const resultado = new Date(fecha);

    // Si fue solicitada dentro del horario operativo,
    // mantiene su misma fecha.
    if (!estaFueraHorarioOperativo(resultado)) {
      return normalizarFecha(resultado);
    }

    // Si fue solicitada fuera del horario,
    // buscamos el próximo día operativo.
    resultado.setDate(resultado.getDate() + 1);
    resultado.setHours(0, 0, 0, 0);

    while (resultado.getDay() === 0) {
      resultado.setDate(resultado.getDate() + 1);
    }

    return resultado;
  };

  const esPendiente = (orden: Orden) => {
    const estado = orden.estado?.toUpperCase() || "";
    const planificacion =
      orden.tiempoParaEjecutar?.toUpperCase() || "";

    return (
      planificacion !== "LISTO" &&
      estado !== "EJECUTADO" &&
      estado !== "RECHAZADO"
    );
  };

  // ==================================================
  // ACUMULATIVO PENDIENTE
  // ==================================================

  const ordenesPendientes = ordenes.filter(esPendiente);

  const acumulativoPendiente =
    ordenesPendientes.length;

  // ==================================================
  // DISTRIBUCIÓN DEL ACUMULATIVO
  // ==================================================

  const atrasadas = ordenesPendientes.filter((orden) => {
    if (!orden.fechaEjecucion) return false;

    return (
      normalizarFecha(orden.fechaEjecucion).getTime() <
      hoy.getTime()
    );
  });

  const paraHoy = ordenesPendientes.filter((orden) => {
    if (!orden.fechaEjecucion) return false;

    return (
      normalizarFecha(orden.fechaEjecucion).getTime() ===
      hoy.getTime()
    );
  });

  const paraManana = ordenesPendientes.filter((orden) => {
    if (!orden.fechaEjecucion) return false;

    return (
      normalizarFecha(orden.fechaEjecucion).getTime() ===
      manana.getTime()
    );
  });

  const paraPasadoManana = ordenesPendientes.filter((orden) => {
    if (!orden.fechaEjecucion) return false;

    return (
      normalizarFecha(orden.fechaEjecucion).getTime() ===
      pasadoManana.getTime()
    );
  });

  const paraTresOMasDias = ordenesPendientes.filter((orden) => {
    if (!orden.fechaEjecucion) return false;

    return (
      normalizarFecha(orden.fechaEjecucion).getTime() >
      pasadoManana.getTime()
    );
  });

  // ==================================================
  // ÓRDENES SOLICITADAS EN EL DÍA OPERATIVO
  // ==================================================

  const solicitadasHoy = ordenes.filter((orden) => {
    if (!orden.fechaSolicitud) return false;

    return (
      obtenerFechaOperativa(
        orden.fechaSolicitud
      ).getTime() === hoy.getTime()
    );
  });

  const solicitadasFueraHorario = solicitadasHoy.filter(
    (orden) => {
      if (!orden.fechaSolicitud) return false;

      return estaFueraHorarioOperativo(
        orden.fechaSolicitud
      );
    }
  );

  // Clasificamos una orden según la fecha operativa
  // de la solicitud y la fecha de ejecución.
  const clasificarSolicitud = (orden: Orden) => {
    if (
      !orden.fechaSolicitud ||
      !orden.fechaEjecucion
    ) {
      return null;
    }

    const fechaSolicitudOperativa =
      obtenerFechaOperativa(
        orden.fechaSolicitud
      );

    const fechaEjecucion =
      normalizarFecha(
        orden.fechaEjecucion
      );

    const diferenciaDias = Math.round(
      (
        fechaEjecucion.getTime() -
        fechaSolicitudOperativa.getTime()
      ) /
        (1000 * 60 * 60 * 24)
    );

    if (diferenciaDias <= 0) {
      return "hoy";
    }

    if (diferenciaDias === 1) {
      return "manana";
    }

    if (diferenciaDias === 2) {
      return "pasadoManana";
    }

    return "tresOMas";
  };

  const solicitadasHoyParaHoy =
    solicitadasHoy.filter(
      (orden) =>
        clasificarSolicitud(orden) === "hoy"
    );

  const solicitadasHoyParaManana =
    solicitadasHoy.filter(
      (orden) =>
        clasificarSolicitud(orden) === "manana"
    );

  const solicitadasHoyParaPasadoManana =
    solicitadasHoy.filter(
      (orden) =>
        clasificarSolicitud(orden) === "pasadoManana"
    );

  const solicitadasHoyParaTresOMas =
    solicitadasHoy.filter(
      (orden) =>
        clasificarSolicitud(orden) === "tresOMas"
    );

  // ==================================================
  // PORCENTAJES
  // ==================================================

  const porcentajePendiente = (cantidad: number) => {
    if (acumulativoPendiente === 0) return 0;

    return Math.round(
      (cantidad / acumulativoPendiente) * 100
    );
  };

  const totalSolicitadasHoy =
    solicitadasHoy.length;

  const porcentajeSolicitadasHoy = (
    cantidad: number
  ) => {
    if (totalSolicitadasHoy === 0) return 0;

    return Math.round(
      (cantidad / totalSolicitadasHoy) * 100
    );
  };

  // ==================================================
  // FECHA
  // ==================================================

  const fechaTexto = new Intl.DateTimeFormat("es-BO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(hoy);

// ==================================================
// SEMÁFORO DISTRIBUCIÓN DE ÓRDENES
// Evalúa la concentración de órdenes pendientes
// desde HOY hacia adelante.
// Las órdenes atrasadas tienen su propio indicador.
// ==================================================

// ==================================================
// SEMÁFORO DISTRIBUCIÓN DE ÓRDENES
// ==================================================

let colorSemaforo = "🟢";

// ROJO:
// Existen órdenes atrasadas o hay una concentración
// crítica de órdenes pendientes para HOY.
if (
  atrasadas.length > 0 ||
  porcentajePendiente(paraHoy.length) > 15
) {
  colorSemaforo = "🔴";

// NARANJA:
// Alta concentración de órdenes pendientes para MAÑANA.
} else if (
  porcentajePendiente(paraManana.length) > 20
) {
  colorSemaforo = "🟠";

// AMARILLO:
// Alta concentración de órdenes pendientes para PASADO MAÑANA.
} else if (
  porcentajePendiente(paraPasadoManana.length) > 20
) {
  colorSemaforo = "🟡";
}

  return (
    <div className="mb-6">

    {/* ENCABEZADO */}
<div className="mb-3">

  <div className="flex items-center gap-2">
    <h2 className="text-xl font-semibold">
      📊 Distribución de órdenes
    </h2>

    <span className="text-lg">
      {colorSemaforo}
    </span>
  </div>

  <p className="text-sm text-gray-500 mt-1 capitalize">
    {fechaTexto}
  </p>

</div>

      {/* TARJETAS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

        {/* HOY */}
        <Tarjeta
          titulo="🔴 Hoy"
          pendiente={paraHoy.length}
          porcentajePendiente={porcentajePendiente(
            paraHoy.length
          )}
          solicitadasHoy={
            solicitadasHoyParaHoy.length
          }
          porcentajeSolicitadas={
            porcentajeSolicitadasHoy(
              solicitadasHoyParaHoy.length
            )
          }
          textoPendiente="programadas para realizar hoy"
          textoSolicitada="solicitadas hoy para realizar hoy"
          activa={detalleAbierto === "hoy"}
          onClick={() => setDetalleAbierto("hoy")}
        />

        {/* MAÑANA */}
        <Tarjeta
          titulo="🟠 Mañana"
          pendiente={paraManana.length}
          porcentajePendiente={porcentajePendiente(
            paraManana.length
          )}
          solicitadasHoy={
            solicitadasHoyParaManana.length
          }
          porcentajeSolicitadas={
            porcentajeSolicitadasHoy(
              solicitadasHoyParaManana.length
            )
          }
          textoPendiente="programadas para realizar mañana"
          textoSolicitada="solicitadas hoy para realizar mañana"
          activa={detalleAbierto === "manana"}
          onClick={() => setDetalleAbierto("manana")}
        />

        {/* PASADO MAÑANA */}
        <Tarjeta
          titulo="🟡 Pasado mañana"
          pendiente={paraPasadoManana.length}
          porcentajePendiente={porcentajePendiente(
            paraPasadoManana.length
          )}
          solicitadasHoy={
            solicitadasHoyParaPasadoManana.length
          }
          porcentajeSolicitadas={
            porcentajeSolicitadasHoy(
              solicitadasHoyParaPasadoManana.length
            )
          }
          textoPendiente="programadas para realizar pasado mañana"
          textoSolicitada="solicitadas hoy para realizar pasado mañana"
          activa={
            detalleAbierto === "pasadoManana"
          }
          onClick={() =>
            setDetalleAbierto("pasadoManana")
          }
        />

        {/* 3 DÍAS O MÁS */}
        <Tarjeta
          titulo="🟢 3 días o más"
          pendiente={paraTresOMasDias.length}
          porcentajePendiente={porcentajePendiente(
            paraTresOMasDias.length
          )}
          solicitadasHoy={
            solicitadasHoyParaTresOMas.length
          }
          porcentajeSolicitadas={
            porcentajeSolicitadasHoy(
              solicitadasHoyParaTresOMas.length
            )
          }
          textoPendiente="programadas para realizar en 3 días o más"
          textoSolicitada="solicitadas hoy para realizar en 3 días o más"
          activa={
            detalleAbierto === "tresOMas"
          }
          onClick={() =>
            setDetalleAbierto("tresOMas")
          }
        />

        {/* ATRASADAS */}
        <TarjetaAtrasadas
          cantidad={atrasadas.length}
          porcentaje={porcentajePendiente(
            atrasadas.length
          )}
          activa={
            detalleAbierto === "atrasadas"
          }
          onClick={() =>
            setDetalleAbierto("atrasadas")
          }
        />

      </div>

      {/* RESUMEN */}
<div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">

  <button
    type="button"
    onClick={() => {
      console.log("CLICK EN PENDIENTES");
      setDetalleAbierto("pendientes");
    }}
    className="hover:text-blue-600 hover:underline"
  >
    <strong>{acumulativoPendiente}</strong>{" "}
    pendientes acumulativas →
  </button>

  <span>·</span>

  <span>
    <strong>{totalSolicitadasHoy}</strong>{" "}
    órdenes solicitadas hoy
  </span>

  {solicitadasFueraHorario.length > 0 && (
    <>
      <span>·</span>

      <button
  type="button"
  onClick={() => setDetalleAbierto("fueraHorario")}
  className="text-orange-600 hover:underline"
>
  ⚠️{" "}
  <strong>
    {solicitadasFueraHorario.length}
  </strong>{" "}
  solicitadas fuera del horario operativo →
</button>
    </>
  )}

</div>

      {/* ==================================================
          NIVEL 2
          ================================================== */}

      {detalleAbierto && (
  <DetalleDistribucionOrdenes
    abierto={true}
    categoria={detalleAbierto}
    ordenes={ordenes}
    onCerrar={() => setDetalleAbierto(null)}
    onVerOrden={onVerOrden}
  />
)}
    </div>
  );
}


// ==================================================
// TARJETA DE DISTRIBUCIÓN
// ==================================================

function Tarjeta({
  titulo,
  pendiente,
  porcentajePendiente,
  solicitadasHoy,
  porcentajeSolicitadas,
  textoPendiente,
  textoSolicitada,
  activa,
  onClick,
}: {
  titulo: string;
  pendiente: number;
  porcentajePendiente: number;
  solicitadasHoy: number;
  porcentajeSolicitadas: number;
  textoPendiente: string;
  textoSolicitada: string;
  activa: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border p-4 shadow-sm transition-all ${
        activa
          ? "border-blue-400 ring-2 ring-blue-100"
          : "hover:border-blue-300 hover:shadow-md"
      }`}
    >

      <div className="text-sm text-gray-600">
        {titulo}
      </div>

      {/* PENDIENTES */}
      <div className="mt-1 text-xl font-bold">
        {pendiente}
      </div>

      <div className="text-xs text-gray-500">
        {textoPendiente}
      </div>

      <div className="text-xs text-gray-400">
        {porcentajePendiente}% de las programadas pendientes
      </div>

      {/* SOLICITADAS HOY */}
      <div className="mt-2 text-lg font-semibold">
        {solicitadasHoy}
      </div>

      <div className="text-xs text-gray-500">
        {textoSolicitada}
      </div>

      <div className="text-xs text-gray-400">
        {porcentajeSolicitadas}% de las órdenes solicitadas hoy
      </div>

      <div className="mt-3 text-xs text-blue-600 font-medium">
        Ver detalle →
      </div>

    </button>
  );
}


// ==================================================
// TARJETA ATRASADAS
// ==================================================

function TarjetaAtrasadas({
  cantidad,
  porcentaje,
  activa,
  onClick,
}: {
  cantidad: number;
  porcentaje: number;
  activa: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border border-red-300 bg-red-50 p-4 shadow-sm transition-all ${
        activa
          ? "ring-2 ring-red-200"
          : "hover:border-red-400 hover:shadow-md"
      }`}
    >

      <div className="text-sm text-gray-700">
        🔴 Atrasadas
      </div>

      <div className="mt-1 text-xl font-bold">
        {cantidad}
      </div>

      <div className="text-xs text-gray-600">
        órdenes pendientes atrasadas
      </div>

      <div className="text-xs text-gray-500">
        {porcentaje}% de las programadas pendientes
      </div>

      <div className="mt-3 text-xs text-red-600 font-medium">
        Ver detalle →
      </div>

    </button>
  );
}