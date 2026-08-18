export interface IAdaptadorModulo {
  /**
   * Nombre del módulo.
   * Ejemplo:
   * F73
   * F45
   * CRM
   */
  readonly modulo: string;

  /**
   * Traduce un nombre lógico
   * al nombre físico del origen de datos.
   *
   * Ejemplo:
   * Supervisor -> supervisor
   * Estado -> estado
   * Fecha -> fechaHora
   */
  obtenerCampo(nombreLogico: string): string;

  /**
   * Devuelve todos los campos disponibles
   * para el módulo.
   */
  obtenerCampos(): string[];
}