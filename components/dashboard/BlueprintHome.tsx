"use client";

import { useEffect, useState } from "react";
import { F73Service } from "../modules/operaciones/services/f73.service";
import { Orden } from "../modules/operaciones/types/Orden";

type Modulo =
  | "OPERACIONES"
  | "COMERCIAL"
  | "RRHH"
  | "CALIDAD"
  | "ADMINISTRACION"
  | "FINANZAS";

type Formulario = {
  codigo: string;
  nombre: string;
  modulo: Modulo;
  formularioUrl: string;
  respuestasUrl: string;
};

const formularios: Formulario[] = [
  {
    codigo: "F3",
    nombre: "Matriz de riesgos y oportunidades",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F4",
    nombre: "Objetivos de calidad",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F5",
    nombre: "Contexto organizacional",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F6",
    nombre: "Inspecciones",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F7",
    nombre: "Hoja de Vida",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F8",
    nombre: "Evaluación entrenamiento personal operativo",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F9",
    nombre: "Requerimiento del cliente",
    modulo: "COMERCIAL",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F10",
    nombre: "Plan de auditoría",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F11",
    nombre: "Informe de auditoría",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F13",
    nombre: "Revisión por la dirección",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F14",
    nombre: "No conformidad",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F17",
    nombre: "Oportunidad de mejoras",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F18",
    nombre: "Evaluación de proveedores",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F19",
    nombre: "Evaluación desempeño del personal",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F20",
    nombre: "Bonos supervisores",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F21",
    nombre: "Afiliación",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F22",
    nombre: "Solicitud de personal",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F23",
    nombre: "Satisfacción del cliente",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F24",
    nombre: "Matriz de competencias personales",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F26",
    nombre: "Formación",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F27",
    nombre: "Ficha técnica servicio",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F28",
    nombre: "Registro de firmas",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F29",
    nombre: "Inspección vehículos",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F30",
    nombre: "Informes",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F31",
    nombre: "Inspección TI",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F32",
    nombre: "Inspección infraestructura",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F33",
    nombre: "Kardex vehículos",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F34",
    nombre: "Kardex mantenimiento equipos",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F35",
    nombre: "Kardex mantenimiento TI",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F36",
    nombre: "Kardex infraestructura y mobiliario",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F37",
    nombre: "Lección aprendida",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F38",
    nombre: "Clima laboral",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F39",
    nombre: "Inspección de almacén",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F40",
    nombre: "Premiación",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F41",
    nombre: "Finiquito",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F42",
    nombre: "Servicios no conformes",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F43",
    nombre: "Datos de seguimiento y medición",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F44",
    nombre: "Actas de reunión",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F45 A",
    nombre: "A Cotizar (eventual)",
    modulo: "COMERCIAL",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F45 B",
    nombre: "A Cotizar (permanente)",
    modulo: "COMERCIAL",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F46",
    nombre: "Cotización",
    modulo: "COMERCIAL",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F48",
    nombre: "Plan operativo comercial",
    modulo: "COMERCIAL",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F49",
    nombre: "Reporte accidentes",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F50",
    nombre: "Actividades equipo móvil",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F52",
    nombre: "Ficha pre empleo",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F53",
    nombre: "Nuevas tecnologías",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F54",
    nombre: "Reporte de servicios",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F55",
    nombre: "Conformidad de trabajo",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F56",
    nombre: "Registro de trabajo",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F58",
    nombre: "Uniformes",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F59",
    nombre: "Visita clientes potenciales",
    modulo: "COMERCIAL",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F60",
    nombre: "Máquinas móviles",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F61",
    nombre: "Controles",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F62",
    nombre: "Registro de temperaturas de almacén",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F63",
    nombre: "Planillas",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F64",
    nombre: "Crear / actualizar ID",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F65",
    nombre: "Productos de almacén",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F66",
    nombre: "Solicitud de vacación",
    modulo: "RRHH",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F67",
    nombre: "Personal no recomendado",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F68",
    nombre: "Registro de fumigación",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F69",
    nombre: "Facturación",
    modulo: "FINANZAS",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F70",
    nombre: "Pagos",
    modulo: "FINANZAS",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F71",
    nombre: "Servicio lavado alfombra",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F72",
    nombre: "Control de botiquines",
    modulo: "ADMINISTRACION",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F73",
    nombre: "Órdenes",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F74",
    nombre: "Revisión de documentos y procedimientos",
    modulo: "CALIDAD",
    formularioUrl: "",
    respuestasUrl: "",
  },
  {
    codigo: "F75",
    nombre: "Especificaciones de servicio",
    modulo: "OPERACIONES",
    formularioUrl: "",
    respuestasUrl: "",
  },
];

