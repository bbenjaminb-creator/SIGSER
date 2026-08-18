  "use client";

  import { useEffect, useState } from "react";
  import { F73Service } from "../services/f73.service";
  import { Orden } from "../types/Orden";
  import DashboardOperaciones from "./DashboardOperaciones";
  import BarraFiltros from "./BarraFiltros";
  import TablaOrdenes from "./TablaOrdenes";
  import ToolbarOperaciones from "./ToolbarOperaciones";
  import PanelServicio from "./PanelServicio";

  export default function ExploradorOrdenes() {
    const [ordenes, setOrdenes] = useState<Orden[]>([]);
    const [ordenSeleccionada, setOrdenSeleccionada] =
      useState<Orden | null>(null);
    const [panelAbierto, setPanelAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [supervisorSeleccionado, setSupervisorSeleccionado] =
    useState("TODOS");
    const [filtrosEstado, setFiltrosEstado] = useState({
    pendientes: true,
    listo: false,
    ejecutado: false,
    rechazado: false,
    impreso: false,
  });

    const servicio = new F73Service();
    const supervisores = Array.from(
    new Set(
      ordenes
        .map((orden) => orden.supervisor)
        .filter(
          (supervisor) =>
            supervisor &&
            supervisor.trim() !== ""
        )
    )
  ).sort();

  const tiposOrden = Array.from(
    new Set(
      ordenes
        .map((orden) => orden.tipoPedido)
        .filter(
          (tipo) =>
            tipo &&
            tipo.trim() !== ""
        )
    )
  ).sort();

  const [tipoSeleccionado, setTipoSeleccionado] =
    useState("TODOS");
    const [periodoSeleccionado, setPeriodoSeleccionado] =
    useState("ESTE_MES");

  const [fechaDesde, setFechaDesde] =
    useState("");

  const [fechaHasta, setFechaHasta] =
    useState("");

    function esOrdenPendiente(
    estado: string,
    planificacion: string
  ) {
    return (
      planificacion !== "LISTO" &&
      estado !== "EJECUTADO" &&
      estado !== "RECHAZADO"
    );
  }
    const ordenesFiltradas = ordenes.filter((orden) => {
    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      orden.idPedido?.toLowerCase().includes(texto) ||
      orden.lugar?.toLowerCase().includes(texto) ||
      orden.tipoPedido?.toLowerCase().includes(texto);

    const estado = orden.estado.toUpperCase();
    console.log({
    id: orden.idPedido,
    estadoOriginal: orden.estado,
    estadoNormalizado: estado,
    fecha: orden.fechaEjecucion,
    periodo: periodoSeleccionado,
  });
    const planificacion = orden.tiempoParaEjecutar.toUpperCase();

  const coincideEstado =
    (filtrosEstado.pendientes &&
      esOrdenPendiente(estado, planificacion)) ||
      (filtrosEstado.listo &&
        planificacion === "LISTO") ||

      (filtrosEstado.ejecutado &&
        estado === "EJECUTADO") ||

      (filtrosEstado.rechazado &&
        estado === "RECHAZADO") ||

      (filtrosEstado.impreso &&
        estado === "IMPRESO");

        const coincideSupervisor =
    supervisorSeleccionado === "TODOS" ||
    orden.supervisor === supervisorSeleccionado;
    const coincideTipo =
    tipoSeleccionado === "TODOS" ||
    orden.tipoPedido === tipoSeleccionado;
    const hoy = new Date();

  const fechaOrden = orden.fechaEjecucion;

  let coincidePeriodo = true;

  if (fechaOrden) {

    // Normalizamos ambas fechas para comparar solo el día
    const hoySinHora = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      hoy.getDate()
    );

    const fechaOrdenSinHora = new Date(
      fechaOrden.getFullYear(),
      fechaOrden.getMonth(),
      fechaOrden.getDate()
    );

  const esPendiente =
    esOrdenPendiente(estado, planificacion);

  if (esPendiente && fechaOrdenSinHora <= hoySinHora) {

    coincidePeriodo = true;

  } else {

      switch (periodoSeleccionado) {

        case "HOY":
          coincidePeriodo =
            fechaOrdenSinHora.getTime() === hoySinHora.getTime();
          break;

        case "ESTE_MES":
          coincidePeriodo =
            fechaOrden.getMonth() === hoy.getMonth() &&
            fechaOrden.getFullYear() === hoy.getFullYear();
          break;

        case "MES_PASADO": {

          const mesPasado = new Date(
            hoy.getFullYear(),
            hoy.getMonth() - 1,
            1
          );

          coincidePeriodo =
            fechaOrden.getMonth() === mesPasado.getMonth() &&
            fechaOrden.getFullYear() === mesPasado.getFullYear();

          break;
        }

        default:
          coincidePeriodo = true;
      }

    }

  }

  return (
    coincideBusqueda &&
    coincideEstado &&
    coincideSupervisor &&
    coincideTipo &&
    coincidePeriodo
  );  
  });

  useEffect(() => {
    console.log("=== EXPLORADOR ORDENES ===");

    actualizarOrdenes();
  }, []);

  async function actualizarOrdenes() {
    try {
      const datos = await servicio.obtenerOrdenes();
      setOrdenes(datos);
    } catch (error) {
      console.error(error);
    }
  }

  async function abrirOrden(orden: Orden) {
    try {
      const detalle = await servicio.obtenerOrden(orden.idPedido);

      setOrdenSeleccionada(detalle);

      setPanelAbierto(true);
    } catch (error) {
      console.error(error);
    }
  }
      return (
      <div style={{ padding: "24px" }}>
<h1 style={{ margin: 0 }}>
  Operaciones
</h1>

<p>Gestión y seguimiento de órdenes de servicio.</p>
      <DashboardOperaciones
    ordenes={ordenes}
    onVerOrden={abrirOrden}
  />
  <ToolbarOperaciones
    busqueda={busqueda}
    onBusquedaChange={setBusqueda}
    filtrosEstado={filtrosEstado}
    onFiltrosEstadoChange={setFiltrosEstado}
    supervisores={supervisores}
    supervisorSeleccionado={supervisorSeleccionado}
    onSupervisorChange={setSupervisorSeleccionado}
    tiposOrden={tiposOrden}
    tipoSeleccionado={tipoSeleccionado}
    onTipoChange={setTipoSeleccionado}
    onActualizar={actualizarOrdenes}

    periodoSeleccionado={periodoSeleccionado}
  onPeriodoChange={setPeriodoSeleccionado}

  fechaDesde={fechaDesde}
  onFechaDesdeChange={setFechaDesde}
  fechaHasta={fechaHasta}
  onFechaHastaChange={setFechaHasta}
  />

        <TablaOrdenes
          ordenes={ordenesFiltradas}
          onVer={abrirOrden}
        />

        <PanelServicio
          abierto={panelAbierto}
          orden={ordenSeleccionada}
          onCerrar={() => setPanelAbierto(false)}
        />
      </div>
    );
  }