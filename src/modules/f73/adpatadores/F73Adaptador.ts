import { IAdaptadorModulo } from "../../../framework/consultas/AdaptadorModulo";

export class F73Adaptador implements IAdaptadorModulo {
  readonly modulo = "F73";

  private readonly campos: Record<string, string> = {
    Id: "id",
    Fecha: "fecha",
    Cliente: "cliente",
    Servicio: "servicio",
    Supervisor: "supervisor",
    Estado: "estado",
  };

  obtenerCampo(nombreLogico: string): string {
    return this.campos[nombreLogico] ?? nombreLogico;
  }

  obtenerCampos(): string[] {
    return Object.values(this.campos);
  }
}