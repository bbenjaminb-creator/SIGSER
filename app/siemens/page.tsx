"use client";

import { useEffect, useState } from "react";
import {
  SiemensService,
  SiemensActividad,
} from "@/lib/SiemensService";

export default function SiemensPage() {

  const [actividades, setActividades] =
    useState<SiemensActividad[]>([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const cargarSiemens = async () => {

      try {

        setCargando(true);

        const service = new SiemensService();

        const datos =
          await service.obtenerActividades();

        setActividades(datos);

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
        Cargando información de SIEMENS...
      </div>
    );

  }

  if (error) {

    return (
      <div className="p-8 text-red-600">
        {error}
      </div>
    );

  }

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-2">
        SIEMENS
      </h1>

      <p className="text-gray-600 mb-8">
        Control de actividades e informes mensuales
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="border rounded-lg p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Total actividades
          </p>

          <p className="text-3xl font-bold mt-2">
            {actividades.length}
          </p>

        </div>

        <div className="border rounded-lg p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Informes generados
          </p>

          <p className="text-3xl font-bold mt-2">

            {
              actividades.filter(
                (actividad) =>
                  actividad.informe &&
                  actividad.informe.trim() !== ""
              ).length
            }

          </p>

        </div>

        <div className="border rounded-lg p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Pendientes de informe
          </p>

          <p className="text-3xl font-bold mt-2">

            {
              actividades.filter(
                (actividad) =>
                  !actividad.informe ||
                  actividad.informe.trim() === ""
              ).length
            }

          </p>

        </div>

      </div>

      <div className="border rounded-lg overflow-hidden">

        <div className="p-5 border-b">

          <h2 className="text-xl font-semibold">
            Actividades registradas
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-3">
                  Fecha
                </th>

                <th className="text-left p-3">
                  Mes
                </th>

                <th className="text-left p-3">
                  Servicio
                </th>

                <th className="text-left p-3">
                  Visita
                </th>

                <th className="text-left p-3">
                  Asistencia
                </th>

                <th className="text-left p-3">
                  Estado
                </th>

                <th className="text-left p-3">
                  Informe
                </th>

              </tr>

            </thead>

            <tbody>

              {actividades.map(
                (actividad, index) => (

                  <tr
                    key={index}
                    className="border-t"
                  >

                    <td className="p-3">
                      {actividad.fecha}
                    </td>

                    <td className="p-3">
                      {actividad.mes}
                    </td>

                    <td className="p-3">
                      {actividad.servicio}
                    </td>

                    <td className="p-3">
                      {actividad.visita}
                    </td>

                    <td className="p-3">
                      {actividad.asistencia}
                    </td>

                    <td className="p-3">
                      {actividad.estado}
                    </td>

                    <td className="p-3">

                      {actividad.informe
                        ? actividad.informe
                        : "Pendiente"}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}