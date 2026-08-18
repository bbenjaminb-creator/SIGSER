type ToolbarOperacionesProps = {
  busqueda: string;
  onBusquedaChange: (valor: string) => void;

  filtrosEstado: {
    pendientes: boolean;
    listo: boolean;
    ejecutado: boolean;
    rechazado: boolean;
    impreso: boolean;
  };

  onFiltrosEstadoChange: (filtros: {
    pendientes: boolean;
    listo: boolean;
    ejecutado: boolean;
    rechazado: boolean;
    impreso: boolean;
  }) => void;

  supervisores: string[];

  supervisorSeleccionado: string;

  onSupervisorChange: (supervisor: string) => void;

  tiposOrden: string[];

tipoSeleccionado: string;

onTipoChange: (tipo: string) => void;
onActualizar: () => void;
periodoSeleccionado: string;

onPeriodoChange: (periodo: string) => void;

fechaDesde: string;

onFechaDesdeChange: (fecha: string) => void;

fechaHasta: string;

onFechaHastaChange: (fecha: string) => void;

};

export default function ToolbarOperaciones({
  busqueda,
  onBusquedaChange,
  filtrosEstado,
  onFiltrosEstadoChange,
  supervisores,
  supervisorSeleccionado,
  onSupervisorChange,
  tiposOrden,
  tipoSeleccionado,
  onTipoChange,
  onActualizar,
  periodoSeleccionado,
onPeriodoChange,
fechaDesde,
onFechaDesdeChange,
fechaHasta,
onFechaHastaChange,
}: ToolbarOperacionesProps) {

  return (
    <div
      style={{
        margin: "20px 0",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Primera fila */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Buscar por ID, cliente, lugar o supervisor..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            maxWidth: "450px",
          }}
        />

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={onActualizar}>
  Actualizar
</button>

          <button
            onClick={() =>
              window.open(
                "AQUI_VA_EL_LINK_DEL_GOOGLE_SHEETS",
                "_blank"
              )
            }
          >
            Abrir Google Sheets
          </button>

          <button disabled>
            Nueva Orden (Próximamente)
          </button>
        </div>
      </div>

      {/* Segunda fila */}
      <div
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Supervisor */}
        <label>
          Supervisor:

          <select
            value={supervisorSeleccionado}
            onChange={(e) => onSupervisorChange(e.target.value)}
            style={{ marginLeft: "8px" }}
          >
            <option value="TODOS">Todos</option>

            {supervisores.map((supervisor) => (
              <option
                key={supervisor}
                value={supervisor}
              >
                {supervisor}
              </option>
            ))}
          </select>
        </label>

        {/* Tipo de Orden */}
<label>
  Tipo:

  <select
    value={tipoSeleccionado}
    onChange={(e) => onTipoChange(e.target.value)}
    style={{ marginLeft: "8px" }}
  >
    <option value="TODOS">Todos</option>

    {tiposOrden.map((tipo) => (
      <option
        key={tipo}
        value={tipo}
      >
        {tipo}
      </option>
    ))}
  </select>
</label>

{/* Período */}
<label>
  Período:

  <select
    value={periodoSeleccionado}
    onChange={(e) => onPeriodoChange(e.target.value)}
    style={{ marginLeft: "8px" }}
  >
    <option value="HOY">Hoy</option>
    <option value="ESTA_SEMANA">Esta semana</option>
    <option value="ESTE_MES">Este mes</option>
    <option value="MES_PASADO">Mes pasado</option>
    <option value="PERSONALIZADO">Personalizado</option>
  </select>
</label>

        {/* Pendientes */}
        <label>
          <input
            type="checkbox"
            checked={filtrosEstado.pendientes}
            onChange={(e) =>
              onFiltrosEstadoChange({
                ...filtrosEstado,
                pendientes: e.target.checked,
              })
            }
          />
          Pendientes
        </label>

        {/* Listo */}
        <label>
          <input
            type="checkbox"
            checked={filtrosEstado.listo}
            onChange={(e) =>
              onFiltrosEstadoChange({
                ...filtrosEstado,
                listo: e.target.checked,
              })
            }
          />
          Listo
        </label>

        {/* Ejecutado */}
        <label>
          <input
            type="checkbox"
            checked={filtrosEstado.ejecutado}
            onChange={(e) =>
              onFiltrosEstadoChange({
                ...filtrosEstado,
                ejecutado: e.target.checked,
              })
            }
          />
          Ejecutado
        </label>

        {/* Rechazado */}
        <label>
          <input
            type="checkbox"
            checked={filtrosEstado.rechazado}
            onChange={(e) =>
              onFiltrosEstadoChange({
                ...filtrosEstado,
                rechazado: e.target.checked,
              })
            }
          />
          Rechazado
        </label>

        {/* Impreso */}
        <label>
          <input
            type="checkbox"
            checked={filtrosEstado.impreso}
            onChange={(e) =>
              onFiltrosEstadoChange({
                ...filtrosEstado,
                impreso: e.target.checked,
              })
            }
          />
          Impreso
        </label>
      </div>
      {periodoSeleccionado === "PERSONALIZADO" && (
  <div
    style={{
      display: "flex",
      gap: "12px",
      marginTop: "12px",
      alignItems: "center",
    }}
  >
    <label>
      Desde:
      <input
        type="date"
        value={fechaDesde}
        onChange={(e) => onFechaDesdeChange(e.target.value)}
        style={{ marginLeft: "8px" }}
      />
    </label>

    <label>
      Hasta:
      <input
        type="date"
        value={fechaHasta}
        onChange={(e) => onFechaHastaChange(e.target.value)}
        style={{ marginLeft: "8px" }}
      />
    </label>
  </div>
)}
    </div>
  );
}