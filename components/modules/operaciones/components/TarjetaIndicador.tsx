import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TarjetaIndicadorProps = {
  titulo: string;
  valor: number;
};

export default function TarjetaIndicador({
  titulo,
  valor,
}: TarjetaIndicadorProps) {
  return (
    <Card className="w-64">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          {titulo}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold">{valor}</p>
      </CardContent>
    </Card>
  );
}