export default function BlueprintHome() {

    const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const servicio = new F73Service();

    useEffect(() => {
    async function cargarOrdenes() {
      try {
        const datos = await servicio.obtenerOrdenes();
        setOrdenes(datos);
      } catch (error) {
        console.error(
          "Error al cargar órdenes para el semáforo:",
          error
        );
      }
    }

    cargarOrdenes();
  }, []);

   // ==================================================
// SEMÁFORO OPERACIONES
// Misma lógica que HistoricoPlanificacion
// ==================================================

const hoy = new Date();

const anioActual = hoy.getFullYear();
const indiceMesActual = hoy.getMonth();

const normalizarFecha = (fecha: Date) => {
  const resultado = new Date(fecha);
  resultado.setHours(0, 0, 0, 0);
  return resultado;
};

// Tomamos únicamente las órdenes solicitadas
// durante el mes actual y que tengan fecha
// de solicitud y ejecución.
const ordenesDelMes = ordenes.filter((orden) => {
  if (
    !orden.fechaSolicitud ||
    !orden.fechaEjecucion
  ) {
    return false;
  }

  return (
    orden.fechaSolicitud.getFullYear() ===
      anioActual &&
    orden.fechaSolicitud.getMonth() ===
      indiceMesActual
  );
});

// Clasificamos según los días entre solicitud
// y ejecución.
const clasificarPlanificacion = (
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
    (
      ejecucion.getTime() -
      solicitud.getTime()
    ) /
      (1000 * 60 * 60 * 24)
  );

  if (diferencia <= 0) {
    return "hoy";
  }

  if (diferencia === 1) {
    return "manana";
  }

  if (diferencia === 2) {
    return "pasadoManana";
  }

  return "tresOMas";
};

const totalOrdenesMes = ordenesDelMes.length;

const cantidadHoy = ordenesDelMes.filter(
  (orden) =>
    clasificarPlanificacion(orden) === "hoy"
).length;

const cantidadManana = ordenesDelMes.filter(
  (orden) =>
    clasificarPlanificacion(orden) === "manana"
).length;

const cantidadPasadoManana =
  ordenesDelMes.filter(
    (orden) =>
      clasificarPlanificacion(orden) ===
      "pasadoManana"
  ).length;

const porcentajeHoy =
  totalOrdenesMes > 0
    ? (cantidadHoy / totalOrdenesMes) * 100
    : 0;

const porcentajeManana =
  totalOrdenesMes > 0
    ? (cantidadManana / totalOrdenesMes) * 100
    : 0;

const porcentajePasadoManana =
  totalOrdenesMes > 0
    ? (
        cantidadPasadoManana /
        totalOrdenesMes
      ) * 100
    : 0;

let colorSemaforo = "🟢";

let textoSemaforo =
  "Operaciones dentro de los parámetros.";

