import { google } from "googleapis";
import path from "path";

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(
    process.cwd(),
    "../../Credentials/google-service-account.json"
  ),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export async function obtenerClienteGoogle() {
  return await auth.getClient();
}