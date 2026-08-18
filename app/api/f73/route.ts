import { NextRequest, NextResponse } from "next/server";

const URL_API =
  "https://script.google.com/macros/s/AKfycbx25diKXZ2AYu339j7svcXhG_onmTPVCBI00ZS22spsqfgtf8vNTEFb53ySLcELG57FDA/exec?formulario=f73";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const idPedido = searchParams.get("idPedido");

  let url = URL_API;

  if (idPedido) {
    url += `&idPedido=${encodeURIComponent(idPedido)}`;
  }

  const response = await fetch(url);

  const datos = await response.json();

  return NextResponse.json(datos);
}