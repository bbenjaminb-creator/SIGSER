// ================================
// Framework SIGSER
// Motor de Consultas
// Definición de contratos
// ================================

export interface IConsultaSIGSER {
  modulo: string;
  filtros: IFiltroSIGSER[];

  orden?: IOrdenSIGSER;

  paginacion?: IPaginacionSIGSER;

  metricas?: string[];
}

export interface IFiltroSIGSER {
  campo: string;

  operador: EOperadorFiltro;

  valor: unknown;
}

export interface IOrdenSIGSER {
  campo: string;

  direccion: "ASC" | "DESC";
}

export interface IPaginacionSIGSER {
  pagina: number;

  registrosPorPagina: number;
}

export interface IResultadoSIGSER<T = unknown> {
  registros: T[];

  total: number;

  metricas?: Record<string, unknown>;

  tiempoConsulta: number;
}

export enum EOperadorFiltro {
  IGUAL = "=",

  DIFERENTE = "!=",

  MAYOR = ">",

  MAYOR_IGUAL = ">=",

  MENOR = "<",

  MENOR_IGUAL = "<=",

  ENTRE = "entre",

  CONTIENE = "contiene",

  EMPIEZA_CON = "empiezaCon",

  TERMINA_CON = "terminaCon",

  EN = "in",

  NO_EN = "noIn",

  ES_VACIO = "esVacio",

  NO_ES_VACIO = "noEsVacio",
}