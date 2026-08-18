import { Orden } from "../types/Orden";

export class F73Service {

  private convertirOrden(fila: any): Orden {
    console.log("FECHA H F73:", fila.fechaHora);
    return {
  idPedido: fila.codigo,

  fechaSolicitud: (() => {
    if (!fila.fechaHora) return null;

    const valor = String(fila.fechaHora).trim();
    const partes = valor.split(" ");

    const fecha = partes[0];
    const hora = partes[1] || "00:00:00";

    const partesFecha = fecha.split("/");

    if (partesFecha.length !== 3) return null;

    const [dia, mes, anio] = partesFecha;

    const partesHora = hora.split(":");

    const horas = Number(partesHora[0]) || 0;
    const minutos = Number(partesHora[1]) || 0;
    const segundos = Number(partesHora[2]) || 0;

    return new Date(
      Number(anio),
      Number(mes) - 1,
      Number(dia),
      horas,
      minutos,
      segundos
    );
  })(),

  fechaEjecucion: (() => {
    if (!fila.aEjecutarse) return null;

    const partes = fila.aEjecutarse.split("/");

    if (partes.length !== 3) return null;

    const [dia, mes, anio] = partes;

    return new Date(
      Number(anio),
      Number(mes) - 1,
      Number(dia)
    );
  })(),

  lugar: fila.lugar,

      supervisor: fila.supervisor,

      estado: fila.estado,

      tiempoParaEjecutar: fila.tiempoParaEjecutar,

      tipoPedido: fila.tipoOrden,

      personal: fila.personal,

      ubicacion: fila.ubicacion,

      observaciones: fila.observaciones,

      correo: fila.correo,

      materiales: fila.materiales ?? {},
    };
  }

  async obtenerOrdenes(): Promise<Orden[]> {

    console.log("Consultando API F73...");

    const response = await fetch("/api/f73");

    const json = await response.json();

   console.log("PRIMERA FILA F73:", json.datos[0]);
console.log("CAMPOS DISPONIBLES:", Object.keys(json.datos[0] || {}));

    if (!json.ok) {
      throw new Error("No se pudo cargar el F73.");
    }

    const ordenes = json.datos
  .map((fila: any) => this.convertirOrden(fila))
  .filter((orden: Orden) => !!orden.idPedido);

    return ordenes;
  }

  async obtenerOrden(idPedido: string): Promise<Orden> {

    const response = await fetch(
      `/api/f73?idPedido=${encodeURIComponent(idPedido)}`
    );

    const json = await response.json();

    if (!json.ok) {
      throw new Error("No se pudo obtener la orden.");
    }

    return this.convertirOrden(json.datos);
  }

}