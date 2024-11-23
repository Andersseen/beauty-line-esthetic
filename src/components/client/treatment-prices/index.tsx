"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface TreatmentsPageProps {
  dict: {
    pageTitle: string;
    tabs: {
      estetica: string;
      depilacion: string;
      corporal: string;
    };
    treatments: {
      estetica: Treatment[];
      depilacion: Treatment[];
      corporal: Treatment[];
    };
    contact: {
      interestedText: string;
      callToAction: string;
    };
  };
}

interface Treatment {
  title: string;
  description?: string;
  duration?: string;
}

export default function TreatmentsPage({ dict }: TreatmentsPageProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10">{dict.pageTitle}</h1>
      <Tabs defaultValue="estetica" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="estetica">{dict.tabs.estetica}</TabsTrigger>
          <TabsTrigger value="depilacion">{dict.tabs.depilacion}</TabsTrigger>
          <TabsTrigger value="corporal">{dict.tabs.corporal}</TabsTrigger>
        </TabsList>
        <TabsContent value="estetica">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dict.treatments.estetica.map((treatment, index) => (
              <TreatmentCard key={index} {...treatment} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="depilacion">
          <Card>
            <CardHeader>
              <CardTitle>{dict.tabs.depilacion}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {dict.treatments.depilacion.map((item, index) => (
                  <li key={index}>{item.title}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="corporal">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dict.treatments.corporal.map((treatment, index) => (
              <TreatmentCard key={index} {...treatment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          {dict.contact.interestedText}
        </h2>
        <p className="mb-6">{dict.contact.callToAction}</p>
        <Button size="lg" className="gap-2 bg-main-500 hover:bg-main-900">
          <Phone className="w-5 h-5" />
          {dict.contact.callToAction}
        </Button>
      </div>
    </div>
  );
}

function TreatmentCard({ title, description, duration }: Treatment) {
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
