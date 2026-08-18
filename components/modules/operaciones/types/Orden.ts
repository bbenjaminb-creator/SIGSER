export interface Orden {
  idPedido: string;
  fechaSolicitud: Date | null;
  fechaEjecucion: Date | null;
  lugar: string;
  supervisor: string;
  estado: string;
  tiempoParaEjecutar: string;
  tipoPedido: string;
  personal: string;
  ubicacion: string;
  observaciones: string;
  correo: string;
  materiales: Record<string, string>;
}