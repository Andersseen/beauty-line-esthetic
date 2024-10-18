"use client";
import { TransitionWrapper } from "@/components/client/transition-wrapper";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

export default function Page() {
  return (
    <TransitionWrapper>
      <section className="w-full min-h-screen shadow-lg">
        <div className="pt-10 body-font relative min-h-screen flex justify-end">
          <div className="absolute inset-0 saturate-50 contrast-50 pt-12">
            <iframe
              width="100%"
              height="100%"
              title="map"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d319.6111920512934!2d-3.8297826280890686!3d40.349638719562485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418eca28956423%3A0xbe6c8ec3a102acfc!2sBeauty%20Line!5e0!3m2!1sen!2ses!4v1727965468346!5m2!1sen!2ses"
            ></iframe>
          </div>
          <div className="p-8 ">
            <Popover placement="bottom" showArrow={true} backdrop="opaque">
              <PopoverTrigger>
                <Button size="lg" variant="shadow">
                  Contactos
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <ContactCard />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
    </TransitionWrapper>
  );
}

const ContactCard = () => {
  return (
    <Card className="max-w-[400px] bg-neutral-100 rounded-lg">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Paseo Castilla 11. Alcorcón</p>
          <p className="text-small">WhatsApp: 645 22 87 82</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col">
        <p className="text-md">HORARIO</p>
        <p className="text-small">DE LUNES A VIERNES DE 10:00 A 20:00 H.</p>
        <p className="text-md">SÁBADOS DE 10:00 A 14:00 H.</p>
        <p className="text-small">Servicio a domicilio consultar precios</p>
      </CardBody>
      <Divider />
    </Card>
  );
};
