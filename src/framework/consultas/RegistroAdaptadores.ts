import { IAdaptadorModulo } from "./AdaptadorModulo";

export class RegistroAdaptadores {
  private static adaptadores = new Map<string, IAdaptadorModulo>();

  /**
   * Registra un adaptador en el Framework.
   */
  static registrar(adaptador: IAdaptadorModulo): void {
    this.adaptadores.set(
      adaptador.modulo.toUpperCase(),
      adaptador
    );
  }

  /**
   * Devuelve el adaptador solicitado.
   */
  static obtener(modulo: string): IAdaptadorModulo {
    const adaptador = this.adaptadores.get(
      modulo.toUpperCase()
    );

    if (!adaptador) {
      throw new Error(
        `No existe un adaptador registrado para el módulo "${modulo}".`
      );
    }

    return adaptador;
  }

  /**
   * Verifica si un módulo está registrado.
   */
  static existe(modulo: string): boolean {
    return this.adaptadores.has(
      modulo.toUpperCase()
    );
  }

  /**
   * Devuelve todos los módulos registrados.
   */
  static listar(): string[] {
    return [...this.adaptadores.keys()];
  }
}
