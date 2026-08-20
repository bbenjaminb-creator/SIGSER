"use client";

import { useEffect, useState } from "react";
import VolverAtras from "../../src/components/VolverAtras";

import {
  SiemensService,
  SiemensActividad,
} from "@/lib/SiemensService";

export default function SiemensPage() {

  const [actividades, setActividades] =
    useState<SiemensActividad[]>([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState("");

  const [anioSeleccionado, setAnioSeleccionado] =
    useState<string>("");

  const [mostrarRealizados, setMostrarRealizados] =
    useState(false);

  const [mesSeleccionado, setMesSeleccionado] =
    useState<string | null>(null);

    const [mesDesplegado, setMesDesplegado] =
  useState<string | null>(null);

  useEffect(() => {

    const cargarSiemens = async () => {

      try {

        setCargando(true);

        const service = new SiemensService();

        const datos =
          await service.obtenerActividades();

        setActividades(datos);

        const anios = Array.from(
          new Set(
            datos
              .map((actividad) => {
                const match =
                  actividad.mes.match(/\d{4}/);

                return match ? match[0] : "";
              })
              .filter((anio) => anio !== "")
          )
        ).sort((a, b) => Number(b) - Number(a));

        if (anios.length > 0) {
          setAnioSeleccionado(anios[0]);
        }

      } catch (error) {

        console.error(error);

        setError(
          "No se pudo cargar la información de SIEMENS."
        );

      } finally {

        setCargando(false);

      }

    };

    cargarSiemens();

  }, []);

  if (cargando) {

    return (
      <div className="p-8">
        <VolverAtras />

        Cargando información de SIEMENS...
      </div>
    );

  }

  if (error) {

    return (
      <div className="p-8 text-red-600">
        <VolverAtras />

        {error}
      </div>
    );

  }

  const anios = Array.from(
    new Set(
      actividades
        .map((actividad) => {
          const match =
            actividad.mes.match(/\d{4}/);

          return match ? match[0] : "";
        })
        .filter((anio) => anio !== "")
    )
  ).sort((a, b) => Number(b) - Number(a));

  const actividadesDelAnio =
    actividades.filter((actividad) =>
      actividad.mes.includes(anioSeleccionado)
    );

  const meses = Array.from(
    new Set(
      actividadesDelAnio.map(
        (actividad) => actividad.mes
      )
    )
  );

  const informesPendientes = meses.filter((mes) => {

    const actividadesMes =
      actividadesDelAnio.filter(
        (actividad) =>
          actividad.mes === mes
      );

    return actividadesMes.some(
      (actividad) =>
        !actividad.informe ||
        actividad.informe.trim() === ""
    );

  });

  const informesRealizados = meses.filter((mes) => {

    const actividadesMes =
      actividadesDelAnio.filter(
        (actividad) =>
          actividad.mes === mes
      );

    return (
      actividadesMes.length > 0 &&
      actividadesMes.every(
        (actividad) =>
          actividad.informe &&
          actividad.informe.trim() !== ""
      )
    );

  });

const actividadesMesSeleccionado =
  actividadesDelAnio.filter(
    (actividad) =>
      actividad.mes === mesSeleccionado
  );

const nombresMeses: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function obtenerFecha(actividad: SiemensActividad) {

  if (!actividad.fecha) {
    return null;
  }

  const partes = actividad.fecha.split("/");

  if (partes.length !== 3) {
    return null;
  }

  const dia = Number(partes[0]);
  const mes = Number(partes[1]) - 1;

  let anio = Number(partes[2]);

  if (anio < 100) {
    anio += 2000;
  }

  return new Date(anio, mes, dia);
}

const mesAunNoFinalizado = (() => {

  if (!mesSeleccionado) {
    return false;
  }

  const partes = mesSeleccionado
    .toLowerCase()
    .split("-");

  const nombreMes = partes[0];
  const anio = Number(partes[1]);

  const numeroMes = nombresMeses[nombreMes];

  if (
    numeroMes === undefined ||
    !anio
  ) {
    return false;
  }

  const hoy = new Date();

  return (
    anio > hoy.getFullYear() ||
    (
      anio === hoy.getFullYear() &&
      numeroMes >= hoy.getMonth()
    )
  );

})();

function obtenerUltimaAsistencia(
  servicio: string
) {

  const actividadesServicio =
    actividadesMesSeleccionado
      .filter(
        (actividad) =>
          actividad.servicio
            ?.toUpperCase()
            .includes(servicio)
      )
      .map((actividad) => ({
        actividad,
        fecha: obtenerFecha(actividad),
      }))
      .filter(
        (item) =>
          item.fecha !== null
      )
      .sort(
        (a, b) =>
          b.fecha!.getTime() -
          a.fecha!.getTime()
      );

  return actividadesServicio[0]?.actividad || null;
}

const ultimaLimpieza =
  obtenerUltimaAsistencia("LIMPIEZA");

const ultimaJardineria =
  obtenerUltimaAsistencia("JARDINER");

  return (

    <div className="p-8">

{mesSeleccionado && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

      <h2 className="text-xl font-semibold mb-3">
        Confirmación del informe
      </h2>

      <p className="text-gray-600">
        Se encontraron{" "}

        <span className="font-semibold text-gray-900">
          {actividadesMesSeleccionado.length} actividades
        </span>

        {" "}para el informe de{" "}

        <span className="font-semibold text-gray-900">
          {mesSeleccionado}
        </span>
        .
      </p>

     {mesAunNoFinalizado && (

  <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3">

    <p className="text-sm font-medium text-orange-700">
      ⚠️ El mes de {mesSeleccionado} aún no ha finalizado.
    </p>

    <p className="text-sm text-orange-600 mt-1">
      Verifica que todas las actividades estén correctamente
      registradas antes de generar el informe.
    </p>

  </div>

)}

<div className="mt-5 border rounded-lg overflow-hidden">

  <div className="px-4 py-2 border-b bg-gray-50">

    <p className="text-sm font-semibold">
      Última asistencia registrada
    </p>

  </div>

  <div className="px-4 py-3 border-b">

    <p className="text-sm font-medium">
      LIMPIEZA
    </p>

    {ultimaLimpieza ? (

      <p className="text-sm text-gray-600 mt-1">

        {ultimaLimpieza.fecha}

        {" — "}

        {ultimaLimpieza.personal || "Sin personal registrado"}

      </p>

    ) : (

      <p className="text-sm text-gray-500 mt-1">
        No se encontraron asistencias registradas.
      </p>

    )}

  </div>

  <div className="px-4 py-3">

    <p className="text-sm font-medium">
      JARDINERÍA
    </p>

    {ultimaJardineria ? (

      <p className="text-sm text-gray-600 mt-1">

        {ultimaJardineria.fecha}

        {" — "}

        {ultimaJardineria.personal || "Sin personal registrado"}

      </p>

    ) : (

      <p className="text-sm text-gray-500 mt-1">
        No se encontraron asistencias registradas.
      </p>

    )}

  </div>

</div>

<p className="mt-5 text-gray-700">

  ¿Confirmas las{" "}

  <span className="font-semibold">
    {actividadesMesSeleccionado.length} actividades
  </span>

  ?

</p>

      <div className="flex justify-end gap-3 mt-6">

        <button
          type="button"
          onClick={() =>
            setMesSeleccionado(null)
          }
          className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={() => {

            console.log(
              "Confirmado:",
              mesSeleccionado,
              actividadesMesSeleccionado
            );

          }}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
        >
          Sí, confirmar
        </button>

      </div>

    </div>

  </div>
)}

      <VolverAtras />

      <h1 className="text-3xl font-bold mb-2">
        SIEMENS
      </h1>

      <p className="text-gray-600 mb-6">
        Control de actividades e informes mensuales
      </p>

      <div className="flex gap-3 mb-6">

        {anios.map((anio) => (

          <button
            key={anio}
            type="button"
            onClick={() =>
              setAnioSeleccionado(anio)
            }
            className={`px-4 py-1.5 rounded-lg border text-sm transition ${
              anioSeleccionado === anio
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {anio}
          </button>

        ))}

      </div>

      {/* INFORMES PENDIENTES */}

      <div className="border rounded-lg overflow-hidden mb-4">

        <div className="flex items-center justify-between px-5 py-3 border-b">

          <h2 className="font-semibold">
            Informes pendientes
          </h2>

          <span className="text-sm text-gray-500">
            {informesPendientes.length}
          </span>

        </div>

        {informesPendientes.length === 0 ? (

          <div className="px-5 py-3 text-sm text-gray-500">
            No hay informes pendientes.
          </div>

        ) : (

          informesPendientes.map((mes) => {

            const actividadesMes =
              actividadesDelAnio.filter(
                (actividad) =>
                  actividad.mes === mes
              );

            const pendientes =
              actividadesMes.filter(
                (actividad) =>
                  !actividad.informe ||
                  actividad.informe.trim() === ""
              ).length;

            return (

  <div
    key={mes}
    className="border-b last:border-b-0"
  >

    <button
      type="button"
      onClick={() =>
        setMesDesplegado(
          mesDesplegado === mes
            ? null
            : mes
        )
      }
      className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-gray-50 transition"
    >

      <div>

        <span className="font-medium">
          {mes}
        </span>

        <span className="ml-3 text-sm text-gray-500">
          {pendientes} pendientes
        </span>

      </div>

      <span className="text-orange-600 text-sm">
        {mesDesplegado === mes
          ? "▲"
          : "Revisar →"}
      </span>

    </button>

    {mesDesplegado === mes && (

  <div className="bg-gray-50 border-t px-5 py-2">

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6">

  {actividadesMes.map(
    (actividad, index) => (

      <div
        key={index}
        className="flex items-center gap-2 py-1 text-xs border-b"
      >

        <span className="w-14 shrink-0 text-gray-500">
          {actividad.fecha}
        </span>

       <span className="font-medium">
  {actividad.personal ||
    "Sin personal"}
</span>

<span className="text-gray-500">
  {actividad.servicio}
</span>

      </div>

    )
  )}

</div>

    <div className="flex justify-end mt-2">

      <button
        type="button"
        onClick={() =>
          setMesSeleccionado(mes)
        }
        className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs hover:bg-slate-700 transition"
      >
        Revisar informe
      </button>

    </div>

  </div>

)}

  </div>

);

          })

        )}

      </div>

      {/* INFORMES REALIZADOS */}

      <div className="border rounded-lg overflow-hidden">

        <button
          type="button"
          onClick={() =>
            setMostrarRealizados(
              !mostrarRealizados
            )
          }
          className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-gray-50 transition"
        >

          <div className="flex items-center gap-3">

            <span className="font-semibold">
              Informes realizados
            </span>

            <span className="text-sm text-gray-500">
              {informesRealizados.length}
            </span>

          </div>

          <span className="text-gray-500">
            {mostrarRealizados ? "▲" : "▼"}
          </span>

        </button>

        {mostrarRealizados && (

          <div className="border-t">

            {informesRealizados.map((mes) => (

              <button
                key={mes}
                type="button"
                className="w-full flex items-center justify-between px-5 py-3 border-b last:border-b-0 text-left hover:bg-gray-50 transition"
              >

                <span className="font-medium">
                  {mes}
                </span>

                <span className="text-blue-600 text-sm">
                  Ver informe →
                </span>

              </button>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}