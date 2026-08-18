"use client";

import { Orden } from "../types/Orden";
import { useState } from "react";

type CategoriaDistribucion =
  | "hoy"
  | "manana"
  | "pasadoManana"
  | "tresOMas"
  | "atrasadas"
  | "pendientes"
  | "fueraHorario";

type DetalleDistribucionOrdenesProps = {
  abierto: boolean;
  categoria: CategoriaDistribucion | null;
  ordenes: Orden[];
  onCerrar: () => void;
  onVerOrden: (orden: Orden) => void;
};

export default function DetalleDistribucionOrdenes({
  abierto,
  categoria,
  ordenes,
  onCerrar,
  onVerOrden,
}: DetalleDistribucionOrdenesProps) {

      const [supervisorSeleccionado, setSupervisorSeleccionado] =
    useState<string | null>(null);

    const [tipoSeleccionado, setTipoSeleccionado] =
  useState<string | null>(null);
    
    if (!abierto || !categoria) {
    return null;
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  const pasadoManana = new Date(hoy);
  pasadoManana.setDate(pasadoManana.getDate() + 2);

  const normalizarFecha = (fecha: Date) => {
  const resultado = new Date(fecha);
  resultado.setHours(0, 0, 0, 0);
  return resultado;
};

const formatearFechaSolicitud = (
  fecha: Date | null | undefined
) => {
  if (!fecha) {
    return "Sin fecha de solicitud";
  }

  return new Intl.DateTimeFormat(
    "es-BO",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(fecha));
};

// ==================================================
// HORARIO OPERATIVO SERBEN
// ==================================================

const estaFueraHorarioOperativo = (fecha: Date) => {
  const dia = fecha.getDay();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();

  const horaEnMinutos =
    hora * 60 + minutos;

  // Domingo
  if (dia === 0) {
    return true;
  }

  // Sábado: después de las 12:00
  if (dia === 6) {
    return horaEnMinutos >= 12 * 60;
  }

  // Lunes a viernes: después de las 17:00
  return horaEnMinutos >= 17 * 60;
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

    const ordenesPendientes =
    ordenes.filter(esPendiente);

  const ordenesCategoria =
  categoria === "fueraHorario"
  ? ordenes.filter((orden) => {
      if (!orden.fechaSolicitud) {
        return false;
      }

      const fechaSolicitud = new Date(
        orden.fechaSolicitud
      );

      // Usamos la misma lógica que el indicador:
      // una solicitud fuera de horario pertenece
      // al siguiente día operativo.
      const fechaOperativa = new Date(
        fechaSolicitud
      );

      if (
        estaFueraHorarioOperativo(
          fechaSolicitud
        )
      ) {
        fechaOperativa.setDate(
          fechaOperativa.getDate() + 1
        );

        fechaOperativa.setHours(
          0,
          0,
          0,
          0
        );

        while (
          fechaOperativa.getDay() === 0
        ) {
          fechaOperativa.setDate(
            fechaOperativa.getDate() + 1
          );
        }
      } else {
        fechaOperativa.setHours(
          0,
          0,
          0,
          0
        );
      }

      return (
        fechaOperativa.getTime() ===
          hoy.getTime() &&
        estaFueraHorarioOperativo(
          fechaSolicitud
        )
      );
    })

      : ordenesPendientes.filter(
          (orden) => {
            // Para el acumulativo queremos
            // todas las pendientes.
            if (categoria === "pendientes") {
              return true;
            }

            if (!orden.fechaEjecucion) {
              return false;
            }

            const fecha = normalizarFecha(
              orden.fechaEjecucion
            );

            switch (categoria) {
              case "hoy":
                return (
                  fecha.getTime() ===
                  hoy.getTime()
                );

              case "manana":
                return (
                  fecha.getTime() ===
                  manana.getTime()
                );

              case "pasadoManana":
                return (
                  fecha.getTime() ===
                  pasadoManana.getTime()
                );

              case "tresOMas":
                return (
                  fecha.getTime() >
                  pasadoManana.getTime()
                );

              case "atrasadas":
                return (
                  fecha.getTime() <
                  hoy.getTime()
                );

              default:
                return false;
            }
          }
        );

  const titulo = obtenerTitulo(categoria);
// ==================================================
// DISTRIBUCIÓN DEL ACUMULATIVO PENDIENTE
// ==================================================

const distribucionPendientes = {
  atrasadas: 0,
  hoy: 0,
  manana: 0,
  pasadoManana: 0,
  tresOMas: 0,
  sinFecha: 0,
};

if (categoria === "pendientes") {
  ordenesCategoria.forEach((orden) => {
    if (!orden.fechaEjecucion) {
      distribucionPendientes.sinFecha++;
      return;
    }

    const fecha = normalizarFecha(
      orden.fechaEjecucion
    );

    if (fecha.getTime() < hoy.getTime()) {
      distribucionPendientes.atrasadas++;
    } else if (
      fecha.getTime() === hoy.getTime()
    ) {
      distribucionPendientes.hoy++;
    } else if (
      fecha.getTime() === manana.getTime()
    ) {
      distribucionPendientes.manana++;
    } else if (
      fecha.getTime() === pasadoManana.getTime()
    ) {
      distribucionPendientes.pasadoManana++;
    } else {
      distribucionPendientes.tresOMas++;
    }
  });
}

// ==================================================
// ANTICIPACIÓN / DÍAS DE ATRASO
// ==================================================

const anticipacion = {
  hoy: 0,
  ayer: 0,
  dosDias: 0,
  tresOMas: 0,
  sinFecha: 0,
};

const diasAtraso = {
  ayer: 0,
  dosDias: 0,
  tresOMas: 0,
};

if (categoria === "atrasadas") {
  ordenesCategoria.forEach((orden) => {
    if (!orden.fechaEjecucion) return;

    const ejecucion = normalizarFecha(
      orden.fechaEjecucion
    );

    const diferencia = Math.round(
      (hoy.getTime() - ejecucion.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diferencia === 1) {
      diasAtraso.ayer++;
    } else if (diferencia === 2) {
      diasAtraso.dosDias++;
    } else if (diferencia >= 3) {
      diasAtraso.tresOMas++;
    }
  });
} else {
  ordenesCategoria.forEach((orden) => {
    if (!orden.fechaSolicitud) {
      anticipacion.sinFecha++;
      return;
    }

    const solicitud = normalizarFecha(
      orden.fechaSolicitud
    );

    const ejecucion = orden.fechaEjecucion
      ? normalizarFecha(orden.fechaEjecucion)
      : null;

    if (!ejecucion) {
      anticipacion.sinFecha++;
      return;
    }

    const diferencia = Math.round(
      (ejecucion.getTime() -
        solicitud.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diferencia <= 0) {
      anticipacion.hoy++;
    } else if (diferencia === 1) {
      anticipacion.ayer++;
    } else if (diferencia === 2) {
      anticipacion.dosDias++;
    } else {
      anticipacion.tresOMas++;
    }
  });
}
  const total = ordenesCategoria.length;

  const porcentaje = (cantidad: number) => {
    if (total === 0) return 0;

    return Math.round(
      (cantidad / total) * 100
    );
  };

  // ==================================================
  // TIPO DE ORDEN
  // ==================================================

  const tipos = new Map<string, number>();

  ordenesCategoria.forEach((orden) => {
    const tipo =
      orden.tipoPedido?.trim() || "Sin tipo";

    tipos.set(
      tipo,
      (tipos.get(tipo) || 0) + 1
    );
  });

  const tiposOrdenados = Array.from(
    tipos.entries()
  ).sort((a, b) => b[1] - a[1]);

    // ==================================================
  // SUPERVISORES
  // ==================================================

  const supervisores = new Map<string, number>();

  ordenesCategoria.forEach((orden) => {
    const supervisor =
      orden.supervisor?.trim() || "Sin supervisor";

    supervisores.set(
      supervisor,
      (supervisores.get(supervisor) || 0) + 1
    );
  });

  const supervisoresOrdenados = Array.from(
    supervisores.entries()
  ).sort((a, b) => b[1] - a[1]);

    const ordenesSupervisorSeleccionado =
    supervisorSeleccionado
      ? ordenesCategoria.filter((orden) => {
          const supervisor =
            orden.supervisor?.trim() || "Sin supervisor";

          return supervisor === supervisorSeleccionado;
        })
      : [];

      const ordenesTipoSeleccionado =
  tipoSeleccionado
    ? ordenesCategoria.filter((orden) => {
        const tipo =
          orden.tipoPedido?.trim() || "Sin tipo";

        return tipo === tipoSeleccionado;
      })
    : [];

  return (
    <div className="mt-4 rounded-xl border bg-gray-50 p-5">

      {/* ENCABEZADO */}

      <div className="flex items-center justify-between mb-5">

        <div>
          <h3 className="text-lg font-semibold">
            {titulo}
          </h3>

          <p className="text-sm text-gray-500">
            {total} órdenes
          </p>
        </div>

        <button
          type="button"
          onClick={onCerrar}
          className="text-sm text-blue-600 hover:underline"
        >
          Cerrar ×
        </button>

      </div>

           {/* DISTRIBUCIÓN DEL ACUMULATIVO */}

      {categoria === "pendientes" && (
        <div className="mb-6">

          <h4 className="font-semibold mb-3">
            📊 Distribución de las órdenes pendientes
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

            <Indicador
              titulo="Atrasadas"
              cantidad={distribucionPendientes.atrasadas}
              porcentaje={porcentaje(
                distribucionPendientes.atrasadas
              )}
            />

            <Indicador
              titulo="Para hoy"
              cantidad={distribucionPendientes.hoy}
              porcentaje={porcentaje(
                distribucionPendientes.hoy
              )}
            />

            <Indicador
              titulo="Para mañana"
              cantidad={distribucionPendientes.manana}
              porcentaje={porcentaje(
                distribucionPendientes.manana
              )}
            />

            <Indicador
              titulo="Pasado mañana"
              cantidad={
                distribucionPendientes.pasadoManana
              }
              porcentaje={porcentaje(
                distribucionPendientes.pasadoManana
              )}
            />

            <Indicador
              titulo="3 días o más"
              cantidad={distribucionPendientes.tresOMas}
              porcentaje={porcentaje(
                distribucionPendientes.tresOMas
              )}
            />

            {distribucionPendientes.sinFecha > 0 && (
              <Indicador
                titulo="Sin fecha"
                cantidad={distribucionPendientes.sinFecha}
                porcentaje={porcentaje(
                  distribucionPendientes.sinFecha
                )}
              />
            )}

          </div>

        </div>
      )}

      {/* ANTICIPACIÓN / ATRASO */}

      <div className="mb-6">

  {categoria === "atrasadas" ? (
  <>
    <h4 className="font-semibold mb-3">
      ⏱️ Días de atraso
    </h4>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

      <Indicador
        titulo="Ayer"
        cantidad={diasAtraso.ayer}
        porcentaje={porcentaje(
          diasAtraso.ayer
        )}
      />

      <Indicador
        titulo="Hace 2 días"
        cantidad={diasAtraso.dosDias}
        porcentaje={porcentaje(
          diasAtraso.dosDias
        )}
      />

      <Indicador
        titulo="≥3 días"
        cantidad={diasAtraso.tresOMas}
        porcentaje={porcentaje(
          diasAtraso.tresOMas
        )}
      />

    </div>
  </>
) : categoria === "pendientes" ? null : (
  <>
    <h4 className="font-semibold mb-3">
      ⏱️ Anticipación de las órdenes
    </h4>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

      <Indicador
        titulo="Hoy"
        cantidad={anticipacion.hoy}
        porcentaje={porcentaje(
          anticipacion.hoy
        )}
      />

      <Indicador
        titulo="1 día"
        cantidad={anticipacion.ayer}
        porcentaje={porcentaje(
          anticipacion.ayer
        )}
      />

      <Indicador
        titulo="2 días"
        cantidad={anticipacion.dosDias}
        porcentaje={porcentaje(
          anticipacion.dosDias
        )}
      />

      <Indicador
        titulo="≥3 días"
        cantidad={anticipacion.tresOMas}
        porcentaje={porcentaje(
          anticipacion.tresOMas
        )}
      />

    </div>

    {anticipacion.sinFecha > 0 && (
      <div className="mt-3 text-xs text-gray-500">
        {anticipacion.sinFecha} órdenes sin
        fecha de solicitud.
      </div>
    )}
  </>
)}

</div>

{/* TIPO DE ORDEN */}

<div className="mb-6">

  <h4 className="font-semibold mb-3">
    📋 Tipo de orden
  </h4>

  {tiposOrdenados.length === 0 ? (
    <p className="text-sm text-gray-500">
      No hay tipos de orden para mostrar.
    </p>
  ) : (
    <div className="space-y-2">

      {tiposOrdenados.map(
        ([tipo, cantidad]) => (
          <div key={tipo}>

            <button
              type="button"
              onClick={() => {
                setTipoSeleccionado(
                  tipoSeleccionado === tipo
                    ? null
                    : tipo
                );

                setSupervisorSeleccionado(null);
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border bg-white px-4 py-3 text-left transition hover:bg-blue-50 hover:border-blue-400"
            >

              <span className="text-sm">
                {tipo}
              </span>

              <div className="text-right">

                <div className="font-semibold">
                  {cantidad}
                </div>

                <div className="text-xs text-gray-500">
                  {porcentaje(cantidad)}%
                </div>

              </div>

            </button>

            {tipoSeleccionado === tipo && (

              <div className="mt-2 mb-3 rounded-xl border bg-gray-50 p-4">

                <div className="flex items-center justify-between mb-3">

                  <div>
                    <h5 className="font-semibold">
                      📋 Órdenes de {tipo}
                    </h5>

                    <p className="text-sm text-gray-500">
                      {ordenesTipoSeleccionado.length} órdenes
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setTipoSeleccionado(null)
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Cerrar ×
                  </button>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">

                  {ordenesTipoSeleccionado.map(
                    (orden) => (

                      <button
                        key={orden.idPedido}
                        type="button"
                        onClick={() => onVerOrden(orden)}
                        className="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left hover:bg-gray-50"
                      >

                        <div>

                          <div className="font-medium">
                            {orden.idPedido}
                          </div>

                          <div className="text-sm text-gray-500">
                            {orden.lugar || "Sin lugar"}
                          </div>

                        </div>

                        <div className="text-right text-sm">

                          <div>
  {categoria === "fueraHorario"
    ? `Solicitud: ${formatearFechaSolicitud(
        orden.fechaSolicitud
      )}`
    : orden.fechaEjecucion
    ? new Intl.DateTimeFormat(
        "es-BO",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      ).format(
        new Date(
          orden.fechaEjecucion
        )
      )
    : "Sin fecha"}
</div>

                          <div className="text-xs text-gray-500">
                            {orden.estado}
                          </div>

                        </div>

                      </button>

                    )
                  )}

                </div>

              </div>

            )}

          </div>
        )
      )}

    </div>
  )}

</div>
      
           {/* SUPERVISORES */}

<div className="mt-6">

  <h4 className="font-semibold mb-3">
    👤 Supervisores
  </h4>

  {supervisoresOrdenados.length === 0 ? (
    <p className="text-sm text-gray-500">
      No hay supervisores para mostrar.
    </p>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
      {supervisoresOrdenados.map(
        ([supervisor, cantidad]) => (
          <div key={supervisor}>

            <button
              type="button"
              onClick={() => {
                setSupervisorSeleccionado(
                  supervisorSeleccionado === supervisor
                    ? null
                    : supervisor
                );

                setTipoSeleccionado(null);
              }}
              className="flex w-full cursor-pointer flex-col items-start justify-between rounded-xl border bg-white p-4 text-left transition hover:bg-blue-50 hover:border-blue-400"
              >

              <div className="w-full">

  <div className="text-sm font-medium">
    👤 {supervisor}
  </div>

  <div className="mt-3 flex items-end justify-between">

    <div>
      <div className="text-2xl font-bold">
        {cantidad}
      </div>

      <div className="text-xs text-gray-500">
        órdenes
      </div>
    </div>

    <div className="text-sm font-semibold text-gray-500">
      {porcentaje(cantidad)}%
    </div>

  </div>

</div>
            </button>

            {supervisorSeleccionado === supervisor && (

              <div className="mt-2 rounded-xl border bg-gray-50 p-4">

                <div className="flex items-center justify-between mb-3">

                  <div>
                    <h5 className="font-semibold">
                      📋 Órdenes de {supervisor}
                    </h5>

                    <p className="text-sm text-gray-500">
                      {ordenesSupervisorSeleccionado.length} órdenes
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSupervisorSeleccionado(null)
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Cerrar ×
                  </button>

                </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">

                  {ordenesSupervisorSeleccionado.map(
                    (orden) => (

                      <button
                        key={orden.idPedido}
                        type="button"
                        onClick={() => onVerOrden(orden)}
                        className="flex cursor-pointer flex-col rounded-lg border bg-white p-3 text-left transition hover:bg-blue-50 hover:border-blue-400"
                         >

                        <div>

                          <div className="font-medium">
                            {orden.idPedido}
                          </div>

                          <div className="text-sm text-gray-500">
                            {orden.lugar || "Sin lugar"}
                          </div>

                        </div>

                        <div className="text-right text-sm">

                          <div>
                            {orden.fechaEjecucion
                              ? new Intl.DateTimeFormat(
                                  "es-BO",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                ).format(
                                  new Date(
                                    orden.fechaEjecucion
                                  )
                                )
                              : "Sin fecha"}
                          </div>

                          <div className="text-xs text-gray-500">
                            {orden.estado}
                          </div>

                        </div>

                      </button>

                    )
                  )}

                </div>

              </div>

            )}

          </div>
        )
      )}

    </div>
  )}

</div>

            {supervisorSeleccionado && (
        <div className="mt-5 rounded-xl border bg-white p-4">

          <div className="flex items-center justify-between mb-4">

            <div>
              <h4 className="font-semibold">
                📋 Órdenes de {supervisorSeleccionado}
              </h4>

              <p className="text-sm text-gray-500">
                {ordenesSupervisorSeleccionado.length} órdenes
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSupervisorSeleccionado(null)}
              className="text-sm text-blue-600 hover:underline"
            >
              Cerrar ×
            </button>

          </div>

          <div className="space-y-2">

            {ordenesSupervisorSeleccionado.map((orden) => (

              <button
                key={orden.idPedido}
                type="button"
                onClick={() => onVerOrden(orden)}
                className="flex w-full cursor-pointer flex-col rounded-lg border bg-white p-2 text-left transition hover:bg-blue-50 hover:border-blue-400"
                 >

                <div>

                  <div className="font-medium">
                    {orden.idPedido}
                  </div>

                  <div className="text-sm text-gray-500">
                    {orden.lugar || "Sin lugar"}
                  </div>

                </div>

                <div className="text-right text-sm">

                  <div>
                    {orden.fechaEjecucion
                      ? new Intl.DateTimeFormat(
                          "es-BO",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        ).format(
                          new Date(orden.fechaEjecucion)
                        )
                      : "Sin fecha"}
                  </div>

                  <div className="text-xs text-gray-500">
                    {orden.estado}
                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>
      )}

    </div>
  );
}


// ==================================================
// INDICADOR
// ==================================================

function Indicador({
  titulo,
  cantidad,
  porcentaje,
}: {
  titulo: string;
  cantidad: number;
  porcentaje: number;
}) {
  return (
    <div className="rounded-lg border bg-white p-3">

      <div className="text-xs text-gray-500">
        {titulo}
      </div>

      <div className="text-xl font-bold mt-1">
        {cantidad}
      </div>

      <div className="text-xs text-gray-500">
        {porcentaje}%
      </div>

    </div>
  );
}


// ==================================================
// TÍTULO
// ==================================================

function obtenerTitulo(
  categoria: CategoriaDistribucion
) {
  switch (categoria) {
    case "hoy":
      return "🔴 Programadas para realizar hoy";

    case "manana":
      return "🟠 Programadas para realizar mañana";

    case "pasadoManana":
      return "🟡 Programadas para realizar pasado mañana";

    case "tresOMas":
      return "🟢 Programadas para realizar en 3 días o más";

    case "atrasadas":
      return "🔴 Órdenes pendientes atrasadas";

    case "pendientes":
      return "📊 Órdenes pendientes acumulativas";

    case "fueraHorario":
      return "⚠️ Órdenes solicitadas fuera del horario operativo";

    default:
      return "Detalle de distribución";
  }
}