// 1. Primero evaluamos HOY
if (porcentajeHoy > 15) {
  colorSemaforo = "🔴";

  textoSemaforo =
    `${Math.round(
      porcentajeHoy
    )}% (${cantidadHoy} órdenes) de las órdenes solicitadas este mes fueron programadas para ejecutarse el mismo día. El objetivo máximo es 15%.`;

// 2. Si HOY está bien, evaluamos MAÑANA
} else if (porcentajeManana > 20) {
  colorSemaforo = "🟠";

  textoSemaforo =
    `${Math.round(
      porcentajeManana
    )}% (${cantidadManana} órdenes) fueron programadas para el día siguiente.`;

// 3. Finalmente PASADO MAÑANA
} else if (
  porcentajePasadoManana > 20
) {
  colorSemaforo = "🟡";

  textoSemaforo =
    `${Math.round(
      porcentajePasadoManana
    )}% (${cantidadPasadoManana} órdenes) fueron programadas con dos días de anticipación.`;
}

  const [moduloSeleccionado, setModuloSeleccionado] =
    useState<Modulo | "TODOS" | null>(null);

  const [busquedaFormulario, setBusquedaFormulario] =
    useState("");

  const formulariosFiltrados = formularios.filter((formulario) => {
    const texto = busquedaFormulario.toLowerCase();

    const coincideTexto =
      formulario.codigo.toLowerCase().includes(texto) ||
      formulario.nombre.toLowerCase().includes(texto);

    if (moduloSeleccionado === "TODOS") {
      return coincideTexto;
    }

    if (moduloSeleccionado) {
      return (
        coincideTexto &&
        formulario.modulo === moduloSeleccionado
      );
    }

    return coincideTexto;
  });

  function abrirFormulario(formulario: Formulario) {
    if (!formulario.formularioUrl) {
      alert(
        `${formulario.codigo} — ${formulario.nombre}\n\nEl enlace del formulario todavía no fue configurado.`
      );
      return;
    }

    window.open(formulario.formularioUrl, "_blank");
  }

  function abrirRespuestas(formulario: Formulario) {
    if (!formulario.respuestasUrl) {
      alert(
        `${formulario.codigo} — ${formulario.nombre}\n\nEl enlace de la hoja de respuestas todavía no fue configurado.`
      );
      return;
    }

    window.open(formulario.respuestasUrl, "_blank");
  }

  if (moduloSeleccionado === "TODOS") {
    return (
      <>
        <button
          onClick={() => setModuloSeleccionado(null)}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Volver al Blueprint
        </button>

        <h1 className="text-3xl font-bold">
          📚 Todos los formularios
        </h1>

        <p className="mt-2 text-gray-600">
          Catálogo completo de formularios del SIGSER.
        </p>

        <input
          type="text"
          placeholder="Buscar por código o nombre..."
          value={busquedaFormulario}
          onChange={(e) =>
            setBusquedaFormulario(e.target.value)
          }
          className="mt-6 w-full max-w-xl rounded-lg border p-3"
        />

        <div className="mt-6 rounded-xl border bg-white overflow-hidden">
  <div className="flex items-center gap-4 bg-gray-50 border-b px-4 py-3 text-sm font-semibold text-gray-600">
    <div className="w-20">Código</div>
    <div className="flex-1">Formulario</div>
    <div className="w-[220px]">Acciones</div>
  </div>

  {formulariosFiltrados.map((formulario) => (
            <TarjetaFormulario
              key={formulario.codigo}
              formulario={formulario}
              onAbrirFormulario={abrirFormulario}
              onAbrirRespuestas={abrirRespuestas}
              mostrarModulo
            />
          ))}
        </div>
      </>
    );
  }

  if (moduloSeleccionado) {
    const nombreModulo =
      moduloSeleccionado === "RRHH"
        ? "Recursos Humanos"
        : moduloSeleccionado === "ADMINISTRACION"
        ? "Administración"
        : moduloSeleccionado.charAt(0) +
          moduloSeleccionado.slice(1).toLowerCase();

    const formulariosDelModulo = formularios.filter(
      (formulario) =>
        formulario.modulo === moduloSeleccionado
    );

    return (
      <>
        <button
          onClick={() => setModuloSeleccionado(null)}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Volver al Blueprint
        </button>

        <h1 className="text-3xl font-bold">
          {moduloSeleccionado === "OPERACIONES" && "📊 "}
          {moduloSeleccionado === "COMERCIAL" && "💼 "}
          {moduloSeleccionado === "RRHH" && "👥 "}
          {moduloSeleccionado === "CALIDAD" && "📋 "}
          {moduloSeleccionado === "ADMINISTRACION" && "🗂 "}
          {moduloSeleccionado === "FINANZAS" && "💰 "}
          {nombreModulo}
        </h1>

        <p className="mt-2 text-gray-600">
          Blueprint del módulo de {nombreModulo}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

          {moduloSeleccionado === "OPERACIONES" && (
            <>
              <TarjetaProceso
  nombre="Órdenes"
  onClick={() => window.location.href = "/operaciones"}
/>
              <TarjetaProceso nombre="Recursos Operativos" />
              <TarjetaProceso nombre="Inspecciones" />
              <TarjetaProceso nombre="Informes" />
              <TarjetaProceso nombre="Productividad" />
              <TarjetaProceso nombre="Alertas" />
            </>
          )}

          {moduloSeleccionado === "COMERCIAL" && (
            <>
              <TarjetaProceso nombre="Cotizaciones" />
              <TarjetaProceso nombre="Contratos" />
              <TarjetaProceso nombre="CRM" />
              <TarjetaProceso nombre="Plan Operativo Comercial" />
            </>
          )}

          {moduloSeleccionado === "RRHH" && (
            <>
              <TarjetaProceso
                nombre="Planillas — F63"
              />
              <TarjetaProceso
                nombre="Hoja de Vida — F07"
              />
              <TarjetaProceso nombre="Vacaciones" />
              <TarjetaProceso nombre="Afiliaciones" />
              <TarjetaProceso nombre="Finiquitos" />
            </>
          )}

          {moduloSeleccionado === "CALIDAD" && (
            <>
              <TarjetaProceso nombre="Planificación y gestión de la calidad" />
              <TarjetaProceso nombre="Auditorías" />
              <TarjetaProceso nombre="No conformidades y servicios no conformes" />
              <TarjetaProceso nombre="Satisfacción del cliente" />
              <TarjetaProceso nombre="Seguimiento y medición" />
              <TarjetaProceso nombre="Gestión documental" />
              <TarjetaProceso nombre="Evaluación de proveedores" />
            </>
          )}

          {moduloSeleccionado === "ADMINISTRACION" && (
            <>
              <TarjetaProceso nombre="Inspecciones y Controles" />
              <TarjetaProceso nombre="Activos y Mantenimiento" />
              <TarjetaProceso nombre="Gestión del Personal" />
              <TarjetaProceso nombre="Documentación" />
            </>
          )}

          {moduloSeleccionado === "FINANZAS" && (
            <>
              <TarjetaProceso nombre="Facturación y Pagos" />
              <TarjetaProceso nombre="Control Financiero" />
              <TarjetaProceso nombre="Presupuesto y Control" />
              <TarjetaProceso nombre="Rentabilidad" />
            </>
          )}

        </div>

        <div className="mt-10">
          <button
            onClick={() =>
              setModuloSeleccionado(moduloSeleccionado)
            }
            className="rounded-xl border p-5 shadow-sm hover:shadow-md transition w-full md:w-auto"
          >
            📋 Formularios de {nombreModulo}
          </button>

          <button
            onClick={() => setModuloSeleccionado("TODOS")}
            className="ml-0 mt-4 md:ml-4 md:mt-0 rounded-xl border p-5 shadow-sm hover:shadow-md transition w-full md:w-auto"
          >
            📚 Todos los formularios
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Formularios de {nombreModulo}
          </h2>

          <div className="mt-6 rounded-xl border bg-white overflow-hidden">
  <div className="flex items-center gap-4 bg-gray-50 border-b px-4 py-3 text-sm font-semibold text-gray-600">
    <div className="w-20">Código</div>
    <div className="flex-1">Formulario</div>
    <div className="w-[220px]">Acciones</div>
  </div>
            {formulariosDelModulo.map((formulario) => (
              <TarjetaFormulario
                key={formulario.codigo}
                formulario={formulario}
                onAbrirFormulario={abrirFormulario}
                onAbrirRespuestas={abrirRespuestas}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold">
        SIGSER Blueprint
      </h1>

      <p className="mt-3 text-gray-600">
        Arquitectura General del Sistema
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

       <TarjetaModulo
  titulo={`📊 Operaciones ${colorSemaforo}`}
  onClick={() =>
    setModuloSeleccionado("OPERACIONES")
  }
>
          <li>• Órdenes</li>
          <li>• Recursos Operativos</li>
          <li>• Inspecciones</li>
          <li>• Informes</li>
          <li>• Productividad</li>
          <li>• Alertas</li>
        </TarjetaModulo>

        <TarjetaModulo
          titulo="💼 Comercial"
          onClick={() =>
            setModuloSeleccionado("COMERCIAL")
          }
        >
          <li>• Cotizaciones</li>
          <li>• Contratos</li>
          <li>• CRM</li>
          <li>• Plan Operativo Comercial</li>
        </TarjetaModulo>

        <TarjetaModulo
          titulo="👥 Recursos Humanos"
          onClick={() =>
            setModuloSeleccionado("RRHH")
          }
        >
          <li>• Planillas — F63</li>
          <li>• Hoja de Vida — F07</li>
          <li>• Vacaciones</li>
          <li>• Afiliaciones</li>
          <li>• Finiquitos</li>
        </TarjetaModulo>

        <TarjetaModulo
          titulo="📋 Calidad"
          onClick={() =>
            setModuloSeleccionado("CALIDAD")
          }
        >
          <li>• Planificación y gestión</li>
          <li>• Auditorías</li>
          <li>• No conformidades</li>
          <li>• Satisfacción del cliente</li>
          <li>• Seguimiento y medición</li>
          <li>• Gestión documental</li>
          <li>• Evaluación de proveedores</li>
        </TarjetaModulo>

        <TarjetaModulo
          titulo="🗂 Administración"
          onClick={() =>
            setModuloSeleccionado("ADMINISTRACION")
          }
        >
          <li>• Inspecciones y Controles</li>
          <li>• Activos y Mantenimiento</li>
          <li>• Gestión del Personal</li>
          <li>• Documentación</li>
        </TarjetaModulo>

        <TarjetaModulo
          titulo="💰 Finanzas"
          onClick={() =>
            setModuloSeleccionado("FINANZAS")
          }
        >
          <li>• Facturación y Pagos</li>
          <li>• Control Financiero</li>
          <li>• Presupuesto y Control</li>
          <li>• Rentabilidad</li>
        </TarjetaModulo>

      </div>

      <div className="mt-10">
        <button
          onClick={() => setModuloSeleccionado("TODOS")}
          className="rounded-xl border p-6 shadow-sm hover:shadow-md transition w-full md:w-auto"
        >
          📚 Todos los formularios
        </button>
      </div>
    </>
  );
}

function TarjetaModulo({
  titulo,
  children,
  onClick,
}: {
  titulo: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl border p-6 shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <h2 className="text-xl font-semibold mb-3">
        {titulo}
      </h2>

      <ul className="space-y-1 text-gray-600">
        {children}
      </ul>

      <p className="mt-5 text-blue-600 font-medium">
        Explorar →
      </p>
    </div>
  );
}

function TarjetaProceso({
  nombre,
  onClick,
}: {
  nombre: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl border p-6 shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <h2 className="text-xl font-semibold">
        {nombre}
      </h2>
    </div>
  );
}

function TarjetaFormulario({
  formulario,
  onAbrirFormulario,
  onAbrirRespuestas,
  mostrarModulo = false,
}: {
  formulario: Formulario;
  onAbrirFormulario: (formulario: Formulario) => void;
  onAbrirRespuestas: (formulario: Formulario) => void;
  mostrarModulo?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 border-b px-4 py-3 hover:bg-gray-50">

      {/* Código */}
      <div className="w-20 shrink-0">
        <span className="font-semibold text-gray-700">
          {formulario.codigo}
        </span>
      </div>

      {/* Nombre */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">
          {formulario.nombre}
        </p>

        {mostrarModulo && (
          <p className="text-xs text-gray-500 mt-1">
            {formulario.modulo}
          </p>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-2 shrink-0">

        <button
          onClick={() =>
            onAbrirFormulario(formulario)
          }
          title="Abrir formulario"
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          📋 Formulario
        </button>

        <button
          onClick={() =>
            onAbrirRespuestas(formulario)
          }
          title="Ver hoja de respuestas"
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          📊 Respuestas
        </button>

      </div>

    </div>
  );
}