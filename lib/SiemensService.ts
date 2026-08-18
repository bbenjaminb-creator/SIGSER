export interface SiemensActividad {
  f50: string;
  fecha: string;
  mes: string;
  cliente: string;
  servicio: string;
  personal: string;
  visita: string;
  asistencia: string;
  estado: string;
  informe: string;
  recordatorio: string;
  servicioOriginal: string;
  ultimaSincronizacion: string;
}

export class SiemensService {

  async obtenerActividades(): Promise<SiemensActividad[]> {

    console.log("Consultando API SIEMENS...");

    const response = await fetch("/api/Siemens");

    const json = await response.json();

    console.log("RESPUESTA SIEMENS:", json);

    if (!json.ok) {
      throw new Error(
        json.error || "No se pudo cargar la información de SIEMENS."
      );
    }

    return json.datos || [];
  }

}