import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const treatmentsData = {
  estetica: [
    {
      title: "Limpieza facial profunda",
      description:
        "Con peeling mecánico o combinado, vapor, extracción, milium, mascarilla personalizada, aparatología según valoración.",
    },
    {
      title: "Peeling químico con retinol",
      description:
        "Antimanchas, acné, pieles fotoenviejecidas (con vitamina C, ácido kójico, salicílico, mandélico y retinol).",
    },
    {
      title: "Oxigenoterapia",
      description:
        "Tratamiento antiarrugas, reafirmante, cuperosis, iluminador, efecto botox purificante.",
    },
    {
      title: "Tratamiento BBGLOW",
      description:
        "Hidratación intensiva con dermapen y ácido hialurónico con un suave toque de maquillaje.",
    },
    {
      title: "Radiofrecuencia facial o corporal",
      description:
        "Lifting intensivo antiarrugas, reafirmante de óvalo facial, pómulos, párpados, etc. También flacidez corporal y celulitis.",
      duration: "Sesión 60min",
    },
    {
      title: "Tratamiento de hidratación facial profunda",
      description:
        "Con mascarilla personalizada y ampolla aplicada con aparatología.",
    },
    {
      title: "Tratamiento con dermapen",
      description:
        "Relleno de arrugas, arrugas de expresión, vitaminas, reafirmante, efecto botox, melasma, marcas de acné.",
    },
    {
      title: "Tratamientos personalizados CASMARA",
      description:
        "Con efecto flash, botox, seboreguladores, oxigenantes, con mascarillas de alginato con extracto de oro, perla negra, bayas de goji, flores de nieve, algas marinas.",
    },
  ],
  depilacion: [
    { title: "Zonas pequeñas" },
    { title: "Zonas medianas" },
    { title: "Zonas grandes" },
    { title: "Aplicación de crema anestésica" },
  ],
  corporal: [
    {
      title: "Sobrepeso y Celulitis",
      description:
        "Cavitación + presoterapia, dermapen + radiofrecuencia, masaje más presoterapia, cavitación + presoterapia, o combinado según valoración.",
      duration: "Duración una hora",
    },
    {
      title: "Tratamiento reductor y anticelulítico",
      description: "Dermapen (mesoterapia corporal) más presoterapia.",
    },
    {
      title: "Tratamiento combinado",
      description: "Con aparatología y masaje manual de espalda.",
    },
    {
      title:
        "Masaje reductor, anticelulítico, reafirmante, terapéutico, relajante",
      description: "Diferentes duraciones disponibles: 30min, 40min, 60min.",
    },
    {
      title: "Masaje anticelulítico y moldeante",
      description: "Con aparato G5.",
      duration: "Media hora",
    },
    {
      title: "Masaje facial",
      duration: "Media hora",
    },
    {
      title: "Presoterapia médica",
    },
  ],
};

export default function TreatmentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Nuestros Tratamientos
      </h1>
      <Tabs defaultValue="estetica" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="estetica">Estética</TabsTrigger>
          <TabsTrigger value="depilacion">Depilación Láser</TabsTrigger>
          <TabsTrigger value="corporal">Tratamientos Corporales</TabsTrigger>
        </TabsList>
        <TabsContent value="estetica">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {treatmentsData.estetica.map((treatment, index) => (
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
                {treatmentsData.depilacion.map((item, index) => (
                  <li key={index}>{item.title}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="corporal">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {treatmentsData.corporal.map((treatment, index) => (
              <TreatmentCard key={index} {...treatment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          ¿Interesado en nuestros tratamientos?
        </h2>
        <p className="mb-6">
          Llámenos para obtener información detallada sobre precios y
          promociones actuales.
        </p>
        <Button size="lg" className="gap-2 bg-main-500 hover:bg-main-900">
          <Phone className="w-5 h-5" />
          Llamar para precios
        </Button>
      </div>
    </div>
  );
}

function TreatmentCard({ title, description, duration }: TreatmentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        {duration && (
          <p className="text-sm text-gray-600 mt-2">Duración: {duration}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface TreatmentCardProps {
  title: string;
  description?: string;
  duration?: string;
}
