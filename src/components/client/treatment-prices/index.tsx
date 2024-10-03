import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRICES_DATA as pricesData } from "@/data/treatment-prices";

export default function TreatmentPrices() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Precios de Tratamientos
      </h1>
      <Tabs defaultValue="estetica" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="estetica">Estética</TabsTrigger>
          <TabsTrigger value="depilacion">Depilación Láser</TabsTrigger>
          <TabsTrigger value="corporal">Tratamientos Corporales</TabsTrigger>
        </TabsList>
        <TabsContent value="estetica">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricesData.estetica.map((treatment, index) => (
              <TreatmentCard key={index} {...treatment} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="depilacion">
          <Card>
            <CardHeader>
              <CardTitle>Depilación Láser</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {pricesData.depilacion.map((item, index) => (
                  <li key={index}>
                    {item.title} - {item.price}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="corporal">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricesData.corporal.map((treatment, index) => (
              <TreatmentCard key={index} {...treatment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TreatmentCard({
  title,
  description,
  price,
  bonus,
  duration,
  prices,
}: TreatmentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        {price && <p className="font-bold text-lg">Precio: {price}</p>}
        {prices && (
          <ul className="list-disc pl-5 space-y-1 mt-2">
            {prices.map((item, index) => (
              <li key={index}>
                {item.duration}: {item.price}
              </li>
            ))}
          </ul>
        )}
        {duration && (
          <p className="text-sm text-gray-600 mt-2">Duración: {duration}</p>
        )}
        {bonus && <p className="text-sm text-primary mt-2">{bonus}</p>}
      </CardContent>
    </Card>
  );
}

interface TreatmentCardProps {
  title: string;
  description?: string;
  price?: string;
  bonus?: string;
  duration?: string;
  prices?: Array<{ duration: string; price: string }>;
}
