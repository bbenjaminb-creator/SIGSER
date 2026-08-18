import { NextResponse } from "next/server";

const URL_API =
  "https://script.google.com/macros/s/AKfycbx25diKXZ2AYu339j7svcXhG_onmTPVCBI00ZS22spsqfgtf8vNTEFb53ySLcELG57FDA/exec?formulario=siemens";

export async function GET() {

  try {

    const response = await fetch(URL_API, {
      cache: "no-store",
    });

    const datos = await response.json();

    return NextResponse.json(datos);

  } catch (error) {

    console.error("Error consultando SIEMENS:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "No se pudo consultar la información de SIEMENS.",
      },
      {
        status: 500,
      }
    );

  }

}