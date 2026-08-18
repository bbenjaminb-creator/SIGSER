import { Orden } from "../types/Orden";
import ResumenServicio from "./ResumenServicio";
import TabsServicio from "./TabsServicio";

interface Props {
  abierto: boolean;
  orden: Orden | null;
  onCerrar: () => void;
}

export default function PanelServicio({
  abierto,
  orden,
  onCerrar,
}: Props) {
  if (!abierto || !orden) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "650px",
        height: "100vh",
        background: "white",
        borderLeft: "1px solid #ccc",
        padding: "20px",
        boxShadow: "-4px 0 10px rgba(0,0,0,.15)",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <button onClick={onCerrar}>✖ Cerrar</button>
<ResumenServicio orden={orden} />

<TabsServicio orden={orden} />
    </div>
  );
}