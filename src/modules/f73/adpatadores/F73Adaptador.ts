import { IAdaptadorModulo } from "@/framework/consultas/AdaptadorModulo";

export class F73Adaptador implements IAdaptadorModulo {

  readonly modulo = "F73";

  /**
   * Diccionario oficial del módulo F73.
   *
   * El Framework siempre hablará con estos nombres.
   * Aquí se traducen a los nombres físicos.
   */
  private readonly campos: Record<string, string> = {

    Codigo: "codigo",

    Estado: "estado",

    Planificacion: "tiempoParaEjecutar",

    Tipo: "tipoOrden",

    Supervisor: "supervisor",

    Lugar: "lugar",

    Fecha: "aEjecutarse",

    Personal: "personal",

    Ubicacion: "ubicacion",

    Observaciones: "observaciones",

    Correo: "correo",

    Materiales: "materiales"

  };

  obtenerCampo(nombreLogico: string): string {

    return this.campos[nombreLogico] ?? nombreLogico;

  }

  obtenerCampos(): string[] {

    return Object.keys(this.campos);

  }

}