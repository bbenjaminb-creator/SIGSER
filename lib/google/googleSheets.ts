import { google } from "googleapis";
import { obtenerClienteGoogle } from "./auth";

export async function leerHoja(
  spreadsheetId: string,
  hoja: string
) {
  const auth = await obtenerClienteGoogle();

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const respuesta = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: hoja,
  });

  return respuesta.data.values ?? [];
}