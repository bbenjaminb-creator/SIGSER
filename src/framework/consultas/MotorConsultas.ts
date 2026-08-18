import {
  IConsultaSIGSER,
  IResultadoSIGSER,
} from "./types";

export class MotorConsultas {
  /**
   * Punto de entrada del Framework.
   * En futuras versiones este método decidirá
   * cómo y desde dónde obtener la información.
   */
  static async consultar<T>(
    consulta: IConsultaSIGSER
  ): Promise<IResultadoSIGSER<T>> {

    const inicio = performance.now();

    this.validarConsulta(consulta);

    // Próximamente:
    //
    // 1. Construir consulta
    // 2. Enviar al backend
    // 3. Obtener registros
    // 4. Calcular métricas
    //

    const fin = performance.now();

    return {
      registros: [],
      total: 0,
      metricas: {},
      tiempoConsulta: Number((fin - inicio).toFixed(2)),
    };
  }

  /**
   * Verifica que la consulta sea válida.
   */
  private static validarConsulta(
    consulta: IConsultaSIGSER
  ): void {

    if (!consulta.modulo) {
      throw new Error("Debe indicar el módulo.");
    }

    if (!consulta.filtros) {
      throw new Error("Debe enviar la colección de filtros.");
    }
  }
}